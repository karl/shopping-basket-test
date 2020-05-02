import { isError } from '../../utils/isError';
import { productsLookup } from '../../data';
import { delay } from '../../utils/delay';

let currentOrderNumber = 1;

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res
        .status(404)
        .send({ error: 'Only POST method is supported for this route' });
      return;
    }

    await delay(1000);

    if (isError()) {
      res.status(500).send({ error: 'Unexpected server error' });
    } else {
      const basket = req.body.basket;
      if (!basket) {
        res.status(400).send({ error: 'Invalid basket: No `basket` field' });
        return;
      }
      if (!Array.isArray(basket)) {
        res.status(400).send({
          error:
            'Invalid basket: `basket` field should be an array of objects with id and count fields',
        });
        return;
      }
      if (!basket.length) {
        res.status(400).send({
          error:
            'Invalid basket: basket is empty (no product IDs were included)',
        });
        return;
      }
      const invalidProductIds = basket
        .map((item) => item.id)
        .filter((id) => !(id in productsLookup));
      if (invalidProductIds.length) {
        res.status(400).send({
          error: 'Invalid basket: some product IDs were not found',
          invalidProductIds,
        });
        return;
      }

      res.send({ orderNumber: currentOrderNumber++ });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Server error',
    });
  }
};
