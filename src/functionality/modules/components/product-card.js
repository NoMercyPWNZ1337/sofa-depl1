 //<button 
        //     class="card-favorite ${hasInFavorites && 'active'}"
        //     data-to-favorite="${product._id}"
        //   >
        //   <svg
        //     version="1.1"
        //     xmlns="http://www.w3.org/2000/svg"
        //     xmlns:xlink="http://www.w3.org/1999/xlink"
        //     viewBox="0 0 47.94 47.94"
        //     xml:space="preserve"
        //   >
        //     <path
        //       d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
        //         c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
        //         c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
        //         c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
        //         c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
        //         C22.602,0.567,25.338,0.567,26.285,2.486z
        //       "
        //     />
        //   </svg>
        // </button>


        // <p class="card-manufacturer">Виробник: ${product.manufacturer}</p>
      // <p class="card-stock ${product.quantityInDrugstore <= 0 && 'active'}">
      //   ${
      //     product.quantityInDrugstore > 0
      //       ? `В наявності: ${product.quantityInDrugstore}`
      //       : 'Немає в наявності'
      //   }
      // </p>

 // <span class="text">за упаковку</span>

       // <button 
      //     ${product.quantityInDrugstore <= 0 && 'disabled'}
      //     class="card-btn btn ${hasInCart && 'active'}" 
      //     data-to-cart="${product._id}"
      //   >
      //   ${hasInCart ? 'В кошику' : 'В кошик'}
      // </button>

export const productCard = ({ product }) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  const hasInCart = shoppingCart.includes(product._id)
  const hasInFavorites = favorites.includes(product._id)

  return `
    <article class="product-card">
      <a href="/product?productId=${product._id}" class="card-image"><img class="card-image" src="${product.image}" alt="product image"  /></a>
      <h3 class="card-title">
        <a href="/product?productId=${product._id}">${product.name}</a>


      </h3>

      
      <p class="card-price ${product.discountedPrice ? 'active' : ''}">
        <span>
          <span class="price">${product.price}</span>
          ${
            product.discountedPrice
              ? `<span class="discounted">
              ${product.discountedPrice}
            </span>`
              : ''
          }
          грн
        </span>
       

      </p>
     

    </article>
  `
}
