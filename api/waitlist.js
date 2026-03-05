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

const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to get Google Sheets client
async function getSheetClient() {
    try {
        // Create a new GoogleSpreadsheet client
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

        // Authenticate using service account
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        });

        await doc.loadInfo();
        return doc;
    } catch (error) {
        console.error('Error connecting to Google Sheets:', error);
        throw error;
    }
}

/**
 * POST /api/waitlist
 * Submit waitlist form data to Google Sheets
 *
 * Request body:
 * - company: string (required)
 * - email: string (required, must be valid email)
 * - linkedin: string (required, must contain linkedin.com)
 */
app.post('/', async (req, res) => {
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

        // Validate LinkedIn URL
        if (!linkedin.includes('linkedin.com/')) {
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
            linkedin
        });

        // Save to Google Sheets
        try {
            const doc = await getSheetClient();

            // Get or create the 'Waitlist' sheet
            let sheet = doc.sheetsByTitle['Waitlist'];
            if (!sheet) {
                sheet = await doc.addSheet({
                    title: 'Waitlist',
                    headers: ['Timestamp', 'Company', 'Email', 'LinkedIn URL']
                });
            }

            // Add new row with submission data
            await sheet.addRow({
                Timestamp: new Date().toISOString(),
                Company: company,
                Email: email,
                'LinkedIn URL': linkedin
            });

            console.log('Data saved to Google Sheets successfully');

        } catch (sheetsError) {
            // If Google Sheets fails, still return success (don't block user experience)
            console.error('Google Sheets error (but form submission still succeeds):', sheetsError);
            // Continue to return success response
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
});

// Export the Express app as a serverless function handler
module.exports = app;
