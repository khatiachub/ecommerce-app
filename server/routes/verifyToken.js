const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(401).json(err);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({error:"not authenticated"});
  }
};


const verifyTokenAndAdmin = async(req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed!");
    }
  });
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    next();
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};