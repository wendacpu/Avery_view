const express = require('express');
const path = require('path');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Google Sheets configuration
// TODO: Replace with your actual credentials
const SHEET_ID = process.env.GOOGLE_SHEET_ID || 'YOUR_SHEET_ID';
const SHEET_TITLE = 'Waitlist';

app.post('/api/waitlist', async (req, res) => {
    try {
        const { company, email, linkedin } = req.body;

        // Validate input
        if (!company || !email || !linkedin) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate LinkedIn URL
        if (!linkedin.includes('linkedin.com/')) {
            return res.status(400).json({ error: 'Invalid LinkedIn URL' });
        }

        // Initialize Google Sheet
        // TODO: Set up Google Sheets API credentials
        // const doc = new GoogleSpreadsheet(SHEET_ID);
        // await doc.useServiceAccountAuth({
        //     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        //     private_key: process.env.GOOGLE_PRIVATE_KEY,
        // });
        // await doc.loadInfo();
        // const sheet = doc.sheetsByTitle[SHEET_TITLE] || await doc.addSheet({
        //     title: SHEET_TITLE,
        //     headers: ['Timestamp', 'Company', 'Email', 'LinkedIn']
        // });
        // await sheet.addRow({
        //     Timestamp: new Date().toISOString(),
        //     Company: company,
        //     Email: email,
        //     LinkedIn: linkedin
        // });

        // Log submission for now (replace with actual Sheets integration)
        console.log('Waitlist submission:', {
            timestamp: new Date().toISOString(),
            company,
            email,
            linkedin
        });

        res.status(200).json({
            success: true,
            message: 'Successfully joined waitlist!'
        });

    } catch (error) {
        console.error('Error submitting to waitlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 Avery server running at http://localhost:${PORT}`);
    console.log(`\n📋 To integrate Google Sheets:`);
    console.log(`   1. Create a Google Sheet`);
    console.log(`   2. Set up a service account: https://developers.google.com/sheets/api/quickstart/nodejs`);
    console.log(`   3. Share the sheet with the service account email`);
    console.log(`   4. Set environment variables:`);
    console.log(`      - GOOGLE_SHEET_ID`);
    console.log(`      - GOOGLE_SERVICE_ACCOUNT_EMAIL`);
    console.log(`      - GOOGLE_PRIVATE_KEY\n`);
});
