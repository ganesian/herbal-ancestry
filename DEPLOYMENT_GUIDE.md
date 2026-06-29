# 喝安 Herbal Ancestry — Deployment Guide

This guide walks through deploying the website to Netlify with Neon as the database, then connecting your custom domain.

---

## Part 1: Set Up Neon Database

1. Go to https://neon.tech and sign in or create a free account.
2. Create a new project. Name it something like `hehe-bazi`.
3. Once the project is created, Neon shows a connection string that looks like this:
   ```
   postgresql://username:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
   Copy this connection string. You will paste it into Netlify in Part 3.
4. Open the Neon SQL Editor (left sidebar in the Neon dashboard).
5. Paste the contents of `schema.sql` (included in this project) and run it. This creates the `user_records` table that stores name, WhatsApp, city, birth info, and element results.
6. Confirm the table exists by running `SELECT * FROM user_records;` in the SQL editor. It should return an empty result with no errors.

---

## Part 2: Push the Project to GitHub

Netlify deploys most smoothly from a GitHub repository.

1. Create a new repository on GitHub, for example `hehe-herbal-ancestry`.
2. On your computer, unzip the project folder you received, then open a terminal inside it.
3. Run these commands:
   ```
   git init
   git add .
   git commit -m "Initial commit: 喝安 Herbal Ancestry"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hehe-herbal-ancestry.git
   git push -u origin main
   ```
4. Refresh your GitHub repository page and confirm the files appear.

---

## Part 3: Deploy to Netlify

1. Go to https://app.netlify.com and sign in or create a free account.
2. Click **Add new site** then **Import an existing project**.
3. Choose **GitHub** and authorize Netlify to access your repositories.
4. Select the `hehe-herbal-ancestry` repository.
5. Netlify will detect the `netlify.toml` file automatically. Leave build settings as they are.
6. Before deploying, click **Add environment variables** and add:
   - Key: `NEON_DATABASE_URL`
   - Value: the Neon connection string you copied in Part 1
7. Click **Deploy site**.
8. Wait for the build to finish. Netlify gives you a temporary URL like `random-name-123.netlify.app`. Open it and confirm the website loads correctly.
9. Test the form: enter a city, date, and time of birth, then click the analyze button. The four pillars and drink recommendations should appear.

---

## Part 4: Connect Your Custom Domain

1. In your Netlify site dashboard, go to **Domain management** then **Add a domain**.
2. Type your domain name, for example `heheherbal.com`, and click **Verify**.
3. Netlify will show you DNS records to add. There are two common paths:
   - **Option A: Use Netlify DNS (simplest).** Netlify gives you nameservers to set at your domain registrar (where you bought the domain, such as Niagahoster, Domainesia, or GoDaddy). Update the nameservers there, then wait for propagation, usually within a few hours.
   - **Option B: Keep your current DNS provider.** Add the A record and CNAME record Netlify provides directly in your registrar's DNS settings.
4. Once DNS propagates, Netlify automatically issues a free HTTPS certificate for your domain. This can take a few minutes to a few hours.
5. Visit your custom domain and confirm the site loads with the padlock icon showing a secure connection.

---

## Part 5: Verify Everything Works End to End

Run through this checklist after deployment:

- Toggle between EN and ID and confirm all text switches correctly.
- Submit a Ba Zi analysis with a real Indonesian city and confirm the pillars display correctly.
- Submit the form again with a WhatsApp number filled in, then check the Neon SQL Editor with `SELECT * FROM user_records ORDER BY created_at DESC;` to confirm the record saved.
- Submit the form without a WhatsApp number and confirm no new record appears in the database for that submission.
- Click **Save to PDF** and confirm the PDF downloads with the full reading.
- Click the WhatsApp contact button in the footer and confirm it opens a chat to +62 812 6221 527 in a new tab.
- Test the site on a phone screen and a tablet screen to confirm the layout adapts correctly.

---

## Notes on Costs

Both Neon and Netlify offer free tiers that are sufficient for early-stage traffic. Neon's free tier includes a generous amount of storage and compute for a project at this stage. Netlify's free tier covers function calls, bandwidth, and build minutes well beyond what early WhatsApp and Instagram driven traffic typically generates. Revisit pricing once HEHE scales past a few thousand monthly readings.

---

## Future Maintenance

Whenever you want to update the website, edit the files locally, commit, and push to GitHub. Netlify automatically rebuilds and redeploys the site within a minute or two of every push. No manual redeployment steps are needed once this pipeline is set up.
