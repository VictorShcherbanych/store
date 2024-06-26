const express = require('express');
require('dotenv').config()
const router = express();
const middleware = require('../middleware')
const { check } = require('express-validator');
const { container } = require('../di-setup/container')

const CartController = container.resolve('CartController')
const OrderController = container.resolve('OrderController')
const UserController = container.resolve('UserController')
const ProductController = container.resolve('ProductController')
const DocumentsController = container.resolve('DocumentsController')

const jsonParser = express.json();

//routes for products
router.get("/api/products", jsonParser, ProductController.getProducts)
router.get("/api/products/:productId", jsonParser, ProductController.getProductswithId)
router.post("/api/products", jsonParser, ProductController.postProducts)
router.put("/api/products/:id", jsonParser, ProductController.changeProduct)
router.delete("/api/products/:id", jsonParser, ProductController.deleteProduct)

//routes for users
router.post('/api/login', jsonParser, UserController.loginUser);
router.post('/api/register', jsonParser,
    check('login', 'Поле логіну не може бути порожнім').notEmpty(),
    check('password', 'Пароль повинен мати від 4 до 12 символів').isLength({ min: 4, max: 12 }),
    check('email', 'Email некоректний').matches(/[@]/), UserController.addUser);

//routes for carts
router.get('/api/cart', jsonParser, middleware, CartController.getCart)
router.post('/api/cart/add', jsonParser, middleware,  CartController.addProduct)
router.post("/api/cart/remove", jsonParser, middleware, CartController.removeProduct)
router.post("/api/cart/update", jsonParser, middleware, CartController.updateQuantity)

//routes for orders
router.get('/api/orders', jsonParser, middleware, OrderController.getOrders)
router.get('/api/orders/:order_id', jsonParser, middleware, OrderController.getOrder)
router.put('/api/orders/:order_id/status', jsonParser, middleware, OrderController.changeStatus)
router.post('/api/orders', jsonParser, middleware, OrderController.createOrder)

// routes for documents
router.get('/api/documents', jsonParser, DocumentsController.getDocuments)
router.post('/api/warehouse', jsonParser, DocumentsController.addWarehouse)
router.post('/api/documents', jsonParser, DocumentsController.addDocument)
router.post('/api/product_document', jsonParser, DocumentsController.addProductDocument)

module.exports = router