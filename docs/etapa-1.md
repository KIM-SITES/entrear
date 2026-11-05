# Entrega da Etapa 1 — fundação técnica e sistema visual

## Resultado

Astro com TypeScript estrito, sistema visual do conceito C, marca SVG com proporções documentadas, componentes base, conteúdos iniciais tipados e duas fotografias licenciadas organizadas. A rota `/` apresenta uma prancha de revisão da fundação.

O hero definitivo, as seções comerciais, o seletor de serviços, as animações e o fluxo de orçamento **não foram implementados**. A navegação visível pertence somente à prancha e aponta para destinos existentes.

## Arquivos criados

### Configuração

- `package.json`, `package-lock.json`, `.npmrc`, `astro.config.mjs`, `tsconfig.json`.
- `README.md`: execução, estrutura, comandos e limites da etapa.

### Aplicação

- `src/pages/index.astro`.
- `src/layouts/BaseLayout.astro`.
- `src/components/brand/BrandMark.astro` e `BrandLockup.astro`.
- `src/components/layout/Container.astro`.
- `src/components/ui/DemoNotice.astro` e `ActionLink.astro`.
- `src/components/media/ReferencePhoto.astro`.
- `src/components/foundation/FoundationGuide.astro`.
- `src/styles/tokens.css`, `fonts.css` e `global.css`.
- `src/types/content.ts`.
- `src/data/site.ts`, `content.ts`, `media.ts` e `design-system.ts`.

### Recursos e documentação

- `src/assets/brand/entrear-symbol.svg` e `public/favicon.svg`.
- Duas fotografias em `src/assets/images/`.
- Archivo, Instrument Sans e respectivas licenças em `public/fonts/`.
- `docs/sistema-visual.md`, `arquitetura.md`, `recursos-visuais.md` e este relatório.
- `docs/referencias/prototipos.sha256.json`.
- `scripts/verify-prototypes.mjs` e `scripts/verify-foundation.mjs`.
- Quatro capturas PNG e dois relatórios JSON em `docs/validacao/etapa-1/`.

Os arquivos de configuração e conteúdo preexistentes não foram modificados. `node_modules/`, `.astro/` e `dist/` são artefatos locais ignorados pelo `.gitignore` existente.

## Dependências

| Pacote direto | Versão | Função |
| --- | --- | --- |
| `astro` | 7.4.7 | Componentes, servidor local, build estático e imagens |
| `@astrojs/check` | 0.9.12 | Verificação de componentes Astro e tipos |
| `typescript` | 6.0.3 | Tipagem estrita compatível com o verificador |

A versão de TypeScript foi escolhida pela compatibilidade declarada, não pela maior versão disponível. Não foram adicionados React, Tailwind, GSAP, bibliotecas de ícones ou frameworks de teste. As verificações de navegador usam módulos nativos do Node e navegadores já instalados.

O npm audit executado durante a instalação não apontou vulnerabilidades: 266 pacotes auditados, incluindo dependências transitivas. Isso descreve o resultado daquela execução, não uma garantia permanente.

## Verificações executadas

| Verificação | Resultado |
| --- | --- |
| `npm run check` | 15 arquivos analisados; zero erros, avisos ou hints |
| `npm run build` | Sucesso; uma rota estática e variações de imagem geradas |
| Servidor de desenvolvimento | Página, fonte local e favicon responderam HTTP 200; processo encerrado após o teste |
| `npm run verify:references` | 25 arquivos e seus hashes SHA-256 preservados |
| Chrome | Seis cenários, sem falhas registradas |
| Edge | Seis cenários, sem falhas registradas |

Os cenários de navegador cobrem 1440 × 1000, 390 × 844, 320 × 740, 820 × 1180, viewport CSS de 720 × 450 e escala de raiz de 200% em largura de 390 px. A escala de raiz amplia texto e valores em rem; não equivale a um teste de zoom nativo de cada navegador.

Confirmados no build: fontes e imagens carregadas; descrições e dimensões de imagens; aviso demonstrativo; um h1; destinos válidos de âncoras; foco visível; navegação por Enter; municípios aprovados; paleta renderizada correspondente aos tokens; ausência de rolagem horizontal; viewport sem alargamento involuntário; duração de movimento reduzida a zero; ausência de animações, formulários comerciais e runtime JavaScript.

As imagens estavam marcadas como lazy antes da inspeção. Para as capturas integrais, o verificador solicita o carregamento de todas as imagens no DOM de teste, sem modificar o código-fonte.

O verificador também confirmou que a rota de protótipos não está disponível no build. Não houve alteração dos arquivos originais para executar os testes.

Foi aplicada a skill `web-design-guidelines` sobre os componentes disponíveis, com consulta às [diretrizes atuais](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md). Resultado da revisão das regras aplicáveis:

```text
src/layouts/BaseLayout.astro: sem pendências identificadas.
src/components/brand/BrandMark.astro: sem pendências identificadas.
src/components/brand/BrandLockup.astro: sem pendências identificadas.
src/components/ui/ActionLink.astro: sem pendências identificadas.
src/components/ui/DemoNotice.astro: sem pendências identificadas.
src/components/media/ReferencePhoto.astro: sem pendências identificadas.
src/components/foundation/FoundationGuide.astro: sem pendências identificadas após os refinamentos descritos abaixo.
```

## Revisão visual

Foram examinadas capturas reais da página completa em desktop e celular. O primeiro estudo mostrou duas necessidades de refinamento: manter a escala conjunta entre símbolo e palavra e reorganizar a paleta com a escala de leitura ampliada. Os componentes foram corrigidos e os seis cenários foram repetidos em ambos os navegadores.

A prancha evita se apresentar como site comercial finalizado. Ela permite avaliar os elementos que efetivamente estão sendo aprovados nesta etapa: marca, hierarquia, cores, intervalos e material fotográfico.

### Capturas

- [Desktop — viewport](validacao/etapa-1/desktop.png).
- [Mobile — viewport](validacao/etapa-1/mobile.png).
- [Desktop — página inteira](validacao/etapa-1/desktop-completo.png).
- [Mobile — página inteira](validacao/etapa-1/mobile-completo.png).

Relatórios: [Chrome](validacao/etapa-1/verificacao-chrome.json) e [Edge](validacao/etapa-1/verificacao-edge.json).

## Limites

Não houve teste em Safari, Firefox, leitores de tela ou aparelhos físicos. Chrome e Edge usam Chromium. Não há certificação WCAG nem medição de Core Web Vitals de campo. As verificações de acessibilidade desta etapa são parciais e proporcionais aos componentes base disponíveis.

A configuração inicial usa `noindex, nofollow`, sem domínio canônico fictício, telefone, endereço comercial ou dados estruturados de empresa real.

## Encerramento

Nenhum commit, push ou deploy foi realizado. A Etapa 2 depende de autorização após a revisão desta fundação.

**Mensagem sugerida:** `chore: estrutura projeto Astro e sistema visual da Entrear`.
