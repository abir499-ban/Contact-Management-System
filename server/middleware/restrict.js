const jwt  = require('jsonwebtoken');
const User = require('../model/user');

async function restricttoLoggedinUsersonly(req,res,next){
    const token = req.headers.authorization;
    if(token){
        const actualtoken = token.split(" ")[1];
        const payload = jwt.verify(actualtoken,process.env.SECRET_KEY);
        try {
            const id = payload.id;
            const user = await User.findById(id).lean();
            req.user = {...user, password:undefined}
            return next();
        } catch (err) {
            return res.status(500).json({message:"Server error occured"});
        }
    }else{
        console.log("forbidden");
        return res.status(400).json({message:"Forbidden🔴🔴"})
    }

}

module.exports = {
    restricttoLoggedinUsersonly
}