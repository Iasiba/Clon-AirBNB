const placeControllers = require("./places.controllers");

const getAll = (req, res) => {
  placeControllers
    .getAllPlaces()
    .then((response) => {
      res.status(200).json({ items: response.length, places: response });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const createPlace = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.city ||
    !data.state ||
    !data.country ||
    !data.continent
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
        city: 'Guadalajara',
        state: 'Jalisco',
        country: 'México',
        continent: 'America'
      },
    });
  } else {

    placeControllers.createPlace(data)
      .then((response) => {
        res.status(201).json({
          message: `User created succesfully with id: ${response.id}`,
          place: response,
        });
      })
      .catch(err => {
        res.status(400).json({ message: err.errors[0].message })
      })
  }
};

const getByPlace = (req, res) => {
  const place = req.params.place;
  placeControllers
    .getByPlace(place)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `place ${place} not exist` });
    });
}

const getById = (req, res) => {
  const id = req.params.id;
  placeControllers
    .getPlaceById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `place with id ${id} not exist` });
    });
}

const remove = (req, res) => {
  const id = req.params.id;
  placeControllers.deletePlace(id)
    .then((response) => {
      if (response) {
        res.status(204).json({message: "deleted succesfully"})
      } else {
        res.status(400).json({
          message: 'Invalid ID'
        })
      }
    })
}

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "Missing Data and All fields must be completed",
      fields: {
        id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
        city: 'Guadalajara',
        state: 'Jalisco',
        country: 'México',
        continent: 'America'
      }
    });
  } else {
    placeControllers.editPlace(id, data, data.role)//, req.user.rol
      .then((response) => {
        res.status(200).json({
          message: 'Place edited succesfully',
          user: response
        })
      })
      .catch((err) => {
        res.status(400).json({ message: err.errors[0].message })
      })
  }
}

module.exports = {
  getAll,
  createPlace,
  getByPlace,
  getById,
  remove,
  edit
};
