const Users = require('./user.model')
const Roles = require('./roles.model')

const Reservations = require('./reservations.model')
const Acomodations = require('./acomodations.model')

const Users_images = require('./users.images')

const Acomodation_images = require('./acomodations.images.models')
const Places = require('./places.model')
const reservations = require('./reservations.model')
const acomodations = require('./acomodations.model')

const initModels = () => {
    //? Users <- Roles 
    
    Users.belongsTo(Roles);
    //-Roles.hasOne(Users);
    Roles.hasMany(Users);
    //Roles.hasMany(Users, { foreignKey: { name: "role_id", allowNull: false }});
 
    //? Users -> Users_images
    Users_images.belongsTo(Users);
    Users.hasMany(Users_images);

    Users.belongsTo(Reservations);/// estas relaciones estan mal pero asi me funciona todas las funciones 
    Reservations.hasMany(Users);  /// reseervacion edit admin y host si funcionan
    Acomodations.belongsTo(Reservations);// como invitado no jala
    Reservations.hasMany(Acomodations);
/*
    Reservations.belongsTo(Users);  // estas relaciones estan bien pero nno me funcionan las relaciones anteriores
    Users.hasMany(Reservations);    // solo funcionan como admin y no como invitado o host
    Reservations.belongsTo(Acomodations);
    Acomodations.hasMany(Reservations);
    //? Users <-> Accomodations
    Users.belongsToMany(Acomodations, { through: Reservations });
    Acomodations.belongsToMany(Users, { through: Reservations });
    //
    */
    //? Accomodations -> Acommodation_images
    Acomodation_images.belongsTo(Acomodations);
    Acomodations.hasMany(Acomodation_images);

    //? 
    Acomodations.belongsTo(Places);
    Places.hasMany(Acomodations);

    //? User -> Acommodations (Host)
    Users.hasMany(Acomodations)
    Acomodations.belongsTo(Users)

}
module.exports = initModels