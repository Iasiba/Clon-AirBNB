const router = require('express').Router()

const accommodationServices = require('./accommodations.http')

router.route('/')
    .get(accommodationServices.getAll)
    .post(accommodationServices.createAccommodation)

router.route('/:id')
    .get(accommodationServices.getById)
    .put(accommodationServices.editAccommodation) //ocupa credenciales
    .delete(accommodationServices.deleteAccommodation)//ocupa credenciales



module.exports= {
    router
}
