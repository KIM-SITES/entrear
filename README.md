# Entrear Climatização

Website demonstrativo de uma empresa fictícia de climatização, baseado no **conceito C — Conforto tem medida**.

**Etapa atual: 1 de 5 — fundação técnica e sistema visual.** A página disponível é uma prancha interna de revisão da identidade, não o hero definitivo nem o site comercial completo.

## Executar no VS Code

Abra esta pasta no VS Code e use seu terminal integrado. Requisitos: Node.js **22.23.4 ou superior** e npm **9.6.5 ou superior**. Ambiente utilizado nesta etapa: Node 24.19.0 e npm 11.17.0.

```powershell
npm ci
npm run dev
```

Abra <http://127.0.0.1:4321/>. Encerre com `Ctrl+C`. As dependências já estão instaladas no workspace da entrega; `npm ci` serve para reinstalar a partir do lockfile em outro ambiente.

Se necessário para executar em um ambiente que bloqueia escrita de configurações do Astro fora do projeto, desative a telemetria somente no terminal atual:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor local com atualização durante o desenvolvimento |
| `npm run check` | Verificação de tipos TypeScript e componentes Astro |
| `npm run build` | Build estático e processamento das imagens em `dist/` |
| `npm run preview` | Visualização do último build, normalmente na porta 4321 |
| `npm run verify:references` | Confirma preservação dos 25 arquivos de `prototipos/` |
| `npm run verify:foundation` | Testa o build em Chrome local e gera capturas e relatório |
| `npm run verify:foundation -- --edge` | Executa a verificação no Edge sem substituir as capturas |

O verificador visual requer um build anterior, Chrome ou Edge instalado e permissão para processos de navegador e servidor localhost. Usa apenas módulos nativos do Node. `ENTREAR_BROWSER_PATH` permite informar outro caminho para um navegador compatível com Chrome DevTools Protocol.

## Estrutura

```text
src/
  assets/        símbolo original e fotografias licenciadas
  components/
    brand/       símbolo e assinatura Entrear
    foundation/  prancha de revisão desta etapa
    layout/      container de composição
    media/       fotografia com descrição e crédito
    ui/          aviso demonstrativo e link de ação
  data/          conteúdo inicial, cobertura, mídia e rótulos do sistema visual
  layouts/       documento HTML, metadados e slots de composição
  pages/         ponto de entrada Astro
  styles/        tokens, fontes e estilos globais
  types/         contratos dos dados e do futuro orçamento
public/          fontes locais, licenças e favicon
scripts/         verificações de preservação e navegador
docs/            arquitetura, identidade, recursos e validação
prototipos/      referências originais, integralmente preservadas
```

## Decisões técnicas

- Astro **7.4.7**, saída estática, sem adapter de servidor.
- TypeScript **6.0.3**, modo estrito; escolhido porque o verificador **@astrojs/check 0.9.12** declara compatibilidade com TypeScript 5 e 6, enquanto a versão mais recente consultada era 7.
- CSS próprio e componentes Astro, sem framework de interface ou biblioteca de animação.
- Duas fontes locais: Archivo e Instrument Sans.
- Imagens processadas no build com alternativas AVIF/WebP e fallback JPEG.
- Nenhum JavaScript entregue ao navegador nesta etapa; nenhum formulário de orçamento implementado.
- Sem backend, banco de dados, CMS, analytics ou requisições externas para carregar os recursos da página.

Os únicos pacotes diretos são `astro`, `@astrojs/check` e `typescript`; as demais entradas do lockfile são dependências transitivas dessas ferramentas.

## Conteúdo e referências

A região ilustrativa foi atualizada para **Cotia, Itapevi, Barueri e Jandira** em todos os dados ativos. O contato permanece configurado como demonstração, sem número de WhatsApp.

Os três protótipos, suas imagens, licenças, scripts e capturas permanecem intactos. A pasta não é copiada para `dist/` nem publicada pela aplicação. O arquivo de referência SHA-256 permite verificar inclusive adições ou exclusões inesperadas.

## Documentação da entrega

- [Sistema visual e proporções da marca](docs/sistema-visual.md)
- [Arquitetura, conteúdo e wireframes estruturais](docs/arquitetura.md)
- [Fotografias, fontes e licenças](docs/recursos-visuais.md)
- [Etapa 1: arquivos, validação e limites](docs/etapa-1.md)
- [Captura desktop completa](docs/validacao/etapa-1/desktop-completo.png)
- [Captura mobile completa](docs/validacao/etapa-1/mobile-completo.png)

A página de revisão usa `noindex, nofollow`. A aprovação da identidade não autoriza a implementação automática da etapa seguinte.

**Commit sugerido, não executado:** `chore: estrutura projeto Astro e sistema visual da Entrear`.
