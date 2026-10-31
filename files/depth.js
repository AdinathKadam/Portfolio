/* ═══════════════════════════════════════════════════════════
   Depth and motion.

   The rule everything here follows: motion has to carry
   information. It shows a sequence, a direction, a position, or
   a relationship. Nothing moves because movement is available.

   1. REVEAL     — anything tagged .rise fades up once, on first
                   sight. Rows in a list stagger, so the list
                   reads as a list rather than as a slab.
   2. THE STACK  — the five method layers sit in real 3D space,
                   assembling from depth in pipeline order and
                   turning to face the reader on approach.
   3. THE HEAD   — the thesis arrives a line at a time, which is
                   the order it is meant to be read in.
   4. THE PULSE  — one band of light travels the reference
                   architecture, left to right, once. The
                   diagram's whole point is direction of flow.
   5. THE INK    — a mark under the nav tracks which section the
                   reader is in. Position, not decoration.
   6. HERO DEPTH — portrait and copy move at different rates on
                   scroll.

   All of it is transform and opacity, on one rAF loop that
   reads scroll position once per frame. No layout is read in a
   scroll handler, so none of this can cause reflow.

   Flat is the default state of the page, not the fallback. The
   hidden start states are applied by JS, never by the
   stylesheet alone, so a blocked script, a narrow viewport or a
   reduced-motion setting all leave the page complete and still.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var hasIO = 'IntersectionObserver' in window;

  /* ── 1 · reveal ────────────────────────────────────────────
     Runs at every width. Under reduced motion the CSS turns it
     into a plain appearance rather than a movement. */

  /* Rows belong to a sequence, so they arrive as one. Capped —
     past the sixth row a reader is waiting, not watching. */
  [['.list', '.list-row'], ['.media', 'a'], ['.index', '.item'], ['#pressList', '.clip']]
    .forEach(function (pair) {
      document.querySelectorAll(pair[0]).forEach(function (group) {
        group.querySelectorAll(pair[1]).forEach(function (row, i) {
          row.classList.add('rise');
          row.style.setProperty('--rd', Math.min(i, 6) * 55 + 'ms');
        });
      });
    });

  var rises = document.querySelectorAll('.rise');

  /* The hidden start state is applied here, never by the
     stylesheet on its own — a blocked script must not leave a
     page of blank space. */
  root.classList.add('reveal-on');

  if (!hasIO) {
    for (var i = 0; i < rises.length; i++) rises[i].classList.add('in');
    return;
  }

  var revealer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      revealer.unobserve(e.target);              // once only
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

  rises.forEach(function (el) { revealer.observe(el); });

  /* Everything below is depth. Opt out entirely and leave. */
  if (reduced.matches) return;
  if (window.matchMedia('(max-width: 900px)').matches) return;

  root.classList.add('depth');

  /* ── 2 · the stack ─────────────────────────────────────────
     Stages are numbered so CSS can give each its own resting Z.
     01 sits furthest back, 05 nearest the reader, because the
     decision is the point of the pipeline. */
  var stack = document.querySelector('.layers-scene');
  var reading = false;

  if (stack) {
    stack.querySelectorAll('.layer').forEach(function (c, n) { c.style.setProperty('--n', n); });

    once(stack, 0.25, function () { stack.classList.add('assembled'); });

    /* Opening a layer squares the scene up wherever it sits on
       screen — detail is read straight on, never through the
       angle. */
    stack.addEventListener('click', function () {
      setTimeout(function () {
        reading = !!stack.querySelector('.layer[aria-expanded="true"]');
        onScroll();
      }, 0);
    });
  }

  /* ── 3 · the head ──────────────────────────────────────────
     Split on the author's own line breaks and let each line rise
     out of its own mask. The breaks are already where the
     meaning divides, so nothing new has to be decided here. */
  var h1 = document.querySelector('.hero h1');
  if (h1 && h1.innerHTML.indexOf('<br') > -1) {
    h1.innerHTML = h1.innerHTML.split(/<br\s*\/?>/i).map(function (line, n) {
      return '<span class="ln" style="--ld:' + (n * 90 + 120) + 'ms"><i>' + line + '</i></span>';
    }).join('');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { h1.classList.add('lit'); });
    });
  }

  /* ── 4 · the pulse ─────────────────────────────────────────
     A band of light crosses the architecture once: it grows
     from the left edge of a stage, then retracts off the right
     into the next one. That is the direction the data moves. */
  document.querySelectorAll('.flow').forEach(function (flow) {
    var stages = flow.querySelectorAll('.stg');
    if (!stages.length) return;

    once(flow, 0.4, function () {
      stages.forEach(function (s, n) {
        setTimeout(function () { s.classList.add('lit'); }, n * 230);
        setTimeout(function () { s.classList.add('past'); }, n * 230 + 430);
        setTimeout(function () { s.classList.remove('lit', 'past'); }, n * 230 + 1100);
      });
    });
  });

  /* ── 5 · the ink ───────────────────────────────────────────
     One mark under the nav, moved to whichever section is
     currently being read. It answers "where am I", which is the
     only question a long page's nav is for. */
  var links = document.querySelectorAll('.nav-links a[href^="#"]');
  if (links.length) {
    var bar = document.createElement('span');
    bar.className = 'nav-ink';
    bar.setAttribute('aria-hidden', 'true');
    document.querySelector('.nav-links').appendChild(bar);

    /* The nav is ordered for the reader; the page is ordered by
       the document. Track the document order, or the mark lands
       on the wrong link wherever the two disagree. */
    var targets = [];
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      if (sec) targets.push({ link: a, sec: sec, seen: false });
    });
    targets.sort(function (x, y) {
      return (x.sec.compareDocumentPosition(y.sec) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });

    var current = null;
    function mark(a) {
      if (a === current) return;
      if (current) current.removeAttribute('data-here');
      current = a;
      if (!a) { bar.style.opacity = '0'; return; }
      a.setAttribute('data-here', '');
      bar.style.opacity = '1';
      bar.style.width = a.offsetWidth + 'px';
      bar.style.transform = 'translateX(' + a.offsetLeft + 'px)';
    }

    /* The section occupying the upper middle of the screen is
       the one being read; of those in that band, the furthest
       down the page wins. */
    var sectionWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        for (var k = 0; k < targets.length; k++) {
          if (targets[k].sec === e.target) targets[k].seen = e.isIntersecting;
        }
      });
      var best = null;
      targets.forEach(function (t) { if (t.seen) best = t.link; });
      mark(best);
    }, { rootMargin: '-72px 0px -55% 0px' });

    targets.forEach(function (t) { sectionWatch.observe(t.sec); });

    window.addEventListener('resize', function () {
      if (current) {
        bar.style.width = current.offsetWidth + 'px';
        bar.style.transform = 'translateX(' + current.offsetLeft + 'px)';
      }
    }, { passive: true });
  }

  /* ── 6 · scroll-linked depth ───────────────────────────────
     One rAF loop. It reads scroll position once per frame and
     writes a single scalar to each participating element; the
     stylesheet decides what that scalar means, so the geometry
     stays in one readable place.

       hero   --p  0 at the top of the page → 1 past the hero
       stack  --t  0 as it enters           → 1 once it is read

     --t is what turns the pipeline: it arrives angled and
     rotates toward the reader, so by the time a layer is worth
     opening it is facing them square. */
  var hero = document.querySelector('.hero-stage');
  var plate = hero && hero.querySelector('.figure-plate');
  var copy = hero && hero.querySelector('.hero-copy');

  var heroLive = false, stackLive = false, queued = false;
  var heroH = hero ? hero.offsetHeight || 1 : 1;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function frame() {
    queued = false;

    if (heroLive && hero) {
      var p = clamp01((window.pageYOffset || 0) / heroH).toFixed(4);
      if (plate) plate.style.setProperty('--p', p);
      if (copy) copy.style.setProperty('--p', p);
    }

    if (stackLive && stack) {
      var r = stack.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var t = clamp01((vh - (r.top + r.height / 2)) / (vh * 0.45));
      if (reading) t = Math.max(t, 0.92);
      stack.style.setProperty('--t', t.toFixed(4));
    }
  }

  function onScroll() {
    if (queued || (!heroLive && !stackLive)) return;
    queued = true;
    requestAnimationFrame(frame);
  }

  function live(el, set) {
    if (!el) return;
    new IntersectionObserver(function (entries) {
      set(entries[0].isIntersecting);
      onScroll();
    }, { threshold: 0 }).observe(el);
  }
  live(hero, function (v) { heroLive = v; });
  live(stack, function (v) { stackLive = v; });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (hero) heroH = hero.offsetHeight || 1;
    onScroll();
  }, { passive: true });
  frame();

  /* fires cb the first time el is that far into view, then stops */
  function once(el, threshold, cb) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cb();
        io.disconnect();
      });
    }, { threshold: threshold });
    io.observe(el);
  }

  /* If the reader turns reduced motion on mid-visit, stop. */
  function stop() {
    if (!reduced.matches) return;
    root.classList.remove('depth');
    window.removeEventListener('scroll', onScroll);
    [plate, copy, stack].forEach(function (el) { if (el) el.style.cssText = ''; });
  }
  if (reduced.addEventListener) reduced.addEventListener('change', stop);
})();
