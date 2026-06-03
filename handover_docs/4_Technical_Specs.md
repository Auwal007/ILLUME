# ILLUME Bespoke Couture — Technical Handover & Credentials Sheet

This document outlines the technical architecture, database configurations, environment variables, and credential details for **illume.ng**. Keep this sheet secure as it contains sensitive database keys and production configurations.

---

## 1. Technology Stack Overview

The platform is engineered using modern, industry-standard technologies to ensure fast load speeds, secure data operations, and smooth user transitions:

*   **Frontend Framework:** Next.js (React Framework, using the modern App Router architecture).
*   **Language:** TypeScript (for type safety and code reliability).
*   **Styling & UI:** Vanilla CSS (optimized for fast rendering and complete design control) with Tailwind CSS support.
*   **Animations:** Framer Motion (providing premium micro-interactions and smooth slide animations).
*   **Database & Backend:** Firebase Firestore (NoSQL cloud database for storing catalogue items, collections, client inquiries, and user accounts).
*   **Authentication:** NextAuth.js (securing the `/admin` route and managing administrator sessions).

---

## 2. Production Domain & Admin Account

*   **Production Domain:** [https://illume.ng](https://illume.ng)
*   **Admin Dashboard URL:** [https://illume.ng/admin](https://illume.ng/admin)
*   **Administrator Username/Email:** `admin@illume.ng`
*   **Temporary Admin Password:** `admin123`

> [!CAUTION]
> **Action Required:** Change this password in the database/user panel immediately upon official project handover to prevent unauthorized access.

---

## 3. Database Architecture (Firebase Firestore)
The website interacts with a Firebase project to retrieve and update content dynamically. On the initial startup of the server, the system automatically checks and seeds the database with the default admin user and standard apparel categories.

### Firestore Collections Used:
1.  `users`: Stores admin accounts with hashed passwords (encrypted using `bcryptjs`).
2.  `categories`: Product categories (e.g. *Bridals & Asoebi*, *Suits & Dinner*).
3.  `collections`: Seasonal editorial blocks.
4.  `products`: Detailed garment listings (includes pricing, descriptions, slugs, images, and category relationships).
5.  `inquiries`: Stores direct customer submissions from the website contact forms.
6.  `testimonials`: Customer reviews for homepage display.

---

## 4. Environment Variables Configuration (`.env`)
To run the project in development or deploy to a hosting platform like Vercel, the following environment variables must be defined:

```env
# --- NEXT AUTH CONFIGURATION ---
NEXTAUTH_URL=https://illume.ng
NEXTAUTH_SECRET=your_random_long_secret_key_here

# --- FIREBASE SERVICE KEYS ---
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=illume-firebase-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=illume-firebase-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=illume-firebase-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# --- WHATSAPP CTA INTEGRATION ---
NEXT_PUBLIC_WHATSAPP_PHONE=234XXXXXXXXXX   # Target phone number (include country code, no "+" sign)
```

---

## 5. Security & Launch Recommendations

Before opening the site to the public, ensure your technical manager completes this checklist:

1.  **Regenerate NextAuth Secret:** Use a strong random key (e.g., generated via `openssl rand -base64 32`) for `NEXTAUTH_SECRET`.
2.  **Firestore Security Rules:** Make sure Firebase rules allow read access to `products`, `categories`, `collections`, and `testimonials` for anyone, but limit write/delete actions strictly to authenticated users (admin). `inquiries` should allow writes from the public but read/edit access only to admin users.
3.  **Update WhatsApp Number:** Verify the `NEXT_PUBLIC_WHATSAPP_PHONE` number matches the official customer support phone line to prevent messages from routing to developer phone numbers.
