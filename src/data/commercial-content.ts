import type { ServiceId } from '@/types/content';

interface ServiceEditorial {
  label: string;
  heading: readonly [string, string];
  lead: string;
  details: readonly { title: string; description: string }[];
  action: string;
}

export const serviceEditorial = {
  instalacao: {
    label: 'Instalação de ar-condicionado',
    heading: ['O aparelho faz parte', 'do seu espaço.'],
    lead: 'Antes de instalar, é preciso olhar para o ambiente: posição do aparelho, passagem da tubulação e acabamento.',
    details: [
      { title: 'O ambiente', description: 'Informe onde o aparelho será instalado e como o espaço é utilizado.' },
      { title: 'O aparelho', description: 'Se já tiver um equipamento, inclua o modelo e a capacidade no pedido.' },
      { title: 'O acabamento', description: 'As características do local ajudam a definir o escopo da instalação.' },
    ],
    action: 'Preparar orçamento de instalação',
  },
  manutencao: {
    label: 'Manutenção de ar-condicionado',
    heading: ['O cuidado continua', 'depois da instalação.'],
    lead: 'Observe o funcionamento do aparelho. Seu pedido pode partir de um cuidado preventivo ou de uma falha percebida.',
    details: [
      { title: 'Cuidado preventivo', description: 'Informe o tipo de aparelho, o uso do ambiente e quando ocorreu a última manutenção, se souber.' },
      { title: 'Algo mudou?', description: 'Descreva o que percebeu: ruído, gotejamento ou dificuldade para resfriar. A avaliação técnica define o serviço necessário.' },
    ],
    action: 'Preparar orçamento de manutenção',
  },
} as const satisfies Record<ServiceId, ServiceEditorial>;
