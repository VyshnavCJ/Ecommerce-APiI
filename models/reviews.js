const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Plz provide a review title"],
      maxlength: 100,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Plz provide a rating"],
    },
    comment: {
      type: String,
      required: [true, "Plz provide a review text"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post("remove", async function () {
  this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
module.exports = mongoose.model("Review", ReviewSchema);
