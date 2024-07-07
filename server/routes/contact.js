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
                postedBy: req.user._id
            })
            return res.status(201).json({ message: "Contact Created Succesfully" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ Error: "Server error" });

        }
    }

})

router.get('/mycontacts', async (req, res) => {
    try {
        const allContacts = await ContactModel.find({});
        return res.status(200).json({ message: allContacts });
    }
    catch (err) {
        return res.status(500).json({ Error: err });
    }
})

router.put('/contact/:id', async (req, res) => {
    const id = req.params.id;
    if(!mongoose.isValidObjectId(id))
        return res.status(401).json({ Error: "No contact exist with this id" });
    try {
        const contact = await ContactModel.findById(id);
        if (contact.postedBy._id.toString() != req.user._id.toString())
            return res.status(401).json({ Error: "Cannot update other's contacts" });
        const updatedData = {...req.body, id:undefined};
        await ContactModel.updateOne({_id:id}, updatedData);
        return res.status(200).json({message: 'Successfull Updation of contact'});
    } catch (error) {
        return res.status(500).json({Error: 'Server error'})
    }
})

router.delete('/deleteContact/:id', async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id))
        return res.status(401).json({ Error: "No contact exist with this id" });
    try {
        const contact = await ContactModel.findById(id);
        if (contact.postedBy._id.toString() != req.user._id.toString())
            return res.status(401).json({ Error: "Cannot delete other's contacts" });
        await ContactModel.findByIdAndDelete(id);
        return res.status(201).json({ message: 'Contact sucessfully deleted!!' });
    } catch (error) {
        return res.status(500).json({ Error: err.message });
    }
})

module.exports = router;