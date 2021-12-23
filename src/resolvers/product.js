const Product = {
  category({ categoryId }, args, { categories }, info) {
    return categories.find((category) => category.id === categoryId);
  },
  reviews({ id }, args, { reviews }, info) {
    return reviews.filter((review) => review.productId === id);
  }
}

export default Product;