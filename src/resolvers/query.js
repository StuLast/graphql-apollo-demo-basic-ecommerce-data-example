const Query = {
  products(parent, { filter }, { products, reviews }, info) {
    let filteredProducts = products;

    if (!filter) {
      return filteredProducts;
    }
    console.log(filter.avgRating);

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