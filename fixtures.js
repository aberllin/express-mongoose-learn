const mongoose = require('mongoose');
const { Product } = require('./models/products');
const { dbName } = require('./index');

// CONNECT TO MONGOOSE
mongoose
  .connect(`mongodb://localhost:27017/${dbName}`)
  .then(() => {
    console.log('MONGOOSE CONNECTED!');
  })
  .catch((e) => console.log('ERROR CONNECTING MONGOOSE!'));

const seedData = [
  {
    name: 'Grapefruit',
    price: 2.0,
    category: 'fruit',
  },
  {
    name: 'Asparagus',
    price: 3.5,
    category: 'vegetable',
  },
  {
    name: 'Almond Milk',
    price: 2.99,
    category: 'dairy',
  },
  {
    name: 'Salmon Fillet',
    price: 8.99,
    category: 'meat',
  },
  {
    name: 'Pineapple',
    price: 3.0,
    category: 'fruit',
  },
  {
    name: 'Kale',
    price: 1.75,
    category: 'vegetable',
  },
  {
    name: 'Blue Cheese',
    price: 4.25,
    category: 'dairy',
  },
];

Product.insertMany(seedData)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
