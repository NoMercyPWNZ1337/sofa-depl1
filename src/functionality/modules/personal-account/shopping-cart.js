;(async () => {
  const { AuthService } = await import('../../services/auth.js')
  const { ProductService } = await import('../../services/product.js')

  await AuthService.checkAuth()

  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
  const products = document.querySelector('#products')

  try {
    const responseProducts = await ProductService.getAllForShoppingCart({
      productIds: JSON.stringify(shoppingCart),
    })

    if (!responseProducts.success) return

    if (responseProducts.products.length) {
      const productListHtml = responseProducts.products.map(product => {
        return `
          <div class="product">
            <img 
              class="product-image"
              src="${product.image}" 
              alt="product image" 
            />
            <a class="product-title" href="">${product.name}</a>
            <p class="product-stock">
              В наявності: ${product.quantityInDrugstore}
            </p>
            <p class="product-price ${product.discountedPrice ? 'active' : ''}">
              <span>
                <span class="price">${product.price}</span>
                ${
                  product.discountedPrice &&
                  `<span class="discounted">
                    ${product.discountedPrice}
                  </span>`
                }
                грн
              </span>
              <span class="text">за упаковку</span>
            </p>
            <form class="product-quantity" data-quantity>
              <button class="btn" data-minus>-</button>
              <input
                disabled
                class="form-input" 
                value="${product.quantityInDrugstore}" 
              />
              <button class="btn" data-plus>+</button>
            </form>
            <button class="btn" data-remove>Видалити</button>
          </div>
        `
      })

      products.innerHTML = productListHtml.join('')
    }
  } catch (error) {
    console.log(error)
  }
})()