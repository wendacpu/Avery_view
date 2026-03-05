/**
 * Vercel Serverless Function for Waitlist API
 * Handles POST requests to /api/waitlist
 *
 * This function runs on Vercel's serverless infrastructure.
 * Environment variables are optional - Google Sheets integration
 * will be added when credentials are configured.
 */

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /api/waitlist
 * Submit email to waitlist
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

        // Log submission (for now - will be replaced with Google Sheets)
        console.log('Waitlist submission:', {
            timestamp: new Date().toISOString(),
            company,
            email,
            linkedin
        });

        // TODO: Add Google Sheets integration when environment variables are configured
        // The following will be enabled later:
        // - process.env.GOOGLE_SHEET_ID
        // - process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
        // - process.env.GOOGLE_PRIVATE_KEY

        return res.status(200).json({
            success: true,
            message: 'Successfully joined waitlist!'
        });

    } catch (error) {
        console.error('Error submitting to waitlist:', error);

        return res.status(500).json({
            error: 'Internal server error',
            message: 'Unable to process your request. Please try again later.'
        });
    }
});

// Export the Express app as a serverless function handler
// Vercel will automatically handle the request/response cycle
module.exports = app;
