// ═══════════════════════════════════════════════════════════════
//  DragNDropp — main.js  (v2 — Premium Build)
//  SPA router + SEO + Ads-Captivity modal + Rich UX
// ═══════════════════════════════════════════════════════════════

const GF = (() => {

  // ── Constants ──────────────────────────────────────────────
  const SITE_URL  = 'https://dragndropp.com';
  const LANGS     = ['en', 'pt', 'es'];
  const TOOL_IDS  = PAGES.TOOLS.map(t => t.id);
  const MIN_MODAL_MS = 4000; // Guaranteed ad exposure (ms)

  // ── DOM refs ───────────────────────────────────────────────
  const APP          = document.getElementById('app');
  const MODAL        = document.getElementById('processing-modal');
  const MODAL_COUNT  = document.getElementById('modal-countdown');
  const MODAL_TEXT   = document.getElementById('modal-text');
  const MODAL_PB     = document.getElementById('modal-progress');

  // ── State ──────────────────────────────────────────────────
  let state = {
    lang:     'en',
    page:     'home',
    blogSlug: null,
    files:    [],   // always a plain Array (never FileList)
    results:  [],
  };

  // Drag-sort tracking for PDF merger
  let _sortDragSrc = null;

  // ════════════════════════════════════════════════════════════
  //  ROUTER
  // ════════════════════════════════════════════════════════════
  function parseRoute() {
    const parts = window.location.pathname.replace(/^\//, '').split('/');
    const lang  = LANGS.includes(parts[0]) ? parts[0] : 'en';
    const seg1  = parts[1] || '';
    const seg2  = parts[2] || '';

    let page = 'home', blogSlug = null;
    if (seg1 === 'blog') {
      page     = seg2 ? 'blog-post' : 'blog';
      blogSlug = seg2 || null;
    } else if (TOOL_IDS.includes(seg1)) {
      page = seg1;
    }
    return { lang, page, blogSlug };
  }

  function navigate(path, push = true) {
    if (push) history.pushState({}, '', path);
    const route = parseRoute();
    state = { ...state, ...route, files: [], results: [] };
    updateSEO();
    updateLangButtons();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('popstate', () => navigate(window.location.pathname, false));

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href && href.startsWith('/') && !href.startsWith('//')) {
      e.preventDefault();
      navigate(href);
    }
  });

  // ════════════════════════════════════════════════════════════
  //  SEO UPDATER
  // ════════════════════════════════════════════════════════════
  function updateSEO() {
    const { lang, page, blogSlug } = state;
    const t = PAGES.i18n[lang];

    let title, description, canonicalPath;

    if (page === 'home') {
      title         = t.home.title;
      description   = t.home.description;
      canonicalPath = `/${lang}`;
    } else if (page === 'blog') {
      title         = t.blog.title;
      description   = t.blog.description;
      canonicalPath = `/${lang}/blog`;
    } else if (page === 'blog-post') {
      const post    = t.blog.posts.find(p => p.slug === blogSlug);
      title         = post ? `${post.title} | DragNDropp` : t.blog.title;
      description   = post ? post.excerpt : t.blog.description;
      canonicalPath = `/${lang}/blog/${blogSlug}`;
    } else {
      const tool    = t.tools[page];
      title         = tool.title;
      description   = tool.description;
      canonicalPath = `/${lang}/${page}`;
    }

    document.title = title;
    _setMeta('description', description);
    document.getElementById('canonical').href = `${SITE_URL}${canonicalPath}`;
    document.getElementById('og-title').content = title;
    document.getElementById('og-desc').content  = description;
    document.documentElement.lang = lang;

    LANGS.forEach(l => {
      const p = canonicalPath.replace(`/${lang}`, `/${l}`);
      document.getElementById(`hreflang-${l}`).href = `${SITE_URL}${p}`;
    });
    document.getElementById('hreflang-xd').href =
      `${SITE_URL}${canonicalPath.replace(`/${lang}`, '/en')}`;

    // Nav
    const navHome = document.getElementById('nav-home');
    const navBlog = document.getElementById('nav-blog');
    navHome.href = `/${lang}`; navHome.textContent = t.nav.home;
    navBlog.href = `/${lang}/blog`; navBlog.textContent = t.nav.blog;

    // Footer
    document.getElementById('footer-tagline').textContent = t.footerTagline;
    document.getElementById('footer-privacy').textContent = t.footerPrivacy;
    document.getElementById('footer-terms').textContent   = t.footerTerms;
    document.getElementById('footer-contact').textContent = t.footerContact;

    // Footer tool links
    const fl = document.getElementById('footer-tool-links');
    if (fl) {
      fl.innerHTML = PAGES.TOOLS.map(tool =>
        `<div><a href="/${lang}/${tool.id}" class="hover:text-brand">${t.tools[tool.id].label}</a></div>`
      ).join('');
    }

    // Schema.org update
    try {
      const schema = JSON.parse(document.getElementById('schema-ld').textContent);
      schema.name        = title;
      schema.description = description;
      schema.url         = `${SITE_URL}${canonicalPath}`;
      document.getElementById('schema-ld').textContent = JSON.stringify(schema);
    } catch (_) {}
  }

  function _setMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    el.content = content;
  }

  function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === state.lang;
      btn.classList.toggle('bg-brand',   active);
      btn.classList.toggle('text-white', active);
      btn.classList.toggle('text-slate-700', !active);
    });
  }

  function switchLang(lang) {
    const { page, blogSlug } = state;
    let path = `/${lang}`;
    if (page === 'blog')                  path = `/${lang}/blog`;
    else if (page === 'blog-post')        path = `/${lang}/blog/${blogSlug}`;
    else if (TOOL_IDS.includes(page))     path = `/${lang}/${page}`;
    navigate(path);
  }

  // ════════════════════════════════════════════════════════════
  //  RENDER DISPATCHER
  // ════════════════════════════════════════════════════════════
  function render() {
    const { lang, page, blogSlug } = state;
    const t = PAGES.i18n[lang];

    if (page === 'home')                return renderHome(t);
    if (page === 'blog')                return renderBlog(t);
    if (page === 'blog-post')           return renderBlogPost(t, blogSlug);
    if (TOOL_IDS.includes(page))        return renderTool(t, page);
    APP.innerHTML = `<p class="text-center text-slate-400 py-24 text-lg">404 – Page not found.</p>`;
  }

  // ════════════════════════════════════════════════════════════
  //  AD INJECTION (dynamic in-content slots for SPA pages)
  // ════════════════════════════════════════════════════════════
  function _loadInContentAd(containerId) {
    setTimeout(() => {
      const el = document.getElementById(containerId);
      if (!el) return;
      const isDesktop = window.innerWidth >= 728;
      const key = isDesktop
        ? '41512dc89917c57a2053a063cf8dce5c'   // 728×90
        : '817efae70c0653dd21c0c5c397849c6d';   // 320×50
      // Inline config script (runs synchronously before invoke.js)
      const cfg = document.createElement('script');
      cfg.textContent = `atOptions={'key':'${key}','format':'iframe','height':${isDesktop ? 90 : 50},'width':${isDesktop ? 728 : 320},'params':{}};`;
      el.appendChild(cfg);
      // Invoke.js reads atOptions immediately after
      const inv = document.createElement('script');
      inv.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
      el.appendChild(inv);
    }, 150);
  }

  // ════════════════════════════════════════════════════════════
  //  HOME PAGE  (gradient hero + stats + premium cards)
  // ════════════════════════════════════════════════════════════
  function renderHome(t) {
    const imageTools = PAGES.TOOLS.filter(x => x.category === 'image');
    const pdfTools   = PAGES.TOOLS.filter(x => x.category === 'pdf');

    const iconBg = {
      indigo:  'background:linear-gradient(135deg,#6366f1,#4f46e5)',
      violet:  'background:linear-gradient(135deg,#7c3aed,#6d28d9)',
      blue:    'background:linear-gradient(135deg,#3b82f6,#2563eb)',
      rose:    'background:linear-gradient(135deg,#f43f5e,#e11d48)',
      amber:   'background:linear-gradient(135deg,#f59e0b,#d97706)',
      emerald: 'background:linear-gradient(135deg,#10b981,#059669)',
    };

    const makeCards = tools => tools.map(tool => {
      const td = t.tools[tool.id];
      return `
        <a href="/${state.lang}/${tool.id}"
           class="tool-card block border border-slate-200 rounded-2xl p-5 cursor-pointer">
          <div class="tool-icon-box" style="${iconBg[tool.color]}">
            <span style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.3))">${tool.icon}</span>
          </div>
          <h3 class="font-bold text-slate-800 text-base mb-1">${td.label}</h3>
          <p class="text-sm text-slate-500 leading-snug">${td.subtitle}</p>
          <div class="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
            Try it free
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </a>`;
    }).join('');

    APP.innerHTML = `
      <!-- ░░ HERO ░░ -->
      <div class="hero-bg rounded-2xl p-8 md:p-12 mb-10 text-white text-center shadow-xl fade-in">
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold mb-5 text-white/90">
            🔒 100% Private &nbsp;·&nbsp; ⚡ Instant &nbsp;·&nbsp; 🆓 Always Free
          </div>
          <h1 class="text-4xl md:text-5xl font-black mb-3 leading-tight">${t.home.h1}</h1>
          <p class="text-indigo-200 text-lg mb-7">${t.home.subtitle}</p>
          <!-- Stats -->
          <div class="flex justify-center gap-6 md:gap-12">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-black">6</div>
              <div class="text-indigo-200 text-xs md:text-sm mt-0.5">${t.home.statsTools || 'Tools'}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-black">3</div>
              <div class="text-indigo-200 text-xs md:text-sm mt-0.5">${t.home.statsLangs || 'Languages'}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-black">0</div>
              <div class="text-indigo-200 text-xs md:text-sm mt-0.5">${t.home.statsUploads || 'Server Uploads'}</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-black">$0</div>
              <div class="text-indigo-200 text-xs md:text-sm mt-0.5">${t.home.statsCost || 'Cost'}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ░░ IMAGE TOOLS ░░ -->
      <section class="mb-10">
        <h2 class="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span class="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center text-sm">🖼️</span>
          ${t.home.categoryImage}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${makeCards(imageTools)}
        </div>
      </section>

      <!-- ░░ Ad: In-Home Leaderboard ░░ -->
      <div class="flex flex-col items-center py-3 my-2">
        <p class="text-xs text-slate-400 mb-2 uppercase tracking-widest">Advertisement</p>
        <div id="in-home-ad"></div>
      </div>

      <!-- ░░ PDF TOOLS ░░ -->
      <section class="mb-12">
        <h2 class="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
          <span class="w-7 h-7 bg-rose-100 rounded-lg flex items-center justify-center text-sm">📄</span>
          ${t.home.categoryPdf}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${makeCards(pdfTools)}
        </div>
      </section>

      <!-- ░░ WHY US ░░ -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${[
          { icon:'🔒', title: t.home.whyPrivate   || 'Private by Design',  desc: t.home.whyPrivateDesc   || 'Files stay on your device. Zero server uploads.' },
          { icon:'⚡', title: t.home.whyFast      || 'Lightning Fast',      desc: t.home.whyFastDesc      || 'Processing happens instantly in your browser.' },
          { icon:'🌍', title: t.home.whyGlobal    || 'Multilingual',        desc: t.home.whyGlobalDesc    || 'Available in English, Portuguese and Spanish.' },
          { icon:'🆓', title: t.home.whyFree      || 'Always Free',         desc: t.home.whyFreeDesc      || 'No hidden fees, no subscription, no account.' },
        ].map(w => `
          <div class="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div class="text-2xl mb-2">${w.icon}</div>
            <div class="font-bold text-slate-700 text-sm">${w.title}</div>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">${w.desc}</p>
          </div>`).join('')}
      </div>`;
    _loadInContentAd('in-home-ad');
  }

  // ════════════════════════════════════════════════════════════
  //  TOOL PAGE
  // ════════════════════════════════════════════════════════════
  function renderTool(t, toolId) {
    const td   = t.tools[toolId];
    const tool = PAGES.TOOLS.find(x => x.id === toolId);

    APP.innerHTML = `
      <div class="fade-in max-w-3xl mx-auto">

        <!-- Breadcrumb -->
        <nav class="text-sm text-slate-400 mb-5 flex items-center gap-1.5">
          <a href="/${state.lang}" class="hover:text-brand">${t.nav.home}</a>
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
          <span class="text-slate-600 font-medium">${td.label}</span>
        </nav>

        <!-- Title -->
        <div class="text-center mb-7">
          <div class="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg"
               style="background:linear-gradient(135deg,#6366f1,#7c3aed)">
            ${tool.icon}
          </div>
          <h1 class="text-3xl md:text-4xl font-black text-slate-800">${td.h1}</h1>
          <p class="text-slate-500 mt-2 text-base">${td.subtitle}</p>
        </div>

        <!-- ░░ Drop Zone ░░ -->
        <div id="drop-zone"
             class="rounded-2xl p-10 text-center cursor-pointer mb-4 bg-white shadow-sm"
             ondragover="GF.onDragOver(event)"
             ondragleave="GF.onDragLeave(event)"
             ondrop="GF.onDrop(event,'${toolId}')"
             onclick="document.getElementById('file-input').click()">
          <div id="dz-icon" class="text-5xl mb-3 transition-transform duration-200">📁</div>
          <p id="dz-main" class="font-semibold text-slate-700 mb-1">${t.dropText}</p>
          <p id="dz-sub"  class="text-sm text-slate-400">${t.dropSubtext}</p>
          <input type="file" id="file-input" class="hidden"
                 multiple
                 accept="${_getAccept(toolId)}"
                 onchange="GF.onFileSelect(event,'${toolId}')" />
        </div>

        <!-- ░░ File Preview Zone ░░ -->
        <div id="file-preview-zone" class="mb-4"></div>

        <!-- ░░ Tool Options ░░ -->
        <div id="tool-options" class="bg-white rounded-2xl border border-slate-200 p-5 mb-4 shadow-sm">
          ${buildToolOptions(toolId, t)}
        </div>

        <!-- ░░ Process Button ░░ -->
        <button id="process-btn"
                onclick="GF.processFiles('${toolId}')"
                class="w-full py-4 text-white font-bold rounded-2xl text-lg disabled:opacity-40 disabled:cursor-not-allowed"
                disabled>
          ${tool.icon} ${td.label}
        </button>

        <!-- ░░ Results ░░ -->
        <div id="results" class="mt-5 hidden"></div>

        <!-- ░░ Ad: In-Content Leaderboard ░░ -->
        <div class="flex flex-col items-center my-8">
          <p class="text-xs text-slate-400 mb-2 uppercase tracking-widest">Advertisement</p>
          <div id="in-tool-ad"></div>
        </div>

        <!-- ░░ Content (SEO) ░░ -->
        <div class="prose mt-10">
          ${renderHowTo(td)}
          ${renderFeatures(td)}
          ${renderFAQ(td)}
        </div>
      </div>`;
    _loadInContentAd('in-tool-ad');
  }

  // ── Options builder (unchanged logic, improved visual) ─────
  function buildToolOptions(toolId, t) {
    const td = t.tools[toolId];
    const inputCls = 'w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-slate-50';

    switch (toolId) {

      case 'image-compressor':
        return `
          <div class="flex justify-between mb-2">
            <label class="text-sm font-semibold text-slate-700">${td.options.quality}</label>
            <span class="text-sm font-bold text-brand" id="quality-val">75</span>
          </div>
          <input type="range" id="opt-quality" min="1" max="100" value="75"
                 class="w-full accent-brand h-2 rounded-full cursor-pointer"
                 oninput="GF.updateQualityLabel(this.value)" />
          <div class="flex justify-between text-xs text-slate-400 mt-1">
            <span>Smaller file</span>
            <span id="quality-hint" class="font-medium text-indigo-400">Great balance</span>
            <span>Best quality</span>
          </div>`;

      case 'image-converter':
        return `
          <label class="block text-sm font-semibold text-slate-700 mb-3">${td.options.format}</label>
          <div class="flex gap-3">
            ${[['image/jpeg','JPG','Smaller file, universal'],
               ['image/png', 'PNG','Lossless, supports transparency'],
               ['image/webp','WebP','Smallest size, modern format']].map(([mime, label, hint], i) => `
              <label class="flex-1 border-2 rounded-xl p-3 cursor-pointer transition-all hover:border-brand ${i===0?'border-brand bg-indigo-50':'border-slate-200'}
                            has-[:checked]:border-brand has-[:checked]:bg-indigo-50">
                <input type="radio" name="conv-format" value="${mime}" ${i===0?'checked':''} class="sr-only"
                       onchange="GF.onFormatChange(this)" />
                <div class="font-bold text-slate-800 text-sm">${label}</div>
                <div class="text-xs text-slate-400 mt-0.5">${hint}</div>
              </label>`).join('')}
          </div>`;

      case 'image-resizer':
        return `
          <div class="flex gap-2 mb-4">
            <button class="tab-btn active flex-1 px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200 transition-all"
                    id="tab-px" onclick="GF.switchResizeMode('px')">${td.options.byPixels}</button>
            <button class="tab-btn flex-1 px-3 py-2 rounded-xl text-sm font-semibold border border-slate-200 transition-all"
                    id="tab-pct" onclick="GF.switchResizeMode('pct')">${td.options.byPercent}</button>
          </div>
          <div id="resize-px" class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs font-semibold text-slate-600 mb-1 block">${td.options.width}</label>
              <input type="number" id="opt-width" placeholder="1920" class="${inputCls}" />
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600 mb-1 block">${td.options.height}</label>
              <input type="number" id="opt-height" placeholder="1080" class="${inputCls}" />
            </div>
          </div>
          <div id="resize-pct" class="hidden">
            <label class="text-xs font-semibold text-slate-600 mb-1 block">${td.options.percent}</label>
            <input type="number" id="opt-percent" placeholder="50" min="1" max="400"
                   class="${inputCls} w-36" />
          </div>
          <label class="flex items-center gap-2 mt-3 cursor-pointer group">
            <input type="checkbox" id="opt-ratio" checked class="w-4 h-4 accent-brand rounded" />
            <span class="text-sm font-medium text-slate-700 group-hover:text-brand">${td.options.keepRatio}</span>
          </label>`;

      case 'pdf-splitter':
        return `
          <label class="block text-sm font-semibold text-slate-700 mb-3">${td.options.mode}</label>
          <div class="flex flex-col gap-2">
            <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-brand bg-indigo-50 cursor-pointer has-[:checked]:border-brand">
              <input type="radio" name="split-mode" value="all" checked class="accent-brand"
                     onchange="document.getElementById('split-range-wrap').classList.add('hidden')" />
              <div>
                <div class="font-semibold text-sm">${td.options.allPages}</div>
                <div class="text-xs text-slate-500">Creates one PDF per page</div>
              </div>
            </label>
            <label class="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-brand">
              <input type="radio" name="split-mode" value="range" class="accent-brand"
                     onchange="document.getElementById('split-range-wrap').classList.remove('hidden')" />
              <div>
                <div class="font-semibold text-sm">${td.options.range}</div>
                <div class="text-xs text-slate-500">Extract specific page ranges</div>
              </div>
            </label>
          </div>
          <div id="split-range-wrap" class="hidden mt-3">
            <input type="text" id="opt-range" placeholder="${td.options.rangePlaceholder}"
                   class="${inputCls}" />
          </div>`;

      case 'pdf-merger':
        return `
          <div class="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <svg class="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            ${td.options.reorder}
          </div>
          <div id="file-order-list" class="space-y-2 min-h-[2rem]"></div>`;

      case 'image-to-pdf':
        return `
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label class="text-xs font-semibold text-slate-600 mb-1 block">${td.options.pageSize}</label>
              <select id="opt-pagesize" class="${inputCls}">
                <option value="a4">A4 (210×297 mm)</option>
                <option value="letter">Letter (216×279 mm)</option>
                <option value="auto">Auto (image size)</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600 mb-1 block">${td.options.fit}</label>
              <select id="opt-fit" class="${inputCls}">
                <option value="contain">${td.options.fitContain}</option>
                <option value="fill">${td.options.fitFill}</option>
                <option value="original">${td.options.fitOriginal}</option>
              </select>
            </div>
            <div>
              <label class="text-xs font-semibold text-slate-600 mb-1 block">${td.options.margin}</label>
              <input type="number" id="opt-margin" value="20" min="0" max="100" class="${inputCls}" />
            </div>
          </div>`;

      default: return '';
    }
  }

  // ════════════════════════════════════════════════════════════
  //  SEO CONTENT BLOCKS
  // ════════════════════════════════════════════════════════════
  function renderHowTo(td) {
    if (!td.howTo) return '';
    const steps = td.howTo.steps.map((s, i) =>
      `<li class="flex gap-3 items-start">
        <span class="shrink-0 w-7 h-7 bg-gradient-to-br from-brand to-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">${i+1}</span>
        <span class="pt-0.5">${s}</span>
       </li>`
    ).join('');
    return `<h2>${td.howTo.heading}</h2><ol class="space-y-3 list-none pl-0 mb-6">${steps}</ol>`;
  }

  function renderFeatures(td) {
    if (!td.features) return '';
    const items = td.features.map(f =>
      `<li class="flex items-start gap-2">
        <svg class="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
        </svg>
        ${f}
       </li>`
    ).join('');
    return `<h2>✨ Key Features</h2><ul class="list-none pl-0 space-y-2 mb-6">${items}</ul>`;
  }

  function renderFAQ(td) {
    if (!td.faq) return '';
    const items = td.faq.map(({ q, a }) =>
      `<details><summary>${q}</summary><p class="mt-3">${a}</p></details>`
    ).join('');
    return `<h2>❓ Frequently Asked Questions</h2><div class="space-y-2">${items}</div>`;
  }

  function _getAccept(toolId) {
    if (['pdf-splitter','pdf-merger'].includes(toolId)) return '.pdf,application/pdf';
    if (toolId === 'image-to-pdf') return 'image/jpeg,image/png,image/webp,image/gif';
    return 'image/jpeg,image/png,image/webp,image/gif';
  }

  // ════════════════════════════════════════════════════════════
  //  BLOG
  // ════════════════════════════════════════════════════════════
  function renderBlog(t) {
    const posts = t.blog.posts.map(p => `
      <article class="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
        <div class="flex items-center gap-2 mb-3">
          <time class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">${p.date}</time>
          <span class="text-xs text-brand font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">Guide</span>
        </div>
        <h2 class="text-xl font-bold text-slate-800 mb-2">
          <a href="/${state.lang}/blog/${p.slug}" class="hover:text-brand">${p.title}</a>
        </h2>
        <p class="text-slate-500 text-sm leading-relaxed">${p.excerpt}</p>
        <a href="/${state.lang}/blog/${p.slug}"
           class="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand hover:underline">
          Read more
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </article>`).join('');

    APP.innerHTML = `
      <div class="fade-in max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold text-slate-800 mb-2">${t.blog.h1}</h1>
        <p class="text-slate-500 mb-8">${t.blog.subtitle}</p>
        <div class="space-y-6">${posts}</div>
      </div>`;
  }

  function renderBlogPost(t, slug) {
    const post = t.blog.posts.find(p => p.slug === slug);
    if (!post) {
      APP.innerHTML = `<p class="text-center text-slate-400 py-16">Post not found.</p>`;
      return;
    }
    APP.innerHTML = `
      <div class="fade-in max-w-3xl mx-auto">
        <nav class="text-sm text-slate-400 mb-5 flex items-center gap-1.5">
          <a href="/${state.lang}" class="hover:text-brand">${t.nav.home}</a>
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
          <a href="/${state.lang}/blog" class="hover:text-brand">${t.nav.blog}</a>
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>
          <span class="text-slate-600 truncate">${post.title}</span>
        </nav>
        <time class="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">${post.date}</time>
        <h1 class="text-3xl font-extrabold text-slate-800 mt-3 mb-6">${post.title}</h1>
        <div class="prose">${post.content}</div>
      </div>`;
  }

  // ════════════════════════════════════════════════════════════
  //  DRAG & DROP
  // ════════════════════════════════════════════════════════════
  function onDragOver(e) {
    e.preventDefault();
    const dz = document.getElementById('drop-zone');
    dz.classList.add('drag-over');
    document.getElementById('dz-icon').style.transform = 'scale(1.2)';
  }

  function onDragLeave(e) {
    // Only fire if leaving the zone entirely (not entering a child)
    if (!document.getElementById('drop-zone').contains(e.relatedTarget)) {
      document.getElementById('drop-zone').classList.remove('drag-over');
      document.getElementById('dz-icon').style.transform = '';
    }
  }

  function onDrop(e, toolId) {
    e.preventDefault();
    const dz = document.getElementById('drop-zone');
    dz.classList.remove('drag-over');
    document.getElementById('dz-icon').style.transform = '';
    handleFiles(Array.from(e.dataTransfer.files), toolId);
  }

  function onFileSelect(e, toolId) {
    handleFiles(Array.from(e.target.files), toolId);
    // Reset input so same files can be re-selected
    e.target.value = '';
  }

  function handleFiles(newFiles, toolId) {
    if (!newFiles.length) return;
    // Merge with existing files instead of replacing
    state.files = [...state.files, ...newFiles];

    const btn = document.getElementById('process-btn');
    if (btn) btn.disabled = false;

    _renderDropZoneFeedback(toolId);
    renderFilePreviewZone(toolId);

    // Hide old results when new files added
    const res = document.getElementById('results');
    if (res) res.classList.add('hidden');
  }

  function removeFile(idx, toolId) {
    state.files.splice(idx, 1);
    const btn = document.getElementById('process-btn');
    if (btn) btn.disabled = state.files.length === 0;
    renderFilePreviewZone(toolId);
    _renderDropZoneFeedback(toolId);
  }

  function _renderDropZoneFeedback(toolId) {
    const dz   = document.getElementById('drop-zone');
    const icon = document.getElementById('dz-icon');
    const main = document.getElementById('dz-main');
    const sub  = document.getElementById('dz-sub');
    if (!dz) return;

    const t = PAGES.i18n[state.lang];
    const n = state.files.length;

    if (n > 0) {
      dz.classList.add('has-files');
      icon.textContent = '➕';
      main.textContent = t.addMoreBtn;
      sub.textContent  = `${n} file${n !== 1 ? 's' : ''} selected`;
    } else {
      dz.classList.remove('has-files');
      icon.textContent = '📁';
      main.textContent = t.dropText;
      sub.textContent  = t.dropSubtext;
    }
  }

  // ════════════════════════════════════════════════════════════
  //  FILE PREVIEW ZONE (rich thumbnails + sortable PDF list)
  // ════════════════════════════════════════════════════════════
  function renderFilePreviewZone(toolId) {
    const zone = document.getElementById('file-preview-zone');
    if (!zone || !state.files.length) { if (zone) zone.innerHTML = ''; return; }

    if (toolId === 'pdf-merger') {
      _renderSortablePDFList(zone, toolId);
    } else if (toolId === 'image-to-pdf') {
      _renderImageGrid(zone, toolId);
      _syncImageOrderList(); // also update old options div if needed
    } else if (['image-compressor','image-converter','image-resizer'].includes(toolId)) {
      _renderImageGrid(zone, toolId);
    } else {
      // pdf-splitter: just show filename card
      _renderSimpleFileList(zone, toolId);
    }
  }

  function _renderImageGrid(zone, toolId) {
    zone.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
        ${state.files.map((f, i) => {
          const url  = URL.createObjectURL(f);
          const size = _fmtBytes(f.size);
          return `
            <div class="preview-card relative rounded-xl overflow-hidden border-2 border-slate-200 bg-white group"
                 data-obj-url="${url}">
              <img src="${url}" alt="${f.name}"
                   class="w-full h-28 object-cover"
                   onload="URL.revokeObjectURL(this.src)" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <button onclick="GF.removeFile(${i},'${toolId}')"
                      class="remove-btn absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-bold flex items-center justify-center shadow-md transition-colors z-10">
                ×
              </button>
              <div class="absolute bottom-0 left-0 right-0 p-2">
                <p class="text-white text-xs font-medium truncate">${f.name}</p>
                <p class="text-white/70 text-xs">${size}</p>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function _renderSimpleFileList(zone, toolId) {
    zone.innerHTML = `
      <div class="space-y-2">
        ${state.files.map((f, i) => `
          <div class="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
            <span class="text-2xl shrink-0">📄</span>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-slate-700 truncate text-sm">${f.name}</p>
              <p class="text-xs text-slate-400">${_fmtBytes(f.size)}</p>
            </div>
            <button onclick="GF.removeFile(${i},'${toolId}')"
                    class="w-7 h-7 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors text-base">
              ×
            </button>
          </div>`).join('')}
      </div>`;
  }

  function _renderSortablePDFList(zone, toolId) {
    zone.innerHTML = `
      <div id="file-order-list" class="space-y-2">
        ${state.files.map((f, i) => `
          <div class="sortable-item flex items-center gap-3 bg-white border-2 border-slate-200 rounded-xl px-4 py-3 select-none"
               draggable="true" data-idx="${i}">
            <!-- Drag handle -->
            <div class="text-slate-300 shrink-0 cursor-grab flex flex-col gap-0.5">
              <span class="block w-4 h-0.5 bg-current rounded"></span>
              <span class="block w-4 h-0.5 bg-current rounded"></span>
              <span class="block w-4 h-0.5 bg-current rounded"></span>
            </div>
            <!-- PDF icon -->
            <div class="w-10 h-10 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center text-red-500 text-xl shrink-0">📄</div>
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="font-medium text-slate-700 truncate text-sm">${f.name}</p>
              <p class="text-xs text-slate-400">${_fmtBytes(f.size)}</p>
            </div>
            <!-- Order badge -->
            <span class="w-6 h-6 bg-indigo-100 text-brand text-xs font-bold rounded-full flex items-center justify-center shrink-0">${i+1}</span>
            <!-- Remove -->
            <button onclick="GF.removeFile(${i},'${toolId}')"
                    class="w-7 h-7 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors text-base shrink-0">
              ×
            </button>
          </div>`).join('')}
      </div>`;

    _setupSortable('file-order-list', toolId);
  }

  function _syncImageOrderList() {
    // The image-to-pdf has its old #image-order-list inside options
    const el = document.getElementById('image-order-list');
    if (!el) return;
    el.innerHTML = '';
    state.files.forEach((f, i) => {
      const url = URL.createObjectURL(f);
      const div = document.createElement('div');
      div.className = 'relative w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-200';
      div.innerHTML = `<img src="${url}" class="w-full h-full object-cover" alt="${f.name}" onload="URL.revokeObjectURL(this.src)" />
        <span class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-0.5">${i+1}</span>`;
      el.appendChild(div);
    });
  }

  // ── Sortable drag-to-reorder ────────────────────────────────
  function _setupSortable(containerId, toolId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll('[data-idx]').forEach(item => {

      item.addEventListener('dragstart', e => {
        _sortDragSrc = item;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => item.classList.add('dragging'), 0);
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        container.querySelectorAll('.drag-over-top,.drag-over-bottom')
          .forEach(el => el.classList.remove('drag-over-top','drag-over-bottom'));
      });

      item.addEventListener('dragover', e => {
        e.preventDefault();
        if (item === _sortDragSrc) return;
        container.querySelectorAll('.drag-over-top,.drag-over-bottom')
          .forEach(el => el.classList.remove('drag-over-top','drag-over-bottom'));
        const mid = item.getBoundingClientRect().top + item.offsetHeight / 2;
        item.classList.add(e.clientY < mid ? 'drag-over-top' : 'drag-over-bottom');
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('drag-over-top','drag-over-bottom');
      });

      item.addEventListener('drop', e => {
        e.preventDefault();
        if (item === _sortDragSrc) return;
        item.classList.remove('drag-over-top','drag-over-bottom');

        const srcIdx = parseInt(_sortDragSrc.dataset.idx);
        const tgtIdx = parseInt(item.dataset.idx);
        const mid    = item.getBoundingClientRect().top + item.offsetHeight / 2;
        const before = e.clientY < mid;

        const arr    = [...state.files];
        const [moved]= arr.splice(srcIdx, 1);
        const insertAt = srcIdx < tgtIdx
          ? (before ? tgtIdx - 1 : tgtIdx)
          : (before ? tgtIdx     : tgtIdx + 1);
        arr.splice(insertAt, 0, moved);
        state.files = arr;

        _renderSortablePDFList(document.getElementById('file-preview-zone'), toolId);
      });
    });
  }

  // ════════════════════════════════════════════════════════════
  //  ★ ADS CAPTIVITY MODAL  (guaranteed MIN_MODAL_MS exposure) ★
  // ════════════════════════════════════════════════════════════
  function _showModal() {
    MODAL_COUNT.textContent = '4';
    MODAL_COUNT.className   = 'text-7xl font-black text-brand leading-none mb-1';
    MODAL_TEXT.textContent  = '…';
    MODAL_PB.style.width    = '0%';
    MODAL.classList.remove('hidden');
    MODAL.classList.add('flex');
  }

  function _hideModal() {
    MODAL.classList.add('hidden');
    MODAL.classList.remove('flex');
  }

  /**
   * Animates the modal for exactly `duration` ms.
   * Shows 4→3→2→1 countdown + cycling phase messages.
   * Returns a Promise that resolves after duration.
   */
  function _animateModal(phases, duration = MIN_MODAL_MS) {
    return new Promise(resolve => {
      const start    = Date.now();
      let lastCount  = -1;

      const tick = setInterval(() => {
        const elapsed = Date.now() - start;
        const ratio   = Math.min(elapsed / duration, 1);

        // Progress bar
        MODAL_PB.style.width = (ratio * 100) + '%';

        // Countdown number 4→3→2→1
        const secsLeft = Math.ceil((duration - elapsed) / 1000);
        const count    = Math.max(1, Math.min(4, secsLeft));
        if (count !== lastCount) {
          lastCount = count;
          MODAL_COUNT.classList.remove('count-pop');
          // Force reflow to restart animation
          void MODAL_COUNT.offsetWidth;
          MODAL_COUNT.classList.add('count-pop');
          MODAL_COUNT.textContent = count;
          MODAL_COUNT.style.color = '';
        }

        // Phase messages
        const phaseIdx  = Math.min(Math.floor(ratio * phases.length), phases.length - 1);
        MODAL_TEXT.textContent = phases[phaseIdx];

        if (ratio >= 1) {
          clearInterval(tick);
          MODAL_PB.style.width = '100%';
          // Flash checkmark
          MODAL_COUNT.textContent = '✓';
          MODAL_COUNT.style.color = '#22c55e';
          MODAL_COUNT.classList.remove('count-pop');
          void MODAL_COUNT.offsetWidth;
          MODAL_COUNT.classList.add('count-pop');
          setTimeout(resolve, 350);
        }
      }, 40);
    });
  }

  // ════════════════════════════════════════════════════════════
  //  PROCESS DISPATCHER
  // ════════════════════════════════════════════════════════════
  async function processFiles(toolId) {
    if (!state.files.length) return;

    const t      = PAGES.i18n[state.lang];
    const phases = t.processingPhases || [
      'Analyzing your file…',
      'Optimizing for best quality…',
      'Applying algorithms…',
      'Finalizing your download…',
    ];

    _showModal();

    // Run processing and mandatory delay IN PARALLEL
    let results = [];
    const [procResult] = await Promise.all([
      _runProcessing(toolId),
      _animateModal(phases, MIN_MODAL_MS),
    ]);
    results = procResult || [];

    _hideModal();

    if (results.error) {
      _showError(results.message);
    } else {
      state.results = results;
      _renderResults(results, t);
    }
  }

  async function _runProcessing(toolId) {
    try {
      switch (toolId) {
        case 'image-compressor': return await _processCompress(state.files);
        case 'image-converter':  return await _processConvert(state.files);
        case 'image-resizer':    return await _processResize(state.files);
        case 'pdf-splitter':     return await _processSplitPDF(state.files);
        case 'pdf-merger':       return await _processMergePDF(state.files);
        case 'image-to-pdf':     return await _processImageToPDF(state.files);
        default: return [];
      }
    } catch (err) {
      console.error('[DragNDropp] Processing error:', err);
      return { error: true, message: err.message || 'An error occurred during processing.' };
    }
  }

  function _showError(msg) {
    const el = document.getElementById('results');
    el.innerHTML = `
      <div class="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-5 flex gap-3 items-start">
        <span class="text-2xl">⚠️</span>
        <div><p class="font-semibold mb-1">Processing failed</p><p class="text-sm">${msg}</p></div>
      </div>`;
    el.classList.remove('hidden');
  }

  // ════════════════════════════════════════════════════════════
  //  RESULTS RENDERER  (savings badge + green header)
  // ════════════════════════════════════════════════════════════
  function _renderResults(results, t) {
    const el = document.getElementById('results');

    const totalOriginal = results.reduce((a, r) => a + (r.originalSize || r.size), 0);
    const totalFinal    = results.reduce((a, r) => a + r.size, 0);
    const savings       = totalOriginal > 0
      ? Math.round((1 - totalFinal / totalOriginal) * 100)
      : 0;

    const rows = results.map(r => {
      const savePct = r.originalSize
        ? Math.round((1 - r.size / r.originalSize) * 100)
        : null;
      const badgeCls = savePct !== null && savePct > 0
        ? 'savings-badge-green' : 'savings-badge-gray';
      const badgeTxt = savePct !== null
        ? (savePct > 0 ? `↓ ${savePct}%` : '≈ same')
        : 'Converted';

      return `
        <div class="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-4 py-3 gap-3">
          <div class="min-w-0">
            <p class="text-sm font-medium text-slate-700 truncate">${r.name}</p>
            <p class="text-xs text-slate-400 mt-0.5">
              ${r.originalSize ? `${_fmtBytes(r.originalSize)} → ` : ''}${_fmtBytes(r.size)}
            </p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeCls}">${badgeTxt}</span>
            <button onclick="GF.downloadBlob('${r.url}','${r.name}')"
                    class="px-3 py-1.5 bg-brand text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              ${t.downloadBtn}
            </button>
          </div>
        </div>`;
    }).join('');

    // Success header
    const headerColor = savings > 0 ? 'bg-green-50 border-green-200' : 'bg-indigo-50 border-indigo-200';
    const headerTxt   = savings > 0 ? `🎉 Saved ${savings}% — ${_fmtBytes(totalOriginal - totalFinal)} smaller!` : '✅ Files processed successfully!';

    el.innerHTML = `
      <div class="fade-in">
        <div class="${headerColor} border rounded-xl px-4 py-3 mb-3 font-semibold text-sm text-slate-700">${headerTxt}</div>
        <div class="space-y-2">${rows}</div>
        ${results.length > 1 ? `
        <button onclick="GF.downloadAllZip()"
                class="mt-3 w-full py-3 border-2 border-brand text-brand font-bold rounded-xl text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          Download All as ZIP (${results.length} files)
        </button>` : ''}
        <button onclick="GF.resetTool()"
                class="mt-2 w-full py-2.5 text-slate-500 text-sm hover:text-slate-700 transition-colors">
          ${t.resetBtn}
        </button>
      </div>`;

    el.classList.remove('hidden');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Utilities ───────────────────────────────────────────────
  function _fmtBytes(b) {
    if (!b) return '—';
    if (b < 1024)          return b + ' B';
    if (b < 1024 * 1024)   return (b / 1024).toFixed(1) + ' KB';
    return (b / 1024 / 1024).toFixed(2) + ' MB';
  }

  function downloadBlob(url, name) {
    const a   = Object.assign(document.createElement('a'), { href: url, download: name });
    a.click();
  }

  async function downloadAllZip() {
    if (!state.results?.length) return;
    const zip = new JSZip();
    for (const r of state.results) {
      const blob = await fetch(r.url).then(res => res.blob());
      zip.file(r.name, blob);
    }
    const content = await zip.generateAsync({ type: 'blob', compression: 'STORE' });
    downloadBlob(URL.createObjectURL(content), 'dragndropp-output.zip');
  }

  function resetTool() {
    state.files   = [];
    state.results = [];
    const res = document.getElementById('results');
    if (res) res.classList.add('hidden');
    const zone = document.getElementById('file-preview-zone');
    if (zone) zone.innerHTML = '';
    const btn = document.getElementById('process-btn');
    if (btn) btn.disabled = true;
    const dz  = document.getElementById('drop-zone');
    if (dz) {
      dz.classList.remove('has-files','drag-over');
      const t = PAGES.i18n[state.lang];
      document.getElementById('dz-icon').textContent = '📁';
      document.getElementById('dz-main').textContent = t.dropText;
      document.getElementById('dz-sub').textContent  = t.dropSubtext;
    }
  }

  // ── Quality label helper (exposed) ─────────────────────────
  function updateQualityLabel(val) {
    document.getElementById('quality-val').textContent = val;
    const hint = document.getElementById('quality-hint');
    if (!hint) return;
    const v = parseInt(val);
    if (v < 40) hint.textContent = '⚠ Very small, visible loss';
    else if (v < 60) hint.textContent = 'Small file, some loss';
    else if (v < 80) hint.textContent = '✅ Great balance';
    else if (v < 92) hint.textContent = '🔹 High quality';
    else hint.textContent = '⭐ Maximum quality';
  }

  // ── Format radio highlight helper (exposed) ─────────────────
  function onFormatChange(input) {
    document.querySelectorAll('label:has([name="conv-format"])')
      .forEach(l => {
        l.classList.remove('border-brand','bg-indigo-50');
        l.classList.add('border-slate-200');
      });
    const lbl = input.closest('label');
    if (lbl) {
      lbl.classList.add('border-brand','bg-indigo-50');
      lbl.classList.remove('border-slate-200');
    }
  }

  // ════════════════════════════════════════════════════════════
  //  TOOL PROCESSORS
  // ════════════════════════════════════════════════════════════

  // ① Image Compressor
  async function _processCompress(files) {
    const q = parseInt(document.getElementById('opt-quality')?.value ?? 75) / 100;
    return Promise.all(files.map(f => _compressOne(f, q)));
  }

  function _compressOne(file, quality) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const cv  = document.createElement('canvas');
        cv.width  = img.naturalWidth;
        cv.height = img.naturalHeight;
        const ctx = cv.getContext('2d');
        // White background for non-PNG
        if (file.type !== 'image/png') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, cv.width, cv.height);
        }
        ctx.drawImage(img, 0, 0);
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const ext  = mime === 'image/png' ? '.png' : '.jpg';
        cv.toBlob(blob => {
          URL.revokeObjectURL(url);
          res({
            name:         file.name.replace(/\.[^.]+$/, '') + '-compressed' + ext,
            url:          URL.createObjectURL(blob),
            size:         blob.size,
            originalSize: file.size,
          });
        }, mime, quality);
      };
      img.onerror = rej;
      img.src = url;
    });
  }

  // ② Image Converter
  async function _processConvert(files) {
    const mime = document.querySelector('input[name="conv-format"]:checked')?.value ?? 'image/jpeg';
    return Promise.all(files.map(f => _convertOne(f, mime)));
  }

  function _convertOne(file, mimeOut) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const cv  = document.createElement('canvas');
        cv.width  = img.naturalWidth;
        cv.height = img.naturalHeight;
        const ctx = cv.getContext('2d');
        if (mimeOut === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, cv.width, cv.height);
        }
        ctx.drawImage(img, 0, 0);
        const extMap = { 'image/jpeg':'.jpg','image/png':'.png','image/webp':'.webp' };
        cv.toBlob(blob => {
          URL.revokeObjectURL(url);
          res({
            name: file.name.replace(/\.[^.]+$/, '') + (extMap[mimeOut] || '.jpg'),
            url:  URL.createObjectURL(blob),
            size: blob.size,
          });
        }, mimeOut, 0.92);
      };
      img.onerror = rej;
      img.src = url;
    });
  }

  // ③ Image Resizer
  async function _processResize(files) {
    const isPct   = !document.getElementById('resize-pct').classList.contains('hidden');
    const keepR   = document.getElementById('opt-ratio')?.checked ?? true;
    return Promise.all(files.map(f => _resizeOne(f, isPct, keepR)));
  }

  function _resizeOne(file, isPct, keepRatio) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        let w = img.naturalWidth, h = img.naturalHeight;

        if (isPct) {
          const pct = parseFloat(document.getElementById('opt-percent')?.value ?? 50) / 100;
          w = Math.round(w * pct);
          h = Math.round(h * pct);
        } else {
          const tw = parseInt(document.getElementById('opt-width')?.value  ?? 0);
          const th = parseInt(document.getElementById('opt-height')?.value ?? 0);
          if (tw && th && !keepRatio)   { w = tw; h = th; }
          else if (tw && keepRatio)     { h = Math.round(h * tw / w); w = tw; }
          else if (th && keepRatio)     { w = Math.round(w * th / h); h = th; }
          else if (tw)                  { w = tw; }
          else if (th)                  { h = th; }
        }

        const cv = document.createElement('canvas');
        cv.width = w; cv.height = h;
        cv.getContext('2d').drawImage(img, 0, 0, w, h);

        const mime = file.type || 'image/jpeg';
        const ext  = '.' + mime.split('/')[1].replace('jpeg','jpg');
        cv.toBlob(blob => {
          URL.revokeObjectURL(url);
          res({
            name:         file.name.replace(/\.[^.]+$/, '') + `-${w}x${h}${ext}`,
            url:          URL.createObjectURL(blob),
            size:         blob.size,
            originalSize: file.size,
          });
        }, mime, 0.92);
      };
      img.onerror = rej;
      img.src = url;
    });
  }

  // ④ PDF Splitter
  async function _processSplitPDF(files) {
    const { PDFDocument } = PDFLib;
    const file   = files[0];
    const buf    = await file.arrayBuffer();
    const srcDoc = await PDFDocument.load(buf);
    const total  = srcDoc.getPageCount();
    const mode   = document.querySelector('input[name="split-mode"]:checked')?.value ?? 'all';

    const groups = mode === 'all'
      ? Array.from({ length: total }, (_, i) => [i])
      : _parseRanges(document.getElementById('opt-range')?.value ?? '', total);

    const out = [];
    for (const idxs of groups) {
      const doc  = await PDFDocument.create();
      const pgs  = await doc.copyPages(srcDoc, idxs);
      pgs.forEach(p => doc.addPage(p));
      const bytes = await doc.save();
      const blob  = new Blob([bytes], { type: 'application/pdf' });
      const label = idxs.length === 1
        ? `page-${idxs[0]+1}`
        : `pages-${idxs[0]+1}-${idxs[idxs.length-1]+1}`;
      out.push({ name: file.name.replace(/\.pdf$/i,'') + `-${label}.pdf`, url: URL.createObjectURL(blob), size: blob.size });
    }
    return out;
  }

  function _parseRanges(raw, total) {
    const groups = [];
    raw.split(',').map(s => s.trim()).filter(Boolean).forEach(p => {
      if (p.includes('-')) {
        const [a, b] = p.split('-').map(Number);
        const from = Math.max(1, a) - 1, to = Math.min(total, b) - 1;
        if (from <= to) groups.push(Array.from({ length: to-from+1 }, (_, i) => from+i));
      } else {
        const idx = parseInt(p) - 1;
        if (idx >= 0 && idx < total) groups.push([idx]);
      }
    });
    return groups;
  }

  // ⑤ PDF Merger
  async function _processMergePDF(files) {
    const { PDFDocument } = PDFLib;
    const merged = await PDFDocument.create();
    for (const f of files) {
      const doc  = await PDFDocument.load(await f.arrayBuffer());
      const pgs  = await merged.copyPages(doc, doc.getPageIndices());
      pgs.forEach(p => merged.addPage(p));
    }
    const bytes = await merged.save();
    const blob  = new Blob([bytes], { type: 'application/pdf' });
    return [{ name: 'merged.pdf', url: URL.createObjectURL(blob), size: blob.size }];
  }

  // ⑥ Image → PDF
  async function _processImageToPDF(files) {
    const { PDFDocument } = PDFLib;
    const pdfDoc   = await PDFDocument.create();
    const pageSize = document.getElementById('opt-pagesize')?.value ?? 'a4';
    const fitMode  = document.getElementById('opt-fit')?.value      ?? 'contain';
    const margin   = parseInt(document.getElementById('opt-margin')?.value ?? 20);

    const PAGE_SIZES = { a4: [595.28, 841.89], letter: [612, 792] };

    for (const file of files) {
      let pdfImg;
      if (file.type === 'image/png') {
        pdfImg = await pdfDoc.embedPng(await file.arrayBuffer());
      } else {
        pdfImg = await pdfDoc.embedJpg(await _toJpegBuffer(file));
      }

      const iw = pdfImg.width, ih = pdfImg.height;
      const [pw, ph] = pageSize === 'auto'
        ? [iw + margin * 2, ih + margin * 2]
        : PAGE_SIZES[pageSize];

      const page   = pdfDoc.addPage([pw, ph]);
      const availW = pw - margin * 2;
      const availH = ph - margin * 2;

      let dw, dh;
      if (fitMode === 'original') {
        dw = iw; dh = ih;
      } else {
        const scale = Math.min(availW / iw, availH / ih);
        dw = iw * scale; dh = ih * scale;
      }
      const dx = margin + (availW - dw) / 2;
      const dy = margin + (availH - dh) / 2;
      page.drawImage(pdfImg, { x: dx, y: dy, width: dw, height: dh });
    }

    const bytes = await pdfDoc.save();
    const blob  = new Blob([bytes], { type: 'application/pdf' });
    return [{ name: 'images-to-pdf.pdf', url: URL.createObjectURL(blob), size: blob.size }];
  }

  function _toJpegBuffer(file) {
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const cv  = document.createElement('canvas');
        cv.width  = img.naturalWidth; cv.height = img.naturalHeight;
        const ctx = cv.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        cv.toBlob(b => b.arrayBuffer().then(res).catch(rej), 'image/jpeg', 0.92);
      };
      img.onerror = rej;
      img.src = url;
    });
  }

  // ── Resize mode switcher (exposed) ─────────────────────────
  function switchResizeMode(mode) {
    document.getElementById('resize-px').classList.toggle('hidden', mode === 'pct');
    document.getElementById('resize-pct').classList.toggle('hidden', mode === 'px');
    document.getElementById('tab-px').classList.toggle('active', mode === 'px');
    document.getElementById('tab-pct').classList.toggle('active', mode === 'pct');
  }

  // ════════════════════════════════════════════════════════════
  //  INIT
  // ════════════════════════════════════════════════════════════
  function init() {
    const route = parseRoute();
    state = { ...state, ...route };
    updateSEO();
    updateLangButtons();
    render();
  }

  init();

  // ── Public API ──────────────────────────────────────────────
  return {
    switchLang,
    onDragOver, onDragLeave, onDrop, onFileSelect,
    handleFiles, removeFile,
    processFiles,
    downloadBlob, downloadAllZip,
    resetTool,
    switchResizeMode,
    updateQualityLabel,
    onFormatChange,
  };

})();
