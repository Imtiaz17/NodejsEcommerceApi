const Product = require("../models/product");
const Review = require("../models/reviews");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  const {
    name,
    price,
    quantity,
    description,
    category,
    sell_price,
    brand,
    sku,
    tags,
  } = req.body;
  let productPic = [];
  if (req.files.length > 0) {
    productPic = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    category,
    brand,
    sell_price,
    featured:req.body.featured=='true'?1:0,
    sku,
    tags,
    productPic,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

exports.showProduct = async (req, res) => {
  const slug = req.params.slug;
  console.log(slug)
  const product = await Product.findOne({slug: slug }).populate("reviews");
  if (!product) {
    return res.status(400).json({ status: false, message: "No product found" });
  }
  res.status(200).json({ product });
};
exports.addReview = async (req, res) => {
  const review = new Review({
    user: req.user._id,
    review: req.body.review,
    rating: req.body.rating,
    product: req.body.product,
  });
  review.save((error, newreview) => {
    if (error) return res.status(400).json({ error });
    if (newreview) {
      return res.status(201).json({ newreview });
    }
  });
};

exports.allProducts = async (req, res) => {
  await Product.find().populate("category","name").sort({ createdAt: -1 })
    .exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      }
    });
};

exports.newProducts = async (req, res) => {
  await Product.find().limit(6).sort({ createdAt: -1 })
    .exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      }
    });
};

exports.featuredProducts = async (req, res) => {
  await Product.find({ featured: 1 }).populate("category","name").sort({ createdAt: -1 })
    .exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      }
    });
};

exports.deleteProductById = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({ status: false, message: "No prduct Id found" });
  }
  Product.deleteOne({ _id: productId }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(202).json({ result });
    }
  });
};
