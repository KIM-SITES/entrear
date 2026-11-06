# Etapa 3 — experiência editorial completa

Entrega para avaliação em **06/11/2026**. Exclusivamente a Etapa 3, com a direção C aprovada e o núcleo comercial preservado. Sem commit, push ou deploy. A Etapa 4 não foi iniciada.

## Objetivo e direção visual

Completar a leitura institucional para quem procura instalação ou manutenção em uma residência ou pequeno negócio, mantendo a distinção entre demonstração e contratação real. A arquitetura segue `docs/arquitetura.md`: hero → serviços → aplicações → apresentação → atendimento → região → dúvidas → orçamento → rodapé.

Foram mantidos os tokens: azul-ardósia `#253d4a`, cobre `#a64b32`, branco frio `#eef1f1`, texto secundário `#50616b` e superfície `#cedbe0`. Archivo conduz títulos e Instrument Sans, leitura e controles. Nada foi alterado nos arquivos de fontes, marca, tokens ou base global.

| Seção | Função e solução visual |
| --- | --- |
| Aplicações demonstrativas | Apartamento em fotografia ampla à esquerda; escritório e pequeno comércio em duas referências menores à direita. No celular, sequência integral, sem carrossel. Hierarquia real de escala, sem três cards equivalentes. Cada fotografia informa que não é um projeto da Entrear. |
| A Entrear | Pausa em azul-ardósia, título expressivo deslocado para a coluna direita e fotografia de detalhe à esquerda. Texto apresenta planejamento, atenção aos ambientes e comunicação clara como posicionamento conceitual. Sem história empresarial ou credenciais inventadas. |
| Atendimento | Introdução e acesso ao orçamento à esquerda; lista ordenada contínua à direita. Numeração representa uma sequência efetiva, sem caixas individuais. O texto distingue o percurso ilustrativo de um atendimento real. |
| Região | Faixa de contraste intermediário, municípios explícitos e linha arquitetônica em cobre. Diagrama decorativo acompanhado de legenda: sem escala, correspondência geográfica, rotas ou unidades. Não é um mapa de cobertura real. |
| Dúvidas | Título transversal, margem lateral curta e lista expansível. Sete respostas sobre instalação, manutenção, orçamento, condições da simulação, região, fotografias e destino da mensagem. Controles nativos `details/summary`. |
| Rodapé | Marca em versão inversa, duas áreas de navegação nomeadas, identificação demonstrativa e créditos expansíveis. Sem contatos, endereços ou redes fictícias. Links para licenças de fotografias e fontes. |

O recorte institucional foi aproximado na revisão visual para enfatizar a marcenaria, diferenciando seu papel da fotografia ampla já usada em instalação. O tamanho responsivo da imagem considera essa ampliação. O hero e as seções comerciais não foram redesenhados.

Não foram acrescentados movimentos de entrada, parallax ou coreografia de rolagem. A expansão das respostas é nativa e imediata; os movimentos existentes do hero e do menu continuam respeitando `prefers-reduced-motion`.

## Integração e manutenção

- Navegação principal: instalação, manutenção, aplicações, apresentação, dúvidas e orçamento. Atendimento e região também aparecem no menu compacto e no rodapé.
- O menu compacto passa a valer abaixo de 64rem para acomodar os novos destinos. CSS, script de navegação e afastamento das âncoras usam o mesmo limite. Desktop conserva cabeçalho sticky; tablet e celular usam cabeçalho no fluxo.
- Novas seções possuem título associado e destino focalizável. Ao navegar pelo menu compacto, o foco chega à seção e Tab continua a partir dela.
- As âncoras mantêm a query existente. A navegação não recria o estado comercial nem limpa o formulário. A geração, seleção, cópia e descarte do orçamento mantêm a implementação aprovada.
- Conteúdo e inventário fotográfico ficam em dados próprios, tipados. Os rascunhos de `src/data/content.ts` da fundação permanecem como referência histórica; as novas seções usam `editorial-content.ts`.
- Nenhuma dependência instalada. `package-lock.json` preservado. FAQ e créditos não acrescentam JavaScript de cliente. O único ajuste no script de navegação é o breakpoint.

## Arquivos criados

| Arquivo | Responsabilidade |
| --- | --- |
| `src/components/editorial/Applications.astro` | Três aplicações demonstrativas e composição assimétrica |
| `src/components/editorial/About.astro` | Posicionamento e princípios da marca fictícia |
| `src/components/editorial/Process.astro` | Lista ordenada e contextualização do percurso |
| `src/components/editorial/Coverage.astro` | Municípios e diagrama ilustrativo |
| `src/components/editorial/FAQ.astro` | Perguntas práticas com expansão nativa |
| `src/components/editorial/EditorialPhoto.astro` | Imagens responsivas, recortes, avisos e créditos |
| `src/data/editorial-content.ts` | Conteúdo publicado e navegação compartilhada |
| `src/data/editorial-media.ts` | Fotos, descrições, autoria, fontes e licenças |
| `src/assets/images/escritorio-aplicacao.jpg` | Nova referência de escritório |
| `src/assets/images/comercio-referencia.jpg` | Nova referência de pequeno comércio |
| `scripts/verify-editorial.mjs` | Integração, teclado, âncoras, modo sem JS e capturas |
| `docs/referencias/etapa-2.sha256.json` | Proteção de 32 arquivos comerciais e evidências anteriores |
| `docs/etapa-3.md` | Este registro de entrega |
| `docs/validacao/etapa-3/` | Capturas e relatórios desta etapa, sem sobrescrever as etapas 1 e 2 |

## Arquivos modificados

| Arquivo | Alteração |
| --- | --- |
| `src/pages/index.astro` | Composição das novas seções antes do orçamento e afastamento responsivo das âncoras |
| `src/components/layout/SiteHeader.astro` | Novos destinos e menu compacto a partir de 64rem |
| `src/components/layout/SiteFooter.astro` | Rodapé completo, marca, navegação, aviso e licenças |
| `src/scripts/navigation.ts` | Correspondência do breakpoint com o cabeçalho |
| `scripts/verify-commercial.mjs` | Verifica presença editorial no lugar da antiga ausência; salva resultados em `etapa-3/comercial/`. Cenários do orçamento preservados |
| `scripts/verify-foundation.mjs` | Salva a nova regressão em `etapa-3/fundacao/` |
| `package.json` | Comando `verify:editorial`; dependências inalteradas |
| `README.md` | Estado da entrega, comandos e evidências atuais |

## Fotografias, fontes e licenças

Curadoria e conferência das novas fontes em **06/11/2026**. Os dois downloads finais foram inspecionados visualmente. Imagens sem pessoas, com arquitetura legível e materiais em diálogo com a paleta. Não foi adicionado aparelho à fotografia do comércio; ela representa o contexto de uso, sem simular uma instalação existente.

| Uso | Fonte, autoria e licença | Arquivo local |
| --- | --- | --- |
| Apartamento | [Caroline Badran / Unsplash](https://unsplash.com/photos/BsHycOlU6Bg), página identificada como gratuita sob [Unsplash License](https://unsplash.com/license) | `residencia-referencia.jpg`, original da fundação preservado |
| Escritório | [Max Vakhtbovych / Pexels, 7534232](https://www.pexels.com/photo/modern-design-for-the-office-interior-7534232/), página identificada como gratuita sob [licença Pexels](https://www.pexels.com/license/) | `escritorio-aplicacao.jpg`, 1400 × 934 px |
| Pequeno comércio | [Vicky Tran / Pexels, 7541176](https://www.pexels.com/photo/interior-of-modern-cafe-with-tables-sofas-and-chairs-7541176/), página identificada como gratuita sob [licença Pexels](https://www.pexels.com/license/) | `comercio-referencia.jpg`, 1400 × 1050 px |
| Detalhe institucional | [Caroline Badran / Unsplash](https://unsplash.com/photos/ePhpXlJ6H2g), licença registrada na fundação em [recursos-visuais.md](recursos-visuais.md) | `escritorio-referencia.jpg`, original preservado; novo recorte por CSS |

Downloads novos: `https://images.pexels.com/photos/7534232/pexels-photo-7534232.jpeg?w=1400` e `https://images.pexels.com/photos/7541176/pexels-photo-7541176.jpeg?w=1400`.

As licenças consultadas permitem o uso das fotos neste site demonstrativo comercial, observadas suas restrições. Não se atribui endosso dos autores, arquitetos ou locais fotografados. Créditos e aviso aparecem junto a cada imagem; o rodapé oferece os links das licenças. O escritório da fundação já tinha registro de licença; sua página não retornou conteúdo na reconferência via ferramenta web desta etapa.

Archivo e Instrument Sans continuam hospedadas localmente, com `font-display: swap`, preload e arquivos SIL OFL 1.1 preservados. As licenças locais do rodapé respondem HTTP 200. Hero, manutenção e suas fontes permanecem documentados em [etapa-2.md](etapa-2.md).

## Validação

| Verificação | Resultado |
| --- | --- |
| `npm.cmd run check` | 38 arquivos; zero erros, avisos e hints |
| `npm.cmd run build` | Duas rotas estáticas; concluído com imagens AVIF/WebP/JPEG |
| `npm.cmd run test:quote` | Quatro testes aprovados |
| `npm.cmd run verify:references` | 25 arquivos de protótipos preservados por SHA-256 e inventário |
| `npm.cmd run verify:commercial` e `-- --edge` | Seis cenários por navegador; regressão comercial aprovada |
| `npm.cmd run verify:editorial` e `-- --edge` | Seis cenários por navegador; conteúdo, foco, âncoras, estado e modo sem JS aprovados |
| `npm.cmd run verify:foundation` e `-- --edge` | Seis cenários por navegador; prancha aprovada preservada |
| Capturas da prancha | As quatro capturas desktop/mobile são idênticas em bytes às originais da Etapa 1 |
| Integridade | 55 arquivos da fundação e 32 referências comerciais/evidências com hashes preservados |
| Contraste | Combinações de texto conferidas: de 4,55:1 a 10,02:1; botão principal 5,72:1 |

Telas verificadas no conjunto: 320, 390, 720, 820, 1024, 1440 e 1920px, além de texto em 200%. Sem rolagem horizontal. Fotos e fontes carregadas, imagens com alt e dimensões, IDs únicos, uma única h1, títulos e regiões nomeados, links internos para destinos existentes. Chrome 157 e Edge 156 em Windows, com emulação de viewport mobile.

Regressão do orçamento: serviço por setas, sincronização entre hero e formulário, URL válida/inválida, voltar/avançar, formulário inválido/válido, foco no primeiro erro e na prévia, geração, cópia permitida/negada por API simulada, mudança de serviço, invalidação por edição, limpeza ao sair/recarga, ausência de armazenamento persistente e fallback sem JavaScript. A navegação por todas as seções publicadas do rodapé preservou serviço, query, observações e mensagem gerada.

Revisão editorial: Enter e Espaço abrem/fecham dúvidas; Tab percorre os controles, inclusive com duas respostas abertas; foco visível e sem sobreposição pelo cabeçalho. Menu compacto fecha ao navegar e posiciona o foco no destino. FAQ continua funcional com scripts desabilitados. Nenhuma animação automática nas novas seções. Requisições observadas: somente GET locais, sem erros de execução ou respostas HTTP de erro.

O bundle de cliente mede **6.984 bytes**, **2.768 bytes em gzip**, sem runtime de framework. Todas as novas fotografias usam carregamento tardio e formatos responsivos. A ampliação do detalhe institucional tem `sizes` próprio para preservar nitidez. Essas verificações são evidências locais; não são uma medição de Core Web Vitals em produção.

### Revisão com as Skills

`frontend-design` aplicado ao planejamento de composição, implementação e crítica das capturas. `web-design-guidelines` aplicado à página inteira com a [fonte das regras consultada](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).

```text
src/components/editorial/EditorialPhoto.astro:9 - aprovado: dimensões geradas, alt, imagens responsivas e carregamento tardio
src/components/editorial/FAQ.astro:9 - aprovado: expansão semântica nativa, teclado, foco e ícone decorativo
src/components/editorial/Process.astro:9 - aprovado: percurso em lista ordenada com semântica explícita
src/components/editorial/Coverage.astro:11 - aprovado: municípios em lista e esquema decorativo com legenda
src/components/layout/SiteHeader.astro:33 - aprovado: menu responsivo compatível com os novos destinos
src/scripts/navigation.ts:6 - aprovado: breakpoint consistente com o CSS
src/components/layout/SiteFooter.astro:11 - aprovado: navegações nomeadas e destinos reais
src/components/layout/SiteFooter.astro:15 - aprovado: créditos expansíveis nativos e fontes acessíveis
```

Nenhum impedimento encontrado na revisão local. Regras editoriais genéricas foram adaptadas ao português e ao conceito C: títulos em caixa de frase e preservação das cores e tipografia aprovadas.

## Capturas

PNGs originais em escala 1, com 1440px de largura no desktop e 390px no mobile. Além das páginas completas, há capturas por seção para evitar depender de uma imagem longa reduzida pelo visualizador.

| Composição | Desktop | Mobile |
| --- | --- | --- |
| Página completa | [1440 × 9175](validacao/etapa-3/desktop-completo.png) | [390 × 12955](validacao/etapa-3/mobile-completo.png) |
| Hero preservado | [Abrir](validacao/etapa-3/inicio-desktop.png) | [Abrir](validacao/etapa-3/inicio-mobile.png) |
| Serviços preservados | [Abrir](validacao/etapa-3/servicos-desktop.png) | [Abrir](validacao/etapa-3/servicos-mobile.png) |
| Aplicações | [Abrir](validacao/etapa-3/aplicacoes-desktop.png) | [Abrir](validacao/etapa-3/aplicacoes-mobile.png) |
| A Entrear | [Abrir](validacao/etapa-3/entrear-desktop.png) | [Abrir](validacao/etapa-3/entrear-mobile.png) |
| Atendimento | [Abrir](validacao/etapa-3/atendimento-desktop.png) | [Abrir](validacao/etapa-3/atendimento-mobile.png) |
| Região | [Abrir](validacao/etapa-3/regiao-desktop.png) | [Abrir](validacao/etapa-3/regiao-mobile.png) |
| Dúvidas fechadas | [Abrir](validacao/etapa-3/duvidas-desktop.png) | [Abrir](validacao/etapa-3/duvidas-mobile.png) |
| Dúvida aberta | [Abrir](validacao/etapa-3/duvidas-abertas-desktop.png) | [Abrir](validacao/etapa-3/duvidas-abertas-mobile.png) |
| Orçamento | [Abrir](validacao/etapa-3/orcamento-desktop.png) | [Abrir](validacao/etapa-3/orcamento-mobile.png) |
| Mensagem gerada | [Abrir](validacao/etapa-3/comercial/orcamento-desktop.png) | [Abrir](validacao/etapa-3/comercial/orcamento-mobile.png) |
| Rodapé | [Abrir](validacao/etapa-3/rodape-desktop.png) | [Abrir](validacao/etapa-3/rodape-mobile.png) |

Relatórios: [editorial Chrome](validacao/etapa-3/verificacao-chrome.json), [editorial Edge](validacao/etapa-3/verificacao-edge.json), [comercial Chrome](validacao/etapa-3/comercial/verificacao-chrome.json), [comercial Edge](validacao/etapa-3/comercial/verificacao-edge.json), [integridade, contraste e recursos](validacao/etapa-3/integridade-e-recursos.json). A subpasta `fundacao/` contém os relatórios e capturas da prancha.

## Pontos conhecidos e reservados

- **Etapa 4:** avaliar e refinar a continuidade visual dos recortes fotográficos do hero, nos dois serviços e nas larguras intermediárias. A foto e as máscaras aprovadas não foram alteradas nesta etapa. A coreografia final de animações também permanece fora desta entrega.
- Chrome e Edge usam Chromium. Não houve execução em Safari, Firefox, dispositivos físicos ou leitor de tela. A árvore de acessibilidade foi inspecionada por CDP, o que não substitui um teste assistivo real.
- Não foi realizado Lighthouse ou medição de hospedagem. A cópia é testada por simulação da API, sem alterar a área de transferência pessoal.
- No celular a leitura é longa, com as três aplicações integralmente visíveis por rolagem e sem conteúdo escondido em carrossel. As capturas permitem avaliar essa escolha editorial.

Para revisar: `npm.cmd run dev` e `http://127.0.0.1:4321/`. Testar também `/?servico=manutencao#duvidas` e a navegação posterior ao orçamento.

**Commit sugerido, não executado:** `feat: completa experiência editorial demonstrativa da Entrear`.

Aguardar avaliação do proprietário antes de qualquer trabalho na Etapa 4.
