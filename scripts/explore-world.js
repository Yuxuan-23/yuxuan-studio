const world = document.querySelector('.explore-page .world');
const deck = document.querySelector('.explore-page .explore-deck');
const enter = document.querySelector('.explore-page .world-enter');

if (world && deck && enter) {
  const root = document.documentElement;
  const cards = [...deck.querySelectorAll('a')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  let revealed = reducedMotion.matches;
  let wheelAmount = 0;
  let lockedUntil = 0;
  let wheelReset;
  let touchStartY = null;
  let motionFrame = 0;
  let pointerInside = false;
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerX = 0;
  let pointerY = 0;

  const motionAllowed = () => !reducedMotion.matches && finePointer.matches && window.innerWidth > 760;

  const writePointerMotion = () => {
    const ease = pointerInside ? 0.12 : 0.075;
    pointerX += (pointerTargetX - pointerX) * ease;
    pointerY += (pointerTargetY - pointerY) * ease;

    world.style.setProperty('--background-shift-x', `${(-pointerX * 5.2).toFixed(2)}px`);
    world.style.setProperty('--background-shift-y', `${(-pointerY * 3.6).toFixed(2)}px`);
    world.style.setProperty('--heading-shift-x', `${(pointerX * 2.4).toFixed(2)}px`);
    world.style.setProperty('--heading-shift-y', `${(pointerY * 1.6).toFixed(2)}px`);
    world.style.setProperty('--route-shift-x', `${(-pointerX * 4).toFixed(2)}px`);
    world.style.setProperty('--route-shift-y', `${(-pointerY * 3).toFixed(2)}px`);
    world.style.setProperty('--foreground-shift-x', `${(-pointerX * 9).toFixed(2)}px`);
    world.style.setProperty('--foreground-shift-y', `${(-pointerY * 5).toFixed(2)}px`);

    const cardDepths = [6.4, 5.8, 7.4, 6.8];
    cards.forEach((card, index) => {
      const depth = (cardDepths[index] ?? 5) * (revealed ? 1 : 0.24);
      card.style.setProperty('--card-shift-x', `${(-pointerX * depth).toFixed(2)}px`);
      card.style.setProperty('--card-shift-y', `${(-pointerY * depth * 0.62).toFixed(2)}px`);
    });

    const stillMoving = Math.abs(pointerTargetX - pointerX) > 0.002 || Math.abs(pointerTargetY - pointerY) > 0.002;
    if (stillMoving) {
      motionFrame = window.requestAnimationFrame(writePointerMotion);
    } else {
      motionFrame = 0;
      if (!pointerInside) world.classList.remove('is-pointer-responsive');
    }
  };

  const schedulePointerMotion = () => {
    if (!motionFrame) motionFrame = window.requestAnimationFrame(writePointerMotion);
  };

  const resetPointerMotion = () => {
    pointerInside = false;
    pointerTargetX = 0;
    pointerTargetY = 0;
    schedulePointerMotion();
  };

  const worldIsActive = () => {
    const bounds = world.getBoundingClientRect();
    return bounds.top < window.innerHeight * 0.25 && bounds.bottom > window.innerHeight * 0.75;
  };

  const syncState = () => {
    root.classList.add('explore-ready');
    root.classList.toggle('explore-revealed', revealed);
    world.dataset.exploreState = revealed ? 'revealed' : 'teaser';
    enter.setAttribute('aria-expanded', String(revealed));
    enter.disabled = revealed;
    deck.inert = !revealed;
    deck.setAttribute('aria-hidden', String(!revealed));
  };

  const setRevealed = (next, { focusFirst = false } = {}) => {
    if (next === revealed) return;
    revealed = next;
    wheelAmount = 0;
    lockedUntil = performance.now() + 2100;
    syncState();

    if (!next && deck.contains(document.activeElement)) {
      enter.focus({ preventScroll: true });
    }

    if (focusFirst && next) {
      window.setTimeout(() => cards[0]?.focus({ preventScroll: true }), 2180);
    }
  };

  const resetWheelSoon = () => {
    window.clearTimeout(wheelReset);
    wheelReset = window.setTimeout(() => {
      wheelAmount = 0;
    }, 180);
  };

  enter.addEventListener('click', (event) => {
    const openedFromKeyboard = event.detail === 0;
    setRevealed(true, { focusFirst: openedFromKeyboard });
    if (!openedFromKeyboard) enter.blur();
  });

  world.addEventListener('pointermove', (event) => {
    if (!motionAllowed()) return;
    const bounds = world.getBoundingClientRect();
    pointerInside = true;
    pointerTargetX = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    pointerTargetY = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
    world.classList.add('is-pointer-responsive');
    schedulePointerMotion();
  });

  world.addEventListener('pointerleave', resetPointerMotion);

  window.addEventListener(
    'wheel',
    (event) => {
      if (reducedMotion.matches || !worldIsActive() || performance.now() < lockedUntil) return;

      if (!revealed && event.deltaY > 0) {
        event.preventDefault();
        wheelAmount += event.deltaY;
        resetWheelSoon();
        if (wheelAmount > 12) setRevealed(true);
        return;
      }

      if (revealed && event.deltaY < 0 && window.scrollY < 80) {
        event.preventDefault();
        wheelAmount += Math.abs(event.deltaY);
        resetWheelSoon();
        if (wheelAmount > 18) setRevealed(false);
      }
    },
    { passive: false },
  );

  world.addEventListener(
    'touchstart',
    (event) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    },
    { passive: true },
  );

  world.addEventListener(
    'touchend',
    (event) => {
      if (touchStartY === null || reducedMotion.matches) return;
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const distance = touchStartY - touchEndY;
      touchStartY = null;
      if (!revealed && distance > 34) setRevealed(true);
      if (revealed && distance < -44) setRevealed(false);
    },
    { passive: true },
  );

  window.addEventListener('keydown', (event) => {
    if (revealed || reducedMotion.matches || !worldIsActive()) return;
    if (!['ArrowDown', 'PageDown', ' '].includes(event.key)) return;
    if (event.target instanceof HTMLElement && event.target.closest('a, button, input, textarea, select')) return;
    event.preventDefault();
    setRevealed(true);
  });

  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      revealed = true;
      resetPointerMotion();
    }
    syncState();
  });

  finePointer.addEventListener('change', () => {
    if (!motionAllowed()) resetPointerMotion();
  });

  window.addEventListener('resize', () => {
    if (!motionAllowed()) resetPointerMotion();
  });

  syncState();
}
