const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('google', {scope: ['profile']}));

router.get('/login/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/dashboard');
	res.send(req.user);
});

module.exports = router;