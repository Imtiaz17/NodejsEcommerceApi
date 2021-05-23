const Category = require("../models/category");
const slugify = require("slugify");

function listOfcategory(categories, parentId = null) {
  const catList = [];
  for (let cat of categories) {
    catList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parent: cat.parentId?categories.filter((category) => category._id == cat.parentId):null
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
