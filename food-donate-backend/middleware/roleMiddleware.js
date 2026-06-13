const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {

    // user exists check
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // role check
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;