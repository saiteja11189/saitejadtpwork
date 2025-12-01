# Deployment Guide for KNRAJU.ap

This guide will help you host your website on **Netlify** (a free, high-performance hosting provider) and connect it to your domain `knraju.works`.

## Step 1: Prepare Your Files
1. Ensure all your project files (`index.html`, `styles.css`, `script.js`, `data.js`, images, etc.) are in a single folder.
2. You should see `robots.txt` and `404.html` in this folder as well.

## Step 2: Deploy to Netlify (Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. If you are not logged in, sign up for a free account.
3. Drag and drop your **entire project folder** into the "Drag and drop your site folder here" area.
4. Wait a few seconds for the upload to complete.
5. Your site is now live on a random Netlify URL (e.g., `jolly-panda-123456.netlify.app`).

## Step 3: Connect Your Domain (knraju.works)
1. In your Netlify dashboard, click on **"Domain settings"**.
2. Click **"Add custom domain"**.
3. Enter `knraju.works` and click **Verify**.
4. Click **"Add domain"**.

## Step 4: Update DNS Records (At Name.com)
You need to point your domain to Netlify. The easiest way is to use **Name.com's Nameserver Management**.

1. Log in to your **Name.com** account.
2. Click on **"My Domains"** and select `knraju.works`.
3. Look for the **"Nameservers"** section (it might be in the sidebar or under "Quick Links").
4. Click **"Manage Nameservers"**.
5. Delete any existing nameservers (like `ns1.name.com`).
6. Add the **4 nameservers** provided by Netlify (from Step 3). They will look like:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`
7. Click **"Save Changes"**.

*Alternatively, if you want to keep using Name.com's DNS:*
1. Go to **"Manage DNS Records"**.
2. Add an **A Record**:
   - Host: leave blank or `@`
   - Answer: `75.2.60.5`
3. Add a **CNAME Record**:
   - Host: `www`
   - Answer: `[your-site-name].netlify.app`

## Step 5: Wait for Propagation
DNS changes can take anywhere from a few minutes to 24 hours to propagate globally. Once done, `knraju.works` will show your new website with a secure HTTPS lock icon automatically!
