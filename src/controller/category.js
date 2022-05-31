const Category = require("../models/category");
const Product = require("../models/product");
const slugify = require("slugify");

function listOfcategory(categories, parentId = null) {
  const catList = [];
  for (let cat of categories) {
    catList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      featured: cat.featured,
      parent: cat.parentId
        ? categories.find((category) => category._id == cat.parentId)
        : null,
      // brands: cat.brands,
    });
  }
  return catList;
}

exports.categoryCreate = (req, res) => {
  const obj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.body.parentId) {
    obj.parentId = req.body.parentId;
  }
  if (req.body.featured == 'true') {
    obj.featured = 1;
  }

  if (req.file) {
    obj.image = process.env.API_URL + "public/" + req.file.filename;
  }
  const cat = new Category(obj);
  cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (category) {
      return res.status(200).json({ category });
    }
  });
};

exports,
  (updateCategory = (req, res) => {
    const id = req.params.id;
    Category.findByIdAndUpdate(id, req.body).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Category was not found!`,
        });
      } else res.send({ message: "Category was updated successfully." });
    });
  });

exports.getCategories = (req, res) => {
  Category.find({})
    .populate("brands", "name")
    .exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        const categoryList = listOfcategory(categories);
        return res.status(200).json({ categoryList });
      }
    });
};

exports.deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ status: false, message: "No Category Id found" });
  }
  Category.deleteOne({ _id: categoryId }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(202).json({ result });
    }
  });
};

exports.getCategoryWiseProduct = (req, res) => {
  const slug = req.params.slug;
  Category.findOne({ slug: slug }).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
        Product.find({ category:  result._id }).populate("category", "name").sort({ createdAt: -1 }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          return res.status(200).json({ product });
        }
      });
    }
  })
};
