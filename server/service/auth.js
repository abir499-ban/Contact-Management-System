const jwt = require('jsonwebtoken');

function generateToken(user){
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    }

    return jwt.sign(payload,process.env.SECRET_KEY, {
        expiresIn: "1h",
    });

}



module.exports = {
    generateToken,
}