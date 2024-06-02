const jwt = require('jsonwebtoken');

const jwtService = {
    // Function to sign a token
    sign: (payload, expiresIn = '1h', secretKey) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secretKey, { expiresIn }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    },

    // Function to verify a token
    verify: (token, secretKey) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }
};

module.exports = jwtService;
