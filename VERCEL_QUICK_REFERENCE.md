# Vercel Deployment Quick Reference

## File Structure
```
/Users/wanting/program/CC/Avery_view/
├── index.html              # Static HTML (served at /)
├── api/
│   └── waitlist.js         # Serverless function (served at /api/waitlist)
├── vercel.json             # Deployment configuration
└── src/styles/             # CSS assets
```

## Deployment Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Local development
vercel dev
```

## Key Configuration Files

### vercel.json
- Configures API routes
- Handles static file serving
- Sets up SPA fallback

### api/waitlist.js
- Serverless function for form submissions
- Handles POST /api/waitlist
- Validates input (company, email, LinkedIn URL)

## Important Notes

1. **No Environment Variables Required**: The API works without any environment variables
2. **Static Files Served Automatically**: CSS, JS, images are served from root
3. **SPA Routing**: All non-API, non-static routes serve index.html

## Testing Checklist

After deployment, test:
- [ ] Homepage loads at root URL
- [ ] Styling displays correctly
- [ ] Form submission works (check Network tab in DevTools)
- [ ] No console errors

## Environment Variables (Optional - for future Google Sheets integration)

| Variable | Purpose |
|----------|---------|
| GOOGLE_SHEET_ID | Google Sheet ID |
| GOOGLE_SERVICE_ACCOUNT_EMAIL | Service account email |
| GOOGLE_PRIVATE_KEY | Private key for Sheets API |

**Do NOT add these now** - they are only needed when you want to integrate Google Sheets.
