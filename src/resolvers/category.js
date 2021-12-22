const Category = {
  products({ id }, args, { products }, info) {
    return products.filter((product) => product.categoryId === id);
  },
}

export { Category }

