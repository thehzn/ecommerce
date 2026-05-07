const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    productprice: { type: Number, required: true },
    productdescription: { type: String, required: true },
    productimage: { type: String, required: true }, // This will store the filename or URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);