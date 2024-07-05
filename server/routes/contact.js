const {Router}  = require('express');
const { validateContact } = require('../model/contact');
const router = Router();

router.post('./createcontact', async(req,res) =>{
    //const {name, address, email, phone} = req.body;
    const {error, value} = validateContact(req.body);
    if(error) return res.status(400).json(error);
    
})

module.exports = router;