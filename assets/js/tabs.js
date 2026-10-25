(function () {
  var box = document.querySelector('[data-levers]');
  if (!box) return;
  var tabs = Array.prototype.slice.call(box.querySelectorAll('.lever-tab'));
  var desktop = window.matchMedia('(min-width: 900px)');

  function show(id) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-expanded', on ? 'true' : 'false');
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var id = t.getAttribute('aria-controls');
      var open = t.getAttribute('aria-expanded') === 'true';
      if (open && !desktop.matches) {
        t.setAttribute('aria-expanded', 'false');
        document.getElementById(id).hidden = true;
        return;
      }
      show(id);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
  });

  var hash = location.hash.replace('#', '');
  if (hash && document.getElementById('tab-' + hash)) {
    show(hash);
    var target = desktop.matches ? box : document.getElementById('tab-' + hash);
    setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 50);
  }
})();
