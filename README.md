# ArtisanLink - AI Market Linkage & Smart Cataloging App 🎨

SIH 2026 – PS 26090: "AI Market Linkage & Smart Cataloging App for Marginalized Artisans"

**ArtisanLink** empowers marginalized artisans (weavers, potters, tribal craftspeople) to easily catalog and sell their handmade crafts. By simply taking a photo and adding a few words, our AI automatically tags the product (category, material, region) and lists it directly to a buyer-facing catalog.

## Tech Stack
- **Frontend**: React (Vite) with Vanilla CSS (Glassmorphism design)
- **Backend/Database**: Firebase (Firestore for data, Storage for photos)
- **AI Integration**: Vercel Serverless Functions (`/api/tag-image.js`)

## Hackathon Shortcuts & Production Gaps
> [!WARNING]
> This is a 30-hour Hackathon Prototype and includes several purposeful shortcuts:
> 1. **AI Tagging Heuristic**: We are currently using a keyword-based fallback heuristic inside `/api/tag-image.js` to simulate the AI tagger. To swap in a real Vision API (like OpenAI or Gemini), simply uncomment the fetch block in that file and add the required `VISION_API_KEY` to Vercel environment variables. 
> 2. **Authentication**: Real Firebase Auth is scoped but currently bypassed in the UI. Users simply select "I am an Artisan" or "I am a Buyer" on the landing page to quickly test the flows.
> 3. **Image Uploading**: The UI simulates an image upload progress bar, but for ease of demoing without a strictly configured Firebase Storage bucket, it saves a high-quality fallback image URL to Firestore.

## How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase (Optional for local testing)
If you want to test live Firestore writes:
- Create a Firebase project and add a web app.
- Copy your config and either paste it directly into `src/services/firebase.js` or create a `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

## Deployment to Vercel
1. Push this repository to GitHub.
2. Import the project in Vercel.
3. Add the Firebase environment variables to the Vercel project settings.
4. Deploy! The Vercel Serverless Functions will automatically host the AI tagging API.
