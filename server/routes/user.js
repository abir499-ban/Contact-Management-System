const {Router, json}  = require('express');
const router = Router();
const {register, handlelogin} = require('../controller/user');
const { restricttoLoggedinUsersonly } = require('../middleware/restrict');


router.post('/register' ,  register);
router.post('/login', handlelogin);



module.exports = router;