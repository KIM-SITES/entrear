export function initNavigation(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const navigation = header?.querySelector<HTMLElement>('[data-navigation]');
  if (!header || !toggle || !navigation) return;
  const mobile = matchMedia('(max-width: 63.99rem)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function stopMotion(): void { navigation?.getAnimations().forEach(animation => animation.cancel()); }
  function setOpen(open: boolean, returnFocus = false): void {
    if (!toggle || !navigation) return;
    stopMotion();
    toggle.setAttribute('aria-expanded', String(open));
    navigation.hidden = mobile.matches && !open;
    if (open && mobile.matches && !reducedMotion.matches) {
      const duration = parseFloat(getComputedStyle(navigation).getPropertyValue('--motion-duration-interface'));
      navigation.animate([{ opacity: .9, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], {
        duration, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      });
    }
    if (returnFocus) toggle.focus();
  }
  header.dataset.enhanced = 'true';
  toggle.hidden = false;
  setOpen(false);
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  navigation.addEventListener('click', event => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false, mobile.matches && navigation.contains(document.activeElement)));
  reducedMotion.addEventListener('change', stopMotion);
}
