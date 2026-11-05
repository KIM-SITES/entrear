import type { ApplicationContent, FAQContent, ProcessStep, ServiceContent } from '@/types/content';

/** Conteúdo inicial para composição e revisão nas próximas etapas. */
export const services = [
  {
    id: 'instalacao',
    name: 'Instalação de ar-condicionado',
    summary: 'O planejamento da instalação considera o aparelho, o ambiente e o acabamento.',
    considerations: ['Características do espaço', 'Posicionamento do aparelho', 'Percurso e acabamento da instalação'],
    inquiryPrompt: 'Conte sobre o ambiente e o aparelho que deseja instalar.',
  },
  {
    id: 'manutencao',
    name: 'Manutenção de ar-condicionado',
    summary: 'Cuidado preventivo e avaliação de falhas de acordo com o aparelho e sua utilização.',
    considerations: ['Condições de uso do aparelho', 'Necessidade de cuidado preventivo', 'Descrição de falhas percebidas'],
    inquiryPrompt: 'Conte como o aparelho está funcionando e qual cuidado você procura.',
  },
] as const satisfies readonly ServiceContent[];

export const applications = [
  {
    id: 'apartamento', title: 'Integração ao ambiente residencial', environment: 'residencia',
    need: 'Conciliar climatização e organização do espaço.',
    proposedApproach: 'Considerar a posição do aparelho e o acabamento junto aos elementos do ambiente.',
    imageId: 'residencia-referencia', illustrative: true,
  },
  {
    id: 'escritorio', title: 'Climatização no espaço de trabalho', environment: 'pequeno-negocio',
    need: 'Planejar a climatização junto ao mobiliário e ao uso do ambiente.',
    proposedApproach: 'Observar a disposição do espaço e o posicionamento da instalação.',
    imageId: 'escritorio-referencia', illustrative: true,
  },
  {
    id: 'comercio', title: 'Cuidado com a rotina de um pequeno comércio', environment: 'pequeno-negocio',
    need: 'Considerar a climatização na rotina de atendimento.',
    proposedApproach: 'Relacionar as necessidades do ambiente ao escopo proposto para o serviço.',
    imageId: null, illustrative: true,
  },
] as const satisfies readonly ApplicationContent[];

export const company = {
  heading: 'Climatização que considera o espaço inteiro.',
  description: 'A proposta da Entrear combina planejamento, cuidado com o ambiente e explicações claras sobre o atendimento.',
  principles: ['Planejar antes de instalar', 'Cuidar do ambiente', 'Explicar cada etapa'],
} as const;

export const processSteps = [
  { id: 'contato', title: 'Primeiro contato', description: 'Apresentar o serviço desejado e o tipo de ambiente.' },
  { id: 'entendimento', title: 'Entendimento do espaço', description: 'Reunir as informações necessárias para avaliar a solicitação.' },
  { id: 'proposta', title: 'Definição da proposta', description: 'Esclarecer o escopo antes de combinar a execução.' },
  { id: 'agendamento', title: 'Agendamento e execução', description: 'Combinar o atendimento conforme a proposta definida.' },
] as const satisfies readonly ProcessStep[];

export const faqs = [
  { id: 'servicos', question: 'Quais serviços fazem parte desta demonstração?', answer: 'Instalação e manutenção de ar-condicionado para residências e pequenos negócios. O conteúdo representa uma proposta de atendimento, não uma oferta de uma empresa real.' },
  { id: 'equipamento', question: 'O site vende aparelhos?', answer: 'Não. Este projeto demonstra a apresentação de uma prestadora de serviços, sem catálogo ou compra de equipamentos.' },
  { id: 'informacoes', question: 'O que informar para preparar um orçamento?', answer: 'O serviço desejado, o tipo de ambiente, o município e uma breve descrição da necessidade. Nesta demonstração, utilize informações fictícias.' },
  { id: 'regiao', question: 'Qual é a região ilustrativa de atendimento?', answer: 'Cotia, Itapevi, Barueri e Jandira. Os municípios compõem um cenário demonstrativo e não indicam a existência de uma operação comercial.' },
  { id: 'valor', question: 'O site calcula o valor do serviço?', answer: 'Não. A experiência prepara uma mensagem de solicitação, sem estimar preços, potência de aparelhos ou prazos.' },
  { id: 'demonstracao', question: 'O pedido será enviado a alguém?', answer: 'Não. O projeto é fictício e a experiência prevista termina em uma prévia copiável, sem envio de mensagens.' },
] as const satisfies readonly FAQContent[];
