const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");

const swaggerDocument = require("./swagger").swaggerDocument;

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

var currentOrderNumber = 1;

const productsLookup = {
  "1": {
    id: "1",
    image: "https://via.placeholder.com/200",
    name: "Teapot",
    description: "Short and stout",
    color: "Green",
    price: 1.99
  },
  "2": {
    id: "2",
    image: "https://via.placeholder.com/200",
    name: "Pillowcase",
    description: "Sweet dreams",
    color: "Yellow",
    price: 4.99
  }
};

const productsAsArray = Object.keys(productsLookup).map(
  key => productsLookup[key]
);

const isError = (errorPercentage = 10) => {
  const rand = Math.random() * 100;
  return rand <= errorPercentage;
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/api/products", (req, res) => {
  setTimeout(() => {
    if (isError()) {
      res.status(500).send({ error: "Unexpected server error" });
    } else {
      res.send({ products: productsAsArray });
    }
  }, 500);
});

app.get("/api/products/:id", (req, res) => {
  setTimeout(() => {
    if (isError()) {
      res.status(500).send({ error: "Unexpected server error" });
    } else {
      const id = req.params.id;
      if (!id && id !== 0) {
        res.status(400).send({ error: "No ID provided" });
        return;
      }
      const product = productsLookup[req.params.id];
      if (!product) {
        res.status(404).send({ error: "No product found with that ID" });
        return;
      }
      res.send(product);
    }
  }, 500);
});

app.post("/api/checkout", (req, res) => {
  setTimeout(() => {
    if (isError()) {
      res.status(500).send({ error: "Unexpected server error" });
    } else {
      console.log("Body", req.body);
      const basket = req.body.products;
      if (!basket) {
        res.status(400).send({ error: "Invalid basket: No `products` field" });
        return;
      }
      if (!Array.isArray(basket)) {
        res.status(400).send({
          error:
            "Invalid basket: `products` field should be an array of product IDs"
        });
        return;
      }
      if (!basket.length) {
        res.status(400).send({
          error:
            "Invalid basket: basket is empty (no product IDs were included)"
        });
        return;
      }
      const invalidProductIds = basket.filter(id => !(id in productsLookup));
      if (invalidProductIds.length) {
        res.status(400).send({
          error: "Invalid basket: some product IDs were not found",
          invalidProductIds
        });
        return;
      }
      res.send({ orderNumber: currentOrderNumber++ });
    }
  }, 1000);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
