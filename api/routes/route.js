module.exports = function(app) {
    const authRouter = require('../controllers/auth'); // for authentication
    const productRouter = require('../controllers/products'); // for products
    const userRouter = require('../controllers/user'); // for user actions

    // AUTH ROUTES
    app.route('/api/auth/login')
      .post(authRouter.login);
    
    app.route('/api/auth/register')
      .post(authRouter.register);

    // PRODUCTS ROUTES
    app.route('/api/products')
      .get(productRouter.list_all_products)
      .post(productRouter.create_a_product);

    app.route('/api/products/one')
      .get(productRouter.findone_by_tags);

    app.route('/api/products/many')
      .get(productRouter.findmany_by_tags);

    // USER ROUTES
    app.route('/api/user/info')
      .get(userRouter.info);

    app.route('/api/user/order')
      .get(userRouter.get_orders)
      .post(userRouter.add_order);
};