# Entrear Climatização

Website demonstrativo de uma empresa fictícia, baseado no **conceito C — Conforto tem medida**.

**Etapa atual: 5 de 5 — validação e acabamento final, aguardando aprovação final.** Auditoria visual, editorial, técnica e de acessibilidade executada. Corrigidos enquadramento do hero, foco sob o cabeçalho, contraste da dica do formulário, legendas e reflow de texto ampliado. Orçamento e interações preservados. Sem commit, push ou deploy.

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
| `npm.cmd run verify:editorial` | Seções editoriais, âncoras, teclado e capturas no Chrome |
| `npm.cmd run verify:editorial -- --edge` | Mesmos cenários editoriais no Edge |
| `npm.cmd run verify:motion` | Estados do hero, inversões rápidas, resize e movimento reduzido no Chrome |
| `npm.cmd run verify:motion -- --edge` | Mesmos cenários de movimento no Edge |
| `npm.cmd run record:hero` | Vídeos WebM e sequências de quadros reais, sem instalar encoder |
| `npm.cmd run verify:foundation` | Regressão da prancha aprovada na nova rota |
| `npm.cmd run verify:foundation -- --edge` | Regressão da fundação no Edge |
| `npm.cmd run verify:final` | Seis larguras, teclado nos dois sentidos, contraste, reflow e zoom real em 200% no Chrome |
| `npm.cmd run verify:final -- --edge` | Auditoria final no Edge |
| `npm.cmd run measure:performance` | Três medições por perfil com CDP/PerformanceObserver; sem nota Lighthouse |

Os verificadores visuais requerem um build anterior concluído, Chrome ou Edge local e permissão para processos e servidor localhost. Usam módulos nativos do Node, sem dependências adicionais. `ENTREAR_BROWSER_PATH` aceita outro executável compatível com Chrome DevTools Protocol. Novas evidências ficam em `docs/validacao/etapa-5/`; as originais são preservadas. Os navegadores usam perfis descartáveis, inclusive para o zoom. Não execute o build enquanto um verificador estiver lendo `dist/`, nem outras suítes simultaneamente à medição de performance.

Abra [o visualizador de interações finais](docs/validacao/etapa-5/interacoes.html) no navegador para os vídeos desktop/mobile e os quadros extraídos. A reprodução é manual; a gravação tem taxa variável e não substitui a interação no site ao vivo.

## Estrutura

```text
src/
  assets/        símbolo e fotografias licenciadas
  components/
    brand/       marca original aprovada
    commercial/  hero, seletor, serviços e orçamento
    editorial/   aplicações, apresentação, atendimento, região e dúvidas
    foundation/  prancha original de revisão
    layout/      container, cabeçalho e rodapé
    media/       fotografia e créditos
    ui/          elementos da fundação
  data/          identidade, conteúdo e inventário de mídia
  layouts/       documento HTML e slots
  lib/           estado do serviço e regras do orçamento
  pages/         página comercial e /sistema-visual/
  scripts/       menu, seção atual, seleção e controle do formulário
  styles/        tokens, fontes e estilos globais aprovados
  types/         contratos dos conteúdos
public/          fontes locais, licenças e favicon
scripts/         testes e harness nativo do navegador
docs/            decisões, licenças, arquivos e validações
prototipos/      três referências preservadas
```

## Tecnologias e dados

Astro **7.4.7**, TypeScript **6.0.3** estrito, **@astrojs/check 0.9.12**, CSS próprio e JavaScript de cliente modular. Nenhuma dependência adicionada nesta etapa. A saída continua estática, sem backend, banco de dados, CMS, analytics ou recursos externos carregados pela página.

Archivo e Instrument Sans são locais. As fotos possuem alternativas AVIF/WebP e fallback JPEG. O hero tem prioridade de carregamento; imagens dos serviços e das seções editoriais usam carregamento tardio. Dúvidas e créditos usam expansão nativa, inclusive sem JavaScript. O hero usa uma fotografia imóvel e planos que abrem em 420/560ms; a preferência por movimento reduzido apresenta os estados imediatamente. Não há animações automáticas de seção ou loops.

O serviço aparece em `?servico=instalacao` ou `?servico=manutencao`. Ambiente, município e observações permanecem somente na memória/DOM da página e são descartados ao sair ou recarregar. Não há telefone, WhatsApp ou envio. A cópia usa a permissão do navegador; se negada, o texto fica selecionado para cópia manual.

Regiões ilustrativas: **Cotia, Itapevi, Barueri e Jandira**. Fotografias são referências, sem representar trabalhos, equipe ou clientes da Entrear. As páginas mantêm `noindex, nofollow`.

## Documentação e capturas

- [Etapa 5: auditoria, comparação, arquivos, testes e índice de todas as capturas](docs/etapa-5.md)
- [Execução e publicação estática futura](docs/publicacao-estatica.md)
- [Métricas reais e condições da medição local](docs/validacao/etapa-5/performance.json)
- [Interações finais, vídeos e sequências](docs/validacao/etapa-5/interacoes.html)
- [Hero desktop: instalação](docs/validacao/etapa-5/hero-instalacao-desktop.png) e [manutenção](docs/validacao/etapa-5/hero-manutencao-desktop.png)
- [Hero mobile: instalação](docs/validacao/etapa-5/hero-instalacao-mobile.png) e [manutenção](docs/validacao/etapa-5/hero-manutencao-mobile.png)
- [Desktop completo](docs/validacao/etapa-5/editorial/desktop-completo.png)
- [Mobile completo](docs/validacao/etapa-5/editorial/mobile-completo.png)
- [Orçamento desktop](docs/validacao/etapa-5/comercial/orcamento-desktop.png)
- [Orçamento mobile](docs/validacao/etapa-5/comercial/orcamento-mobile.png)
- [Entrega original da Etapa 4](docs/etapa-4.md)
- [Entrega original da Etapa 3 e licenças das fotografias](docs/etapa-3.md)
- [Entrega original da Etapa 2](docs/etapa-2.md)
- [Sistema visual e proporções da marca](docs/sistema-visual.md)
- [Planejamento e arquitetura originais](docs/arquitetura.md)
- [Inventário visual completo e licenças](docs/recursos-visuais.md)
- [Entrega original da Etapa 1](docs/etapa-1.md)

Os documentos das etapas anteriores registram o estado de cada entrega; a evolução atual está em `docs/etapa-5.md`. A auditoria usou WCAG 2.2 AA como referência, sem declarar conformidade completa. Chrome e Edge foram testados; Safari/Firefox, leitores de tela e dispositivos físicos permanecem fora das evidências. Lighthouse não estava disponível; a medição local por CDP não representa desempenho de produção.

**Commit sugerido, não executado:** `fix: conclui auditoria e acabamento final da Entrear`.

A Etapa 5 aguarda aprovação final. Publicação não executada.
