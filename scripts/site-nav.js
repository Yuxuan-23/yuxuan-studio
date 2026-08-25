const projectMenus = document.querySelectorAll('.site-nav-projects')

if (projectMenus.length) {
  document.addEventListener('click', (event) => {
    projectMenus.forEach((menu) => {
      if (menu.open && !menu.contains(event.target)) {
        menu.removeAttribute('open')
      }
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return

    projectMenus.forEach((menu) => {
      if (!menu.open) return
      menu.removeAttribute('open')
      menu.querySelector('summary')?.focus()
    })
  })

  projectMenus.forEach((menu) => {
    const projectList = menu.querySelector('.site-nav-menu')
    const allProjectsLink = projectList?.querySelector('.site-nav-all-projects')

    if (projectList && !projectList.querySelector('.site-nav-explore')) {
      const exploreLink = document.createElement('a')
      exploreLink.className = 'site-nav-explore'
      exploreLink.href = './explore.html'
      exploreLink.innerHTML = '<strong>能力探索地图</strong><small>四座岛屿 · 同一产品世界</small>'
      if (window.location.pathname.endsWith('/explore.html')) exploreLink.setAttribute('aria-current', 'page')
      projectList.insertBefore(exploreLink, allProjectsLink ?? null)
    }

    menu.querySelectorAll('.site-nav-menu a').forEach((link) => {
      link.addEventListener('click', () => menu.removeAttribute('open'))
    })
  })
}
