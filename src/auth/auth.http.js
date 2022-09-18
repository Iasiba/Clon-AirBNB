const jwt = require("jsonwebtoken");
const users = require("../models/user.model")
const { loginUser } = require("./auth.controllers");

const login = async (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({ message: "Missing Data" });
  }
  ///
  let rol
  const user = await users.findOne(
    { where: { email: data.email } }
  )
  .then((response) => {
      rol = response.roleId/*req.user.rol*/
      loginUser(data.email, data.password)
        .then((response) => {
          if (response) {
            const token = jwt.sign(
              {
                id: response.id,
                email: response.email,
                rol: rol,//response.rol
              },
              "academlo"
            )
            return res
              .status(200)
              .json({ message: "Tus credenciales son correctas", token });
          } else {
            return res.status(401).json({ message: "Invalid Credentials" });
          }
          console.log(rol)
        })
        .catch(() => {
          return res.status(401).json({ message: "Invalid Credentials" });
        });


    })
    .catch(() => res.status(401).json({ status: 'error', message: 'User not not found' }))











  /////




};

module.exports = {
  login,
};