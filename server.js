const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

var currentOrderNumber = 1;

const productsLookup = {
    "1": {
        id: "1",
        name: "Teapot",
        color: "Green",
        price: 1.99,
        imageUrl: "/static/teapot.jpg",
    },
    "2": {
        id: "2",
        name: "Pillowcase",
        color: "Yellow",
        price: 4.99,
        imageUrl: "/static/pillowcase.jpg",
    }
}

const productsAsArray = Object.keys(productsLookup).map(key => productsLookup[key]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/products', (req, res) => {
  res.send({ products: productsAsArray });
});

app.get('/api/products/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ error: "No ID provided" });
    return;
  }
  const product = productsLookup[req.params.id];
  if (!product) {
    res.status(404).send({ error: "No product found with that ID" });
    return;
  }
  res.send(product);
});

app.post('/api/checkout', (req, res) => {
  const basket = req.body.products;
  if (!basket) {
    res.status(400).send({ error: "Invalid basket: No `products` field" });
    return;
  }
  if (!Array.isArray(basket)) {
    res.status(400).send({ error: "Invalid basket: `products` field should be an array of product IDs" });
    return;
  }
  const invalidProductIds = basket.filter(id => !(id in productsLookup));
  if (invalidProductIds.length) {
    res.status(400).send({ error: "Invalid basket: some product IDs were not found", invalidProductIds });
    return;
  }
  res.send({ "success": true, orderNumber: currentOrderNumber++ });
});

app.listen(port, () => console.log(`Listening on port ${port}`));