const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const reservationServices = require('./reservations.http')


router.route('/') //* /api/v1/reservations/
    .get (passport.authenticate('jwt', { session: false }),roleAdminMiddleware, reservationServices.getAll)
    .post(passport.authenticate('jwt', { session: false }), reservationServices.create)

router.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), reservationServices.getById)
    .delete(passport.authenticate('jwt', { session: false }), reservationServices.remove)
    .put(passport.authenticate('jwt', { session: false }), reservationServices.edit)

router.route('/accommodation/:id')
    .get(passport.authenticate('jwt', { session: false }), reservationServices.getReservationsByAccommodation)

exports.router = router