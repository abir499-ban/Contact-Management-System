const {Router, json}  = require('express');
const router = Router();
const {register, handlelogin} = require('../controller/user');
const { restricttoLoggedinUsersonly } = require('../middleware/restrict');


router.post('/register' ,  register);
router.post('/login', handlelogin);
router.get('/me', restricttoLoggedinUsersonly, (req,res) =>{
    const user = req.user;
    console.log(user);
    return res.status(200).json({user});
})


module.exports = router;