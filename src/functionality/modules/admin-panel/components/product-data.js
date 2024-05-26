export const productData = ({ e, previewImage }) => {
  return {
    name: e.target.name.value,
    price: e.target.price.value,
    quantityInWarehouse: e.target.quantityInWarehouse.value,
    quantityInDrugstore: e.target.quantityInDrugstore.value,
    image: previewImage.dataset.image,
    categoryId: e.target.category.value || null,
    discountedPrice: e.target.discountedPrice.value,
    description: e.target.description.value,
  }
}
