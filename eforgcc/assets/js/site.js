(function(){
  // Mobile menu
  var btn=document.querySelector('.menu-btn'), menu=document.querySelector('.gnav ul');
  if(btn&&menu){btn.addEventListener('click',function(){var o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o)});}

  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('in')});return;
  }
  // Fade-in on scroll
  var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(e){ro.observe(e)});

  // Local nav highlight
  var links=[].slice.call(document.querySelectorAll('.lnav a[href^="#"]'));
  if(links.length){
    var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.remove('on')});var a=map[e.target.id];if(a)a.classList.add('on')}})},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
  }

  // Phase rail
  var items=[].slice.call(document.querySelectorAll('.rail li'));
  if(items.length){
    var po=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=+e.target.getAttribute('data-i');items.forEach(function(li,j){li.classList.toggle('on',j===i)})}})},{rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('.phase').forEach(function(p){po.observe(p)});
  }
})();
