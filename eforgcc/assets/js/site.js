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
// Module tabs
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.chev'));
  if(!tabs.length)return;
  var bar=document.querySelector('.tabbar');
  function show(i,scroll){
    tabs.forEach(function(t,j){var on=j===i;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on});
    tabs[i].scrollIntoView({block:'nearest',inline:'center'});
    if(scroll){var y=bar.getBoundingClientRect().top+window.pageYOffset-parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));window.scrollTo({top:y,behavior:'smooth'})}
    try{history.replaceState(null,'','#'+tabs[i].getAttribute('aria-controls'))}catch(e){}
    document.querySelectorAll('#'+tabs[i].getAttribute('aria-controls')+' .reveal').forEach(function(e){e.classList.add('in')});
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){show(i,true)});
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){show((i+1)%tabs.length);tabs[(i+1)%tabs.length].focus()}if(e.key==='ArrowLeft'){var k=(i+tabs.length-1)%tabs.length;show(k);tabs[k].focus()}});
  });
  document.querySelectorAll('.next-tab button').forEach(function(b){b.addEventListener('click',function(){show(+b.getAttribute('data-to'),true)})});
  var h=location.hash.slice(1),start=0;
  tabs.forEach(function(t,i){if(t.getAttribute('aria-controls')===h)start=i});
  show(start,false);
})();
