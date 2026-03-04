# Avery View - Design System Documentation

## Philosophy

**"Intelligent Social Studio"** - A sophisticated dark-themed design inspired by Fin.ai, tailored for a LinkedIn content generation tool.

## Core Design Principles

### 1. Anti-Generic AI Aesthetics
- ❌ NO Inter, Roboto, Open Sans, Arial fonts
- ❌ NO white background with purple gradient SaaS look
- ❌ NO predictable hero sections or template components
- ✅ Custom typography: Space Grotesk + IBM Plex Sans
- ✅ Deep black theme with elegant purple-cyan gradients
- ✅ Animated grid background with floating gradient orbs

### 2. Typography System

```css
/* Font Families */
--font-heading: 'Space Grotesk', sans-serif;  /* Headlines, titles */
--font-body: 'IBM Plex Sans', sans-serif;     /* Body text */

/* Font Weights */
- Space Grotesk: 400, 500, 600, 700
- IBM Plex Sans: 300, 400, 500, 600

/* Type Scale */
- Hero: 4.5rem (72px) at desktop
- Section titles: 3rem (48px)
- Body: 1rem (16px)
- Small: 0.85rem (14px)
```

### 3. Color Palette

```css
/* Primary Colors */
--color-bg: #0a0a0a;              /* Deep black */
--color-bg-secondary: #111111;    /* Slightly lighter */
--color-bg-tertiary: #1a1a1a;     /* Card backgrounds */

/* Text Colors */
--color-text-primary: #ffffff;    /* Pure white */
--color-text-secondary: rgba(255, 255, 255, 0.7);
--color-text-muted: rgba(255, 255, 255, 0.5);

/* Accent Colors */
--color-accent-primary: #7c3aed;  /* Purple */
--color-accent-secondary: #06b6d4; /* Cyan */
--color-accent-gradient: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);

/* Borders */
--color-border: rgba(255, 255, 255, 0.1);
--color-border-subtle: rgba(255, 255, 255, 0.05);
```

### 4. Visual Effects

```css
/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.5);

/* Glow Effects */
--glow-primary: 0 0 40px rgba(124, 58, 237, 0.3);
--glow-secondary: 0 0 40px rgba(6, 182, 212, 0.3);

/* Transitions */
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

### 5. Background System

**Layer 1: Animated Grid**
```css
background-image:
  linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
background-size: 60px 60px;
animation: gridMove 20s linear infinite;
```

**Layer 2: Floating Gradient Orbs**
```css
/* Orb 1 - Top Right */
width: 600px;
height: 600px;
background: radial-gradient(circle, #7c3aed, transparent);
animation: float 20s ease-in-out infinite;

/* Orb 2 - Bottom Left */
width: 500px;
height: 500px;
background: radial-gradient(circle, #06b6d4, transparent);
animation: float 25s ease-in-out infinite reverse;
```

### 6. Animation Patterns

**Staggered Fade-In:**
```css
.element {
  opacity: 0;
  animation: fadeInUp 0.6s ease both;
}

.element:nth-child(1) { animation-delay: 0.1s; }
.element:nth-child(2) { animation-delay: 0.2s; }
.element:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Hover Effects:**
```css
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--glow-primary);
}

.btn-primary::before {
  /* Shimmer effect */
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}
```

### 7. Spacing System

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
--space-3xl: 6rem;    /* 96px */
```

### 8. Component Patterns

**Hero Badge:**
```html
<div class="hero-badge">
  <span class="hero-badge-dot"></span>
  AI-Powered Content Studio
</div>
```

**Feature Card:**
```html
<div class="feature-card">
  <div class="feature-icon">✨</div>
  <h3 class="feature-title">Title</h3>
  <p class="feature-description">Description</p>
</div>
```

**Form Input:**
```html
<div class="form-group">
  <label class="form-label" for="input">Label</label>
  <input
    type="text"
    id="input"
    class="form-input"
    placeholder="Placeholder"
  >
</div>
```

### 9. Responsive Breakpoints

```css
/* Mobile First Approach */
@media (max-width: 768px) {
  .hero h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
  }
  
  .nav-links {
    display: none;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
```

### 10. Accessibility

- Color contrast: WCAG AA compliant
- Focus states: Visible outline on all interactive elements
- Semantic HTML: Proper heading hierarchy
- ARIA labels: Where needed for screen readers

## Implementation Checklist

✅ Typography: Space Grotesk + IBM Plex Sans
✅ Colors: Deep black (#0a0a0a) with purple-cyan gradients
✅ Background: Animated grid + floating gradient orbs
✅ Animations: Staggered fade-ins, hover effects
✅ Responsive: Mobile-first design
✅ Forms: Styled inputs with validation
✅ Navigation: Fixed header with backdrop blur
✅ Sections: Hero, Features, How It Works, Waitlist
✅ Footer: Simple and clean

## Performance Targets

- Lighthouse Score: 90+ (all categories)
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Smooth 60fps animations

## Browser Compatibility

✅ Chrome/Edge: Full support
✅ Firefox: Full support
✅ Safari: Full support
✅ Mobile browsers: Fully responsive

---

**Design Reference:** Inspired by [Fin.ai](https://fin.ai)
**Built:** 2026-03-04
**Version:** 1.0.0
