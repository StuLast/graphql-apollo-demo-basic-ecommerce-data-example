const Query = {
  products(parent, args, { products }, info) {
    return products;
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
  reviews(parent, args, { reviews }, info) {
    return reviews;
  },
  review(parent, { id }, { reviews }, info ) {
    console.log(id);
    return reviews.find((review) => reviews.id === id);
  }
}

export { Query };