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
    description: 'Posição do aparelho, marcenaria e circulação fazem parte da mesma conversa. Neste cenário, o ponto de partida é entender como o ambiente é usado.',
    consideration: 'Observar o espaço e as regras do condomínio antes de definir a instalação.',
  },
  {
    id: 'escritorio', title: 'Escritório', image: 'office',
    heading: 'O espaço de trabalho também conta.',
    description: 'Mesas, permanência das pessoas e disposição da sala ajudam a orientar a avaliação. A fotografia ilustra um contexto de uso, sem indicar dimensionamento ou solução técnica.',
  },
  {
    id: 'comercio', title: 'Pequeno estabelecimento comercial', image: 'shop',
    heading: 'Pensar junto com a rotina.',
    description: 'Uma pequena cafeteria representa o cenário de comércio. Horários de uso, circulação e acesso ao aparelho são informações úteis para conversar sobre instalação ou manutenção.',
  },
] as const;

export const companyEditorial = {
  heading: 'Planejar o ar. Respeitar o espaço.',
  introduction: 'A Entrear é uma marca fictícia que propõe um olhar atento para a climatização de residências e pequenos negócios.',
  description: 'Seu posicionamento parte de uma ideia simples: compreender o ambiente, organizar as decisões e explicar o serviço com clareza. O cuidado com a instalação deve fazer parte do cuidado com o espaço inteiro.',
  principles: [
    { title: 'Planejamento', description: 'Entender a necessidade antes de definir uma solução.' },
    { title: 'Atenção ao ambiente', description: 'Considerar o uso, os elementos existentes e o acabamento.' },
    { title: 'Comunicação clara', description: 'Explicar o escopo e esclarecer dúvidas a cada decisão.' },
  ],
} as const;

export const editorialProcess = [
  { id: 'contato', title: 'Você conta o que precisa.', description: 'O contato inicial reúne o serviço desejado, o município e o tipo de ambiente. Na demonstração, você pode preparar essa mensagem com dados fictícios.' },
  { id: 'entendimento', title: 'O espaço entra na conversa.', description: 'Em um atendimento real, informações sobre o aparelho, o uso do local e as condições de instalação ajudariam na avaliação. Uma visita técnica poderia ser necessária.' },
  { id: 'proposta', title: 'O escopo fica claro.', description: 'A proposta detalharia o que seria feito, materiais, valores e condições. As dúvidas precisariam ser esclarecidas antes de qualquer aprovação.' },
  { id: 'execucao', title: 'A execução é combinada.', description: 'Com a proposta aprovada, seriam definidos o agendamento, os acessos ao local e a execução do serviço. Ao final, caberiam orientações sobre o uso e os cuidados com o aparelho.' },
] as const satisfies readonly ProcessStep[];

export const editorialFAQs = [
  { id: 'instalacao', question: 'O que considerar antes de instalar um ar-condicionado?', answer: 'Reúna informações sobre o ambiente e o modelo do aparelho, se já houver um. Verifique também as regras do condomínio ou do imóvel. A posição das unidades, a infraestrutura e o percurso da instalação precisam ser avaliados por um profissional; uma foto, sozinha, não define a solução.' },
  { id: 'manutencao', question: 'Como saber qual manutenção o aparelho precisa?', answer: 'Conte o que você percebe: ruído diferente, vazamento, menor resfriamento ou necessidade de cuidado periódico. Essas informações ajudam a iniciar a avaliação, mas não substituem uma inspeção. Consulte as orientações do fabricante para os cuidados e a periodicidade do seu modelo.' },
  { id: 'orcamento', question: 'Quais informações ajudam no orçamento?', answer: 'Serviço desejado, tipo de ambiente, município e uma breve descrição da necessidade. Em um atendimento real, modelo do aparelho e condições de acesso também poderiam ser solicitados. Aqui, use apenas exemplos fictícios, sem nome, telefone ou endereço.' },
  { id: 'valores', question: 'O site informa preços ou agenda uma visita?', answer: 'Não. A demonstração não calcula valores, dimensiona aparelhos, oferece prazos ou reserva horários. O formulário prepara uma mensagem de exemplo. Uma contratação real dependeria de avaliação e de condições acordadas com uma prestadora de serviços.' },
  { id: 'regiao', question: 'A Entrear atende nos municípios apresentados?', answer: 'Cotia, Itapevi, Barueri e Jandira compõem o cenário ilustrativo deste projeto. A Entrear é fictícia e não possui uma operação comercial ou unidades físicas representadas aqui.' },
  { id: 'fotografias', question: 'As fotografias mostram serviços da Entrear?', answer: 'Não. São fotografias de referência, usadas sob as licenças indicadas nos créditos. Os ambientes, profissionais e trabalhos retratados não têm vínculo com a marca fictícia.' },
  { id: 'envio', question: 'O que acontece com a mensagem que eu gerar?', answer: 'Ela aparece na própria página para você revisar e, se quiser, copiar. Não há envio, WhatsApp, cadastro ou armazenamento no site. O rascunho é descartado ao sair ou recarregar; apenas a escolha pública do serviço pode permanecer na URL. Se você copiar, o texto passa para a área de transferência do seu dispositivo.' },
] as const satisfies readonly FAQContent[];
