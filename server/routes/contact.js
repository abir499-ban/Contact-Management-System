const { Router } = require('express');
const mongoose = require('mongoose')
const { validateContact, ContactModel } = require('../model/contact');
const router = Router();
const { restricttoLoggedinUsersonly } = require('../middleware/restrict');

router.post('/createcontact', async (req, res) => {
    //const {name, address, email, phone} = req.body;
    const { error, value } = validateContact(req.body);
    if (error) return res.status(400).json({ Error: error.message });
    else {
        try {
            const contact = await ContactModel.create({
                name: req.body.name,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone,
                postedBy: req.body.postedBy
            })
            console.log('Done');
            return res.status(201).json({ message: "Contact Created Succesfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: "Server error" });

        }
    }

})

router.post('/mycontacts', async (req, res) => {
    const id = req.body.id;
    if(!id) return res.status(400).json({Error : " User not logged in. Please log in first"})
    try {
        const allContacts = await ContactModel.find({
            postedBy:id,
        })
        return res.status(200).json({ message: allContacts.reverse() });
    }
    catch (err) {
        return res.status(500).json({ Error: err });
    }
})

router.put('/editcontact/:id', async (req, res) => {
    const id = req.params.id;
    // if(!mongoose.isValidObjectId(id))
    //     return res.status(401).json({ Error: "No contact exist with this id" });
    try {
        const contact = await ContactModel.findById(id);
        // if (contact.postedBy._id.toString() != req.user._id.toString())
        //     return res.status(401).json({ Error: "Cannot update other's contacts" });
        if(!contact) return res.status(401).json({message:contact});
        const updatedData = {...req.body, id:undefined};
        await ContactModel.updateOne({_id:id}, updatedData);
        return res.status(200).json({message: 'Successfull Updation of contact'});
    } catch (error) {
        return res.status(500).json({Error: 'Server error'})
    }
})

router.delete('/deleteContact/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await ContactModel.findById(id);
        if(!contact) return res.status(401).json({message:"No such contact exist"});
        // if (contact.postedBy._id.toString() != req.user._id.toString())
        //     return res.status(401).json({ Error: "Cannot delete other's contacts" });
        await ContactModel.findByIdAndDelete(id);
        return res.status(201).json({ message: 'Contact sucessfully deleted!!' });
    } catch (err) {
        return res.status(500).json({ Error: err.message });
    }
})

router.get('/getcontact/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const contact = await ContactModel.findById(id);
        if(!contact) return res.status(401).json({Error : "No such contact found"});
        return res.status(201).json({message : contact});
    } catch (err) {
        console.log(err);
        return res.status(500).json({Error:err.message})
    }
})

module.exports = router;