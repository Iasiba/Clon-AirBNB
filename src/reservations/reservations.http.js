const reservationControllers = require("./reservations.controllers");

const getAll = (req, res) => {
  reservationControllers
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
  reservationControllers
    .getById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `reservation with id ${id} not exist` });
    });
}

const create = (req, res) => {
  console.log("entro a cgr")
  
  const data = req.body;
  console.log(data)
  const userId = req.user.id;
  console.log(userId)
  
    
  if (!data) {
    return res.status(400).json({ message: "Missing Data"});
  } else if (
    !data.arrival ||
    !data.departure||
    !data.acomodationId||
    !data.adults||
    !data.kids||
    !data.babies||
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
    console.log(userId)
    console.log(userId)
    console.log(userId)
    console.log(userId)
    console.log("tu mama me mima")
    console.log(userId)
    console.log(userId)
    console.log(userId)
    console.log(userId)
    console.log(userId)
    reservationControllers.create(userId, data)
      .then((response) => {
        res.status(201).json({
          message: `Reservation created succesfully with id: ${response.id}`,
          reservation: response,
        });
      })
      .catch(err => {
        res.status(400).json({message: err.errors[0].message})
      }) 
  }
  
};

const remove = (req, res) => {
  const id = req.params.id;
  reservationControllers.deleteReservation(id)
    .then((response) => {
      if(response){
        res.status(204).json()
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
  console.log(req.user)
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else {
    console.log("entroooo")
    reservationControllers.edit(id,req.user.id,data)//, req.user.rol)
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
