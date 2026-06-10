# Flagship Article Quality Checklist

The standard every Case on the Case case page should meet before it goes live.
The **D. B. Cooper** article (`src/content/cases/db-cooper.md`) is the reference
example, when in doubt, match its structure, voice, and sourcing.

> A case is ready to publish when every box below is honestly checked and
> `placeholder: false` is set.

---

## 1. Structure, the 8-part template (in order)

The template is enforced by the page layout. Section 1 and section 8 live in
frontmatter; sections 2–7 are `##` headings in the body, in this exact order:

1. **The Case in One Sentence** → frontmatter `oneSentence` (one clear sentence).
2. **Who Was Involved** → `## Who Was Involved`
3. **What Happened** → `## What Happened`
4. **The Investigation** → `## The Investigation`
5. **The Breakthrough** → `## The Breakthrough`
6. **Where the Case Stands Today** → `## Where the Case Stands Today`
7. **Why This Case Still Matters** → `## Why This Case Still Matters`
8. **Sources / Further Reading** → frontmatter `sources` (rendered automatically)

- [ ] All six body headings are present, in order, with the exact wording above.
- [ ] `oneSentence` is a single, self-contained sentence a reader could quote.
- [ ] No empty sections. If a section is genuinely unknowable, say so plainly
      rather than padding it.

## 2. Brand voice

- [ ] **Investigative**, leads with facts and the chain of what's known.
- [ ] **Cinematic but restrained**, atmosphere comes from real detail, never
      from adjectives, dread, or melodrama.
- [ ] **Respectful**, victims and families are treated as real people. No gore,
      no shock, no exploitation.
- [ ] **Clear & factual**, plain language; readable for a general audience.
- [ ] **Not sensationalized**, no hype, no "you won't believe," no true-crime clichés.
- [ ] Headings are the house wording; body is serious, not lurid.

## 3. Factual integrity (non-negotiable)

- [ ] **No invented facts.** Every concrete claim, names, dates, places,
      figures, is supported by a real, citable source.
- [ ] **Cautious language where details are disputed.** Use "by most accounts,"
      "reportedly," "the evidence does not settle it," "remains disputed." Label
      theories as theories.
- [ ] **Presumption of innocence.** Name a person as a suspect/person of interest
      only with sourcing, and never imply guilt absent a conviction.
- [ ] **Status is accurate**, `caseStatus` (Solved / Unsolved / Cold / Ongoing)
      matches reality, and the body doesn't overstate certainty.
- [ ] Distinguish what is *known* from what is *believed* or *alleged*.

## 4. Sources / Further Reading

- [ ] At least 2–3 credible sources in frontmatter `sources` (primary sources and
      reputable reporting preferred).
- [ ] Each source has a clear `title` and `publisher`. Add `url` **only** if you
      are confident the link is correct and stable (a wrong link is worse than none).
- [ ] Sources actually support the specific claims made in the article.

## 5. Readability & formatting

- [ ] Short paragraphs (2–5 sentences). Generous whitespace; never cramped.
- [ ] Key figures and turning points are easy to scan (a **bold** term where it
      genuinely helps, used sparingly).
- [ ] No horror fonts, all-caps shouting, or gratuitous emphasis.
- [ ] Polished but **not overly long**, roughly 700–1,400 words is the target
      for a flagship case. Tighten ruthlessly.

## 6. Frontmatter & SEO/GEO

- [ ] `title` is the case name (≤ 120 chars).
- [ ] `description` is a true, citable 1–2 sentence summary (40–320 chars), this
      feeds search snippets and AI engines.
- [ ] `categories` lists every category the case belongs to; the **first** is the
      primary (drives the badge and grouping). Cross-list where it genuinely fits.
- [ ] `location`, `caseYear`, `caseStatus` filled where known.
- [ ] `dek` (optional) is a strong one-line subhead.
- [ ] `pubDate` set; add `updatedDate` when revising a published case.
- [ ] `tags` add useful entity keywords (optional).

## 7. Ethics & care

- [ ] Would the victim's family find this fair and non-exploitative?
- [ ] No graphic detail included purely for shock.
- [ ] Speculation is clearly framed as speculation, never as fact.

## 8. Pre-publish

- [ ] `placeholder: false` is set.
- [ ] `npm run build` passes with no errors.
- [ ] Skim the rendered page: one-sentence callout reads well, all sections flow,
      sources render, structured data is intact.
- [ ] Deploy: `.\deploy-kinsta.ps1`.

---

### Quick reference: minimum frontmatter for a flagship case

```yaml
---
title: "Case Name"
description: "One- to two-sentence factual, citable summary."
oneSentence: "The single-sentence version of the case."
dek: "Optional one-line subhead."
pubDate: 2026-06-10
categories: ["Primary Category", "Secondary Category"]
caseStatus: "Unsolved"   # Solved | Unsolved | Cold | Ongoing
location: "City / Region, Country"
caseYear: 1971
tags: ["keyword", "keyword"]
sources:
  - title: "Source title"
    url: "https://example.com"   # only if confident & stable
    publisher: "Publisher"
placeholder: false
---
```
