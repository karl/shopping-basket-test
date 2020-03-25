const getProducts = {
  get: {
    tags: ["Products"],
    description: "Returns all available products.",
    operationId: "getProducts",
    responses: {
      "200": {
        description: "A list of products.",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/product"
              }
            }
          }
        }
      }
    }
  }
};

const getProductById = {
  get: {
    tags: ["Products"],
    description: "Returns the details of a single product.",
    operationId: "getProductById",
    responses: {
      "200": {
        description: "A single product.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/product"
            }
          }
        }
      }
    }
  },
  parameters: [
    {
      name: "id",
      in: "path",
      description: "The ID of the product to return",
      required: true,
      schema: {
        type: "string"
      },
      style: "simple"
    }
  ]
};

const checkout = {
  post: {
    tags: ["Products"],
    description: "Creates an order containing the supplied products.",
    operationId: "getProductById",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              products: {
                type: "array",
                items: {
                  type: "string"
                }
              }
            }
          },
          examples: {
            basket: {
              summary: "Example basket with one product",
              value: {
                products: ["1"]
              }
            },
            basketWithDupes: {
              summary: "Example basket with quantities greater than one",
              value: {
                products: ["1", "1", "2", "2", "2"]
              }
            }
          }
        }
      }
    },
    responses: {
      "200": {
        description:
          "Successfully created an order and returning the order number.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orderNumber: {
                  type: "number"
                }
              }
            },
            examples: {
              success: {
                summary: "A successful order",
                value: {
                  orderNumber: 1234
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports.swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "0.1.0",
    title: "Shopping API",
    description: "List and checkout products"
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Local server"
    }
  ],
  components: {
    schemas: {
      product: {
        type: "object",
        readOnly: true,
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          description: {
            type: "string"
          },
          color: {
            type: "string"
          },
          price: {
            type: "number"
          },
          image: {
            type: "string"
          }
        },
        example: {
          id: "1",
          name: "Teapot",
          description: "Short and stout",
          color: "Blue",
          price: 3.99
        }
      }
    }
  },
  tags: [
    {
      name: "Products"
    }
  ],
  paths: {
    "/products": getProducts,
    "/products/{id}": getProductById,
    "/checkout": checkout
  }
};
