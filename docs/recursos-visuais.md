# Recursos visuais e licenças

Os arquivos foram **copiados**, sem alteração dos originais, da pasta de protótipos para a estrutura da aplicação. A prancha não faz requisições externas para fontes ou fotografias.

## Fotografias disponíveis

| Recurso | Arquivo | Origem |
| --- | --- | --- |
| Ambiente residencial com split e painel ripado | `src/assets/images/residencia-referencia.jpg` | [Caroline Badran / Unsplash](https://unsplash.com/photos/BsHycOlU6Bg) |
| Escritório com split e marcenaria clara | `src/assets/images/escritorio-referencia.jpg` | [Caroline Badran / Unsplash](https://unsplash.com/photos/ePhpXlJ6H2g) |

Ambas foram identificadas como gratuitas sob a [Unsplash License](https://unsplash.com/license) na pesquisa dos protótipos. O aparelho foi conferido visualmente. Não são recursos Unsplash+.

- Residência: 1800 × 2490 px; fonte original de A/B.
- Escritório: 1800 × 2442 px; fonte original do conceito C.
- Autora: Caroline Badran.
- A página da residência identifica arquitetura de Leticia Brandalise; a do escritório informa fotografia para Nova Marcenaria Brasileira. Nenhuma dessas partes é apresentada como cliente, colaboradora ou parceira da Entrear.
- A fotografia é referência de ambiente, nunca comprovação de um serviço realizado pela empresa fictícia.

O cadastro tipado em `src/data/media.ts` acompanha cada imagem com alt, fonte, licença e aviso. `ReferencePhoto` renderiza esses dados junto à fotografia. Astro gera variações AVIF, WebP e JPEG no build; os originais continuam preservados na aplicação e nos protótipos.

A curadoria de uma imagem horizontal para o hero e de uma referência de pequeno comércio permanece para as etapas em que esses conteúdos serão implementados. Não há preenchimento com imagens aleatórias ou fontes sem licença registrada.

## Fontes locais

| Família | Arquivo | Licença preservada |
| --- | --- | --- |
| Archivo | `public/fonts/archivo.woff2` | `public/fonts/licenses/archivo-OFL.txt` |
| Instrument Sans | `public/fonts/instrument-sans.woff2` | `public/fonts/licenses/instrument-sans-OFL.txt` |

Os arquivos não foram editados. Archivo utiliza a distribuição de largura 85% e pesos 400–700; Instrument Sans, pesos 400–700. Ambos usam a SIL Open Font License 1.1.

- [Projeto Archivo](https://github.com/Omnibus-Type/Archivo) e [licença da distribuição](https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/OFL.txt).
- [Projeto Instrument Sans](https://github.com/Instrument/instrument-sans) e [licença da distribuição](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentsans/OFL.txt).

O subconjunto disponibilizado contém os caracteres em português utilizados na prancha. Fraunces não foi copiada para a aplicação, pois pertence à direção B e não ao conceito aprovado.

## Marca e elementos próprios

O símbolo, sua versão de favicon e a composição da prancha são código SVG/HTML/CSS produzido para este projeto. O nome Entrear continua sendo a identidade de uma empresa fictícia; esta etapa não faz pesquisa de disponibilidade de marca.

As licenças e créditos das referências anteriores continuam disponíveis nos documentos originais de `prototipos/`, sem alteração.
