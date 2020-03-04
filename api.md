# Shopping API 

`yarn server` or `yarn dev` will start the API on `http://locahost:5000/`.

All request bodies should be JSON.

## Endpoints

### Get products

GET /api/products

Returns a list of all products.

Request

```sh
curl http://localhost:5000/api/products
```

Response

```json
{
  "products": [
    {
      "id": "1",
      "name": "Teapot",
      "color": "Green",
      "price": 1.99,
      "imageUrl": "/static/teapot.jpg"
    },
    {
      "id": "2",
      "name": "Pillowcase",
      "color": "Yellow",
      "price": 4.99,
      "imageUrl": "/static/pillowcase.jpg"
    }
  ]
}
```

### Get product by ID

GET /api/products/:id

Returns the details of a single product.

Request

```sh
curl http://localhost:5000/api/products/1
```

Response

```json
{
    "id": "1",
    "name": "Teapot",
    "color": "Green",
    "price": 1.99,
    "imageUrl": "/static/teapot.jpg"
}
```

### Checkout

POST /api/checkout

Body should include a field `products` which contains an array of product IDs in the basket.

Multiple products are included as duplicate values.

Returns an order number.

Example body:

```json
{
    "products": [
        "1",
        "1",
        "2"
    ]
}
```

Request

```sh
curl -X POST http://localhost:5000/api/products/1 -d -d '{"products":["1"]}'
```

Response

```json
{
    "success":true,
    "orderNumber":87262
}
```
