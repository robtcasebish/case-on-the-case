# Deploying Case on the Case

The site is a **static** Astro build. The source of truth lives on GitHub
(`robtcasebish/case-on-the-case`), and the built site is published to a **Kinsta
hosting environment** that serves files from a `public/` web root.

> Note on the environment: this is a Kinsta *WordPress* hosting plan, but no
> WordPress is actually used — we serve the built static site directly out of
> `public/`. The original placeholder was saved to
> `/www/caseonthecase_753/index.html.kinsta-placeholder.bak`.

## How deploys work

Deployment is a single command, run from the project root on the dev machine:

```powershell
.\deploy-kinsta.ps1
```

That script:
1. Builds the site (`npm run build` → `dist/`)
2. Packages `dist/` into a tarball
3. Uploads it over SSH (**key auth**, no password) and extracts it into the
   server's `public/` web root, replacing the previous build

### Server / connection details

| Item | Value |
| :--- | :--- |
| SSH host | `40.233.76.229` · port `12866` |
| User | `caseonthecase` |
| Web root | `/www/caseonthecase_753/public` |
| Deploy key | `~/.ssh/kinsta_caseonthecase` (public half is in the server's `authorized_keys`) |
| Host key | `SHA256:mo6n9LE97U+Y2wpB5WcTKu2R5tlWLzo9/fy+2O6NPoc` |
| Temp URL | https://caseonthecase.kinsta.cloud/ |

Because deploys use the SSH **key**, the SFTP/SSH **password** can be rotated in
MyKinsta at any time without breaking deployment. (It should be rotated — it was
shared during setup.)

## Typical workflow

```powershell
# 1. Make changes (e.g. add a story in src/content/stories/)
# 2. Commit to GitHub (source of truth)
git add .
git commit -m "Add story: <title>"
git push

# 3. Publish to the live server
.\deploy-kinsta.ps1
```

## Going live on caseonthecase.com

The site currently serves on the Kinsta temp domain. To switch to the real
domain:

1. In MyKinsta → this site → **Domains** → **Add domain**: add `caseonthecase.com`
   and `www.caseonthecase.com`.
2. Kinsta shows DNS records (A / CNAME). Add them at the registrar for
   `caseonthecase.com`.
3. Kinsta auto-provisions SSL once DNS resolves.

Canonical URLs are already hard-coded to `https://caseonthecase.com` in
`src/site.config.ts`, so SEO/structured data are correct the moment DNS flips.

## Post-launch SEO/GEO checklist

- [ ] **Google Search Console** — verify domain, submit `/sitemap-index.xml`
- [ ] **Bing Webmaster Tools** — verify + submit the same sitemap
- [ ] Validate a story with Google's
      [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) sanity check
- [ ] Add real social profiles to `SOCIAL` in `src/site.config.ts` (feeds
      `sameAs` schema)
- [ ] Rotate the Kinsta SFTP/SSH password
