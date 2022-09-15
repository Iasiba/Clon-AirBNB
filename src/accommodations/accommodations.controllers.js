const uuid = require("uuid");
const Accommodations = require("../models/acomodations.model");
const Places = require("../models/places.model");
const Users = require("../models/user.model");

const getAllAccommodations = async () => {
  const data = await Accommodations.findAll({
    include: [
      {
        model: Places,

      },
      {
        model: Users,
        as: 'user'
      },
    ],
    // attributes: {
    //   exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
    // },
  });

  // const data = await Users.findAll({
  //     include: {
  //         model: Accommodations,
  //         include: {
  //             model: Places,
  //             attributes:{
  //                 exclude: ['createdAt', 'updatedAt']
  //             }
  //         }
  //     }
  // })
  return data;
};

const getAccommodationById = async (id) => {
  const data = await Accommodations.findOne({
    where: {
      id,
    },
    include: {
      model: Places,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId", "placeId", "hostId"],
    },
  });
  return data;
};

const createAccommodation = async (data) => {
  console.log(data.title,
    data.description,
    data.guests,
    data.rooms,
    data.beds,
    data.bathrooms,
    data.price,
    data.hostId,
data.userId,
     5,
   data.placeId,
   data.commision)//posible error por string error //como se manda user por req.user.id y el usuario como sabe que id tienen las cosas
  const newAccommodation = await Accommodations.create({
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    guests: data.guests,
    rooms: data.rooms,
    beds: data.beds,
    bathrooms: data.bathrooms,
    price: data.price,
    userId: "ba0495ea-460a-4d48-9ddb-34eab4734c45",
    score: 5,
    placeId: "ba0495ea-460a-4d48-9ddb-34eab4734c45",
    commision: data.commision,
    is_active: true
  })
  return newAccommodation
}

const editAccommodation = async (idAccommodation, data, userRol, hostId) => {
  let res = null
  const { createdAt, updatedAt, ...restOfProperties } = data;
  if ("5ee551ed-7bf4-44b0-aeb5-daaa824b9473" === userRol) {//usuario cualquiera
    res = await Accommodations.update(
      { ...restOfProperties },
      { where: { id: idAccommodation,hostId:hostId } } //id de accommodation perteciente a hostid sera verdad
    )
  } else {
    res = await Accommodations.update(
      restOfProperties,
      { where: { id: idAccommodation }, }
    )
  }
  return res
}

const deleteAccommodation = async (id) =>{
  const AccommodationDeleted = await Accommodations.destroy({
    where: {
      id: id,
    },
  });
  return AccommodationDeleted;
}

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  editAccommodation,
  deleteAccommodation

};
