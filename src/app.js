//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);
const path = require('path')
//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const chapterRouter = require("./chapters/chapters.router").router
//const programRouter = require("./programs/programs.router").router
const placeRouter = require("./places/places.router").router
const accommodationsRouter = require("./accommodations/accommodations.router").router
const reservationRouter = require("./reservations/reservations.router").router
const userImageRouter = require("./userImages/userImages.router").router
const accommodationImageRouter=require("./accommodationImages/accommodationImages.router").router
const rolesRouter = require("./Roles/roles.router").router
const defaultData = require ("./utils/defaultData")

const initModels = require('./models/initModels')
//* Configuraciones iniciales

const {db} = require('./utils/database')

//* Configuraciones iniciales
const app = express();

initModels()

db.authenticate()
  .then(() => console.log('Database Authenticated'))
  .catch(err => console.log(err))

  if(process.env.NODE_ENV === 'production'){
    db.sync()
    .then(() => {
      console.log('Database synced')
      defaultData()
    })
    .catch(err => console.log(err))
  } else{
    db.sync({force:true})
    .then(() => {
      console.log('Database synced')
      defaultData()
    })
    .catch(err => console.log(err))
  }
/*
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err))
*/
//? Esta configuracion es para habilitar el req.body
app.use(express.json());



app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/programs",chapterRouter);
//app.use("/api/v1/programss",programRouter);
app.use("/api/v1/places",placeRouter);
app.use("/api/v1/accommodations",accommodationsRouter)
app.use("/api/v1/reservations",reservationRouter)
app.use("/api/v1/userImages",userImageRouter)
app.use("/api/v1/accommodationImages",accommodationImageRouter)
app.use("/api/v1/roles",rolesRouter)


app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app