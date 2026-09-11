/* ============================================================
   GOING ANALOG / GO.A0925  —  v2
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var TOP = 10;                       /* running z within the things layer */
  /* ask the same question the stylesheet asks, so layout and script can
     never disagree about which mode the page is in */
  var MQ = window.matchMedia ? window.matchMedia('(max-width: 820px)') : null;
  var SMALL = function () { return MQ ? MQ.matches : window.innerWidth <= 820; };

  /* ---- the 16 kept frames, plus the title card at 0 ---- */
  var P = [
    { t: 1,         sh: 'sq',   alt: 'Going Analog' },
    { f: 'R1-000A', alt: 'A woman laughing behind a paper fan, holding a camera' },
    { f: 'R2-003A', alt: 'Two friends mugging for the camera' },
    { f: 'R2-018A', alt: 'Three friends posing, one sticking their tongue out' },
    { f: 'R2-020A', alt: 'Four friends lined up shoulder to shoulder' },
    { f: 'R2-025A', alt: 'A group sitting in a room with floral wallpaper' },
    { f: 'R3-018A', alt: 'A group leaning in together, mid-conversation' },
    { f: 'R3-019A', alt: 'Three friends in white shirts holding drinks' },
    { f: 'R4-009A', alt: 'Close portrait of a man in a white shirt grinning under flash' },
    { f: 'R4-012A', alt: 'Three people dancing, one holding a folding fan' },
    { f: 'R4-016A', alt: 'Very close frame of two people laughing hard' },
    { f: 'R4-023A', alt: 'A guest beside the table of confiscated phones' },
    { f: 'R5-010A', alt: 'Three women pressed together smiling at the camera' },
    { f: 'R5-012A', alt: 'A woman tilting her head back to shoot a point-and-shoot camera' },
    { f: 'R5-019A', alt: 'Three friends under a large leaf, laughing' },
    { f: 'R6-023A', alt: 'Three friends leaning together for the camera' },
    { f: 'R7-000A', alt: 'A man laughing behind a disposable camera raised to his eye' },
    { f: 'R7-006A', alt: 'Two people holding something glowing between them' },
    { f: 'phone-jail', alt: 'A table of confiscated phones laid out in a numbered organiser' }
  ];

  var OBJ = {
    cam:  'A1-polaroid-camera.png',
    disp: 'A2-disposable-camera.png',
    can:  'A3-film-canister.png',
    neg:  'A4-negative-strip.png',
    clip: 'A11-binder-clip.png',
    pola: 'A12-blank-polaroid.png'
  };

  /* ---- what sits where. x/y are % of the scene, w is px at 1440. ---- */
  /* Prints cascade down the page in overlapping clusters with real size
     variance, so you meet them as you scroll. Objects appear once each:
     one clip, one blank polaroid, one Polaroid camera, one disposable. */
  /* One walk down the page. Every frame overlaps the next, so it reads as a
     line rather than a scatter. x and y are percentages of <main>. Positions
     were solved against the running copy, not eyeballed. */
  var PATH = [
    { p:  3, x:  5.0, y:  6.60, w: 246, rot:  -9, pile: 1, sh: 'sq'   },
    { p:  2, x: 11.4, y:  5.90, w: 254, rot:   7, pile: 1, sh: 'sq'   },
    { p:  1, x:  8.0, y:  4.70, w: 258, rot:  -4, pile: 1, sh: 'sq'   },
    { p:  0, x: 13.6, y:  3.70, w: 276, rot:   5, pile: 1, sh: 'sq', front: 1 },
    { p:  4, x: 18.0, y: 12.50, w: 240, rot:  -7, sh: 'wide' },
    { p:  5, x: 29.0, y: 16.50, w: 190, rot:   5, sh: 'sq'   },
    { p:  6, x: 21.0, y: 21.00, w: 310, rot:   4, sh: 'wide' },
    { p:  7, x: 31.0, y: 25.50, w: 170, rot: -10, sh: 'sq'   },
    { p:  8, x: 17.0, y: 29.50, w: 260, rot:   6, sh: 'wide' },
    { p:  9, x: 10.0, y: 34.00, w: 210, rot:  -4, sh: 'wide' },
    { p: 10, x: 16.0, y: 38.50, w: 180, rot:   9, sh: 'sq'   },
    { p: 11, x: 29.0, y: 42.50, w: 270, rot:  -6, sh: 'wide' },
    { p: 12, x: 46.0, y: 46.50, w: 220, rot:   7, sh: 'sq'   },
    { p: 13, x: 50.0, y: 51.50, w: 300, rot:  -5, sh: 'wide' },
    { p: 14, x: 50.0, y: 57.00, w: 230, rot:  10, sh: 'wide' },
    { p: 15, x: 55.0, y: 61.00, w: 200, rot:  -8, sh: 'sq'   },
    { p: 16, x: 47.0, y: 65.00, w: 240, rot:   5, sh: 'wide' },
    { p: 17, x: 52.0, y: 70.00, w: 210, rot:  -7, sh: 'wide' },
    { p: 18, x: 44.5, y: 64.00, w: 360, rot:  -4, sh: 'tall', front: 1 }
  ];

  var CLIP = { x: 17.0, y: 6.50, w: 96, rot: -13 };

  var OBJS = [
    { o: 'can',  x: 47, y: 10.5, w: 170, rot:  9 },
    { o: 'cam',  x: 39, y: 11.5, w: 330, rot:  6 },
    { o: 'disp', x: 50, y: 60.0, w: 300, rot: -8 }
  ];

  /* labels sit in the open space, never within 36px of a frame */
  /* straight sentences, placed in the gaps the walk leaves */
  /* plain sentences, tracking the walk. y order is reading order. */
  /* one run, stepped evenly, each line indented to the shoulder of the
     frame the walk has at that height, so the block traces the path */
  var LABELS = [];

  /* ================= GATE (unchanged from v1) ================= */
  (function gate() {
    var gate = $('#gate'), phone = $('#phone'), jail = $('#jail'),
        stage = $('#stage'), hint = $('#hint'), skip = $('#skip'), site = $('#site');
    if (!gate) return;
    var opened = false, dragging = false, moved = false, dx = 0, dy = 0, id = null;

    function open() {
      if (opened) return;
      opened = true;
      phone.classList.add('is-gone');
      jail.classList.add('is-shut');
      hint.textContent = 'THANK YOU. GO INSIDE.';
      hint.classList.add('is-hot');
      try { sessionStorage.setItem('ga_in', '1'); } catch (e) {}
      setTimeout(function () {
        gate.classList.add('is-open');
        site.removeAttribute('inert');
        site.classList.add('is-live');
        setTimeout(function () { gate.setAttribute('hidden', ''); }, 600);
      }, 620);
    }

    var been = false;
    try { been = sessionStorage.getItem('ga_in') === '1'; } catch (e) {}
    if (been) {
      gate.classList.add('is-open'); gate.setAttribute('hidden', '');
      site.removeAttribute('inert'); site.classList.add('is-live');
      opened = true; return;
    }

    function overJail() {
      var p = phone.getBoundingClientRect(), j = jail.getBoundingClientRect();
      var cx = p.left + p.width / 2, cy = p.top + p.height / 2;
      return cx > j.left && cx < j.right && cy > j.top && cy < j.bottom;
    }
    phone.addEventListener('pointerdown', function (e) {
      if (opened) return;
      dragging = true; moved = false; id = e.pointerId;
      var r = phone.getBoundingClientRect();
      dx = e.clientX - (r.left + r.width / 2);
      dy = e.clientY - (r.top + r.height / 2);
      phone.setPointerCapture(id); phone.classList.add('is-held');
    });
    phone.addEventListener('pointermove', function (e) {
      if (!dragging || opened) return;
      moved = true;
      var s = stage.getBoundingClientRect();
      phone.style.left = (e.clientX - dx - s.left) + 'px';
      phone.style.top = (e.clientY - dy - s.top) + 'px';
      phone.style.transform = 'translate(-50%,-50%)';
      var hot = overJail();
      jail.classList.toggle('is-hot', hot);
      hint.classList.toggle('is-hot', hot);
      hint.textContent = hot ? 'LET GO' : 'DRAG YOUR PHONE INTO THE BOX';
    });
    function release() {
      if (!dragging || opened) return;
      dragging = false;
      phone.classList.remove('is-held'); jail.classList.remove('is-hot');
      if (overJail()) {
        var j = jail.getBoundingClientRect(), s = stage.getBoundingClientRect();
        phone.style.left = (j.left + j.width / 2 - s.left) + 'px';
        phone.style.top = (j.top + j.height * 0.55 - s.top) + 'px';
        open();
      } else {
        phone.style.left = ''; phone.style.top = ''; phone.style.transform = '';
        hint.classList.remove('is-hot');
        hint.textContent = 'DRAG YOUR PHONE INTO THE BOX';
      }
    }
    phone.addEventListener('pointerup', release);
    phone.addEventListener('pointercancel', release);

    /* tap, click or keyboard all work. dragging is the nice way in, not the
       only way, so nobody can get stuck staring at a phone that will not move */
    function flyIn() {
      if (opened) return;
      var jb = jail.getBoundingClientRect(), sb = stage.getBoundingClientRect();
      phone.style.left = (jb.left + jb.width / 2 - sb.left) + 'px';
      phone.style.top = (jb.top + jb.height * 0.55 - sb.top) + 'px';
      phone.style.transform = 'translate(-50%,-50%)';
      setTimeout(open, 300);
    }
    phone.addEventListener('click', function (e) {
      if (opened) return;
      if (e.detail === 0) { open(); return; }   /* keyboard */
      if (!moved) flyIn();
    });
    jail.addEventListener('click', flyIn);
    setTimeout(function () { if (!opened) skip.hidden = false; }, 8000);
    skip.addEventListener('click', open);
  })();

  /* ================= DRAGGING ================= */
  function draggable(el) {
    var id = null, sx = 0, sy = 0, bl = 0, bt = 0, arm = null;

    function begin(pid) {
      id = pid;
      try { el.setPointerCapture(id); } catch (e) {}
      el.classList.add('is-held');
      el.style.zIndex = String(++TOP);
      el.dataset.moved = '1';
      bl = parseFloat(el.style.left) || 0;
      bt = parseFloat(el.style.top) || 0;
    }

    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      sx = e.clientX; sy = e.clientY;
      if (e.pointerType === 'mouse') { begin(e.pointerId); e.preventDefault(); return; }
      /* touch: press and hold to pick something up, so an ordinary swipe
         still scrolls the page instead of dragging a photograph */
      var pid = e.pointerId;
      arm = setTimeout(function () {
        arm = null;
        el.classList.add('is-armed');
        begin(pid);
      }, 220);
    });

    el.addEventListener('pointermove', function (e) {
      if (id === null) {
        if (arm && (Math.abs(e.clientX - sx) > 10 || Math.abs(e.clientY - sy) > 10)) {
          clearTimeout(arm); arm = null;      /* they meant to scroll */
        }
        return;
      }
      el.style.left = (bl + e.clientX - sx) + 'px';
      el.style.top = (bt + e.clientY - sy) + 'px';
      if (e.cancelable) e.preventDefault();
    });

    function up() {
      if (arm) { clearTimeout(arm); arm = null; }
      if (id !== null) { el.classList.remove('is-held'); id = null; }
      el.classList.remove('is-armed');
    }
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
  }

  /* ================= BUILD THE WALK ================= */
  var host = document.getElementById('cascade');
  var labelHost = document.getElementById('labels');
  var placements = [];

  function place(p) {
    var el = p.el, r = host.getBoundingClientRect();
    if (el.dataset.moved) return;
    var small = SMALL();
    var px, x, y;
    if (small) {
      /* the walk narrows into a zigzag so it still reads as one line on a
         phone, sitting behind the copy the way it does everywhere else */
      px = Math.round(r.width * (p.kind === 'obj' ? 0.26 : 0.46));
      x = (p.i % 2 ? 48 : 4);
      y = p.y;
    } else {
      px = Math.round(p.w * Math.min(1, r.width / 1440));
      x = p.x; y = p.y;
    }
    el.style.left = Math.round(r.width * x / 100) + 'px';
    el.style.top = Math.round(r.height * y / 100) + 'px';
    el.style.width = px + 'px';
    el.style.setProperty('--pw', px + 'px');
  }

  function makePrint(spec) {
    var p = P[spec.p];
    var fig = document.createElement('figure');
    fig.className = 'thing thing--print ' + spec.sh + (p.t ? ' thing--title' : '');
    fig.style.transform = 'rotate(' + spec.rot + 'deg)';
    var win = document.createElement('div');
    win.className = 'win';
    if (p.t) {
      win.className += ' ';
      var ttl = document.createElement('span');
      ttl.textContent = 'GOING ANALOG';
      win.appendChild(ttl);
      fig.className += ' thing--title';
    } else {
      var img = document.createElement('img');
      img.alt = p.alt; img.loading = 'lazy'; img.decoding = 'async';
      img.addEventListener('error', function () { fig.remove(); });
      img.src = 'photos/' + p.f + '.jpg';
      win.appendChild(img);
    }
    var lip = document.createElement('div');
    lip.className = 'lip';
    fig.appendChild(win); fig.appendChild(lip);
    if (spec.front) fig.classList.add('thing--front');
    return fig;
  }

  function makeObj(file, extra) {
    var d = document.createElement('div');
    d.className = 'thing thing--obj' + (extra || '');
    var img = document.createElement('img');
    img.src = 'assets/objects/' + file;
    img.alt = ''; img.loading = 'lazy';
    img.addEventListener('error', function () { d.remove(); });
    d.appendChild(img);
    return d;
  }

  PATH.forEach(function (spec, i) {
    var el = makePrint(spec);
    host.appendChild(el); draggable(el);
    placements.push({ el: el, i: i, x: spec.x, y: spec.y, w: spec.w, kind: 'print' });
  });

  var clipEl = makeObj(OBJ.clip, ' thing--clip');
  clipEl.style.transform = 'rotate(' + CLIP.rot + 'deg)';
  host.appendChild(clipEl); draggable(clipEl);
  placements.push({ el: clipEl, i: 0, x: CLIP.x, y: CLIP.y, w: CLIP.w, kind: 'obj' });

  OBJS.forEach(function (spec, i) {
    var el = makeObj(OBJ[spec.o]);
    el.style.transform = 'rotate(' + spec.rot + 'deg)';
    host.appendChild(el); draggable(el);
    placements.push({ el: el, i: i + 1, x: spec.x, y: spec.y, w: spec.w, kind: 'obj' });
  });

  LABELS.forEach(function (l) {
    var el = document.createElement('span');
    el.className = 'word dim';
    el.textContent = l.t;
    el.style.left = l.x + '%';
    el.style.top = l.y + '%';
    labelHost.appendChild(el);
  });

  function layout() {
    placements.forEach(place);
    labelHost.style.display = SMALL() ? 'none' : '';
    var note = document.querySelector('.drag-note');
    if (note) note.textContent = SMALL()
      ? 'Press and hold to move things.'
      : 'Everything on this page moves. Drag it.';
  }
  layout();
  window.addEventListener('load', layout);
  if (MQ) {
    if (MQ.addEventListener) MQ.addEventListener('change', layout);
    else if (MQ.addListener) MQ.addListener(layout);
  }
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 150); });

  /* ================= NAV ================= */
  (function nav() {
    var links = [].slice.call(document.querySelectorAll('[data-nav]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-on', a.getAttribute('data-nav') === en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'what', 'rsvp'].forEach(function (id) {
      var s = document.getElementById(id); if (s) io.observe(s);
    });
  })();

  /* ================= RSVP ================= */
  (function rsvp() {
    var form = $('#form'), sink = $('#sink'), done = $('#done'), err = $('#err');
    if (!form) return;
    var btn = form.querySelector('.submit');
    var hp = form.querySelector('[name="_hp"]');

    form.addEventListener('submit', function (e) {
      err.hidden = true;
      if (hp && hp.value) { e.preventDefault(); return; }
      if (!form.checkValidity()) {
        e.preventDefault();
        var bad = form.querySelector(':invalid');
        err.textContent = 'Every field is required. Yes, including fuck marry kill.';
        err.hidden = false;
        if (bad) bad.focus();
        return;
      }
      if (hp) hp.disabled = true;
      btn.disabled = true;
      btn.classList.add('is-sending');
      btn.textContent = 'SENDING…';

      sink.addEventListener('load', function () {
        form.hidden = true; done.hidden = false;
        done.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, { once: true });

      setTimeout(function () {
        if (!form.hidden) {
          btn.disabled = false;
          btn.classList.remove('is-sending');
          btn.textContent = 'SUBMIT';
          if (hp) hp.disabled = false;
          err.textContent = 'That did not go through. Try again, or text Judy.';
          err.hidden = false;
        }
      }, 12000);
    });
  })();

})();
