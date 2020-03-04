const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require("./swagger").swaggerDocument;

const app = express();
const port = process.env.PORT || 5000;

var currentOrderNumber = 1;

const productsLookup = {
    "1": {
        id: "1",
        name: "Teapot",
        description: "Short and stout",
        color: "Green",
        price: 1.99,
    },
    "2": {
        id: "2",
        name: "Pillowcase",
        description: "Everybody's looking for something",
        color: "Yellow",
        price: 4.99,
    }
}

const productsAsArray = Object.keys(productsLookup).map(key => productsLookup[key]);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/api/products', (req, res) => {
  res.send({ products: productsAsArray });
});

app.get('/api/products/:id', (req, res) => {
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
  console.log(req.body);
  const basket = req.body.products;
  if (!basket) {
    res.status(400).send({ error: "Invalid basket: No `products` field" });
    return;
  }
  if (!Array.isArray(basket)) {
    res.status(400).send({ error: "Invalid basket: `products` field should be an array of product IDs" });
    return;
  }
  if (!basket.length) {
    res.status(400).send({ error: "Invalid basket: basket is empty (no product IDs were included)" });
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