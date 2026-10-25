(function () {
  var box = document.querySelector('[data-tabs]');
  if (!box) return;
  var tabs = Array.prototype.slice.call(box.querySelectorAll('.tab'));
  var mobile = window.matchMedia('(max-width: 899px)');

  function open(id, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('aria-controls') === id;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-expanded', on ? 'true' : 'false');
      panel.hidden = !on;
    });
    if (focus && mobile.matches) {
      var t = document.getElementById('tab-' + id);
      if (t) t.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var id = t.getAttribute('aria-controls');
      var isOpen = t.getAttribute('aria-expanded') === 'true';
      if (isOpen && mobile.matches) {
        // on phones a second tap closes the lever
        t.setAttribute('aria-expanded', 'false');
        document.getElementById(id).hidden = true;
        return;
      }
      open(id, false);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  });

  var hash = location.hash.replace('#', '');
  if (hash && document.getElementById('tab-' + hash)) open(hash, true);
})();
