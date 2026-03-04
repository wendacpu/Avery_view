# 🚀 Avery View - Deployment Guide

## 📋 Overview

This guide provides multiple deployment strategies for the Avery View landing page, from simple static hosting to full-stack deployment with API endpoints.

## 🎯 Recommended Deployment: Vercel

**Why Vercel?**
- ✅ Best for static sites with serverless functions
- ✅ Automatic deployments from GitHub
- ✅ Free SSL certificate
- ✅ Global CDN
- ✅ Serverless functions for API endpoints
- ✅ Easy environment variable management
- ✅ Future-proof for Next.js migration

---

## 📦 Step 1: Push to GitHub

### Option A: Using Git CLI (Recommended)

```bash
# Navigate to project directory
cd /Users/wanting/program/CC/Avery_view

# Initialize Git (already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Avery View landing page"

# Add remote repository
git remote add origin https://github.com/wendacpu/Avery_show.git

# Push to GitHub
git push -u origin main
```

### Option B: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select `/Users/wanting/program/CC/Avery_view`
4. Repository name: `Avery_view`
5. Click "Publish repository"
6. Select `wendacpu/Avery_show` as remote
7. Click "Publish"

### Option C: Manual Upload

If network issues persist:

1. Go to https://github.com/wendacpu/Avery_show
2. Click "Upload files"
3. Drag and drop all files from `/Users/wanting/program/CC/Avery_view/`
4. Add commit message
5. Click "Commit changes"

---

## 🌐 Step 2: Deploy to Vercel

### Method A: Automatic Deployment (Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/login with GitHub

2. **Import Repository**
   - Click "Add New Project"
   - Select `wendacpu/Avery_show` from GitHub
   - Click "Import"

3. **Configure Project**
   - Framework Preset: "Other"
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`

4. **Environment Variables** (Optional - for Google Sheets)
   ```
   GOOGLE_SHEET_ID = your_sheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL = your_service_account_email
   GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site will be live at: `https://avery-view.vercel.app`

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /Users/wanting/program/CC/Avery_view
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: avery-view
# - Directory: ./
# - Override settings? N

# Your site will be live at the provided URL
```

### Method C: Continuous Deployment

```bash
# Deploy to production
vercel --prod

# Alias custom domain
vercel alias set avery-view.vercel.app avery.yourdomain.com
```

---

## 🔄 Alternative: Deploy to Netlify

### Why Netlify?
- ✅ Excellent for static sites
- ✅ Built-in form handling (can replace our API)
- ✅ Serverless functions
- ✅ Easy CI/CD

### Deployment Steps:

1. **Go to Netlify**
   - Visit https://netlify.com
   - Sign up/login with GitHub

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Select `wendacpu/Avery_show`
   - Click "Import site"

3. **Configure Build**
   - Build command: (leave empty)
   - Publish directory: `/`
   - Click "Deploy site"

4. **Your site will be live at**
   - `https://avery-view.netlify.app`

---

## 📄 Alternative: GitHub Pages (Static Only)

### Why GitHub Pages?
- ✅ Free
- ✅ Simple
- ✅ Direct GitHub integration
- ❌ No server-side functions (API won't work)

### Deployment Steps:

1. **Create gh-pages branch**
   ```bash
   cd /Users/wanting/program/CC/Avery_view
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Enable GitHub Pages**
   - Go to https://github.com/wendacpu/Avery_show/settings/pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Click "Save"

3. **Your site will be live at**
   - `https://wendacpu.github.io/Avery_show/`

**Note:** Form submission will need external service (e.g., Formspree, Netlify Forms)

---

## 🔧 Environment Variables (Optional)

For Google Sheets integration, configure these in your deployment platform:

### Vercel
1. Go to Project → Settings → Environment Variables
2. Add variables:
   ```
   GOOGLE_SHEET_ID
   GOOGLE_SERVICE_ACCOUNT_EMAIL
   GOOGLE_PRIVATE_KEY
   ```

### Netlify
1. Go to Site → Settings → Environment variables
2. Add same variables

---

## 🎨 Custom Domain Setup

### Vercel
1. Go to Project → Settings → Domains
2. Add your domain (e.g., `avery.yourdomain.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS records
4. SSL automatic

---

## ✅ Deployment Checklist

### Pre-Deployment
- [x] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Environment variables configured (if needed)
- [ ] Custom domain ready (optional)

### Post-Deployment
- [ ] Site is accessible at deployment URL
- [ ] All sections load correctly
- [ ] Forms submit successfully
- [ ] Mobile responsive works
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)

---

## 🧪 Testing Deployed Site

### Manual Testing
```bash
# Check site is live
curl -I https://your-deployment-url.com

# Test form submission
curl -X POST https://your-deployment-url.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"company":"Test","email":"test@example.com","linkedin":"https://linkedin.com/in/test"}'
```

### Lighthouse Testing
1. Open Chrome DevTools
2. Lighthouse tab
3. Generate report
4. Target: 90+ in all categories

---

## 🐛 Troubleshooting

### GitHub Push Fails
```bash
# Check git remote
git remote -v

# Update remote URL
git remote set-url origin https://github.com/wendacpu/Avery_show.git

# Try SSH instead
git remote set-url origin git@github.com:wendacpu/Avery_show.git

# Configure SSH keys
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add key to GitHub: https://github.com/settings/keys
```

### Vercel Deployment Fails
- Check build logs in Vercel dashboard
- Verify `vercel.json` configuration
- Ensure all files are committed to Git
- Check environment variables

### Forms Not Working
- Verify server.js is included
- Check API endpoint configuration
- Test API endpoint directly
- Review browser console for errors
- Check server logs

### Environment Variables Not Working
- Verify variable names match exactly
- Check for trailing spaces in values
- Ensure quotes are properly escaped
- Re-deploy after adding variables

---

## 📊 Monitoring & Analytics

### Add Analytics (Optional)

**Vercel Analytics**
```bash
npm install @vercel/analytics
```

**Google Analytics**
```html
<!-- Add to index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Plausible Analytics** (Privacy-friendly)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🚀 Production Checklist

### Before Going Live
- [ ] Update all placeholder content
- [ ] Add actual pricing/links
- [ ] Configure Google Sheets API
- [ ] Test form submission
- [ ] Add analytics
- [ ] Set up custom domain
- [ ] Configure DNS records
- [ ] Test on mobile devices
- [ ] Test form submission end-to-end
- [ ] Verify all links work
- [ ] Check SEO meta tags

### After Going Live
- [ ] Monitor Vercel dashboard for errors
- [ ] Check analytics for traffic
- [ ] Test form submissions regularly
- [ ] Update documentation
- [ ] Share URL with stakeholders

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Vercel** | 100GB bandwidth, serverless functions | $20/month for pro | Recommended - full-featured |
| **Netlify** | 100GB bandwidth, 3000 build minutes | $19/month for pro | Great alternative |
| **GitHub Pages** | 1GB storage, 100GB bandwidth | Free forever | Static sites only |

**Recommendation:** Start with Vercel free tier, upgrade if needed.

---

## 🔄 CI/CD Workflow

### Automatic Deployment on Push

```
Git Push → GitHub → Vercel Detects → Auto Deploy → Live Site
```

### Manual Deployment

```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod
```

---

## 📞 Support

### Platform Documentation
- **Vercel**: https://vercel.com/docs
- **Netlify**: https://docs.netlify.com
- **GitHub Pages**: https://docs.github.com/pages

### Common Issues
- **Build fails**: Check Vercel build logs
- **Forms not working**: Verify API configuration
- **Environment variables**: Check platform settings
- **Custom domain**: Verify DNS records

---

## 🎓 Next Steps

1. **Immediate** (Today)
   - [ ] Push to GitHub
   - [ ] Deploy to Vercel
   - [ ] Verify site is live
   - [ ] Test all functionality

2. **Short-term** (This Week)
   - [ ] Configure Google Sheets API
   - [ ] Add analytics
   - [ ] Set up custom domain
   - [ ] Test on all devices

3. **Long-term** (This Month)
   - [ ] Monitor performance
   - [ ] Add more content
   - [ ] Implement SEO improvements
   - [ ] Consider A/B testing

---

**Status**: Ready for deployment
**Repository**: https://github.com/wendacpu/Avery_show
**Recommended**: Vercel (https://vercel.com)
**Version**: 1.0.0
**Date**: 2026-03-04
