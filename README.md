# Tadem Website — Deployment & Setup Guide

This is your brand-new Tadem website, built from your blueprint pages, logo, director photos and client logos. It's plain HTML/CSS/JavaScript — no build tools, no coding required to run it — which makes it a perfect fit for **GitHub Pages** (your current host).

Everything below is written for a non-technical setup. Follow the sections in order.

---

## 1. What's in this folder

```
index.html          → Home page
about.html           → About Us page
services.html        → Services page
industries.html       → Industries page
contact.html          → Contact page
css/style.css         → All the site's design/styling
js/script.js          → Mobile menu, contact form, small animations
assets/               → Logo, favicon, director photos, client logos
CNAME                 → Tells GitHub Pages your custom domain is tademgroup.com
robots.txt, sitemap.xml → Basic SEO housekeeping for search engines
```

You don't need to open or edit any of these files unless you want to change text/images later (see Section 5).

---

## 2. Publish it on GitHub Pages (replacing your old site)

Since your site is already hosted on GitHub Pages, you're just swapping the old files for these new ones.

1. Go to your existing GitHub repository for tademgroup.com (in a browser, log in to github.com).
2. Open the repository. **Delete the old website files** (the old HTML/CSS files your friend built) — or, safer: keep them for now and just add the new files on top; GitHub will ask to overwrite any files with the same name.
3. Click **Add file → Upload files**, then drag in *every file and folder* from this package (keep the folder structure exactly as-is: `css/`, `js/`, `assets/` must stay as folders, not be flattened).
4. Scroll down and click **Commit changes**.
5. Go to the repository's **Settings → Pages**.
6. Under "Build and deployment", make sure the source is set to deploy from your main branch (root folder).
7. Under **Custom domain**, type `tademgroup.com` and click **Save**. (This is also handled by the `CNAME` file included in this package, but entering it here too makes GitHub double-check the DNS for you.)
8. Wait a few minutes, then tick **Enforce HTTPS** once GitHub shows the padlock is available (it may take up to 24 hours the first time).

Your site will be live at `https://tademgroup.com` once the DNS step below is also done.

---

## 3. Point your GoDaddy domain at GitHub Pages

Your domain is bought on GoDaddy but your site is hosted on GitHub, so GoDaddy needs to be told where to send visitors.

1. Log in to **godaddy.com → My Products → DNS** for `tademgroup.com`.
2. Find the **A records** (they route your root domain `tademgroup.com`). Delete any existing A records and add these four, all pointing to GitHub Pages' servers:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |

3. Find (or add) a **CNAME record** for the `www` subdomain:

   | Type | Name | Value |
   |------|------|-------|
   | CNAME | www | *your-github-username*.github.io |

4. Save. DNS changes can take anywhere from a few minutes to a few hours to fully apply worldwide — this is normal, just be patient.
5. Once it's propagated, both `tademgroup.com` and `www.tademgroup.com` will show your new site.

*(Your email — hosted on Zoho — uses separate MX records in the same GoDaddy DNS panel. Don't touch those; only add/change the A and CNAME records above, and your Zoho email will keep working exactly as before.)*

---

## 4. The "Send Us a Message" contact form

Your Contact page form needs somewhere to deliver enquiries, since GitHub Pages can't run its own server code. It's wired up to use **Formspree** — a free service that emails every submission straight to your Zoho inbox — and it's already activated with your real form (`https://formspree.io/f/mdeopprq`), pointed at `contact@tademgroup.com`. There's nothing left to configure: once the site is live, submissions will land directly in that inbox, and Formspree's dashboard (formspree.io) keeps a log of every submission too.

If you ever need to swap it for a different Formspree form, open `contact.html`, find:
```html
<form id="contact-form" action="https://formspree.io/f/mdeopprq" method="POST">
```
and replace the ID after `/f/` with the new one.

---

## 5. Making changes later (no coding needed for most edits)

- **Text**: Open any `.html` file on GitHub (pencil/edit icon), find the sentence you want to change, edit it, and commit. All the visible text sits in plain English inside the file.
- **Client logos**: Add new logo files into `assets/images/clients/`, then add one line to the logo strip in `index.html` and the grid in `industries.html` (copy an existing `<img ...>` line and change the file name).
- **Photos**: The hero banners currently use a clean graphic/gradient design (no stock photography) because we didn't have real photos of your project sites. Whenever you have real project photos, send them over and they can be dropped in to replace the graphic banners — just let us know.
- **Phone/email/address**: These appear in the footer of every page and on the Contact page — search for them (e.g. `+91 99496`) and update everywhere they occur.

If anything feels risky to edit yourself, it's always safest to come back and ask for a hand rather than guessing — GitHub keeps full history, so nothing is ever truly lost, but it's easy to accidentally break a layout with a stray character.

---

## 6. Quick pre-launch checklist

- [ ] Files uploaded to GitHub, folder structure intact
- [ ] Custom domain set to `tademgroup.com` in GitHub Pages settings
- [ ] GoDaddy A records + www CNAME updated
- [ ] HTTPS enforced (padlock shows in GitHub Pages settings)
- [x] Formspree form ID added to `contact.html`
- [ ] Test the contact form yourself once live, to confirm the email arrives
- [ ] Click through all 5 pages and all links on a phone and a laptop

---

Built for **Tadem** — Building Strength. Delivering Trust.
