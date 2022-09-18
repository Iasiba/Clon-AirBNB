const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const accommodationImageServices = require('./accommodationImages.http')


router.route('/') //* /api/v1/accommodationImages/
    .get(accommodationImageServices.getAll)
    .post(passport.authenticate('jwt', {session: false}),accommodationImageServices.create)
router.route('/:id')
    .get(accommodationImageServices.getById)
    .delete(passport.authenticate('jwt', {session: false}),accommodationImageServices.remove)
    .put(passport.authenticate('jwt', {session: false}),accommodationImageServices.edit)


exports.router = router