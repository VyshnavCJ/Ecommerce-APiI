const createProduct = (req, res) => {
  res.send("Create Product");
};
const getAllProduct = (req, res) => {
  res.send("get all product");
};
const getSingleProduct = (req, res) => {
  res.send("get single product");
};
const updateProduct = (req, res) => {
  res.send("update product");
};
const deleteProduct = (req, res) => {
  res.send("delete Product");
};
const uploadImage = (req, res) => {
  res.send("upload image");
};

module.exports = {
  createProduct,
  getAllProduct,
  updateProduct,
  uploadImage,
  deleteProduct,
  getSingleProduct,
};
