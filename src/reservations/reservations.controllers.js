const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const reservations = require("../models/reservations.model");
const Users = require("../models/user.model");
const acomodations = require("../models/acomodations.model");

const getAll = async () => {
  console.log("llego aqui")
  const res = await reservations.findAll({
    /*include: [                        //no acepta la relacion entre users y reservations
      {
        model: Users
      },
      {
        model : acomodations
      }
    ]*/
  })
  console.log(res)
  return res
};

const getById = async (id, userId, roleId) => {
  let res
  if (roleId == "5ee551ed-7bf4-44b0-aeb5-daaa824b9473") { //admin
    console.log("admin")
    res = await reservations.findOne({
      where: { id }
    });
  }
  if (roleId == "97006fe0-4a35-47f4-bfbf-fc962e5fe500") { //host o anfitrion
    res = await acomodations.findOne({
      where: {
        reservationId: id,           //no responde a la relacion
        userId: userId
      },
      include: {
        model: reservations,
        where: {
          id
        }
      }
    })
      .then((response) => res = response/*reservations.findOne({
          where: { id }
        })*/
      )

      .catch((err) => null)
    console.log("anfitrion", res)
  }
  if (roleId == "fef3a08d-2cec-4728-9745-7cbd2b37e557") { //guest o invitado
    console.log("invitado")
    res = await reservations.findAll({
      where: { userId, id }/*,
      include:{
        model: Users,
        where :{
          id:userId
        }
      }*/
    })
      .then((response) => res = response)
    console.log("invitado", res)
  }
  return res;
};

const create = async (userId, data) => {

  console.log(data)
  const newReservation = await reservations.create({
    id: uuid.v4(),
    userId: userId,
    arrival: data.arrival,
    departure: data.departure,
    acomodationId: data.acomodationId,
    adults: data.adults,
    kids: data.kids,
    babies: data.babies,
    pets: data.pets,
    score: data.score,
    is_finished: false,
    is_canceled: false
  })
  return newReservation;
};

const edit = async (id, userID, data, userRol) => {
  let res = null
  const { createdAt, updatedAt, userId, is_finished, ...restOfProperties } = data;
  if (userRol === "5ee551ed-7bf4-44b0-aeb5-daaa824b9473") {//admin
    res = await reservations.update(
      data,//restOfProperties,
      { where: { id: id } }
    )
  }
  if (userRol === "97006fe0-4a35-47f4-bfbf-fc962e5fe500") {//host
    res = await acomodations.findAll({
      where: {
        reservationId: id, //UUID de reservacion        //no responde a la relacion
        userId: userID     //propietaio del lugar
      }
    })
      .then(
        (response) => {
          res = reservations.update(
            data,
            { where: { id } }
          )
        }
      )
  }
  if (userRol === "fef3a08d-2cec-4728-9745-7cbd2b37e557") {//invitado
    await reservations.findOne({
      where: { id }
    })
    .then((response) => {
      if (response.userId === userID) {
        res= reservations.update(
          restOfProperties,
          { where: {id} }
        )
        console.log("fffffff", response )
      }
    })

  }
  return res
};

const deleteReservation = async (id, userID, userRol) => {
  let reservationDeleted
  if (userRol === "5ee551ed-7bf4-44b0-aeb5-daaa824b9473") {//admin
    reservationDeleted = await reservations.destroy({
      where: {
        id: id,
      },
    })
  }
  if (userRol === "97006fe0-4a35-47f4-bfbf-fc962e5fe500") {//host
    res = await acomodations.findAll({
      where: {
        reservationId: id, //UUID de reservacion        //no responde a la relacion
        userId: userID     //propietaio del lugar
      }
    })
      .then(
        (response) => {
          reservationDeleted = reservations.destroy({
            where: {
              id: id,
            },
          })
        }
      )
  }
  if (userRol === "fef3a08d-2cec-4728-9745-7cbd2b37e557") {//invitado
    await reservations.findOne({
      where: { id }
    })
    .then((response) => {
      if (response.userId === userID) {
        reservationDeleted = reservations.destroy({
          where: {
            id: id,
          },
        })
        console.log("fffffff", response )
      }
    })

  }




  return reservationDeleted;
}

const getReservationsByAccommodation = async (AccommodationId, UserId, roleId) => {
  let res = null
  console.log(roleId)
  if (roleId === "5ee551ed-7bf4-44b0-aeb5-daaa824b9473") {//admin
    res = await reservations.findAll({
      where: { acomodationId: AccommodationId }
    });
  } else {
    await acomodations.findOne({
      where: { id: AccommodationId }
    })
      .then((resp) => {
        if (resp.userId === UserId) {
          res = reservations.findAll({
            where: { acomodationId: AccommodationId }
          });
        }
      })
    return res
  }
  return res;
}

module.exports = {
  getAll,
  create,
  getById,
  edit,
  deleteReservation,
  getReservationsByAccommodation
}