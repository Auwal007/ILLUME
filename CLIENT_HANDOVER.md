# ILLUME Bespoke Couture — Client Handover & Review Guide

This guide is prepared to facilitate a smooth review, feedback, and final delivery process for **ILLUME**, an African luxury fashion house. It details the recommended documents to hand over to the client, outlines how they can request changes, explains the current use of AI-generated media, and highlights key technical details.

---

## 1. Recommended Client Deliverables Package
To ensure the client feels fully supported and empowered to manage their luxury digital platform, we recommend providing them with the following set of documents:

| Document Title | Target Audience | Description & Value |
| :--- | :--- | :--- |
| **1. Admin & Content Management Guide** | Store Manager / Client | Step-by-step instructions on logging into `/admin`, managing products (adding gowns/suits, updating prices), organizing collections, and handling client inquiries. |
| **2. Media Asset Specification Sheet** | Photographer / Client | Detailed dimensions, file sizes, and aesthetic guidelines for replacing the current AI-generated placeholder images. |
| **3. Client Review & Feedback Sheet** | Client / Stakeholders | A structured template (Word or Google Sheet) for logging copy edits, design tweaks, or adjustments during this final review phase. |
| **4. Technical Handover & Credentials Sheet** | Client's Tech Lead / Files | Details on hosting (e.g., Vercel), database credentials (Firebase), WhatsApp CTA numbers, and domain settings. |

---

## 2. Crucial Notice: AI-Generated Media & Replacement
To achieve a premium and visually stunning design during development, we utilized highly curated, custom AI-generated images. These act as high-fidelity placeholders that match the luxury brand identity of ILLUME.

> [!IMPORTANT]
> **Client Action Needed:** These images must be replaced with the client's actual professional photography (bridal collections, bespoke suits, and editorial shoots) before the final public launch.

### Current High-Fidelity Placeholders:
*   **Hero Image** (`/images/hero_bridal.png`): Main homepage cover representing bespoke bridal couture.
*   **Atelier Categories** (`/images/bridal_asoebi.png`, `/images/suits_dinner.png`, `/images/african_luxury.png`, `/images/evening_couture.png`, `/images/heritage.png`, `/images/consultancy.png`): Custom images matching each fashion department.
*   **Founder Profile** (`/images/visionary_designer.png`): Used on the About page to represent the luxury designer.

### Image Replacement Guidelines:
Once the client provides their professional photography, we can replace the files in `public/images/` keeping the exact same filenames, or upload them dynamically via the Admin Dashboard.
*   **Hero Gowns & Models:** Recommend portrait/vertical orientation (`3:4` or `9:16` aspect ratio) with high resolution (min `1200px` width).
*   **Suits & Evening Wear Grid:** Aspect ratio `3:4` (e.g., `1200x1600px`) for consistent styling.
*   **Color Tone:** Deep purple accents, warm gold, charcoal, and milk/white backgrounds to align with the ILLUME premium color palette.

---

## 3. Inviting Client Feedback & Design Adjustments
We want to make sure the site matches the client's creative vision perfectly. Encourage them to review the site thoroughly and provide input on the following:

> [!TIP]
> **How the Client Should Log Changes:**
> Provide the client with a spreadsheet or shared document categorized by page (e.g., Home, About, Catalogue, Contact). They should note:
> 1. **Section/Page:** (e.g., "Home FAQ" or "About Page Bio")
> 2. **Current Text/Layout:** What is currently there.
> 3. **Requested Adjustment:** What they want it changed to (e.g., correcting spelling, modifying prices, or rephrasing brand philosophy).
> 4. **Priority:** (High / Medium / Low)

### Core Sections for Client Review:
1.  **Brand Copy & Philosophy:** Verify if the founder quote, brand description, and FAQ answers match their tone of voice.
2.  **Product Catalogue:** Review the initial bespoke pieces (Zahra Bridal Gown, Abuja Signature Suit, etc.), descriptions, and prices.
3.  **WhatsApp Integrations:** Test the "Inquire via WhatsApp" buttons to ensure they route to the correct phone number and pre-fill the correct text.
4.  **Admin Dashboard usability:** Verify if they find the admin interface intuitive for adding new couture items.

---

## 4. Key Platform Features & Technical Details
Provide the client with a quick overview of the modern features we have built for them:

*   **Premium Interactive Design:** Smooth scrolling and animations powered by Framer Motion, matching elite fashion labels.
*   **Robust Administration Portal:** A secured dashboard where the client can log in (`/admin`), create/modify products, create custom collections (e.g. "Summer Bridal 2026"), and view incoming inquiries.
*   **Direct Inquiry Capture:**
    *   *WhatsApp Instant Enquiries:* Directly forwards clients from products to the designer's chat with product info.
    *   *Database Inquiries:* Submissions from the contact form are stored safely in Firestore and accessible in the Admin panel under "Inquiries".
*   **SEO Optimization:** Fully optimized titles, headings, and page descriptions targeting luxury African bridal and menswear searches.

---

## 5. Recommended Next Steps Checklist
Before going live on the client's custom domain (e.g., `illume.com`):

- [ ]  **Review Admin Login Credentials:** Reset the default administrator password in the database from `admin123` to a secure, unique phrase.
- [ ]  **Verify WhatsApp Numbers:** Update the phone numbers in the environment variables to the client's official customer care lines.
- [ ]  **Professional Photography Upload:** Replace placeholders with actual product catalog images.
- [ ]  **Add Custom Domain:** Configure domain DNS records on Vercel to route to the client's domain.
- [ ]  **Verify Firestore Rules:** Ensure database security rules are locked down for production.
