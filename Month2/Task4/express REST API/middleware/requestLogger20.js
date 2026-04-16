function requestLogger20(req, res, next) {
    console.log(`[Task20] ${req.method} ${req.url}`);
    next();
}

module.exports = requestLogger20;