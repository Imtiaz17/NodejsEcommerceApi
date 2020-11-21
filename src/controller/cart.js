const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      //if cart exist update the cart
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;
      if (item) {
        //if product in cart exist update the quantity
        condition = { user: req.user._id, "cartItems.product": product };
        update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity
            },
            "total_price":cart.total_price+(req.body.cartItems.price * req.body.cartItems.quantity)
          },
        };
      } else {
        condition = { user: req.user._id };
        update = {
          $push: {
            cartItems: req.body.cartItems
          },
          $set: {
            total_price:cart.total_price+(req.body.cartItems.quantity * req.body.cartItems.price)
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
        user: req.user._id,
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
