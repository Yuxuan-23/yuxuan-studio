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
    menu.querySelectorAll('.site-nav-menu a').forEach((link) => {
      link.addEventListener('click', () => menu.removeAttribute('open'))
    })
  })
}
