const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const auth = require('../middleware/auth');
const crypto = require('crypto');
const User = require('../models/User');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @route   POST api/payment/razorpay/create-order
// @desc    Create a Razorpay order
// @access  Private
router.post('/create-order', auth, async (req, res) => {
  try {
    const options = {
      amount: 1000, // Amount in paise (e.g., ₹10.00)
      currency: 'INR',
      receipt: `receipt_order_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) return res.status(500).send('Error creating order');
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/payment/razorpay/verify-payment
// @desc    Verify Razorpay payment
// @access  Private
router.post('/verify-payment', auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest('hex');

  if (digest === razorpay_signature) {
    try {
      const user = await User.findById(req.user.id);
      user.subscriptionStatus = 'pro';
      await user.save();
      res.json({ status: 'success', message: 'Payment verified successfully.' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error while updating user');
    }
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature.' });
  }
});

module.exports = router;