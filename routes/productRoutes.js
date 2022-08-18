const express = require("express");

const router = express.Router();

const {
  getAllProduct,
  getSingleProduct,
  uploadImage,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.route("/").get(authenticateUser, getAllProduct);

router
  .route("/updateProduct")
  .patch(authenticateUser, authorizePermissions("admin"), updateProduct);
router
  .route("/uploadImage")
  .post(authenticateUser, authorizePermissions("admin"), uploadImage);
router
  .route("/createProduct")
  .put(authenticateUser, authorizePermissions("admin"), createProduct);
router
  .route("/deleteProduct")
  .delete(authenticateUser, authorizePermissions("admin"), createProduct);
router.route("/:id").get(authenticateUser, getSingleProduct);

module.exports = router;
