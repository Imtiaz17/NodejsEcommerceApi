const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "review can not be empty !"],
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A User is required to make a review"],
    },
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstName lastName",
  });
  next();
});

module.exports = mongoose.model("Reviews", reviewSchema);
