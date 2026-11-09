/* ============================================================
   GOING ANALOG  —  THE GALLERY
   Take a picture, watch it develop, sign it, write down what
   you want out of the night, pin it to the wall.

   Pictures are kept in this browser's own localStorage. That
   means nobody sees anybody else's, and clearing site data
   takes the wall down. A shared wall needs somewhere to put
   the files, which is a decision that has not been made yet.
   ============================================================ */
(function gallery() {
  var $ = function (s) { return document.querySelector(s); };

  var openBtn = $('#shoot'), studio = $('#studio'), wall = $('#wall'), note = $('#galnote');
  if (!openBtn || !studio || !wall) return;

  var vid = $('#vid'), frame = $('#frame'), sig = $('#sig'), siglip = $('#siglip'),
      shot = $('#shot'), say = $('#say'), wish = $('#wish'), flash = $('#flash'),
      snapBtn = $('#snap'), againBtn = $('#again'), pinBtn = $('#pin'),
      clearBtn = $('#clearsig'), closeBtn = $('#studioX');

  var KEY = 'ga_wall', CAP = 24, stream = null, inked = false;

  /* ---- storage ---- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function save(list) {
    /* images are the bulk of the quota, so drop the oldest until it fits */
    var copy = list.slice(0, CAP);
    while (copy.length) {
      try { localStorage.setItem(KEY, JSON.stringify(copy)); return true; }
      catch (e) { copy.pop(); }
    }
    return false;
  }

  function render() {
    var list = load();
    wall.innerHTML = '';
    if (!list.length) {
      var p = document.createElement('p');
      p.className = 'wall__empty';
      p.textContent = 'Nothing pinned up yet.';
      wall.appendChild(p);
      return;
    }
    list.forEach(function (item, i) {
      var fig = document.createElement('figure');
      fig.className = 'pinned';
      fig.style.setProperty('--r', ((((i * 37) % 9) - 4) * 0.8).toFixed(1) + 'deg');
      var img = document.createElement('img');
      img.src = item.img;
      img.alt = item.wish ? 'A pinned picture reading ' + item.wish : 'A pinned picture';
      var cap = document.createElement('figcaption');
      cap.className = 'pinned__when';
      cap.textContent = item.when || '';
      fig.appendChild(img); fig.appendChild(cap);
      wall.appendChild(fig);
    });
  }

  /* ---- signing, on the photo and on the white border ---- */
  function pen(cv) {
    var ctx = cv.getContext('2d'), drawing = false, id = null;
    function fit() {
      var r = cv.getBoundingClientRect();
      if (!r.width) return;
      cv.width = Math.round(r.width); cv.height = Math.round(r.height);
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    }
    function at(e) {
      var r = cv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }
    cv.addEventListener('pointerdown', function (e) {
      drawing = true; id = e.pointerId; cv.setPointerCapture(id);
      ctx.strokeStyle = cv === siglip ? '#0B0B0B' : '#F2F1EC';
      ctx.lineWidth = cv === siglip ? 2.4 : 3;
      var p = at(e); ctx.beginPath(); ctx.moveTo(p[0], p[1]);
      e.preventDefault();
    });
    cv.addEventListener('pointermove', function (e) {
      if (!drawing) return;
      var p = at(e); ctx.lineTo(p[0], p[1]); ctx.stroke();
      inked = true;
      if (e.cancelable) e.preventDefault();
    });
    function up() { drawing = false; id = null; }
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', up);
    cv.addEventListener('lostpointercapture', up);
    return { fit: fit, clear: function () { ctx.clearRect(0, 0, cv.width, cv.height); } };
  }
  var penTop = pen(sig), penLip = pen(siglip);

  /* ---- camera ---- */
  function stop() {
    if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; }
  }

  function open() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      note.textContent = 'This browser will not give a page access to a camera.';
      return;
    }
    studio.hidden = false;
    document.body.style.overflow = 'hidden';
    reset();
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 1280 } }, audio: false })
      .then(function (st) {
        stream = st; vid.srcObject = st;
        vid.play();
        /* the shutter stays inert until the stream reports real dimensions,
           otherwise an early tap captures a zero sized frame */
        snapBtn.disabled = true;
        var ready = function () {
          if (vid.videoWidth) { snapBtn.disabled = false; say.textContent = 'Look at the camera.'; }
          else { setTimeout(ready, 120); }
        };
        say.textContent = 'Warming up.';
        vid.addEventListener('loadedmetadata', ready, { once: true });
        ready();
      })
      .catch(function () {
        say.textContent = 'No camera. You can close this.';
        snapBtn.hidden = true;
        note.textContent = 'The camera was blocked. Allow it in the address bar and try again.';
      });
  }

  function close() { stop(); studio.hidden = true; document.body.style.overflow = ''; }

  function reset() {
    inked = false;
    frame.hidden = true; frame.classList.remove('is-developing');
    sig.hidden = true; siglip.hidden = true; wish.hidden = true; wish.value = '';
    penTop.clear(); penLip.clear();
    shot.classList.remove('is-printing');
    vid.hidden = false;
    snapBtn.hidden = false;
    againBtn.hidden = true; pinBtn.hidden = true; clearBtn.hidden = true;
  }

  function snap() {
    if (!stream) return;
    var side = Math.min(vid.videoWidth, vid.videoHeight);
    if (!side) return;
    frame.width = side; frame.height = side;
    var ctx = frame.getContext('2d');
    /* mirror, so the print matches what they just saw on screen */
    ctx.save(); ctx.translate(side, 0); ctx.scale(-1, 1);
    ctx.drawImage(vid, (vid.videoWidth - side) / 2, (vid.videoHeight - side) / 2, side, side, 0, 0, side, side);
    ctx.restore();

    flash.classList.remove('is-pop'); void flash.offsetWidth; flash.classList.add('is-pop');
    vid.hidden = true; frame.hidden = false;
    snapBtn.hidden = true;
    stop();

    shot.classList.remove('is-printing'); void shot.offsetWidth; shot.classList.add('is-printing');
    frame.classList.add('is-developing');
    say.textContent = 'Developing.';

    setTimeout(function () {
      say.textContent = 'Sign it. Say what you want out of the night.';
      sig.hidden = false; siglip.hidden = false; wish.hidden = false;
      penTop.fit(); penLip.fit();
      againBtn.hidden = false; pinBtn.hidden = false; clearBtn.hidden = false;
    }, 3700);
  }

  /* ---- flatten the print into one image ---- */
  function composite() {
    var W = 600, pad = Math.round(W * 14 / 360), inner = W - pad * 2;
    var lip = Math.round(inner * 96 / 332), H = pad + inner + lip;
    var out = document.createElement('canvas');
    out.width = W; out.height = H;
    var c = out.getContext('2d');
    c.fillStyle = '#F2F1EC'; c.fillRect(0, 0, W, H);
    c.drawImage(frame, pad, pad, inner, inner);
    if (sig.width) c.drawImage(sig, pad, pad, inner, inner);
    if (siglip.width) c.drawImage(siglip, pad, pad + inner, inner, lip);
    var txt = wish.value.trim();
    if (txt) {
      c.fillStyle = '#0B0B0B';
      c.font = '400 20px "Courier Prime", "Courier New", Courier, monospace';
      c.textAlign = 'center';
      c.fillText(txt, W / 2, pad + inner + lip - 20, inner - 24);
    }
    return out.toDataURL('image/jpeg', 0.82);
  }

  function pinUp() {
    if (!frame.width || frame.hidden) return;   /* nothing taken yet */
    var list = load();
    var d = new Date();
    list.unshift({
      img: composite(),
      wish: wish.value.trim(),
      when: ('0' + (d.getMonth() + 1)).slice(-2) + '.' + ('0' + d.getDate()).slice(-2) + '.' + d.getFullYear()
    });
    var ok = save(list);
    render();
    close();
    note.textContent = ok
      ? 'Pinned up. It lives in this browser.'
      : 'The wall is full in this browser, so the oldest one came down.';
    wall.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  snapBtn.addEventListener('click', snap);
  againBtn.addEventListener('click', function () { close(); open(); });
  clearBtn.addEventListener('click', function () { penTop.clear(); penLip.clear(); inked = false; });
  pinBtn.addEventListener('click', pinUp);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !studio.hidden) close();
  });
  window.addEventListener('resize', function () {
    if (!sig.hidden) { penTop.fit(); penLip.fit(); }
  });

  render();
})();
