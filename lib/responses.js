module.exports = (req, res, next) => {
    res.sendResponse = (data) => {
        res.send(data);
    };
    res.sendError = (options) => {
        const { statusCode, message } = options;
        const response = { success: false, message };
        res.status(statusCode).send(response);
    };
    next();
};
