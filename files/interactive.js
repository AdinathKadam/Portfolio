/* ═══════════════════════════════════════════════════════════
   Two interactive pieces on the home page.

   1. QUIZ — eight questions drawn from the record. Every answer
      reveals the underlying fact, so a wrong guess still teaches
      something. Edit QUIZ below to add or change questions.

   2. RECONCILIATION DRILL — a source column and a reported column;
      find the row that does not tie. Mismatches are transposed or
      mis-keyed digits, the way they actually happen. Difficulty is
      in ROUNDS.

   No storage, no network. Scores live for the visit only.
   ═══════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── 1 · the record quiz ─────────────────────────────────── */
var QUIZ = [
  { q:"Which award did Adinath win at IBAC 2026?",
    a:["Outstanding Graduate Research Award, First Place","Best Paper","Emerging Analyst of the Year","Conference Chair's Prize"],
    correct:0,
    why:"First place in the Outstanding Graduate Research Award at the Fredonia International Business Analytics Conference, SUNY Fredonia, 7–8 May 2026. The plaque is in the ledger." },

  { q:"In the reference architecture, what sits between the cloud database and the semantic model?",
    a:["Power Query, doing light ETL","A second database","The dashboard","Manual reconciliation in Excel"],
    correct:0,
    why:"Stage 04. Transformation logic lives in named, ordered Power Query steps — reviewable, unlike a formula buried in a cell." },

  { q:"The insurance FP&A agent has one hard design rule. What is it?",
    a:["The model never computes","The model never sees finance data","Only one user at a time","It runs offline"],
    correct:0,
    why:"Every figure is calculated deterministically first. The language layer only narrates numbers it is handed — so a plausible-sounding wrong figure cannot reach a board pack." },

  { q:"Who pitched the Zawya feature to the publication?",
    a:["The editor of The Built Economy","Adinath himself","A PR agency","Zawya's own newsroom, unprompted"],
    correct:0,
    why:"Dennis Daniel, Editor in Chief of The Built Economy, pitched it after recording the interview. Zawya's own Dennis Daniel reported it and Anoop Menon edited it. The site says so rather than leaving the reader to guess." },

  { q:"Where did Adinath give two invited guest lectures in 2026?",
    a:["Stevens Institute of Technology","SUNY Fredonia","University of Texas at Dallas","London Business School"],
    correct:0,
    why:"Two invited lectures to graduate business students at the Stevens Institute of Technology School of Business — also where he took his MS." },

  { q:"What is his AFP FP&A Forum 2026 talk called?",
    a:["Excel Isn't the Problem — Your FP&A Data Pipeline Is","Death to Spreadsheets","The AI-First Finance Function","Closing the Books in 24 Hours"],
    correct:0,
    why:"Selected from an open call by the Association for Financial Professionals. The title is the whole argument in one line." },

  { q:"How many practitioners received the FP&A Trends Digest issue carrying his article?",
    a:["More than 17,000","About 1,700","Around 60,000","Roughly 400"],
    correct:0,
    why:"The Digest's subscriber list for Issue 170. The site calls that circulation, not readership — a list size is not an audience." },

  { q:"Which claim on this site is deliberately NOT presented as an achievement?",
    a:["The Wiley journal paper — it is under review, not accepted","The IBAC award","The AFP speaker selection","The Stevens lectures"],
    correct:0,
    why:"It is submitted and under review at Intelligent Systems in Accounting, Finance & Management, and marked as work in progress until the journal decides." }
];

var quizRoot = document.getElementById('quiz');
if(quizRoot){
  var qi = 0, score = 0, answered = false;
  var qStep  = quizRoot.querySelector('.q-step');
  var qScore = quizRoot.querySelector('.q-score');
  var qText  = quizRoot.querySelector('.q-text');
  var qOpts  = quizRoot.querySelector('.q-opts');
  var qWhy   = quizRoot.querySelector('.q-why');
  var qNext  = quizRoot.querySelector('.q-next');

  /* turn the card over between questions — the one flourish
     this section gets, and only where motion is welcome */
  function turn(el){
    if(!el || !document.documentElement.classList.contains('depth')) return;
    el.classList.remove('turning');
    void el.offsetWidth;                       // restart the animation
    el.classList.add('turning');
  }

  function renderQ(){
    var item = QUIZ[qi];
    answered = false;
    qStep.textContent  = String(qi+1).padStart(2,'0') + ' / ' + String(QUIZ.length).padStart(2,'0');
    qScore.textContent = score + ' pt' + (score===1?'':'s');
    qText.textContent  = item.q;
    qWhy.hidden = true;
    qNext.hidden = true;
    qOpts.innerHTML = '';

    // present the options in a shuffled order, tracking the right one
    var order = item.a.map(function(t,i){ return i; });
    for(var k=order.length-1;k>0;k--){ var j=Math.floor(Math.random()*(k+1)); var t=order[k]; order[k]=order[j]; order[j]=t; }

    order.forEach(function(originalIndex){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'q-opt';
      b.textContent = item.a[originalIndex];
      b.addEventListener('click', function(){
        if(answered) return;
        answered = true;
        var right = originalIndex === item.correct;
        if(right){ score++; qScore.textContent = score + ' pt' + (score===1?'':'s'); }
        qOpts.querySelectorAll('.q-opt').forEach(function(o){ o.disabled = true; });
        b.classList.add(right ? 'is-right' : 'is-wrong');
        if(!right){
          qOpts.querySelectorAll('.q-opt').forEach(function(o){
            if(o.textContent === item.a[item.correct]) o.classList.add('is-right');
          });
        }
        qWhy.textContent = item.why;
        qWhy.hidden = false;
        qNext.hidden = false;
        qNext.textContent = (qi === QUIZ.length-1) ? 'See your score' : 'Next question';
        qNext.focus();
      });
      qOpts.appendChild(b);
    });

    turn(quizRoot.querySelector('.q-body'));
  }

  function finish(){
    var verdict = score === QUIZ.length ? 'You read the whole thing. Respect.'
                : score >= 6 ? 'You clearly scrolled properly.'
                : score >= 4 ? 'Halfway there — the ledger has the rest.'
                : 'Worth a scroll back up.';
    quizRoot.querySelector('.q-body').innerHTML =
      '<p class="q-final"><span>' + score + '</span> / ' + QUIZ.length + '</p>' +
      '<p class="q-verdict">' + verdict + '</p>' +
      '<div class="actions" style="margin-top:22px">' +
        '<button type="button" class="act ghost" id="qAgain">Play again</button>' +
        '<a class="lnk" href="record.html">Open the evidence ledger <span class="x">→</span></a>' +
      '</div>';
    document.getElementById('qAgain').addEventListener('click', function(){ location.reload(); });
  }

  qNext.addEventListener('click', function(){
    if(qi === QUIZ.length-1){ finish(); return; }
    qi++; renderQ();
  });
  renderQ();
}

/* ── 2 · reconciliation drill ─────────────────────────────── */
var LINES = ['Gross written premium','Ceded reinsurance','Net earned premium','Claims incurred','Acquisition costs',
             'Policy admin','Broker commission','Reserve movement','Salvage & subrogation','Investment income',
             'Operating expenses','FX revaluation','Deferred acquisition','Unallocated LAE','Levies & fees'];

var ROUNDS = [
  { rows:5,  bad:1, secs:26 },
  { rows:7,  bad:1, secs:24 },
  { rows:9,  bad:1, secs:22 },
  { rows:10, bad:2, secs:26 },
  { rows:12, bad:2, secs:24 }
];

var gameRoot = document.getElementById('drill');
if(gameRoot){
  var gStatus = gameRoot.querySelector('.g-status');
  var gBar    = gameRoot.querySelector('.g-bar span');
  var gTable  = gameRoot.querySelector('.g-table');
  var gMsg    = gameRoot.querySelector('.g-msg');
  var gStart  = gameRoot.querySelector('.g-start');

  var round = 0, points = 0, found = 0, timer = null, left = 0, running = false;

  function money(n){ return n.toLocaleString('en-US'); }

  /* mis-key a figure the way a person actually does: swap two adjacent
     digits, or fat-finger one of them. Never produces the same number. */
  function corrupt(n){
    var d = String(n).split('');
    for(var attempt=0; attempt<12; attempt++){
      var c = d.slice();
      if(Math.random() < 0.6 && c.length > 2){
        var i = Math.floor(Math.random()*(c.length-1));
        var t = c[i]; c[i] = c[i+1]; c[i+1] = t;      // transposition
      } else {
        var j = Math.floor(Math.random()*c.length);
        c[j] = String((+c[j] + 1 + Math.floor(Math.random()*8)) % 10);
      }
      var out = +c.join('');
      if(out !== n && out > 0) return out;
    }
    return n + 9;
  }

  function buildRound(){
    var spec = ROUNDS[round];
    var pool = LINES.slice();
    for(var k=pool.length-1;k>0;k--){ var j=Math.floor(Math.random()*(k+1)); var t=pool[k]; pool[k]=pool[j]; pool[j]=t; }
    var rows = pool.slice(0, spec.rows).map(function(label){
      var v = Math.floor(9000 + Math.random()*900000);
      return { label:label, src:v, rep:v, bad:false };
    });
    var picks = [];
    while(picks.length < spec.bad){
      var i = Math.floor(Math.random()*rows.length);
      if(picks.indexOf(i) < 0) picks.push(i);
    }
    picks.forEach(function(i){ rows[i].rep = corrupt(rows[i].src); rows[i].bad = true; });

    found = 0;
    gTable.innerHTML =
      '<div class="g-head"><span>Line item</span><span>Source system</span><span>Reported</span></div>' +
      rows.map(function(r,i){
        return '<button type="button" class="g-row" data-i="'+i+'">'+
                 '<span class="g-l">'+r.label+'</span>'+
                 '<span class="g-v">'+money(r.src)+'</span>'+
                 '<span class="g-v">'+money(r.rep)+'</span>'+
               '</button>';
      }).join('');

    if(document.documentElement.classList.contains('depth')){
      gTable.querySelectorAll('.g-row').forEach(function(r,i){
        r.style.setProperty('--gd', (i * 45) + 'ms');
        r.classList.add('dealing');
      });
    }

    gTable.querySelectorAll('.g-row').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(!running || btn.classList.contains('done')) return;
        var r = rows[+btn.dataset.i];
        btn.classList.add('done');
        if(r.bad){
          btn.classList.add('is-right');
          found++;
          points += 40 + left * 3;
          gMsg.textContent = 'Correct — ' + money(r.src) + ' was reported as ' + money(r.rep) + '.';
          gMsg.className = 'g-msg ok';
          if(found === spec.bad) setTimeout(nextRound, 700);
        } else {
          btn.classList.add('is-wrong');
          points = Math.max(0, points - 25);
          left = Math.max(0, left - 3);
          gMsg.textContent = 'That row ties. −25, and three seconds.';
          gMsg.className = 'g-msg bad';
        }
        status();
      });
    });

    left = spec.secs;
    gMsg.textContent = spec.bad === 1
      ? 'One line does not tie. Find it.'
      : spec.bad + ' lines do not tie. Find both.';
    gMsg.className = 'g-msg';
    status();
  }

  function status(){
    var spec = ROUNDS[round];
    gStatus.textContent = 'Round ' + (round+1) + ' / ' + ROUNDS.length + ' · ' + points + ' pts · ' + left + 's';
    gBar.style.width = Math.max(0, (left / spec.secs) * 100) + '%';
  }

  function nextRound(){
    round++;
    if(round >= ROUNDS.length){ end(true); return; }
    buildRound();
  }

  function tick(){
    left--;
    status();
    if(left <= 0) end(false);
  }

  function end(cleared){
    running = false;
    clearInterval(timer);
    gTable.innerHTML =
      '<div class="g-end">' +
        '<p class="g-final"><span>' + points + '</span> pts</p>' +
        '<p class="g-verdict">' + (cleared
          ? 'All five rounds reconciled. You would have caught it before the board pack did.'
          : 'Time. The discrepancy went downstream — which is exactly the failure the pipeline is built to prevent.') +
        '</p>' +
      '</div>';
    gMsg.textContent = 'Loaded totals get checked against source totals at the boundary. That is stage 02 of the architecture, and this is why.';
    gMsg.className = 'g-msg';
    gStart.hidden = false;
    gStart.textContent = 'Play again';
    gBar.style.width = '0%';
  }

  gStart.addEventListener('click', function(){
    round = 0; points = 0;
    running = true;
    gStart.hidden = true;
    buildRound();
    clearInterval(timer);
    timer = setInterval(tick, 1000);
  });
}

})();
