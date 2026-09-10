/* ============================================================
   GOING ANALOG / GO.A0925
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     OBJECT CUTOUTS
     Drop PNGs in assets/objects/ then add entries here.
     x / y are percentages of the page section they sit in.
     Nothing renders while this array is empty.
     e.g. { file:'A3-film-canister.png', sel:'.about', x:82, y:18, w:120, rot:-8 }
     -------------------------------------------------------- */
  var OBJECTS = [
    /* Home: a drift of objects across the open lower right, Studio Dogu style */
    { file:'A11-binder-clip.png',      sel:'.home',  x:8,  y:9,  w:46,  rot:-16 },
    { file:'A4-negative-strip.png',    sel:'.home',  x:36, y:59, w:330, rot:-7  },
    { file:'A12-blank-polaroid.png',   sel:'.home',  x:74, y:52, w:152, rot:-13 },
    { file:'A1-polaroid-camera.png',   sel:'.home',  x:58, y:71, w:205, rot:6   },
    { file:'A3-film-canister.png',     sel:'.home',  x:50, y:88, w:96,  rot:11  },
    { file:'A2-disposable-camera.png', sel:'.home',  x:82, y:79, w:180, rot:4   },

    /* RSVP: vertical scatter down the empty right half beside the form */
    { file:'A2-disposable-camera.png', sel:'.rsvp',  x:68, y:5,  w:198, rot:-9  },
    { file:'A12-blank-polaroid.png',   sel:'.rsvp',  x:84, y:24, w:162, rot:14  },
    { file:'A3-film-canister.png',     sel:'.rsvp',  x:71, y:44, w:104, rot:-6  },
    { file:'A4-negative-strip.png',    sel:'.rsvp',  x:62, y:63, w:300, rot:8   },
    { file:'A11-binder-clip.png',      sel:'.rsvp',  x:86, y:57, w:52,  rot:22  },

    /* About: right margin, then a low band under the columns */
    { file:'A1-polaroid-camera.png',   sel:'.about', x:75, y:5,  w:212, rot:5   },
    { file:'A12-blank-polaroid.png',   sel:'.about', x:86, y:31, w:158, rot:-11 },
    { file:'A3-film-canister.png',     sel:'.about', x:69, y:50, w:100, rot:9   },
    { file:'A4-negative-strip.png',    sel:'.about', x:38, y:72, w:318, rot:-5  },
    { file:'A2-disposable-camera.png', sel:'.about', x:78, y:68, w:188, rot:-14 }
  ];


  /* --------------------------------------------------------
     THE PILE
     Real lab data. Job 23633, 7 rolls, scanned 08.11.2026.
     shape: 'sq' for tight portraits, 'wide' for 3:2 frames.
     -------------------------------------------------------- */
  var PRINTS = [
    { kind: 'title', shape: 'sq', alt: 'Going Analog' },
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

  var JOB = '23633', SCANNED = '08.11.2026', DIMS = '3637 × 2444';
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ================= GATE ================= */
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

    /* already been through the door this session */
    var been = false;
    try { been = sessionStorage.getItem('ga_in') === '1'; } catch (e) {}
    if (been) {
      gate.classList.add('is-open');
      gate.setAttribute('hidden', '');
      site.removeAttribute('inert');
      site.classList.add('is-live');
      opened = true;
      return;
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
      phone.setPointerCapture(id);
      phone.classList.add('is-held');
    });

    phone.addEventListener('pointermove', function (e) {
      if (!dragging || opened) return;
      moved = true;
      var s = stage.getBoundingClientRect();
      var x = e.clientX - dx - s.left, y = e.clientY - dy - s.top;
      phone.style.left = x + 'px';
      phone.style.top = y + 'px';
      phone.style.transform = 'translate(-50%,-50%)';
      var hot = overJail();
      jail.classList.toggle('is-hot', hot);
      hint.classList.toggle('is-hot', hot);
      hint.textContent = hot ? 'LET GO' : 'DRAG YOUR PHONE INTO THE BOX';
    });

    function release() {
      if (!dragging || opened) return;
      dragging = false;
      phone.classList.remove('is-held');
      jail.classList.remove('is-hot');
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

    /* keyboard users cannot drag, so Enter or Space opens it */
    phone.addEventListener('click', function (e) {
      if (opened) return;
      if (e.detail === 0) { open(); return; }
      if (!moved) { hint.textContent = 'DRAG IT, DON’T CLICK IT'; }
    });

    setTimeout(function () { if (!opened) skip.hidden = false; }, 8000);
    skip.addEventListener('click', open);
  })();

  /* ================= PILE ================= */
  (function pile() {
    var wrap = $('#pile'), cap = $('#caption'), count = $('#count');
    if (!wrap) return;

    var els = [], order = [], busy = false;

    PRINTS.forEach(function (p, i) {
      var fig = document.createElement('figure');
      fig.className = 'print print--' + p.shape;
      /* stable pseudo-random tilt so the pile looks handled, not placed */
      var rot = (((i * 37) % 11) - 5) * 0.9;
      fig.style.setProperty('--rot', rot.toFixed(2) + 'deg');
      var win = document.createElement('div');
      win.className = 'print__win';
      if (p.kind === 'title') {
        win.className += ' print__win--title';
        var ttl = document.createElement('span');
        ttl.className = 'print__title';
        ttl.textContent = 'GOING ANALOG';
        win.appendChild(ttl);
      } else {
        var img = document.createElement('img');
        img.alt = p.alt;
        img.decoding = 'async';
        img.dataset.src = 'photos/' + p.f + '.jpg';
        win.appendChild(img);
      }
      var lip = document.createElement('div');
      lip.className = 'print__lip';
      fig.appendChild(win); fig.appendChild(lip);
      wrap.appendChild(fig);
      els.push(fig);
      order.push(i);
    });

    function preload() {
      for (var k = 0; k < 5 && k < order.length; k++) {
        var img = els[order[k]].querySelector('img');
        if (img && img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
      }
    }

    function layout() {
      order.forEach(function (pi, pos) {
        var el = els[pi];
        el.style.zIndex = String(order.length - pos);
        el.style.setProperty('--dx', (pos * 0.5).toFixed(1) + 'px');
        el.style.setProperty('--dy', (pos * 1.0).toFixed(1) + 'px');
        el.style.visibility = pos < 9 ? 'visible' : 'hidden';
      });
      var p = PRINTS[order[0]];
      var shots = PRINTS.length - 1;
      var pad = function (v) { v = String(v); return v.length < 2 ? '0' + v : v; };
      var n;
      if (p.kind === 'title') {
        n = '00';
        cap.textContent = '00 GOING ANALOG\nGO.A807, 08.08.2026\n7 ROLLS, ' + shots + ' FRAMES KEPT';
      } else {
        n = pad(PRINTS.indexOf(p));
        cap.textContent =
          n + ' ROLL ' + p.f.slice(1, 2) + ', FRAME ' + p.f.slice(3) + '\n' +
          'JOB: ' + JOB + ', SCANNED: ' + SCANNED + '\n' +
          'DIMENSIONS: ' + DIMS;
      }
      count.textContent = n + ' / ' + pad(shots);
      preload();
    }

    function advance(dir) {
      if (busy || order.length < 2) return;
      busy = true; wrap.classList.add('is-busy');
      if (dir > 0) {
        var top = els[order[0]];
        top.classList.add('is-out');
        setTimeout(function () {
          order.push(order.shift());
          top.classList.remove('is-out');
          layout(); busy = false; wrap.classList.remove('is-busy');
        }, 360);
      } else {
        order.unshift(order.pop());
        var back = els[order[0]];
        back.style.transition = 'none';
        back.classList.add('is-out');
        layout();
        void back.offsetWidth;
        back.style.transition = '';
        back.classList.remove('is-out');
        setTimeout(function () { busy = false; wrap.classList.remove('is-busy'); }, 360);
      }
    }

    wrap.addEventListener('click', function () { advance(1); });
    $('#next').addEventListener('click', function () { advance(1); });
    $('#prev').addEventListener('click', function () { advance(-1); });

    /* swipe */
    var sx = 0, sy = 0, down = false;
    wrap.addEventListener('pointerdown', function (e) { down = true; sx = e.clientX; sy = e.clientY; });
    wrap.addEventListener('pointerup', function (e) {
      if (!down) return; down = false;
      var ax = e.clientX - sx, ay = e.clientY - sy;
      if (Math.abs(ax) > 42 && Math.abs(ax) > Math.abs(ay)) advance(ax < 0 ? 1 : -1);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') advance(1);
      if (e.key === 'ArrowLeft') advance(-1);
    });

    layout();
  })();

  /* ================= NAV ================= */
  (function nav() {
    var links = [].slice.call(document.querySelectorAll('[data-nav]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-on', a.getAttribute('data-nav') === en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['home', 'rsvp', 'about'].forEach(function (id) {
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

      if (hp && hp.value) { e.preventDefault(); return; }   /* bot */

      if (!form.checkValidity()) {
        e.preventDefault();
        var bad = form.querySelector(':invalid');
        err.textContent = 'Every field is required. Yes, including fuck marry kill.';
        err.hidden = false;
        if (bad) bad.focus();
        return;
      }

      if (hp) hp.disabled = true;   /* keep the honeypot out of the sheet */
      btn.disabled = true;
      btn.textContent = 'SENDING…';

      sink.addEventListener('load', function () {
        form.hidden = true;
        done.hidden = false;
        done.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, { once: true });

      /* if Google never answers, say so rather than hanging forever */
      setTimeout(function () {
        if (!form.hidden) {
          btn.disabled = false;
          btn.textContent = 'PUT DIS SHIT ON YOUR CALENDAR';
          if (hp) hp.disabled = false;
          err.textContent = 'That did not go through. Try again, or text Judy.';
          err.hidden = false;
        }
      }, 12000);
    });
  })();

  /* ================= OBJECTS ================= */
  (function objects() {
    OBJECTS.forEach(function (o) {
      var host = $(o.sel); if (!host) return;
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
      var img = document.createElement('img');
      img.className = 'obj';
      img.src = 'assets/objects/' + o.file;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.loading = 'lazy';
      img.style.left = o.x + '%';
      img.style.top = o.y + '%';
      img.style.width = (o.w || 120) + 'px';
      img.style.transform = 'rotate(' + (o.rot || 0) + 'deg)';
      /* a slot with no file yet just disappears, never a broken image */
      img.addEventListener('error', function () { img.remove(); });
      host.appendChild(img);
    });
  })();

})();
