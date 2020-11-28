const Review = require("../models/reviews");


exports.reviewList = (req, res) => {
  const reviews = Review.find().exec((error, review) => {
    if (error) return res.status(400).json({ error });
    if (review) {
      res.status(200).json({ review });
    }
  });
};
