export const productsLookup = {
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

export const productsAsArray = Object.keys(productsLookup).map(
  key => productsLookup[key]
);
