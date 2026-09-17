/* ============================================
   STUDENT PROFILE — SCRIPT
   Handles: get started / back navigation,
   section switching, dark/light theme,
   typing effect, animated skill bars
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const homePage   = document.getElementById('home-page');
  const app        = document.getElementById('app');
  const getStartedBtn = document.getElementById('getStartedBtn');
  const backBtn    = document.getElementById('backBtn');
  const themeToggle= document.getElementById('themeToggle');
  const navBtns    = document.querySelectorAll('.nav-btn');
  const sections   = document.querySelectorAll('.content .page');
  const typingEl   = document.getElementById('typingText');

  /* ---------- 1. Typing effect on the home screen ---------- */
  const phrases = [
    "Aspiring Software Developer",
    "Passionate about Technology",
    "Ready to learn and grow"
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = phrases[phraseIndex];

    if (!deleting){
      typingEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      typingEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  typeLoop();

  /* ---------- 2. Get Started -> show app ---------- */
  getStartedBtn.addEventListener('click', () => {
    homePage.classList.add('hidden');
    app.style.display = 'flex';
    // small delay so the flex layout applies before first section fades in
    requestAnimationFrame(() => showSection('about'));
  });

  /* ---------- 3. Back button -> return to home ---------- */
  backBtn.addEventListener('click', () => {
    homePage.classList.remove('hidden');
    app.style.display = 'none';
  });

  /* App is hidden until "Get Started" is pressed */
  app.style.display = 'none';

  /* ---------- 4. Section navigation (no page scrolling) ---------- */
  function showSection(targetId){
    sections.forEach(sec => {
      sec.classList.remove('active-section');
    });
    const target = document.getElementById(targetId);
    if (target){
      target.classList.add('active-section');
    }

    navBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === targetId);
    });

    if (targetId === 'skills') animateSkillBars();
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.target));
  });

  /* ---------- 5. Animated skill bars (plays once section opens) ---------- */
  function animateSkillBars(){
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const width = fill.dataset.width;
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => { fill.style.width = width + '%'; }, 80);
      });
    });
  }

  /* ---------- 6. Dark / Light theme toggle (remembers choice) ---------- */
  const savedTheme = localStorage.getItem('profileTheme');
  if (savedTheme === 'dark'){
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark){
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('profileTheme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('profileTheme', 'dark');
    }
  });

});