export const addToWatched = ({ productId }) => {
  let watchedProducts =
    JSON.parse(localStorage.getItem('watchedProducts')) || []

  if (!watchedProducts.includes(productId)) {
    watchedProducts.push(productId)
  }

  localStorage.setItem('watchedProducts', JSON.stringify(watchedProducts))
}
