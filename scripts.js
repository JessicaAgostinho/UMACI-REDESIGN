// VERSION F — Natura Glassmorphism
const MOCK_MODE = true;
const CONTACT_ENDPOINT = '/api/contact';

// Parallax hero
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}

// Parallax for collections section background
const colecoesBg = document.getElementById('colecoesBg');
if (colecoesBg) {
  window.addEventListener('scroll', () => {
    const section = colecoesBg.closest('section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const progress = -rect.top / (rect.height + window.innerHeight);
    colecoesBg.style.transform = `translateY(${progress * 60}px)`;
  }, { passive: true });
}

// Mobile nav
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const links = document.getElementById('navLinks');
    if (!links) return;
    const isOpen = links.classList.contains('mobile-open');
    if (isOpen) {
      links.classList.remove('mobile-open');
      links.removeAttribute('style');
    } else {
      links.classList.add('mobile-open');
      Object.assign(links.style, {
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
        background: 'rgba(240,236,228,0.95)', backdropFilter: 'blur(20px)',
        padding: '5rem 2rem 2rem', zIndex: '99', gap: '2rem',
        listStyle: 'none',
      });
    }
  });
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      const links = document.getElementById('navLinks');
      links?.classList.remove('mobile-open');
      links?.removeAttribute('style');
    });
  });
}

// Intersection Observer — fade in cards
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
document.querySelectorAll('.membro-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
  observer.observe(el);
});

// Glass card hover tilt effect
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, background 0.25s, box-shadow 0.25s';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s, background 0.25s, box-shadow 0.25s';
  });
});

// Contact form
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'A enviar…';
    btn.disabled = true;

    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 1200));
      msg.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contacto brevemente.';
      form.reset();
    } else {
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        if (res.ok) { msg.textContent = '✓ Mensagem enviada!'; form.reset(); }
        else msg.textContent = 'Erro ao enviar. Tente novamente.';
      } catch {
        msg.textContent = 'Erro de ligação.';
      }
    }

    btn.textContent = orig;
    btn.disabled = false;
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar componentes
    function loadComponent(id, file) {
        fetch(file)
            .then(response => {
                if (response.ok) return response.text();
                throw new Error('Erro ao carregar ' + file);
            })
            .then(data => {
                document.getElementById(id).innerHTML = data;
                
                // RE-INICIALIZAR O MENU MOBILE
                // Como o header é carregado depois, precisamos de reativar o clique do menu
                if (id === 'header-placeholder') {
                    setupMobileMenu();
                }
            })
            .catch(error => console.error(error));
    }

    // Carregar os ficheiros
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});

// Coloca o teu código antigo do menu mobile aqui dentro para ele funcionar após o carregamento
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}