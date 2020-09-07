const router = require('express').Router();
const user = require('../controllers/user.controller.js');

const authCheck = ((req, res, next)=>{
  if (!req.user){
    //if user not logged in
    res.redirect('/api/login');
  } else next();
});

router.get('/api/dashboard', authCheck, user.findUser);
router.put('/api/dashboard/update', user.updateToDo);

module.exports = router;
