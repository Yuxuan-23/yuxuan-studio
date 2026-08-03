(function () {
  const toc = document.querySelector('.article-toc')
  const article = document.querySelector('.article-body')
  if (!toc || !article) return

  const headings = Array.from(article.querySelectorAll('h2, h3, h4'))
  if (!headings.length) return

  const nodes = []
  let generatedId = 0
  headings.forEach((heading) => {
    const owner = heading.closest('[id]')
    const targetId = heading.id || (owner && owner !== article ? owner.id : `article-section-${++generatedId}`)
    if (!heading.id && targetId.startsWith('article-section-')) heading.id = targetId
    nodes.push({ element: heading, targetId, level: Number(heading.tagName.slice(1)), children: [] })
  })

  const roots = []
  const stack = []
  nodes.forEach((node) => {
    while (stack.length && stack[stack.length - 1].level >= node.level) stack.pop()
    const parent = stack[stack.length - 1]
    if (parent) parent.children.push(node)
    else roots.push(node)
    stack.push(node)
  })

  const label = toc.querySelector('small')
  toc.replaceChildren(label)
  const rootList = document.createElement('ol')
  rootList.className = 'article-toc-list article-toc-root'
  toc.append(rootList)

  let controlNumber = 0
  function render(nodes, list, depth) {
    nodes.forEach((node) => {
      const item = document.createElement('li')
      item.className = `article-toc-item article-toc-depth-${depth}`

      const row = document.createElement('div')
      row.className = 'article-toc-row'
      const link = document.createElement('a')
      link.className = 'article-toc-link'
      link.href = `#${node.targetId}`
      link.textContent = node.element.textContent.replace(/\s+/g, ' ').trim()

      if (node.children.length) {
        item.classList.add('article-toc-has-children')
        const toggle = document.createElement('button')
        const childrenId = `article-toc-children-${controlNumber++}`
        toggle.className = 'article-toc-toggle'
        toggle.type = 'button'
        toggle.setAttribute('aria-expanded', 'true')
        toggle.setAttribute('aria-controls', childrenId)
        toggle.setAttribute('aria-label', `折叠 ${link.textContent}`)
        toggle.innerHTML = '<span aria-hidden="true"></span>'
        toggle.addEventListener('click', () => {
          const expanded = toggle.getAttribute('aria-expanded') === 'true'
          toggle.setAttribute('aria-expanded', String(!expanded))
          toggle.setAttribute('aria-label', `${expanded ? '展开' : '折叠'} ${link.textContent}`)
          childrenList.hidden = expanded
        })
        row.append(toggle)

        const childrenList = document.createElement('ol')
        childrenList.id = childrenId
        childrenList.className = 'article-toc-list'
        render(node.children, childrenList, depth + 1)
        item.append(row, childrenList)
      } else {
        const spacer = document.createElement('span')
        spacer.className = 'article-toc-spacer'
        spacer.setAttribute('aria-hidden', 'true')
        row.append(spacer)
        item.append(row)
      }

      row.append(link)
      list.append(item)
    })
  }

  render(roots, rootList, 0)
})()
