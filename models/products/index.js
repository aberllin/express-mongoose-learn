const mongoose = require('mongoose');

const categories = ['fruit', 'vegetable', 'dairy', 'meat'];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: categories,
    lowercase: true,
  },
});

const Product = new mongoose.model('Product', productSchema);

module.exports = { Product, categories };
