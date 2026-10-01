/* =============================================
   Fitko na Hegerce — Shared Components & Logic
   ============================================= */

/**
 * Determines which page is currently active based on the filename.
 * @returns {string} filename like "index.html", "o-nas.html" etc.
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return file;
}

/**
 * Renders the navbar into the element with id="navbar".
 */
function renderNavbar() {
  const target = document.getElementById('navbar');
  if (!target) return;

  const current = getCurrentPage();

  const isIndex = current === 'index.html' || current === '';

  const links = [
    { label: 'Úvod',    href: isIndex ? '#' : 'index.html' },
    { label: 'O nás',   href: isIndex ? '#o-nas' : 'index.html#o-nas' },
    { label: 'Vstupy',  href: isIndex ? '#vstupy' : 'index.html#vstupy' },
    { label: 'Fitko',   href: isIndex ? '#fitko' : 'index.html#fitko' },
    { label: 'Přihlásit', href: 'login.html' },
  ];

  const navLinksHTML = links.map(link => {
    const active = current === link.href ? ' active' : '';
    return `<a href="${link.href}" class="${active}">${link.label}</a>`;
  }).join('');

  const ctaActive = current === 'registrace.html' ? ' active' : '';

  target.innerHTML = `
    <nav class="navbar" role="navigation" aria-label="Hlavní navigace">
      <div class="container">
        <a href="index.html" class="logo-placeholder" aria-label="Domů">
          <span>Logo</span>
        </a>

        <div class="nav-links" id="navLinks">
          ${navLinksHTML}
          <a href="registrace.html" class="nav-cta${ctaActive}">Vytvořit účet</a>
        </div>

        <button class="hamburger" id="hamburger" aria-label="Otevřít menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    <div class="nav-overlay" id="navOverlay"></div>
  `;

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // ZAVŘENÍ MENU PO KLIKNUTÍ NA ODKAZ A JEMNÉ ODSKROLOVÁNÍ
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      // 1. Zavřít menu, pokud je otevřené na mobilu
      if (navLinks.classList.contains('open')) {
        toggleMenu();
      }
      
      // 2. Jemné odskrolování pro kotvy (oprava skoku pod fixní navbar)
      const href = a.getAttribute('href');
      // Zkontrolujeme, zda odkaz obsahuje hash (#) a nevede jen na jinou stránku
      if (href && href.includes('#')) {
        const targetId = href.split('#')[1];
        if (!targetId) return; // Pokud je to jen '#', nic neděláme
        
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault(); // Zabráníme defaultnímu tvrdému skoku
          
          // Získáme výšku navbaru, abychom o ni posunuli odskrolování
          const navbar = document.querySelector('.navbar');
          const navbarHeight = navbar ? navbar.offsetHeight : 0;
          
          // Spočítáme finální pozici
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight;
          
          // Plynulý posun
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });
}

/**
 * Renders the footer into the element with id="footer".
 */
function renderFooter() {
  const target = document.getElementById('footer');
  if (!target) return;

  const current = getCurrentPage();
  const isIndex = current === 'index.html' || current === '';
  const year = new Date().getFullYear();

  target.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-col">
          <h4>Fitko na Hegerce</h4>
          <p style="color:rgba(255,255,255,.6); font-size:.9rem; line-height:1.5;">
            Malé fitness centrum v&nbsp;srdci Poličky.<br>
            70&nbsp;m² prostoru pro váš trénink.
          </p>
        </div>
        <div class="footer-col">
          <h4>Navigace</h4>
          <a href="${isIndex ? '#' : 'index.html'}">Úvod</a>
          <a href="${isIndex ? '#o-nas' : 'index.html#o-nas'}">O nás</a>
          <a href="${isIndex ? '#vstupy' : 'index.html#vstupy'}">Vstupy</a>
          <a href="${isIndex ? '#fitko' : 'index.html#fitko'}">Fitko</a>
        </div>
        <div class="footer-col">
          <h4>Kontakt</h4>
          <a href="mailto:filipbaca01@gmail.com">filipbaca01@gmail.com</a>
          <a href="tel:+420778437692">+420 778 437 692</a>
          <a href="https://www.google.com/maps/search/?api=1&query=S%C3%ADdl.+Hegerova+1019,+Poli%C4%8Dka" target="_blank" rel="noopener noreferrer">
            Polička: Sídl. Hegerova 1019
          </a>
        </div>
        <div class="footer-col">
          <h4>Účet</h4>
          <a href="login.html">Přihlásit se</a>
          <a href="registrace.html">Vytvořit účet</a>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${year} Fitko na Hegerce. Všechna práva vyhrazena.
      </div>
    </footer>
  `;
}

/**
 * Initialise Intersection Observer for .fade-in elements.
 */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}

/**
 * Password visibility toggle logic.
 */
function initPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      // Switch icon
      btn.innerHTML = isPassword ? eyeOffSVG : eyeSVG;
      btn.setAttribute('aria-label', isPassword ? 'Skrýt heslo' : 'Zobrazit heslo');
    });
  });
}

/* SVG icons for password toggle */
const eyeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

const eyeOffSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

/**
 * Disable submit button after form submission (anti-spam).
 */
function initFormProtection() {
  document.querySelectorAll('form[data-protect]').forEach(form => {
    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Odesílání…';
      }
      // For demo purposes, prevent actual submission
      // In production, remove this preventDefault
      e.preventDefault();
      // Re-enable after 3 s for demo
      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = btn.dataset.originalText || 'Odeslat';
        }
      }, 3000);
    });
  });
}

/**
 * XSS sanitization helper for any user-facing text rendering.
 */
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Bootstrap everything on DOMContentLoaded ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  initFadeIn();
  initPasswordToggles();
  initFormProtection();
});
