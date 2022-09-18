const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Places = require("../models/places.model");
const Roles = require("../models/roles.model");

const getAllPlaces = async () => {
  const res = await Places.findAll({
    attributes: {
      exclude: ["createdAt", "UpdatedAt"]
    }
  })
  //? select * from users;
  return res
};

const createPlace = async (data) => {
  const newPlace = await Places.create({
    id: uuid.v4(),
    city: data.city,
    state: data.state,
    country: data.country,
    continent: data.continent
  })
  return newPlace;
};
const getByPlace = async (place) => {
  const res = await Places.findOne({
    where: { place },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res;
  //? select * from users where id = ${id};
};
const getPlaceById = async (id) => {
  const res = await Places.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return res;
  //? select * from users where id = ${id};
};
const editPlace = async (PlaceId, data, userRol) => {
  let res = null
  const { createdAt, updatedAt, ...restOfProperties } = data;
  if ("5ee551ed-7bf4-44b0-aeb5-daaa824b9473" === userRol) {//admin
    res = await Places.update(
      { ...restOfProperties },
      { where: { id: PlaceId } }
    )
  } else {
    res = await Places.update(
      restOfProperties,
      { where: { id: PlaceId }, }
    )
  }
  return res
};
const deletePlace = async (id) => {
  const PlaceDeleted = Places.destroy( /// destruccion en cascada no funciona
    { where: { id } }
  )
  return PlaceDeleted;
};

module.exports = {
  createPlace,
  getAllPlaces,
  getByPlace,
  getPlaceById,
  editPlace,
  deletePlace
}