export const addToFavorite = () => {
  const tofavoritesBtns = document.querySelectorAll('button[data-to-favorite]')
  const favorite = document.querySelector('#favorite')
  const favoriteQuantity = favorite.querySelector('#favorite-quantity')

  let favorites = JSON.parse(localStorage.getItem('favorites')) || []

  const showfavoritesQuantity = () => {
    favoriteQuantity.innerHTML = favorites.length

    if (favorites.length) {
      favorite.classList.add('active')
    } else {
      favorite.classList.remove('active')
    }
  }

  showfavoritesQuantity()

  tofavoritesBtns.forEach(btn => {
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
