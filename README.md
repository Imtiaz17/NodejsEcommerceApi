# Node(Express) Ecommerce API

An Ecommerce application built with Node.js, Express, and MongoDB.

Project still in development...

## Built With

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Implemented Features

* [x] Users can sign up and login and get JWT token.
* [x] Restricted the private routes.
* [x] Add a prodcut, show a single product, show all products.
* [x] Add brand and show brand.
* [x] Add category and show category.
* [x] Add users address and get user's address.
* [x] Post a review to a product, show all reviews.
* [x] add product to cart and update cart products.
* [x] Add cupon into cart and update cart amount according to cupon amount.
* [x] Make order and get orders also chanage order status.


## Routes

* api/signup [post]
* api/signin [post]

* api/category/add [post]
* api/categories [get]

* api/brand/add [post]
* api/brands [get]

* api/product/add [post]
* api/product/:id [get]
* api/products [get]

* api/review [post]
* api/reviews [get]

* api/addtocart [post]

* api/cupon/add [post]
* api/cupons [get]
* api/cupon/:cart [post]

* api/addOrder [post]
* api/getOrders [get]
* api/update_order_status [post]

* api/address/add [post]
* api/user/getaddress [get]


### Installation
* Clone this repository

```
git clone [https://github.com/Imtiaz17/NodejsEcommerceApi.git]
```

* Navigate to the project directory

* Run `npm install` or `yarn` to instal the projects dependencies
* create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .env.sample .env
```
Fill in your MongoDB connection details and any other options you want to change in `.env` file.

## Thank You