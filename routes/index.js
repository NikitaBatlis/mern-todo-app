const router = require('express').Router();

router.get('/api', (req, res) => res.send(req.user));

module.exports = router;
