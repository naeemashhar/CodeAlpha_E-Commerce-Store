const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });

    res.json({
      message: "Product fetched successfully !",
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
