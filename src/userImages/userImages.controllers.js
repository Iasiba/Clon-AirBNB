const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const userImages = require("../models/users.images");
const users= require("../models/user.model")

const getAll = async () => {
  const res = await userImages.findAll({
    include: [
      {
        model: users
      }
    ]
  })
  return res
};

const getById = async (id) => {
  const res = await userImages.findOne({
    where: { id },
    include: [
      {
        model: users
      }
    ]
  });
  return res;
};

const create = async (data) => {
  const newuserImages = await userImages.create({
    id: uuid.v4(),
    url: data.url,
    userId: data.userId
  })
  return newuserImages;
};

const edit = async (userId, data, userRol) => {
  let res = null
  if ("5ee551ed-7bf4-44b0-aeb5-daaa824b9473" === userRol) {//admin
    res = await userImages.update(
      { ...data },
      { where: { id: userId } }
    )
  } else {
    res = await userImages.update(
      data,
      { where: { id: userId }, }
    )
  }
  return res
};

const deleteuserImages = async (id) => {
  const userImageDeleted = await userImages.destroy({
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
  deleteuserImages
}