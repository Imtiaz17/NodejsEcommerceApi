const Product = require('../models/product');
const slugify = require('slugify');

exports.addProduct=(req,res)=>{
    const {name,price,quantity,description,category}= req.body;
    let productPic=[];
    if(req.files.length>0){
        productPic= req.files.map(file=>{
            return {img: file.filename}
        });
    }
    const product = new Product({
        name:name,
        slug: slugify(name),
        price,
        quantity,
        description,
        category,
        productPic
    });
    product.save(((error,product)=>{
        if(error) return res.status(400).json({error});
        if(product){
            res.status(201).json({product});
        }
    }))
};