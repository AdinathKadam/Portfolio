/* ═══════════════════════════════════════════════════════════
   Shared behaviour for index.html and record.html.
   Every block guards on the element existing, so one file
   serves both pages.
   ═══════════════════════════════════════════════════════════ */
(function(){
'use strict';

function esc(s){ return String(s).replace(/&(?![a-z#]+;)/g,'&amp;'); }

/* ── figures ──────────────────────────────────────────────── */
var figNo = 0;
function figure(it, prefix){
  if(!it.image && !it.youtube) return '';
  figNo++;
  var inner;
  if(it.youtube){
    inner = '<button type="button" class="yt" data-id="'+it.youtube+'" aria-label="Play the interview">'+
              '<img src="https://img.youtube.com/vi/'+it.youtube+'/hqdefault.jpg" alt="" width="480" height="360">'+
              '<span class="yt-play"><i></i></span>'+
              '<span class="yt-fallback">'+esc(it.outlet||'Video')+' — play the interview</span>'+
            '</button>';
  } else {
    inner = '<img src="'+it.image+'" alt="'+esc(it.caption||'')+'" width="'+(it.w||900)+'" height="'+(it.h||600)+
            '" loading="lazy" decoding="async">';
  }
  return '<figure class="fg">'+inner+
         '<figcaption><b>'+(prefix||'Fig. ')+figNo+'</b> — '+esc(it.caption||'')+'</figcaption></figure>';
}

/* ── record ledger (record.html) ──────────────────────────── */
var index = document.getElementById('index');
if(index){
  var count = document.getElementById('recCount');
  if(count) count.textContent = RECORD.length;

  RECORD.forEach(function(it,i){
    var item = document.createElement('div');
    item.className = 'item';
    item.dataset.group = it.group;
    item.dataset.own = it.own ? '1' : '0';

    var actions = '';
    if(it.link)  actions += '<a class="lnk" href="'+it.link+'" target="_blank" rel="noopener">'+esc(it.linkLabel)+' <span class="x">↗</span></a>';
    if(it.link2) actions += '<a class="lnk" href="'+it.link2+'" target="_blank" rel="noopener">'+esc(it.link2Label)+' <span class="x">↗</span></a>';

    item.innerHTML =
      '<button class="row" type="button" aria-expanded="false" aria-controls="p'+i+'">'+
        '<span class="row-kind">'+esc(it.kind)+'</span>'+
        '<span class="row-title" role="heading" aria-level="3">'+it.title+
          (it.dek?'<span class="dek">'+it.dek+'</span>':'')+'</span>'+
        '<span class="row-year">'+esc(it.year)+'</span>'+
        '<span class="row-mark" aria-hidden="true">+</span>'+
      '</button>'+
      '<div class="panel" id="p'+i+'"><div class="panel-in"><div class="panel-pad">'+
        '<div></div><div class="panel-body">'+
          '<p>'+it.body+'</p>'+
          (it.ev?'<div class="ev"><span>Evidence</span>'+it.ev+'</div>':'')+
          figure(it,'Fig. R')+
          (actions?'<div class="actions">'+actions+'</div>':'')+
          (it.note?'<p class="note">'+it.note+'</p>':'')+
        '</div><div></div>'+
      '</div></div></div>';

    var btn = item.querySelector('.row');
    var mark = item.querySelector('.row-mark');
    btn.addEventListener('click', function(){
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mark.textContent = open ? '−' : '+';
    });
    index.appendChild(item);
  });

  var filterBar = document.getElementById('filters');
  if(filterBar){
    var groups = ['All'];
    RECORD.forEach(function(it){ if(groups.indexOf(it.group)<0) groups.push(it.group); });
    groups.forEach(function(g,i){
      var n = g==='All' ? RECORD.length : RECORD.filter(function(x){return x.group===g;}).length;
      var b = document.createElement('button');
      b.type='button'; b.className='filt';
      b.innerHTML = g + '<span class="ct">'+n+'</span>';
      b.setAttribute('aria-pressed', i===0?'true':'false');
      b.addEventListener('click', function(){
        filterBar.querySelectorAll('.filt').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true');
        index.querySelectorAll('.item').forEach(function(item){
          var show = (g==='All') || (item.dataset.group===g);
          item.hidden = !show;
          if(!show){
            item.classList.remove('open');
            item.querySelector('.row').setAttribute('aria-expanded','false');
            item.querySelector('.row-mark').textContent='+';
          }
        });
      });
      filterBar.appendChild(b);
    });
  }
}

/* ── press clippings (record.html) ────────────────────────── */
var pressList = document.getElementById('pressList');
if(pressList){
  figNo = 0;                       /* press figures number from 1 */
  var pc = document.getElementById('pressCount');
  if(pc) pc.textContent = PRESS.length + ' items';

  PRESS.forEach(function(p){
    var el = document.createElement('article');
    el.className = 'clip' + ((p.image||p.youtube) ? ' has-fig' : '');
    el.innerHTML =
      '<div><div class="clip-outlet">'+p.outlet+'</div><div class="clip-meta">'+
        p.meta.split(' · ').map(function(m){return '<span>'+esc(m)+'</span>';}).join('')+'</div></div>'+
      '<div>'+
        '<h3 class="clip-head">'+p.head+'</h3>'+
        '<p class="clip-desc">'+p.desc+'</p>'+
        (p.flag?'<p class="clip-flag">'+p.flag+'</p>':'')+
        '<div class="clip-foot"><a class="lnk" href="'+p.link+'" target="_blank" rel="noopener">'+esc(p.linkLabel)+' <span class="x">↗</span></a></div>'+
      '</div>'+
      ((p.image||p.youtube) ? '<div class="clip-fig">'+figure(p)+'</div>' : '');
    pressList.appendChild(el);
  });
}

/* ── condensed lists (index.html) ─────────────────────────── */
document.querySelectorAll('[data-list]').forEach(function(host){
  var want = host.getAttribute('data-list').split(',');
  RECORD.filter(function(it){ return it.home && want.indexOf(it.group) > -1; })
        .forEach(function(it){
    var row = document.createElement('div');
    row.className = 'list-row';
    row.dataset.ext = it.own ? '0' : '1';
    row.innerHTML =
      '<span class="list-kind">'+esc(it.kind)+'</span>'+
      '<h3 class="list-t">'+it.title+(it.dek?'<span class="dek">'+it.dek+'</span>':'')+'</h3>'+
      '<span class="list-year">'+esc(it.year)+'</span>';
    host.appendChild(row);
  });
});

/* ── media strip (index.html) ─────────────────────────────── */
var strip = document.getElementById('mediaStrip');
if(strip){
  /* Two sources feed this strip: press written about the work,
     and the articles written for a publication. A record entry
     opts in with a `media` object carrying the card's wording. */
  var cards = PRESS.filter(function(p){ return p.home; })
    .concat(RECORD.filter(function(r){ return r.media; })
      .map(function(r){
        return { outlet:r.media.outlet, meta:r.media.meta,
                 head:r.media.head, link:r.link };
      }));

  cards.forEach(function(p){
    var a = document.createElement('a');
    a.href = p.link; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML =
      '<span class="outlet">'+p.outlet+'</span>'+
      '<span class="meta">'+esc(p.meta)+'</span>'+
      '<span class="head">'+p.head+'</span>'+
      '<span class="go">Read ↗</span>';
    strip.appendChild(a);
  });
}

/* ── the five layers (index.html) ─────────────────────────── */
document.querySelectorAll('.layer').forEach(function(btn){
  btn.addEventListener('click', function(){
    var open = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.layer').forEach(function(o){
      o.setAttribute('aria-expanded','false');
      o.querySelector('.cue').textContent = '+';
    });
    if(!open){
      btn.setAttribute('aria-expanded','true');
      btn.querySelector('.cue').textContent = '−';
    }
  });
});

/* ── youtube facade ───────────────────────────────────────── */
document.querySelectorAll('.yt img').forEach(function(img){
  function fail(){ var b = img.closest('.yt'); img.remove(); if(b) b.classList.add('nothumb'); }
  img.addEventListener('error', fail);
  if(img.complete && img.naturalWidth === 0) fail();
});
document.addEventListener('click', function(e){
  var yt = e.target.closest('.yt');
  if(!yt) return;
  var v = document.createElement('div');
  v.className = 'video';
  v.innerHTML = '<iframe src="https://www.youtube.com/embed/'+yt.getAttribute('data-id')+
                '?autoplay=1" title="The Built Economy — cloud-native FP&amp;A interview" '+
                'allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  yt.replaceWith(v);
});

/* ── chrome ───────────────────────────────────────────────── */
var nav = document.getElementById('nav');
if(nav) addEventListener('scroll', function(){
  nav.classList.toggle('stuck', scrollY > 20);
}, {passive:true});

document.querySelectorAll('.flow,.nav-links').forEach(function(el){
  function edge(){ el.classList.toggle('at-end', el.scrollLeft + el.clientWidth >= el.scrollWidth - 2); }
  el.addEventListener('scroll', edge, {passive:true});
  addEventListener('resize', edge);
  edge();
});

})();
