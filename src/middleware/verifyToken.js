const jwt = require("jsonwebtoken");
const Users = require("../models/Users");

const verifyToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({ msg: "unauthorized" });
    }
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decoded);
        req.payload = {
          id: decoded.id,
          email: decoded.email,
        };
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed verify token", error });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({ msg: "please login!!" });
    }
    const token = bearerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded.role !== "admin") {
        return res.status(403).json({ msg: "access denied" });
      }
      if (err) {
        console.log(err);
      } else {
        console.log(decoded);
        req.payload = {
          id: decoded.id,
          email: decoded.email,
        };
      }
    });
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed verify token", error });
  }
};


module.exports = { verifyToken, verifyAdmin };
