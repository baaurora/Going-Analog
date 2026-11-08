/* ============================================================
   GOING ANALOG  —  the menu
   Every page that can be landed on needs a way back, so the menu
   lives on its own and both the home page and 12.12 load it.
   ============================================================ */
(function menu() {
  var btn = document.getElementById('menuBtn'),
      panel = document.getElementById('menuPanel'),
      x = document.getElementById('menuX');
  if (!btn || !panel) return;

  var open = false;

  /* The markup ships hidden so that without script the panel can never
     cover the page. From here visibility carries it, which means no frame
     timing to get wrong and no window where it is present but invisible. */
  panel.hidden = false;

  function show() {
    open = true;
    panel.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (x) x.focus();
  }

  function hide(back) {
    if (!open) return;
    open = false;
    panel.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    /* Following a link is its own destination, so do not yank focus back. */
    if (back !== false) btn.focus();
  }

  btn.addEventListener('click', function () { open ? hide() : show(); });
  if (x) x.addEventListener('click', function () { hide(); });

  panel.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a') : null;
    if (a) hide(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && open) hide();
  });
})();
