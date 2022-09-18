const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const userImageServices = require('./userImages.http')


router.route('/') //* /api/v1/users/
    .get(passport.authenticate('jwt', {session: false}),roleAdminMiddleware,userImageServices.getAll)
    .post(userImageServices.create)
router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), userImageServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), userImageServices.remove)
    .put(passport.authenticate('jwt', {session: false}), userImageServices.edit)


exports.router = router