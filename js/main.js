(function () {
  'use strict';

  // Address enquiries are sent to. Change this one line if it ever moves.
  var CONTACT_EMAIL = 'contact@krksolutionsukltd.shop';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  var targets = document.querySelectorAll('.card, .point, .steps li, details, .form, .hero-card');
  targets.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  // Enquiry form: validates, then opens the visitor's email app with the message filled in.
  var form = document.getElementById('enquiry');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var ok = true;
      [form.name, form.email, form.message].forEach(function (f) { f.classList.remove('invalid'); });
      if (!name) { form.name.classList.add('invalid'); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { form.email.classList.add('invalid'); ok = false; }
      if (!message) { form.message.classList.add('invalid'); ok = false; }
      if (!ok) { status.textContent = 'Please complete all fields with a valid email.'; return; }
      var subject = 'Website enquiry from ' + name;
      var body = message + '\n\n' + name + '\n' + email;
      status.textContent = 'Opening your email app to send the enquiry…';
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
