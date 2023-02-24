const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.user((req, res) => {
    // TODO: Maybe modify this to be prettier at some point?
    res.send('<h1> Invalid Route!</h1>');
});

module.exports = router;