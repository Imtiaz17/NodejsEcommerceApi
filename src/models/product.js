const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sell_price: { type: Number },
    quantity: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
    },
    tags: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    productPic: [{ img: { type: String } }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
  },
  { timestamps: true }
);
productSchema.virtual('reviews',{
  ref:'Reviews',
  foreignField:'product',
  localField:'_id'
})
module.exports = mongoose.model("Product", productSchema);
