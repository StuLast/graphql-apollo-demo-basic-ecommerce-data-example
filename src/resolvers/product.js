const Product = {
  category({ categoryId }, args, { db }, info) {
    const { categories } = db;
    return categories.find((category) => category.id === categoryId);
  },

  reviews({ id }, args, { db }, info) {
    const { reviews } = db;
    return reviews.filter((review) => review.productId === id);
  }
}

export default Product;