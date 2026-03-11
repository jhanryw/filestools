const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const SUPPORTED_LANGS = ['en', 'pt', 'es'];
const TOOLS = [
  'image-compressor',
  'image-converter',
  'image-resizer',
  'pdf-splitter',
  'pdf-merger',
  'image-to-pdf',
];

app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true,
}));

// Serve src files (pages.js, main.js)
app.use('/src', express.static(path.join(__dirname, 'src'), {
  maxAge: '1h',
}));

// ── Redirecionamento Inteligente (SEO Friendly) ──────────────────────────
app.get('/', (req, res) => {
  const ua = req.headers['user-agent'] || '';
  const isBot = /googlebot|bingbot|yandex|baiduspider|twitterbot|facebookexternalhit/i.test(ua);

  // Se for o robô do Google, entrega o index.html direto, evitando o erro 301 no Search Console
  if (isBot) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }

  // Se for humano, detecta o idioma e redireciona (usando 302 Temporário)
  const acceptLang = req.headers['accept-language'] || '';
  let lang = 'en';
  if (acceptLang.includes('pt')) lang = 'pt';
  else if (acceptLang.includes('es')) lang = 'es';
  
  res.redirect(302, `/${lang}`);
});

// ── SPA routes: /:lang and /:lang/:tool and /:lang/blog/:slug ────────────
app.get('/:lang', (req, res, next) => {
  const { lang } = req.params;
  if (!SUPPORTED_LANGS.includes(lang)) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:lang/:tool', (req, res, next) => {
  const { lang, tool } = req.params;
  // Permite acesso se for um idioma suportado (ignora a validação restrita de TOOL no backend para flexibilidade)
  if (!SUPPORTED_LANGS.includes(lang)) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/:lang/blog/:slug', (req, res, next) => {
  const { lang } = req.params;
  if (!SUPPORTED_LANGS.includes(lang)) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Sitemap ──────────────────────────────────────────────────────────────
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'));
});

// ── Robots.txt ───────────────────────────────────────────────────────────
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(
`User-agent: *
Allow: /
Allow: /pt
Allow: /en
Allow: /es
Allow: /blog

Sitemap: https://dragndropp.com/sitemap.xml`
  );
});

// ── 404 fallback → SPA ───────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`DragNDropp running on http://localhost:${PORT}`);
});