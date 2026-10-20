(function () {
  const hero   = document.querySelector('.hero');
  const slides = hero.querySelectorAll('.hero-slide');
  const dotsEl = hero.querySelector('.hero-dots');
  const INTERVAL = 5000;
  let index = 0;

  const dots = [...slides].map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hero-dot';
    b.setAttribute('aria-label', `Kuva ${i + 1} / ${slides.length}`);
    b.addEventListener('click', () => show(i));
    dotsEl.appendChild(b);
    return b;
  });

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === index));
    dots.forEach((d, n) => {
      d.classList.toggle('is-active', n === index);
      d.setAttribute('aria-current', n === index ? 'true' : 'false');
    });
  }

  show(0);
  setInterval(() => show(index + 1), INTERVAL);
})();