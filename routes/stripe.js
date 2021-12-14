var express = require('express');
var router = express.Router();
var { STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY } = require('../config');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

router.get('/publishableKey', (req, res) => {
    res.json({ key: STRIPE_PUBLIC_KEY })
})

router.post('/create-payment-intent', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: 'cad',
        payment_method_types: ['card']
    })

    res.json({ clientSecret: paymentIntent.client_secret })
});



module.exports = router;