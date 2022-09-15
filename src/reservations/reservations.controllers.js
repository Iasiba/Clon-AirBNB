const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const reservations = require("../models/reservations.model");
const Roles = require("../models/roles.model");
const Users = require("../models/user.model");
const acomodations = require("../models/acomodations.model");

const getAll = async () => {
  const res = await reservations.findAll({
    include: [
      {
        model: Users
      },
      {
        model: acomodations
      }
    ]
  })
  return res
};

const getById = async (id) => {
  const res = await reservations.findOne({
    where: { id }
  });
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

const edit = async (id, userID, data) => {//, userRol
  let res = null
  const { createdAt, updatedAt, userId, is_finished, ...restOfProperties } = data;
  //if ("5ee551ed-7bf4-44b0-aeb5-daaa824b9473" === userRol) {//admin

  console.log("mmmmmm")
  console.log(data)
  console.log(data.acomodationId)
  res = await reservations.update(
    restOfProperties,
    { where: { id: id, userId: userID } }
  )
  /*} else {
    res = await reservations.update(
      data,
      { where: { id: userId }, }
    )
  }*/
  return res
};

const deleteReservation = async (id) => {
  const reservationDeleted = await reservations.destroy({
    where: {
      id: id,
    },
  });
  return reservationDeleted;
};

module.exports = {
  getAll,
  create,
  getById,
  edit,
  deleteReservation
}