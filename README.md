# Rendimentos BR

Plataforma para comparar rendimentos de produtos financeiros no Brasil e monitorar mercados globais.

- Monitor global em tempo real (S&P, Nasdaq, petróleo, ouro, crypto, taxas)
- Marquise de notícias financeiras ao vivo
- CDBs e contas remuneradas
- Fundos DI e Renda Fixa
- Tesouro Direto (Prefixado, IPCA+, Selic)
- Debêntures corporativas

Live em [rendimentos.com.br](https://rendimentos.com.br) — PWA instalável.

## Seções

| Seção (header) | Conteúdo |
|----------------|----------|
| 🌍 Mundo | Monitor global com índices, commodities, crypto + HOT US movers |
| 🇧🇷 BRL | CDBs, Poupança, Fundos DI |
| 🏛️ Títulos | Tesouro Direto (Prefixado, IPCA+, Selic) com scatter plots |
| 🏢 Debêntures | Debêntures corporativas com scatter plot |

## Fontes de dados

| Seção | Fonte | Atualização |
|-------|-------|-------------|
| Monitor Global | [Yahoo Finance](https://query1.finance.yahoo.com) v8/chart (intraday 5min) | Ao vivo |
| Notícias | [Google News RSS](https://news.google.com) (últimas 3h, finanças BR) | Ao vivo (cache 2min) |
| CDBs | Manual em `config.json` | Manual |
| Fundos DI | [CVM](https://dados.cvm.gov.br) via API ArgentinaDatos-style | Ao vivo |
| Tesouro Direto | [Tesouro Transparente](https://www.tesourotransparente.gov.br) API | Ao vivo |
| Cotações (ticker) | [BCB](https://api.bcb.gov.br) (CDI, SELIC) + Yahoo Finance (USD, Ibovespa, BTC) | Ao vivo |
| Debêntures | Config estática com dados de mercado | Manual |

## Estrutura

```
public/
  index.html         Página principal (4 seções: Mundo, BRL, Títulos, Debêntures)
  app.js             Lógica do frontend
  config.json        CDBs, fundos, debêntures
  styles.css         Estilos + dark/light mode
  manifest.json      PWA manifest
  sw.js              Service worker
  icons/             Ícones PWA (192x192, 512x512)
server.js            Servidor Express para desenvolvimento local
netlify/functions/
  bcb.js             Proxy BCB API → CDI, SELIC, IPCA, USD
  cotacoes.js        Ticker strip (USD, Ibovespa, Bitcoin, CDI, SELIC)
  fundos.js          Proxy CVM → fundos de investimento com TNA
  fundos-historico.js Dados históricos de fundos
  mundo.js           Proxy Yahoo Finance → índices, commodities, crypto
  hot-movers.js      Top 5 ações US com maior variação
  news.js            Proxy Google News RSS → notícias financeiras
  tesouro.js         Proxy Tesouro Transparente → títulos públicos
netlify.toml         Deploy config e redirects API
```

## Como rodar localmente

```bash
npm install
npm start
# http://localhost:8888
```

As Netlify functions (mundo, tesouro, news, etc.) só funcionam em produção. O server local serve config e BCB.

## Endpoints

| Rota | Descrição |
|------|-----------|
| `GET /api/mundo` | Monitor global: preços + sparklines intradiárias (Yahoo Finance) |
| `GET /api/hot-movers` | Top 5 ações US com maior variação do dia |
| `GET /api/news` | Notícias financeiras últimas 3h (Google News RSS) |
| `GET /api/config` | Config estática (CDBs, fundos, debêntures) |
| `GET /api/fundos` | Fundos DI com TNA calculada (proxy CVM) |
| `GET /api/fundos-historico` | Dados históricos de fundos |
| `GET /api/tesouro` | Títulos do Tesouro Direto (preços e taxas) |
| `GET /api/bcb` | Indicadores BCB (CDI, SELIC, IPCA, USD) |
| `GET /api/cotacoes` | Cotações para ticker strip |

## Features

### Monitor Global
Indicadores em tempo real com sparklines intradiárias: S&P 500, Nasdaq 100, Ibovespa, WTI, UST 10Y/30Y/5Y, Ouro, Prata, Cobre, Soja, Bitcoin, Ethereum + moedas. Click em qualquer card para gráfico ampliado. HOT section com as 5 ações US de maior variação.

### Notícias (marquise)
Faixa horizontal com as últimas notícias financeiras do Brasil. Atualiza a cada 2 minutos. Botão para fechar.

### CDBs e Poupança
Dados manuais em config.json. Cards com logo do banco, TNA, % do CDI. Gráfico de barras comparativo com gradiente de cor.

### Fundos DI
Dados da CVM. TNA anualizada calculada a partir da variação da cota. Cards com patrimônio líquido e data de referência.

### Tesouro Direto
Três sub-seções: Prefixado (LTN/NTN-F), IPCA+ (NTN-B), Selic (LFT). Tabelas com preço de compra/venda, taxa, vencimento. Scatter plots com curva de juros. Fallback para dados hardcoded quando API falha.

### Debêntures
Debêntures corporativas com dados de mercado. Scatter plot de taxa vs prazo.

### Outras features
- Dark/light mode com toggle (persiste em localStorage)
- PWA instalável (manifest + service worker)
- Cotações ao vivo no ticker strip (USD/BRL, Ibovespa, CDI, SELIC, BTC)
- Tabelas ordenáveis
- Responsive mobile

## Deploy

```bash
npx netlify deploy --prod
```
