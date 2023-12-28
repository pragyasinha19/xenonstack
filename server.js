const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce_store', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a simple Product model
const Product = mongoose.model('Product', { name: String, price: Number, description: String });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    // Retrieve and send products from the database
    Product.find((err, products) => {
        if (err) throw err;
        res.sendFile(__dirname + '/public/index.html');
    });
});

// Other routes for login, contact, etc.

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
