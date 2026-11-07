# Etapa 5 — Validação e acabamento final

Entrega de **07/11/2026**, sobre a Etapa 4 aprovada (`97b500b`). Desenvolvimento encerrado no escopo solicitado; **aguarda aprovação final**. Nenhum commit, push ou deploy executado.

## Resultado da auditoria

O conceito C permanece: Archivo e Instrument Sans locais, azul-ardósia, cobre, branco frio, fotografia arquitetônica e geometrias derivadas dos vãos. A revisão usou `frontend-design` na crítica visual e `web-design-guidelines` na avaliação da interface. Foram corrigidos foco encoberto, contraste do placeholder, tamanho de legendas, reflow com texto ampliado e enquadramento do hero. Nenhuma dependência ou funcionalidade comercial foi acrescentada.

### Problemas e correções

| Evidência anterior | Correção | Verificação final |
| --- | --- | --- |
| O crédito do hero recebia foco em y=3,9px, atrás do cabeçalho fixo de 114,2px. | Reserva de rolagem no documento; remoção da compensação duplicada nos destinos. | Tab e Shift+Tab percorrem 38 controles em mobile e 43 em desktop, sem foco encoberto, nos dois navegadores. Âncoras preservam serviço e rascunho. |
| Legendas de 12px e crédito de 11px no mobile tinham pouca presença. | Legendas e créditos de 13px; crédito com área mínima de 24px de altura. | Nenhum alvo visível medido abaixo de 24×24px; legendas de 26px com texto em 200%. |
| Placeholder padrão do navegador: cinza 117 sobre branco frio, contraste **4,06:1**. | Cor secundária explícita, opacidade 1. | **5,67:1**. Textos visíveis medidos sem falhas nos estados iniciais auditados; mínimo 4,55:1. |
| Texto em 200% combinado ao espaçamento da referência WCAG expôs largura intrínseca nas grades, no título das dúvidas e no contador. O botão do hero quebrava a palavra “orçamento” ao ampliar o texto. | Trilhas podem encolher, palavras podem quebrar; título limitado ao espaço disponível; contador sem compressão; municípios adaptam o número de colunas. Espaço interno e distância do ícone do botão limitados pela largura da tela, com quebra de linha permitida. | Sem rolagem horizontal nas seis larguras, no texto em 200% e com espaçamento ampliado. Nenhum conteúdo ocultado para obter o resultado. |
| TV e painel escuro ocupavam o último vão e desviavam o olhar do aparelho. | Fotografia estacionária com largura de 120% e recorte à direita; `sizes` coerente e derivada de 1600px. | Split identificável em instalação e manutenção, de 320 a 1920px, inclusive 768 e 1024px. Mesma imagem e retângulo durante a troca. |
| Avisos e explicações repetiam ideias e alongavam a leitura. | Textos de aplicações, apresentação, percurso, região e algumas respostas encurtados; avisos contextuais mais diretos. | Texto visível do `main`: 931→830 palavras no desktop e 922→821 no mobile, aproximadamente 11% a menos. Contagem varia conforme elementos responsivos visíveis e não é um inventário de todas as respostas fechadas. |
| README e inventário visual descreviam etapas antigas; não havia orientação final de publicação. | Documentação atualizada, Open Graph básico e `robots.txt` explícito. | Sem domínio, endereço, contato, schema empresarial ou resultado comercial inventado. `noindex, nofollow` preservado. |

Dados anteriores: [auditoria inicial](validacao/etapa-5/antes/auditoria.json) e [placeholder](validacao/etapa-5/antes/placeholder.json). Contrastes e integridade: [registro final](validacao/etapa-5/integridade.json).

### Crítica visual por seção

| Seção | Avaliação e decisão |
| --- | --- |
| Cabeçalho e hero | Serviços e acesso ao orçamento aparecem antes da fotografia. O título amplo funciona como abertura editorial. O aviso fictício continua próximo à marca. O crédito ganhou leitura e foco seguro. |
| Instalação e manutenção | Duas composições espelhadas, com mudança para fundo escuro na manutenção, distinguem planejamento e cuidado. Fotografias mostram ambiente e inspeção, sem atribuir execução à marca. Mantidos os CTAs que já selecionam o serviço. |
| Aplicações | Apartamento em grande escala, escritório e comércio em sequência lateral: hierarquia assimétrica, sem três cards repetidos. No mobile a ordem é linear. A cafeteria mostra contexto de uso, sem afirmar aparelho ou solução técnica inexistente na imagem. |
| A Entrear | Fundo escuro, título expressivo e detalhe de marcenaria criam uma pausa em relação à galeria. Texto mais curto apresenta posicionamento; não fabrica história ou equipe. |
| Atendimento | Lista editorial com linhas e números de cobre explicita uma sequência. O condicional e o aviso de percurso ilustrativo distinguem proposta conceitual de promessa comercial. |
| Região | Faixa azul clara reduz a densidade entre percurso e dúvidas. O desenho é conceitual, sem escala ou geografia; a grade dos municípios agora suporta texto ampliado. |
| Dúvidas | Índice visual simples e respostas nativas evitam peso visual. Corrigido o limite de largura do título. Respostas úteis sem condições comerciais fictícias. |
| Orçamento | Coluna de contexto e formulário direto; mobile em uma coluna. Ajustados contraste da dica e reflow da ajuda. Geração, cópia, foco e URL preservados. |
| Rodapé | Fundo escuro fecha a sequência e oferece todos os caminhos, identificação da demonstração e créditos expansíveis. O aviso foi encurtado sem perder informação. |

O ritmo foi revisto em capturas reais da página inteira e de cada seção. A página continua extensa por apresentar todos os conteúdos previstos: 9.093px no desktop de 1440px e 12.732px no mobile de 390px. Acesso ao orçamento, âncoras e navegação por seção evitam depender da leitura integral. Não foi introduzida uma nova sequência de animações ou de cards.

### Comparação do hero

Foram comparados recortes com a imagem em 100%, 110% e 120% da largura disponível, sem alterar a geometria aprovada dos planos. O recorte de 100% deixava mais TV no vão direito; 110% reduzia parcialmente essa distração. **120%** preserva o aparelho no primeiro vão e aproxima o último da leitura de porta/janela. Não elimina toda borda escura em todas as proporções, mas melhora a hierarquia sem trocar a fotografia ou perder continuidade.

| Comparação | Desktop | Mobile |
| --- | --- | --- |
| Antes, 100% | [captura](validacao/etapa-5/antes/hero-100-desktop.png) | [captura](validacao/etapa-5/antes/hero-100-mobile.png) |
| Alternativa, 110% | [captura](validacao/etapa-5/antes/hero-110-desktop.png) | [captura](validacao/etapa-5/antes/hero-110-mobile.png) |
| Estudo escolhido, 120% | [captura](validacao/etapa-5/antes/hero-120-desktop.png) | [captura](validacao/etapa-5/antes/hero-120-mobile.png) |

Os estudos em `antes/` isolam o enquadramento e ainda contêm o texto/tamanho de legenda anterior. As capturas finais abaixo contêm todos os ajustes. As transições permanecem em 420/560ms, interrompíveis e sem movimento da imagem. As gravações foram renovadas para representar o recorte final.

## Testes executados

Ambiente: Windows, Node **24.19.0**, npm **11.17.0**, Chrome **157.0.8103.38**, Edge **156.0.4314.58**, build estático servido em localhost. Sem bibliotecas novas de testes ou de acessibilidade.

| Verificação | Resultado e evidência |
| --- | --- |
| `npm.cmd run check` | 39 arquivos, zero erros, avisos ou hints. [Log](validacao/etapa-5/tipagem.log). |
| `npm.cmd run build` | Duas rotas estáticas; 84 variações otimizadas de imagem. [Log](validacao/etapa-5/build.log). |
| `npm.cmd run test:quote` | Quatro testes aprovados: regras, estado e URL. [Log](validacao/etapa-5/orcamento-unitario.log). |
| `npm.cmd run verify:references` | 25 arquivos de protótipos íntegros. [Log](validacao/etapa-5/referencias.log). |
| `verify:commercial` e `-- --edge` | Seis cenários em cada navegador; fluxo comercial, mensagens e histórico aprovados. [Chrome](validacao/etapa-5/comercial/verificacao-chrome.json), [Edge](validacao/etapa-5/comercial/verificacao-edge.json). |
| `verify:editorial` e `-- --edge` | Seis cenários por navegador; FAQ, destinos, menu, créditos, árvore de acessibilidade e fallback sem JS. [Chrome](validacao/etapa-5/editorial/verificacao-chrome.json), [Edge](validacao/etapa-5/editorial/verificacao-edge.json). |
| `verify:motion` e `-- --edge` | Sete cenários por navegador; ambos os estados, oito inversões rápidas por cenário, resize durante transição e ativação de movimento reduzido. Sem deslocamento de layout ou nova requisição da mesma foto na seleção. [Chrome](validacao/etapa-5/motion-chrome.json), [Edge](validacao/etapa-5/motion-edge.json). |
| `verify:foundation` e `-- --edge` | Seis cenários por navegador na prancha histórica; sem regressões funcionais. [Chrome](validacao/etapa-5/fundacao/verificacao-chrome.json), [Edge](validacao/etapa-5/fundacao/verificacao-edge.json). |
| `verify:final` e `-- --edge` | 320, 390, 768, 1024, 1440 e 1920px, mais texto em 200%; teclado nos dois sentidos, contraste, alvos, espaçamento e zoom nativo. [Chrome](validacao/etapa-5/auditoria-chrome.json), [Edge](validacao/etapa-5/auditoria-edge.json). |
| Arquivos e preservação | 104 destinos/arquivos locais responderam HTTP 200 por navegador. 176 arquivos protegidos, incluindo fontes, originais, regras de orçamento e evidências anteriores, sem alteração de hash. [Integridade](validacao/etapa-5/integridade.json). |

O orçamento passou em seleção de instalação/manutenção, sincronização hero/formulário, query string, voltar/avançar, validação e foco no primeiro erro, geração e atualização da mensagem, cópia simulada com sucesso e cópia negada com seleção manual, invalidação após edição e descarte ao recarregar. As execuções do site registraram apenas GET locais; nenhum envio, gravação de rascunho ou chamada externa. O teste de clipboard substitui a API para verificar deterministicamente os dois caminhos; permissões reais ainda dependem do navegador e da origem HTTPS.

A auditoria de teclado percorre os controles visíveis no estado inicial; menu, respostas, erros e prévia da mensagem são exercitados também pelas suítes comercial e editorial. Zoom **real de página em 200%** foi aplicado em perfis descartáveis: Chrome 1440→720 CSS px e DPR 1→2; Edge 1432→716 CSS px e DPR 1→2. Sem overflow ou foco encoberto. Também houve teste separado de tamanho de texto em 200% e espaçamento: entrelinhas 1,5, letras 0,12em, palavras 0,16em, parágrafos 2em.

Contraste das bordas de formulário: 5,67:1; foco cobre sobre branco frio: 5,03:1; foco/texto claro sobre fundo escuro: 10,02:1. A emulação de cores forçadas conservou contorno sólido de 3px. A medição automática de textos considera cores opacas computadas e fundos ancestrais; não substitui revisão de todos os estados/pixels. Referências: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) e [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

A comparação da prancha com a Etapa 1 encontrou três PNGs com pixels idênticos. No mobile completo, dimensões idênticas e diferença de 1 nível em 163 de 8.122.140 canais de cor, compatível com rasterização da captura. Não foi declarada igualdade binária dessa imagem. Documentos e evidências anteriores não foram regravados.

## Performance medida

Lighthouse CLI/módulo não estava disponível no projeto, PATH ou cache npx. Nenhuma instalação foi feita. Em seu lugar, `npm.cmd run measure:performance` registra métricas nativas de **Chrome DevTools Protocol + PerformanceObserver**, sem produzir pontuação Lighthouse.

Foram realizadas três navegações em perfis novos para cada cenário, cache de rede desativado e limpo, observação inicial de 6,5 segundos, sem forçar carregamento das fotos tardias. Servidor HTTP local sem gzip; sem TLS, CDN ou hospedagem de produção. Medianas:

| Cenário | FCP | LCP | CLS | Transferência inicial observada |
| --- | ---: | ---: | ---: | ---: |
| Desktop 1440×1000, CPU 1×, sem limitação de rede | 200ms | 200ms | 0 | 314.713 bytes (~307KiB) |
| Mobile simulado 390×844, CPU 4×, latência 150ms, download 209.715B/s (~1,6Mb/s) | 1.560ms | 1.560ms | 0 | 232.300 bytes (~227KiB) |

[Dados completos, recursos e condições](validacao/etapa-5/performance.json). O LCP observado foi a fotografia do hero. Fontes e hero carregaram nas seis amostras; imagens distantes permaneceram lazy. O mobile é emulação de viewport/rede/CPU no Chrome desktop, sem representar um telefone específico.

O único bundle de cliente tem **8.393 bytes**, ou **3.350 bytes** comprimido com gzip para comparação de tamanho. Essa compressão foi calculada localmente e não estava habilitada no servidor medido. As duas fontes locais somam 120.196 bytes de arquivo e têm preload; não há nova família ou recurso externo. A inspeção não identificou runtime de framework de UI ou código adicionado sem função: seleção/URL, formulário, menu, seção atual e interações previstas permanecem no mesmo bundle.

Houve tarefas longas na navegação: 98–113ms no desktop; no mobile simulado, uma de 402–474ms e outra de 64–78ms por execução. Elas permanecem registradas, mesmo com LCP baixo. Não foi medido INP de campo nem atribuída uma nota de responsividade. O `404 /favicon.ico` do documento texto utilizado na preparação do perfil está registrado em `setupErrors`; as navegações medidas da aplicação tiveram `errors: []` e carregaram `/favicon.svg` corretamente.

## Evidências finais

PNGs em largura nativa, sem interpolação: desktop 1440px, mobile 390px. As imagens da página inteira são longas; abrir em tamanho original para ler. As capturas por seção evitam depender de miniaturas reduzidas pelo visualizador.

| Conteúdo | Desktop | Mobile |
| --- | --- | --- |
| Hero: instalação | [PNG](validacao/etapa-5/hero-instalacao-desktop.png) | [PNG](validacao/etapa-5/hero-instalacao-mobile.png) |
| Hero: manutenção | [PNG](validacao/etapa-5/hero-manutencao-desktop.png) | [PNG](validacao/etapa-5/hero-manutencao-mobile.png) |
| Serviços | [PNG](validacao/etapa-5/editorial/servicos-desktop.png) | [PNG](validacao/etapa-5/editorial/servicos-mobile.png) |
| Aplicações | [PNG](validacao/etapa-5/editorial/aplicacoes-desktop.png) | [PNG](validacao/etapa-5/editorial/aplicacoes-mobile.png) |
| A Entrear | [PNG](validacao/etapa-5/editorial/entrear-desktop.png) | [PNG](validacao/etapa-5/editorial/entrear-mobile.png) |
| Atendimento | [PNG](validacao/etapa-5/editorial/atendimento-desktop.png) | [PNG](validacao/etapa-5/editorial/atendimento-mobile.png) |
| Região | [PNG](validacao/etapa-5/editorial/regiao-desktop.png) | [PNG](validacao/etapa-5/editorial/regiao-mobile.png) |
| Dúvidas | [PNG](validacao/etapa-5/editorial/duvidas-desktop.png) | [PNG](validacao/etapa-5/editorial/duvidas-mobile.png) |
| Dúvidas abertas | [PNG](validacao/etapa-5/editorial/duvidas-abertas-desktop.png) | [PNG](validacao/etapa-5/editorial/duvidas-abertas-mobile.png) |
| Orçamento inicial | [PNG](validacao/etapa-5/editorial/orcamento-desktop.png) | [PNG](validacao/etapa-5/editorial/orcamento-mobile.png) |
| Mensagem gerada | [PNG](validacao/etapa-5/comercial/orcamento-desktop.png) | [PNG](validacao/etapa-5/comercial/orcamento-mobile.png) |
| Rodapé | [PNG](validacao/etapa-5/editorial/rodape-desktop.png) | [PNG](validacao/etapa-5/editorial/rodape-mobile.png) |
| Página completa | [PNG 1440×9093](validacao/etapa-5/editorial/desktop-completo.png) | [PNG 390×12732](validacao/etapa-5/editorial/mobile-completo.png) |

Hero intermediário: [768px instalação](validacao/etapa-5/hero-instalacao-tablet.png), [768px manutenção](validacao/etapa-5/hero-manutencao-tablet.png), [1024px instalação](validacao/etapa-5/hero-instalacao-intermediario.png), [1024px manutenção](validacao/etapa-5/hero-manutencao-intermediario.png). Também há capturas de 320px, 1920px, texto em 200%, passagem e movimento reduzido na mesma pasta. [Zoom nativo em 200%](validacao/etapa-5/zoom-real-200.png).

[Visualizador das gravações finais](validacao/etapa-5/interacoes.html): WebM de 1440×1107 e 390×939, com aproximadamente 5,7 segundos cada. [Dados da captura](validacao/etapa-5/gravacoes.json). Foram inspecionadas as sequências reais de quadros desktop/mobile. A taxa é variável, com descarte de quadros pela captura; intervalos do screencast não são FPS ou benchmark do site. PNGs servem como referência de nitidez e os vídeos VP9 apresentam compressão.

## Arquivos criados e alterados

**Criados:**

- `public/robots.txt` — política explícita para permitir leitura de `noindex`.
- `scripts/verify-final.mjs` — auditoria de tamanhos, contraste, teclado, reflow, arquivos e zoom real.
- `scripts/measure-performance.mjs` — medição nativa reproduzível, sem dependências.
- `docs/referencias/etapa-4.sha256.json` — proteção de 176 arquivos anteriores.
- `docs/etapa-5.md`, `docs/publicacao-estatica.md` e `docs/validacao/etapa-5/` — relatório, guia, dados, PNGs e vídeos desta entrega.

**Alterados:**

- `src/components/commercial/Hero.astro` — enquadramento, seleção responsiva da imagem e legenda.
- `src/components/commercial/QuoteSection.astro` — placeholder e ajuda/contador.
- `src/components/commercial/Services.astro`, `src/components/editorial/EditorialPhoto.astro`, `src/components/layout/SiteHeader.astro`, `src/components/media/PhotoCredit.astro` — legendas, aviso do cabeçalho e área dos créditos.
- `src/components/editorial/Coverage.astro`, `FAQ.astro`, `Process.astro` — reflow e síntese dos avisos.
- `src/components/layout/SiteFooter.astro` — aviso mais direto.
- `src/data/commercial-media.ts`, `src/data/editorial-media.ts`, `src/data/editorial-content.ts` — redação, sem troca dos arquivos/fonte/licença das fotografias.
- `src/pages/index.astro` — reserva de rolagem/foco e encolhimento de conteúdo ampliado.
- `src/layouts/BaseLayout.astro` — Open Graph coerente com demonstração.
- `scripts/verify-commercial.mjs`, `verify-editorial.mjs`, `verify-foundation.mjs`, `verify-motion.mjs`, `record-hero.mjs` — evidências na Etapa 5, proteção atualizada e estabilização de capturas/seleção responsiva; hero testado em 768px.
- `scripts/lib/browser.mjs` — MIME de arquivos de texto e registro de `console.error`, além de exceções e falhas HTTP.
- `package.json` — comandos `verify:final` e `measure:performance`, sem alterar dependências ou lockfile.
- `README.md`, `docs/recursos-visuais.md` — estado final e inventário/licenças atualizados.

Regras do orçamento, scripts de sincronização/geração, tokens, fontes, originais fotográficos e registros históricos foram preservados. A verificação de referências foi atualizada deliberadamente para proteger esses originais e evidências, sem impedir as correções de apresentação autorizadas nesta etapa.

## Licenças, publicação e limites

Seis fotografias locais, quatro autores, duas fontes OFL preservadas. [Inventário e licenças](recursos-visuais.md). Links externos foram conferidos em 07/11: Unsplash respondeu HTTP 200; Pexels recusou HEAD automatizado com 403, mas as quatro páginas e a licença puderam ser consultadas via navegação web. O 403 foi registrado como limitação da checagem, sem declarar os links quebrados nem falsificar sucesso HTTP. [Registro HEAD](validacao/etapa-5/links-externos.json).

Não foram identificados bloqueios funcionais nas condições testadas. Permanecem limites explícitos: Chrome e Edge compartilham Chromium; não houve teste real em Safari, Firefox, iOS/Android ou leitor de tela. A auditoria usa WCAG 2.2 AA como referência, **sem declaração de conformidade completa**. Lighthouse e métricas de campo não estão disponíveis. As tarefas longas e o peso das fontes merecem observação em dispositivo real quando houver hospedagem; estes resultados locais não garantem métricas de produção. O orçamento continua sendo simulação sem canal de envio.

Para executar e preparar publicação futura, seguir [o guia estático](publicacao-estatica.md). A identificação fictícia e `noindex, nofollow` permanecem. Domínio, canonical, imagem social e configuração do host dependem do destino real e não foram inventados. A política de indexação não é controle de acesso.

**Commit sugerido, não executado:** `fix: conclui auditoria e acabamento final da Entrear`.

Aguardando aprovação final do proprietário. Nenhuma etapa adicional foi iniciada.
