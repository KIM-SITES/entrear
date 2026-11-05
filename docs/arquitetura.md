# Arquitetura de desenvolvimento

## Escopo da fundação

A saída atual contém somente a prancha de revisão na rota `/`. `BaseLayout` estabelece o documento, os metadados, o link de pular conteúdo e slots de cabeçalho e rodapé. O hero comercial, a navegação definitiva e o formulário entram na Etapa 2.

Astro está configurado com `output: 'static'`. Não há adapter, endpoints, ilhas de framework ou JavaScript de cliente. O build não inclui `prototipos/`.

## Organização e responsabilidade

| Área | Responsabilidade |
| --- | --- |
| `src/layouts` | Documento HTML e composição externa |
| `src/components/brand` | Importação canônica do SVG e assinatura proporcional |
| `src/components/layout` | Container com largura, gutters e áreas seguras |
| `src/components/ui` | Aviso demonstrativo e link semântico de ação |
| `src/components/media` | Fotografia responsiva, alt e crédito |
| `src/components/foundation` | Conteúdo exclusivo da prancha de revisão |
| `src/data` | Conteúdo inicial e inventário de recursos |
| `src/types` | Contratos dos conteúdos e do futuro orçamento |
| `src/styles` | Tokens, fontes e base global |

Componentes de seções comerciais serão adicionados conforme sua etapa. Não foram criados arquivos vazios de hero, serviços ou contato.

## Dados iniciais

- `site.ts`: identidade, público, identificação demonstrativa, contato sem telefone e municípios ilustrativos **Cotia, Itapevi, Barueri e Jandira**.
- `content.ts`: dois serviços; três aplicações ilustrativas; apresentação; quatro etapas do atendimento; seis perguntas frequentes. São rascunhos de composição para revisão nas próximas etapas.
- `media.ts`: duas fotografias, suas descrições, créditos, fontes e licenças.
- `design-system.ts`: rótulos da prancha e referências da escala; os valores usados pelos componentes estão em `tokens.css`.

A aplicação de pequeno comércio tem `imageId: null` deliberadamente: não foi atribuído um asset não licenciado nem simulada a disponibilidade de uma fotografia. A seleção será feita antes de implementar essa aplicação na Etapa 3. A imagem horizontal do hero também será selecionada na revisão da Etapa 2.

Os tipos distinguem serviços, ambientes, municípios, mídias e seções. `QuoteDraft` reserva somente o serviço, o ambiente, o município e as observações; não implementa validação, armazenamento ou envio.

O estado de serviço e a sincronização com `?servico=` serão implementados na Etapa 2. Não há store, localStorage ou integração antecipada.

## Arquitetura de experiência aprovada

| Ordem | Seção | Composição prevista |
| --- | --- | --- |
| 1 | Hero | Título dominante, ação antes da fotografia no mobile e recortes relacionados aos três vãos |
| 2 | Serviços | Faixas editoriais de proporções distintas, sem cards equivalentes |
| 3 | Aplicações | Uma referência ampla e duas menores, sempre demonstrativas |
| 4 | A Entrear | Contraste azul-ardósia, texto claro e fotografia de detalhe |
| 5 | Atendimento | Lista ordenada de quatro etapas; horizontal ou vertical conforme a tela |
| 6 | Região | Municípios explícitos e diagrama ilustrativo |
| 7 | Dúvidas | Perguntas expansíveis em lista |
| 8 | Orçamento | Campos organizados e mensagem demonstrativa copiável |

### Wireframe estrutural desktop

```text
Marca              Navegação por âncoras             Orçamento

Título e serviços explícitos             Ação principal
Fotografia contínua / três vãos relacionados à marca
Escolha de serviço e orientação contextual

Serviços: faixas de informação com escalas diferentes

Aplicação principal                 Referências secundárias
Texto e detalhes ilustrativos       Texto e detalhes ilustrativos

Apresentação em superfície escura + detalhe fotográfico

Contato → Entendimento → Proposta → Agendamento e execução

Região ilustrativa                  Perguntas frequentes

Orientação do orçamento              Campos e prévia da mensagem

Aviso demonstrativo, créditos e navegação complementar
```

### Wireframe estrutural mobile

```text
Marca / acesso à navegação
Serviços explícitos
Título e público atendido
Ação de orçamento
Fotografia com recortes simplificados
Escolha de serviço

Serviços em sequência vertical
Aplicações em sequência, sem carrossel
Apresentação e fotografia
Etapas em lista vertical
Municípios ilustrativos
Perguntas frequentes
Orçamento e prévia
Rodapé e créditos
```

Esses desenhos documentam a arquitetura, não implementam as seções e não substituem a revisão visual das próximas etapas.

## Regras para as próximas etapas

- Renderizar links somente quando seus destinos existirem na prévia disponível.
- Manter dados e conteúdo fora dos componentes de apresentação.
- Usar o símbolo canônico; não copiar suas coordenadas para cada componente.
- Não transformar a prancha técnica atual em conteúdo do site voltado ao visitante.
- Nenhuma alegação de resultados, equipe, certificação ou execução real poderá ser adicionada ao conteúdo fictício.
- Cada etapa termina em revisão, verificações, capturas e sugestão de commit. A seguinte depende de autorização.
