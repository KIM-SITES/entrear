# Entrear — comparação de duas direções visuais

Dois protótipos independentes, limitados ao hero e à sua identificação como demonstração. Empresa e atendimento fictícios. Não há site completo, framework, instalação de dependências, integração de WhatsApp, coleta de dados ou publicação.

## Abrir no VS Code e no navegador

Abra a pasta do repositório no VS Code. No terminal integrado, a partir da raiz do repositório, execute:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory prototipos
```

- A — Conforto construído: <http://127.0.0.1:8000/conforto-construido.html>
- B — O ar desenha: <http://127.0.0.1:8000/o-ar-desenha.html>

Encerre o servidor com `Ctrl+C`. Se a porta estiver ocupada, substitua `8000` por `8001` no comando e nos endereços. Nenhuma extensão do VS Code é necessária. Os HTMLs também podem ser abertos diretamente no navegador, mantendo a pasta `assets` ao lado deles.

O botão “Pedir orçamento” exibe uma explicação local e acessível. Não abre WhatsApp nem envia mensagens.

## Capturas entregues

| Conceito | Desktop | Mobile |
| --- | --- | --- |
| A | [1440 × 900](capturas/conforto-construido-desktop.png) | [390 × 1001, página inteira](capturas/conforto-construido-mobile.png) |
| B | [1440 × 900](capturas/o-ar-desenha-desktop.png) | [390 × 844, página inteira](capturas/o-ar-desenha-mobile.png) |

Ambas as versões mobile foram renderizadas com viewport de **390 × 844**, escala de pixels 1. A captura A inclui a parte abaixo da primeira tela para permitir avaliar o hero inteiro. Não houve redução artificial do conteúdo para caber em uma única tela. As capturas usam movimento reduzido e aguardam carregamento das fontes e decodificação da fotografia.

## Comparação crítica dos resultados renderizados

| Critério | A — Conforto construído | B — O ar desenha |
| --- | --- | --- |
| Originalidade visual | Contida. O universo é familiar, mas a escala do título, o símbolo e a fotografia específica do equipamento evitam uma apresentação abstrata de arquitetura. | Mais autoral: título em dois alinhamentos, fotografia deslocada e desenho de fluxo formam uma composição própria. |
| Direção artística | Consistente com atenção à instalação e ao acabamento. Depende bastante da qualidade fotográfica. | Coerente entre marca, recorte da imagem e curvas. Precisa preservar a ligação com climatização para não se aproximar de uma marca de bem-estar. |
| Tipografia | Instrument Sans em escala grande; o título também identifica instalação. Menos diferenciada que a proposta B. | Fraunces traz maior personalidade e contraste com as informações em Instrument Sans. A frase principal é menos literal. |
| Composição | Foto dominante e eixo vertical de leitura estável. A estrutura dividida é mais convencional. | Título ocupa a largura; a segunda linha se desloca; fotografia inferior à esquerda e contato à direita. Não repete a estrutura dividida de A. |
| Fotografia | Mostra o aparelho com mais contexto e peso visual. | O mesmo aparelho permanece identificável, mas o recorte menor reduz o contexto do ambiente. |
| Identidade reconhecível | Símbolo estrutural, petróleo e desenho ortogonal. Discrição favorece confiança, mas reduz a assinatura à distância. | Símbolo de fluxo, violeta, serifada e faixas curvas formam uma assinatura mais evidente. |
| Clareza dos serviços | Mais forte: título e descrição explicitam instalação, além da linha de serviços. | Linha de instalação e manutenção permanece visível; o título precisa dessa informação complementar. |
| Impacto visual | Vem da escala, do contraste e da instalação integrada ao ambiente. | Vem da tipografia, da composição deslocada e da continuidade das curvas, mesmo com movimento desativado. |
| Experiência no celular | Contato mais cedo; foto depois do texto. Hero mais longo, com quatro linhas de título e parte da imagem abaixo da primeira tela. | Sequência título → imagem → contato. Mais compacto em 390 px; o botão aparece mais abaixo que em A. |
| Animações futuras | Potencial para explicar acabamento e instalação sobre a fotografia, se essa direção for escolhida. Não implementado nesta etapa. | Potencial de respostas do fluxo e mudanças de composição. Evitar tornar as curvas uma animação permanente. |

**Recomendação após a renderização:** A continua mais forte em clareza comercial e apresentação do serviço; B demonstra melhor uma identidade visual própria. Para um portfólio cuja prioridade seja diferenciação memorável, B ganhou força na comparação real. Para uma empresa que queira comunicar instalação e cuidado rapidamente, A exige menos interpretação. A escolha fica para avaliação do proprietário.

## Refinamentos realizados

- Conferida a fotografia em tamanho real: o split aparece nitidamente no alto do painel ripado. O mesmo arquivo é utilizado nos dois protótipos.
- Revisto o espaçamento dos títulos, inicialmente apertado demais.
- Reduzido o peso das faixas amarelas no celular.
- Recomposta a proposta B após a primeira renderização: a versão inicial repetia a lógica texto à esquerda/fotografia à direita de A.
- Retirado um slogan secundário que competia com a composição de B.
- Impedida a quebra de “ar-condicionado” no meio da expressão em B.
- Preservado o equipamento nos recortes de desktop, celular e telas intermediárias.

## Verificação

Verificação local em **5 de novembro de 2026**, com `frontend-design` na implementação e `web-design-guidelines` na revisão. Diretrizes consultadas: <https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md>.

Chrome e Microsoft Edge, em modo headless: 10 cenários por navegador, combinando os dois protótipos com viewports de 1440 × 900, 390 × 844, 320 × 740, 820 × 1180 e 720 × 450. O último verifica reflow com viewport CSS equivalente à metade de 1440 × 900; não é uma medição de ampliação apenas de texto.

Confirmados: ausência de erros JavaScript e assets HTTP com falha; fontes e imagem carregadas; um título principal por página; títulos dentro da composição; ausência de rolagem horizontal antes e depois da ação; link de pular conteúdo alcançável por Tab; foco visível; contato acionável por Enter; mensagem em região de status; ausência de animações em movimento reduzido; animações normais com duração finita.

Os resultados estruturados estão em `capturas/verificacao-chrome.json` e `capturas/verificacao-edge.json`. A análise visual também incluiu capturas auxiliares de tablet e reflow, mantidas apenas no diretório temporário de trabalho.

Revisão das diretrizes sobre os arquivos finais:

```text
prototipos/conforto-construido.html: verificado, sem pendências identificadas nas regras aplicáveis.
prototipos/o-ar-desenha.html: verificado, sem pendências identificadas nas regras aplicáveis.
```

Isso não constitui certificação de acessibilidade. Não foram testados Safari, Firefox, aparelhos físicos ou leitores de tela. Não foram coletados Core Web Vitals de campo. Chrome e Edge compartilham o motor Chromium.

Para repetir os testes com Node 22+ e os navegadores instalados nos caminhos convencionais do Windows:

```powershell
node prototipos/verificar.mjs
node prototipos/verificar.mjs --edge --sem-capturas
```

O script usa apenas módulos nativos, inicia seu próprio servidor local, salva as capturas do Chrome e encerra seus processos. Não instala pacotes nem usa o perfil pessoal do navegador.

## Limite desta entrega

Somente os dois protótipos e a documentação de avaliação foram criados. A implementação definitiva aguarda avaliação e autorização.

Sugestão de commit, **não executado**: `feat: cria dois protótipos visuais de hero para climatização`.
