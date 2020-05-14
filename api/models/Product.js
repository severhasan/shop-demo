const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Başlık boş bırakılamaz.',
    },
    address: {
        type: String,
        required: 'Adres boş bırakılamaz.',
    },
    product_id: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sale_price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: 'Kategori boş bırakılamaz.',
    },
    description: [
        {
            type: String
        }
    ],
    seller: String,
    date_created: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product;