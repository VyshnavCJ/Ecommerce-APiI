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

const { getSingleProductReviews } = require("../controllers/reviewController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(getAllProduct)
  .post([authenticateUser, authorizePermissions("admin"), createProduct]);
router
  .route("/uploadImage")
  .post(authenticateUser, authorizePermissions("admin"), uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
