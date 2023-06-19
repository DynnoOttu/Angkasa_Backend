const express = require('express')
const router = express.Router()
const Users = require('./users')
const Auth = require('./auth')
const Airline = require("./airline");
const Airport = require("./airport");
const Ticket = require("./ticket");
const Booking = require("./booking");

router.use('/auth', Auth)
router.use('/users', Users)
router.use("/airlines", Airline);
router.use("/airports", Airport);
router.use("/tickets", Ticket);
router.use("/bookings", Booking);


module.exports = router