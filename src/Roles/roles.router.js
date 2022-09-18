const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const rolesServices = require('./roles.http')


router.route('/') // /api/v1/roles/
    .get(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,rolesServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,rolesServices.create)
router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,rolesServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware,rolesServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,rolesServices.edit)


exports.router = router