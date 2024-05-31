export const productCard = ({ product }) => {
  return `
    <div>
      <div>
        <img src="${product.image}" />
        <h6>${product.name}</h6>
        <p>${
          product.quantityInDrugstore > 0 ? 'В наявності' : 'Немає в наявності'
        }</p>
          <p>Ціна: <b>${
            product.discountedPrice ? product.discountedPrice : ''
          }</b> ${product.price}</p>
          <p>Кількість в аптеці: ${product.quantityInDrugstore}</p>
          <p>Кількість на складі: ${product.quantityInWarehouse}</p>
        </div>
      <div>
        <button data-edit-id="${product._id}" >Редагувати</button>
        <button data-remove-id="${product._id}">Видалити</button>
      </div>
    </div>
  `
}
