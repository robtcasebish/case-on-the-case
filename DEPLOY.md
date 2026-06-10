# Deploying Case on the Case to Kinsta

The site is a **static** Astro build, so the cheapest and fastest fit is
**Kinsta Static Site Hosting** (free tier available), which deploys automatically
from a Git repository. This is a one-time setup; after that, every `git push`
publishes automatically.

---

## One-time setup (~5 minutes)

### 1. Put the code on GitHub

You need a GitHub (or GitLab/Bitbucket) repo for Kinsta to watch.

1. Create an **empty** repository at https://github.com/new
   (e.g. `case-on-the-case`) — do **not** add a README/.gitignore there.
2. Back in this project, connect and push (I can run these for you once you've
   created the repo and authenticated, or run them yourself):

   ```powershell
   git remote add origin https://github.com/<your-username>/case-on-the-case.git
   git branch -M main
   git push -u origin main
   ```

   The first push will prompt you to authenticate with GitHub in your browser.

### 2. Create the Static Site in MyKinsta

1. Log in to https://my.kinsta.com
2. Click **Add service → Static Site**.
3. **Connect your Git provider** (GitHub) and authorize Kinsta, then select the
   `case-on-the-case` repository and the `main` branch.
4. Set the build settings:

   | Setting              | Value           |
   | :------------------- | :-------------- |
   | **Build command**    | `npm run build` |
   | **Publish directory**| `dist`          |
   | **Node version**     | 22 (matches `.nvmrc`) |

5. Click **Create**. Kinsta installs dependencies, runs the build, and publishes
   `dist/`. First deploy takes ~1–2 minutes.

### 3. Point the domain (caseonthecase.com)

1. In the static site's **Domains** tab, add `caseonthecase.com` and
   `www.caseonthecase.com`.
2. Kinsta shows the DNS records to set. At your domain registrar, add them:
   - Typically a `CNAME` (or `A`/`ALIAS`) for the apex/`www` as Kinsta specifies.
3. Kinsta provisions a free SSL certificate automatically once DNS resolves
   (can take from minutes up to a few hours to propagate).

> The site's canonical URLs are already hard-coded to
> `https://caseonthecase.com` in `src/site.config.ts`, so links, sitemap, and
> structured data will be correct the moment the domain goes live.

---

## Ongoing workflow

To publish anything (new story, design change), just commit and push:

```powershell
git add .
git commit -m "Add story: <title>"
git push
```

Kinsta detects the push, rebuilds, and deploys. No dashboard needed.

---

## Post-launch SEO/GEO checklist

Once the domain is live and SSL is active:

- [ ] **Google Search Console** — verify the domain, submit
      `https://caseonthecase.com/sitemap-index.xml`.
- [ ] **Bing Webmaster Tools** — verify + submit the same sitemap (also feeds
      ChatGPT/Copilot search).
- [ ] Confirm `https://caseonthecase.com/robots.txt`, `/llms.txt`, and
      `/rss.xml` all load.
- [ ] Validate a story's structured data with Google's
      [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) — expect strong Core
      Web Vitals out of the box.
- [ ] (Optional) Add real social profiles to `SOCIAL` in `src/site.config.ts`
      so they appear in `sameAs` schema.

---

## Alternative: deploy without GitHub

If you'd rather not use Git hosting, Kinsta Static Sites also support manual
deploys, and the standard Kinsta **Application Hosting** can run the build too.
Git-based is recommended because it makes every future update a one-line push.
The built site is just the static `dist/` folder, so it can also be hosted on any
static host (Cloudflare Pages, Netlify, etc.) if you ever migrate.
