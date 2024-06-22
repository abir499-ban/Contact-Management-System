const {Router, json}  = require('express');
const router = Router();
const {register, handlelogin} = require('../controller/user');


router.post('/register' ,  register);
router.post('/login', handlelogin);



module.exports = router;