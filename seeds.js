const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Mongo Connection Open!!")
})
.catch(err => {
  console.log("Error: Mongo connection failed!")
  console.log(err)
})

// const p = new Product( {
//     name: 'Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save().then(p => {
//     console.log(p)
// })
// .catch(e => {
//     console.log(e)
// })

const p = [{name: 'Grapefruit', price: 1.99, category: 'fruit'}, {name: 'cabbage', price: 2.50, category: 'vegetable'}, {name: 'milk',price: 3.99, category: 'dairy'}];
Product.insertMany(p)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})