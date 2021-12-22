const Query = {
  products(parent, { filter }, { products }, info) {
    let filteredProducts = products;

    if(filter) {
      if(filter.onSale) {
        filteredProducts = filteredProducts.filter((product) => product.onSale)
      }
    }

    return filteredProducts;
  },
  product(parent, { id }, { products }, info) {
    return products.find((product) => product.id === id);
  },
  categories(parent, args, { categories }, info) {
    return categories;
  },
  category(parent, { id }, { categories }, info) {
    return categories.find((category) => category.id === id);
  },
}

export { Query };