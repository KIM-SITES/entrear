import type { ImageMetadata } from 'astro';

export type ServiceId = 'instalacao' | 'manutencao';
export type EnvironmentId = 'residencia' | 'pequeno-negocio';
export type CoverageId = 'cotia' | 'itapevi' | 'barueri' | 'jandira';
export type MediaId = 'residencia-referencia' | 'escritorio-referencia';
export type SectionId = 'inicio' | 'servicos' | 'aplicacoes' | 'entrear' | 'atendimento' | 'regiao' | 'duvidas' | 'orcamento';

export interface ServiceContent {
  id: ServiceId;
  name: string;
  summary: string;
  considerations: readonly string[];
  inquiryPrompt: string;
}

export interface CoverageArea {
  id: CoverageId;
  name: string;
  state: 'SP';
  illustrative: true;
}

export interface LicensedImage {
  id: MediaId;
  image: ImageMetadata;
  alt: string;
  author: string;
  sourceUrl: string;
  licenseName: 'Unsplash License';
  licenseUrl: string;
  originalReference: string;
  disclaimer: string;
}

export interface ApplicationContent {
  id: string;
  title: string;
  environment: EnvironmentId;
  need: string;
  proposedApproach: string;
  imageId: MediaId | null;
  illustrative: true;
}

export interface FAQContent {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

/** Contrato de dados; a interação do orçamento pertence à Etapa 2. */
export interface QuoteDraft {
  service: ServiceId;
  environment: EnvironmentId | null;
  municipality: CoverageId | 'outra-localidade' | null;
  notes: string;
}

export interface NavigationItem {
  label: string;
  section: SectionId;
}
