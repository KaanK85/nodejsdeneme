const session = require("express-session");

const sessionMiddleware = session({
    secret: "gizliAnahtar",
    resave: false, 
    saveUninitialized: true
});

// Flash mesajları manuel yönetelim
const flashMiddleware = (req, res, next) => {
    req.flash = (key, value) => {
        if (!req.session.flashMessages) {
            req.session.flashMessages = {};
        }
        if (value) {
            req.session.flashMessages[key] = value;
        } else {
            const message = req.session.flashMessages[key];
            delete req.session.flashMessages[key];
            return message;
        }
    };
    next();
};

// Flash mesajları `res.locals` içine otomatik at
const setLocalsMiddleware = (req, res, next) => {
    res.locals.successMessage = req.flash("success") || "";
    next();
};

module.exports = {
    sessionMiddleware,
    flashMiddleware,
    setLocalsMiddleware
};