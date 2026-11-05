import { services } from '@/data/content';
import { isServiceId, serviceFromSearch, type ServiceState } from '@/lib/service';

export function initServiceSelection(state: ServiceState): void {
  const stage = document.querySelector<HTMLElement>('[data-service-stage]');
  const choices = document.querySelectorAll<HTMLInputElement>('[data-service-choice]');
  state.subscribe(value => {
    if (stage) stage.dataset.service = value;
    choices.forEach(input => { input.checked = input.value === value; });
    const content = services.find(service => service.id === value);
    const summary = document.querySelector<HTMLElement>('[data-service-summary]');
    if (summary && content) summary.textContent = content.inquiryPrompt;
    const url = new URL(location.href);
    if (url.searchParams.get('servico') !== value && (url.searchParams.has('servico') || value !== 'instalacao')) {
      url.searchParams.set('servico', value);
      history.replaceState(null, '', url);
    }
  });
  choices.forEach(input => input.addEventListener('change', () => {
    if (isServiceId(input.value)) {
      state.set(input.value);
      const url = new URL(location.href);
      url.searchParams.set('servico', input.value);
      history.replaceState(null, '', url);
    }
  }));
  document.querySelectorAll<HTMLAnchorElement>('[data-service-link]').forEach(link => {
    link.addEventListener('click', event => {
      const value = link.dataset.serviceLink;
      if (!isServiceId(value) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      state.set(value);
      const url = new URL(location.href);
      url.searchParams.set('servico', value);
      url.hash = 'orcamento';
      history.pushState(null, '', url);
      const destination = document.getElementById('orcamento');
      destination?.focus({ preventScroll: true });
      destination?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });
  });
  window.addEventListener('popstate', () => state.set(serviceFromSearch(location.search)));
  const fields = document.querySelector<HTMLFieldSetElement>('[data-service-fields]');
  if (fields) fields.disabled = false;
  requestAnimationFrame(() => requestAnimationFrame(() => { if (stage) stage.dataset.ready = 'true'; }));
}
