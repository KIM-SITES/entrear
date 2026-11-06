/** Indica o trecho lido sem escrever na URL nem interferir com a rolagem nativa. */
export function initSectionNavigation(): void {
  if (!('IntersectionObserver' in window)) return;
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-navigation] a, .site-footer nav a')];
  const ids = [...new Set(['inicio', ...links.map(link => link.hash.slice(1))])];
  const sections = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  let observer: IntersectionObserver | undefined;
  let frame = 0;

  function observe(): void {
    observer?.disconnect();
    const offset = header && getComputedStyle(header).position === 'sticky' ? header.offsetHeight + 20 : 20;
    const bottom = Math.max(0, window.innerHeight - offset - 1);
    const visible = new Set<string>();
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      const current = sections.findLast(section => visible.has(section.id))?.id;
      links.forEach(link => {
        if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: `-${offset}px 0px -${bottom}px 0px`, threshold: 0 });
    sections.forEach(section => observer!.observe(section));
  }

  observe();
  function scheduleObservation(): void {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(observe);
  }
  window.addEventListener('resize', scheduleObservation, { passive: true });
  // Zoom, preferência de fonte e menu podem mudar a altura sem mudar a viewport.
  if (header && 'ResizeObserver' in window) new ResizeObserver(scheduleObservation).observe(header);
}
