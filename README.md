# GOING ANALOG

Site for the Going Analog party series. We take your phone at the door.

**Current volume:** GO.A0925, Friday 25 September 2026, 8:30pm.

## Running it

Static site, no build step, no dependencies.

    python3 -m http.server 8765

Then open <http://localhost:8765>.

## Structure

    index.html              one page, three sections
    assets/css/site.css     tokens, layout, everything
    assets/js/site.js       gate, pile, nav, form
    assets/fonts/           Archivo + IBM Plex Mono, self-hosted
    assets/objects/         object cutout PNGs (see that folder's README)
    photos/                 23 lab scans from GO.A807, 1200px JPEGs
    docs/                   brand assessment and asset brief

## How it works

**The gate.** A black screen you have to get past by dragging a phone into the
box. Pointer Events, so the same code covers mouse and touch. Keyboard users
press Enter on the phone instead. A skip link appears after 8 seconds. Once you
are through, `sessionStorage` remembers for the rest of the session, so the
ritual happens once per visit and not on every reload.

**The pile.** 16 prints from the August rolls, stacked with stable pseudo-random
tilts. Click, swipe, arrow keys, or the buttons. Mixed shapes on purpose: square
for tight portraits, 3:2 for the wide frames, because 35mm is 3:2 and square
cropping cuts people out of the group shots. Only the top 5 images load up
front, the rest load as they come up.

**The RSVP form.** Plain HTML posting straight to the existing Google Form, so
responses land in Judy's spreadsheet with no API keys, no credentials, and no
backend. The field names in `index.html` are the live Google Form entry IDs.

    entry.616408853    Name
    entry.1364684743   Phone
    entry.1522419440   Email
    entry.833081614    Fuck, Marry, Kill
    entry.1310116275   Attending (Yes / No, I love AI)
    entry.2095789134   Referrer

Two things to know. **If anyone edits the questions on the Google Form, the entry
IDs change and this form silently stops working.** Re-pull them from the form's
`FB_PUBLIC_LOAD_DATA_` blob if that happens. And because the response is posted
into a hidden iframe we cannot read cross-origin, success is inferred from the
iframe loading, with a 12 second timeout that surfaces an error instead of
hanging.

There is a honeypot field that gets disabled before submit so it never reaches
the sheet. That is the only spam protection.

## Adding the object cutouts

Drop PNGs into `assets/objects/` and add entries to the `OBJECTS` array at the
top of `assets/js/site.js`. Nothing renders while that array is empty, so
missing files never show as broken images.

## Deploying

`.nojekyll` is already here for GitHub Pages. Free Pages needs a public repo, so
this has to be flipped to public before a Pages URL will work.

Everyone in `photos/` is a real identifiable person. Worth being deliberate about
the moment that repo goes public.
