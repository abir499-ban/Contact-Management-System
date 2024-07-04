const jwt  = require('jsonwebtoken');
const User = require('../model/user');

async function restricttoLoggedinUsersonly(req,res,next){
    console.log("inside protected")
    const token = req.headers.authorization;
    console.log("Token:", token);
    if(token === "null"){
        console.log("Forbidden");
        return res.status(400).json({message:"Forbidden"});
    }
    else{
        const actualtoken = token;
        try {
            const payload = jwt.verify(actualtoken,process.env.SECRET_KEY);
            const id = payload.id;
            const user = await User.findById(id).lean();
            req.user = {...user, password:undefined};
            console.log("Authenticated");
            return next();
        } catch (err) {
            console.log("Pokemon");
            return res.status(500).json({message:"Server error occured"});
        }
    }

}

module.exports = {
    restricttoLoggedinUsersonly
}