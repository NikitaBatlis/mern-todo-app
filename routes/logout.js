const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
    req.session = null;
    req.logOut();
    res.redirect('/');
})

module.exports = router;