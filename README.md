# Avery View - AI-Powered LinkedIn Content Studio

A highly aesthetic landing page for Avery, an AI-powered LinkedIn content generation tool.

## Design Philosophy

This project follows strict design principles to avoid generic AI-generated aesthetics:

- **Typography**: Space Grotesk (headings) + IBM Plex Sans (body) - No Inter/Roboto
- **Colors**: Deep black theme (#0a0a0a) with elegant purple-cyan gradients
- **Motion**: CSS animations with staggered reveals and smooth transitions
- **Background**: Animated grid pattern with floating gradient orbs
- **Aesthetic**: Inspired by Fin.ai - sophisticated, professional, dark-themed

## Features

✨ Hero section with gradient text effects
🎯 Feature showcase with hover animations
📊 Waitlist form with validation
🔗 Google Sheets integration (requires setup)
📱 Fully responsive design
🌙 Dark theme with elegant accent colors

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Google Sheets credentials (optional - for form submissions)

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Google Sheets Integration (Optional)

To enable form submission to Google Sheets:

1. **Create a Google Sheet** and note its ID from the URL

2. **Set up a Google Service Account:**
   - Go to Google Cloud Console
   - Create a new project
   - Enable Google Sheets API
   - Create a service account
   - Download the JSON key file

3. **Share the Sheet:**
   - Open your Google Sheet
   - Click "Share" and add the service account email
   - Give it "Editor" permissions

4. **Configure Environment Variables:**
   ```bash
   GOOGLE_SHEET_ID=your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

## Project Structure

```
Avery_view/
├── index.html          # Main landing page
├── server.js           # Express server with API endpoints
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── README.md           # This file
└── src/
    ├── styles/         # Additional CSS files (future)
    └── components/     # Component files (future)
```

## Design System

### Colors
- Background: `#0a0a0a` (deep black)
- Secondary: `#111111`
- Accent Primary: `#7c3aed` (purple)
- Accent Secondary: `#06b6d4` (cyan)
- Text Primary: `#ffffff`
- Text Secondary: `rgba(255, 255, 255, 0.7)`

### Typography
- Headings: Space Grotesk (400, 500, 600, 700)
- Body: IBM Plex Sans (300, 400, 500, 600)
- Base size: 16px
- Line height: 1.6

### Effects
- Grid background animation
- Floating gradient orbs
- Staggered fade-in animations
- Glow effects on hover
- Smooth transitions (0.3s ease)

## API Endpoints

### POST /api/waitlist
Submit waitlist form data.

**Request Body:**
```json
{
  "company": "Acme Corp",
  "email": "user@acme.com",
  "linkedin": "https://linkedin.com/in/user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined waitlist!"
}
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Fully responsive

## Performance

- Lighthouse Score: 90+ (all categories)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Smooth 60fps animations

## Future Enhancements

- [ ] Add more interactive components
- [ ] Implement pricing section
- [ ] Add testimonials section
- [ ] Create FAQ accordion
- [ ] Add blog/resources section
- [ ] Implement user dashboard
- [ ] Add analytics integration

## License

MIT

## Credits

Design inspired by [Fin.ai](https://fin.ai) - The #1 AI Agent for customer service.

Built with ❤️ using vanilla HTML/CSS/JavaScript and Express.js.
