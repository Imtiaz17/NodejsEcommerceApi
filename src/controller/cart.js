const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  const { product, quantity, price } = req.body;
  Cart.findOne({ _id: req.body.cart_id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {

      //if cart already exists then update cart by quantity
      let itemIndex = cart.cartItems.findIndex(p => p.product == product);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.cartItems[itemIndex];
        productItem.quantity = quantity;
        cart.cartItems[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.cartItems.push({ product, quantity, price });
      }
      cart.save(function (err, cart) {
        cart
          .populate("cartItems.product", "_id name price productPic")
          .execPopulate()
          .then(function (updatedcart) {
            let cartItems = [];
            updatedcart.cartItems.forEach((item, index) => {
              cartItems.push({
                product: item.product._id.toString(),
                name: item.product.name,
                img: item.product.productPic[0].img,
                price: item.product.price,
                quantity: item.quantity,
                total_price: item.product.price * item.quantity
              })
            });
            res.status(200).json({ cartItems });
          })
      });

    } else {
      //if cart not exist then create a new cart
      const cart = new Cart({
        cartItems: [{ product, quantity, price }]
      });
      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error });
        cart
          .populate("cartItems.product", "_id name price productPic")
          .execPopulate()
          .then(function (updatedcart) {
            let cartItems = [];
            updatedcart.cartItems.forEach((item, index) => {
              cartItems.push({
                product: item.product._id.toString(),
                name: item.product.name,
                img: item.product.productPic[0].img,
                price: item.product.price,
                quantity: item.quantity,
                total_price: item.product.price * item.quantity
              })
            });
            res.status(200).json({ cartItems,cart_id:cart._id });
          })

      });
    }
  });
};

exports.deleteCartItem = (req, res) => {
  const { productId, quantity, price } = req.body;
  Cart.findOne({ _id: req.body.cart_id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      let itemIndex = cart.cartItems.findIndex(p => p.product == productId);
      if (itemIndex > -1) {
        cart.cartItems.splice(itemIndex, 1);
        const newcart = cart.save((error, updatedcart) => {
          if (error) return res.status(400).json({ error });
          if (updatedcart) {
            return res.status(200).json({ updatedcart });
          }
        })
      } else {
        return res.status(400).json({ 'message': 'Item not found' });
      }
    } else {
      return res.status(400).json({ 'message': 'cart not found' });
    }
  })
}


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
            productId: item.product._id.toString(),
            name: item.product.name,
            img: item.product.productPic[0].img,
            price: item.product.price,
            quantity: item.quantity,
            total_price: item.product.price * item.quantity
          })
        });
        res.status(200).json({ cartItems });
      }
    });
};