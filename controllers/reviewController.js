const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Review = require("../models/reviews");
const Product = require("../models/product");
const { checkPermission } = require("../utils");

const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findById(productId);

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id :${productId}`);
  }
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError("Already submitted review");
  }
  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReview = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const review = await Review.findById(req.params.id).populate({
    path: "product",
    select: "name company price",
  });
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review find with id :${req.params.id}`
    );
  }
  res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review find with id :${req.params.id}`
    );
  }
  checkPermission(req.user, review.user);
  const { title, rating, comment } = req.body;
  review.title = title;
  review.comment = comment;
  review.rating = rating;
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review find with id :${req.params.id}`
    );
  }
  checkPermission(req.user, review.user);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: "Successfully!" });
};

module.exports = {
  getAllReview,
  createReview,
  updateReview,
  deleteReview,
  getSingleReview,
};
