const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const accommodationImageServices = require('./accommodationImages.http')


router.route('/') //* /api/v1/users/
    .get(accommodationImageServices.getAll)
    .post(accommodationImageServices.create)
router.route('/:id')
    .get(accommodationImageServices.getById)
    .delete(/*passport.authenticate('jwt', {session: false}), roleAdminMiddleware, */accommodationImageServices.remove)
    .put(/*passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,*/accommodationImageServices.edit)


exports.router = router