import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  addCategory(parent, { input }, { db }, info) {
    const { categories } = db;
    const { name } = input;
    if (!input) {
      throw new Error("Invalid request");
    }

    const category = {
      id: uuidv4(),
      name
    }

    categories.push(category);
    return { action: "ADDED CATEGORY", data: category };
  },

  deleteCategory(parent, { input }, { db }, info) {
    const { categories, products } = db;

    const confirmedCategoryId = categories.findIndex(category => {
      return category.id === input.id;
    });

    if (confirmedCategoryId < 0) {
      throw new Error("Request is not valid");
    }

    const relatedProducts = products.filter(product => product.categoryId === input.id)

    // Remove category
    const [removedCategory] = categories.splice(confirmedCategoryId, 1)
    removedCategory.products = relatedProducts;

    //Cleanup category in products
    products.forEach(product => {
      product.category = null
    });

    return { action: "DELETED", data: removedCategory };
  },

  addProduct(parent, { input }, { db }, info) {
    const { products, categories } = db;
    const { name, description, quantity, price, image, onSale, categoryId } = input;
    const confirmedCategory = categories.find(cat => categoryId === cat.id)

    if (!input || !confirmedCategory) {
      throw new Error('Invalid request');
    }

    const product = {
      id: uuidv4(),
      name,
      description,
      quantity: quantity ? quantity : 0,
      price: price ? price : 0.00,
      image: image ? image : "",
      onSale: onSale ? onSale : false,
      categoryId: categoryId ? categoryId : null
    }

    products.push(product);

    return product;
  },

  addReview(parent, { input }, { db }, info) {
    const { reviews, products } = db
    const { date, title, comment, rating, productId } = input;
    const confirmedProduct = products.find((prod) => productId === prod.id);

    if (!input || !confirmedProduct) {
      throw new Error("Invalid Request");
    }

    const review = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId: productId
    }

    reviews.push(review)
    return review;
  },


}

export default Mutation;