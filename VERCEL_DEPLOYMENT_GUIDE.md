# Vercel Deployment Guide - Avery View

## Overview

This guide explains how to deploy the Avery View project to Vercel with both static HTML and serverless API functionality.

## Architecture

### File Structure

```
/Users/wanting/program/CC/Avery_view/
├── index.html              # Static frontend (served at root /)
├── api/
│   └── waitlist.js         # Serverless API endpoint (served at /api/waitlist)
├── vercel.json             # Vercel configuration
├── package.json            # Dependencies
└── src/
    └── styles/             # CSS assets
```

### How It Works

1. **Static Files**: Vercel automatically serves `index.html` at the root path
2. **API Routes**: Files in `api/` directory become serverless functions at `/api/*`
3. **Routing**: `vercel.json` configures how requests are routed

## Configuration Explained

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*\\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif))",
      "dest": "/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**Breakdown:**

| Section | Purpose |
|---------|---------|
| `builds` | Tells Vercel to use Node.js runtime for API files |
| `routes[0]` | Routes `/api/*` requests to the API functions |
| `routes[1]` | Serves static assets (CSS, JS, images) directly |
| `routes[2]` | Checks filesystem first before falling back |
| `routes[3]` | SPA fallback - all other routes serve index.html |
| `functions` | Sets memory (1024MB) and timeout (10s) for API |

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd /Users/wanting/program/CC/Avery_view
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (or select existing)
   - Project name: **avery-view** (or your choice)
   - Directory: **./** (current directory)
   - Override settings? **N**

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: (leave empty - no build needed)
   - **Output Directory**: `./` (static files are in root)
5. Click "Deploy"

### Option 3: Deploy via GitHub Integration

1. Push code to GitHub
2. In Vercel Dashboard, click "Import Project"
3. Select the Avery View repository
4. Vercel will auto-detect settings
5. Click "Deploy"

## Environment Variables (Optional)

The API works WITHOUT environment variables. Add these later for Google Sheets integration:

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_SHEET_ID` | No | Google Sheet ID for storing submissions |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | No | Service account email for Sheets API |
| `GOOGLE_PRIVATE_KEY` | No | Private key for Sheets API (multiline string) |

**To add in Vercel:**
1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add each variable with its value
4. Redeploy after adding

## Local Testing

### Install Vercel CLI

```bash
npm install -g vercel
```

### Run Local Development Server

```bash
cd /Users/wanting/program/CC/Avery_view
vercel dev
```

This starts a local server that simulates Vercel's environment:
- Access site at: `http://localhost:3000`
- API endpoint: `http://localhost:3000/api/waitlist`

## Troubleshooting

### Issue: "Cannot GET /api/waitlist"

**Cause:** The API file is not in the correct location.

**Solution:** Ensure `api/waitlist.js` exists at the project root.

### Issue: "Environment variable not found"

**Cause:** Code references an environment variable that doesn't exist.

**Solution:** The current code does NOT require environment variables. If you see this error, check that `api/waitlist.js` doesn't have any `process.env` references without fallbacks.

### Issue: Blank page on deployment

**Cause:** Routing configuration is incorrect.

**Solution:** Verify `vercel.json` has the correct routes, especially the SPA fallback:
```json
{
  "src": "/(.*)",
  "dest": "/index.html"
}
```

### Issue: CSS files not loading

**Cause:** Static asset routing is missing.

**Solution:** Verify `vercel.json` includes the static assets route:
```json
{
  "src": "/(.*\\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|avif))",
  "dest": "/$1"
}
```

### Issue: Form submission not working

**Cause:** JavaScript not calling the API endpoint.

**Solution:**
1. Open browser DevTools Console
2. Check for errors when submitting form
3. Verify fetch URL is `/api/waitlist` (relative path)
4. Check Network tab to see if request is being made

## Verification Checklist

After deployment, verify:

- [ ] Root URL (`/`) shows the landing page
- [ ] All styling loads correctly (grid background, gradients)
- [ ] Navigation works (scrolls to sections)
- [ ] Pricing cards display correctly
- [ ] Waitlist form accepts input
- [ ] Form submission shows success message
- [ ] API endpoint returns JSON response
- [ ] No console errors

## Current Implementation Status

### Completed
- x Static HTML frontend
- x Serverless API endpoint (`/api/waitlist`)
- x Vercel configuration (`vercel.json`)
- x Form submission with fetch API
- x Input validation on both frontend and backend
- x Graceful error handling

### TODO (Future)
- [ ] Google Sheets integration (when credentials are added)
- [ ] Email notifications for new signups
- [ ] Rate limiting on API endpoint
- [ ] Analytics integration

## API Endpoint Specification

### POST /api/waitlist

**Request:**
```json
{
  "company": "Example Corp",
  "email": "user@example.com",
  "linkedin": "https://linkedin.com/in/user"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully joined waitlist!"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid email format",
  "received": "invalid-email"
}
```

**Error Response (500):**
```json
{
  "error": "Internal server error",
  "message": "Unable to process your request. Please try again later."
}
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Configuration Reference](https://vercel.com/docs/projects/project-configuration)
