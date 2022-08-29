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

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });
module.exports = mongoose.model("Review", ReviewSchema);
