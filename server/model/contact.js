const {Schema, model} = require('mongoose');
const Joi  = require('joi');

const ContactSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},{
    timestamps:true,
})

const ContactModel = model("contact", ContactSchema);

const validateContact = (data) =>{
    const schema = Joi.object({
        name: Joi.string().min(4).max(30).required(),
        address: Joi.string().min(10).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().max(9999999999).required(),
    })
    return schema.validate(data);
}

module.exports = {
    validateContact,
    ContactModel,
}