(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('.send');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name, a valid email and your message.';
      status.classList.add('error');
      var bad = form.querySelector(':invalid'); if (bad) bad.focus();
      return;
    }
    button.disabled = true; button.textContent = 'Sending...';
    var data = Object.fromEntries(new FormData(form));
    delete data.redirect;
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) { return r.json(); }).then(function (res) {
      if (res.success) {
        form.reset();
        status.textContent = 'Thank you. Your message has reached us and we will reply by email.';
        status.classList.add('ok');
      } else { throw new Error(res.message || 'failed'); }
    }).catch(function () {
      status.textContent = 'Sorry, the message did not go through. Please email ravi@preeseq.com instead.';
      status.classList.add('error');
    }).finally(function () { button.disabled = false; button.textContent = 'Send message'; });
  });
})();
