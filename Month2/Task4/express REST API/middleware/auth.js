module.exports = (req, res, next) => {
  const token = req.headers['x-auth'];

  console.log("Auth check for admin route");

  if (!token || token !== "admin123") {
    console.log("Unauthorized access attempt");
    return res.status(401).json({
      success: false,
      message: "Unauthorized access"
    });
  }

  console.log("Access granted");
  next();
};
