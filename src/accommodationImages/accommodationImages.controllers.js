const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const accommodationImages = require("../models/acomodations.images.models");
const Roles = require("../models/roles.model");
const accommodation = require("../models/acomodations.model")

const getAll = async () => {
  const res = await accommodationImages.findAll({
    include: [
      {
        model: accommodation
      }
    ],
  })
  return res
};

const getById = async (id) => {
  const res = await accommodationImages.findOne({
    where: { id },
    include: [
      {
        model: accommodation
      }
    ],
  });
  return res;
};

const create = async (data) => {
  const newuserImages = await accommodationImages.create({
    id: uuid.v4(),
    Name: data.Name,
    acomodationId: data.acomodationId,
    url: data.url
  })
  return newuserImages;
};

const edit = async (userId, data, userRol) => {
  let res = null
  if ("5ee551ed-7bf4-44b0-aeb5-daaa824b9473" === userRol) {//admin
    res = await accommodationImages.update(
      { ...data },
      { where: { id: userId } }
    )
  } else {
    res = await accommodationImages.update(
      data,
      { where: { id: userId }, }
    )
  }
  return res
};

const deleteAccommodationImages = async (id) => {
  const userImageDeleted = await accommodationImages.destroy({
    where: {
      id: id,
    },
  });
  return userImageDeleted;
};

module.exports = {
  getAll,
  create,
  getById,
  edit,
  deleteAccommodationImages
}