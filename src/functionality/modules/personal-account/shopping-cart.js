const actualDOM = () => {
  return {
    shoppingCart: document.querySelector('#shopping-cart'),
    submitOrderBtn: document.querySelector('#submit-order'),
    removeProductBtns: document.querySelectorAll(
      '#shopping-cart .product .btn[data-remove-id]'
    ),
    changeQuantityForms: document.querySelectorAll(
      '#shopping-cart .product form[data-product-id]'
    ),
    amountOrder: document.querySelector('#amount-order'),
    submitOrderBtnWrapper: document.querySelector('#submit-order-wrapper'),
  }
}

const productTemplate = ({ product }) => {
  return `
    <div class="product">
      <a href="/product?productId=${product._id}">
      <img 
        class="product-image"
        src="${product.image}" 
        alt="product image" 
      />
      </a>
      <a class="product-title" href="/product?productId=${product._id}">
        ${product.name}
      </a>
      <p class="product-stock">
        В наявності: ${product.quantityInDrugstore}
      </p>
      <p class="product-price ${product.discountedPrice ? 'active' : ''}">
        <span>
          <span class="price">${product.price}</span>
          ${product.discountedPrice
      ? `<span class="discounted">
              ${product.discountedPrice}
            </span>`
      : ''
    }
          грн
        </span>
        <span class="text">за упаковку</span>
      </p>
      <form 
          class="product-quantity" 
          data-product-id="${product._id}"
          data-max="${product.quantityInDrugstore}"
        >
        <button class="btn" name="minus">-</button>
        <input
          disabled
          value="1"
          name="quantity"
          class="form-input" 
        />
        <button class="btn" name="plus">+</button>
      </form>
      <button class="btn" data-remove-id="${product._id}">
        Видалити
      </button>
    </div>
  `
}

  ; (async () => {
    const { AuthService } = await import('../../services/auth.js')
    const { ProductService } = await import('../../services/product.js')
    const { OrderService } = await import('../../services/order.js')
    const { Redirect } = await import('../../utils/redirect.utillity.js')

    let userId = null

    try {
      const responseAuth = await AuthService.checkAuth()

      if (!responseAuth?.success) return

      userId = responseAuth.user._id
    } catch (error) {
      console.log(error)
    }

    const DOM = actualDOM()

    let productsData = []
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || []

    const amountOrder = () => {
      const productPrices = productsData.map(product => {
        return (product.discountedPrice || product.price) * +product.quantity
      })
      // const totalPrice = Math.round(
      //   productPrices.reduce((acc, price) => acc + price, 0)
      // )
      const totalPrice = Number(
        productPrices.reduce((acc, price) => acc + price, 0).toFixed(2)
      );

      DOM.amountOrder.innerHTML = `До оплати без доставки: <span style="font-weight: 700">${totalPrice}</span> грн`

      return totalPrice
    }

    const onRemoveProduct = () => {
      const removeBtns = actualDOM().removeProductBtns

      removeBtns.forEach(btn => {
        btn.addEventListener('click', e => {
          const productId = e.target.dataset.removeId

          shoppingCart = shoppingCart.filter(id => id !== productId)

          localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

          window.location.reload()
        })
      })
    }

    const onChangeQuantityProduct = () => {
      const quantityForms = actualDOM().changeQuantityForms

      quantityForms.forEach(form => {
        form.addEventListener('click', e => {
          e.preventDefault()

          const maxQuantity = +form.dataset.max
          const productId = form.dataset.productId
          const productIndex = productsData.findIndex(product => {
            return product._id === productId
          })

          if (e.target.name === 'plus') {
            if (form.quantity.value >= maxQuantity) {
              alert(`В продавця в наявності є тільки - ${maxQuantity}`)

              return
            }

            form.quantity.value++
          }
          if (e.target.name === 'minus') {
            if (form.quantity.value <= 1) return

            form.quantity.value--
          }

          productsData[productIndex].quantity = form.quantity.value

          amountOrder()
        })
      })
    }

    try {
      const responseProducts = await ProductService.getAllForShoppingCart({
        productIds: JSON.stringify(shoppingCart),
      })

      if (!responseProducts.success) return

      if (responseProducts.products.length) {
        DOM.submitOrderBtnWrapper.classList.add('show')

        productsData = responseProducts.products.map(product => ({
          ...product,
          quantity: 1,
        }))

        const productListHtml = responseProducts.products.map(product => {
          return productTemplate({ product })
        })

        DOM.shoppingCart.innerHTML = productListHtml.join('')

        onRemoveProduct()
        onChangeQuantityProduct()
        amountOrder()
      } else {
        DOM.shoppingCart.innerHTML = `<h3>Товарів в кошику ще немає</h3>`
      }
    } catch (error) {
      console.log(error)
    }

    DOM.submitOrderBtn.addEventListener('click', async () => {
      const isRecipe = productsData.find(product => product.withRecipe)
      const recipeNumber = isRecipe && prompt('Введіть номер рецепту')

      if (isRecipe && (recipeNumber.length !== 4 || !Number(recipeNumber))) {
        alert('Введіть корректний номер рецепту')
        return
      }

      // Показати модальне вікно для введення адреси
      modal.style.display = 'block';

      // Закрити модальне вікно при кліку на перехрестя
      document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
      });

      // Закрити модальне вікно при кліку на пусте місце
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      // Очистити інпут адреси при відкритті модального вікна
      document.getElementById('address-input').value = '';

      const submitAddressBtn = document.getElementById('submit-address');
      

      // Обробка кліку по кнопці "Підтвердити" в модальному вікні
      const handleSubmitAddress = async () => {
        const address = document.getElementById('address-input').value;

        if (!address?.length) {
          alert('Ви не ввели адресу')
          return
        }

        try {
          const date = new Date()

          const productsInOrder = productsData.map(product => ({
            name: product.name,
            quantity: product.quantity,
            _id: product._id,
            remainingQuantity: product.quantityInDrugstore - product.quantity,
          }))

          const responseOrder = await OrderService.create({
            orderData: {
              userId,
              amount: amountOrder(),
              products: productsInOrder,
              date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
              address,
            },
          })

          if (responseOrder.success) {
            alert('Дякуємо за замовлення')

            localStorage.removeItem('shoppingCart')

            Redirect('/personal-account/orders-tracking')
          }
        } catch (error) {
          console.log(error)
        }

        // Приховати модальне вікно
        modal.style.display = 'none';
      };

      if (!submitAddressBtn.hasEventListener) {
        submitAddressBtn.addEventListener('click', handleSubmitAddress);
        submitAddressBtn.hasEventListener = true; // Позначити, що обробник вже доданий
    }
      // Initialize the map
      const map = L.map('map').setView([48.3794, 31.1656], 6); // Center the map on Ukraine

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Initialize geocoder
      const geocoder = L.Control.Geocoder.nominatim();

      // Add a marker on map click
      let marker;
      let debounceTimeout;

      // Function to handle reverse geocoding
      const handleReverseGeocoding = (latlng) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}&accept-language=uk`)
          .then(response => response.json())
          .then(data => {
            if (data && data.display_name) {
              document.getElementById('address-input').value = data.display_name;
            }
          })
          .catch(error => console.error('Error:', error));
      };

      // Add a marker on map click with debounced reverse geocoding
      map.on('click', function (e) {
        if (marker) {
          map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);

        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => handleReverseGeocoding(e.latlng), 300); // Adjust debounce delay as needed
      });

      // Function for address search
      document.getElementById('address-input').addEventListener('input', function (e) {
        const query = e.target.value;
        if (query.length > 2) {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&accept-language=uk`)
            .then(response => response.json())
            .then(data => {
              const suggestions = document.getElementById('suggestions');
              suggestions.innerHTML = '';
              data.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.className = 'autocomplete-suggestion';
                suggestionItem.textContent = item.display_name;
                suggestionItem.addEventListener('click', function () {
                  document.getElementById('address-input').value = item.display_name;
                  suggestions.innerHTML = '';
                  map.setView([item.lat, item.lon], 16);
                  if (marker) {
                    map.removeLayer(marker);
                  }
                  marker = L.marker([item.lat, item.lon]).addTo(map);
                });
                suggestions.appendChild(suggestionItem);
              });
            })
            .catch(error => console.error('Error:', error));
        } else {
          document.getElementById('suggestions').innerHTML = '';
        }
      });

    })


  })()
