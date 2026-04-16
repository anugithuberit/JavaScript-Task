const auth = (req, res, next) => {
    const token = req.headers['x-auth'];

    if (token !== 'secret123') {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    next();
};

module.exports = auth;