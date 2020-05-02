import { isError } from "../../utils/isError";
import { productsLookup } from "../../data";

let currentOrderNumber = 1;

export default (req, res) => {
  if (req.method !== "POST") {
    res
      .status(404)
      .send({ error: "Only POST method is supported for this route" });
    return;
  }

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
            "Invalid basket: `products` field should be an array of product IDs",
        });
        return;
      }
      if (!basket.length) {
        res.status(400).send({
          error:
            "Invalid basket: basket is empty (no product IDs were included)",
        });
        return;
      }
      const invalidProductIds = basket.filter((id) => !(id in productsLookup));
      if (invalidProductIds.length) {
        res.status(400).send({
          error: "Invalid basket: some product IDs were not found",
          invalidProductIds,
        });
        return;
      }
      res.send({ orderNumber: currentOrderNumber++ });
    }
  }, 1000);
};
