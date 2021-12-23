const Category = {
  products({ id }, { filter }, { db }, info) {
    const { products } = db;
    let filteredProducts = products.filter((product) => product.categoryId === id);

    if (!filter) {
      return filteredProducts;
    }

    if (filter.onSale) {
      console.log("Filtering for products on sale...");
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


    return filteredProducts
  },
}

export default Category

