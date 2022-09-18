const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)


const accommodationServices = require('./accommodations.http')

router.route('/')
    .get(accommodationServices.getAll)
    .post(passport.authenticate('jwt', {session: false}), accommodationServices.createAccommodation)

router.route('/:id')
    .get(accommodationServices.getById)
    .put(passport.authenticate('jwt', {session: false}), accommodationServices.editAccommodation) //ocupa credenciales
    .delete(passport.authenticate('jwt', {session: false}), accommodationServices.deleteAccommodation)//ocupa credenciales



module.exports= {
    router
}
