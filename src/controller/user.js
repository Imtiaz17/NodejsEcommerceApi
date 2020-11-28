const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { firstName, lastName, email, role, _id } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
          },
        });
      } else {
        res.status(400).json({
          status:"fail",
          message: "Incorrect password",
        });
      }
    } else {
      return res.status(400).json({status:"fail",message: "Incorrect Email" });
    }
  });
};

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password, role } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      role,
      userName: firstName+"_"+Math.random().toString(36).substr(2, 5)
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      if (data) {
        return res.status(201).json({
          message: "User created successfully",
          user: data,
        });
      }
    });
  });
};
