# ProTech Website (redesigned)

A redesigned static website for the ProTech research group (Department of Textile & Fibre Engineering, IIT Delhi).

## What's here

```
protech-site/
├── index.html                          Home
├── research.html                       Research overview (6 domains, matches poster)
├── research-protective-textiles.html   Soft armour + stab-resistant armour
├── research-advanced-composites.html   3D Fabric Composites
├── facilities.html                     Salient Research Facilities
├── publications.html                   Papers, books, patents
├── awards.html                         Students' Awards + faculty recognition
├── people.html                         Faculty, current scholars, alumni
├── gallery.html                        Photo gallery (empty — needs your photos)
├── history.html                        Timeline & milestones
├── faq.html                            FAQ
├── styles.css                          All design/styling
├── script.js                           Nav, accordion, gallery lightbox behaviour
└── images/                             Photos/diagrams (6 pulled from your poster)
```

## What changed in this round (round 3)

- **Fixed oversized images**: research-page images now use a new `.media-diagram` style (contains the image, caps height at ~420px) instead of stretching full-width — this is what was making the Soft Body Armour, Stab Resistance, 3D Composite, and ML diagram images "extremely large."
- **Fixed invisible text bug**: the "Performance Highlights" stat numbers under Stab-Resistant Armour were rendering near-white text on a near-white background (the `.stat` component was only styled for dark sections, not the light `.on-canvas` ones it was also used on). Added proper light-background colors.
- **Added 22 real headshots** pulled and precisely cropped from your poster — Prof. Majumdar plus all 14 alumni, all 6 current PhD scholars, and Dr. Rajib Bhattacharya. See "Adding photos of people" below for how the pattern works if you want to add more.
- **Added Prof. Bhupendra Singh Butola** as a second faculty member/Co-PI. I don't have a photo for him (he wasn't on the poster) — his card currently shows a placeholder.

## Adding photos of people

Every person's photo is just an `<img>` tag pointing at a file in `images/people/`. Two patterns are used:

**Small avatar (faculty row)** — a `.person` card:
```html
<div class="card person">
  <img class="avatar" src="images/people/your-file.jpg" alt="Full Name">
  <div>
    <h4>Full Name</h4>
    <div class="role">Their role</div>
  </div>
</div>
```

**Larger centered avatar (alumni/scholar grids)** — a `.person-card`:
```html
<div class="person-card">
  <img class="avatar-lg" src="images/people/your-file.jpg" alt="Full Name">
  <h3>Full Name</h3>
  <p>Their role or position</p>
</div>
```

To add a photo for someone who currently has a placeholder (Prof. Butola, or any M.Tech student):
1. Save a photo into `images/people/` — a roughly square, face-centered crop works best since the CSS crops it into a circle automatically (`object-fit: cover` + `border-radius: 50%`), so it doesn't need to be pre-cropped perfectly.
2. Replace the placeholder `<div class="media-placeholder avatar" ...></div>` with an `<img class="avatar" src="images/people/filename.jpg" alt="Name">` (or `avatar-lg` for grid cards).

That's the whole pattern — same idea as the other placeholders elsewhere on the site.


Content was cross-checked against `Abhijit_Majumdar_final.pptx` (your research poster) and corrected/updated:

- **Research page** restructured into the poster's official 6 domains (Protective Textile Materials, 3D Composites, Sustainability & LCA, Textile Recycling & Circularity, Operations & Supply Chain, AI-ML Based Modelling), each with the poster's real bullet points.
- **6 real diagrams/photos** pulled from your poster and placed on the relevant pages: soft-armour panel photo, stab-resistance test schematic, 3D weave structure diagram, recycled thermal-liner/denim-jacket photo, PET-recycling flow diagram, and the ANN/Random Forest diagrams.
- **People page corrections**: fixed several alumni positions (Dr. Ankita Srivastava → NSUT Delhi, not NIFT Jodhpur; Dr. Animesh Laha → Deputy Director, WRA Mumbai; Dr. Samsu Alam → GCETT Serampore), added a PhD student I didn't have before (Vishwajeet), and moved Jyotirmoy Das from "current PhD scholars" to "alumni" (Early Doctoral Fellow) per the poster.
- **Removed unverified names**: I had previously added a second faculty member (Prof. Butola) and three postdocs (Dr. Astha Sharma, Dr. Rinku Pramanick, Dr. Santonab Chakraborty) based on guesswork — the poster doesn't list them, so I removed them rather than publish unverified info. If any of them are real members of the group, just tell me and I'll add them back properly.
- **Awards page corrected**: several award names/years were off (e.g. "NRDC Budding Innovator Award" not "National Budding Innovator Award"; "FITT Award: Best Industry Relevant PhD Thesis, 2023" not "Best Industry-Relevant Project, 2022–23"), and the joint Mukesh Bajya / Unsanhame Mawkhelieng GYTI 2021 award was added.
- **Facilities page**: now lists the 11 real facility names from your poster (Rapier Loom, Compression Molding, Drop-tower Impact Tester, Super Mass-collider, High Speed Camera, Melt Spinning Line, Whole Garment Knitting, UV Transmittance Tester, SEM with EDX, Rheometer with DMA, Moisture Management Tester). Photos are still placeholders — see note below.
- **Publications**: added "Advances in Healthcare and Protective Textiles" to the books list.
- **Bug fixes**: removed the duplicate FAQ link in the nav bar, removed the stray "selected" label on the Publications page.

## A note on facility photos

The equipment photos in your poster look like manufacturer/product-listing photos (clean studio shots on white backgrounds) rather than photos of your actual lab units — so I didn't copy them onto the public site. I kept the accurate equipment *names*, with placeholder image slots. If those are in fact your own equipment photos (or you're fine using stock photos of the same model), say so and I'll drop them in directly. Otherwise, send real photos whenever convenient.

## How to preview it

Open `index.html` in a browser — no build step required. Or run `python3 -m http.server` and visit `http://localhost:8000`.

## How to add your photos and schematics

Every remaining placeholder is a dashed-border box that says what should go there and what filename it expects. To replace one:
1. Drop your image into `images/`.
2. Replace the `<div class="media-placeholder">...</div>` block with:
   ```html
   <div class="media"><img src="images/your-filename.jpg" alt="Describe the photo"></div>
   ```

## What still needs your input

1. **Facility photos** — see note above (poster images look like stock/vendor photos).
2. **Prof. Butola's photo** — not on the poster, so his card is still a placeholder.
3. **M.Tech students' photos + project areas** (People page) — 4 names still need photos and a one-line project description.
4. **Team culture / "how we work" text** (People page) — still a plausible draft; edit to match reality.
5. **Team photo + Gallery photos** — still placeholder tiles.
6. **Phone number** — left out of the footer entirely rather than showing a broken placeholder.
7. **Internship policy** (FAQ) — marked `[Confirm]`.
8. **Recent milestones** (History page) — add anything recent you're proud of.
9. **Patent numbers/titles** (Publications page) — currently just says 6 patents exist.

## Deploying it

Plain static site — any static host works: GitHub Pages, Netlify/Vercel (drag-and-drop), or your department's existing web server. No build tools or dependencies required.

## What changed in this round (round 4)

- **Home page video**: the soft-armour photo is now a click-to-play trigger. Clicking it opens your Google Drive video (embedded via `.../preview`) in a lightbox/modal. **Important**: this only works if the Google Drive file's sharing setting is "Anyone with the link can view" — if it's restricted, visitors will see a blank/error frame. Double check the sharing settings on that file.
- **Facilities page**: now shows the 11 real equipment photos from your poster (previously placeholders).
- **Awards page**: added a photo/certificate carousel at the top with 16 images pulled from your poster (ceremony photos + certificates), with working prev/next arrows, dot navigation, swipe support on mobile, and a caption that updates per photo.
- **People page**:
  - Prof. Butola's title corrected: "Professor, Department of Textile & Fibre Engineering" with a short verified bio line (confirmed via web search — he's a real co-inventor with Prof. Majumdar on body-armour patents).
  - Added LinkedIn profile links (small "in" badge) for all 19 people you provided links for.
- Adopted your manually-edited zip as the new baseline (restored postdocs I'd previously removed, your added M.Tech photos, updated PhD scholar project descriptions, etc.) — I did not second-guess or revert any of your edits.

### If you want to add more LinkedIn links later
Same pattern as photos — find the person's card in `people.html`, and just before its closing `</div>`, add:
```html
<a class="li-link" href="https://linkedin.com/in/their-profile" target="_blank" rel="noopener" aria-label="Name on LinkedIn">in</a>
```

## What changed in this round (round 5)

- **Research page rebuilt as 6 expandable cards.** All six domains now match the compact card style (eyebrow label, title, description) and expand in place when clicked — no more separate pages for Protective Textiles / 3D Composites. The old standalone pages (`research-protective-textiles.html`, `research-advanced-composites.html`) are still in the folder but no longer linked from anywhere — delete them if you don't want them, or keep them as a backup.
  - Nav's "Research" dropdown is now a single link, since everything lives on one page.
  - Home page cards now link to `research.html#anchor-id` — clicking one jumps to Research and auto-expands the right card.
- **Publications page**: patents section now lists all 8 filed patents with correct grant status (5 granted, 3 published/pending) per your two documents — application numbers, titles, and filing dates included.
- **People page**: added the 5 new LinkedIn links (Astha Sharma, Rajib Bhattacharyya, Gethsia Judin, Aryadip Dey, Bharat Gokhru) and all 14 Google Scholar links you provided, shown as a second small "GS" badge next to the "in" badge on each card.
- **Facilities page**: added real pricing (IIT Delhi rate vs. external rate) under each facility, added a 12th facility (Padding Mangle, from your pricing table — no photo yet), and added a "Book a Slot" banner at the top of the page.

### Setting up the "Book a Slot" button
The button currently points to `#` (a placeholder) — here's the fastest way to make it real:
1. Go to [forms.google.com](https://forms.google.com) → create a new form.
2. Add fields you want, e.g.: Name, Email, Instrument (dropdown with the 12 facility names), Preferred date, Number of samples.
3. Click **Send** → click the link icon → copy the link.
4. In `facilities.html`, find `id="bookSlotBtn"` and replace the `href="#"` with your form link, then delete the "Booking link not live yet" note right below it.

This is optional, but it's the simplest no-cost way to get a working booking flow without building a custom backend.

## What changed in this round (round 6)

- **Awards page reordered**: Faculty Recognition now comes first, followed by Students' Awards (carousel, awards grid, conference recognitions). Page title changed to "Awards & Recognition" to reflect both sections.
- **Gallery page fully populated** with 19 real team photos you sent over, organized into four categories: Lab & Field Work, Conferences & Awards, Team Celebrations, and Outings & Team Meals.

### A heads-up on the gallery photos
Several of your photos had generic filenames (WhatsApp/camera auto-names) that didn't describe their content, so my first pass at sorting them into categories was wrong in a few places — I caught this by actually opening each photo individually and comparing it against my assumptions, and corrected all of them before finalizing. Worth a final glance from you to confirm the categorization (Lab / Conferences & Awards / Celebrations / Outings) matches how you'd want it, especially for the two I couldn't identify the specific occasion for (both currently just captioned as general "team celebration").

One more thing I noticed but didn't act on: one of your gallery photos shows what looks like Prof. Majumdar receiving an IIT Delhi **Teaching Excellence Award for 2024-25** — the Awards page currently only lists his Teaching Excellence Award as 2015. If that's really him in the photo, let me know and I'll add the second award to the Faculty Recognition section.

## What changed in this round (round 7) — bug fixes

- **Fixed: black bar on Awards page.** This was a CSS margin-collapse bug — the "Students' Awards" heading section had `padding-bottom:0`, and its last child had a `margin-bottom`, which caused that margin to "leak" outside the section and expose the dark page background behind it. Fixed by merging the heading and carousel into one section.
- **Fixed: mobile hamburger menu not opening.** The mobile nav panel was only rendering 40px tall instead of filling the screen, even though it was technically "open" — a CSS sizing bug where `inset: 64px 0 0 0` wasn't reliably producing the expected height. Replaced it with an explicit `height: calc(100dvh - 64px)`, which is more robust. Verified working on multiple pages.
- **Added**: Jyotirmoy Das — 62nd Joint Technological Conference, 1st Prize, 2024 — both as a new carousel photo and a new card in Conference Recognitions.

If you spot anything else looking visually off on mobile, screenshot it the same way (or just describe what you see) and I'll track it down the same way — turned out both bugs today were about elements not sizing themselves correctly, not anything to do with the content.
