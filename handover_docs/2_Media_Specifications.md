# ILLUME Bespoke Couture — Media Asset Specification Sheet

A luxury website requires top-tier, editorial photography to maintain its premium feel. During design and development, we implemented **high-fidelity AI-generated placeholders**. This document outlines the exact sizes, layouts, and visual rules for replacing them with your professional brand photography.

---

## 1. Summary of Active Site Assets
To ensure images load quickly on mobile phones and look sharp on high-resolution screens (like iPhones and MacBooks), we recommend the following dimensions:

| Location / File Name | Description | Recommended Aspect Ratio | Recommended Resolution |
| :--- | :--- | :--- | :--- |
| **Hero Image** (`/images/hero_bridal.png`) | Home page right-side main banner | `3:4` (Vertical Portrait) | **1200 x 1600 px** |
| **Ateliers - Bridal & Asoebi** (`/images/bridal_asoebi.png`) | Homepage category card | `3:4` (Vertical) | **800 x 1066 px** |
| **Ateliers - Suits & Dinner** (`/images/suits_dinner.png`) | Homepage category card | `3:4` (Vertical) | **800 x 1066 px** |
| **Ateliers - African Luxury** (`/images/african_luxury.png`) | Homepage category card | `3:4` (Vertical) | **800 x 1066 px** |
| **Ateliers - Evening Couture** (`/images/evening_couture.png`) | Homepage category card | `3:4` (Vertical) | **800 x 1066 px** |
| **Ateliers - Atelier Consultancy** (`/images/consultancy.png`) | Homepage category card / Middle Banner | `3:4` (Vertical) | **800 x 1066 px** |
| **Ateliers - Heritage Wear** (`/images/heritage.png`) | Homepage category card | `3:4` (Vertical) | **800 x 1066 px** |
| **Founder Profile** (`/images/visionary_designer.png`) | About Page / Profile Section | `3:4` or `1:1` | **800 x 1066 px** |
| **Product Catalogue Items** (Uploaded via Admin) | Individual dresses, suits, and accessories | `3:4` (Vertical standard) | **1000 x 1333 px** |

---

## 2. Creative & Aesthetic Guidelines

To preserve the elite brand look of **ILLUME**, instruct your photographer to follow these styling principles during your photo shoots:

### 🌟 Lighting and Contrast
*   **Aesthetic:** Editorial and high-fashion. Avoid harsh, overexposed studio flashes that wash out fabric texture. 
*   **Fabric Details:** Since ILLUME specializes in custom hand-beaded lace, silk chiffons, and fine virgin wool, take close-ups or well-lit shots that showcase the texture, stitching, and beadwork.

### 🎨 Color Palette Harmony
Your website uses a sleek, curated color scheme consisting of **Deep Luxury Purple**, **Champagne Gold**, **Soft Milk/Cream**, and **Sleek Charcoal/Black**.
*   **Backgrounds:** Opt for cream, off-white, light gray, or deep dark backgrounds. Avoid bright neon or heavily cluttered backgrounds.
*   **Model Styling:** Earthy tones, gold accessories, or rich colors stand out beautifully against the site's layout.

---

## 3. Formatting & Performance Guidelines

Heavy images will slow down your site, causing prospective clients to leave before the page loads. Follow these rules before saving your photos:

1.  **File Format:** 
    *   Use `.webp` (recommended for ultra-fast loading).
    *   Alternatively, use compressed `.jpg` or `.png`.
2.  **Compression:** Run your final exported photos through a free online compressor like [TinyPNG](https://tinypng.com) or [Squoosh](https://squoosh.app) to reduce file sizes (aim for **under 300KB** per image).
3.  **Filenames:** Keep filenames lowercase and simple, separating words with underscores (e.g., `bridal_gala_front.webp`).

---

## 4. How to Replace the Images

### Option A: Replacing Static Backgrounds (Developer Method)
If you have a designer or developer managing your files, they can simply overwrite the files inside the `public/images/` directory of the website code with your new images. Ensure the filenames match the target file exactly:
*   e.g., replace `public/images/hero_bridal.png` with your new photo renamed as `hero_bridal.png`.

### Option B: Uploading via the Admin Panel (Dashboard Method)
For garments, bridal items, and suits in your catalogue, you do not need a developer:
1.  Log in to your Admin Dashboard (`illume.ng/admin`).
2.  Go to **Products** and click **Edit** on any item.
3.  Upload the new photo link or image file into the image field.
4.  Click **Save**. The product image updates instantly across the website!
