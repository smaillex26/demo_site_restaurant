/* ═══════════════════════════════════════
   LE JARDIN SECRET — script.js
   ═══════════════════════════════════════ */

'use strict';

/* ── Nav scroll effect ── */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ── Mobile menu ── */
(function () {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileClose');
  if (!burger || !menu) return;

  let open = false;
  function toggle(force) {
    open = force !== undefined ? force : !open;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    const bars = burger.querySelectorAll('span');
    if (open) {
      bars[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  }
  burger.addEventListener('click', () => toggle());
  closeBtn && closeBtn.addEventListener('click', () => toggle(false));
  document.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => toggle(false)));
})();

/* ── Scroll Reveal ── */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

/* ── Counter animation ── */
(function () {
  const counters = document.querySelectorAll('.chiffre__num[data-target]');
  if (!counters.length) return;
  function animate(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const start = performance.now();
    const dur = 1600;
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
})();

/* ── Menu tabs ── */
(function () {
  const tabs = document.querySelectorAll('.tab-btn');
  if (!tabs.length) return;
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.menu__panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('tab-' + btn.getAttribute('data-tab'));
      if (target) {
        target.classList.add('active');
        // trigger reveal on newly shown panel
        target.querySelectorAll('.reveal').forEach(el => {
          if (!el.classList.contains('visible')) {
            el.classList.add('visible');
          }
        });
      }
    });
  });
})();

/* ── Testimonials carousel ── */
(function () {
  const inner = document.getElementById('avisInner');
  const prev = document.getElementById('avisPrev');
  const next = document.getElementById('avisNext');
  const dotsContainer = document.getElementById('avisDots');
  if (!inner || !prev || !next) return;

  const cards = inner.querySelectorAll('.avis-card');
  let current = 0;

  function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function maxIndex() { return cards.length - getVisible(); }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const count = maxIndex() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'avis-dot' + (i === current ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex()));
    // Calculate card width + gap
    const cardW = inner.querySelector('.avis-card').getBoundingClientRect().width;
    const gap = 24;
    inner.style.transform = `translateX(-${current * (cardW + gap)}px)`;
    dotsContainer.querySelectorAll('.avis-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  buildDots();
  window.addEventListener('resize', () => { buildDots(); goTo(current); });

  // Auto-play
  let timer = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000);
  [prev, next].forEach(btn => {
    btn.addEventListener('click', () => { clearInterval(timer); timer = setInterval(() => goTo(current >= maxIndex() ? 0 : current + 1), 5000); });
  });
})();

/* ── Reservation form — Web3Forms integration ── */
(function () {
  const form = document.getElementById('resaForm');
  const success = document.getElementById('resaSuccess');
  const btn = document.getElementById('resaBtn');
  if (!form || !success || !btn) return;

  // Set min date to today
  const dateInput = document.getElementById('resaDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Clear error highlight on input
  form.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('input', () => { f.style.borderColor = ''; });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ── Validation des champs obligatoires ──
    const required = [
      document.getElementById('resaNom'),
      document.getElementById('resaTel'),
      document.getElementById('resaCvts'),
      document.getElementById('resaDate'),
      document.getElementById('resaService'),
    ];
    let valid = true;
    required.forEach(f => {
      f.style.borderColor = '';
      if (!f.value.trim()) {
        f.style.borderColor = '#c0392b';
        valid = false;
      }
    });
    if (!valid) return;

    // ── Vérifier si la clé Web3Forms est configurée ──
    const accessKey = form.querySelector('input[name="access_key"]').value;
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY') {
      // Mode démo : simule l'envoi sans vraie clé
      btn.innerHTML = 'Envoi en cours… <span class="btn-spinner"></span>';
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        success.classList.add('show');
        success.querySelector('p').textContent =
          '⚠️ Mode démo : aucun email envoyé. Configurez votre clé Web3Forms pour recevoir les réservations.';
      }, 1200);
      return;
    }

    // ── Envoi réel via Web3Forms API ──
    btn.innerHTML = 'Envoi en cours…';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (result.success) {
        form.style.display = 'none';
        success.classList.add('show');
      } else {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = 'Envoyer ma demande <svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
      // Affiche un message d'erreur sous le bouton
      let errMsg = form.querySelector('.form-error');
      if (!errMsg) {
        errMsg = document.createElement('p');
        errMsg.className = 'form-error';
        errMsg.style.cssText = 'color:#e74c3c;font-size:0.82rem;margin-top:10px;text-align:center;';
        btn.parentNode.insertBefore(errMsg, btn.nextSibling);
      }
      errMsg.textContent = '❌ Envoi échoué. Vérifiez votre connexion et réessayez.';
    }
  });
})();

/* ── Gallery filter ── */
(function () {
  const filterBtns = document.querySelectorAll('.gal-filter');
  const items = document.querySelectorAll('.gal-item[data-cat]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hidden', !match);
        if (match) item.style.display = '';
        else item.style.display = 'none';
      });
    });
  });
})();

/* ── Smooth scroll with nav offset ── */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = (document.getElementById('nav')?.offsetHeight || 70);
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
})();
