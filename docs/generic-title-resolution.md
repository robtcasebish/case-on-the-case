# Generic title resolution

Five case files had generic, non-identifying titles. Per the editorial rule
(do not invent facts or force a case to fit a title), each was mapped to a
verified real case, merged into an existing article, or retired. Slugs were
kept to avoid routing changes; only display titles changed.

Resolved 2026-06-11.

---

## 1. "1996: The Ransom Note"

- **Slug:** `1996-the-ransom-note`
- **Resolved subject / title:** JonBenét Ramsey, displayed as **"The Ransom Note: JonBenét Ramsey"**
- **Action:** Renamed and written as a full, evidence-led article (angle: the ransom note).
- **Reason:** The title (1996 + ransom note + a case debated for decades, filed under The Evidence Room) unambiguously points to the JonBenét Ramsey case.
- **Editorial care:** Case is unsolved; the article states the Ramsey family was formally cleared by the Boulder DA via DNA in 2008 and preserves presumption of innocence for everyone. No implication of guilt by any person.
- **placeholder:** now `false`.
- **Primary sources used to verify:**
  - https://bouldercolorado.gov/jonbenet-ramsey-homicide (Boulder PD official case page)
  - https://www.cbsnews.com/news/dna-clears-family-in-jonbenet-slaying-09-07-2008/ (2008 DA exoneration)
  - https://www.cbsnews.com/news/jonbenet-ramsey-case-colorado-ransom-note-evidence-48-hours/ (ransom note / scene)
  - https://abcnews.com/blogs/headlines/2013/10/jonbenet-ramsey-judge-orders-grand-jury-documents-released (1999 grand jury, DA declined)

## 2. "The Silent Witness, 1982"

- **Slug:** `the-silent-witness-1982`
- **Resolved subject / title:** Wayne Williams / Atlanta Child Murders (fiber evidence), displayed as **"The Silent Witness: Wayne Williams and the Fiber Evidence"**
- **Action:** Renamed and written as an evidence-led article centered on the trace fiber evidence, including the "English Olive" Luxaire carpet fiber.
- **Reason:** Assignment confirmed by the owner.
- **Editorial care:** Legally precise. Williams was convicted in 1982 of TWO ADULT murders (Nathaniel Cater, Jimmy Ray Payne); he was not tried for the child murders, which were "linked/attributed" only. Victims-centered, not an offender profile. Later DNA re-examination noted.
- **placeholder:** now `false`.
- **Primary sources used to verify:**
  - https://www.ojp.gov/ncjrs/virtual-library/abstracts/fiber-evidence-and-wayne-williams-trial-conclusion (DOJ/OJP, fiber methodology)
  - https://case-law.vlex.com/vid/williams-v-state-no-886152708 (Williams v. State, Ga. Supreme Court, 1983, conviction counts)
  - https://www.todayingeorgiahistory.org/tih-georgia-day/atlanta-child-murders/
  - https://www.gpb.org/news/2021/10/19/utah-lab-analyze-dna-evidence-atlanta-child-murders (2019/2021 re-examination)

## 3. "Citizen Justice"

- **Slug:** `citizen-justice`
- **Resolved subject / title:** The Night Stalker capture (Richard Ramirez), displayed as **"The Night Stalker: When the Public Closed In"**
- **Action:** Renamed and written, centered on the public recognition and citizen capture of August 31, 1985, not on graphic crime detail.
- **Reason:** Owner's assignment; fits the Citizen Sleuths theme (public recognition / community action).
- **Editorial care:** Convicted offender (1989), so guilt on those counts is stated and cited. Victims and community centered; not sensationalized.
- **placeholder:** now `false`.
- **Primary sources used to verify:**
  - https://scocal.stanford.edu/opinion/people-v-ramirez-33683 (Cal. Supreme Court, conviction counts, affirmed)
  - https://www.history.com/this-day-in-history/august-31/los-angeles-mob-attacks-night-stalker
  - https://www.britannica.com/biography/Richard-Ramirez
  - https://www.aetv.com/articles/richard-ramirez-capture

## 4. "Hidden in Plain Sight"

- **Slug:** `hidden-in-plain-sight`
- **Resolved subject / title:** Golden State Killer (Joseph James DeAngelo), displayed as **"Hidden in Plain Sight: The Golden State Killer"**
- **Action:** Renamed and written, centered on the investigative genetic genealogy breakthrough. Confirmed no existing Golden State Killer page (no duplicate).
- **Reason:** Owner's recommendation; "hidden in plain sight" fits an ordinary-seeming offender identified after four decades.
- **Editorial care:** DeAngelo pleaded guilty (2020), so guilt is stated and cited. Victims, survivors, and investigators centered. Genealogy method described accurately (GEDmatch, family trees, Paul Holes, Barbara Rae-Venter, Michelle McNamara's naming role).
- **placeholder:** now `false`.
- **Primary sources used to verify:**
  - https://www.contracosta.ca.gov/CivicAlerts.aspx?AID=2331&ARC=8982 (DA news release, guilty plea)
  - https://www.pbs.org/newshour/nation/golden-state-killer-pleads-guilty-to-13-murders-evades-death-penalty (AP, sentencing)
  - https://www.cbsnews.com/news/golden-state-killer-joseph-deangelo-sentenced-to-life-in-prison/ (AP, life sentence)
  - https://abcnews.com/US/dna-family-members-helped-solved-golden-state-killer/story?id=54800093 (genealogy method)

## 5. "The Case That Changed the Law, 1981"

- **Slug:** `the-case-that-changed-the-law-1981`
- **Resolved subject:** Adam Walsh (1981), which is **already a published article** at `/cases/adam-walsh`.
- **Action:** DUPLICATE. Not rewritten. The generic page was retired: `draft: true` (removes it from all public listings and from page generation), and `astro.config.mjs` now redirects `/cases/the-case-that-changed-the-law-1981` to `/cases/adam-walsh`. An internal TODO in the file notes it can be deleted once the redirect is confirmed in production.
- **Reason:** The 1981 "changed the law" case is Adam Walsh; creating a second article would duplicate the existing one, which already carries the missing-children-movement and Adam Walsh Child Protection and Safety Act legacy.
- **placeholder:** remains `true` but the page is now `draft: true` (not public). No new article was published.
- **Canonical article:** `/cases/adam-walsh` (sourced: CBS News, ABC News, GPO statute text, White House archive, NCMEC).

---

## Pre-publish checklist (applies to every completed article)

- [ ] Real, named subject with substantial article content.
- [ ] All major factual claims are supported by credible linked sources.
- [ ] Sources / Further Reading present, every source has a readable title and a clickable, verified URL.
- [ ] Legal status, convictions, dates, names, and case status verified and precisely worded.
- [ ] Presumption of innocence preserved for anyone not convicted.
- [ ] `placeholder: false` only when the above are true.
