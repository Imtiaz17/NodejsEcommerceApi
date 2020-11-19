const mongoose = require("mongoose");
const cuponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Percentage", "Amount", "Shipping"],
      default: "Amount",
    },
    amount: {
      type: Number,
    },
    expiry_date: {
      type: Date,
    },
    usage_limit: {
      type: Number,
    },
    limit_peruser: {
      type: Number,
    },
    min_spend: {
      type: Number,
    },
    new_user: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cupon", cuponSchema);
