export const productData = ({ e, previewImage }) => {
  const productsOptions = e.target.product.querySelectorAll('option:checked')
  const analogsProducts = [...productsOptions]
    .map(option => option.value.length && option.value)
    .filter(value => Boolean(value))

  return {
    name: e.target.name.value,
    price: e.target.price.value,
    quantityInDrugstore: e.target.quantityInDrugstore.value,
    image: previewImage.dataset.image,
    underCategoryId: e.target.underCategory.value,
    discountedPrice: e.target.discountedPrice.value,
    description: e.target.description.value,
    analogs: analogsProducts,
    manufacturer: e.target.manufacturer.value,
    manufacturerCountry: e.target.manufacturerCountry.value,
    withRecipe: e.target.withRecipe.checked,
  }
}
