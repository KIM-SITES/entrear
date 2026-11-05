import type { CoverageId, EnvironmentId, QuoteDraft } from '@/types/content';
import type { ServiceState } from '@/lib/service';
import { isServiceId } from '@/lib/service';
import { buildQuoteMessage, validateQuote, type QuoteField } from '@/lib/quote';

export function initQuoteForm(state: ServiceState): void {
  const form = document.querySelector<HTMLFormElement>('[data-quote-form]');
  if (!form) return;
  const fields = form.querySelector<HTMLFieldSetElement>('[data-quote-fields]');
  const service = form.querySelector<HTMLSelectElement>('[name="servico"]');
  const environment = form.querySelector<HTMLSelectElement>('[name="ambiente"]');
  const municipality = form.querySelector<HTMLSelectElement>('[name="municipio"]');
  const notes = form.querySelector<HTMLTextAreaElement>('[name="observacoes"]');
  const preview = form.querySelector<HTMLElement>('[data-message-preview]');
  const output = form.querySelector<HTMLTextAreaElement>('[data-message-output]');
  const copy = form.querySelector<HTMLButtonElement>('[data-copy-message]');
  const status = form.querySelector<HTMLElement>('[data-quote-status]');
  const title = form.querySelector<HTMLElement>('[data-message-title]');
  const counter = form.querySelector<HTMLElement>('[data-notes-count]');
  if (!fields || !service || !environment || !municipality || !notes || !preview || !output || !copy || !status || !title) return;
  const controls = { servico: service, ambiente: environment, municipio: municipality, observacoes: notes };
  const names = Object.keys(controls) as QuoteField[];
  const formatter = new Intl.NumberFormat('pt-BR');
  let generated = false;
  function draft(): QuoteDraft {
    return {
      service: service!.value as QuoteDraft['service'],
      environment: (environment!.value || null) as EnvironmentId | null,
      municipality: (municipality!.value || null) as CoverageId | 'outra-localidade' | null,
      notes: notes!.value,
    };
  }
  function clearError(name: QuoteField): void {
    controls[name].removeAttribute('aria-invalid');
    const error = form!.querySelector<HTMLElement>(`[data-error="${name}"]`);
    if (error) { error.hidden = true; error.textContent = ''; }
  }
  function invalidatePreview(): void {
    if (!preview || !output || !status) return;
    if (generated) status.textContent = 'Os dados mudaram. Gere a mensagem novamente antes de copiar.';
    generated = false; preview.hidden = true; output.value = '';
  }
  function resetPrivateDraft(): void {
    form!.reset();
    service!.value = state.get();
    generated = false; preview!.hidden = true; output!.value = ''; status!.textContent = '';
    names.forEach(clearError);
    if (counter) counter.textContent = '0';
  }
  // O cancelamento de submit é instalado antes de habilitar os campos.
  form.addEventListener('submit', event => {
    event.preventDefault();
    names.forEach(clearError);
    const data = draft();
    const errors = validateQuote(data);
    const first = names.find(name => errors[name]);
    if (first) {
      invalidatePreview();
      names.forEach(name => {
        if (!errors[name]) return;
        controls[name].setAttribute('aria-invalid', 'true');
        const error = form.querySelector<HTMLElement>(`[data-error="${name}"]`);
        if (error) { error.textContent = errors[name] ?? ''; error.hidden = false; }
      });
      status.textContent = 'Revise os campos indicados para preparar a mensagem.';
      controls[first].focus();
      return;
    }
    const message = buildQuoteMessage(data);
    if (!message) return;
    output.value = message; preview.hidden = false; generated = true;
    status.textContent = 'Mensagem preparada. Nenhuma mensagem foi enviada.';
    title.focus();
  });
  service.addEventListener('change', () => {
    clearError('servico');
    if (isServiceId(service.value)) state.set(service.value);
    else invalidatePreview();
  });
  environment.addEventListener('change', () => { clearError('ambiente'); invalidatePreview(); });
  municipality.addEventListener('change', () => { clearError('municipio'); invalidatePreview(); });
  notes.addEventListener('input', () => {
    clearError('observacoes'); invalidatePreview();
    if (counter) counter.textContent = formatter.format(notes.value.length);
  });
  state.subscribe(value => {
    service.value = value;
    clearError('servico');
    if (generated) {
      const message = buildQuoteMessage(draft());
      if (message) { output.value = message; status.textContent = 'Serviço atualizado na mensagem de demonstração.'; }
      else invalidatePreview();
    }
  });
  copy.addEventListener('click', async () => {
    if (!generated || !output.value) return;
    const message = output.value;
    copy.disabled = true;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard indisponível');
      await navigator.clipboard.writeText(message);
      status.textContent = output.value === message
        ? 'Mensagem copiada. Esta simulação não envia mensagens.'
        : 'Os dados mudaram durante a cópia. Copie a mensagem atualizada.';
    } catch {
      output.focus(); output.select();
      status.textContent = 'A cópia automática não está disponível. O texto foi selecionado para você copiar manualmente.';
    } finally { copy.disabled = false; }
  });
  window.addEventListener('pagehide', resetPrivateDraft);
  window.addEventListener('pageshow', resetPrivateDraft);
  resetPrivateDraft();
  fields.disabled = false;
  const fallback = document.querySelector<HTMLElement>('[data-quote-fallback]');
  if (fallback) fallback.hidden = true;
  form.dataset.ready = 'true';
}
