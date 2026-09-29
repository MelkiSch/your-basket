# Your basket — Seasonal Local Produce Harvesting App

> **Copyright © Smissenbroek. All rights reserved.**  
> UX/UI Design Inspiration: [Mixborder.com](https://mixborder.com/)

**Your basket** is a responsive, highly visual web application that helps users discover and generate a custom basket of locally grown fruits, vegetables, herbs, and nuts based on their geographical location and week of the year.

---

## 🌟 Key Features

- **Mixborder.com Aesthetic & Typography**: Clean organic palette (`#fcfbf6`, `#2c5530`), *DM Sans* UI font, and *Georgia italic* serif produce titles.
- **Geographic Geocoding Search Bar**: Search any city globally (*Paris*, *Berlin*, *New York*, *London*, *Rome*, *Tokyo*, etc.) using an instant 0ms city database + OpenStreetMap Nominatim API.
- **52-Week Harvest Seasonality Engine**: Drag across all 52 weeks of the year with real-time date range calculations and quick season buttons (Spring, Summer, Autumn, Winter).
- **Dual Basket View Modes**:
  - **Visual / Educative View**: Responsive card grid with real produce photography, 52-week micro heatmaps, carbon footprint ratings (`FOOTPRINT A+`), and educational detail modals.
  - **Compact / Printable View**: High-density table grouped by category, optimized for PDF output & printing (`@media print`).
- **My Basket & Recipe Suggestions**: Interactive shopping list with item counter, carbon footprint savings indicator, and matching seasonal recipes.

---

## 🚀 Quick Deployment to GitHub & Squarespace

### 1. Push Code to GitHub

Open terminal in the project directory:

```bash
git init
git add .
git commit -m "Initial release of Your Basket web app"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/your-basket.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_GITHUB_USERNAME/your-basket`
2. Click **Settings** > **Pages** (under Code and automation).
3. Under **Build and deployment** -> **Branch**, select `main` branch and `/ (root)` folder.
4. Click **Save**.
5. Your live app URL will be ready in 1-2 minutes at:  
   `https://YOUR_GITHUB_USERNAME.github.io/your-basket/`

### 3. Embed into Squarespace (`smissenbroek.com/tools/yourbasket`)

1. Log into your Squarespace Dashboard and go to **Pages**.
2. Add a new **Blank Page** and set the URL Slug to `/tools/yourbasket`.
3. Add a **Code Block** or **Embed Block** to the page.
4. Paste the following responsive embed snippet:

```html
<div style="width: 100%; height: 85vh; min-height: 750px; border: none; overflow: hidden; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
  <iframe 
    src="https://YOUR_GITHUB_USERNAME.github.io/your-basket/" 
    style="width: 100%; height: 100%; border: none;" 
    title="Your basket - Seasonal Local Produce Guide"
    allow="geolocation">
  </iframe>
</div>
```

---

## 📄 License & Copyright

Copyright © Smissenbroek. All rights reserved.
