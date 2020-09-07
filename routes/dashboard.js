const router = require('express').Router();
const user = require('../controllers/user.controller.js');

const authCheck = ((req, res, next)=>{
  if (!req.user){
    //if user not logged in
    res.redirect('/login');
  } else {
    next();
  }
});

router.get('/dashboard', authCheck, user.findOne);
router.put('/dashboard/add', user.addToDo);
router.put('/dashboard/delete', user.deleteToDo);

module.exports = router;
