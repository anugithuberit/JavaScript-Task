const logger24 = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

module.exports = logger24;