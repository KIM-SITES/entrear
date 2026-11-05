# Sistema visual Entrear — Etapa 1

## Direção

O conceito aprovado comunica conforto por meio de precisão, arquitetura e espaço negativo. Os vãos representam passagem e profundidade; não são uma simulação física do ar.

A prancha local permite revisar a identidade em HTML real. Ela é um instrumento de trabalho, não uma versão antecipada das oito seções do site.

## Cores e papéis

| Cor | Valor | Papel |
| --- | --- | --- |
| Azul-ardósia | `#253D4A` | Texto principal, marca e superfícies escuras |
| Cobre | `#A64B32` | Ações, escolhas e assinatura principal |
| Branco frio | `#EEF1F1` | Fundo e áreas de leitura |
| Cinza de leitura | `#50616B` | Texto complementar |
| Vidro | `#CEDBE0` | Apoio e demonstração de superfícies |
| Divisória | `#BEC9CE` | Separação editorial; não usar como único limite de campos |

Tokens de papel (`--text-primary`, `--action-background`, `--border-control`) referenciam as cores base. Isso evita atribuir valores arbitrários a cada futura seção. Cobre não será usado para textos pequenos sobre ardósia; a versão inversa da marca usa branco frio.

Contrastes de referência calculados entre cores sólidas:

- Ardósia sobre branco frio: aproximadamente **10,02:1**.
- Cinza de leitura sobre branco frio: aproximadamente **5,67:1**.
- Cobre sobre branco frio: aproximadamente **5,03:1**.
- Branco sobre cobre: aproximadamente **5,72:1**.

Esses valores não substituem a revisão de composições reais e estados de interação.

## Tipografia

- **Archivo, largura 85%, pesos 400–700:** marca e títulos. Títulos principais usam peso 500; a assinatura, 600.
- **Instrument Sans, pesos 400–700:** corpo, legendas e controles.
- Corpo base: `1rem`, entrelinha `1.6`, medida de leitura de até `65ch`.
- Texto de apoio: `0.9375rem`; legendas: `0.8125rem`.
- Títulos fluidos com `clamp()`, sem travar a altura dos blocos.
- Tracking da assinatura: `-0.045em`; títulos de destaque: `-0.035em`.

As fontes carregam localmente, com `font-display: swap`. O logotipo é tratado como imagem acessível por `role="img"`; sua escala é proporcional e independente da escala de leitura dos parágrafos.

## Construção do símbolo SVG

Fonte canônica: `src/assets/brand/entrear-symbol.svg`. O componente `BrandMark` importa esse arquivo diretamente, evitando versões divergentes do desenho.

| Elemento | Medida no desenho |
| --- | --- |
| Prancheta | `43 × 36` unidades |
| Primeiro vão | `x = 2…14`, `y = 3…33`; largura 12, altura 30 |
| Segundo vão | `x = 21…29`, `y = 8…28`; largura 8, altura 20 |
| Terceiro vão | `x = 35…40`, `y = 13…23`; largura 5, altura 10 |
| Traço | 2,6 unidades |
| Terminações e encontros | Retos: `butt` e `miter` |
| Respiro recomendado | Pelo menos 6 unidades além da prancheta |
| Redução mínima recomendada | 32 px de largura, preservando a proporção `43 / 36` |

As alturas seguem a relação **3:2:1**. Os três vãos permanecem abertos para o mesmo lado. Não rotacionar partes, arredondar cantos ou expandir o traço independentemente.

A malha exibida na prancha é um instrumento de construção: seus gradientes CSS desenham linhas ortogonais, não um fundo decorativo da identidade.

### Assinatura

O componente `BrandLockup` mantém a escala conjunta por `--brand-unit`:

- Símbolo: largura `43 × unidade`, altura determinada pela proporção.
- Intervalo entre símbolo e palavra: `13 × unidade`.
- Palavra Entrear: corpo `39 × unidade`.
- Intervalo entre palavra e descritor: `7 × unidade`.
- Descritor Climatização: corpo `11 × unidade`.

A unidade padrão é `1px`. O estudo ampliado usa uma unidade maior, sem alterar a relação símbolo/palavra. O favicon é uma derivação do mesmo desenho sobre uma prancheta de 48 × 48; o símbolo é transladado, não deformado.

## Espaçamento e composição

Base de 4 px, com escala de referência em 16 px de raiz: **4, 8, 12, 16, 24, 32, 48, 64, 96 e 128 px**. Os tokens usam `rem`, acompanhando a preferência de leitura.

Container de até 90 rem, gutters fluidos e seções com respiro adaptável. Os pontos de reorganização da prancha são 48 e 72 rem. Não fixar alturas de parágrafos ou forçar tudo a caber na primeira tela.

Divisórias organizam assuntos; áreas escuras criam contraste; fotografias mantêm seu contexto. Não criar uma família universal de cards ou aplicar a forma do símbolo a todas as imagens.

## Movimento preparado

| Token | Referência |
| --- | --- |
| Microinteração | 180 ms |
| Interface | 220 ms |
| Abertura | 420 ms |
| Revelação | 560 ms |

Curva padrão: `cubic-bezier(0.22, 0.61, 0.36, 1)`. Distâncias de referência: 0,5 rem e 1,5 rem. Em `prefers-reduced-motion: reduce`, todas as durações e distâncias tornam-se zero.

Não há animações de seção, recortes interativos ou lógica de orçamento nesta etapa. Os tokens apenas estabelecem o contrato para os componentes futuros.

## Refinamentos após renderização

O primeiro estudo ampliava o nome sem ampliar o símbolo na mesma proporção. Isso foi corrigido com a unidade conjunta da assinatura. A revisão de escala de raiz de 200% também motivou a reorganização automática das amostras de cor, o limite dos diagramas e a preservação da proporção do símbolo.

Essas mudanças respondem a coerência de marca e legibilidade; não alteram a direção C aprovada.
