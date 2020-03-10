const express = require('express')
const app = express()
const db = require('./db')
const { Product, Category } = db.models
const cors = require('cors')

app.use(express.json())

app.get('/api/products', (res, req, next) =>
{
    Product.findAll()
    .then( products => res.send(products) )
    .catch(next)
})

app.get('/api/categories', (res, req, next) =>
{
    Product.findAll()
    .then( categories => res.send(categories) )
    .catch(next)
})

app.post('/api/products', (res, req, next) =>
{
    Product.create(req.body)
    .then( products => res.status(201).send(products) )
    .catch(next)
})

app.put('/api/products', (res, req, next) =>
{
    Product.findByPrimaryKey(req.params.id)
    .then( product => product.update(req.body))
    .then( products => res.send(products) )
    .catch(next)
})

app.delete('/api/products', (res, req, next) =>
{
    Product.findByPrimaryKey(req.params.id)
    .then( product => product.destroy())
    .then( () => res.sendStatus(204) )
    .catch(next)
})


module.exports = {
    app
}