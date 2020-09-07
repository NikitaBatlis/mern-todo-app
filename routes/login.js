const router = require('express').Router();
const passport = require('passport');

router.get('/api/login', passport.authenticate('google', {scope: ['profile']}));

router.get('/api/login/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('http://localhost:3000/dashboard');
	res.send(req.user);
});

module.exports = router;