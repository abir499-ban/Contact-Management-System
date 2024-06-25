const USER = require('../model/user');
const bcrypt = require('bcrypt');
const {generateToken} = require('../service/auth');

async function register(req,res){
    //fetching details from req object
    const {name, email,password} = req.body;
    //validatng all the details
    if(!name || !email || !password) return res.status(400).json({message:"All feilds are required"});
    //validating name
    if(name.length > 25) return res.status(400).json({message:"Name can only be of 25 characters"});
    //validating password
    if(password.length < 8) return res.status(400).json({message:"Password should be of minimum length 8"});
    //validating email
    const emaliRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emaliRegex.test(email)) return res.status(400).json({message:"Please enter a valid email"});

    try {
        const hashedpassword = await bcrypt.hash(password,12);     //hashing
        const user = await USER.create({
            name: name,
            email:email,
            password: hashedpassword,
        })
        console.log('user created');
        return res.status(201).json({user});
    } catch (err) {

        return res.status(500).json({error:err});
        
    }
}


async function handlelogin(req,res){
    try {
        const {email,password} = req.body;
    //validatng all the details
    if(!email || !password)   return res.status(401).json({message:"All feilds are required"});
    //checking if the email exits
    const user = await USER.findOne({email:email});
    if(!user) return res.status(401).json({message:"Invalid email address"})
    //matching the password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if(!doesPasswordMatch) return res.status(401).json({message:'Wrong Password'});
    const token = generateToken(user);
    return res.status(201).json({token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }


}


module.exports = {
    register,
    handlelogin,
}