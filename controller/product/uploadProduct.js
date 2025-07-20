const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    // 1. Validate user permission
    const hasPermission = await uploadProductPermission(sessionUserId);
    if (!hasPermission) {
      return res.status(403).json({
        message: "Permission Denied!",
        success: false,
        error: true,
      });
    }

    // 2. Create and save the product
    const uploadProduct = new productModel(req.body);
    const savedProduct = await uploadProduct.save();

    // 3. Respond success
    return res.status(201).json({
      message: "Product uploaded successfully!",
      data: savedProduct,
      success: true,
      error: false,
    });

  } catch (error) {
    // 4. Error handler
    console.error("UploadProduct Error:", error);

    return res.status(400).json({
      message: error.message || "An unexpected error occurred",
      success: false,
      error: true,
    });
  }
}

module.exports = UploadProductController;
