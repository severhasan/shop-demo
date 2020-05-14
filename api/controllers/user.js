const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.info = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.send({error: true, message: 'not user found'});
    
    res.send({error: false, username: user.username, email: user.email});
}

exports.add_order = async (req, res) => {
    // await User.findByIdAndUpdate(req.user.id, {$addToSet: {orders: req.body.order}}, (err, result) => res.send({error: false, message: 'transaction complete'}));
    await Order.create({
        products: req.body.order,
        user: req.user.id
    }, (err, result) => {
        if (err) {
            return res.send({error: true})
        }
        return res.send({error: false});
    });
}

exports.get_orders = async (req, res) => {
    const result = []
    const orders = await Order.find({user: req.user.id}).populate('products');

    for (const item of orders) {
        const query = item.populate('products')
        result.push(query.products);
    }

    return res.send({orders: result});
}