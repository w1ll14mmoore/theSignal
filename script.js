/* ─────────────────────────────────────────
   The Signal · ERA Labs
   Shared review-page script
   ───────────────────────────────────────── */

/* Each review page injects its own PAGE_DATA object before loading this file.
   Shape expected:
   {
     score: Number,          // e.g. 7.6
     commentCount: Number,   // e.g. 832
     dims: Array,
     clusters: Array,
     controversies: Array
   }
*/

(function () {
  'use strict';

  /* ── Default data (J. Cole / The Fall Off) ─────────────────────── */
  /* Overridden when a review page sets window.PAGE_DATA before this script runs */
  const DEFAULT_DATA = {
    score: 7.6,
    commentCount: 832,

    dims: [
      {
        name: 'Lyrical Quality',
        score: 9.0,
        color: '#2d7a2d',
        tierText: 'Elite',
        tierColor: '#2d7a2d',
        tierBg: 'rgba(45,122,45,0.08)',
        read: "Near-unanimous praise across all clusters. Cole's internal rhyme density and syllabic precision score highest of any dimension. The close readers built entire thread ecosystems around specific bars."
      },
      {
        name: 'Emotional Depth',
        score: 8.5,
        color: '#1a6b5a',
        tierText: 'Strong',
        tierColor: '#1a6b5a',
        tierBg: 'rgba(26,107,90,0.08)',
        read: "The Emotional Moments cluster drives this score disproportionately. Their 8.5 average reflects listeners for whom Cole's music functions as personal documentation — loss, growth, fatherhood."
      },
      {
        name: 'Storytelling',
        score: 8.0,
        color: '#2a5f8a',
        tierText: 'Notable',
        tierColor: '#2a5f8a',
        tierBg: 'rgba(42,95,138,0.08)',
        read: "The narrative arc across the album's first half is widely praised. Long-form engagement is the highest ERA has recorded for a Cole release. The back half is where the narrative loses people."
      },
      {
        name: 'Production Quality',
        score: 7.5,
        color: '#C94A12',
        tierText: 'Solid',
        tierColor: '#C94A12',
        tierBg: 'rgba(201,74,18,0.08)',
        read: "The Production Appreciation cluster is the swing vote here. Their 7.2 reflects appreciation for craft alongside a nagging sense that the sonic choices play it safer than the lyricism warrants."
      },
      {
        name: 'Replay Value',
        score: 7.5,
        color: '#7a6018',
        tierText: 'Solid',
        tierColor: '#7a6018',
        tierBg: 'rgba(122,96,24,0.08)',
        read: "Late-night listening patterns dominate the replay conversation. The album accrues meaning over time — an intentional design choice that rewards patience and punishes casual engagement."
      },
      {
        name: 'Cultural Impact',
        score: 7.0,
        color: '#6b3f8a',
        tierText: 'Mixed',
        tierColor: '#6b3f8a',
        tierBg: 'rgba(107,63,138,0.08)',
        read: "The most contested score in the analysis. Cole's cultural significance is unquestioned — what divides audiences is whether this album advances or consolidates that position."
      },
      {
        name: 'Album Structure',
        score: 6.0,
        color: '#8a2a2a',
        tierText: 'Divisive',
        tierColor: '#8a2a2a',
        tierBg: 'rgba(138,42,42,0.08)',
        read: "The back half sequencing is where the album loses its most committed listeners. Nostalgic Rap Critics are the loudest voices here — but even core fans express structural ambivalence."
      }
    ],

    clusters: [
      { name: 'J. Cole Appreciation Fans', color: '#7ecb45', read: '94% loyalty · Devotional core' },
      { name: 'Lyrical Analysis',          color: '#10b981', read: '91% depth · Close readers' },
      { name: 'Nostalgic Rap Critics',      color: '#22d3ee', read: 'High friction · Benchmarkers' },
      { name: 'Emotional Moments',          color: '#f59e0b', read: '9.1x reach · Converters' },
      { name: 'Production Appreciation',    color: '#eab308', read: '↑44% growth · Sonic analysts' },
      { name: 'Industry Insights',          color: '#a78bfa', read: 'Elite signal · Chess players' }
    ],

    controversies: [
      { a: 'J Cole Enthusiasts',   b: 'Nostalgic Rap Critics', tension: 82, label: 'HIGH TENSION' },
      { a: 'Lyrical Analysis',     b: 'Recency Bias',          tension: 68, label: 'HIGH TENSION' },
      { a: 'Production',           b: 'Industry Insights',     tension: 54, label: 'MODERATE'     },
      { a: 'Album Comparisons',    b: 'Emotional Moments',     tension: 41, label: 'EMERGING'     }
    ]
  };

  const data = window.PAGE_DATA || DEFAULT_DATA;

  /* ── DOM builders ──────────────────────────────────────────────── */

  function buildDims () {
    const t = document.getElementById('dim-table');
    if (!t) return;
    t.innerHTML = '';

    data.dims.forEach((d, i) => {
      const row = document.createElement('div');
      row.className = 'dim-t-row';
      row.id = `dt-${i}`;
      row.innerHTML = `
        <div class="dim-t-name">${d.name}</div>
        <div class="dim-t-bar-wrap">
          <div class="dim-t-track">
            <div class="dim-t-fill" id="dtf-${i}" style="background:${d.color}"></div>
          </div>
        </div>
        <div class="dim-t-right">
          <div class="dim-t-score" style="color:${d.color}">${d.score.toFixed(1)}</div>
          <div class="dim-t-tier" style="color:${d.tierColor};border-color:${d.tierColor};background:${d.tierBg}">${d.tierText}</div>
        </div>
        <div class="dim-expand">${d.read}</div>
      `;
      row.addEventListener('click', () => row.classList.toggle('expanded'));
      t.appendChild(row);
    });
  }

  function buildClusters () {
    const c = document.getElementById('cluster-list');
    if (!c) return;
    c.innerHTML = '';

    data.clusters.forEach(cl => {
      c.innerHTML += `
        <div class="cluster-item">
          <div class="cluster-dot" style="background:${cl.color}"></div>
          <div>
            <div class="cluster-name">${cl.name}</div>
            <div class="cluster-read">${cl.read}</div>
          </div>
        </div>
      `;
    });
  }

  function buildControversies () {
    const c = document.getElementById('controversy-list');
    if (!c) return;
    c.innerHTML = '';

    data.controversies.forEach((cv, i) => {
      c.innerHTML += `
        <div class="controversy-item">
          <div class="con-versus">${cv.a} <span class="con-sym">↔</span> ${cv.b}</div>
          <div class="con-label">${cv.label} · ${cv.tension}% tension</div>
          <div class="con-bar"><div class="con-fill" id="cf-${i}"></div></div>
        </div>
      `;
    });

    setTimeout(() => {
      data.controversies.forEach((cv, i) => {
        const f = document.getElementById(`cf-${i}`);
        if (f) f.style.width = cv.tension + '%';
      });
    }, 2400);
  }

  /* ── Animations ────────────────────────────────────────────────── */

  function animateScore (target) {
    let cur = 0;
    const inc = target / 70;
    const el   = document.getElementById('score-num');
    const fill = document.getElementById('score-fill');
    const glance = document.getElementById('glance-score');

    if (glance) glance.textContent = target.toFixed(1);
    if (fill)   fill.style.width   = (target / 10 * 100) + '%';

    if (!el) return;

    const id = setInterval(() => {
      cur = Math.min(cur + inc, target);
      el.textContent = cur.toFixed(1);
      if (cur >= target) clearInterval(id);
    }, 22);
  }

  function animateCounter (target) {
    const el   = document.getElementById('comment-count');
    if (!el) return;
    let cur    = 0;
    const step = Math.ceil(target / 55);

    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString();
      if (cur >= target) clearInterval(id);
    }, 18);
  }

  /* ── Boot ──────────────────────────────────────────────────────── */

  function runPage () {
    buildDims();
    buildClusters();
    buildControversies();

    document.querySelectorAll('.fade-in, .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('show'), 80 + i * 60);
    });

    setTimeout(() => {
      animateScore(data.score);
      animateCounter(data.commentCount);
    }, 600);

    setTimeout(() => {
      data.dims.forEach((_, i) => {
        setTimeout(() => {
          const row = document.getElementById(`dt-${i}`);
          if (row) row.classList.add('show');
          setTimeout(() => {
            const f = document.getElementById(`dtf-${i}`);
            if (f) f.style.width = (data.dims[i].score / 10 * 100) + '%';
          }, 180);
        }, i * 110);
      });
    }, 1400);
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPage);
  } else {
    runPage();
  }

}());
