export function initNavigation(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const toggle = header?.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const navigation = header?.querySelector<HTMLElement>('[data-navigation]');
  if (!header || !toggle || !navigation) return;
  const mobile = matchMedia('(max-width: 47.99rem)');
  function setOpen(open: boolean, returnFocus = false): void {
    if (!toggle || !navigation) return;
    toggle.setAttribute('aria-expanded', String(open));
    navigation.hidden = mobile.matches && !open;
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
  mobile.addEventListener('change', () => setOpen(false));
}
