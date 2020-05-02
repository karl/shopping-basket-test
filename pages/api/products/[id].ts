import { productsLookup } from '../../../data';
import { isError } from '../../../utils/isError';
import { delay } from '../../../utils/delay';

export default async ({ query: { id } }, res) => {
  try {
    await delay(500);

    if (isError()) {
      res.status(500).send({ error: 'Unexpected server error' });
    } else {
      if (!id && id !== 0) {
        res.status(400).send({ error: 'No ID provided' });
        return;
      }
      const product = productsLookup[id];
      if (!product) {
        res.status(404).send({ error: 'No product found with that ID' });
        return;
      }
      res.send(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Server error',
    });
  }
};
