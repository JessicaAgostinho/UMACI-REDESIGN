// VERSION D — Dark Minimal
const MOCK_MODE = true;
const CONTACT_ENDPOINT = '/api/contact';

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Intersection Observer for animations
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => animateObserver.observe(el));
document.querySelectorAll('.numbers__item').forEach(el => animateObserver.observe(el));
document.querySelectorAll('.colecao-card').forEach(el => animateObserver.observe(el));
document.querySelectorAll('.membro').forEach(el => animateObserver.observe(el));

// Animated counter
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('pt-PT');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const valEl = entry.target.querySelector('.numbers__val');
      if (valEl && !valEl.dataset.counted) {
        valEl.dataset.counted = '1';
        animateCounter(valEl);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.numbers__item').forEach(el => counterObserver.observe(el));

// Stagger delays
document.querySelectorAll('.colecao-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.membro').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

// Contact form
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'A enviar…';
    btn.disabled = true;

    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 1200));
      msg.textContent = 'Mensagem enviada com sucesso. Obrigado!';
      form.reset();
    } else {
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        msg.textContent = res.ok ? 'Mensagem enviada. Obrigado!' : 'Erro ao enviar. Tente novamente.';
        if (res.ok) form.reset();
      } catch {
        msg.textContent = 'Erro de ligação. Tente mais tarde.';
      }
    }

    btn.textContent = 'Enviar mensagem';
    btn.disabled = false;
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
