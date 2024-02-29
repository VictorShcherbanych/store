const express = require('express');
require('dotenv').config()
const router = express();
const middleware = require('../middleware')
const { check } = require ('express-validator');
const product_controller = require ('../controllers/product_controller')
const user_controller = require('../controllers/user_controller')

const jsonParser = express.json();

//routers for products
router.get("/api/products", jsonParser, middleware, product_controller.getProducts)
router.post("/api/products", jsonParser, middleware, product_controller.postProducts)
router.put("/api/products/:id", jsonParser, middleware, product_controller.changeProduct)
router.delete("/api/products/:id", jsonParser, middleware, product_controller.deleteProduct)

//routers for users
router.post('/api/login', jsonParser, user_controller.loginUser);
router.post('/api/register', jsonParser,
    check('login', 'Поле логіну не може бути порожнім').notEmpty(),
    check('password', 'Пароль повинен мати від 4 до 12 символів').isLength({min:4, max:12}),
    check('email', 'Email некоректний').matches(/[@]/), user_controller.addUser);

//routers for carts
router.post("api/cart/add", jsonParser, middleware, async function (req,res){
})
router.post("api/cart/remove", jsonParser)
router.post("api/cart/update",jsonParser)


module.exports = router