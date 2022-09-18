const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

const placeServices = require('./places.http')


router.route('/') //* /api/v1/users/
    .get(placeServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), roleAdminMiddleware ,placeServices.createPlace)
/*
router.route('/:place') //* /api/v1/users/
    .get(placeServices.getByPlace)
*/
router.route('/:id')
    .get(placeServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, placeServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware , placeServices.edit)

exports.router = router