# Etapa 4 — interações e motion design

Entrega para avaliação em **06/11/2026**, após a aprovação da Etapa 3. Exclusivamente a Etapa 4. Sem commits, push ou deploy. A Etapa 5 não foi iniciada.

## Linguagem de movimento

**Abertura, passagem e precisão.** O movimento principal responde à escolha de serviço no hero. Os demais retornos são breves e subordinados a uma ação da pessoa. Não há animação automática de entrada, loops, parallax, scroll-jacking, cursor especial ou revelações repetidas de seções.

Paleta e tipografia preservadas: azul-ardósia `#253d4a`, cobre `#a64b32`, branco frio `#eef1f1`, leitura `#50616b`, apoio `#cedbe0`; Archivo para títulos e Instrument Sans para leitura. Os tokens, o símbolo, as fontes locais e suas licenças não foram alterados.

Foram considerados três caminhos dentro do conceito C aprovado:

| Caminho | Avaliação |
| --- | --- |
| Fotografias ou enquadramentos independentes por vão | Reforçaria a impressão de três fragmentos desconectados e exigiria controlar vários enquadramentos. Descartado. |
| Uma máscara complexa interpolada sobre a fotografia | Permitiria uma forma contínua, mas ampliaria a complexidade geométrica para uma interação simples. Não foi necessária. |
| Fotografia imóvel com planos que abrem sobre um eixo comum | Selecionado: preserva referências arquitetônicas entre os vãos e permite reversão nativa por `transform`, sem biblioteca. |

## Hero: composição e finalidade

- **Uma única fotografia:** nenhum vão recebe uma cópia ou transformação independente. A fotografia permanece na mesma posição durante toda a troca.
- **Desktop:** as larguras passam a 52%, 28% e 20%, com divisórias de 3px. As alturas visíveis em instalação são 100%, 75% e 50%, centradas no mesmo eixo horizontal. A faixa central compartilhada melhora a continuidade, e o último vão deixa de ser uma tira estreita.
- **Relação com a marca:** a composição mantém três planos progressivos como interpretação editorial dos vãos. A relação canônica 3:2:1 do símbolo não foi alterada; não se exige copiá-la literalmente na fotografia quando isso prejudica a leitura do ambiente.
- **Enquadramento:** `object-position: 50% 10%` no desktop protege o split. Na revisão, uma posição mais baixa cortava a parte superior do aparelho e foi descartada.
- **Mobile:** larguras de 50%, 28% e 22%, divisórias de 2px e altura de `clamp(248px, 72vw, 430px)`. A imagem ganha contexto vertical; o enquadramento lateral considera a posição do aparelho e da janela. Não é apenas uma redução do desktop.
- **Manutenção:** os planos se recolhem até revelar a fotografia completa, conservando as divisórias. É uma mudança de leitura do mesmo cenário ilustrativo, sem simular a execução de um serviço.

### Abertura e interrupção

Os planos superiores reduzem sua escala vertical a partir da borda superior; os inferiores, a partir da borda inferior. O segundo vão usa **420ms** e o terceiro, **560ms**, com a curva aprovada `cubic-bezier(0.22, 0.61, 0.36, 1)`. Não há atraso programado entre cliques nem fila de animações. Uma nova escolha retoma o estado interpolado atual.

Rádio, orientação, formulário e URL atualizam imediatamente. O conteúdo não espera os planos terminarem. Não há movimento automático ao carregar a página, inclusive ao abrir diretamente uma URL de manutenção.

O seletor usa uma linha de confirmação de **180ms**, mantendo o rádio nativo como indicação imediata. As duas orientações participam de uma grade sobreposta; as cópias de medição são invisíveis e têm `aria-hidden`. Isso reserva a altura da maior mensagem na largura real, inclusive com texto ampliado, sem altura fixa ou medição por JavaScript. Foi corrigido um deslocamento de uma linha identificado no mobile.

## Interações secundárias

| Elemento | Implementação e finalidade |
| --- | --- |
| Navegação atual | `IntersectionObserver` identifica a seção em leitura e aplica `aria-current="location"`, cor e linha em cobre. O rodapé também identifica seus destinos. Não escreve no histórico, na query ou no hash. |
| Cabeçalho adaptável | A região observada considera a altura do cabeçalho fixo. `ResizeObserver` atualiza essa referência quando o menu ou a altura do cabeçalho muda. Não há listener de rolagem nem leitura de layout em cada frame. |
| Menu compacto | Entrada de 220ms, deslocamento de 6px e opacidade entre 0,9 e 1 por Web Animations API. Os links ficam disponíveis imediatamente. Fechar é instantâneo; Escape, redimensionamento e movimento reduzido cancelam o movimento pendente. |
| Foco do menu | Escape retorna ao botão. Ao passar do desktop para o menu compacto, foco em um link que ficaria escondido retorna ao botão. A navegação por âncora mantém o comportamento nativo e o foco no destino. |
| Botões e serviços | Ícones respondem ao hover e ao foco, com deslocamento de 3px. Botões principais respondem à pressão com 1px, apenas quando movimento é permitido. O alvo clicável não muda de tamanho. |
| Perguntas frequentes | `details/summary` nativos preservados. O ícone muda em 180ms; a resposta recebe feedback de 220ms e 3px. A opacidade começa em 0,92, mantendo a leitura. Não se anima altura nem se adia o acesso ao texto. |
| Orçamento | Mensagens, validação e regras de estado preservadas. A indicação de erro mantém a espessura geométrica do controle; um traço interno reforça o erro, sem substituir o contorno externo de foco. O botão de cópia indica indisponibilidade temporária enquanto a API responde. |

As fotos de serviços e aplicações foram avaliadas e permanecem estáticas. Não há uma interação própria da fotografia que justifique zoom ou deslocamento; isso introduziria movimento decorativo e possível impressão de que a imagem é clicável. Atendimento, região e apresentação também mantêm sua leitura estática.

## Acessibilidade e desempenho

- `prefers-reduced-motion` zera os tempos dos tokens existentes; não há movimento espacial dos novos botões nesse modo. Menu e respostas não iniciam animação. Alterar a preferência durante a abertura interrompe o movimento e apresenta o estado final.
- Seleção de serviço, estado atual, erros, mensagens e expansão permanecem compreensíveis sem animação. O seletor continua um grupo de rádios nativo; as respostas continuam nativas, inclusive sem JavaScript.
- Foco visível preservado em links, rádio, menu, perguntas e campos inválidos. O contorno de teclado do campo inválido permanece com 3px e afastamento de 5px.
- A imagem do hero não troca nem muda de posição com a seleção. Planos usam somente `transform`; indicadores e respostas usam `transform` e opacidade. Não há `will-change` permanente ou loop de `requestAnimationFrame` na aplicação.
- A altura do hero permanece estável entre os dois serviços nas sete larguras/configurações testadas. A rolagem normal para alcançar um controle focado com texto ampliado é preservada.
- JavaScript de cliente: **8.393 bytes**, **3.350 bytes em gzip**. Acréscimo de **1.409 bytes** sem gzip em relação à Etapa 3. O código de gravação e teste não faz parte do bundle publicado.
- Nenhuma dependência adicionada. Astro, TypeScript, CSS, Intersection Observer, Resize Observer e Web Animations API foram suficientes; GSAP não trouxe uma necessidade técnica concreta.

## Evidências para avaliação

Abra [interacoes.html](validacao/etapa-4/interacoes.html) no navegador para os dois vídeos com controles, as sequências e as instruções de experimentação. Não há reprodução automática.

| Evidência | Desktop 1440px | Mobile 390px |
| --- | --- | --- |
| Instalação | [PNG](validacao/etapa-4/hero-instalacao-desktop.png) | [PNG](validacao/etapa-4/hero-instalacao-mobile.png) |
| Passagem | [PNG](validacao/etapa-4/hero-passagem-desktop.png) | [PNG](validacao/etapa-4/hero-passagem-mobile.png) |
| Manutenção | [PNG](validacao/etapa-4/hero-manutencao-desktop.png) | [PNG](validacao/etapa-4/hero-manutencao-mobile.png) |
| Gravação, aproximadamente 5,7s | [WebM](validacao/etapa-4/hero-desktop.webm) | [WebM](validacao/etapa-4/hero-mobile.webm) |
| Seis quadros extraídos da reprodução | [Sequência](validacao/etapa-4/hero-sequencia-desktop.png) | [Sequência](validacao/etapa-4/hero-sequencia-mobile.png) |
| Página completa | [PNG](validacao/etapa-4/editorial/desktop-completo.png) | [PNG](validacao/etapa-4/editorial/mobile-completo.png) |

Também foram gerados os dois estados em [820px](validacao/etapa-4/hero-instalacao-tablet.png), [1024px](validacao/etapa-4/hero-instalacao-intermediario.png), [320px](validacao/etapa-4/hero-instalacao-estreito.png), [1920px](validacao/etapa-4/hero-instalacao-amplo.png) e [texto em 200%](validacao/etapa-4/hero-instalacao-texto-200.png). Os arquivos correspondentes de manutenção estão na mesma pasta. Há ainda uma [captura com movimento reduzido](validacao/etapa-4/hero-manutencao-movimento-reduzido.png).

A subpasta `editorial/` contém capturas legíveis de todas as seções e do rodapé, em desktop e mobile. O orçamento gerado está em [desktop](validacao/etapa-4/comercial/orcamento-desktop.png) e [mobile](validacao/etapa-4/comercial/orcamento-mobile.png).

### Como as gravações foram feitas

Screencast nativo do Chrome, quadros JPEG sem redimensionamento, canvas e MediaRecorder WebM/VP9. A janela headless é dimensionada antes da captura; no mobile, somente a viewport emulada é recortada da superfície maior da janela, sem ampliar pixels. O arquivo é reproduzido no navegador e seis quadros são extraídos para a prancha. Não há interpolação ou reconstituição artificial de movimentos.

As gravações mostram duas alternâncias completas por teclado, com aproximadamente 1,2s entre escolhas. Dimensões, ações e intervalos de captura estão em [gravacoes.json](validacao/etapa-4/gravacoes.json). A taxa é variável: as medianas dos intervalos ativos desta captura foram aproximadamente 26,7ms no desktop e 15,5ms no mobile. Esses valores descrevem a captura, **não são um benchmark de FPS do site**. Os PNGs são a referência para cor e nitidez; os vídeos têm compressão.

## Revisão visual crítica

Foram inspecionadas capturas reais de 1440px, 390px e larguras intermediárias, a página inteira por seções e os quadros extraídos da reprodução dos vídeos.

- **Continuidade:** aparelho, marcenaria e esquadria mantêm suas posições nos quadros sucessivos. As divisórias menores e o último vão maior tornam mais legível a relação entre os fragmentos.
- **Escala:** a abertura final preserva a hierarquia tipográfica e a ação comercial. O movimento não altera o espaço ocupado pelo hero.
- **Ritmo:** a ação da pessoa concentra o movimento nos planos; as seções institucionais não competem com esse momento.
- **Mobile:** há mais área útil da fotografia e uma parcela maior para o último vão. O seletor mantém leitura, foco e orientação sem salto de altura.
- **Simplificações:** descartados o recorte baixo que cortava o aparelho, movimentos adicionais em fotografias estáticas, animação de altura nas respostas e o sublinhado duplicado no hover da navegação.
- **Limite fotográfico:** no desktop, o terceiro vão ainda concentra a TV e a esquadria da fotografia escolhida. A composição agora oferece mais contexto, mas o assunto da imagem continua assimétrico. Esse ponto fica explícito para a avaliação, sem apresentar a imagem como trabalho da marca.

A revisão visual não foi reduzida aos resultados automatizados. A inspeção aqui considera capturas e sequências de quadros reais; a aprovação da sensação de tempo e naturalidade deve incluir a reprodução dos vídeos e a interação no navegador pelo proprietário.

## Testes e resultados

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run check` | 39 arquivos; zero erros, avisos ou hints |
| `npm.cmd run build` | Duas rotas estáticas; concluído |
| `npm.cmd run test:quote` | Quatro testes aprovados |
| `npm.cmd run verify:references` | 25 arquivos de protótipos preservados |
| `npm.cmd run verify:motion` e `-- --edge` | Sete cenários por navegador; aprovados |
| `npm.cmd run verify:commercial` e `-- --edge` | Seis cenários por navegador e fluxo de orçamento; aprovados |
| `npm.cmd run verify:editorial` e `-- --edge` | Seis cenários por navegador, conteúdo e navegação; aprovados |
| `npm.cmd run verify:foundation` e `-- --edge` | Seis cenários por navegador; aprovados |
| `npm.cmd run record:hero` | Dois vídeos e duas sequências; reprodução e dimensões verificadas |
| Integridade | 55 arquivos da fundação e 69 referências de conteúdo, recursos e evidências da Etapa 3 preservados |
| Prancha original | Quatro capturas desktop/mobile idênticas em bytes às da Etapa 1 |

Movimento: 320, 390, 820, 1024, 1440 e 1920px, além de texto em 200%. Oito inversões rápidas por configuração, sem salto para o extremo anterior; estado final de rádio, hero, formulário e query sincronizado. Redimensionamento e ativação de movimento reduzido no meio da abertura aprovados. A mesma imagem do hero permanece em uso, sem nova requisição provocada pela seleção.

Navegação: indicação da seção atual, query preservada, Escape durante a entrada, foco no destino e fallback sem JavaScript. Dúvidas: texto disponível desde a abertura, altura imediata e ausência de animação no modo reduzido. Sem rolagem horizontal nos cenários testados.

Orçamento: validação, foco no primeiro erro, foco visível em campo inválido, geração, alteração, cópia permitida e negada por API simulada, descarte do rascunho, histórico, URL válida/inválida e ausência de armazenamento persistente. As requisições da página permaneceram GET locais, sem envio ou recursos externos. Conteúdo, fontes, imagens, créditos e identificação demonstrativa preservados.

Relatórios: [movimento Chrome](validacao/etapa-4/motion-chrome.json), [movimento Edge](validacao/etapa-4/motion-edge.json), [comercial Chrome](validacao/etapa-4/comercial/verificacao-chrome.json), [comercial Edge](validacao/etapa-4/comercial/verificacao-edge.json), [editorial Chrome](validacao/etapa-4/editorial/verificacao-chrome.json), [editorial Edge](validacao/etapa-4/editorial/verificacao-edge.json), [integridade e recursos](validacao/etapa-4/integridade-e-recursos.json). Os relatórios da prancha estão em `fundacao/`.

### Revisão com Skills

`frontend-design` aplicado à escolha da composição, hierarquia de movimento e crítica das capturas. `web-design-guidelines` aplicado aos arquivos e às interações, usando a [fonte das regras consultada](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

```text
src/components/commercial/Hero.astro:39 - aprovado: planos por transform, origens explícitas e fotografia imóvel
src/components/commercial/ServiceSelector.astro:9 - corrigido: orientação não muda a altura durante a seleção; medidas fora da árvore acessível
src/scripts/navigation.ts:8 - aprovado: cancelamento, Escape, foco e preferência de movimento
src/scripts/section-navigation.ts:23 - aprovado: aria-current sem alteração de URL ou controle da rolagem
src/styles/interactions.css:10 - corrigido: erro sem alteração geométrica e com foco externo preservado
src/styles/interactions.css:17 - aprovado: feedback por ação, reduzido a transform/opacity e desativado pela preferência de movimento
src/components/layout/SiteHeader.astro:28 - corrigido: retirada do sublinhado de texto duplicado pelo indicador de navegação
```

Não foram adicionados alertas de abandono ou persistência ao rascunho transitório; o comportamento demonstrativo aprovado continua explícito. Foram mantidos títulos em caixa de frase e as decisões editoriais em português.

## Arquivos criados

| Arquivo | Responsabilidade |
| --- | --- |
| `src/scripts/section-navigation.ts` | Seção atual e adaptação à altura do cabeçalho |
| `src/styles/interactions.css` | Indicadores, microinterações, respostas e modo reduzido |
| `scripts/verify-motion.mjs` | Estados, interrupções, responsividade e evidências do hero |
| `scripts/record-hero.mjs` | Gravação nativa, reprodução, quadros e visualizador local |
| `docs/referencias/etapa-3.sha256.json` | Inventário dos 69 arquivos preservados nesta etapa |
| `docs/etapa-4.md` | Esta entrega |
| `docs/validacao/etapa-4/` | PNGs, WebMs, visualizador e relatórios, sem sobrescrever etapas anteriores |

## Arquivos modificados

| Arquivo | Alteração |
| --- | --- |
| `src/components/commercial/Hero.astro` | Geometria, enquadramento desktop/mobile e abertura dos planos |
| `src/components/commercial/ServiceSelector.astro` | Indicador e reserva responsiva da orientação |
| `src/components/layout/SiteHeader.astro` | Retirada do sublinhado duplicado no hover |
| `src/scripts/navigation.ts` | Entrada cancelável e foco no redimensionamento |
| `src/pages/index.astro` | Integração do módulo de seção atual e estilos de interação |
| `scripts/lib/browser.mjs` | Assinatura de eventos CDP para screencast; API anterior preservada |
| `scripts/verify-commercial.mjs` | Destino de evidências da Etapa 4, espera de movimento finalizado e verificação de foco inválido |
| `scripts/verify-editorial.mjs` | Destino de evidências, integridade dos conteúdos e capturas após atualização da navegação |
| `scripts/verify-foundation.mjs` | Destino das novas evidências de regressão |
| `package.json` | Comandos `verify:motion` e `record:hero`; dependências inalteradas |
| `README.md` | Estado e evidências da Etapa 4 |

Os módulos `service.ts`, `quote.ts`, `service-selection.ts` e `quote-form.ts` não foram alterados. Também não mudaram os textos institucionais, as aplicações, os serviços, os municípios, as fontes, os assets originais, os créditos ou as condições demonstrativas. O harness de gravação é ferramenta de revisão e não é carregado pelo site.

## Limites conhecidos

- Chrome 157 e Edge 156 em Windows; ambos Chromium. Não houve execução em Safari, Firefox, dispositivo físico ou leitor de tela.
- Capturas e gravações são locais, com viewport mobile emulada. A taxa de captura é variável; avalie a sensação do movimento também no site ao vivo.
- Não há Lighthouse, dados de hospedagem ou Core Web Vitals de produção. As métricas de bundle e integridade estão registradas, sem convertê-las em promessa de desempenho.
- A cópia foi testada com API simulada, sem escrever na área de transferência pessoal.
- A distribuição dos elementos da fotografia, especialmente a TV no último vão desktop, permanece um ponto de avaliação visual.

## Experimentar e reproduzir as evidências

```powershell
npm.cmd run dev
```

Abra `http://127.0.0.1:4321/`. Acesse também `/?servico=manutencao` para conferir o estado inicial sem animação. Use Tab até os rádios e as setas para alternar; repita antes de o movimento terminar. Teste 1440, 1024, 820 e 390px, menu e Escape, dúvidas por Enter/Espaço e orçamento. Ative movimento reduzido no sistema ou na emulação do DevTools e repita.

Para regenerar, conclua o build antes dos verificadores e não altere `dist/` durante a execução:

```powershell
npm.cmd run build
npm.cmd run verify:motion
npm.cmd run verify:motion -- --edge
npm.cmd run record:hero
```

**Commit sugerido, não executado:** `feat: refina vãos do hero e interações da Entrear`.

Aguardar avaliação da Etapa 4 antes de qualquer trabalho na Etapa 5.
