const adminAuth = (req, res, next) => {
  const token = "xdfgyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Denied Unauthorized Access");
  }
  next();
};

const userAuth = (req, res, next) => {
  const token = "abc";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("UnAuthorized Access");
  }
  next();
};

module.exports = {
  adminAuth,
  userAuth,
};
