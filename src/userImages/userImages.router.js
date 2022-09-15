const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const userImageServices = require('./userImages.http')


router.route('/') //* /api/v1/users/
    .get(userImageServices.getAll)
    .post(userImageServices.create)
router.route('/:id')
    .get(userImageServices.getById)
    .delete(/*passport.authenticate('jwt', {session: false}), roleAdminMiddleware, */userImageServices.remove)
    .put(/*passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,*/userImageServices.edit)


exports.router = router