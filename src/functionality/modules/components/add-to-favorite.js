const actualDOM = () => {
  return {
    tofavoritesBtns: document.querySelectorAll('button[data-to-favorite]'),
    favorite: document.querySelector('#favorite'),
    favoriteQuantity: favorite.querySelector('#favorite-quantity'),
  }
}

export const addToFavorite = () => {
  const DOM = actualDOM()
  let favorites = JSON.parse(localStorage.getItem('favorites')) || []

  const showfavoritesQuantity = () => {
    DOM.favoriteQuantity.innerHTML = favorites.length

    if (favorites.length) {
      DOM.favorite.classList.add('active')
    } else {
      DOM.favorite.classList.remove('active')
    }
  }

  showfavoritesQuantity()

  DOM.tofavoritesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const favoriteId = btn.dataset.toFavorite

      if (!favorites.includes(favoriteId)) {
        favorites.push(favoriteId)

        btn.classList.add('active')
        showfavoritesQuantity()
      } else {
        favorites = favorites.filter(id => id !== favoriteId)

        btn.classList.remove('active')
        showfavoritesQuantity()
      }

      localStorage.setItem('favorites', JSON.stringify(favorites))
    })
  })
}
