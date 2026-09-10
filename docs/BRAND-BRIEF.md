# GOING ANALOG - Brand Assessment + Asset Brief
Prepared 2026-09-10. Source material: MOV_5631.mov (9.8s) and the live RSVP form.

---

## PART 1 - WHAT THE BRAND ALREADY IS

### Evidence base
- 9.8 second vertical video, 540x960, 30fps, sound on. Roughly 7.5s of footage, then two title cards.
- The live Google Form (form ID 1FAIpQLSdUDQPVcOPS2AT-Hpd-s4RHmVv7YThyYOamKc8rPdRBKEF4eA), still accepting responses.

### The marks
Two pieces of locked-in identity already exist in the film:

1. **Tagline card:** "BECAUSE THE BEST MEMORIES DON'T INVOLVE A PHONE IN HAND."
2. **Wordmark card:** "GO.A807"

Both are white, all caps, centered, on true black. Nothing else. No logo, no icon, no rule lines. That restraint is the brand's biggest asset and it should not be diluted.

"GO.A807" reads as GOING ANALOG + a date code, and Bianca confirmed it rolls. **The current mark is GO.A0925.** The wordmark is a serial number, not a logo. It gets set live in type and swapped by editing one string, and retired marks live in the About timeline.

Open: zero-padding. 807 was unpadded, 0925 is padded. Recommendation is MMDD always, so August was really GO.A0807.

### Photography - this is the actual brand engine
The footage is the strongest asset by a wide margin. Consistent characteristics across every frame:

- Direct on-camera flash, harsh and unsoftened. Skin is blown out and slightly pink. Whites clip.
- Extremely fast falloff. Two feet behind the subject is pure black. No mid-ground.
- Handheld, motion-blurred, nobody posed for it. Several frames are unusable as photos and perfect as texture.
- Warm tungsten and string lights as the only ambient color. Everything else is skin, white tees, and black.
- Visible grain and a mild vignette.
- Faces are laughing, mid-sentence, mid-peace-sign. Nobody is performing for a feed.

This is disposable-camera flash photography, and it is doing all the emotional work. The design system's job is to get out of its way.

### Typography in the film
An industrial condensed grotesque in the DIN family. Two settings:

- **Tagline:** lighter weight, more condensed, all caps, wide letterspacing, small on screen. Straight tick apostrophe, flat terminals, squared bowls, straight-legged R.
- **Wordmark:** heavier and wider, tight tracking, large. Spurred G, flat-topped 7, tight geometric 8.

Read: functional, signage-like, unbranded on purpose. Reads as a stencil on a road case, not a startup logo.

### Voice
Pulled verbatim from the form. This is the most defined part of the brand and it is very funny:

- Form title: "Headline: Anthropic researcher says more than 10% chance AI could kill all humans...so fuck it we ball."
- "You know the drill: We are GOING ANALOG so phones will be confiscated upon entry."
- "$10-20 sliding scale donation ($100 if you work at an AI-startup, I know you can afford it)."
- "What to bring: Yourself, a few friends, work colleagues, your crush (shoot your shot or lose the chance to)"
- "Fuck, Marry, Kill: Claude, Gemini, ChatGPT" (an actual required RSVP field)
- "PUT DIS SHIT ON YOUR CALENDAR. EXPECT AN EMAIL/TEXT SHORTLY. PAY TO CONFIRM."

Voice rules that fall out of this:
1. Deadpan, never earnest. The anti-tech thesis is delivered as a joke, not a lecture.
2. Chronically online about being offline. It is in on its own contradiction.
3. Imperative and short. Commands, not invitations.
4. Profanity is load-bearing. Sanding it off would make this a wellness retreat.
5. Never moralizes about screen time. The bit is "we are all cooked, so let's hang," not "digital detox."

### The ritual
Phones are confiscated at the door. That is the product. Everything else - the film cameras, the delayed photos, the site - is downstream of one physical act at a threshold. The site should reproduce that act, not describe it.

### Money and cause
Sliding scale $10-20, $100 tier for AI startup employees, proceeds to the Nepal Prime Minister's Disaster Relief Fund. This needs to appear on the site plainly and without a fundraising-page tone.

### The one real tension
The film brand is **black, nocturnal, industrial, DIN**. The site references you sent are **white, Swiss editorial, paper, scattered cutouts**. Right now those are two different brands.

Resolution, and this is what the build assumes:
**White is daylight. Black is the party.**

The site is the archive, the morning after, the contact sheet on the studio wall. It is white paper and black type. Black appears in exactly two places: the entry gate, and the photographs themselves. So the flash photos become the only "color" on the page, and every time black floods the screen it means something is happening. This keeps both brands intact and gives the entry gate real weight.

---

## PART 2 - SYSTEM SPEC

### Type
One family, two jobs. **Locked: Archivo, and only Archivo.** Free under the OFL, variable with weight and width axes, so one family covers both settings. Self-host the font files in the repo rather than loading Google's CDN, so the site works offline, loads faster, and does not leak visitors to a third party.

Note: this brief is set in DIN Condensed, which ships free with macOS and is nearly the exact film face. Use it locally in Figma or InDesign, never on the website, because Windows and Android visitors would silently fall back to something wrong.

| Role | Setting |
|---|---|
| Wordmark / GO.A925 | Archivo, 700-800, width ~95, caps, tracking -1% |
| Section heads | Archivo Condensed, 600, caps, tracking +8% |
| Big text block | Archivo, 500, 28-40px, ~1.15 line height, hanging indents, ragged right |
| Body / captions | Archivo, 400, 13-15px |
| Data + timeline | Archivo, 400, tabular figures, 12-13px |

### Color
| Token | Value | Use |
|---|---|---|
| Paper | #FFFFFF | site background |
| Ink | #000000 | all type. true black, matches the film |
| Night | #000000 | entry gate, photo mattes |
| Grey 40 | #9A9A9A | metadata, form placeholders, rules |
| Grey 12 | #E8E8E6 | hairlines, polaroid shadow |

No brand color. The photographs supply every warm tone on the page. If you ever want an accent, reserve one safety red strictly for live states like the RSVP button and a spots-remaining counter, so red always means "something is happening right now." Your call, and the site works with zero accent.

### Motion
Slow, physical, weighted. Polaroids should have inertia and settle. Nothing should ease-out-bounce. The camera cursor follows with lag, not 1:1.

---

## PART 3 - YOUR BRAIN-DUMP, ORGANIZED

**Entry gate (before the site)**
Black screen. Cursor is a smartphone PNG. Drag it into the phone jail to unlock. On release, the screen flips from black to white and the site is behind it. Mobile has no cursor, so the mobile version is a tap-and-drag of the phone into the box, or a press-and-hold "surrender your phone" button.

**Home**
White. Left half is a physical pile of polaroids you can flip through by hand, one at a time, with rotation and drop shadow. Right half is a large block of black text, Samson Leung style but black instead of red: the name, then the thesis, set as one dense justified column with hanging indents.

**Navigation**
Hidden or semi-hidden, Studio Dogu style. A small stack of slightly rotated labels, tucked in a corner, that fans out on hover. Three items: Home, RSVP, About. All three scroll to sections on one page rather than routing to separate pages.

**RSVP**
Scrolls to the current event. A custom form styled in the site's own type, not a Google Forms embed. It posts directly to the existing Google Form, which lives in **Judy's Drive**, so every response and the whole email list stay in her account and nothing routes through Bianca's. No credentials or sharing required. Fields mirror the live form exactly:
1. Name (required)
2. Phone # (required)
3. Email (required)
4. Fuck, Marry, Kill: Claude, Gemini, ChatGPT (required)
5. Will you be going analog with us on September 25? Yes / No, I love AI (required)
6. Who sent you this (required)

The email column in that sheet is the mailing list. Export to CSV, or point a Mailchimp or Buttondown import at it.

**About**
Timeline plus thesis plus house rules.

Timeline:
- August 8, 2026. The birth of Going Analog. Rain tried to stop us, but it couldn't.
- September 25, 2026. Volume Two. Location drops the day of.

**Ambient layer**
**CUT: the polaroid camera cursor follower.** It was the one element fighting the Swiss references and would have read as a gimmick.

**KEPT:** scattered analog-object cutouts sitting on the white like objects left on a desk, each with a soft contact shadow, at rest and not reacting to the pointer. This does not touch the entry gate. The phone that drags into the jail is a one-time interaction at a threshold and it stays.

**Placeholder copy for the big text block** (written in your voice, edit freely):

> GOING ANALOG
>
> You know the drill. We take your phone at the door.
>
> Come for a good hang, meet new people, question the meaning of life together. No algorithms, no phones involved.
>
> We shoot everything on film, so nobody sees a picture until the roll comes back. Takes about a week. They're mostly blurry. We put them up here and that's the only place they go.
>
> Started August 2026. Rain tried to stop us, it didn't work.
>
> Anthropic says there's a more than 10% chance AI kills all humans, so fuck it, we ball.

**Banned in all copy for this brand:** no rhetorical triplets (three parallel examples is the loudest AI tell), no metaphors or analogies, no aphorisms, no em-dashes or semicolons, and never explain the thesis earnestly. Test: would Judy text this?

**House rules for the About section:**
1. Phones go in the box. All of them. No "I'll just keep it in my pocket."
2. Bring a disposable if you have one. If you don't, we've got some.
3. Talk to someone you didn't come with.
4. $10-20 sliding scale. $100 if you work at an AI startup, I know you can afford it.
5. Photos go up here about a week later. That's the only place they go.

---

## PART 4 - ASSET LIST FOR CHATGPT

### Read this first: what NOT to ask ChatGPT for
**Do not ask it to put polaroid borders on your real party photos.** Image models redraw faces when they re-render a photo, and your friends will come back looking like slightly wrong strangers. The polaroid frame, the rotation, the shadow and the flip interaction are all better done in code, from your untouched originals. Send me the raw files and the frames get built around them, sharp at any screen size.

Same for cutting out objects that appear in your real photos. macOS does that for free. Right click the image in Finder, Quick Actions, Remove Background.

**Do ask it for the invented objects.** Everything in the table below is generated art, which is what these models are actually good at.

### The house style block
Paste this at the end of EVERY object prompt. It is what makes fifteen separately generated PNGs look like one set instead of a clip-art bin.

> Photographic product shot, not an illustration. Single object, centered, generous margin. Shot on a 50mm lens, shallow depth of field, studio softbox key light from the upper left, one soft contact shadow beneath the object. Slightly desaturated, mild film grain, very slightly warm white balance. Pure transparent background, no scene, no surface, no text, no watermarks, no logos, no hands, no people. Square 1:1, high resolution.

### Objects to generate

| # | Asset | Where it is used | Prompt to paste before the house style block |
|---|---|---|---|
| A1 | Polaroid camera | Hero decoration | "A vintage Polaroid SX-70 style instant camera in cream and brown, three-quarter front view, lens facing the viewer, closed flash bar, slightly rotated to the left, one instant photo half ejected from the front slot, the ejected photo is blank white." |
| A3 | Disposable camera | Scattered decor | "A 1990s single-use disposable film camera in a yellow and green paper wrapper with a plastic winding wheel and a small flash window, front three-quarter view, slightly worn and creased." |
| A4 | 35mm film canister | Scattered decor | "A single 35mm film canister standing upright, matte black plastic with a paper label, a short tongue of film pulled out." |
| A5 | Film negative strip | Scattered decor | "A curled strip of developed 35mm film negatives, five frames long, sprocket holes visible along both edges, orange-brown negative base, the frames are empty and abstract." |
| A6 | Photo booth strip | Scattered decor | "A vertical black and white photo booth strip, four empty white frames, edges slightly curled." |
| A7 | Flash bulb | Small accent | "A single vintage magicube flash bulb, clear glass with a silver base, unfired." |
| A8 | Phone jail box | Entry gate, drop target | "A small matte black metal lock box with a hinged lid open toward the viewer, a simple hasp latch on the front, empty interior, straight-on three-quarter view." |
| A9 | Surrendered smartphone | Entry gate, the draggable | "A modern black smartphone lying flat, screen facing up and completely off, pure black glass, no icons, no reflections of any scene, slightly angled." |
| A10 | Locking phone pouch | Alternate for A8 | "A grey neoprene phone pouch with a magnetic lock button at the top, empty and slightly open." |
| A11 | Masking tape pieces | Collage detail | "Three separate torn pieces of beige masking tape, each roughly rectangular with frayed torn ends, laid flat." |
| A12 | Binder clip | Collage detail | "A single black metal binder clip, silver handles folded up, three-quarter view." |
| A13 | Blank polaroid | Loading / empty states | "A single blank Polaroid instant photo, pure white image area, the classic wide bottom border, very slight paper texture and one soft crease at a corner." |

### Ask ChatGPT to research, not just generate
Two research prompts worth running before you generate anything:

> Research prompt 1: "I am art directing a website for an underground party series called Going Analog. The identity is built on direct-flash disposable camera photography, true black and white only, and a condensed industrial grotesque in the DIN family. The site references are Samson Leung's portfolio, Studio Dogu, and Swiss editorial print collateral photographed as cutouts on white paper. Give me twelve reference websites and six print or exhibition identities that sit in this exact intersection of Swiss grid, scanned physical objects, and flash party photography. For each, tell me what specific technique I should steal."

> Research prompt 2: "Identify the typeface most likely used for the words GO.A807 and BECAUSE THE BEST MEMORIES DON'T INVOLVE A PHONE IN HAND set in white caps on black in a CapCut style video. It is a condensed industrial grotesque with flat terminals, a spurred G, a flat-topped 7, and straight tick apostrophes. Give me the five closest free Google Fonts matches and the three closest paid matches, with a specific note on which one handles both a bold wide wordmark and a light condensed caption from one variable family."

---

## PART 5 - WHAT I NEED FROM YOU, NOT FROM CHATGPT

1. ~~The original photo files from August 8.~~ **RECEIVED 2026-09-10.** 23 lab scans off 7 rolls (3637x2444 TIFFs, delivered Aug 11) from Judy's Drive folder `1Jh8YwiYMEgKYGlIfCJRtVsQ5KbIt44oi`. Web JPEGs in `~/going-analog/photos`. Blocker cleared.
   - **Framing: not Polaroid.** 35mm is 3:2. Square-cropping cuts people out of the wide group shots. The pile carries BOTH shapes - square for tight portraits and centered groups, 3:2 for anything wide. Mixed shapes make it read as physical prints, not a card grid.
   - **Pile order (16):** R7-000A, R5-012A, R4-009A, R2-018A, R4-016A, R6-023A, R1-000A, R3-019A, R5-010A, R4-012A, R2-003A, R5-019A, R2-025A, R2-020A, R7-006A, R3-018A. Held back (7, soft or underexposed): R1-009A, R1-011A, R2-000A, R2-011A, R4-014A, R5-002A, R6-000A.
2. **The source video at full resolution.** Judy's folder has MOV_5631.mov at 10.3MB vs the 1.1MB desktop copy, so a better master exists.
3. **The final thesis and house rules copy**, or a yes on the placeholder I wrote in Part 3.
5. **The 9/25 location**, or a yes to building a "location drops the day of" placeholder that you can fill in later.
6. **A wordmark file** if one exists as vector or PNG. Otherwise it gets set live in type, which is better anyway.

---

## PART 6 - OPEN QUESTIONS

1. **Zero-padding convention.** 807 was unpadded, 0925 is padded. Recommendation is MMDD always, four digits, so a Nov 4 event is GO.A1104. Also: does August get retconned to GO.A0807, and was the party the 7th or the 8th?
2. **Is the public name "Going Analog" or "GO.A"?** The film only ever shows GO.A807, so the full name has never actually appeared anywhere.
3. **Mobile entry gate.** There is no cursor on a phone. Do you want tap-and-drag, a press-and-hold, or should mobile skip the gate entirely and go straight in?
4. **Do you want the entry gate to be skippable?** A hard gate before any content will lose some people and is bad for anyone using a screen reader. My recommendation is a small "skip" that appears after about eight seconds.
6. **Where does this deploy?** GitHub Pages under your account like Kitty Corner and Pride Weekend, or does Judy need to own the hosting too?
7. **Whose site is it, legally and socially?** If Judy owns the brand, the repo and the form and the domain should probably sit with her from day one rather than get migrated later.
