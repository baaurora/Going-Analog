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
  /* Prints cascade down the page in overlapping clusters with real size
     variance, so you meet them as you scroll. Objects appear once each:
     one clip, one blank polaroid, one Polaroid camera, one disposable. */
  var SCENES = {
    home: {
      prints: [
        { i: 3, x: 17, y: 40, w: 236, rot: -10, m: { x: 18, y: 34, w: 44 } },
        { i: 2, x: 10, y: 33, w: 252, rot: 7,   m: { x: 6,  y: 25, w: 46 } },
        { i: 1, x: 18, y: 25, w: 244, rot: -4,  m: { x: 17, y: 15, w: 44 } },
        { i: 0, x: 12, y: 17, w: 284, rot: 5,   m: { x: 10, y: 4,  w: 49 } }
      ],
      clip: { x: 19, y: 13, w: 70, rot: -13, m: { x: 30, y: 0, w: 13 } },
      objs: [
        { o: 'pola', x: 46, y: 12, w: 132, rot: 9, m: { x: 68, y: 62, w: 24 } }
      ],
      words: [
        { t: 'PHONES IN THE BOX', x: 44, y: 40, m: { x: 5, y: 90 } },
        { t: 'GO.A807',           x: 74, y: 62, c: 'dim' }
      ]
    },

    /* cascade part one: drifts right and down, clustered and overlapping */
    what: {
      prints: [
        { i: 4,  x: 44, y: 4,  w: 150, rot: 6,   m: { x: 50, y: 4,  w: 40 } },
        { i: 5,  x: 56, y: 10, w: 300, rot: -5,  m: { x: 10, y: 14, w: 48 } },
        { i: 6,  x: 40, y: 26, w: 210, rot: 9,   m: { x: 46, y: 28, w: 44 } },
        { i: 7,  x: 62, y: 36, w: 168, rot: -8,  m: { x: 12, y: 44, w: 42 } },
        { i: 8,  x: 46, y: 52, w: 336, rot: 4,   m: { x: 40, y: 58, w: 52 } },
        { i: 9,  x: 30, y: 72, w: 190, rot: -11, m: { x: 8,  y: 76, w: 40 } },
        { i: 10, x: 68, y: 76, w: 244, rot: 7 }
      ],
      objs: [
        { o: 'cam', x: 86, y: 14, w: 180, rot: 6, m: { x: 62, y: 90, w: 32 } }
      ],
      words: [
        { t: "NOBODY'S POSTING SHIT", x: 44, y: 22, m: { x: 6, y: 94 } },
        { t: '35MM',                  x: 78, y: 50, c: 'dim' }
      ]
    },

    /* cascade part two: swings back left, then down and out */
    rsvp: {
      prints: [
        { i: 11, x: 58, y: 3,  w: 258, rot: -6, m: { x: 8,  y: 4,  w: 46 } },
        { i: 12, x: 80, y: 14, w: 160, rot: 8,  m: { x: 56, y: 12, w: 40 } },
        { i: 13, x: 54, y: 26, w: 214, rot: 5,  m: { x: 14, y: 38, w: 48 } },
        { i: 14, x: 74, y: 44, w: 300, rot: -4, m: { x: 44, y: 56, w: 46 } },
        { i: 15, x: 56, y: 62, w: 176, rot: 10, m: { x: 6,  y: 74, w: 42 } },
        { i: 16, x: 72, y: 78, w: 262, rot: -7 }
      ],
      objs: [
        { o: 'disp', x: 50, y: 50, w: 172, rot: -10, m: { x: 62, y: 90, w: 31 } }
      ],
      words: [
        { t: 'SHOOT YOUR SHOT', x: 54, y: 20, m: { x: 8, y: 94 } }
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

  /* ================= BUILD THE SCENES ================= */
  function place(el, host, x, y, w, m) {
    var small = SMALL();
    if (small && !m) { el.style.display = 'none'; return; }
    el.style.display = '';
    if (el.dataset.moved) return;
    var r = host.getBoundingClientRect();
    if (small) {
      var mp = Math.round(r.width * m.w / 100);
      el.style.left = Math.round(r.width * m.x / 100) + 'px';
      el.style.top = Math.round(r.height * m.y / 100) + 'px';
      el.style.width = mp + 'px';
      el.style.setProperty('--pw', mp + 'px');
      return;
    }
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
      placements.push({ el: el, host: host, x: spec.x, y: spec.y, w: spec.w, m: spec.m });
    });

    (cfg.objs || []).forEach(function (spec) {
      var el = makeObj(OBJ[spec.o]);
      el.style.transform = 'rotate(' + spec.rot + 'deg)';
      host.appendChild(el); draggable(el);
      placements.push({ el: el, host: host, x: spec.x, y: spec.y, w: spec.w, m: spec.m });
    });

    if (cfg.clip) {
      var c = makeObj(OBJ.clip, ' thing--clip');
      c.style.transform = 'rotate(' + cfg.clip.rot + 'deg)';
      host.appendChild(c); draggable(c);
      placements.push({ el: c, host: host, x: cfg.clip.x, y: cfg.clip.y, w: cfg.clip.w, m: cfg.clip.m });
    }

    var wordHost = document.querySelector('[data-words="' + key + '"]');
    if (cfg.words) {
      cfg.words.forEach(function (w) {
        var el = document.createElement('span');
        el.className = 'word' + (w.c ? ' ' + w.c : '');
        el.textContent = w.t;
        placements.push({ el: el, host: host, wordHost: wordHost, word: w });
      });
    }
  });

  function placeWord(p) {
    var small = SMALL();
    if (small && !p.word.m) { if (p.el.parentNode) p.el.remove(); return; }
    var host = small ? p.host : p.wordHost;
    if (!host) { if (p.el.parentNode) p.el.remove(); return; }
    if (p.el.parentNode !== host) host.appendChild(p.el);
    p.el.classList.toggle('word--m', small);
    var c = small ? p.word.m : p.word;
    p.el.style.left = c.x + '%';
    p.el.style.top = c.y + '%';
  }

  function layout() {
    placements.forEach(function (p) {
      if (p.word) { placeWord(p); return; }
      place(p.el, p.host, p.x, p.y, p.w, p.m);
    });
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
