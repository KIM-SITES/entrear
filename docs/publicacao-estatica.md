# Execução e preparação para publicação estática

Este guia prepara a demonstração para uma publicação futura. **Não houve deploy, configuração de provedor ou criação de repositório remoto.**

## Executar localmente

Ambiente validado: Node 24.19.0 e npm 11.17.0. Requisitos registrados em `package.json`: Node >=22.23.4 e npm >=9.6.5. No terminal do VS Code, dentro da pasta do projeto:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir <http://127.0.0.1:4321/>; a prancha histórica está em <http://127.0.0.1:4321/sistema-visual/>. Encerrar com `Ctrl+C`. Em sistemas fora do Windows, usar `npm` em lugar de `npm.cmd`.

Para verificar a saída estática:

```powershell
npm.cmd run check
npm.cmd run test:quote
npm.cmd run verify:references
npm.cmd run build
npm.cmd run preview
```

O preview normalmente atende em <http://127.0.0.1:4321/>; conferir a porta anunciada no terminal. Ele serve para inspeção local, não é um servidor de produção.

Após o build, executar os verificadores documentados no README. `verify:final`, `verify:commercial`, `verify:editorial`, `verify:motion` e `verify:foundation` aceitam `-- --edge`. Chrome/Edge devem estar instalados; `ENTREAR_BROWSER_PATH` pode indicar um executável compatível com CDP. Os navegadores usam perfis temporários e servidor localhost. O teste de zoom altera somente a preferência desse perfil descartável. Não executar build enquanto as suítes leem `dist/`, nem concorrer outras medições com `measure:performance`.

As evidências regeneradas ficam em `docs/validacao/etapa-5/`. Se a configuração de segurança do ambiente impedir a escrita de telemetria fora da pasta, desabilitar somente no terminal atual:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

## O que publicar quando autorizado

Executar `npm.cmd ci` e `npm.cmd run build` no ambiente de publicação e enviar **somente o conteúdo de `dist/`** a uma hospedagem estática. Não publicar `node_modules`, fontes do projeto, `.git`, documentação de auditoria ou protótipos como se fossem arquivos do site. Não há backend, variáveis secretas, banco ou processo Node necessário para servir o resultado.

A configuração atual pressupõe a **raiz do domínio**, com `/` e `/sistema-visual/`, e diretórios com `index.html` (`trailingSlash: 'always'`). O host precisa servir esses caminhos e preservar `_astro/`, `fonts/`, `favicon.svg` e `robots.txt`. Não direcionar todos os caminhos desconhecidos para a página inicial: não se trata de uma SPA.

Hospedagem em subdiretório exige revisão específica de `base` no Astro **e** dos caminhos absolutos de fontes, favicon, licenças e navegação. Não basta copiar `dist/` para uma pasta interna e presumir que todos os links funcionarão.

No host escolhido, conferir HTTPS, UTF-8, MIME de AVIF/WebP/JPEG, JavaScript, CSS, SVG e WOFF2. Habilitar Brotli/gzip quando disponível. Recursos com hash em `_astro/` podem usar cache longo e `immutable`; HTML, `robots.txt` e recursos de nomes fixos devem admitir atualização/revalidação. As medições atuais usam um servidor local sem compressão e precisam ser refeitas no endereço publicado.

## Identificação e indexação

Manter visíveis **“Projeto demonstrativo · empresa fictícia”**, a origem ilustrativa das fotos, os créditos/licenças e a natureza simulada do orçamento. Cotia, Itapevi, Barueri e Jandira continuam sendo cenário ilustrativo. Não cadastrar endereço, telefone, WhatsApp, horário, avaliações, certificações, `LocalBusiness` ou cadastro em mapas como se a empresa existisse.

As duas páginas declaram **`noindex, nofollow`**. `robots.txt` permite rastreamento para que robôs possam ler essa metatag; bloquear toda a origem impediria essa leitura. Não configurar um cabeçalho do host que contradiga a política sem decisão explícita. `noindex` expressa preferência para buscadores, não protege conteúdo privado.

Título, descrição e Open Graph básico já identificam a demonstração. Antes de publicar, quando o destino real estiver definido:

1. Configurar o endereço real em `site` no Astro e derivar canonical/`og:url` para cada rota, se apropriado. Hoje eles estão ausentes para evitar um endereço fictício.
2. Preparar e verificar uma imagem social licenciada do próprio projeto; configurar URL absoluta de `og:image` e texto alternativo. Hoje não há imagem social definida.
3. Manter a prancha histórica sem indexação. Uma eventual mudança na indexação da página comercial deve ser decidida pelo proprietário; não foi autorizada nesta entrega. Não criar sitemap com domínio provisório ou inventado.
4. Abrir as rotas e âncoras no host, confirmar fontes/fotos, histórico do serviço, copiar/negativa de permissão, menu mobile e fallback sem JS. Checar a resposta 404 de caminhos inexistentes.
5. Repetir performance e compatibilidade no ambiente real, incluindo Safari/Firefox e dispositivos físicos. Validar leitura por tecnologia assistiva antes de fazer alegações amplas de acessibilidade.

O formulário gera uma mensagem local e não envia dados. A área de transferência depende de origem segura e permissão do navegador; o fallback para cópia manual permanece. Não conectar um serviço real sem uma decisão futura sobre dados, contato e operação.

Créditos e licenças continuam no rodapé, junto às fotografias e em `public/fonts/licenses/`. O [inventário visual](recursos-visuais.md) e o [relatório final](etapa-5.md) documentam as fontes e os limites dos testes. Publicação e alteração da política de indexação dependem de autorização posterior.
