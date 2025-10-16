# Mock-Prep Planner (Password-gated)

## Run locally
1) Install Node.js (includes npm) from https://nodejs.org (LTS).
2) In this folder, create `.env.local` with:
   PASSCODE=your-secret-code
3) Install deps & run:
   npm install
   npm run dev
4) Open http://localhost:3000

## Deploy to Vercel
1) Push this folder to a new GitHub repo.
2) Import the repo at https://vercel.com/new
3) In Project → Settings → Environment Variables:
     Key: PASSCODE   Value: your-secret-code
4) Deploy. Visit your Vercel URL, enter the passcode, done.

## Replace the planner HTML
Edit `public/plan.html` and paste your full planner HTML.
