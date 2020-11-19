const Cupon = require("../models/cupon");

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
};
