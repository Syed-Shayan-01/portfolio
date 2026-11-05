# Syed Shayan — Data Science Portfolio (Next.js)

Next.js App Router, plain JavaScript, plain CSS (same design as the HTML version).

## Run locally
1. Install Node.js 20 LTS or newer (https://nodejs.org), then check: `node -v` and `npm -v`
2. In this folder: `npm install`
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (your real domain once deployed)
4. Put your resume at `public/resume.pdf`
5. `npm run dev` → http://localhost:3000
6. Production check: `npm run build` then `npm start`

## Where to edit content
`data/site.js` holds everything: email, LinkedIn, GitHub, resume path, education, certificates
(paste the Google Drive link in `link`), projects (`repo`, `demo`) and skills.

## Deploy
Push to GitHub, import the repo in Vercel, add `NEXT_PUBLIC_SITE_URL` in Project Settings → Environment Variables.
