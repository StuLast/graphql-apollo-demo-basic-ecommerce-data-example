const Query = {
  products(parent, { filter }, { db }, info) {
    const { products, reviews } = db;
    let filteredProducts = products;

    if (!filter) {
      return filteredProducts;
    }

    if (filter.onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }

    if ([1, 2, 3, 4, 5].includes(filter.avgRating)) {
      filteredProducts = filteredProducts.filter((product) => {
        const filteredReviews = reviews.filter(review => review.productId === product.id);
        let accumulator = 0;
        filteredReviews.forEach(review => accumulator += review.rating);
        const avgRating = accumulator > 0 ? accumulator / filteredReviews.length : 0;
        return avgRating >= filter.avgRating;
      })
    }

    return filteredProducts;
  },
  product(parent, { id }, { db }, info) {
    const { products } = db;
    return products.find((product) => product.id === id);
  },

  categories(parent, args, { db }, info) {
    const { categories } = db;
    return categories;
  },

  category(parent, { id }, { db }, info) {
    const { categories } = db;
    return categories.find((category) => category.id === id);
  },
}

export default Query;