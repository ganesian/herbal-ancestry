# 喝安 Herbal Ancestry — Deployment Guide

## Step 1: Set Up Supabase Table

1. Go to https://supabase.com/dashboard and open your project
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the entire contents of `supabase_setup.sql`
5. Click **Run**
6. You should see "Success. No rows returned."

That creates the `bazi_users` table with the correct columns and security policies.

---

## Step 2: Push to GitHub

1. Create a new repository on https://github.com/new
   - Name it: `herbal-ancestry` (or any name you prefer)
   - Set it to **Private** (recommended — keeps your Supabase key safe)
   - Leave "Initialize repository" unchecked

2. In your terminal, navigate to this project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: 喝安 Herbal Ancestry"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/herbal-ancestry.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3: Deploy to Netlify

1. Go to https://app.netlify.com and sign in (or create a free account)
2. Click **Add new site** → **Import an existing project**
3. Choose **Deploy with GitHub**
4. Authorize Netlify and select your `herbal-ancestry` repository
5. Netlify will auto-detect the settings from `netlify.toml`. Confirm:
   - **Build command:** `npm install`
   - **Publish directory:** `public`
6. Click **Deploy site**

Netlify will build and deploy. Your site will be live at a URL like:
`https://random-name-123456.netlify.app`

---

## Step 4: Connect Your Custom Domain

1. In your Netlify dashboard, go to **Domain settings**
2. Click **Add a domain**
3. Enter your domain (e.g. `herbalanсestry.com`)
4. Netlify will provide DNS records (usually CNAME or A records)
5. Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
6. Add the DNS records Netlify provides
7. Back in Netlify, click **Verify DNS configuration**
8. Netlify will automatically provision a free SSL certificate (HTTPS)

DNS propagation takes anywhere from a few minutes to 48 hours.

---

## Step 5: Verify Everything Works

After deploy, test these URLs:

- `https://your-site.netlify.app` — the main website
- `https://your-site.netlify.app/.netlify/functions/bazi-alvamind` — should return a method error (POST required), confirming the function is live

Test the full flow:
1. Enter a city (try "Jakarta" or "Singapore")
2. Select a complete birth date and time
3. Pick a gender
4. Click **Reveal My Four Pillars**
5. Verify all 3 result boxes appear
6. Enter a WhatsApp number and re-calculate — check Supabase Table Editor to confirm the row was saved

---

## Viewing Your CRM Data

1. Go to your Supabase dashboard → **Table Editor** → `bazi_users`
2. You will see all submitted records with timestamp, name, WhatsApp, and birth info
3. You can export to CSV from the Table Editor for use in Excel or Google Sheets

---

## Project Structure

```
herbal-ancestry/
├── public/
│   └── index.html              ← The entire website (one file)
├── netlify/
│   └── functions/
│       ├── bazi-alvamind.mjs   ← Alvamind calculator function
│       ├── bazi-tinytiny.mjs   ← Tinytiny converter function
│       ├── save-user.mjs       ← Supabase save function
│       └── dates_mapping.json  ← Ba Zi date lookup data (7MB)
├── netlify.toml                ← Netlify build config
├── package.json                ← Node dependencies
└── supabase_setup.sql          ← Run once in Supabase SQL Editor
```

---

## Future Maintenance

- To update the website UI: edit `public/index.html` and push to GitHub. Netlify auto-deploys.
- To add features: all frontend logic is in the `<script>` tag at the bottom of `index.html`.
- The Netlify Functions are in `netlify/functions/` — each is a standalone `.mjs` file.
- Dependencies are managed via `package.json`. Run `npm install` locally to test.

---

## Notes on the Three Calculators

| Calculator | Source | Method |
|---|---|---|
| **Alvamind** | `bazi-calculator-by-alvamind` npm | JSON date mapping table |
| **Tinytiny** | `bazi-converter` npm | Wikibooks date scraping |
| **Gmuli** | Gmuli-Bazi-Calc (inline JS) | Solar term calculation |

Results may differ slightly across the three because they use different data sources and solar term boundary logic. This is expected and reflects the diversity of Ba Zi calculation methods.
