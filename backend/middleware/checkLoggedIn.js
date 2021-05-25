const authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    return res.json("not allowed");
  }
  next();
};

module.exports = { authenticateUser };
