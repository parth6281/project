var express = require('express');
var router = express.Router();
const ctrlAuth = require('../controllers/authentication');
const ctrlAbout = require('../controllers/about');
const incomeRouter = require('./income');
const expenseRouter = require('./expense');
const ctrlUsers = require('../controllers/users');


const stripeRouter = require('./stripe');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', ctrlAuth.login);
router.post('/register', ctrlAuth.register);

router.get('/about', ctrlAbout.about);
router.use('/income', incomeRouter);
router.use('/expense', expenseRouter);

router.get('/profile/:userId', ctrlUsers.getProfile);
router.get('/contact', ctrlUsers.contactUs);
router.post('/contact', ctrlUsers.contact);

router.use('/stripe', stripeRouter);

module.exports = router;
