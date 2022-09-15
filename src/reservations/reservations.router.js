const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const reservationServices = require('./reservations.http')


router.route('/') //* /api/v1/users/
    .get(reservationServices.getAll)
    .post(passport.authenticate('jwt', { session: false }),reservationServices.create)
router.route('/:id')
    .get(reservationServices.getById)
    .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationServices.remove)
    .put(passport.authenticate('jwt', { session: false }), /*roleAdminMiddleware,*/reservationServices.edit)


exports.router = router