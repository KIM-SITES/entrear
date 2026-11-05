import type { QuoteDraft } from '../types/content';
import { isServiceId } from './service.ts';

const municipalities = { cotia: 'Cotia', itapevi: 'Itapevi', barueri: 'Barueri', jandira: 'Jandira', 'outra-localidade': 'Outro município' } as const;
const environments = { residencia: 'Residência', 'pequeno-negocio': 'Pequeno negócio' } as const;
const serviceNames = { instalacao: 'instalação', manutencao: 'manutenção' } as const;
export type QuoteField = 'servico' | 'ambiente' | 'municipio' | 'observacoes';
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export function validateQuote(draft: QuoteDraft): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!isServiceId(draft.service)) errors.servico = 'Selecione instalação ou manutenção.';
  if (!draft.environment || !Object.hasOwn(environments, draft.environment)) errors.ambiente = 'Selecione residência ou pequeno negócio.';
  if (!draft.municipality || !Object.hasOwn(municipalities, draft.municipality)) errors.municipio = 'Selecione o município do ambiente.';
  if (draft.notes.length > 600) errors.observacoes = 'Use até 600 caracteres nas observações.';
  return errors;
}

export function buildQuoteMessage(draft: QuoteDraft): string | null {
  if (Object.keys(validateQuote(draft)).length || !draft.environment || !draft.municipality) return null;
  const lines = [
    `Olá! Gostaria de um orçamento de ${serviceNames[draft.service]} de ar-condicionado.`,
    '',
    `Ambiente: ${environments[draft.environment]}.`,
    `Município: ${municipalities[draft.municipality]}.`,
  ];
  if (draft.notes.trim()) lines.push(`Observações: ${draft.notes.trim()}`);
  lines.push('', '(Mensagem de demonstração da Entrear Climatização — empresa fictícia.)');
  return lines.join('\n');
}
