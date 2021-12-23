import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  addCategory(parent, { input }, { categories }, info) {
    const { name } = input;
    if (!input) {
      throw new Error("Invalid request");
    }

    const category = {
      id: uuidv4(),
      name
    }

    categories.push(category);
    return category;
  },

  addProduct(parent, { input }, { products, categories }, info) {
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
      categoryId: categoryId
    }

    products.push(product);

    return product;
  },

  addReview(parent, { input }, { reviews, products }, info) {
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
  }
}

export default Mutation;