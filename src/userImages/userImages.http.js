const userImagesControllers = require("./userImages.controllers");

const getAll = (req, res) => {
  userImagesControllers
    .getAll()
    .then((response) => {
      res.status(200).json({ items: response.length, users: response });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  userImagesControllers
    .getById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `reservation with id ${id} not exist` });
    });
}

const create = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data"});
  } else if (
    !data.url||
    !data.userId 
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        url: "url",
        userId: "userId"
      },
    });
  } else {
    userImagesControllers.create(data)
      .then((response) => {
        res.status(201).json({
          message: `userImage created succesfully with id: ${response.id}`,
          user: response,
        });
      })
      .catch(err => {
        res.status(400).json({message: err.errors[0].message})
      }) 
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userImagesControllers.deleteuserImages(id)
    .then((response) => {
      if(response){
        res.status(204).json({message:response})
      }else{
        res.status(400).json({
          message: 'Invalid ID'
        })
      }
    })
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else {
    userImagesControllers.edit(id, data, req.user.rol)
      .then((response) => {
        res.status(200).json({
          message: 'Reservation edited succesfully',
          user: response
        })
      })
      .catch((err) => {
        res.status(400).json({message: err.errors[0].message})
      })
  }
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  edit
};
