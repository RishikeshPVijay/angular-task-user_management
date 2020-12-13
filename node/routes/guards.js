const router = require('express').Router();


router.post('/isAuthenticated', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.user.admin === true ) return res.json({ authenticated: true, admin: true });
        return res.json({ authenticated: true })
    };
    res.json({ authenticated: false });
});


module.exports = router;