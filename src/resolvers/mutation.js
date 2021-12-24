import { isConstValueNode } from 'graphql';
import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  addCategory(parent, { input }, { db }, info) {
    const { categories } = db;
    const { name } = input;
    if (!input) {
      throw new Error('Invalid request');
    }

    const category = {
      id: uuidv4(),
      name,
    };

    categories.push(category);
    return { action: 'CREATED', data: category };
  },

  deleteCategory(parent, { input }, { db }, info) {
    const { categories, products } = db;

    const confirmedCategoryId = categories.findIndex((category) => {
      return category.id === input.id;
    });

    if (confirmedCategoryId < 0) {
      throw new Error('Request is not valid');
    }

    const relatedProducts = products.filter(
      (product) => product.categoryId === input.id
    );

    // Remove category
    const [removedCategory] = categories.splice(confirmedCategoryId, 1);
    removedCategory.products = relatedProducts;

    //Cleanup category in products
    products.forEach((product) => {
      product.category = null;
    });

    return { action: 'DELETED', data: removedCategory };
  },

  updateCategory(parent, { input }, { db }, info) {
    const { categories } = db;
    const { id, data } = input;

    const updateable = categories.find((category) => category.id === id);

    if (!updateable) {
      console.log('Unable to locate category');
      throw new Error('Invalid request');
    }

    if (typeof data.name === 'string') {
      updateable.name = data.name;
    }

    return { action: 'UPDATED', data: updateable };
  },

  addProduct(parent, { input }, { db }, info) {
    const { products, categories } = db;
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const confirmedCategory = categories.find((cat) => categoryId === cat.id);

    if (!input || !confirmedCategory) {
      throw new Error('Invalid request');
    }

    const product = {
      id: uuidv4(),
      name,
      description,
      quantity: quantity ? quantity : 0,
      price: price ? price : 0.0,
      image: image ? image : '',
      onSale: onSale ? onSale : false,
      categoryId: categoryId ? categoryId : null,
    };

    products.push(product);

    return { action: 'CREATED', data: product };
  },

  deleteProduct(parent, { input }, { db }, info) {
    const { products, reviews } = db;
    const { id } = input;

    const confirmedProduct = products.findIndex((product) => product.id === id);

    if (confirmedProduct < 0) {
      throw new Error('Invalid request');
    }

    const [deletedProduct] = products.splice(confirmedProduct, 1);
    deletedProduct.reviews = [];

    reviews.forEach((review, index) => {
      if (review.productId === id) {
        deletedProduct.reviews.push(review);
        reviews.splice(index, 1);
      }
    });

    return { action: 'DELETED', data: deletedProduct };
  },

  updateProduct(parent, { input }, { db }, info) {
    const { products, categories } = db;
    const { id, data } = input;

    const updateable = products.find((product) => product.id === id);

    if (!updateable) {
      throw new Error('Invalid request');
    }

    if (typeof data.name === 'string') {
      updateable.name = data.name;
    }

    if (typeof data.description === 'string') {
      updateable.description = data.description;
    }

    if (typeof data.quantity === 'number' && data.quantity > 0) {
      updateable.quantity = data.quantity;
    }

    if (typeof data.price === 'number' && data.quantity > 0) {
      updateable.price = data.price;
    }

    if (typeof data.image === 'string') {
      updateable.image = data.image;
    }

    if (typeof data.onSale === 'boolean') {
      updateable.onSale = data.onSale;
    }

    const isCategoryId = categories.filter(
      (category) => category.id === data.categoryId
    );
    if (isCategoryId) {
      updateable.categoryId === data.categoryId;
    }

    return { action: 'UPDATED', data: updateable };
  },

  addReview(parent, { input }, { db }, info) {
    const { reviews, products } = db;
    const { date, title, comment, rating, productId } = input;
    const confirmedProduct = products.find((prod) => productId === prod.id);

    if (!input || !confirmedProduct) {
      throw new Error('Invalid Request');
    }

    const review = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      productId: productId,
    };

    reviews.push(review);
    return { action: 'CREATED', data: review };
  },

  deleteReview(parent, { input }, { db }, info) {
    const { reviews } = db;
    const { id } = input;

    const confirmedReview = reviews.findIndex((review) => review.id === id);

    if (confirmedReview < 0) {
      throw new Error('Invalid Request');
    }

    const [deletedReview] = reviews.splice(confirmedReview, 1);
    return { action: 'DELETED', data: deletedReview };
  },

  updateReview(parent, { input }, { db }, info) {
    const { reviews, products } = db;
    const { id, data } = input;

    const updateable = reviews.find((review) => review.id === id);

    if (!updateable) {
      throw new Error('Invalid request');
    }

    if (typeof data.date === 'string') {
      updateable.date = data.date;
    }

    if (typeof data.title === 'string') {
      updateable.title = data.title;
    }

    if (typeof data.comment === 'string') {
      updateable.comment = data.comment;
    }

    if ([0, 1, 2, 3, 4, 5].includes(data.rating)) {
      updateable.rating = data.rating;
    }

    const isProductId = products.find(
      (product) => product.id === data.productId
    );
    if (isProductId) {
      updateable.productId = data.productId;
    }
    console.log({ action: 'UPDATED', data: updateable });

    return { action: 'UPDATED', data: updateable };
  },
};

export default Mutation;
