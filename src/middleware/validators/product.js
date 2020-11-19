const {check,body,validationResult} = require('express-validator');

exports.productValidation = [
    check('name').notEmpty().withMessage('Product name is required'),
    check('price').notEmpty().withMessage('Product price is required'),
    check('quantity').isEmail().withMessage('Product quantity is required'),
    check('category').isEmail().withMessage('Category required'),
    check('description').isLength({min:6}).withMessage('Product description is required')
];
exports.isValid =(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next();
}