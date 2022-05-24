const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  Cart.findOne({ _id: req.body.cart_id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart exist update the cart
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;
      if (item) {
        //if product in cart exist update the quantity
        condition = { "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity
            },
            "total_price": cart.total_price + (req.body.cartItems.price * req.body.cartItems.quantity)
          },
        };
      } else {
        condition = {};
        update = {
          $push: {
            cartItems: req.body.cartItems
          },
          $set: {
            total_price: cart.total_price + (req.body.cartItems.quantity * req.body.cartItems.price)
          }
        };
      }
      Cart.findOneAndUpdate(condition, update, { new: true }).exec(
        (error, _cart) => {
          if (error) return res.status(400).json({ error });
          if (_cart) {
            return res.status(201).json({ cart: _cart });
          }
        }
      );
    } else {
      //if no cart exist for user create a cart
      const cart = new Cart({
        cartItems: req.body.cartItems,
        total_price: req.body.cartItems.price * req.body.cartItems.quantity
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
// exports.getCart = (req, res) => {
//   const id = req.params.id;
//   await Cart.findOne({ _id: id }).exec((error, result) => {
//     if (error) return res.status(400).json({ error });
//     if (result) {
//       res.status(202).json({ result });
//     }
//   });
// }

exports.getCart = (req, res) => {
  const id = req.params.id;
  Cart.findOne({ _id: id })
    .populate("cartItems.product", "_id name price productPic")
    .exec((error, cart) => {
      if (error) return res.status(400).json({ error });
      if (cart) {
        let cartItems = [];
        cart.cartItems.forEach((item, index) => {
          cartItems.push({
            _id: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPic[0].img,
            price: item.product.price,
            qty: item.quantity,
          })
        });
        res.status(200).json({ cartItems });
      }
    });
};