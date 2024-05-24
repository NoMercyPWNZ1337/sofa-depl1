export const productData = ({ e, previewImage }) => ({
  name: e.target.name.value,
  price: e.target.price.value,
  quantityInWarehouse: e.target.quantityInWarehouse.value,
  quantityInDrugstore: e.target.quantityInDrugstore.value,
  image: previewImage.dataset.image,
})
