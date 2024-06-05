const actualDOM = () => {
  return {
    header: document.querySelector('#header'),
    menu: document.querySelector('#menu'),
  }
}

export const toggleMenu = () => {
  const DOM = actualDOM()

  DOM.menu.addEventListener('click', e => {
    if (e.target.dataset.openMenu) {
      DOM.header.classList.add('active')
    }

    if (e.target.dataset.closeMenu) {
      DOM.header.classList.remove('active')
    }
  })
}
