const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

//loads mongoose connection
mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Mongo Connection Open!!")
})
.catch(err => {
  console.log("Error: Mongo connection failed!")
  console.log(err)
})

// express loads the template engines: views, view engine, and ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

//create an async get request to the path '/products'
app.get('/products', async (req, res) => {
    // waits before sending response
    const products = await Product.find({})
    //send back a response
    //res.send('all products will be here')
    res.render('products/index', {products})
})

app.get('/products/new', (req, res) => {
  res.render('products/new', {categories});
})

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
})

// creates async route handler
app.get('/products/:id', async (req,res) => {     // creates async route handler
    const {id} = req.params;
    const product = await Product.findById(id)    // awaits some mongoose operation on a model
    res.render('products/show', {product})        //passes that data to a template
})

app.get('/products/:id/edit', async (req, res) => {
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
})

//route to update products
app.put('/products/:id', async (req, res) => {
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true, useFindAndModify: false});
  res.redirect(`/products/${product._id}`);

})

app.delete('/products/:id', async (req, res) => {
  const {id} = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

//start server on port 3000
app.listen(3000, () => {
    console.log('app is listening port 3000!')
})