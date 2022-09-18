const reservationControllers = require("./reservations.controllers");

const getAll = (req, res) => {
  reservationControllers.getAll()
    .then((response) => {
      res.status(200).json({ items: response.length, reservations: response });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  reservationControllers.getById(id,req.user.id,req.user.rol)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `reservation with id ${id} not exist` });
    });
}

const create = (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.arrival ||
    !data.departure ||
    !data.acomodationId ||
    !data.adults ||
    !data.kids ||
    !data.babies ||
    !data.pets
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        arrival: "arrival",
        departure: "departure",
        acomodationId: "acomodationId",
        adults: "adults",
        kids: "kids",
        babies: "babies",
        pets: "pets",
        score: "score",
        is_finished: false,
        is_canceled: false
      },
    });
  } else {
    reservationControllers.create(userId, data)
      .then((response) => {
        res.status(201).json({
          message: `Reservation created succesfully with id: ${response.id}`,
          reservation: response,
        });
      })
      .catch(err => {
        res.status(400).json({ message: err.errors[0].message })
      })
  }

};

const remove = (req, res) => {
  const id = req.params.id;
  reservationControllers.deleteReservation(id, req.user.id, req.user.rol)
    .then((response) => {
      if (response) {
        res.status(204).json()
      } else {
        res.status(400).json({
          message: 'Invalid ID'
        })
      }
    })
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(req.user)
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else {
    reservationControllers.edit(id, req.user.id, data, req.user.rol)
      .then((response) => {
        res.status(200).json({
          message: 'Reservation edited succesfully',
          reservation: response
        })
      })
      .catch((err) => {
        res.status(400).json({ message: err.errors[0].message })
      })
  }
}

const getReservationsByAccommodation = (req, res) => {
  const AccommodationId= req.params.id
  reservationControllers.getReservationsByAccommodation(AccommodationId,req.user.id,req.user.rol)
  .then((response) => {
    res.status(200).json({ items: response.length, reservations: response });
  })
  .catch((err) => {
    res.status(400).json(err);
  });
}

module.exports = {
  getAll,
  create,
  getById,
  remove,
  edit,
  getReservationsByAccommodation
};
