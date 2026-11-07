# Recursos visuais e licenças

Inventário atualizado na Etapa 5, em **07/11/2026**. As duas imagens da fundação foram copiadas dos protótipos; as quatro acrescentadas nas etapas comerciais/editoriais foram obtidas no Pexels com fonte e licença registradas. Os seis arquivos locais originais foram preservados nesta revisão. A aplicação carrega fotografias e fontes localmente, sem requisições a esses provedores.

## Fotografias disponíveis

| Recurso | Arquivo | Origem |
| --- | --- | --- |
| Ambiente residencial com split e painel ripado | `src/assets/images/residencia-referencia.jpg` | [Caroline Badran / Unsplash](https://unsplash.com/photos/BsHycOlU6Bg) |
| Escritório com split e marcenaria clara | `src/assets/images/escritorio-referencia.jpg` | [Caroline Badran / Unsplash](https://unsplash.com/photos/ePhpXlJ6H2g) |
| Sala integrada com split, usada no hero | `src/assets/images/ambiente-horizontal.jpg` | [Max Vakhtbovych / Pexels](https://www.pexels.com/photo/contemporary-apartment-with-living-room-and-kitchen-7019013/) |
| Inspeção de unidade externa, usada em manutenção | `src/assets/images/manutencao-referencia.jpg` | [José Andrés Pacheco Cortes / Pexels](https://www.pexels.com/photo/man-repairing-an-aircon-5463580/) |
| Escritório compacto com split, aplicação demonstrativa | `src/assets/images/escritorio-aplicacao.jpg` | [Max Vakhtbovych / Pexels](https://www.pexels.com/photo/modern-design-for-the-office-interior-7534232/) |
| Cafeteria, contexto de pequeno comércio | `src/assets/images/comercio-referencia.jpg` | [Vicky Tran / Pexels](https://www.pexels.com/photo/interior-of-modern-cafe-with-tables-sofas-and-chairs-7541176/) |

As duas fotografias do Unsplash foram identificadas como gratuitas sob a [Unsplash License](https://unsplash.com/license) na pesquisa dos protótipos. O aparelho foi conferido visualmente. Não são recursos Unsplash+.

- Residência: 1800 × 2490 px; fonte original de A/B.
- Escritório: 1800 × 2442 px; fonte original do conceito C.
- Autora: Caroline Badran.
- A página da residência identifica arquitetura de Leticia Brandalise; a do escritório informa fotografia para Nova Marcenaria Brasileira. Nenhuma dessas partes é apresentada como cliente, colaboradora ou parceira da Entrear.
- A fotografia é referência de ambiente, nunca comprovação de um serviço realizado pela empresa fictícia.

As quatro fotografias do Pexels foram identificadas como gratuitas sob a [licença Pexels](https://www.pexels.com/license/). Ambas as licenças permitem o uso em websites comerciais, respeitadas suas restrições, inclusive ausência de endosso implícito. Nesta demonstração, imagens não comprovam execução, autoria de projetos, relação com equipe ou clientes da Entrear. A cafeteria representa um contexto de uso; não se afirma que exista aparelho ou solução técnica demonstrada nela.

Os cadastros tipados em `src/data/media.ts`, `commercial-media.ts` e `editorial-media.ts` acompanham as fotos com alt, autor, fonte, licença e aviso. `ReferencePhoto`, `EditorialPhoto` e `PhotoCredit` apresentam os dados pertinentes junto à imagem; licenças também ficam no rodapé. O detalhe institucional é um recorte da fotografia de escritório da fundação, sem novo recurso externo.

Astro gera AVIF, WebP e JPEG no build (84 variações na entrega final). A imagem do hero tem prioridade de carregamento; as demais usam carregamento tardio. A revisão ajustou somente o recorte CSS da imagem estacionária do hero e seus candidatos responsivos, sem editar o original ou gerar uma montagem de fotos desconexas.

Na conferência final de 07/11/2026, as duas páginas Unsplash e sua licença responderam HTTP 200 ao teste automatizado. As quatro páginas Pexels e sua licença responderam 403 a HEAD automatizado; puderam ser consultadas via navegação web e continuavam identificando autores, download gratuito e condições de uso. Essa diferença está documentada como limitação da checagem automática, não como link comprovadamente quebrado. [Registro HEAD](validacao/etapa-5/links-externos.json). A revisão não introduziu novos assets ou autores.

## Fontes locais

| Família | Arquivo | Licença preservada |
| --- | --- | --- |
| Archivo | `public/fonts/archivo.woff2` | `public/fonts/licenses/archivo-OFL.txt` |
| Instrument Sans | `public/fonts/instrument-sans.woff2` | `public/fonts/licenses/instrument-sans-OFL.txt` |

Os arquivos não foram editados. Archivo utiliza a distribuição de largura 85% e pesos 400–700; Instrument Sans, pesos 400–700. Ambos usam a SIL Open Font License 1.1.

- [Projeto Archivo](https://github.com/Omnibus-Type/Archivo) e [licença da distribuição](https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/OFL.txt).
- [Projeto Instrument Sans](https://github.com/Instrument/instrument-sans) e [licença da distribuição](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/OFL.txt).

O subconjunto disponibilizado contém os caracteres em português utilizados no site. Arquivos locais: Archivo 90.104 bytes e Instrument Sans 30.092 bytes, com preload e `font-display: swap`. Fraunces não foi copiada para a aplicação, pois pertence à direção B e não ao conceito aprovado.

## Marca e elementos próprios

O símbolo, sua versão de favicon e a composição são código SVG/HTML/CSS produzido para este projeto. O nome Entrear continua sendo a identidade de uma empresa fictícia; não foi realizada pesquisa de disponibilidade de marca.

As licenças e créditos das referências anteriores continuam disponíveis nos documentos originais de `prototipos/`, sem alteração.
