const router = require('express').Router();

router.post('/logout', (req, res) => {
    req.logout();
    res.clearCookie('user_sid');
    res.json({logout: true});
});

module.exports = router;