# Holkam Advisory — Website

Production-ready static website for Holkam Advisory. Pure HTML, CSS, and JavaScript — no build tools or frameworks required.

---

## Project Structure

```
Website/
├── index.html              # Main page (all 9 sections)
├── css/
│   └── styles.css          # All styles (design tokens → components → responsive)
├── js/
│   └── main.js             # Navigation, mobile menu, scroll animations
├── assets/
│   ├── images/             # Add your logo, hero image, backgrounds here
│   └── videos/             # Add hero/section video files here
└── README.md
```

---

## Adding Your Assets

### 1. Logo

Open `index.html` and find the nav logo section (~line 43):

```html
<!-- USER ASSET: Replace the <span> below with your logo image -->
<a href="#hero" class="nav-logo" ...>
  <span class="nav-logo__text">HOLKAM</span>
  ...
</a>
```

Replace the `<span class="nav-logo__text">HOLKAM</span>` with:

```html
<img src="assets/images/holkam-logo.svg" alt="Holkam Advisory" width="140" height="36" />
```

**Recommended format:** SVG (scales perfectly at all sizes). PNG fallback at 280×72px minimum (@2x).

---

### 2. Hero Background Image

Find the hero section in `index.html`. Add the image as an inline style:

```html
<section class="hero" id="hero" style="background-image: url('assets/images/hero-bg.jpg');">
```

**Recommended:** 2560×1440px, JPG or WebP, compressed to under 500KB. The dark overlay is already in place for text legibility.

---

### 3. Hero Background Video (alternative to image)

Find the commented `<video>` block inside the hero section and uncomment it:

```html
<video class="hero__video" autoplay muted loop playsinline aria-hidden="true">
  <source src="assets/videos/hero.mp4" type="video/mp4" />
</video>
```

Place your video at `assets/videos/hero.mp4`.

**Recommended:** H.264, 1920×1080, under 15MB, no audio track needed.

---

### 4. Approach Section Background

Find the approach section and add:

```html
<section class="approach" id="approach" style="background-image: url('assets/images/approach-bg.jpg');">
```

---

### 5. Final CTA Background

Find the final CTA section and add:

```html
<section class="final-cta" id="contact" style="background-image: url('assets/images/cta-bg.jpg');">
```

---

### 6. Open Graph / Social Share Image

Add a 1200×630px image named `og-cover.jpg` to `assets/images/`.

Update the OG meta tag in `<head>`:

```html
<meta property="og:image" content="https://holkamadvisory.com/assets/images/og-cover.jpg" />
```

---

### 7. Favicon

Place these files in `assets/images/`:
- `favicon.ico`
- `favicon-32x32.png`
- `favicon-16x16.png`

Then uncomment in `<head>`:

```html
<link rel="icon" type="image/png" sizes="32x32" href="assets/images/favicon-32x32.png" />
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico" />
```

---

## Customisation

### Colors

All colors are CSS variables in `css/styles.css` at the top of the file:

```css
:root {
  --color-black:     #000000;
  --color-white:     #FFFFFF;
  --color-dark:      #1A1A1A;  /* dark backgrounds, overlays */
  --color-mid:       #666666;  /* secondary text */
  --color-light:     #E5E5E5;  /* borders, dividers */
  --color-off-white: #F8F8F8;  /* alternate section backgrounds */
}
```

### Updating Copy

All text is in `index.html`. Search for the section you want to edit (e.g. `id="services"`) and update directly.

### Email Address

The contact email `boipelo@holkamadvisory.com` appears in three places. Search and replace all instances if it changes.

---

## Deployment

### Option A — Netlify (Recommended, free)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire `Website` folder onto the page
3. Netlify generates a live URL instantly
4. To connect your custom domain: **Site settings → Domain management → Add custom domain**

**Custom domain DNS (Netlify):**
- Add a `CNAME` record: `www` → `your-site-name.netlify.app`
- Add an `ALIAS` or `A` record for the apex domain (Netlify provides IPs in the dashboard)

### Option B — Vercel (free)

1. Install: `npm i -g vercel`
2. Run `vercel` inside the `Website` folder
3. Select framework: **Other**
4. Follow the prompts

Or connect your GitHub repo at [vercel.com](https://vercel.com) and import the repository.

### Option C — GitHub Pages (free)

1. Push the `Website` folder contents to a GitHub repository
2. Go to **Settings → Pages**
3. Set source branch to `main`, folder to `/ (root)`
4. Your site is live at `https://username.github.io/repo-name`

---

## Performance Tips

- Convert images to **WebP** format for 30–50% smaller file sizes
- Compress hero images to under 400KB before deployment
- Use a CDN (Netlify and Vercel do this automatically)
- Target: Lighthouse Performance score > 90 on desktop

### Image compression tools
- [Squoosh.app](https://squoosh.app) — free, browser-based, excellent WebP conversion
- [TinyPNG](https://tinypng.com) — simple drag and drop

---

## Browser Support

- Chrome 80+
- Firefox 78+
- Safari 14+
- Edge 80+

The site works without JavaScript (all content is visible). JS adds scroll animations, the mobile menu, and smooth scrolling.

---

## Troubleshooting

**Fonts not loading:** Ensure you have an internet connection when opening the file locally. Google Fonts requires a network request.

**Parallax not working on mobile:** This is intentional — `background-attachment: fixed` is disabled on mobile for performance and iOS compatibility.

**Animations not triggering:** Check that JavaScript is enabled. If using `prefers-reduced-motion` in your OS settings, animations are intentionally disabled.

**Background image not showing:** Check the file path is correct relative to `index.html`. Example: if the image is at `assets/images/hero-bg.jpg`, the path in the style attribute should be exactly `assets/images/hero-bg.jpg` (no leading slash for local file preview).
