/**
 * Vercel Serverless Function for Waitlist API
 * Handles POST requests to /api/waitlist
 * Integrates with Google Sheets to store submissions
 *
 * Environment Variables (required):
 * - GOOGLE_SHEET_ID
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL
 * - GOOGLE_PRIVATE_KEY
 */

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Helper function to get Google Sheets client
async function getSheetClient() {
    try {
        // Validate environment variables early to prevent crash
        if (!process.env.GOOGLE_SHEET_ID) {
            throw new Error('GOOGLE_SHEET_ID is missing');
        }
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
            throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is missing');
        }
        if (!process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error('GOOGLE_PRIVATE_KEY is missing');
        }

        // Initialize auth
        const auth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        // Create a new GoogleSpreadsheet client
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);

        await doc.loadInfo();
        return doc;
    } catch (error) {
        console.error('Error connecting to Google Sheets:', error.message);
        throw error;
    }
}

/**
 * Vercel Serverless Function Handler
 * @param {Request} req - Vercel request object
 * @param {Response} res - Vercel response object
 */
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            allowed_methods: ['POST']
        });
    }

    try {
        const { company, email, linkedin } = req.body;

        // Validate required fields
        if (!company || !email || !linkedin) {
            return res.status(400).json({
                error: 'All fields are required',
                received: { company: !!company, email: !!email, linkedin: !!linkedin }
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format',
                received: email
            });
        }

        // Normalize LinkedIn URL - add https:// if missing
        let normalizedLinkedin = linkedin.trim();

        // If URL doesn't start with a protocol, add https://
        if (!normalizedLinkedin.match(/^https?:\/\//i)) {
            normalizedLinkedin = 'https://' + normalizedLinkedin;
        }

        // Validate LinkedIn URL (now with normalized URL)
        if (!normalizedLinkedin.includes('linkedin.com/')) {
            return res.status(400).json({
                error: 'Invalid LinkedIn URL - must contain linkedin.com',
                received: linkedin
            });
        }

        // Log submission to console
        console.log('Waitlist submission:', {
            timestamp: new Date().toISOString(),
            company,
            email,
            linkedin: normalizedLinkedin
        });

        // Save to Google Sheets
        try {
            const doc = await getSheetClient();

            // Get or create the 'Waitlist' sheet
            let sheet = doc.sheetsByTitle['Waitlist'];
            if (!sheet) {
                sheet = await doc.addSheet({
                    title: 'Waitlist',
                    headerValues: ['Timestamp', 'Company', 'Email', 'LinkedIn URL']
                });
            }

            // Add new row with submission data
            await sheet.addRow({
                Timestamp: new Date().toISOString(),
                Company: company,
                Email: email,
                'LinkedIn URL': normalizedLinkedin
            });

            console.log('Data saved to Google Sheets successfully');

        } catch (sheetsError) {
            // Return error details for debugging
            console.error('Google Sheets error:', sheetsError.message);
            console.error('Full error:', JSON.stringify(sheetsError, null, 2));

            // Check for common issues
            if (!process.env.GOOGLE_SHEET_ID) {
                return res.status(500).json({
                    error: 'Google Sheets configuration error',
                    details: 'GOOGLE_SHEET_ID environment variable is not set'
                });
            }
            if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
                return res.status(500).json({
                    error: 'Google Sheets configuration error',
                    details: 'GOOGLE_SERVICE_ACCOUNT_EMAIL environment variable is not set'
                });
            }
            if (!process.env.GOOGLE_PRIVATE_KEY) {
                return res.status(500).json({
                    error: 'Google Sheets configuration error',
                    details: 'GOOGLE_PRIVATE_KEY environment variable is not set'
                });
            }

            // Return the actual error
            return res.status(500).json({
                error: 'Failed to save to Google Sheets',
                details: sheetsError.message,
                hint: 'Please check: 1) Environment variables are set in Vercel, 2) Service account has Sheet access, 3) Sheet ID is correct'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully joined waitlist!'
        });

    } catch (error) {
        console.error('Error in waitlist API:', error);

        return res.status(500).json({
            error: 'Internal server error',
            message: 'Unable to process your request. Please try again later.'
        });
    }
};
