import type { CoverageArea, NavigationItem } from '@/types/content';

export const site = {
  name: 'Entrear Climatização',
  shortName: 'Entrear',
  tagline: 'Conforto tem medida.',
  description: 'Instalação e manutenção de ar-condicionado para residências e pequenos negócios.',
  locale: 'pt-BR',
  demonstration: {
    active: true,
    label: 'Projeto demonstrativo · empresa fictícia',
    explanation: 'A Entrear é uma empresa fictícia criada para demonstrar uma experiência digital de climatização. As fotografias são referências e não representam serviços executados pela marca.',
  },
  contact: { mode: 'demonstration', whatsappNumber: null },
} as const;

export const coverageAreas = [
  { id: 'cotia', name: 'Cotia', state: 'SP', illustrative: true },
  { id: 'itapevi', name: 'Itapevi', state: 'SP', illustrative: true },
  { id: 'barueri', name: 'Barueri', state: 'SP', illustrative: true },
  { id: 'jandira', name: 'Jandira', state: 'SP', illustrative: true },
] as const satisfies readonly CoverageArea[];

/** Arquitetura futura; não renderizar links para seções ainda inexistentes. */
export const plannedNavigation = [
  { label: 'Serviços', section: 'servicos' },
  { label: 'Aplicações', section: 'aplicacoes' },
  { label: 'A Entrear', section: 'entrear' },
  { label: 'Atendimento', section: 'atendimento' },
] as const satisfies readonly NavigationItem[];
