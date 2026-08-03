import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const studioRoot = process.cwd()
const legacyRoot = resolve(studioRoot, '../site/blog/posts')
const outputRoot = resolve(studioRoot, 'notes')

const posts = [
  { slug: 'executable-context-for-enterprise-agents', label: '上下文工程' },
  { slug: 'agent-harness-engineering-map', label: '专题与随笔' },
]

const text = (html) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

function buildToc(prose, slug) {
  let headingNumber = 0
  const proseWithIds = prose.replace(/<h([2-4])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attributes, inner) => {
    headingNumber += 1
    if (/\bid\s*=\s*["'][^"']+["']/i.test(attributes)) return match
    return `<h${level}${attributes} id="section-${headingNumber}">${inner}</h${level}>`
  })
  const headings = [...proseWithIds.matchAll(/<h([2-4])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)]
    .map(([, level, attributes, inner]) => ({
      level: Number(level),
      id: attributes.match(/\bid\s*=\s*["']([^"']+)["']/i)?.[1],
      label: text(inner),
      children: [],
    }))
    .filter((heading) => heading.id && heading.label)

  const roots = []
  const stack = []
  headings.forEach((heading) => {
    while (stack.length && stack.at(-1).level >= heading.level) stack.pop()
    const parent = stack.at(-1)
    if (parent) parent.children.push(heading)
    else roots.push(heading)
    stack.push(heading)
  })

  let controlNumber = 0
  const render = (nodes, depth = 0, listId = '') => {
    const listClass = depth === 0 ? 'article-toc-list article-toc-root' : 'article-toc-list'
    const idAttribute = listId ? ` id="${listId}"` : ''
    return `<ol class="${listClass}"${idAttribute}>${nodes.map((node) => {
      const hasChildren = node.children.length > 0
      const itemClass = `article-toc-item article-toc-depth-${depth}${hasChildren ? ' article-toc-has-children' : ''}`
      const controlId = `toc-${slug}-${controlNumber++}`
      const marker = hasChildren
        ? `<button class="article-toc-toggle" type="button" aria-expanded="true" aria-controls="${controlId}" aria-label="折叠 ${escapeHtml(node.label)}"><span aria-hidden="true"></span></button>`
        : '<span class="article-toc-spacer" aria-hidden="true"></span>'
      const children = hasChildren ? render(node.children, depth + 1, controlId) : ''
      return `<li class="${itemClass}"><div class="article-toc-row">${marker}<a class="article-toc-link" href="#${escapeHtml(node.id)}">${escapeHtml(node.label)}</a></div>${children}</li>`
    }).join('')}</ol>`
  }

  return { prose: proseWithIds, toc: roots.length ? render(roots) : '<p class="article-toc-empty">暂无目录</p>' }
}

function documentShell({ title, label, subtitle, meta, tags, toc, prose }) {
  const tocLinks = toc || '<a href="#article">开始阅读</a>'
  return `<!doctype html>
<html lang="zh-CN"><head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#f4f2ec" /><title>${title}｜宇轩 Yuxuan</title>
  <link rel="stylesheet" href="../styles.css" />
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'
    mermaid.initialize({ startOnLoad: true, theme: 'base', securityLevel: 'loose', themeVariables: { fontFamily: 'ui-sans-serif, system-ui, sans-serif', primaryColor: '#eef5ff', primaryTextColor: '#18355f', primaryBorderColor: '#9eb7d8', lineColor: '#6583a9', secondaryColor: '#fff5e8', tertiaryColor: '#f4f2ec' } })
  </script>
</head><body class="notes-page">
  <a class="skip-link" href="#article">跳到主要内容</a>
  <header class="site-header"><div class="header-inner">
    <a class="brand" href="../index.html#top" aria-label="返回宇轩 Yuxuan 首页"><span class="brand-flower" aria-hidden="true">✳</span><span>宇轩 <i>YUXUAN</i></span></a>
    <nav class="site-nav" aria-label="主导航"><a href="../index.html#work">项目</a><a href="../index.html#bring">能力</a><a href="../blog.html" aria-current="page">笔记</a><a href="../index.html#about">关于</a></nav>
  </div></header>
  <main class="notes-main" id="article"><div class="notes-wrap"><div class="article-shell">
    <aside class="article-toc" aria-label="本章目录"><small>本章目录 · CONTENTS</small>${tocLinks}</aside>
    <article><a class="article-back" href="../blog.html">← 返回 Product Notes</a>
      <header class="article-header"><p class="article-series">${label}</p><h1>${title}</h1><p class="article-dek">${subtitle}</p><div class="article-meta">${meta}${tags.length ? `<span class="article-tags" aria-label="文章标签">${tags.map((tag) => `<span>${tag}</span>`).join('')}</span>` : ''}</div></header>
      <div class="article-body">${prose}</div>
    </article>
  </div></div></main>
  <a class="note-companion" href="../light-world.html" aria-label="去光的阅读室，认识小光" title="小光在这里陪你阅读"></a>
  <script>
    document.querySelectorAll('.article-toc-toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true'
        const children = document.getElementById(toggle.getAttribute('aria-controls'))
        toggle.setAttribute('aria-expanded', String(!expanded))
        toggle.setAttribute('aria-label', (expanded ? '展开 ' : '折叠 ') + toggle.closest('.article-toc-item').querySelector('.article-toc-link').textContent)
        children.hidden = expanded
      })
    })
  </script>
</body></html>`
}

for (const post of posts) {
  const source = await readFile(resolve(legacyRoot, `${post.slug}.html`), 'utf8')
  const header = source.match(/<header class="post-header">([\s\S]*?)<\/header>/)?.[1] || ''
  const title = text(header.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] || post.slug)
  const subtitle = text(header.match(/<p class="subtitle">([\s\S]*?)<\/p>/)?.[1] || '')
  const rawMeta = header.match(/<div class="meta">([\s\S]*?)<\/div>/)?.[1] || ''
  const meta = [...rawMeta.matchAll(/<span>([^<]+)<\/span>/g)].map(([, value]) => text(value)).filter((value) => value && value !== '·').join(' · ')
  const tags = [...rawMeta.matchAll(/<span class="chip">([^<]+)<\/span>/g)].map(([, value]) => text(value))
  const start = source.indexOf('<div class="prose">')
  const end = source.indexOf('\n      <div class="post-footer">', start)
  let prose = source.slice(start + '<div class="prose">'.length, end > start ? end : undefined)
  prose = prose
    .replaceAll('src="../assets/', 'src="../../site/blog/assets/')
    .replaceAll('href="executable-context-for-enterprise-agents.html"', 'href="./executable-context-for-enterprise-agents.html"')
    .replaceAll('href="agent-harness-engineering-map.html"', 'href="./agent-harness-engineering-map.html"')
  const generated = buildToc(prose, post.slug)
  prose = generated.prose
  await mkdir(outputRoot, { recursive: true })
  await writeFile(resolve(outputRoot, `${post.slug}.html`), documentShell({ title, label: post.label, subtitle, meta, tags, toc: generated.toc, prose }), 'utf8')
}
