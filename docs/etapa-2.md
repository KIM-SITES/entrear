# Etapa 2 — núcleo comercial

## Escopo entregue

Cabeçalho e navegação responsivos, hero definitivo do conceito C, instalação, manutenção e preparação de mensagem de orçamento. A rota `/` apresenta esse núcleo; `/sistema-visual/` conserva a prancha aprovada da Etapa 1.

Aplicações, apresentação institucional, etapas do atendimento, diagrama regional e perguntas frequentes não foram desenvolvidos. Os municípios aparecem apenas como contexto e opções do orçamento. Não há links para seções futuras.

Nenhum commit, push ou deploy foi executado. A Etapa 3 depende de autorização.

## Direção artística e refinamentos

- **Hero:** fotografia horizontal contínua, recortada por planos sólidos na cor do fundo. A abertura principal protege a posição do split; duas aberturas menores retomam as alturas de 2/3 e 1/3 do símbolo. A imagem não é repetida em três cards. A espessura dos intervalos mantém a continuidade espacial perceptível.
- **Fotografia:** a primeira renderização desktop cortava excessivamente a parte inferior do ambiente. A altura foi ampliada de 31vw para 38vw, limitada a 560px. A posição superior protege o aparelho; a área adicional mostra bancada e mobiliário. No celular, o enquadramento parte da esquerda e os intervalos passam para 64% e 88%, preservando aparelho, sala e mesa.
- **Tipografia:** Archivo com largura de 85% e Instrument Sans, sem alterar os tokens aprovados. O título ocupa uma linha ampla no desktop e duas linhas deliberadas no celular. Os rótulos comerciais permanecem explícitos.
- **Ação principal:** cobre sobre superfície clara, antes da fotografia. No celular, ocupa toda a largura útil. A ação de orçamento também aparece no cabeçalho e em cada serviço.
- **Instalação:** superfície clara, informação à esquerda e fotografia de escritório à direita, levemente deslocada na vertical. Os detalhes ajudam a preparar o pedido sem prometer resultados ou condições comerciais.
- **Manutenção:** faixa azul-ardósia, detalhe técnico à esquerda e texto à direita; no celular, texto e ação vêm antes da fotografia. A inversão, o contraste e as proporções evitam uma sequência de cards equivalentes.
- **Refinamento editorial:** foram removidos os números dos serviços. Instalação e manutenção são alternativas, não etapas consecutivas.
- **Orçamento:** organização prática, rótulos visíveis e campos nativos. A identidade aparece nas proporções, no contraste e na ação, sem máscaras sobre conteúdo funcional.

A principal assinatura continua concentrada nos vãos do hero. A fotografia de banco tem caráter ilustrativo; a identidade não depende de apresentá-la como trabalho próprio. A troca de serviço abre os planos do enquadramento e atualiza a orientação textual. Não há carrossel, parallax, cursor especial ou revelação repetida ao rolar.

## Movimento e navegação

- Troca de serviço: `transform` nos planos, 420ms, com os tokens de movimento existentes. A abertura responde diretamente ao estado escolhido, sem loop; uma nova escolha pode interromper a transição.
- Menu mobile: expansão no fluxo da página, sem sobreposição modal. `aria-expanded`, `aria-controls`, Escape com retorno de foco, fechamento após escolher destino e adaptação ao redimensionamento.
- Desktop: cabeçalho fixado durante a rolagem; âncoras possuem afastamento para evitar sobreposição. No mobile, cabeçalho em fluxo normal.
- Links de serviço mantêm href real, respeitam Ctrl/Cmd/clique intermediário e preparam o serviço no destino. A navegação ao orçamento cria uma entrada de histórico; seleção simples usa substituição do estado na URL.
- `prefers-reduced-motion`: planos e ícone do menu sem duração de transição; rolagem sem suavização. Mudanças de estado continuam legíveis.

## Orçamento demonstrativo

Campos: serviço, residência/pequeno negócio, município e observações opcionais de até 600 caracteres. Não se pede nome, telefone ou endereço. Serviço e opções são validados por listas permitidas.

O estado de serviço é único e sincroniza rádio do hero, fotografia, orientação, campo do formulário e `?servico=`. URLs inválidas usam instalação como padrão. Somente o serviço público é escrito pela aplicação na URL.

Ao gerar, a validação indica os campos e foca o primeiro erro. A mensagem é texto simples, em textarea somente leitura; nunca é inserida como HTML. A prévia recebe foco para que o resultado seja encontrado na tela. Alterar ambiente, município ou observações invalida a prévia; alterar serviço atualiza a mensagem já preparada.

A ação de copiar usa `navigator.clipboard.writeText` após clique. O sucesso só é anunciado após a promessa resolver. Se a API estiver indisponível ou a permissão for negada, o texto é selecionado e há instrução de cópia manual. Os testes substituem essa API para simular os dois resultados, sem escrever na área de transferência do sistema.

Não há endpoint, envio, telefone de WhatsApp, cookie, analytics, `localStorage` ou `sessionStorage`. Dados ficam temporariamente nos campos e na memória; `pagehide`/`pageshow` limpam o rascunho para não restaurá-lo pelo histórico. A escolha pública de serviço pode permanecer na URL. A cópia para a área de transferência é uma ação explícita do visitante.

Sem JavaScript, conteúdo e links continuam acessíveis. Seletor e formulário ficam desabilitados; o orçamento explica a necessidade de JavaScript. Os listeners de submissão são instalados antes da habilitação dos campos, evitando submissão nativa de dados.

## Arquitetura e arquivos

Nenhuma dependência foi instalada. Astro 7.4.7, TypeScript 6.0.3 e @astrojs/check 0.9.12 continuam nas versões aprovadas; `package-lock.json` não mudou. CSS e scripts são próprios, sem framework de cliente ou biblioteca de animação.

### Criados — aplicação

| Arquivo | Responsabilidade |
| --- | --- |
| `src/components/layout/SiteHeader.astro` | Marca, navegação e acesso ao orçamento |
| `src/components/layout/SiteFooter.astro` | Aviso demonstrativo e retorno ao início |
| `src/components/commercial/Hero.astro` | Composição, imagem prioritária e planos dos vãos |
| `src/components/commercial/ServiceSelector.astro` | Escolha semântica de serviço |
| `src/components/commercial/Services.astro` | Duas composições editoriais |
| `src/components/commercial/QuoteSection.astro` | Campos, erros e prévia da mensagem |
| `src/components/media/PhotoCredit.astro` | Crédito com link da fonte |
| `src/data/commercial-content.ts` | Conteúdo editorial tipado dos serviços |
| `src/data/commercial-media.ts` | Fotos novas, alt, fonte, licença e aviso |
| `src/lib/service.ts` | Serviço permitido, URL e estado compartilhado |
| `src/lib/quote.ts` | Validação e montagem de texto puro |
| `src/scripts/navigation.ts` | Comportamento do menu |
| `src/scripts/service-selection.ts` | Sincronização de controles, URL e imagem |
| `src/scripts/quote-form.ts` | Validação visual, prévia, cópia e descarte |
| `src/pages/sistema-visual/index.astro` | Página original da fundação em rota própria |
| `src/assets/images/ambiente-horizontal.jpg` | Referência horizontal do hero |
| `src/assets/images/manutencao-referencia.jpg` | Detalhe técnico para manutenção |

### Criados — verificação e documentação

- `scripts/quote.test.mjs`: testes de regras e estado, com `node:test`.
- `scripts/lib/browser.mjs`: servidor estático e automação CDP com módulos nativos do Node.
- `scripts/verify-commercial.mjs`: cenários comerciais, responsividade, interações, rede e capturas.
- `docs/referencias/etapa-1.sha256.json`: hashes anteriores à implementação para 55 arquivos protegidos.
- `docs/etapa-2.md`: esta entrega.
- `docs/validacao/etapa-2/`: seis capturas comerciais, relatórios Chrome/Edge e regressão da fundação em subpasta.

### Modificados

- `src/pages/index.astro`: compõe o núcleo comercial e inicializa os três módulos de comportamento; o layout base continua intacto.
- `package.json`: somente os comandos `test:quote` e `verify:commercial`.
- `scripts/verify-foundation.mjs`: nova rota `/sistema-visual/` e saída de evidências separada para preservar a validação original.
- `README.md`: execução, estrutura, comandos e estado atual.

Os componentes de marca, SVG, fontes, tokens, estilos globais, layout base, dados originais, assets anteriores e os 25 arquivos de `prototipos/` permaneceram intactos.

## Fotografias novas e licenças

Fontes e licença consultadas em 05/11/2026. As imagens foram inspecionadas antes da escolha; o hero apresenta um split identificável e o ambiente. As fotografias são hospedadas localmente e otimizadas pelo Astro. Recortes e planos são feitos por CSS; os arquivos originais baixados foram preservados.

| Uso e arquivo | Fonte e autoria | Dimensões |
| --- | --- | --- |
| Hero, `ambiente-horizontal.jpg` | [Max Vakhtbovych / Pexels — 7019013](https://www.pexels.com/photo/contemporary-apartment-with-living-room-and-kitchen-7019013/) | 1800 × 1201 |
| Manutenção, `manutencao-referencia.jpg` | [José Andrés Pacheco Cortes / Pexels — 5463580](https://www.pexels.com/photo/man-repairing-an-aircon-5463580/) | 1800 × 2700 |

Ambas sob a [licença Pexels](https://www.pexels.com/license/), que permite uso comercial, com as restrições descritas na fonte. Não se atribui endosso do fotógrafo ou do profissional retratado. Há crédito e aviso de referência junto às imagens. A imagem de manutenção não é apresentada como equipe ou serviço da Entrear.

A instalação reutiliza o escritório de Caroline Badran / Unsplash da fundação, com licença já registrada em [recursos-visuais.md](recursos-visuais.md). Fontes e símbolo continuam sob as condições documentadas na Etapa 1.

## Validação técnica e visual

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run check` | 30 arquivos; 0 erros, 0 avisos, 0 hints |
| `npm.cmd run build` | Duas rotas estáticas, imagens AVIF/WebP/JPEG; concluído |
| `npm.cmd run test:quote` | 4 testes aprovados; inclui as duas modalidades, todos os municípios, valores inválidos e limites de 600/601 caracteres |
| `npm.cmd run verify:references` | 25 arquivos de protótipos preservados por inventário e SHA-256 |
| `npm.cmd run verify:commercial` | Chrome, seis cenários e fluxo funcional aprovados |
| `npm.cmd run verify:commercial -- --edge` | Edge, mesmos cenários e fluxo aprovados |
| `npm.cmd run verify:foundation` e `-- --edge` | Seis cenários por navegador, sem falhas |
| Integridade da fundação | 55 arquivos protegidos com hashes iguais; capturas desktop/mobile da prancha idênticas às originais |

Cenários: 1440×1000, 390×844, 320×740, 820×1180, 1920×1080 e texto em 200% em tela de 390px. Sem rolagem horizontal; fontes e fotos carregadas; imagens descritas e com dimensões; uma única h1; links para destinos existentes; aviso demonstrativo e `noindex, nofollow` presentes.

Testes de interação no navegador real: Tab/Enter, link de pular conteúdo e foco visível; seleção por setas; sincronização e URL; voltar/avançar após navegação ao orçamento; menu, Escape e resize; submissão inválida e válida; geração, alteração, cópia permitida/negada; recarga e limpeza; ausência de armazenamento; conteúdo e fallback sem JavaScript; movimento normal e reduzido. As requisições da página foram locais e GET, sem chamadas de envio.

O bundle de cliente tem aproximadamente 7kB antes de gzip. Não há runtime de framework no navegador. Fotos abaixo da dobra usam lazy loading; o hero possui `fetchpriority="high"`. Esse conjunto favorece desempenho, mas não representa medição de Core Web Vitals em produção.

### Revisão com Skills

`frontend-design` orientou hierarquia, direção fotográfica, composições distintas e a retirada da numeração sem função. `web-design-guidelines` foi aplicado aos componentes e scripts comerciais usando a [fonte atual das regras](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

- `src/components/commercial/ServiceSelector.astro`: foco do rádio tem substituição visível no rótulo; grupo semântico e alvo de 44px. Habilitação só após inicialização.
- `src/components/commercial/QuoteSection.astro`: labels, erros associados, indicação de obrigatoriedade, controles nativos com pelo menos 52px e mensagem em texto puro. Resultado com foco e status anunciado.
- `src/scripts/quote-form.ts`: foco na prévia corrigido para permitir a rolagem até o resultado; sucesso de cópia condicionado à resolução da API e fallback manual.
- `src/components/layout/SiteHeader.astro`: menu sem armadilha de foco, Escape, relação de controle e destino real dos links.
- `src/components/commercial/Hero.astro`: prioridade de imagem, enquadramento por largura e transições limitadas ao transform, sem movimento automático.

Nenhum problema impeditivo identificado nessa revisão. Não foi adicionado alerta de abandono para o rascunho transitório: o fluxo declara a simulação e descarta dados deliberadamente, sem criar a expectativa de uma solicitação salva.

### Limites de verificação

Chrome 157 e Edge 156 são navegadores reais em Windows; ambos usam Chromium. Não houve execução em Safari, Firefox, iPhone/Android físicos ou leitor de tela. Os tamanhos mobile são emulados, não substituem esses testes. Não foi feito teste de cópia na área de transferência do sistema; a API foi simulada para verificar sucesso e recusa sem alterar o clipboard pessoal. Não há auditoria Lighthouse nem dados de desempenho de hospedagem, pois não houve deploy.

O hero ocupa uma altura editorial ampla no desktop. A escolha de serviço pode ficar abaixo da primeira dobra; a ação principal e os serviços explícitos aparecem antes da fotografia. A prévia permite rolagem interna quando as observações são longas, sem descartar texto. Esses são comportamentos deliberados a avaliar na revisão.

## Capturas finais

| Composição | Primeira tela | Página inteira | Orçamento gerado |
| --- | --- | --- | --- |
| Desktop | [1440×1000](validacao/etapa-2/desktop.png) | [Completa](validacao/etapa-2/desktop-completo.png) | [Mensagem](validacao/etapa-2/orcamento-desktop.png) |
| Mobile | [390×844](validacao/etapa-2/mobile.png) | [Completa](validacao/etapa-2/mobile-completo.png) | [Mensagem](validacao/etapa-2/orcamento-mobile.png) |

Relatórios: [Chrome](validacao/etapa-2/verificacao-chrome.json), [Edge](validacao/etapa-2/verificacao-edge.json). A subpasta `fundacao/` contém as evidências de regressão sem substituir as originais.

## Revisar localmente

No VS Code, abra a raiz, execute `npm.cmd run dev` e acesse `http://127.0.0.1:4321/`. Teste também `http://127.0.0.1:4321/?servico=manutencao#orcamento`. A prancha permanece em `/sistema-visual/`. Use `npm.cmd run build` seguido de `npm.cmd run preview` para revisar a saída estática.

Mensagem de commit sugerida: `feat: implementa núcleo comercial e orçamento demonstrativo da Entrear`.

Aguardar avaliação da Etapa 2 antes de desenvolver a Etapa 3.
