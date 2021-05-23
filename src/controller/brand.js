const Brand = require("../models/brand");
const Category = require("../models/category");
const slugify = require("slugify");

module.exports = {
  async addBrand(req, res, next) {
    try {
      const brandobj = {
        category: req.body.category,
        name: req.body.name,
        slug: slugify(req.body.name, { lower: true }),
      };
      if (req.file) {
        brandobj.image = process.env.API_URL + "public/" + req.file.filename;
      }
      const newbrand = await Brand.create(brandobj);
      const updateCategory = await Category.findByIdAndUpdate(
        brandobj.category,
        {
          $push: { brands: newbrand._id },
        },
        { new: true }
      );
      return res.status(200).json({ newbrand });
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },

  async getBrands(req, res) {
    await Brand.find()
      .populate("category", "name").sort({createdAt:-1})
      .exec((error, brands) => {
        if (error) return res.status(400).json({ error });
        if (brands) {
          return res.status(200).json({ brands });
        }
      });
  },
};
