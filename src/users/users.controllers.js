const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require("../models/user.model");
const Roles = require("../models/roles.model");
const acomodations = require("../models/acomodations.model");
/*
const userDB = [{
  id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  firstName: "Sahid",
  lastName: "Kick",
  gender: "male",
  email: "sahid.kick@academlo.com",
  password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  phone: "1234567890",
  birthdayDate: "22/10/2000",
  dni: "",
  address: "",
  rol: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
  profile_image: "",
  status: "active",
  verified: false
}];*/
/*
  "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  "first_name": "Sahid",
  "last_name": "Kick",
  "email": "sahid.kick@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "admin",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
*/ 

const getAllUsers = async() => {
  const res= await Users.findAll({
    include: [
      {
        model: acomodations,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Roles
      }
    ],
    attributes:{
      exclude:["password","createdAt","UpdatedAt","roleId"]
    }
  })
  //? select * from users;
  return res
};

const getUserById = async (id) => {
  const res = await Users.findOne({
    where: { id },
    include: [
      {
        model: acomodations,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Roles
      }
    ],
    attributes: {
      exclude: ["password", "createdAt", "updatedAt", "roleId"],
    },
  });
  return res;
  //? select * from users where id = ${id};
};
/*
const getUserById = (id) => {
  const data = userDB.filter((item) => item.id === id);

  return data.length ? data[0] : null
  //? select * from users where id = ${id};
};
*/
const createUser = async (data) => {
  console.log("entro a crear users")
  
  const newUser = await Users.create({
    id: uuid.v4(),
    firstName: data.first_name,
    lastName: data.last_name,
    gender: data.gender,
    email: data.email,
    password: hashPassword(data.password),
    phone: data.phone,
    birthdayDate: data.birthday_date,
    dni: data.dni,
    address: data.address,
    profileImage: data.profile_image,
    status: "active",
    verified: false,
    roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557"
  });
  // const newUserWithSpreadOperator =  await Users.create({
  //   ...data,
  //   id: uuid.v4(),
  //   password: hashPassword(data.password),
  //   role: "normal",
  //   is_active: true,
  //   verified: false,
  // })
  return newUser;
};
/*
const createUser = (data) => {
  const newUser = {
    id: uuid.v4(), //obligatorio y unico
    first_name: data.first_name, //obligatorio
    last_name: data.last_name, //obligatorio
    email: data.email, //obligatorio y unico
    password: hashPassword(data.password), //obligatorio
    phone: data.phone ? data.phone : "", //unico   
    birthday_date: data.birthday_date, //obligatorio
    rol: "normal", //obligatorio y por defecto "normal"
    profile_image: data.profile_image ? data.profile_image : "",
    country: data.country, //obligatorio
    is_active: true, //obligatorio y por defecto true
    verified: false, //obligatorio y por defecto false
  };
  userDB.push(newUser);
  return newUser;
};*/
const editUser = async (userId, data, userRol) => {
  let res = null
  const { id, password, verified, roleId, ...restOfProperties } = data;
  if ("5ee551ed-7bf4-44b0-aeb5-daaa824b9473" === userRol) {//admin
    res = await Users.update(
      { ...restOfProperties, roleId },
      { where: { id: userId } }
    )
  } else {
    res = await Users.update(
      restOfProperties, 
      { where: { id: userId },}
    )
  }
  return res
};
/*
const editUser = (id, data, userRol) => {
  const index = userDB.findIndex((user) => user.id === id);
  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone, //unico
      birthday_date: data.birthday_date,
      rol: userRol === 'admin' ? data.rol : 'normal',
      profile_image: data.profile_image,
      country: data.country,
      is_active: data.is_active,
      verified: false,
    };
    return userDB[index];
  } else {
    return createUser(data);
  }
};*/
const deleteUser = async (id) => {
  console.log("eliminar a ", id)
  const UserDeleted = await Users.destroy({
    where: {
      id: id,
    },
  });
  return UserDeleted;
};
/*
const deleteUser = (id) => {
  const index = userDB.findIndex(user => user.id === id)
  if (index !== -1) {
    userDB.splice(index, 1)
    return true
  } else {
    return false
  } 
}
*/
const getUserByEmail = async (email) => {
  const user = await Users.findOne({
    where: { email },
    attributes: {
      exclude: ["createdAt", "updatedAt", "roleId"],
    },
  });
  return user;
  //? select * from users where email = ${email};
};
/*
const getUserByEmail = (email) => {
  const data = userDB.filter((item) => item.email === email);
  return data.length ? data[0] : false
  //? select * from users where email = ${email};
}
*/
const editProfileImg = async (userID, imgUrl) => {
  const data = await Users.update(
    {
      profileImage: imgUrl,
    },
    {
      where: { id: userID },
    }
  );
  return data;
};
/*
const editProfileImg = (userID, imgUrl) => {
  const index = userDB.findIndex(user => user.id === userID)
  if(index !== -1){
    userDB[index].profile_image = imgUrl
    return userDB[index]
  }
  return false
}
*/
const getUserWithRole = async (userId) => {
  const data = await Users.findOne({
    where: {
      id: userId,
    },
    include: {
      model: Roles,
      as: "role",
      attributes: {
        exclude: ["id", "createdAt", "updatedAt"],
      },
    },
    attributes: {
      exclude: ["roleId", "createdAt", "updatedAt", "password"],
    },
  });
  return data;
};
module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg,
  getUserWithRole
}
/*
const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');

const userDB = [{
  "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  "first_name": "Sahid",
  "last_name": "Kick",
  "email": "sahid.kick@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "admin",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = async () => {

  const data = await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return data;
  //? select * from users;
};

const getUserById = async(id) => {
  
  const data = await Users.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
  //? select * from users where id = ${id};
};

const createUser = async(data) => {
  const newUser =  await Users.create({
    id: uuid.v4(), 
    firstName: data.first_name, 
    lastName: data.last_name, 
    email: data.email, 
    password: hashPassword(data.password), 
    phone: data.phone, 
    birthdayDate: data.birthday_date,
    role: "normal", 
    profileImage: data.profile_image,
    country: data.country,
    status: 'active',
    verified: false,
  })
  // const newUserWithSpreadOperator =  await Users.create({
  //   ...data,
  //   id: uuid.v4(), 
  //   password: hashPassword(data.password), 
  //   role: "normal", 
  //   is_active: true,
  //   verified: false,
  // })
  return newUser

};

const editUser = (id, data, userRol) => {
  const index = userDB.findIndex((user) => user.id === id);
  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone, //unico
      birthday_date: data.birthday_date,
      rol: userRol === 'admin' ? data.rol : 'normal',
      profile_image: data.profile_image,
      country: data.country,
      is_active: data.is_active,
      verified: false,
    };
    return userDB[index];
  } else {
    return createUser(data);
  }
};


const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })
  return data
}

const getUserByEmail = (email) => {
  const data = userDB.filter((item) => item.email === email);
  return data.length ? data[0] : false
  //? select * from users where email = ${email};
}

const editProfileImg = (userID, imgUrl) => {
  const index = userDB.findIndex(user => user.id === userID)
  if(index !== -1){
    userDB[index].profile_image = imgUrl
    return userDB[index]
  }
  return false
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg
}
*/