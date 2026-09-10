/* ============================================================
   GOING ANALOG / GO.A0925  —  v2
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var TOP = 10;                       /* running z within the things layer */
  var SMALL = function () { return window.innerWidth <= 820; };

  /* ---- the 16 kept frames, plus the title card at 0 ---- */
  var P = [
    { t: 1,           shape: 'sq',   alt: 'Going Analog' },
    { f: 'R7-000A', shape: 'sq',   alt: 'A man laughing behind a disposable camera raised to his eye' },
    { f: 'R5-012A', shape: 'sq',   alt: 'A woman tilting her head back to shoot a point-and-shoot camera' },
    { f: 'R4-009A', shape: 'sq',   alt: 'Close portrait of a man in a white shirt grinning under flash' },
    { f: 'R2-018A', shape: 'sq',   alt: 'Three friends posing, one sticking their tongue out' },
    { f: 'R4-016A', shape: 'sq',   alt: 'Very close frame of two people laughing hard' },
    { f: 'R6-023A', shape: 'wide', alt: 'Three friends leaning together for the camera' },
    { f: 'R1-000A', shape: 'sq',   alt: 'A woman laughing behind a paper fan, holding a camera' },
    { f: 'R3-019A', shape: 'wide', alt: 'Three friends in white shirts holding drinks' },
    { f: 'R5-010A', shape: 'wide', alt: 'Three women pressed together smiling at the camera' },
    { f: 'R4-012A', shape: 'wide', alt: 'Three people dancing, one holding a folding fan' },
    { f: 'R2-003A', shape: 'sq',   alt: 'Two friends mugging for the camera' },
    { f: 'R5-019A', shape: 'wide', alt: 'Three friends under a large leaf, laughing' },
    { f: 'R2-025A', shape: 'wide', alt: 'A group sitting in a room with floral wallpaper' },
    { f: 'R2-020A', shape: 'wide', alt: 'Four friends lined up shoulder to shoulder' },
    { f: 'R7-006A', shape: 'wide', alt: 'Two people holding something glowing between them' },
    { f: 'R3-018A', shape: 'wide', alt: 'A group leaning in together, mid-conversation' }
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
  var SCENES = {
    home: {
      /* a real pile: tight offsets, small rotations, clip holding the top.
         drag any of them out and they stay where you drop them. */
      prints: [
        { i: 7, x: 20, y: 38, w: 250, rot: -11 },
        { i: 6, x: 10, y: 34, w: 268, rot: 8   },
        { i: 5, x: 19, y: 31, w: 244, rot: -4  },
        { i: 4, x: 11, y: 28, w: 262, rot: 12  },
        { i: 3, x: 18, y: 25, w: 252, rot: -7  },
        { i: 2, x: 12, y: 22, w: 266, rot: 3   },
        { i: 1, x: 17, y: 20, w: 258, rot: -3  },
        { i: 0, x: 13, y: 18, w: 280, rot: 5   }
      ],
      clip: { x: 20, y: 14, w: 70, rot: -13 },
      objs: [
        { o: 'pola', x: 39, y: 10, w: 128, rot: 9   },
        { o: 'can',  x: 55, y: 20, w: 84,  rot: 12  },
        { o: 'neg',  x: 36, y: 52, w: 300, rot: -8  },
        { o: 'disp', x: 63, y: 40, w: 172, rot: -6  },
        { o: 'cam',  x: 47, y: 74, w: 196, rot: 4   },
        { o: 'pola', x: 72, y: 66, w: 118, rot: -15 },
        { o: 'can',  x: 30, y: 84, w: 78,  rot: -9  },
        { o: 'disp', x: 79, y: 88, w: 150, rot: 11  },
        { o: 'clip', x: 60, y: 58, w: 46,  rot: 24  },
        { o: 'neg',  x: 42, y: 8,  w: 208, rot: 6   }
      ],
      words: [
        { t: 'PHONES IN THE BOX',     x: 41, y: 36 },
        { t: 'FUCK IT WE BALL',       x: 57, y: 50, c: 'hot' },
        { t: "NOBODY'S POSTING SHIT", x: 30, y: 67, c: 'dim' },
        { t: '7 ROLLS, 16 KEPT',      x: 86, y: 46, c: 'dim' },
        { t: 'BRING A DISPOSABLE',    x: 44, y: 90 }
      ]
    },
    what: {
      prints: [
        { i: 8,  x: 3,  y: 44, w: 244, rot: -6 },
        { i: 9,  x: 27, y: 70, w: 214, rot: 7  },
        { i: 10, x: 60, y: 18, w: 234, rot: -4 },
        { i: 11, x: 79, y: 52, w: 194, rot: 8  },
        { i: 12, x: 48, y: 84, w: 252, rot: -9 }
      ],
      objs: [
        { o: 'cam',  x: 45, y: 5,  w: 180, rot: 6   },
        { o: 'can',  x: 45, y: 36, w: 84,  rot: -14 },
        { o: 'neg',  x: 64, y: 76, w: 284, rot: 5   },
        { o: 'clip', x: 89, y: 28, w: 50,  rot: 20  },
        { o: 'pola', x: 7,  y: 80, w: 142, rot: -11 },
        { o: 'disp', x: 68, y: 6,  w: 162, rot: 9   },
        { o: 'pola', x: 88, y: 88, w: 120, rot: 7   },
        { o: 'can',  x: 72, y: 40, w: 76,  rot: 15  }
      ],
      words: [
        { t: 'SHOOT YOUR SHOT',       x: 43, y: 22 },
        { t: 'KILL CHATGPT, OBVIOUSLY', x: 62, y: 44, c: 'hot' },
        { t: '$10-20 SLIDING SCALE',  x: 47, y: 58, c: 'dim' },
        { t: 'AI STARTUP PAYS $100',  x: 14, y: 90 },
        { t: 'PROCEEDS GO TO NEPAL',  x: 78, y: 14, c: 'dim' }
      ]
    },
    rsvp: {
      prints: [
        { i: 13, x: 58, y: 8,  w: 254, rot: 6  },
        { i: 14, x: 82, y: 32, w: 214, rot: -7 },
        { i: 15, x: 64, y: 58, w: 234, rot: 4  },
        { i: 16, x: 86, y: 80, w: 204, rot: -5 }
      ],
      objs: [
        { o: 'disp', x: 50, y: 38, w: 172, rot: -10 },
        { o: 'can',  x: 74, y: 20, w: 86,  rot: 8   },
        { o: 'neg',  x: 46, y: 74, w: 292, rot: 6   },
        { o: 'pola', x: 92, y: 52, w: 138, rot: 13  },
        { o: 'cam',  x: 60, y: 90, w: 168, rot: -8  },
        { o: 'clip', x: 55, y: 24, w: 48,  rot: -20 }
      ],
      words: [
        { t: 'ADDRESS DROPS THAT DAY', x: 52, y: 18, c: 'dim' },
        { t: 'FRIDAY, 830PM',          x: 78, y: 46, c: 'hot' },
        { t: 'PAY TO CONFIRM',         x: 70, y: 70 }
      ]
    }
  };

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
    phone.addEventListener('click', function (e) {
      if (opened) return;
      if (e.detail === 0) { open(); return; }
      if (!moved) { hint.textContent = 'DRAG IT, DON’T CLICK IT'; }
    });
    setTimeout(function () { if (!opened) skip.hidden = false; }, 8000);
    skip.addEventListener('click', open);
  })();

  /* ================= DRAGGING ================= */
  function draggable(el) {
    var id = null, sx = 0, sy = 0, bl = 0, bt = 0;
    el.addEventListener('pointerdown', function (e) {
      if (SMALL()) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      id = e.pointerId;
      el.setPointerCapture(id);
      el.classList.add('is-held');
      el.style.zIndex = String(++TOP);
      el.dataset.moved = '1';
      sx = e.clientX; sy = e.clientY;
      bl = parseFloat(el.style.left) || 0;
      bt = parseFloat(el.style.top) || 0;
      e.preventDefault();
    });
    el.addEventListener('pointermove', function (e) {
      if (id === null) return;
      /* track deltas rather than offsets, because every thing carries a rotation
         and a rotated bounding box would drift on grab */
      el.style.left = (bl + e.clientX - sx) + 'px';
      el.style.top = (bt + e.clientY - sy) + 'px';
    });
    function up() {
      if (id === null) return;
      el.classList.remove('is-held');
      id = null;
    }
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('lostpointercapture', up);
  }

  /* ================= BUILD THE SCENES ================= */
  function place(el, host, x, y, w) {
    if (el.dataset.moved) return;
    var r = host.getBoundingClientRect();
    el.style.left = Math.round(r.width * x / 100) + 'px';
    el.style.top = Math.round(r.height * y / 100) + 'px';
    var px = Math.round(w * Math.min(1, r.width / 1440));
    el.style.width = px + 'px';
    /* border and lip are proportional to the card, which percentage padding
       cannot express here because it resolves against the containing block */
    el.style.setProperty('--pw', px + 'px');
  }

  var placements = [];

  function makePrint(spec) {
    var p = P[spec.i];
    var fig = document.createElement('figure');
    fig.className = 'thing thing--print ' + p.shape + (p.t ? ' thing--title' : '');
    fig.style.transform = 'rotate(' + spec.rot + 'deg)';
    var win = document.createElement('div');
    win.className = 'win';
    if (p.t) {
      var s = document.createElement('span');
      s.textContent = 'GOING ANALOG';
      win.appendChild(s);
    } else {
      var img = document.createElement('img');
      img.alt = p.alt; img.loading = 'lazy'; img.decoding = 'async';
      img.src = 'photos/' + p.f + '.jpg';
      win.appendChild(img);
    }
    var lip = document.createElement('div');
    lip.className = 'lip';
    fig.appendChild(win); fig.appendChild(lip);
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

  Object.keys(SCENES).forEach(function (key) {
    var host = document.querySelector('[data-things="' + key + '"]');
    if (!host) return;
    var cfg = SCENES[key];

    (cfg.prints || []).forEach(function (spec) {
      var el = makePrint(spec);
      host.appendChild(el); draggable(el);
      placements.push({ el: el, host: host, x: spec.x, y: spec.y, w: spec.w });
    });

    (cfg.objs || []).forEach(function (spec) {
      var el = makeObj(OBJ[spec.o]);
      el.style.transform = 'rotate(' + spec.rot + 'deg)';
      host.appendChild(el); draggable(el);
      placements.push({ el: el, host: host, x: spec.x, y: spec.y, w: spec.w });
    });

    if (cfg.clip) {
      var c = makeObj(OBJ.clip, ' thing--clip');
      c.style.transform = 'rotate(' + cfg.clip.rot + 'deg)';
      host.appendChild(c); draggable(c);
      placements.push({ el: c, host: host, x: cfg.clip.x, y: cfg.clip.y, w: cfg.clip.w });
    }

    var wordHost = document.querySelector('[data-words="' + key + '"]');
    if (wordHost && cfg.words) {
      cfg.words.forEach(function (w) {
        var s = document.createElement('span');
        s.className = 'word' + (w.c ? ' ' + w.c : '');
        s.textContent = w.t;
        s.style.left = w.x + '%';
        s.style.top = w.y + '%';
        wordHost.appendChild(s);
      });
    }
  });

  function layout() { placements.forEach(function (p) { place(p.el, p.host, p.x, p.y, p.w); }); }
  layout();
  window.addEventListener('load', layout);
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
