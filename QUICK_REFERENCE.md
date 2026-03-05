# 🚀 Quick Deploy & Domain Setup - Avery View

## ⚡ 3 Steps to Live Site (10 minutes)

### Step 1: Push Fix to GitHub (2 min) ⏰

```bash
cd /Users/wanting/program/CC/Avery_view
git push origin main
```

✅ Vercel will auto-redeploy in 1-2 minutes

---

### Step 2: Configure Domain averycmo.ai (5 min) ⏰

#### A. Add Domain in Vercel
1. Go to: https://vercel.com/wendys-projects-72204568/avery_show/settings/domains
2. Enter: `averycmo.ai`
3. Click "Add"

#### B. Add DNS Records at Your Domain Registrar

**Record 1** (A Record):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Record 2** (CNAME):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

### Step 3: Wait & Verify (3 min) ⏰

1. **Wait for DNS propagation** (5-30 min)
2. **Check**: https://averycmo.ai
3. **Verify**: You should see the landing page!

---

## 🎯 Your URLs After Setup

| URL | Purpose |
|-----|---------|
| https://averycmo.ai | **Primary domain** ⭐ |
| https://www.averycmo.ai | With www |
| https://avery-view.vercel.app | Vercel URL |

---

## 🔧 What Was Fixed

**Problem**: vercel.json was too complex
**Solution**: Simplified to static site config

**Before**: Complex builds configuration
**After**: Simple rewrites for static HTML

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel auto-redeployed
- [ ] Domain added in Vercel
- [ ] DNS records configured
- [ ] https://averycmo.ai works
- [ ] All sections visible
- [ ] Mobile responsive

---

## 🐛 Quick Fixes

### Blank page still?
- Wait 2 min for Vercel to redeploy
- Clear browser cache
- Try incognito mode

### Domain not working?
- Wait 30 min for DNS propagation
- Check DNS records are correct
- Verify A record: `@` → `76.76.21.21`

### Need help?
- Full guide: `VERCEL_FIX_GUIDE.md`
- Vercel dashboard: https://vercel.com/wendys-projects-72204568/avery_show

---

## 📱 Test on Your Phone

1. Open Safari/Chrome on phone
2. Go to: https://averycmo.ai
3. Check: Responsive design works!

---

**Your site will be live at**: https://averycmo.ai 🎉

**Timeline**: 10 minutes
**Status**: Ready to deploy!
