function checkAuth22(req, res, next) {
  console.log("Checking admin access...");

  const token = req.headers['authorization'];

  if (token === "admin123") {
    console.log("Access granted");
    next();
  } else {
    console.log("Access denied");
    return res.status(401).json({
      message: "Unauthorized access"
    });
  }
}

module.exports = checkAuth22;