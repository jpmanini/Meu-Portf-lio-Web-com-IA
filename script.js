/* =========================================================
   script.js
   Funcionalidades:
   1. Alternar entre modo escuro / claro (com memória via localStorage)
   2. Abrir/fechar o menu mobile
   3. Rolagem suave ao clicar nos links do menu
   4. Extras: efeito de "digitação" no hero e animação de entrada
      das seções ao rolar a página
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. MODO ESCURO / CLARO
  ------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const iconMoon = document.getElementById('themeIconMoon');
  const iconSun = document.getElementById('themeIconSun');

  // Recupera preferência salva anteriormente (se existir)
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
  }

  function updateThemeIcon() {
    const isLight = root.getAttribute('data-theme') === 'light';
    iconMoon.hidden = isLight;
    iconSun.hidden = !isLight;
  }
  updateThemeIcon();

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';

    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }

    updateThemeIcon();
  });

  /* -------------------------------------------------------
     2. MENU MOBILE (abrir / fechar)
  ------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');

  function closeMenu() {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  }

  menuToggle.addEventListener('click', toggleMenu);

  /* -------------------------------------------------------
     3. ROLAGEM SUAVE + fechar o menu ao clicar em um link
  ------------------------------------------------------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      closeMenu();
    });
  });

  // Fecha o menu automaticamente se a tela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeMenu();
  });

  /* -------------------------------------------------------
     EXTRA: efeito de "digitação" no terminal do hero
  ------------------------------------------------------- */
  const typedTextEl = document.getElementById('typedText');
  const messages = [
    'interesse principal: cybersecurity',
    'também estudando: cloud computing, devops'
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = messages[msgIndex];

    if (!deleting) {
      typedTextEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600); // pausa lendo a frase completa
        return;
      }
    } else {
      typedTextEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
      }
    }

    setTimeout(typeLoop, deleting ? 35 : 55);
  }

  if (typedTextEl) typeLoop();

  /* -------------------------------------------------------
     EXTRA: animação sutil ao rolar (fade + subida)
  ------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.about__grid, .skills__grid, .projects__grid, .contact__grid'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  /* -------------------------------------------------------
     Ano atual no rodapé
  ------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
