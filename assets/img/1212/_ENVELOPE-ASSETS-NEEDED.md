# Envelope assets for the 12.12 page

Paste everything between the lines into ChatGPT. It asks for five PNG files.

Why five: right now the envelope is four flat photographs of the whole thing.
A photograph of a whole envelope has no inside, so there is nothing for the
card to come out of. Whatever we do, the card can only ever be drawn on top of
the picture or hidden under all of it. Splitting the envelope into a back, a
front and a flap is what lets the card sit between the back and the front, slide
up through the mouth, and clear the paper properly.

---

I need five PNG files of one pink vellum envelope, cut into layers.

CANVAS, IDENTICAL IN ALL FIVE FILES
2000 x 2400 pixels. Fully transparent background. Real alpha, not white.
The envelope must not move, rotate, or change size between files. If I stack
all five in order in Photoshop they have to line up into one complete,
seamless envelope with no gaps and no doubled edges. Do not crop any one file
tighter than the others.

1. back.png
The back wall of the envelope on its own: the single flat panel that a card
would rest against. Full rectangle, square corners at the bottom, and the
shallow V at the top where the flap is seated. Nothing in this file may be a
part that would sit in front of a card.

2. front.png
The front pocket on its own: the panel a card slides down behind, together
with the two side flaps and the bottom flap that are glued onto it. Its top
edge is the mouth of the envelope, a straight horizontal line running the full
width, sitting about 45% of the way down the canvas. Everything above that
line is fully transparent, with a clean hard edge, no feathering.
This is the most important of the five. Without it the card cannot be inside
the envelope at all.

3. flap-closed.png
The top flap sealed down, pointing downwards, covering the mouth.

4. flap-half.png
The same flap lifted to roughly 45 degrees, caught halfway open.

5. flap-open.png
The same flap folded all the way back, pointing upwards, mouth fully clear.

In files 3, 4 and 5 the flap is the only thing in the file and everything else
is transparent. The flap has to hinge on the same line in all three, so that
playing them in order reads as one flap lifting rather than three different
flaps.

MATERIAL
The same pink vellum paper in every file, matching the photographs I already
have. Keep it semi translucent the way the real envelope is: the paper should
be around 80 to 90 percent opaque in the alpha channel, so that a card behind
it reads as a soft pink shape rather than vanishing. Keep the paper grain and
the seam lines where the flaps are glued.

DO NOT
Do not bake in a drop shadow, a cast shadow or a reflection. Those get added
afterwards in CSS and a baked one cannot be removed.
Do not put a white or coloured background behind anything.
Do not add a card, a letter, writing, confetti or any other object.
Do not change the lighting between files.

---

## Where they go

Save them into this folder as:

    env-back.png
    env-front.png
    env-flap-closed.png
    env-flap-half.png
    env-flap-open.png

## What the page does with them

    z-index 1   env-back.png          the wall behind everything
    z-index 2   the card              rises up through the mouth
    z-index 3   env-front.png         the pocket the card slides out of
    z-index 4   the flap frames       closed, half, open, played in order
    z-index 5   the card once clear   so it can turn over on top of it all

If only one of the five ever arrives, make it **env-front.png**. That single
file is what turns the card from a rectangle drawn over a photograph into a
card that is genuinely inside an envelope.
