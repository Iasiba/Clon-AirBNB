const accommodationImageControllers = require("./accommodationImages.controllers");

const getAll = (req, res) => {
  accommodationImageControllers
    .getAll()
    .then((response) => {
      res.status(200).json({ items: response.length, accommodationImages: response });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  accommodationImageControllers
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
    !data.Name||
    !data.acomodationId
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        url: "url",
        Name: "Name",
        acomodationId: "acomodationId"
      },
    });
  } else {
    accommodationImageControllers.create(data)
      .then((response) => {
        res.status(201).json({
          message: `AccommodationImage created succesfully with id: ${response.id}`,
          accommodationImage: response,
        });
      })
      .catch(err => {
        res.status(400).json({message: err.errors[0].message})
      }) 
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  accommodationImageControllers.deleteAccommodationImages(id)
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
    accommodationImageControllers.edit(id, data, req.user.rol)
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
