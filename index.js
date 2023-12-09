const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Product, categories } = require('./models/products');

// CONNECT TO MONGOOSE
const dbName = 'farmStand';
mongoose
  .connect(`mongodb://localhost:27017/${dbName}`)
  .then(() => {
    console.log('MONGOOSE CONNECTED!');
  })
  .catch((e) => console.log('ERROR CONNECTING MONGOOSE!'));

// APP
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000!');
});

// ROUTES
app.get('/products', async (req, res) => {
  const products = await Product.find({});

  res.render('products/index', { products });
});

app.get('/products/new', async (req, res) => {
  res.render('products/new', { categories });
});

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.render('products/show', { product });
});

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.render('products/edit', { product, categories });
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const updatedPorduct = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.redirect(`/products/${updatedPorduct._id}`);
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);

  res.redirect(`/products`);
});

// EXPORTS
module.exports = {
  dbName,
};
