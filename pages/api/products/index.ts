import { productsAsArray } from '../../../data';
import { isError } from '../../../utils/isError';
import { delay } from '../../../utils/delay';

export default async (req, res) => {
  try {
    await delay(500);

    if (isError()) {
      res.status(500).send({ error: 'Unexpected server error' });
    } else {
      res.send({ products: productsAsArray });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: 'Server error',
    });
  }
};
