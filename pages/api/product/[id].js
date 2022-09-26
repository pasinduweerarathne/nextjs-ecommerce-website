import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";

connectDB();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;

    const product = await Products.findById(id);
    if (!product)
      return res.status(500).json({ err: "This product does not exitst" });

    res.json({ product });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
