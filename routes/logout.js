const router = require('express').Router();
const passport = require('passport');

router.get('/api/logout', (req, res) => {
    req.session = null;
    req.logOut();
    res.redirect('http://localhost:3000/');
})

module.exports = router;