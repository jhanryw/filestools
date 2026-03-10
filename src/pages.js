// ═══════════════════════════════════════════════════════════════
//  DragNDropp — pages.js  (v2 — SEO Premium Build)
//  Brain: i18n, SEO metadata, tool configs, FAQs, Blog.
//  Every FAQ now targets real long-tail search keywords.
// ═══════════════════════════════════════════════════════════════

window.PAGES = (() => {

  // ──────────────────────────────────────────────
  //  TOOL DEFINITIONS
  // ──────────────────────────────────────────────
  const TOOLS = [
    { id: 'image-compressor', icon: '🗜️', color: 'indigo',  category: 'image' },
    { id: 'image-converter',  icon: '🔄', color: 'violet',  category: 'image' },
    { id: 'image-resizer',    icon: '📐', color: 'blue',    category: 'image' },
    { id: 'pdf-splitter',     icon: '✂️', color: 'rose',    category: 'pdf'   },
    { id: 'pdf-merger',       icon: '📎', color: 'amber',   category: 'pdf'   },
    { id: 'image-to-pdf',     icon: '🖼️', color: 'emerald', category: 'pdf'   },
  ];

  // ──────────────────────────────────────────────
  //  I18N
  // ──────────────────────────────────────────────
  const i18n = {

    // ╔══════════════════════════════════════════╗
    // ║              ENGLISH                     ║
    // ╚══════════════════════════════════════════╝
    en: {
      lang: 'en', dir: 'ltr',
      siteName: 'DragNDropp',
      siteTagline: 'Free Online File Tools',
      footerTagline: 'Your files never leave your browser.',
      footerPrivacy: 'Privacy', footerTerms: 'Terms', footerContact: 'Contact',
      nav: { home: 'Home', blog: 'Blog' },

      home: {
        title:       'DragNDropp – Free Online File & Image Tools',
        description: 'Compress images, convert JPG/PNG/WebP, resize photos, split or merge PDFs — 100% free, 100% in your browser. No upload, no sign-up.',
        h1:          'Free File Tools — Right in Your Browser',
        subtitle:    'No sign-up. No upload. 100% private.',
        categoryImage: 'Image Tools',
        categoryPdf:   'PDF Tools',
        statsTools:   'Tools',
        statsLangs:   'Languages',
        statsUploads: 'Server Uploads',
        statsCost:    'Cost',
        whyPrivate:      'Private by Design',
        whyPrivateDesc:  'Files stay on your device. Zero server uploads ever.',
        whyFast:         'Lightning Fast',
        whyFastDesc:     'Processing happens instantly in your browser via Canvas API.',
        whyGlobal:       'Multilingual',
        whyGlobalDesc:   'Available in English, Portuguese and Spanish.',
        whyFree:         'Always Free',
        whyFreeDesc:     'No hidden fees, no subscription, no account required.',
      },

      processing:  'Processing your file…',
      downloadBtn: 'Download',
      addMoreBtn:  '+ Add More Files',
      resetBtn:    '↺ Start Over',
      dropText:    'Drag & drop files here, or click to browse',
      dropSubtext: 'Supports JPG, PNG, WebP, GIF, PDF',

      processingPhases: [
        'Analyzing your file…',
        'Optimizing for best quality…',
        'Applying compression algorithms…',
        'Finalizing your download…',
      ],

      tools: {

        // ── IMAGE COMPRESSOR ──────────────────────────
        'image-compressor': {
          title:       'Image Compressor – Reduce JPG PNG WebP Size Online Free',
          description: 'Compress JPG, PNG and WebP images online for free. Reduce file size up to 80% without visible quality loss. 100% client-side — your images never leave your browser.',
          h1:      'Image Compressor',
          subtitle:'Reduce file size without sacrificing quality — up to 80% smaller.',
          label:   'Compress Images',
          options: {
            quality:     'Quality (0–100)',
            qualityHint: 'Higher = better quality but larger file',
          },
          howTo: {
            heading: 'How to Compress Images Online (Free)',
            steps: [
              'Click the upload area or drag your JPG, PNG, or WebP images directly into the box.',
              'Adjust the quality slider — 75 is the sweet spot for invisible compression.',
              'Click "Compress Images". A 4-second optimization process runs in your browser.',
              'Download each compressed image, or click "Download All as ZIP" for batch export.',
            ],
          },
          features: [
            '100% client-side processing — files never leave your device (GDPR safe)',
            'Supports JPG/JPEG, PNG, WebP and GIF formats',
            'Batch compression — process dozens of images simultaneously',
            'Lossy compression for JPG/WebP via Canvas API toBlob(), lossless deflate for PNG',
            'Real-time quality slider with estimated size indicator',
            'Savings percentage badge on each result',
          ],
          faq: [
            {
              q: 'Is the compression lossless or lossy?',
              a: 'For JPG and WebP, DragNDropp uses <strong>lossy compression</strong> via the browser\'s Canvas API <code>toBlob()</code> with a configurable quality factor (0.01–1.0). Lossy means some pixel data is discarded — invisible at quality 70+ but significant at quality below 40. PNG uses <strong>lossless deflate compression</strong> internally, so no pixel data is lost when you compress a PNG, but the file size savings are smaller (typically 5–20%).',
            },
            {
              q: 'How much can I reduce the file size?',
              a: 'Results vary by content: photographic images (many colors, gradients) compress 50–80% at quality 75. Flat graphics with few colors may only compress 15–30%. PNG screenshots often compress 5–15% since PNG is already lossless. Converting a PNG photo to WebP before compressing can give you 40–70% savings.',
            },
            {
              q: 'Is there a difference between compressing JPG vs WebP?',
              a: 'Both use lossy compression, but WebP uses a more modern codec (based on VP8) that achieves <strong>25–35% smaller files than JPEG at the same visual quality</strong>. If your target platform supports WebP (all modern browsers do), convert JPG → WebP first using our Image Converter, then compress.',
            },
            {
              q: 'Can I compress HEIC or AVIF images?',
              a: 'Currently DragNDropp supports JPG, PNG, WebP, and GIF. HEIC (used by iPhones) and AVIF are not yet supported by the Canvas API in all browsers. To compress HEIC images on Windows or Android, first convert them to JPG using a HEIC converter, then use DragNDropp.',
            },
            {
              q: 'Does compressing an image reduce its dimensions (resolution)?',
              a: 'No. The Image Compressor only reduces file size (byte weight) through quality reduction. The pixel dimensions (width × height) and DPI remain identical. To also reduce dimensions, use our <a href="/en/image-resizer">Image Resizer</a> before or after compressing.',
            },
            {
              q: 'What quality setting should I use for the web?',
              a: 'The industry standard recommendation (Google, Cloudinary) is <strong>quality 75–85 for JPEG</strong> and <strong>quality 80–90 for WebP</strong>. This range is perceptually lossless for photographic images and reduces file size by 40–60% vs. the default quality 100 output from cameras.',
            },
            {
              q: 'Are my compressed images uploaded to a server?',
              a: 'Never. DragNDropp processes all images entirely inside your browser using the HTML5 Canvas API. No data is ever sent over the network. This makes it fully compliant with privacy regulations like GDPR and HIPAA for non-medical image use.',
            },
          ],
        },

        // ── IMAGE CONVERTER ──────────────────────────
        'image-converter': {
          title:       'Image Converter – Convert JPG to PNG, WebP, and More — Free',
          description: 'Convert images between JPG, PNG and WebP instantly. Free online converter — 100% in your browser, no upload required. Convert HEIC alternatives, fix transparency issues.',
          h1:      'Image Converter',
          subtitle:'Convert between JPG, PNG, WebP — instantly and privately.',
          label:   'Convert Images',
          options: { format: 'Output Format' },
          howTo: {
            heading: 'How to Convert Images Online (No Upload)',
            steps: [
              'Upload one or more images (JPG, PNG, WebP, GIF) by clicking or dragging.',
              'Select your output format: JPG (universal), PNG (lossless + transparency), or WebP (smallest for web).',
              'Hit "Convert Images" and wait for the 4-second in-browser processing.',
              'Download your converted files individually or as a ZIP.',
            ],
          },
          features: [
            'Convert JPG ↔ PNG ↔ WebP in any direction',
            'Batch conversion — convert hundreds of files at once',
            'PNG output preserves alpha-channel transparency',
            'JPG output auto-fills transparent areas with white background',
            'WebP output is 25–35% smaller than equivalent JPEG',
            'Zero quality loss for PNG → PNG (lossless round-trip)',
          ],
          faq: [
            {
              q: 'What formats does DragNDropp convert between?',
              a: 'DragNDropp converts between <strong>JPG/JPEG, PNG, and WebP</strong>. GIF (static first frame) is also accepted as input. HEIC (iPhone), AVIF, TIFF, and BMP are not currently supported as they require OS-level codecs not available in the browser Canvas API.',
            },
            {
              q: 'How do I convert HEIC to JPG for Windows?',
              a: 'HEIC files from iPhone cannot be opened natively on Windows 10/11 without the Microsoft HEIC extension. The easiest workaround: (1) on your iPhone, go to Settings → Camera → Formats → "Most Compatible" (this saves as JPG directly), or (2) use AirDrop to Mac which auto-converts to JPG, or (3) use a dedicated HEIC converter first, then use DragNDropp to resize or compress the resulting JPG.',
            },
            {
              q: 'Will converting PNG to JPG lose the transparent background?',
              a: 'Yes — JPG does not support transparency (no alpha channel). DragNDropp automatically fills the transparent area with a <strong>white background</strong> before converting. If you need transparency, convert to PNG or WebP instead.',
            },
            {
              q: 'Why is WebP better than JPG for websites?',
              a: 'WebP uses a newer compression algorithm that delivers 25–35% smaller file sizes at the same visual quality compared to JPEG. Smaller images mean faster page loads, better Core Web Vitals (especially LCP), and lower bandwidth costs. WebP is supported by 96%+ of browsers globally in 2025.',
            },
            {
              q: 'Does converting reduce image quality?',
              a: 'PNG ↔ PNG is fully lossless (no quality change). PNG → WebP (lossless mode) is also lossless. PNG/WebP → JPG introduces slight lossy compression artifacts, especially noticeable on sharp text edges. JPG → PNG increases file size but doesn\'t recover any lost JPG compression artifacts — you can\'t "un-compress" a JPG.',
            },
            {
              q: 'Can I batch convert 100 images at once?',
              a: 'Yes. DragNDropp processes all selected files in parallel using <code>Promise.all()</code>. The practical limit is your browser\'s available RAM. For 100 average-sized images (2–5 MB each), you\'ll need approximately 1–2 GB of free RAM.',
            },
          ],
        },

        // ── IMAGE RESIZER ────────────────────────────
        'image-resizer': {
          title:       'Image Resizer – Resize Images by Pixels or Percentage — Free',
          description: 'Resize images online by exact pixel dimensions or percentage. Keep aspect ratio automatically. Free, instant, 100% browser-based — no upload needed.',
          h1:      'Image Resizer',
          subtitle:'Resize by pixels or percentage — aspect ratio locked by default.',
          label:   'Resize Images',
          options: {
            mode:      'Resize Mode',
            byPixels:  'By Pixels',
            byPercent: 'By Percentage',
            width:     'Width (px)',
            height:    'Height (px)',
            percent:   'Scale (%)',
            keepRatio: 'Lock Aspect Ratio',
          },
          howTo: {
            heading: 'How to Resize Images Online',
            steps: [
              'Upload your images by clicking or dragging them into the drop zone.',
              'Choose mode: "By Pixels" to set exact target dimensions, or "By Percentage" to scale proportionally.',
              'Enter width, height, or scale percentage. "Lock Aspect Ratio" prevents stretching.',
              'Click "Resize Images". Processing runs entirely in your browser.',
              'Download individual resized images or all as a ZIP file.',
            ],
          },
          features: [
            'Resize by exact pixel width × height or percentage (1%–400%)',
            'Aspect ratio lock prevents distortion (on by default)',
            'Batch processing — resize hundreds of images in one go',
            'Output format matches input (JPG → JPG, PNG → PNG)',
            'Uses bicubic interpolation via Canvas API for smooth downscaling',
            'Supports upscaling (though AI upscalers give better results for large enlargements)',
          ],
          faq: [
            {
              q: 'What is the maximum output resolution I can resize to?',
              a: 'The HTML5 Canvas API supports a maximum of <strong>16,384 × 16,384 pixels</strong> on most modern browsers. Some mobile browsers may have lower limits (4,096 × 4,096 px). If you try to upscale beyond the browser\'s maximum, Canvas will silently produce a blank image.',
            },
            {
              q: 'Will resizing reduce my file size?',
              a: 'Yes — reducing pixel dimensions always reduces file size proportionally. Halving width AND height reduces pixel count by 75%, which reduces file size by approximately 70–80% depending on the format. For example, a 4000×3000 JPG (12 MP) resized to 2000×1500 (3 MP) will be about 75% smaller.',
            },
            {
              q: 'What does "Lock Aspect Ratio" mean?',
              a: '"Lock Aspect Ratio" (also called "constrain proportions") means that when you enter a width, the height is automatically calculated to maintain the original width:height ratio. This prevents the image from looking stretched or squished. Uncheck it only if you intentionally want to change the shape of the image.',
            },
            {
              q: 'What resize percentage should I use to target 72 DPI for web?',
              a: 'DPI (dots per inch) is a print concept and doesn\'t directly map to web pixels. For web use, focus on pixel dimensions rather than DPI. A typical website hero image should be 1920px wide max. If your source is 6000px wide, resize to 32% (6000 × 0.32 ≈ 1920px).',
            },
            {
              q: 'Does resizing work on animated GIFs?',
              a: 'DragNDropp resizes only the <strong>first frame</strong> of animated GIFs (since the Canvas API processes one frame at a time). The output will be a static image. Full animated GIF resizing requires a server-side tool like FFmpeg.',
            },
            {
              q: 'Can I resize images to standard social media sizes?',
              a: 'Yes. Common targets: Instagram feed = 1080×1080 px (square) or 1080×1350 (portrait); Facebook cover = 820×312 px; Twitter/X header = 1500×500 px; LinkedIn cover = 1584×396 px. Set mode to "By Pixels", uncheck aspect ratio lock, and enter the target dimensions.',
            },
          ],
        },

        // ── PDF SPLITTER ─────────────────────────────
        'pdf-splitter': {
          title:       'PDF Splitter – Split PDF Pages Online Free (No Upload)',
          description: 'Split a PDF into individual pages or custom page ranges for free. 100% browser-based with pdf-lib.js — your document is never uploaded to any server.',
          h1:      'PDF Splitter',
          subtitle:'Extract pages or split into individual files — 100% private.',
          label:   'Split PDF',
          options: {
            mode:             'Split Mode',
            allPages:         'Every Page → Separate PDF',
            range:            'Custom Page Ranges',
            rangePlaceholder: 'e.g. 1-3, 5, 7-10',
          },
          howTo: {
            heading: 'How to Split a PDF Online (Without Upload)',
            steps: [
              'Upload your PDF by clicking or dragging it into the drop zone.',
              'Choose split mode: "Every Page" creates one PDF per page, or "Custom Ranges" to extract specific sections.',
              'For custom ranges, enter comma-separated ranges like: 1-5, 8, 11-15.',
              'Click "Split PDF" and wait for pdf-lib.js to process it in your browser.',
              'Download each resulting PDF individually, or grab them all as a ZIP.',
            ],
          },
          features: [
            '100% client-side with pdf-lib.js — document stays on your device',
            'Split into individual pages or custom page range groups',
            'Preserves original PDF quality, fonts, and vector content',
            'Preserves embedded hyperlinks and text layers',
            'Fast processing even for large PDFs (100+ pages, 50+ MB)',
            'Batch ZIP download for all split pages',
          ],
          faq: [
            {
              q: 'Does splitting a PDF reduce text quality or image quality?',
              a: 'No. pdf-lib.js copies PDF page objects directly without re-rendering them. Fonts, vector graphics, embedded images, and the text layer (for search/copy) are all preserved exactly as in the original. Quality loss only occurs when splitting a PDF that was created from scanned images — because the source was already a raster image.',
            },
            {
              q: 'Can I extract specific pages from a PDF?',
              a: 'Yes. Use the "Custom Ranges" mode and enter individual pages or ranges, e.g., <code>3, 7, 12-15</code>. This creates one output PDF per group — so <code>3, 7</code> gives two PDFs (one with page 3, one with page 7), while <code>12-15</code> gives one PDF with pages 12 through 15.',
            },
            {
              q: 'What is the maximum PDF file size I can split?',
              a: 'Limited by your browser\'s available RAM. PDFs up to 100 MB process fine on most devices. Very large PDFs (200 MB+) may cause Chrome/Firefox to run out of memory — in that case, split the PDF in smaller batches or use a desktop tool.',
            },
            {
              q: 'Is my PDF uploaded to a server?',
              a: 'Never. The pdf-lib.js library runs entirely inside your browser\'s JavaScript engine. Your PDF data never leaves your device, is never transmitted over the internet, and is never stored anywhere. This makes DragNDropp suitable for confidential documents, contracts, and medical records.',
            },
            {
              q: 'Can I split a password-protected PDF?',
              a: 'You can split a PDF that has a user password (required to open) if pdf-lib can read it — currently DragNDropp does not have a password input field. Password-protected PDFs that deny content extraction (restrictive permissions) cannot be split by pdf-lib without the owner password.',
            },
            {
              q: 'Can I split a scanned PDF (image-based PDF)?',
              a: 'Yes. Scanned PDFs are just regular PDFs where each page contains a raster image. DragNDropp splits them exactly like any other PDF. You cannot, however, extract the text from scanned PDFs without OCR (Optical Character Recognition), which is not currently supported.',
            },
          ],
        },

        // ── PDF MERGER ───────────────────────────────
        'pdf-merger': {
          title:       'PDF Merger – Combine PDF Files Online Free (No Upload)',
          description: 'Merge multiple PDF files into one online for free. Drag to reorder pages before merging. 100% client-side with pdf-lib.js — no upload, fully private.',
          h1:      'PDF Merger',
          subtitle:'Combine multiple PDFs in any order — drag to reorder.',
          label:   'Merge PDFs',
          options: { reorder: 'Drag files to reorder them before merging:' },
          howTo: {
            heading: 'How to Merge PDFs Online (No Software Needed)',
            steps: [
              'Upload two or more PDF files by clicking or dragging them in.',
              'Drag the file cards up or down to set the order they should appear in the merged PDF.',
              'Click "Merge PDFs" to combine them. pdf-lib.js runs entirely in your browser.',
              'Download the merged PDF.',
            ],
          },
          features: [
            'Merge unlimited PDFs in any order',
            'Drag-and-drop reordering of files before merging',
            '100% client-side with pdf-lib.js — zero server upload',
            'Preserves text layers, fonts, images, and hyperlinks from all source PDFs',
            'Works on scanned PDFs, contracts, invoices — any PDF type',
          ],
          faq: [
            {
              q: 'How many PDFs can I merge at once?',
              a: 'There is no hard file count limit. The practical limit is your device\'s available RAM. Merging 10 PDFs of 10 MB each requires roughly 100 MB of browser memory. Merging very large documents (500+ MB total) may be slow or crash the tab on low-memory devices.',
            },
            {
              q: 'Will the merged PDF be larger than the sum of the originals?',
              a: 'Slightly, yes — pdf-lib adds a small amount of metadata overhead. But it does NOT re-compress or re-render any content, so the size increase is negligible (typically less than 1 KB per merged file).',
            },
            {
              q: 'Does merging preserve hyperlinks and bookmarks?',
              a: 'Internal hyperlinks (links from one page to another page in the same document) may break because page numbers shift in the merged document. External hyperlinks (links to URLs) are fully preserved. Document outlines (bookmarks) from the first PDF are included; bookmarks from subsequent PDFs are appended.',
            },
            {
              q: 'Can I merge a scanned PDF with a text-based PDF?',
              a: 'Yes. pdf-lib treats all PDFs the same regardless of content type. The resulting merged PDF will have the scanned pages as images and the text-based pages with their native text layers — exactly as in the originals.',
            },
            {
              q: 'Is there a free alternative to Adobe Acrobat for merging PDFs?',
              a: 'Yes — DragNDropp is completely free and works in any modern browser without installing software. macOS Preview also supports drag-to-reorder merging via the thumbnail sidebar. On Linux, <code>pdfunite</code> (part of poppler-utils) is a powerful command-line option.',
            },
            {
              q: 'Can I reorder individual pages (not just files)?',
              a: 'Currently you can reorder entire files. Page-level reordering (e.g., moving page 3 of file 2 to be page 1 of the merged output) is not yet supported in the client-side version. This feature is on the roadmap.',
            },
          ],
        },

        // ── IMAGE TO PDF ─────────────────────────────
        'image-to-pdf': {
          title:       'Image to PDF – Convert JPG PNG WebP to PDF Free Online',
          description: 'Convert JPG, PNG and WebP images to a PDF document online. Combine multiple images into a single PDF. Free, instant, 100% browser-based — no upload.',
          h1:      'Image to PDF',
          subtitle:'Convert and combine images into a PDF instantly.',
          label:   'Convert to PDF',
          options: {
            pageSize:    'Page Size',
            fit:         'Image Fit',
            fitContain:  'Fit to page (letterbox)',
            fitFill:     'Fill page (may crop edges)',
            fitOriginal: 'Original pixel size',
            margin:      'Page Margin (px)',
          },
          howTo: {
            heading: 'How to Convert Images to PDF (Free, No Upload)',
            steps: [
              'Upload your JPG, PNG, or WebP images.',
              'Drag the thumbnail cards to set the page order in the PDF.',
              'Choose page size (A4, US Letter, or Auto), image fit mode, and margin.',
              'Click "Convert to PDF". pdf-lib.js builds the PDF in your browser.',
              'Download the resulting PDF.',
            ],
          },
          features: [
            'Combine unlimited images into one multi-page PDF',
            'Supports JPG, PNG (with transparency → white fill), WebP input',
            'Page size options: A4 (210×297 mm), US Letter (216×279 mm), Auto (image dimensions)',
            'Fit modes: contain (letterbox), fill (crop), or original size',
            'Configurable page margins',
            '100% client-side — no upload, fully private',
          ],
          faq: [
            {
              q: 'Can I control the order of images in the PDF?',
              a: 'Yes. After uploading, drag the thumbnail cards to reorder them. The PDF will be generated in the exact order shown.',
            },
            {
              q: 'What page size will my images use in the PDF?',
              a: '<strong>A4</strong> (210×297 mm / 595×842 pt) is the international standard. <strong>US Letter</strong> (8.5×11 in / 612×792 pt) is the North American standard. <strong>Auto</strong> sizes each page to exactly match the image\'s pixel dimensions — ideal for preserving the original image at 100% size without any white borders.',
            },
            {
              q: 'Will image quality be reduced when embedding into PDF?',
              a: 'PNG images are embedded losslessly at their original resolution — no quality change. JPG images are embedded as-is using the original JPEG data (no re-encoding). WebP images are first converted to JPEG via the Canvas API (at quality 0.92) before embedding, which may introduce slight quality reduction.',
            },
            {
              q: 'What does "Fit to page (letterbox)" mean?',
              a: '"Contain/letterbox" scales the image to fit entirely within the page while preserving its aspect ratio. White space (letterbox bars) may appear on two sides if the image and page have different proportions. "Fill" scales the image to cover the entire page, cropping the edges.',
            },
            {
              q: 'Can I add a transparent PNG to a PDF?',
              a: 'Yes, but PDF pages have a white background by default, so the transparent areas of the PNG will appear white in the PDF. True transparency in PDFs requires advanced PDF features not currently supported in the client-side pdf-lib version.',
            },
            {
              q: 'Can I password-protect the resulting PDF?',
              a: 'Password protection is not yet available in the client-side version (pdf-lib supports encryption but it is not currently exposed in the UI). This feature is planned for a future update.',
            },
          ],
        },

      }, // end tools

      // ── BLOG ──────────────────────────────────────
      blog: {
        title:    'Blog – File Optimization Tips & Tutorials | DragNDropp',
        description: 'Learn how to compress images for SEO, convert file formats, optimize PDFs, and more. Free guides from DragNDropp.',
        h1:       'Blog',
        subtitle: 'Tips, tutorials, and in-depth guides for file optimization.',
        posts: [
          {
            slug:    'webp-vs-jpg',
            title:   'WebP vs JPG in 2025: File Size, Quality & Browser Support Compared',
            date:    '2025-02-10',
            excerpt: 'WebP delivers 25–35% smaller files than JPEG at equivalent visual quality. We compare both formats across file size, transparency, browser support, and use cases.',
            content: `
              <h2>What is WebP?</h2>
              <p>WebP is a modern image format developed by Google, released in 2010 and designed to replace JPEG and PNG for web use. It uses a lossy compression algorithm based on the VP8 video codec (for lossy) and a variant of LZ77 with Huffman coding (for lossless). WebP supports transparency (alpha channel), animation, and HDR.</p>
              <h2>File Size: WebP vs JPEG</h2>
              <p>In Google's original benchmark, WebP lossless images are 26% smaller than PNG, and WebP lossy images are 25–34% smaller than JPEG at equivalent SSIM (structural similarity) scores. In practical real-world comparisons across thousands of images, the savings range from 15% to 50% depending on content type.</p>
              <h2>Browser Support in 2025</h2>
              <p>WebP is now supported by 96%+ of global web browsers, including Chrome 23+, Firefox 65+, Edge 18+, and Safari 14+ (macOS Big Sur / iOS 14). The old concern about Safari incompatibility is resolved. Use WebP for all new web projects.</p>
              <h2>When to Still Use JPG</h2>
              <p>Use JPG when: (1) you're sending images via email to users who may open them in old desktop software (Outlook 2016 and earlier do not support WebP), (2) your CMS or media pipeline doesn't support WebP uploads, or (3) you need guaranteed compatibility with legacy systems.</p>
              <h2>Key Differences at a Glance</h2>
              <ul>
                <li><strong>Transparency:</strong> WebP supports alpha channel. JPEG does not.</li>
                <li><strong>Animation:</strong> WebP supports animation (like GIF but much smaller). JPEG does not.</li>
                <li><strong>Lossy compression:</strong> WebP is 25–35% smaller than JPEG at the same quality.</li>
                <li><strong>Lossless compression:</strong> WebP is 26% smaller than PNG.</li>
                <li><strong>Encoding speed:</strong> WebP encoding is slower than JPEG — but DragNDropp handles this in the browser background.</li>
              </ul>
              <h2>Conclusion</h2>
              <p>For web use in 2025, WebP is the clear winner in every objective metric. Convert your assets with <a href="/en/image-converter">DragNDropp Image Converter</a> — free, instant, and 100% private.</p>
            `,
          },
          {
            slug:    'compress-images-seo',
            title:   'How Image Compression Directly Improves Your Google Rankings',
            date:    '2025-03-01',
            excerpt: 'Large images are the #1 cause of slow page loads. Compressing images is the fastest single action to improve Core Web Vitals — especially LCP and TTFB.',
            content: `
              <h2>The Connection Between Images and Google Rankings</h2>
              <p>Since 2021, Google uses Core Web Vitals as a ranking factor. The three core metrics are LCP (Largest Contentful Paint), FID/INP (interaction delay), and CLS (layout shift). Images directly impact LCP — and LCP is the most impactful of the three for most sites.</p>
              <h2>What is LCP and Why Does Image Size Matter?</h2>
              <p>LCP measures the time from page navigation start to when the largest visible element is rendered. In 80%+ of pages, the LCP element is an image — usually the hero banner, product photo, or OG image. Google's threshold: LCP under 2.5 seconds = "Good". Over 4 seconds = "Poor" (ranking penalty applies).</p>
              <h2>Real Example: Before vs After Compression</h2>
              <p>A typical unoptimized hero image from a DSLR camera is 3–8 MB at 6000×4000 px. After: resize to 1920×1280, compress at quality 80 to WebP = approximately 180 KB. That's a 97% reduction in bytes. LCP improvement: from ~4.2s to ~0.6s on a 4G mobile connection.</p>
              <h2>Step-by-Step Image Optimization Workflow</h2>
              <ul>
                <li>Audit current images with Google PageSpeed Insights or Lighthouse.</li>
                <li>Resize all images to match their CSS display size (use our <a href="/en/image-resizer">Image Resizer</a>).</li>
                <li>Compress at quality 75–85 (use our <a href="/en/image-compressor">Image Compressor</a>).</li>
                <li>Convert to WebP format (use our <a href="/en/image-converter">Image Converter</a>).</li>
                <li>Implement <code>loading="lazy"</code> and <code>srcset</code> in your HTML for responsive images.</li>
                <li>Use a CDN with automatic WebP conversion (Cloudflare Images, Cloudinary, etc.).</li>
              </ul>
              <h2>Expected Impact</h2>
              <p>Sites that follow this workflow consistently see 30–70% LCP improvement and PageSpeed scores jumping from 40–60 into the 80–95 range. In competitive niches, this directly translates to ranking improvements within 4–8 weeks of deployment.</p>
            `,
          },
          {
            slug:    'pdf-merge-guide',
            title:   'How to Merge PDFs for Free Without Adobe Acrobat',
            date:    '2025-03-15',
            excerpt: 'You don\'t need a $299/year Adobe subscription to merge PDFs. Learn three methods to combine PDFs in under 60 seconds — including one that works entirely in your browser.',
            content: `
              <h2>Method 1: DragNDropp (Browser-Based, Free)</h2>
              <p>No software. No account. Works on Windows, Mac, Linux, iOS, and Android. Go to <a href="/en/pdf-merger">DragNDropp PDF Merger</a>, upload your PDFs, drag to reorder, and click Merge. Done in under 10 seconds.</p>
              <h2>Method 2: macOS Preview (Free, Mac Only)</h2>
              <p>Open the first PDF in Preview. Open the View menu and select "Thumbnails". Drag additional PDF files from Finder into the thumbnail sidebar at the position you want. File → Export as PDF to save the merged version.</p>
              <h2>Method 3: Command Line (Linux/Mac, Advanced)</h2>
              <p>Install poppler-utils: <code>sudo apt install poppler-utils</code> (Ubuntu) or <code>brew install poppler</code> (Mac). Then run: <code>pdfunite file1.pdf file2.pdf merged.pdf</code>. This is the fastest method for automation and batch processing.</p>
              <h2>Does Merging PDFs Reduce Quality?</h2>
              <p>With DragNDropp (pdf-lib.js), no — pages are copied at the binary level without any re-rendering. Fonts, vector graphics, and embedded images are preserved exactly. The same applies to Preview and pdfunite.</p>
              <h2>Common Use Cases</h2>
              <ul>
                <li>Combining monthly bank statements into one annual PDF</li>
                <li>Merging multiple contract pages sent as separate files</li>
                <li>Combining chapters of a report written by different team members</li>
                <li>Merging invoice PDFs for expense reporting</li>
              </ul>
            `,
          },
          {
            slug:    'what-is-lossless-compression',
            title:   'Lossless vs Lossy Compression: Which Should You Use?',
            date:    '2025-04-01',
            excerpt: 'Lossless preserves every pixel. Lossy throws away data you can\'t see. Understanding the difference saves you from either wasting storage or degrading image quality.',
            content: `
              <h2>What is Lossless Compression?</h2>
              <p>Lossless compression reduces file size while preserving every single bit of the original data. When you decompress the file, you get back an identical copy. PNG, GIF (for static), WebP (lossless mode), and TIFF (with LZW) are lossless formats. Use lossless when you need perfect pixel accuracy: screenshots, UI mockups, logos, icons, medical images.</p>
              <h2>What is Lossy Compression?</h2>
              <p>Lossy compression achieves much higher compression ratios by permanently discarding pixel information that the human visual system is unlikely to notice. JPEG, WebP (lossy mode), HEIC, and AVIF are lossy formats. The key tradeoff: each time you save a lossy file, you lose a bit more quality (generation loss). Always keep an original lossless master.</p>
              <h2>Chroma Subsampling: The Secret JPEG Uses</h2>
              <p>JPEG exploits the fact that human vision is more sensitive to brightness (luma) than color (chroma). "4:2:0 chroma subsampling" stores color information at half the resolution of brightness, which is invisible to most viewers but reduces file size by ~50% before any quantization is applied.</p>
              <h2>Practical Decision Guide</h2>
              <ul>
                <li><strong>Photos for web:</strong> Lossy WebP quality 80 or JPEG quality 80</li>
                <li><strong>Screenshots / UI:</strong> PNG or WebP lossless</li>
                <li><strong>Logos with transparency:</strong> PNG or WebP lossless</li>
                <li><strong>Print materials:</strong> TIFF lossless or PDF</li>
                <li><strong>Archive / master files:</strong> Always PNG or TIFF — never JPEG</li>
              </ul>
              <h2>Try It Yourself</h2>
              <p>Use <a href="/en/image-compressor">DragNDropp Image Compressor</a> to see exactly how much file size you lose or gain at different quality settings. The before/after savings badge shows you the percentage reduction in real time.</p>
            `,
          },
        ],
      },
    }, // end en

    // ╔══════════════════════════════════════════╗
    // ║              PORTUGUÊS                   ║
    // ╚══════════════════════════════════════════╝
    pt: {
      lang: 'pt', dir: 'ltr',
      siteName: 'DragNDropp',
      siteTagline: 'Ferramentas de Arquivo Online Grátis',
      footerTagline: 'Seus arquivos nunca saem do seu navegador.',
      footerPrivacy: 'Privacidade', footerTerms: 'Termos', footerContact: 'Contato',
      nav: { home: 'Início', blog: 'Blog' },

      home: {
        title:       'DragNDropp – Ferramentas de Imagem e PDF Online Grátis',
        description: 'Comprima imagens, converta JPG/PNG/WebP, redimensione fotos, divida ou mescle PDFs — 100% grátis, 100% no seu navegador. Sem upload, sem cadastro.',
        h1:          'Ferramentas de Arquivo — Direto no Seu Navegador',
        subtitle:    'Sem cadastro. Sem upload. 100% privado.',
        categoryImage: 'Ferramentas de Imagem',
        categoryPdf:   'Ferramentas de PDF',
        statsTools:    'Ferramentas',
        statsLangs:    'Idiomas',
        statsUploads:  'Uploads',
        statsCost:     'Custo',
        whyPrivate:      'Privado por Design',
        whyPrivateDesc:  'Arquivos ficam no seu dispositivo. Zero uploads para servidores.',
        whyFast:         'Ultra Rápido',
        whyFastDesc:     'Processamento instantâneo no seu navegador via Canvas API.',
        whyGlobal:       'Multilíngue',
        whyGlobalDesc:   'Disponível em Inglês, Português e Espanhol.',
        whyFree:         'Sempre Grátis',
        whyFreeDesc:     'Sem taxas ocultas, sem assinatura, sem conta necessária.',
      },

      processing:  'Processando seu arquivo…',
      downloadBtn: 'Baixar',
      addMoreBtn:  '+ Adicionar Mais',
      resetBtn:    '↺ Recomeçar',
      dropText:    'Arraste arquivos aqui ou clique para selecionar',
      dropSubtext: 'Suporta JPG, PNG, WebP, GIF, PDF',

      processingPhases: [
        'Analisando seu arquivo…',
        'Otimizando para melhor qualidade…',
        'Aplicando algoritmos de compressão…',
        'Finalizando seu download…',
      ],

      tools: {
        'image-compressor': {
          title:       'Compressor de Imagens – Reduzir JPG PNG WebP Online Grátis',
          description: 'Comprima imagens JPG, PNG e WebP online de graça. Reduza o tamanho em até 80% sem perda visível de qualidade. 100% no navegador — seus arquivos ficam privados.',
          h1:      'Compressor de Imagens',
          subtitle:'Reduza o peso do arquivo sem sacrificar a qualidade — até 80% menor.',
          label:   'Comprimir Imagens',
          options: { quality: 'Qualidade (0–100)', qualityHint: 'Maior = melhor qualidade, arquivo maior' },
          howTo: {
            heading: 'Como Comprimir Imagens Online (Grátis)',
            steps: [
              'Clique na área de upload ou arraste seus arquivos JPG, PNG ou WebP.',
              'Ajuste o slider de qualidade — 75 é o equilíbrio ideal para compressão invisível.',
              'Clique em "Comprimir Imagens". O processamento roda 4 segundos no seu navegador.',
              'Baixe cada imagem comprimida ou use "Baixar Tudo como ZIP".',
            ],
          },
          features: [
            '100% no navegador — arquivos nunca saem do seu dispositivo (compatível com LGPD)',
            'Suporta JPG/JPEG, PNG, WebP e GIF',
            'Compressão em lote — processe dezenas de imagens simultaneamente',
            'Compressão lossy para JPG/WebP via Canvas API, lossless deflate para PNG',
            'Slider de qualidade em tempo real com indicador de tamanho estimado',
            'Badge de economia percentual em cada resultado',
          ],
          faq: [
            { q: 'A compressão é lossless ou lossy?', a: 'Para JPG e WebP, DragNDropp usa <strong>compressão lossy</strong> via Canvas API <code>toBlob()</code> com fator de qualidade configurável. Lossy significa que alguns dados de pixel são descartados — invisível em qualidade 70+. PNG usa <strong>compressão lossless deflate</strong> internamente, então nenhum dado de pixel é perdido.' },
            { q: 'Quanto posso reduzir o tamanho do arquivo?', a: 'Imagens fotográficas (muitas cores, gradientes) comprimem 50–80% em qualidade 75. Gráficos flat com poucas cores comprimem 15–30%. Screenshots PNG normalmente comprimem 5–15% pois PNG já é lossless. Converter PNG para WebP antes de comprimir pode dar 40–70% de economia.' },
            { q: 'Qual a diferença entre comprimir JPG e WebP?', a: 'Ambos usam compressão lossy, mas WebP usa um codec mais moderno que alcança <strong>25–35% de arquivos menores que JPEG com a mesma qualidade visual</strong>. Se sua plataforma suporta WebP (todos os navegadores modernos suportam), converta JPG → WebP primeiro usando nosso Conversor de Imagens, depois comprima.' },
            { q: 'Posso comprimir imagens HEIC ou AVIF?', a: 'Atualmente o DragNDropp suporta JPG, PNG, WebP e GIF. HEIC (usado pelo iPhone) e AVIF não são suportados pelo Canvas API em todos os navegadores. Para comprimir HEIC no Windows, primeiro converta para JPG usando um conversor HEIC, depois use o DragNDropp.' },
            { q: 'Comprimir uma imagem reduz suas dimensões (resolução)?', a: 'Não. O Compressor de Imagens reduz apenas o tamanho do arquivo (peso em bytes) através da redução de qualidade. As dimensões em pixels (largura × altura) e o DPI permanecem idênticos. Para também reduzir dimensões, use nosso <a href="/pt/image-resizer">Redimensionador</a>.' },
            { q: 'Que configuração de qualidade usar para a web?', a: 'A recomendação padrão da indústria (Google, Cloudinary) é <strong>qualidade 75–85 para JPEG</strong> e <strong>80–90 para WebP</strong>. Essa faixa é perceptualmente lossless para imagens fotográficas e reduz o tamanho em 40–60% vs. qualidade 100 padrão de câmeras.' },
            { q: 'Minhas imagens são enviadas para um servidor?', a: 'Nunca. O DragNDropp processa todas as imagens dentro do seu navegador usando o Canvas API. Nenhum dado é enviado pela rede, tornando o serviço compatível com a LGPD.' },
          ],
        },
        'image-converter': {
          title:       'Conversor de Imagens – Converter JPG para PNG, WebP e Mais Grátis',
          description: 'Converta imagens entre JPG, PNG e WebP online gratuitamente. 100% no navegador, sem upload. Suporta transparência, converte HEIC alternativas.',
          h1:      'Conversor de Imagens',
          subtitle:'Converta entre JPG, PNG, WebP — instantaneamente e de forma privada.',
          label:   'Converter Imagens',
          options: { format: 'Formato de Saída' },
          howTo: {
            heading: 'Como Converter Imagens Online (Sem Upload)',
            steps: ['Faça upload de uma ou mais imagens.', 'Selecione o formato de saída: JPG, PNG ou WebP.', 'Clique em "Converter Imagens".', 'Baixe os arquivos convertidos.'],
          },
          features: ['Converta JPG ↔ PNG ↔ WebP em qualquer direção', 'Conversão em lote', 'PNG preserva canal alpha (transparência)', 'JPG preenche transparência com fundo branco automaticamente', 'WebP é 25–35% menor que JPEG equivalente', 'Zero perda de qualidade PNG → PNG (round-trip lossless)'],
          faq: [
            { q: 'Como converter HEIC para JPG no Windows?', a: 'Arquivos HEIC do iPhone não abrem nativamente no Windows sem a extensão da Microsoft. As opções mais fáceis: (1) no iPhone, vá em Ajustes → Câmera → Formatos → "Mais Compatível" (salva direto como JPG), ou (2) use um conversor HEIC dedicado primeiro, depois use o DragNDropp para redimensionar ou comprimir.' },
            { q: 'Converter PNG para JPG perde o fundo transparente?', a: 'Sim — JPG não suporta transparência. O DragNDropp automaticamente preenche a área transparente com <strong>fundo branco</strong> antes de converter. Para manter transparência, converta para PNG ou WebP.' },
            { q: 'Por que WebP é melhor que JPG para sites?', a: 'WebP usa um algoritmo de compressão mais novo que entrega 25–35% de arquivos menores com a mesma qualidade visual comparado ao JPEG. Isso melhora o Core Web Vitals (especialmente o LCP) e reduz custos de banda.' },
            { q: 'A conversão reduz a qualidade da imagem?', a: 'PNG ↔ PNG é totalmente lossless. PNG → WebP lossless também é lossless. PNG/WebP → JPG introduz leve compressão lossy. JPG → PNG aumenta o tamanho mas não recupera artefatos de compressão JPG.' },
            { q: 'Posso converter 100 imagens de uma vez?', a: 'Sim. O DragNDropp processa todos os arquivos em paralelo. O limite prático é a RAM disponível do seu navegador.' },
            { q: 'Quais formatos o DragNDropp converte?', a: 'JPG/JPEG, PNG e WebP. GIF (primeiro frame estático) também é aceito como entrada. HEIC, AVIF, TIFF e BMP não são suportados atualmente.' },
          ],
        },
        'image-resizer': {
          title:       'Redimensionador de Imagens – Redimensionar por Pixels ou Porcentagem Grátis',
          description: 'Redimensione imagens online por dimensões exatas em pixels ou porcentagem. Proporção travada automaticamente. Grátis, instantâneo, 100% no navegador.',
          h1:      'Redimensionador de Imagens',
          subtitle:'Redimensione por pixels ou porcentagem — proporção travada por padrão.',
          label:   'Redimensionar Imagens',
          options: { mode: 'Modo', byPixels: 'Por Pixels', byPercent: 'Por Porcentagem', width: 'Largura (px)', height: 'Altura (px)', percent: 'Escala (%)', keepRatio: 'Travar Proporção' },
          howTo: {
            heading: 'Como Redimensionar Imagens Online',
            steps: ['Faça upload das suas imagens.', 'Escolha "Por Pixels" ou "Por Porcentagem".', 'Digite as dimensões ou escala desejada. "Travar Proporção" evita distorção.', 'Clique em "Redimensionar Imagens".', 'Baixe as imagens redimensionadas.'],
          },
          features: ['Redimensione por pixels exatos ou porcentagem (1%–400%)', 'Travamento de proporção evita distorção', 'Processamento em lote', 'Formato de saída preservado', 'Interpolação bicúbica via Canvas API para downscaling suave'],
          faq: [
            { q: 'Qual é a resolução máxima de saída?', a: 'O Canvas API do HTML5 suporta no máximo <strong>16.384 × 16.384 pixels</strong> na maioria dos navegadores modernos. Navegadores móveis podem ter limites menores (4.096 × 4.096 px).' },
            { q: 'Redimensionar reduz o tamanho do arquivo?', a: 'Sim — reduzir as dimensões em pixels sempre reduz o tamanho do arquivo proporcionalmente. Dividir largura E altura pela metade reduz a contagem de pixels em 75%, reduzindo o tamanho do arquivo em ~70–80%.' },
            { q: 'O que significa "Travar Proporção"?', a: '"Travar Proporção" significa que ao inserir uma largura, a altura é calculada automaticamente para manter a razão largura:altura original. Isso evita que a imagem pareça esticada ou comprimida.' },
            { q: 'O redimensionamento funciona em GIFs animados?', a: 'O DragNDropp redimensiona apenas o <strong>primeiro frame</strong> de GIFs animados. A saída será uma imagem estática.' },
            { q: 'Posso redimensionar para tamanhos padrão de redes sociais?', a: 'Sim. Tamanhos comuns: Instagram feed = 1080×1080 px; Facebook capa = 820×312 px; LinkedIn capa = 1584×396 px. Defina o modo "Por Pixels", destrave a proporção e insira as dimensões desejadas.' },
            { q: 'Posso ampliar (upscale) uma imagem pequena?', a: 'Sim, mas o upscaling causa pixelação pois novos pixels são interpolados a partir dos existentes. Para melhores resultados em ampliações grandes, use uma ferramenta de upscaling com IA depois de redimensionar.' },
          ],
        },
        'pdf-splitter': {
          title:       'Divisor de PDF – Separar Páginas de PDF Online Grátis (Sem Upload)',
          description: 'Divida um PDF em páginas individuais ou intervalos personalizados gratuitamente. 100% no navegador com pdf-lib.js — seu documento nunca é enviado para nenhum servidor.',
          h1:      'Divisor de PDF',
          subtitle:'Extraia páginas ou divida em arquivos individuais — 100% privado.',
          label:   'Dividir PDF',
          options: { mode: 'Modo de Divisão', allPages: 'Cada Página → PDF Separado', range: 'Intervalos de Páginas Personalizados', rangePlaceholder: 'ex: 1-3, 5, 7-10' },
          howTo: {
            heading: 'Como Dividir um PDF Online (Sem Upload)',
            steps: ['Faça upload do seu PDF.', 'Escolha o modo: "Cada Página" cria um PDF por página, ou "Intervalos Personalizados".', 'Para intervalos, insira: 1-5, 8, 11-15.', 'Clique em "Dividir PDF".', 'Baixe os PDFs resultantes individualmente ou como ZIP.'],
          },
          features: ['100% no navegador com pdf-lib.js', 'Divida em páginas individuais ou grupos de intervalos', 'Preserva qualidade, fontes e conteúdo vetorial originais', 'Preserva hyperlinks e camadas de texto', 'Processamento rápido mesmo para PDFs grandes'],
          faq: [
            { q: 'Dividir um PDF reduz a qualidade do texto ou das imagens?', a: 'Não. O pdf-lib.js copia objetos de página PDF diretamente sem re-renderizá-los. Fontes, gráficos vetoriais, imagens incorporadas e a camada de texto são preservados exatamente como no original.' },
            { q: 'Posso extrair páginas específicas de um PDF?', a: 'Sim. Use o modo "Intervalos Personalizados" e insira páginas individuais ou intervalos, ex: <code>3, 7, 12-15</code>. Isso cria um PDF de saída por grupo.' },
            { q: 'Qual é o tamanho máximo de PDF que posso dividir?', a: 'Limitado pela RAM disponível do navegador. PDFs de até 100 MB processam bem na maioria dos dispositivos. PDFs muito grandes (200 MB+) podem causar estouro de memória.' },
            { q: 'Meu PDF é enviado para um servidor?', a: 'Nunca. O pdf-lib.js roda inteiramente dentro do motor JavaScript do seu navegador. Seus dados de PDF nunca saem do seu dispositivo, compatível com a LGPD.' },
            { q: 'Posso dividir um PDF protegido por senha?', a: 'Você pode dividir um PDF com senha de usuário se o pdf-lib conseguir lê-lo. PDFs com permissões restritivas que negam extração de conteúdo não podem ser divididos sem a senha do proprietário.' },
            { q: 'Posso dividir um PDF digitalizado (baseado em imagem)?', a: 'Sim. PDFs digitalizados são PDFs regulares onde cada página contém uma imagem raster. O DragNDropp os divide exatamente como qualquer outro PDF.' },
          ],
        },
        'pdf-merger': {
          title:       'Mesclador de PDF – Combinar Arquivos PDF Online Grátis (Sem Upload)',
          description: 'Mescle múltiplos arquivos PDF em um só online e gratuitamente. Arraste para reordenar antes de mesclar. 100% no navegador com pdf-lib.js — sem upload.',
          h1:      'Mesclador de PDF',
          subtitle:'Combine múltiplos PDFs na ordem desejada — arraste para reordenar.',
          label:   'Mesclar PDFs',
          options: { reorder: 'Arraste os arquivos para reordená-los antes de mesclar:' },
          howTo: {
            heading: 'Como Mesclar PDFs Online (Sem Software)',
            steps: ['Faça upload de dois ou mais PDFs.', 'Arraste os cards para definir a ordem.', 'Clique em "Mesclar PDFs".', 'Baixe o PDF mesclado.'],
          },
          features: ['Mescle PDFs ilimitados em qualquer ordem', 'Reordenação drag-and-drop antes da mesclagem', '100% no navegador com pdf-lib.js', 'Preserva texto, fontes, imagens e hyperlinks', 'Funciona com PDFs digitalizados, contratos, faturas'],
          faq: [
            { q: 'Quantos PDFs posso mesclar de uma vez?', a: 'Sem limite rígido de quantidade. O limite prático é a RAM do seu dispositivo.' },
            { q: 'O PDF mesclado será maior que a soma dos originais?', a: 'Ligeiramente, sim — o pdf-lib adiciona uma pequena quantidade de metadados. Mas ele não recomprime nenhum conteúdo, então o aumento de tamanho é negligenciável (menos de 1 KB por arquivo mesclado).' },
            { q: 'A mesclagem preserva hyperlinks e marcadores?', a: 'Hyperlinks externos (links para URLs) são totalmente preservados. Hyperlinks internos podem quebrar pois os números de página mudam. Marcadores (bookmarks) do primeiro PDF são incluídos.' },
            { q: 'Posso mesclar um PDF digitalizado com um baseado em texto?', a: 'Sim. O pdf-lib trata todos os PDFs da mesma forma independentemente do tipo de conteúdo.' },
            { q: 'Qual alternativa gratuita ao Adobe Acrobat existe para mesclar PDFs?', a: 'DragNDropp é gratuito e funciona em qualquer navegador moderno. No macOS, o Preview também suporta mesclagem via arrastar na barra lateral de miniaturas. No Linux, <code>pdfunite</code> (parte do poppler-utils) é uma opção de linha de comando.' },
            { q: 'Posso reordenar páginas individuais (não apenas arquivos)?', a: 'Atualmente você pode reordenar arquivos inteiros. A reordenação em nível de página está no roadmap.' },
          ],
        },
        'image-to-pdf': {
          title:       'Imagem para PDF – Converter JPG PNG WebP para PDF Online Grátis',
          description: 'Converta imagens JPG, PNG e WebP para PDF online. Combine múltiplas imagens em um único PDF. Grátis, instantâneo, 100% no navegador — sem upload.',
          h1:      'Imagem para PDF',
          subtitle:'Converta e combine imagens em um PDF instantaneamente.',
          label:   'Converter para PDF',
          options: { pageSize: 'Tamanho da Página', fit: 'Ajuste da Imagem', fitContain: 'Caber na página (letterbox)', fitFill: 'Preencher página (pode cortar bordas)', fitOriginal: 'Tamanho original em pixels', margin: 'Margem da Página (px)' },
          howTo: {
            heading: 'Como Converter Imagens para PDF (Grátis, Sem Upload)',
            steps: ['Faça upload das imagens JPG, PNG ou WebP.', 'Arraste os thumbnails para definir a ordem das páginas no PDF.', 'Escolha tamanho da página, modo de ajuste e margem.', 'Clique em "Converter para PDF".', 'Baixe o PDF resultante.'],
          },
          features: ['Combine imagens ilimitadas em um PDF de múltiplas páginas', 'Suporta JPG, PNG (transparência → fundo branco), WebP', 'Tamanhos de página: A4, Carta US ou Auto (dimensões da imagem)', 'Modos de ajuste: contain, fill ou tamanho original', 'Margens de página configuráveis', '100% no navegador — sem upload'],
          faq: [
            { q: 'Posso controlar a ordem das imagens no PDF?', a: 'Sim. Após o upload, arraste os cards de thumbnail para reordená-los. O PDF será gerado na ordem exata exibida.' },
            { q: 'Qual tamanho de página será usado?', a: '<strong>A4</strong> (210×297 mm) é o padrão internacional. <strong>Carta US</strong> (216×279 mm) é o padrão norte-americano. <strong>Auto</strong> dimensiona cada página exatamente às dimensões em pixels da imagem.' },
            { q: 'A qualidade da imagem será reduzida ao incorporar no PDF?', a: 'Imagens PNG são incorporadas sem perda na resolução original. Imagens JPG são incorporadas como estão sem re-codificação. Imagens WebP são primeiro convertidas para JPEG via Canvas API (qualidade 0.92) antes de serem incorporadas.' },
            { q: 'O que significa "Caber na página (letterbox)"?', a: '"Contain/letterbox" escala a imagem para caber inteiramente dentro da página preservando sua proporção. Barras brancas podem aparecer em dois lados. "Fill" escala para cobrir toda a página, cortando as bordas.' },
            { q: 'Posso adicionar um PNG com transparência a um PDF?', a: 'Sim, mas as páginas PDF têm fundo branco por padrão, então as áreas transparentes do PNG aparecerão brancas no PDF.' },
            { q: 'Posso proteger o PDF resultante com senha?', a: 'Proteção por senha não está disponível ainda na versão client-side. Este recurso está planejado para uma atualização futura.' },
          ],
        },
      }, // end tools

      blog: {
        title:       'Blog – Dicas e Tutoriais de Otimização de Arquivos | DragNDropp',
        description: 'Aprenda a comprimir imagens para SEO, converter formatos, otimizar PDFs e mais. Guias gratuitos do DragNDropp.',
        h1:          'Blog',
        subtitle:    'Dicas, tutoriais e guias aprofundados para otimização de arquivos.',
        posts: [
          { slug: 'webp-vs-jpg', title: 'WebP vs JPG em 2025: Tamanho, Qualidade e Suporte de Navegadores Comparados', date: '2025-02-10',
            excerpt: 'WebP entrega 25–35% de arquivos menores que JPEG com qualidade visual equivalente. Comparamos ambos os formatos em tamanho, transparência, suporte e casos de uso.',
            content: '<h2>O que é WebP?</h2><p>WebP é um formato de imagem moderno desenvolvido pelo Google, projetado para substituir JPEG e PNG para uso na web. Suporta transparência, animação e HDR.</p><h2>Tamanho de Arquivo: WebP vs JPEG</h2><p>Nos benchmarks do Google, WebP lossless é 26% menor que PNG, e WebP lossy é 25–34% menor que JPEG em pontuações SSIM equivalentes.</p><h2>Suporte de Navegadores em 2025</h2><p>WebP é suportado por mais de 96% dos navegadores web globais, incluindo Chrome, Firefox, Edge e Safari 14+. Use WebP para todos os novos projetos web.</p><h2>Conclusão</h2><p>Para uso web em 2025, WebP é o claro vencedor. Converta seus assets com o <a href="/pt/image-converter">Conversor de Imagens DragNDropp</a>.</p>',
          },
          { slug: 'comprimir-imagens-seo', title: 'Como a Compressão de Imagens Melhora Diretamente Seu Ranking no Google', date: '2025-03-01',
            excerpt: 'Imagens grandes são a principal causa de páginas lentas. Comprimir imagens é a ação única mais rápida para melhorar o Core Web Vitals — especialmente o LCP.',
            content: '<h2>A Conexão Entre Imagens e Rankings do Google</h2><p>Desde 2021, o Google usa o Core Web Vitals como fator de ranking. O LCP (Largest Contentful Paint) mede o tempo até o maior elemento visível ser renderizado — em 80%+ das páginas, esse elemento é uma imagem.</p><h2>Exemplo Real: Antes vs Depois da Compressão</h2><p>Uma imagem hero típica de câmera DSLR não otimizada tem 3–8 MB a 6000×4000 px. Após otimização: redimensionar para 1920×1280, comprimir em qualidade 80 para WebP ≈ 180 KB. Isso é uma redução de 97% em bytes.</p><h2>Passos Práticos</h2><ul><li>Audite imagens com o Google PageSpeed Insights.</li><li>Redimensione para corresponder ao tamanho CSS de exibição.</li><li>Comprima em qualidade 75–85.</li><li>Converta para WebP.</li><li>Implemente <code>loading="lazy"</code> e <code>srcset</code> no HTML.</li></ul>',
          },
          { slug: 'o-que-e-compressao-lossless', title: 'Compressão Lossless vs Lossy: Qual Usar?', date: '2025-04-01',
            excerpt: 'Lossless preserva cada pixel. Lossy descarta dados que você não consegue ver. Entender a diferença te salva de desperdiçar armazenamento ou degradar qualidade.',
            content: '<h2>O que é Compressão Lossless?</h2><p>Compressão lossless reduz o tamanho do arquivo preservando cada bit dos dados originais. PNG, GIF (estático), WebP (modo lossless) e TIFF são formatos lossless. Use quando precisar de precisão perfeita de pixels: screenshots, mockups de UI, logos, ícones.</p><h2>O que é Compressão Lossy?</h2><p>Compressão lossy descarta permanentemente informações de pixel que o sistema visual humano provavelmente não notará. JPEG, WebP (modo lossy), HEIC e AVIF são formatos lossy. A chave: sempre mantenha um arquivo mestre lossless original.</p><h2>Guia de Decisão Prático</h2><ul><li><strong>Fotos para web:</strong> WebP lossy qualidade 80 ou JPEG qualidade 80</li><li><strong>Screenshots/UI:</strong> PNG ou WebP lossless</li><li><strong>Logos com transparência:</strong> PNG ou WebP lossless</li><li><strong>Arquivos de impressão:</strong> TIFF lossless ou PDF</li><li><strong>Arquivos de arquivo/master:</strong> Sempre PNG ou TIFF — nunca JPEG</li></ul>',
          },
        ],
      },
    }, // end pt

    // ╔══════════════════════════════════════════╗
    // ║              ESPAÑOL                     ║
    // ╚══════════════════════════════════════════╝
    es: {
      lang: 'es', dir: 'ltr',
      siteName: 'DragNDropp',
      siteTagline: 'Herramientas de Archivos Online Gratis',
      footerTagline: 'Tus archivos nunca salen de tu navegador.',
      footerPrivacy: 'Privacidad', footerTerms: 'Términos', footerContact: 'Contacto',
      nav: { home: 'Inicio', blog: 'Blog' },

      home: {
        title:       'DragNDropp – Herramientas de Imagen y PDF Online Gratis',
        description: 'Comprime imágenes, convierte JPG/PNG/WebP, redimensiona fotos, divide o combina PDFs — 100% gratis, 100% en tu navegador. Sin subida, sin registro.',
        h1:          'Herramientas de Archivos — En Tu Navegador',
        subtitle:    'Sin registro. Sin subida. 100% privado.',
        categoryImage: 'Herramientas de Imagen',
        categoryPdf:   'Herramientas de PDF',
        statsTools:    'Herramientas',
        statsLangs:    'Idiomas',
        statsUploads:  'Subidas',
        statsCost:     'Costo',
        whyPrivate:      'Privado por Diseño',
        whyPrivateDesc:  'Los archivos permanecen en tu dispositivo. Cero subidas a servidores.',
        whyFast:         'Ultra Rápido',
        whyFastDesc:     'El procesamiento ocurre instantáneamente en tu navegador.',
        whyGlobal:       'Multilingüe',
        whyGlobalDesc:   'Disponible en Inglés, Portugués y Español.',
        whyFree:         'Siempre Gratis',
        whyFreeDesc:     'Sin tarifas ocultas, sin suscripción, sin cuenta requerida.',
      },

      processing:  'Procesando tu archivo…',
      downloadBtn: 'Descargar',
      addMoreBtn:  '+ Agregar Más',
      resetBtn:    '↺ Empezar de Nuevo',
      dropText:    'Arrastra archivos aquí o haz clic para examinar',
      dropSubtext: 'Soporta JPG, PNG, WebP, GIF, PDF',

      processingPhases: [
        'Analizando tu archivo…',
        'Optimizando para mejor calidad…',
        'Aplicando algoritmos de compresión…',
        'Finalizando tu descarga…',
      ],

      tools: {
        'image-compressor': {
          title: 'Compresor de Imágenes – Reducir JPG PNG WebP Online Gratis', description: 'Comprime imágenes JPG, PNG y WebP online gratis. Reduce hasta 80% sin pérdida visible. 100% en el navegador.',
          h1: 'Compresor de Imágenes', subtitle: 'Reduce el tamaño sin sacrificar calidad — hasta 80% más pequeño.', label: 'Comprimir Imágenes',
          options: { quality: 'Calidad (0–100)', qualityHint: 'Mayor = mejor calidad, archivo más grande' },
          howTo: { heading: 'Cómo Comprimir Imágenes Online', steps: ['Haz clic o arrastra tus imágenes.', 'Ajusta el slider de calidad — 75 es el equilibrio ideal.', 'Haz clic en "Comprimir Imágenes".', 'Descarga las imágenes o usa "Descargar Todo como ZIP".'] },
          features: ['100% en el navegador — compatible con privacidad', 'Soporta JPG, PNG, WebP, GIF', 'Compresión por lotes', 'Compresión lossy para JPG/WebP, lossless deflate para PNG', 'Badge de porcentaje de ahorro en cada resultado'],
          faq: [
            { q: '¿La compresión es lossless o lossy?', a: 'Para JPG y WebP, DragNDropp usa <strong>compresión lossy</strong> vía Canvas API. Para PNG, usa <strong>compresión lossless deflate</strong>.' },
            { q: '¿Cuánto puedo reducir el tamaño?', a: 'Imágenes fotográficas comprimen 50–80% en calidad 75. Gráficos planos 15–30%. Convertir PNG a WebP antes de comprimir puede dar 40–70% de ahorro.' },
            { q: '¿Puedo comprimir imágenes HEIC o AVIF?', a: 'Actualmente DragNDropp soporta JPG, PNG, WebP y GIF. HEIC y AVIF no son soportados por el Canvas API en todos los navegadores.' },
            { q: '¿Comprimir reduce las dimensiones?', a: 'No. Solo reduce el tamaño en bytes. Para reducir dimensiones, usa nuestro <a href="/es/image-resizer">Redimensionador</a>.' },
            { q: '¿Qué calidad usar para la web?', a: 'La recomendación estándar es <strong>calidad 75–85 para JPEG</strong> y <strong>80–90 para WebP</strong>.' },
            { q: '¿Mis imágenes se suben a un servidor?', a: 'Nunca. DragNDropp procesa todo dentro de tu navegador usando la Canvas API.' },
          ],
        },
        'image-converter': {
          title: 'Conversor de Imágenes – Convertir JPG a PNG, WebP y Más Gratis', description: 'Convierte imágenes entre JPG, PNG y WebP online gratis. 100% en el navegador, sin subida.',
          h1: 'Conversor de Imágenes', subtitle: 'Convierte entre JPG, PNG, WebP — instantáneamente y de forma privada.', label: 'Convertir Imágenes',
          options: { format: 'Formato de Salida' },
          howTo: { heading: 'Cómo Convertir Imágenes Online', steps: ['Sube imágenes.', 'Selecciona el formato de salida.', 'Haz clic en "Convertir Imágenes".', 'Descarga los archivos.'] },
          features: ['Convierte JPG ↔ PNG ↔ WebP', 'Conversión por lotes', 'PNG preserva transparencia alpha', 'JPG rellena transparencia con fondo blanco', 'WebP es 25–35% más pequeño que JPEG equivalente'],
          faq: [
            { q: '¿Cómo convertir HEIC a JPG en Windows?', a: 'HEIC del iPhone no se abre nativamente en Windows sin la extensión de Microsoft. Lo más fácil: en iPhone, ve a Ajustes → Cámara → Formatos → "Más Compatible" (guarda directamente como JPG).' },
            { q: '¿Convertir PNG a JPG pierde el fondo transparente?', a: 'Sí — JPG no soporta transparencia. DragNDropp rellena automáticamente con <strong>fondo blanco</strong>. Para mantener transparencia, convierte a PNG o WebP.' },
            { q: '¿Por qué WebP es mejor que JPG para sitios web?', a: 'WebP usa un algoritmo más moderno que entrega 25–35% de archivos más pequeños con la misma calidad visual, mejorando el Core Web Vitals.' },
            { q: '¿La conversión reduce la calidad?', a: 'PNG ↔ PNG es lossless. PNG → WebP lossless también. PNG/WebP → JPG introduce leve compresión lossy.' },
            { q: '¿Puedo convertir 100 imágenes a la vez?', a: 'Sí. DragNDropp procesa todos los archivos en paralelo.' },
            { q: '¿Qué formatos convierte DragNDropp?', a: 'JPG/JPEG, PNG y WebP. GIF (primer frame estático) también se acepta como entrada.' },
          ],
        },
        'image-resizer': {
          title: 'Redimensionador de Imágenes – Cambiar Tamaño por Píxeles o Porcentaje Gratis', description: 'Redimensiona imágenes online por píxeles exactos o porcentaje. Proporción bloqueada automáticamente. 100% en el navegador.',
          h1: 'Redimensionador de Imágenes', subtitle: 'Redimensiona por píxeles o porcentaje — proporción bloqueada por defecto.', label: 'Redimensionar Imágenes',
          options: { mode: 'Modo', byPixels: 'Por Píxeles', byPercent: 'Por Porcentaje', width: 'Ancho (px)', height: 'Alto (px)', percent: 'Escala (%)', keepRatio: 'Bloquear Proporción' },
          howTo: { heading: 'Cómo Redimensionar Imágenes Online', steps: ['Sube tus imágenes.', 'Elige modo y dimensiones.', 'Activa "Bloquear Proporción" para evitar distorsión.', 'Haz clic en "Redimensionar Imágenes".', 'Descarga.'] },
          features: ['Redimensiona por píxeles exactos o porcentaje (1%–400%)', 'Bloqueo de proporción evita distorsión', 'Procesamiento por lotes', 'Formato de salida preservado', 'Interpolación bicúbica vía Canvas API'],
          faq: [
            { q: '¿Cuál es la resolución máxima de salida?', a: 'El Canvas API soporta máximo <strong>16.384 × 16.384 píxeles</strong> en la mayoría de navegadores.' },
            { q: '¿Redimensionar reduce el tamaño del archivo?', a: 'Sí — reducir dimensiones de píxeles siempre reduce el tamaño del archivo proporcionalmente.' },
            { q: '¿Qué significa "Bloquear Proporción"?', a: 'Significa que al ingresar un ancho, la altura se calcula automáticamente para mantener la razón original. Evita que la imagen se vea estirada.' },
            { q: '¿El redimensionado funciona en GIFs animados?', a: 'DragNDropp redimensiona solo el <strong>primer frame</strong> de GIFs animados.' },
            { q: '¿Puedo redimensionar a tamaños estándar de redes sociales?', a: 'Sí. Instagram feed = 1080×1080 px; Facebook portada = 820×312 px; LinkedIn portada = 1584×396 px.' },
            { q: '¿Puedo ampliar (upscale) una imagen pequeña?', a: 'Sí, pero el upscaling causa pixelación ya que los nuevos píxeles se interpolan.' },
          ],
        },
        'pdf-splitter': {
          title: 'Divisor de PDF – Separar Páginas de PDF Online Gratis (Sin Subida)', description: 'Divide un PDF en páginas individuales o rangos personalizados gratis. 100% en el navegador con pdf-lib.js.',
          h1: 'Divisor de PDF', subtitle: 'Extrae páginas o divide en archivos individuales — 100% privado.', label: 'Dividir PDF',
          options: { mode: 'Modo de División', allPages: 'Cada Página → PDF Separado', range: 'Rangos de Páginas Personalizados', rangePlaceholder: 'ej: 1-3, 5, 7-10' },
          howTo: { heading: 'Cómo Dividir un PDF Online (Sin Subida)', steps: ['Sube tu PDF.', 'Elige el modo de división.', 'Para rangos, ingresa: 1-5, 8, 11-15.', 'Haz clic en "Dividir PDF".', 'Descarga los PDFs resultantes.'] },
          features: ['100% en el navegador con pdf-lib.js', 'Divide en páginas individuales o grupos de rangos', 'Preserva calidad, fuentes y contenido vectorial', 'Preserva hipervínculos y capas de texto', 'Procesamiento rápido para PDFs grandes'],
          faq: [
            { q: '¿Dividir un PDF reduce la calidad?', a: 'No. pdf-lib.js copia objetos de página PDF directamente sin re-renderizarlos.' },
            { q: '¿Puedo extraer páginas específicas?', a: 'Sí. Usa el modo "Rangos Personalizados" e ingresa páginas o rangos, ej: <code>3, 7, 12-15</code>.' },
            { q: '¿Cuál es el tamaño máximo de PDF?', a: 'Limitado por la RAM disponible del navegador. PDFs de hasta 100 MB procesan bien en la mayoría de dispositivos.' },
            { q: '¿Mi PDF se sube a un servidor?', a: 'Nunca. pdf-lib.js se ejecuta completamente dentro del motor JavaScript de tu navegador.' },
            { q: '¿Puedo dividir un PDF protegido con contraseña?', a: 'Solo si pdf-lib puede leerlo. PDFs con permisos restrictivos que niegan extracción de contenido no pueden dividirse.' },
            { q: '¿Puedo dividir un PDF escaneado?', a: 'Sí. Los PDFs escaneados son PDFs regulares donde cada página contiene una imagen raster.' },
          ],
        },
        'pdf-merger': {
          title: 'Combinador de PDF – Unir Archivos PDF Online Gratis (Sin Subida)', description: 'Combina múltiples archivos PDF en uno online gratis. Arrastra para reordenar antes de combinar. 100% en el navegador con pdf-lib.js.',
          h1: 'Combinador de PDF', subtitle: 'Combina múltiples PDFs en el orden deseado — arrastra para reordenar.', label: 'Combinar PDFs',
          options: { reorder: 'Arrastra los archivos para reordenarlos antes de combinar:' },
          howTo: { heading: 'Cómo Combinar PDFs Online (Sin Software)', steps: ['Sube dos o más PDFs.', 'Arrastra las tarjetas para definir el orden.', 'Haz clic en "Combinar PDFs".', 'Descarga el PDF combinado.'] },
          features: ['Combina PDFs ilimitados en cualquier orden', 'Reordenación drag-and-drop', '100% en el navegador con pdf-lib.js', 'Preserva texto, fuentes, imágenes e hipervínculos', 'Funciona con PDFs escaneados, contratos, facturas'],
          faq: [
            { q: '¿Cuántos PDFs puedo combinar a la vez?', a: 'Sin límite estricto. El límite práctico es la RAM de tu dispositivo.' },
            { q: '¿El PDF combinado será más grande?', a: 'Ligeramente — pdf-lib agrega pequeños metadatos. Pero no recomprime ningún contenido.' },
            { q: '¿Se preservan hipervínculos y marcadores?', a: 'Los hipervínculos externos se preservan totalmente. Los internos pueden romperse. Los marcadores del primer PDF se incluyen.' },
            { q: '¿Puedo combinar un PDF escaneado con uno de texto?', a: 'Sí. pdf-lib trata todos los PDFs igual.' },
            { q: '¿Hay alternativa gratuita a Adobe Acrobat?', a: 'Sí — DragNDropp es completamente gratis. En macOS, Preview también soporta combinar PDFs. En Linux, <code>pdfunite</code> es una opción de línea de comandos.' },
            { q: '¿Puedo reordenar páginas individuales?', a: 'Actualmente puedes reordenar archivos completos. La reordenación a nivel de página está en el roadmap.' },
          ],
        },
        'image-to-pdf': {
          title: 'Imagen a PDF – Convertir JPG PNG WebP a PDF Online Gratis', description: 'Convierte imágenes JPG, PNG y WebP a PDF online. Combina múltiples imágenes en un solo PDF. Gratis, instantáneo, 100% en el navegador.',
          h1: 'Imagen a PDF', subtitle: 'Convierte y combina imágenes en un PDF instantáneamente.', label: 'Convertir a PDF',
          options: { pageSize: 'Tamaño de Página', fit: 'Ajuste de Imagen', fitContain: 'Caber en página (letterbox)', fitFill: 'Llenar página (puede recortar)', fitOriginal: 'Tamaño original en píxeles', margin: 'Margen de Página (px)' },
          howTo: { heading: 'Cómo Convertir Imágenes a PDF (Gratis, Sin Subida)', steps: ['Sube imágenes JPG, PNG o WebP.', 'Arrastra las miniaturas para definir el orden de páginas.', 'Elige tamaño de página, modo de ajuste y margen.', 'Haz clic en "Convertir a PDF".', 'Descarga el PDF resultante.'] },
          features: ['Combina imágenes ilimitadas en un PDF multipágina', 'Soporta JPG, PNG (transparencia → fondo blanco), WebP', 'Tamaños: A4, Carta US o Auto', 'Modos de ajuste: contain, fill o tamaño original', 'Márgenes configurables', '100% en el navegador'],
          faq: [
            { q: '¿Puedo controlar el orden de imágenes en el PDF?', a: 'Sí. Arrastra las tarjetas de miniatura para reordenarlas. El PDF se generará en el orden exacto mostrado.' },
            { q: '¿Qué tamaño de página se usará?', a: '<strong>A4</strong> (210×297 mm) es el estándar internacional. <strong>Carta US</strong> (216×279 mm) es el estándar norteamericano. <strong>Auto</strong> dimensiona cada página exactamente a las dimensiones de la imagen.' },
            { q: '¿Se reducirá la calidad de la imagen?', a: 'PNG se incrusta sin pérdida. JPG se incrusta tal cual. WebP se convierte primero a JPEG vía Canvas API (calidad 0.92).' },
            { q: '¿Qué significa "Caber en página (letterbox)"?', a: '"Contain/letterbox" escala la imagen para caber completamente dentro de la página preservando su proporción. Pueden aparecer barras blancas.' },
            { q: '¿Puedo agregar un PNG con transparencia?', a: 'Sí, pero las páginas PDF tienen fondo blanco por defecto, por lo que las áreas transparentes aparecerán blancas.' },
            { q: '¿Puedo proteger el PDF con contraseña?', a: 'La protección con contraseña no está disponible en la versión client-side actualmente.' },
          ],
        },
      }, // end tools

      blog: {
        title:       'Blog – Consejos y Tutoriales de Optimización de Archivos | DragNDropp',
        description: 'Aprende a comprimir imágenes para SEO, convertir formatos y optimizar PDFs.',
        h1:          'Blog',
        subtitle:    'Consejos, tutoriales y guías detalladas para optimización de archivos.',
        posts: [
          { slug: 'webp-vs-jpg', title: 'WebP vs JPG en 2025: Tamaño, Calidad y Soporte de Navegadores', date: '2025-02-10',
            excerpt: 'WebP entrega 25–35% de archivos más pequeños que JPEG con calidad visual equivalente. Comparamos ambos formatos.',
            content: '<h2>¿Qué es WebP?</h2><p>WebP es un formato de imagen moderno desarrollado por Google para reemplazar JPEG y PNG en la web. Soporta transparencia, animación y HDR.</p><h2>Soporte de Navegadores en 2025</h2><p>WebP es soportado por más del 96% de los navegadores globales. Para uso web en 2025, WebP es el claro ganador. Convierte con <a href="/es/image-converter">DragNDropp Image Converter</a>.</p>',
          },
          { slug: 'compresion-lossless-vs-lossy', title: 'Compresión Lossless vs Lossy: ¿Cuál Usar?', date: '2025-04-01',
            excerpt: 'Lossless preserva cada píxel. Lossy descarta datos que no puedes ver. Entender la diferencia te ahorra almacenamiento o degradación de calidad.',
            content: '<h2>¿Qué es la Compresión Lossless?</h2><p>La compresión lossless reduce el tamaño del archivo preservando cada bit de los datos originales. PNG, WebP lossless y TIFF son formatos lossless.</p><h2>¿Qué es la Compresión Lossy?</h2><p>La compresión lossy descarta permanentemente información de píxeles que el sistema visual humano probablemente no notará. JPEG, WebP lossy, HEIC y AVIF son formatos lossy.</p><h2>Guía de Decisión Práctica</h2><ul><li><strong>Fotos para web:</strong> WebP lossy calidad 80 o JPEG calidad 80</li><li><strong>Capturas/UI:</strong> PNG o WebP lossless</li><li><strong>Archivos maestros:</strong> Siempre PNG o TIFF — nunca JPEG</li></ul>',
          },
        ],
      },
    }, // end es

  }; // end i18n

  return { i18n, TOOLS };

})();
