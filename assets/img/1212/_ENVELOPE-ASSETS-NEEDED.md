# Envelope assets needed for the 12.12 hero

## Why the current ones fall short

The four envelope photos we have are each a finished picture of a whole
envelope. A card cannot go *inside* a finished picture. Right now the page
fakes it by taking one of those photos, clipping everything above the mouth
away, and stacking that clipped strip in front of the card. It works, but it
only works because the envelope is translucent enough to forgive it, and the
card never looks like it is truly behind the paper.

To do it properly the envelope has to come apart into the pieces it is
actually made of, so the card can be sandwiched between them.

## The spec to hand to ChatGPT

> I need a set of product photographs of a single translucent pink vellum
> envelope, shot flat from directly above, broken into separate layers so the
> envelope can be animated opening with a card sliding out of it.
>
> Shoot or render one envelope, one camera position, one lighting setup. Do
> not move the envelope or the camera between frames. Every file must be the
> same pixel dimensions, and the envelope must sit in exactly the same place
> in every file, so the layers stack in perfect register.
>
> I need five files:
>
> 1. **back.png** - the back wall of the envelope only. The flat rectangle
>    that sits behind everything. No flap, no front panel, no seams from the
>    front.
>
> 2. **front.png** - the front pocket panel only. This is the face of the
>    envelope with its diagonal fold seams, the part that covers the lower
>    half of a card tucked inside. Everything above the mouth of the envelope
>    must be fully transparent, and the top edge of this panel is the mouth.
>    No flap.
>
> 3. **flap-closed.png** - the triangular flap alone, folded all the way down
>    into its sealed position.
>
> 4. **flap-half.png** - the same flap alone, lifted to roughly halfway.
>
> 5. **flap-open.png** - the same flap alone, standing fully up and back.
>
> Requirements for all five:
> - PNG with a real alpha channel. Transparent background, not white.
> - No drop shadows, no reflections and no background baked into the image.
>   Keep the paper's own translucency and texture.
> - Identical canvas size and identical registration across all five.
> - The flap must stay hinged at the same point in all three flap files, so
>   the three positions read as one flap moving rather than three flaps.
> - Keep the vellum translucent, the same pink as the envelope we already
>   have.

## What each one is for

| file | where it sits |
|---|---|
| `back.png` | behind everything |
| the card | between back and front |
| `front.png` | in front of the card, so the card is inside the pocket |
| `flap-*.png` | behind the card while open, in front of it while closing |

That last row is the whole point of splitting the flap out. A flap that is
open belongs behind the card, and a flap that is closing has to pass in front
of it. One image cannot do both, which is why three flap files on their own
layer beat three pictures of a whole envelope.

## If only some of it is possible

The single most useful file is **front.png**, the pocket panel on its own.
With that one file the card can sit genuinely inside the envelope and the
existing four photographs can keep carrying the flap movement behind it.
