// const jwt = require('jsonwebtoken');
// const key = "pdvalleyssecretkey";
// const expiresIn = 60 * 60 * 2; // 2 hours

// const auth = {
//     signToken(username) {
//         return jwt.sign({username:username}, key, {expiresIn})
//     },
//     ensureAuth() {
//         return (req, res, next) => {
//             const {authorization} = req.headers;
//             if (!authorization) {
//                 res.status(401);
//                 throw Error('No Authorization headers')
//             }
//             try {
//                 req.user = this.verify(authorization);
//             } catch (e) {
//                 res.status(401);
//                 throw e
//             }
//             next()
//         }
//     },
//     verify(token) {
//         return jwt.verify(token.replace(/^Bearer\s/, ''), key)
//     }
// };

// module.exports = auth;
