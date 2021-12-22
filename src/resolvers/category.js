const Category = {
  products({ id }, { filter }, { products }, info) {
    let filteredProducts = products.filter((product) => product.categoryId === id);
    console.log("Category products:",filteredProducts);
    console.log("filter:",filter)

    if(filter) {
      if(filter.onSale) {
        console.log("Filtering for products on sale...");
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
    }
    console.log("OnSale products:",filteredProducts)

    return filteredProducts
  },
}

export { Category }

