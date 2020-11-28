const Product = require("../models/product");
const Review = require("../models/reviews");
const slugify = require("slugify");

exports.addProduct = (req, res) => {
  const { name, price, quantity, description, category,sell_price,sku,tags } = req.body;
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
    sell_price,
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

exports.showProduct=async (req,res)=>{
  const product = await Product.findById(req.params.id).populate('reviews');
  if(!product){
    return res.status(400).json({ status:false, message:"No prouct found" });
  }
  res.status(200).json({ product });
};
exports.addReview = async(req, res) => {
  const review =  new Review({
      user: req.user._id,
      review: req.body.review,
      rating: req.body.rating,
      product: req.body.product
    });
    review.save((error, newreview) => {
      if (error) return res.status(400).json({ error });
      if (newreview) {
        return res.status(201).json({ newreview });
      }
    });
};

exports.allProducts=async (req,res)=>{
  const product = await Product.find();
  if(!product){
    return res.status(400).json({ status:false, message:"No prouct found" });
  }
  res.status(200).json({ product });
}