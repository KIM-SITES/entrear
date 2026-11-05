# Entrear Climatização

Website demonstrativo de uma empresa fictícia, baseado no **conceito C — Conforto tem medida**.

**Etapa atual: 2 de 5 — núcleo comercial.** Cabeçalho responsivo, hero, instalação, manutenção e preparação local de mensagem de orçamento. As demais seções aguardam autorização.

## Executar no VS Code

Abra esta pasta e use o terminal integrado. Ambiente validado: Node **24.19.0** / npm **11.17.0**. Requisitos: Node **22.23.4 ou superior** e npm **9.6.5 ou superior**.

```powershell
npm.cmd run dev
```

Abra <http://127.0.0.1:4321/>. Encerre com `Ctrl+C`. A prancha aprovada continua em <http://127.0.0.1:4321/sistema-visual/>. Os três protótipos podem ser abertos pelos arquivos HTML em `prototipos/`.

As dependências já estão instaladas. Em outro ambiente, execute `npm.cmd ci` antes de iniciar. No Windows, `npm.cmd` funciona mesmo quando a política do PowerShell bloqueia `npm.ps1`. Em outros sistemas, use `npm`.

Se o ambiente impedir a escrita de configurações do Astro fora da pasta, desative a telemetria somente no terminal atual:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm.cmd run dev` | Desenvolvimento local |
| `npm.cmd run check` | Tipagem de TypeScript e componentes Astro |
| `npm.cmd run build` | Build estático e otimização de imagens |
| `npm.cmd run preview` | Visualização do último build |
| `npm.cmd run test:quote` | Regras do orçamento, estado e URL |
| `npm.cmd run verify:references` | Inventário e SHA-256 dos 25 arquivos de protótipos |
| `npm.cmd run verify:commercial` | Chrome, fluxo comercial e capturas |
| `npm.cmd run verify:commercial -- --edge` | Mesmos cenários no Edge |
| `npm.cmd run verify:foundation` | Regressão da prancha aprovada na nova rota |
| `npm.cmd run verify:foundation -- --edge` | Regressão da fundação no Edge |

Os verificadores visuais requerem um build anterior, Chrome ou Edge local e permissão para processos e servidor localhost. Usam módulos nativos do Node, sem dependências adicionais. `ENTREAR_BROWSER_PATH` aceita outro executável compatível com Chrome DevTools Protocol. Novas evidências ficam em `docs/validacao/etapa-2/`; as originais são preservadas.

## Estrutura

```text
src/
  assets/        símbolo e fotografias licenciadas
  components/
    brand/       marca original aprovada
    commercial/  hero, seletor, serviços e orçamento
    foundation/  prancha original de revisão
    layout/      container, cabeçalho e rodapé
    media/       fotografia e créditos
    ui/          elementos da fundação
  data/          identidade, conteúdo e inventário de mídia
  layouts/       documento HTML e slots
  lib/           estado do serviço e regras do orçamento
  pages/         página comercial e /sistema-visual/
  scripts/       navegação, seleção e controle do formulário
  styles/        tokens, fontes e estilos globais aprovados
  types/         contratos dos conteúdos
public/          fontes locais, licenças e favicon
scripts/         testes e harness nativo do navegador
docs/            decisões, licenças, arquivos e validações
prototipos/      três referências preservadas
```

## Tecnologias e dados

Astro **7.4.7**, TypeScript **6.0.3** estrito, **@astrojs/check 0.9.12**, CSS próprio e JavaScript de cliente modular. Nenhuma dependência adicionada nesta etapa. A saída continua estática, sem backend, banco de dados, CMS, analytics ou recursos externos carregados pela página.

Archivo e Instrument Sans são locais. As fotos possuem alternativas AVIF/WebP e fallback JPEG. O hero tem prioridade de carregamento; imagens dos serviços usam carregamento tardio.

O serviço aparece em `?servico=instalacao` ou `?servico=manutencao`. Ambiente, município e observações permanecem somente na memória/DOM da página e são descartados ao sair ou recarregar. Não há telefone, WhatsApp ou envio. A cópia usa a permissão do navegador; se negada, o texto fica selecionado para cópia manual.

Regiões ilustrativas: **Cotia, Itapevi, Barueri e Jandira**. Fotografias são referências, sem representar trabalhos, equipe ou clientes da Entrear. As páginas mantêm `noindex, nofollow`.

## Documentação e capturas

- [Etapa 2: arquivos, decisões, licenças, revisão e testes](docs/etapa-2.md)
- [Desktop completo](docs/validacao/etapa-2/desktop-completo.png)
- [Mobile completo](docs/validacao/etapa-2/mobile-completo.png)
- [Orçamento desktop](docs/validacao/etapa-2/orcamento-desktop.png)
- [Orçamento mobile](docs/validacao/etapa-2/orcamento-mobile.png)
- [Sistema visual e proporções da marca](docs/sistema-visual.md)
- [Planejamento e arquitetura originais](docs/arquitetura.md)
- [Recursos da fundação e suas licenças](docs/recursos-visuais.md)
- [Entrega original da Etapa 1](docs/etapa-1.md)

Os documentos da Etapa 1 registram o estado daquela entrega; a evolução atual está em `docs/etapa-2.md`.

**Commit sugerido, não executado:** `feat: implementa núcleo comercial e orçamento demonstrativo da Entrear`.

A Etapa 3 depende de avaliação e autorização explícita.
