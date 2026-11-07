import type { FAQContent, NavigationItem, ProcessStep } from '@/types/content';

/** Navegação publicada. Os rascunhos da fundação permanecem como referência histórica. */
export const editorialNavigation = [
  { label: 'Instalação', href: '#instalacao' },
  { label: 'Manutenção', href: '#manutencao' },
  { label: 'Aplicações', href: '#aplicacoes' },
  { label: 'A Entrear', href: '#entrear' },
  { label: 'Dúvidas', href: '#duvidas' },
] as const;

export const complementaryNavigation = [
  { label: 'Atendimento', section: 'atendimento' },
  { label: 'Região ilustrativa', section: 'regiao' },
  { label: 'Orçamento demonstrativo', section: 'orcamento' },
] as const satisfies readonly NavigationItem[];

export const applicationStories = [
  {
    id: 'apartamento', title: 'Apartamento', image: 'apartment',
    heading: 'Conforto que conversa com a casa.',
    description: 'Posição do aparelho, marcenaria e circulação entram no planejamento a partir do uso do ambiente.',
    consideration: 'Observar o espaço e as regras do condomínio antes de definir a instalação.',
  },
  {
    id: 'escritorio', title: 'Escritório', image: 'office',
    heading: 'O espaço de trabalho também conta.',
    description: 'Disposição das mesas, ocupação e tempo de uso ajudam a orientar a avaliação do ambiente.',
  },
  {
    id: 'comercio', title: 'Pequeno estabelecimento comercial', image: 'shop',
    heading: 'Pensar junto com a rotina.',
    description: 'Na pequena cafeteria ilustrada, horários de funcionamento, circulação e acesso ao aparelho são pontos para a conversa.',
  },
] as const;

export const companyEditorial = {
  heading: 'Planejar o ar. Respeitar o espaço.',
  introduction: 'A Entrear é uma marca fictícia que propõe um olhar atento para a climatização de residências e pequenos negócios.',
  description: 'A proposta é compreender o ambiente, organizar as decisões e explicar o serviço. Planejamento e cuidado com a instalação fazem parte do mesmo processo.',
  principles: [
    { title: 'Planejamento', description: 'Entender a necessidade antes de definir uma solução.' },
    { title: 'Atenção ao ambiente', description: 'Considerar o uso, os elementos existentes e o acabamento.' },
    { title: 'Comunicação clara', description: 'Explicar o escopo e esclarecer dúvidas a cada decisão.' },
  ],
} as const;

export const editorialProcess = [
  { id: 'contato', title: 'Você conta o que precisa.', description: 'Serviço, município e tipo de ambiente iniciam a conversa. Aqui, você prepara essa mensagem com exemplos fictícios.' },
  { id: 'entendimento', title: 'O espaço entra na conversa.', description: 'Aparelho, uso do local e condições de acesso orientariam a avaliação. Uma visita técnica poderia ser necessária.' },
  { id: 'proposta', title: 'O escopo fica claro.', description: 'A proposta detalharia serviço, materiais, valores e condições, para esclarecer as dúvidas antes da aprovação.' },
  { id: 'execucao', title: 'A execução é combinada.', description: 'Após a aprovação, seriam combinados agendamento, acesso e execução, com orientações de uso e cuidado ao final.' },
] as const satisfies readonly ProcessStep[];

export const editorialFAQs = [
  { id: 'instalacao', question: 'O que considerar antes de instalar um ar-condicionado?', answer: 'Reúna informações sobre o ambiente, o modelo do aparelho e as regras do condomínio ou imóvel. Posição das unidades, infraestrutura e percurso da instalação exigem avaliação profissional; uma foto sozinha não define a solução.' },
  { id: 'manutencao', question: 'Como saber qual manutenção o aparelho precisa?', answer: 'Descreva ruídos, vazamentos, menor resfriamento ou a necessidade de cuidado periódico. Essas informações iniciam a avaliação, sem substituir uma inspeção. Para os cuidados e a periodicidade do seu modelo, consulte as orientações do fabricante.' },
  { id: 'orcamento', question: 'Quais informações ajudam no orçamento?', answer: 'Serviço, tipo de ambiente, município e uma descrição da necessidade. Modelo do aparelho e condições de acesso também ajudariam numa avaliação real. Aqui, use exemplos fictícios, sem nome, telefone ou endereço.' },
  { id: 'valores', question: 'O site informa preços ou agenda uma visita?', answer: 'Não. O formulário prepara uma mensagem de exemplo, sem preços, dimensionamento, prazos ou reservas. Uma contratação real dependeria de avaliação e de condições acordadas com uma prestadora.' },
  { id: 'regiao', question: 'A Entrear atende nos municípios apresentados?', answer: 'Cotia, Itapevi, Barueri e Jandira compõem o cenário ilustrativo deste projeto. A Entrear é fictícia e não possui uma operação comercial ou unidades físicas representadas aqui.' },
  { id: 'fotografias', question: 'As fotografias mostram serviços da Entrear?', answer: 'Não. São fotografias de referência, usadas sob as licenças indicadas nos créditos. Os ambientes, profissionais e trabalhos retratados não têm vínculo com a marca fictícia.' },
  { id: 'envio', question: 'O que acontece com a mensagem que eu gerar?', answer: 'Ela aparece na própria página para você revisar e, se quiser, copiar. Não há envio, WhatsApp, cadastro ou armazenamento no site. O rascunho é descartado ao sair ou recarregar; apenas a escolha pública do serviço pode permanecer na URL. Se você copiar, o texto passa para a área de transferência do seu dispositivo.' },
] as const satisfies readonly FAQContent[];
