const alkoModel = require('../models/alko');

const incrementOrderAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const alko_hinnasto = await alkoModel.getHinnasto();
    const selectedProduct = alko_hinnasto.find((product) => product._id == id);
    if (!selectedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedProduct = await alkoModel.incrementOrderAmount(id);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error incrementing order amount' });
  }
};

const getHinnasto = async (req, res) => {
  try {
    const alko_hinnasto = await alkoModel.getHinnasto();
    const id = alko_hinnasto.map((hinnasto) => {
      return hinnasto['_id'];
    });
    const numero = alko_hinnasto.map((hinnasto) => {
      return hinnasto['Numero'];
    });
    const nimi = alko_hinnasto.map((hinnasto) => {
      return hinnasto['Nimi'];
    });

    const pullo_koko = alko_hinnasto.map((hinnasto) => {
      return hinnasto['Pullokoko'];
    });

    const hinta = alko_hinnasto.map((hinnasto) => {
      return hinnasto['Hinta'];
    });
    const order_amount = alko_hinnasto.map((hinnasto) => {
      return hinnasto['orderamount'];
    });

    res.json({ id, numero, nimi, pullo_koko, hinta, order_amount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching journey details' });
  }
};

module.exports = { getHinnasto, incrementOrderAmount };
