const Cupon = require("../models/cupon");
const Cart = require("../models/cart");

module.exports = {
  async addCupon(req, res, next) {
    try {
      const codeExist = await Cupon.find().where("code").equals(req.body.code);
      if (codeExist.length > 0) {
        return res.status(400).json({
          status: "fail",
          message: "Code exist,try another code",
        });
      } else {
        const cupon = await Cupon.create(req.body);
        return res.status(200).json({ cupon });
      }
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
  async cuponLists(req, res, next) {
    try {
      const cupons = await Cupon.find();
      if (cupons.length > 0) {
        return res.status(200).json({ cupons });
      } else {
        return res.status(200).json({ message: "No cupons found" });
      }
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
  async addCuponToCart(req, res, next) {
    try {
      const cartId = req.params.cart;
      Cart.findOne({ _id: cartId }).exec((error, cart) => {
        if (cart) {
          if(cart.discounts){
            return res.status(400).json({ status:"fail",message:"Cupon already added" });
          }
          const cuponExist = Cupon.find()
            .where("code")
            .equals(req.body.code)
            .exec((error, cupon) => {
              if (cupon) {
                const updateCart = Cart.findByIdAndUpdate(
                  cartId,
                  {
                    $set: {
                      discounts: cupon[0].amount,
                      total_price: cart.total_price - cupon[0].amount,
                    },
                  },
                  { new: true }
                ).exec((error, newcart) => {
                  if (error) return res.status(400).json({ error });
                  if (newcart) {
                    return res.status(200).json({ newcart });
                  }
                });
              } else {
                return res.status(400).json({
                  status: "fail",
                  message: "Invalid cupon",
                });
              }
            });
        }else{
          return res.status(400).json({
            status: "fail",
            message: "No cart found",
          });
        }
      });
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },
};
