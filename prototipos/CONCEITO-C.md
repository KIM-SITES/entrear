# Conceito C — Conforto tem medida

Terceira interpretação de **Entrear Climatização**, independente dos dois layouts anteriores. O objeto desta etapa continua sendo somente o hero. A empresa é fictícia, o orçamento é uma demonstração e a fotografia não é apresentada como serviço executado pela marca.

## Visualizar e experimentar

No terminal integrado do VS Code, a partir da raiz do repositório:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory prototipos
```

Abra <http://127.0.0.1:8000/conceito-c.html>.

1. Observe a composição inicial de instalação.
2. Selecione **Manutenção**: as aberturas laterais se alinham, revelando mais da fotografia, e a orientação do atendimento muda.
3. Acione **Pedir orçamento**: aparece uma mensagem de exemplo correspondente ao serviço escolhido. Nenhuma mensagem é enviada.
4. Experimente alternar o serviço depois de abrir a prévia: a mensagem acompanha a nova escolha.
5. Recarregue ou compartilhe o endereço: `?servico=manutencao` preserva a seleção. Valores desconhecidos não são tratados como serviços.

O link de orçamento no cabeçalho leva ao atendimento dentro do próprio hero. Encerre o servidor com `Ctrl+C`.

## Direção artística e identidade

**Princípio: o ar é reconhecido pelo espaço que encontra para passar.** A assinatura não é uma linha de vento. São planos, intervalos e aberturas que se relacionam com a arquitetura e com as aletas de equipamentos.

- **Composição:** título horizontal dominante; fotografia contínua atravessando a página por aberturas de larguras e alturas diferentes; atendimento organizado em uma faixa funcional abaixo. Não há a divisão texto/foto de A nem o título diagonal com fotografia isolada de B.
- **Símbolo:** três vãos sucessivos, abertos e de tamanhos decrescentes. A intenção é sugerir passagem e profundidade. A primeira experiência com barras verticais foi descartada por lembrar um equalizador.
- **Tipografia:** Archivo em largura de 85% para a assinatura e os títulos; Instrument Sans para orientações e controles. A expressividade vem da largura, da escala e do espaço, sem a conotação editorial de luxo da serifada do B.
- **Paleta:** branco frio `#EEF1F1`, azul de ardósia `#253D4A`, cobre `#A64B32`, cinza de leitura `#50616B` e vidro `#CEDBE0`. O cobre marca ação e seleção, associado ao universo material da climatização. Não há gradientes, sombras ou efeitos de vidro.
- **Fotografia:** escritório com marcenaria e teto geométrico, com ar-condicionado visível. O recorte desktop privilegia arquitetura e equipamento; no celular, a proporção mostra também parte da bancada. A fotografia é diferente da utilizada em A/B; portanto, a comparação dos três avalia conjuntos de direção artística, não um teste isolado de layout.

O sistema pode futuramente organizar enquadramentos de aplicações, transições entre assuntos e materiais de apresentação. Esses desdobramentos não foram implementados, e a identidade permanece uma hipótese a validar, não uma marca comercial finalizada.

## Interação com finalidade comercial

A escolha do serviço altera o resumo do atendimento e prepara uma mensagem coerente com a necessidade. O alinhamento das aberturas é a resposta visual da marca a essa decisão.

O aparelho permanece visível nos dois estados. A imagem não se desloca, não muda de escala e não é fragmentada em fotografias independentes. Quatro planos de fundo se movem apenas por `transform`, com uma transição curta e interrompível. Não há animação automática ou repetição contínua.

Em movimento reduzido, os estados mudam imediatamente. A geometria é uma metáfora de marca, não simula fluxo físico, diagnóstico ou melhoria de desempenho do aparelho. Não são estimados potência, economia, preço ou prazo.

## Refinamentos após a renderização

- A primeira fotografia aproximava demais o equipamento no enquadramento horizontal. Foi substituída por uma fotografia de escritório com unidade proporcionalmente menor e mais referências arquitetônicas.
- O desenho simétrico inicial remetia a barras de áudio. O símbolo foi redesenhado como vãos e os recortes passaram a ter proporções assimétricas.
- As bordas das aberturas foram posicionadas para preservar o aparelho em desktop e celular.
- A adaptação mobile apresenta título em duas linhas, fotografia mais curta e atendimento em uma coluna. Não é uma redução proporcional da tela desktop.
- O foco dos rádios passou a envolver o rótulo inteiro, removendo a duplicação de contornos sem perder a indicação de teclado.
- O serviço selecionado passou a acompanhar o endereço, evitando perder a escolha em um recarregamento.

## Comparação crítica entre os três conceitos

| Critério | A — Conforto construído | B — O ar desenha | C — Conforto tem medida |
| --- | --- | --- | --- |
| Identidade visual | Sóbria e consistente, mas depende mais da fotografia. | A mais expressiva em cor e forma; aproxima-se de bem-estar e criação. | Identidade mais técnica, baseada em passagem, planos e intervalos. A associação dos vãos ao ar ainda precisa ser validada pelo público. |
| Originalidade | Menor: a divisão principal é conhecida. | Forte, sobretudo na tipografia deslocada. | Está no enquadramento e na resposta da geometria à seleção, sem depender de ilustração decorativa. |
| Clareza comercial | Continua sendo a mais direta: o título já fala de instalação. | Título metafórico exige complemento. | Instalação e manutenção aparecem no cabeçalho, na escolha e na fotografia; o título, sozinho, também é amplo. |
| Composição | Mais estável; a fotografia mantém mais contexto residencial. | Mais dinâmica e com maior surpresa. | Mais organizada e horizontal; a fotografia recortada cria ritmo, mas perde parte do contexto do ambiente. |
| Responsividade | Orçamento cedo, abertura mais longa. | A mais compacta entre as capturas em 390 px. | Hierarquia própria no celular; o contato principal vem depois da seleção e o cabeçalho oferece acesso direto. Não é a mais curta. |
| Interação comercial | Apenas prévia explicativa do orçamento. | Movimento gráfico breve e prévia explicativa. | Serviço, orientação e mensagem permanecem sincronizados; o movimento responde à escolha. |
| Viabilidade de site completo | A mais simples de expandir e manter. | Exige cuidado para não repetir curvas e competir com o conteúdo. | Boa base para um sistema de marca, mas exige critérios para recortar futuras fotografias sem esconder informação e para usar o motivo sem excesso. |

**Leitura após a implementação:** C equilibra melhor identidade e procedimento de atendimento. A continua superior em literalidade e contexto fotográfico, e B continua mais exuberante no primeiro impacto. C é um candidato para desenvolver uma marca de serviços profissionais, não um vencedor automático por ser o mais recente. A validação do proprietário deve preceder qualquer site definitivo.

## Capturas e verificação

- [Desktop: 1440 × 900](capturas/conceito-c-desktop.png).
- [Mobile: página inteira, 390 × 932](capturas/conceito-c-mobile.png), renderizada com viewport de 390 × 844.
- Estados de manutenção, tablet e reflow também foram examinados em capturas auxiliares no diretório temporário, sem substituir as capturas entregues.

Testes locais em Chrome e Edge, totalizando 10 cenários: 1440 × 900, 390 × 844, 320 × 740, 820 × 1180 e 720 × 450 por navegador. O último é um teste de reflow com viewport CSS reduzido à metade de 1440 × 900, não um teste de ampliação apenas de texto.

Verificados: carregamento da fotografia e das fontes; ausência de erros JavaScript e assets com HTTP de falha; títulos dentro da composição; ausência de rolagem horizontal nos estados inicial, manutenção e orçamento; skip link; foco de botão e rádios; seleção nativa por setas do teclado; orçamento por Enter; correspondência entre seleção, orientação e mensagem; persistência da seleção pelo endereço; transição normal com término; alinhamento final das aberturas; transições desativadas em movimento reduzido; alvos dos rótulos com pelo menos 44 px de altura.

Relatórios: `capturas/verificacao-conceito-c-chrome.json` e `capturas/verificacao-conceito-c-edge.json`.

Para repetir, com Node 22+ e os navegadores nos caminhos convencionais do Windows:

```powershell
node prototipos/verificar.mjs --conceito-c
node prototipos/verificar.mjs --conceito-c --edge --sem-capturas
```

O modo de teste de A/B continua sendo o padrão do script e não foi executado para sobrescrever suas capturas nesta etapa.

Revisão com `web-design-guidelines`, consultada em <https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md>:

```text
prototipos/conceito-c.html: regras aplicáveis revisadas, sem pendências identificadas.
```

No rádio, o contorno nativo é substituído por um contorno visível no rótulo completo quando `input:focus-visible` está ativo; essa substituição foi verificada com teclado.

Limites: não houve teste em Safari, Firefox, leitores de tela ou aparelhos físicos. Os dois navegadores testados usam Chromium. Não há certificação WCAG nem medição de Core Web Vitals de campo.

## Pesquisa e fontes

### Princípios consultados

- [Arup — Al Bahr Towers](https://www.arup.com/projects/al-bahr-towers/): sistema de sombreamento modular que abre e fecha. A pesquisa reforçou a ideia de comunicar condições ambientais por aberturas com função; não foram reproduzidas a geometria da fachada, imagens ou alegações de desempenho.
- [Daikin — Stylish](https://www.daikin.eu/en_us/product-group/air-to-air-heat-pumps/stylish.html): apresentação do equipamento em relação ao ambiente. A proposta evita converter essas referências em certificações ou especificações da empresa fictícia.
- [SiteInspire — arquitetura](https://www.siteinspire.com/websites/category/architecture) e [Herbst Architects](https://www.siteinspire.com/website/5390-herbst-architects): consulta de repertório de tipografia e composição. Não foram reutilizados recursos de terceiros.

### Fotografia utilizada no C

- Autora: **Caroline Badran**.
- Título: **Modern office with wooden desk and shelves**.
- [Página original e licença declarada](https://unsplash.com/photos/ePhpXlJ6H2g).
- A página registra fotografia para Nova Marcenaria Brasileira, publicada em 2 de março de 2026. Nenhuma dessas partes é apresentada como cliente ou parceira da Entrear.
- [Licença Unsplash](https://unsplash.com/license), gratuita, permitindo uso inclusive comercial; não é um asset Unsplash+.
- Arquivo local: `assets/escritorio-climatizado-c.jpg`, 1800 × 2442 pixels, 456066 bytes.
- [URL de obtenção](https://images.unsplash.com/photo-1772475385509-93fd87a2d4ba?auto=format&fit=max&fm=jpg&q=85&w=1800).
- Tratamento: redimensionamento no download, enquadramento responsivo e sobreposição de planos de fundo no navegador. O aparelho não foi acrescentado artificialmente.
- Licença e identificação do aparelho conferidas antes de selecionar a imagem. O crédito permanece visível. O ambiente não é apresentado como execução real da empresa fictícia.

As fotografias dos conceitos A/B e seus arquivos originais permanecem intactos. A alternativa descartada permaneceu apenas no diretório temporário.

### Tipografia e recursos autorais

- **Archivo**: Google Fonts, largura de 85% e pesos de 400 a 700. [CSS da distribuição](https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@85,400..700&display=swap), [projeto](https://github.com/Omnibus-Type/Archivo), [licença original](https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/OFL.txt). Arquivos `assets/fontes/archivo.woff2` e `assets/fontes/archivo-OFL.txt`, sem edição da fonte.
- **Instrument Sans**: arquivo e licença já documentados em [FONTES.md](FONTES.md), sem alteração.
- Símbolo dos vãos, enquadramentos e comportamento das aberturas desenhados em SVG/HTML/CSS para esta demonstração. Sem bibliotecas, dependências instaladas ou assets copiados dos sites pesquisados.

## Controle da etapa

Criados: HTML C, fotografia C, fonte Archivo com licença, esta documentação, duas capturas e dois relatórios. O verificador recebeu a opção `--conceito-c` e checks da interação. Os HTMLs A/B e suas capturas foram preservados; não houve configuração de framework, commit ou deploy.

Sugestão de commit, não executado: `feat: adiciona conceito de climatização com aberturas interativas`.

A implementação definitiva aguarda avaliação e aprovação.
