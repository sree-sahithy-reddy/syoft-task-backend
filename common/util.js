const jwt = require("jsonwebtoken");
const secretKey = "syoft_secret";

  function authorize(requiredRole) {
    return async(req, res, next) => {
        try {
            if (!req.headers.authorization) {
                throw new Error("Authorization header is missing");
            } else {
                let parts = req.headers.authorization.split(" ");
                if (parts.length != 2 || parts[0] != "Bearer") {
                    throw new Error("Invalid authorization header");
                }
            }
        
            const token = req.headers["authorization"].split(' ')[1];
        
            jwt.verify(token, secretKey, (err, user) => {
                if(err) {
                    console.log('While verifying token error is: ', err);
                    return res.json({ message: err });
                } else {
                    req.user = user;
                    console.log(user);
                    return next();
                }
            });
        } catch (err) {
            console.log(err);
            return next({message: err});
        }
    }
}

module.exports = {authorize};