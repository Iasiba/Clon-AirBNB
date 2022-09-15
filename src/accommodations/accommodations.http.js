const { UUID } = require('sequelize')
const accommodationControllers = require('./accommodations.controllers')

const getAll = (req, res) => {
    accommodationControllers.getAllAccommodations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
const getById = (req, res) => {
    const id = req.params.id;
    accommodationControllers
        .getAccommodationById(id)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json({ message: `accommodation with id ${id} not exist` });
        });
}

const createAccommodation = (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ message: "Missing Data" });
    } else if (
        !data.title ||
        !data.description ||
        !data.guests ||
        !data.rooms ||
        !data.beds ||
        !data.bathrooms ||
        !data.price ||
        !data.hostId ||
        !data.userId ||
        !data.placeId ||
        !data.commision
    ) {
        return res.status(400).json({
            message: "All fields must be completed",
            fields: {
                "title": "title",
                "description": "description",
                "guests": 5,
                "rooms": 5,
                "beds": 4,
                "bathrooms": 3,
                "price": 8,
                "hostId": "ba0495ea-460a-4d48-9ddb-34eab4734c45",
                "userId": "ba0495ea-460a-4d48-9ddb-34eab4734c45",
                "score": 3,
                "placeId": "ba0495ea-460a-4d48-9ddb-34eab4734c45",
                "commision": 3
            },
        });
    } else {
        accommodationControllers.createAccommodation(data)
        .then((response) => {
            res.status(201).json({
                message: `Accommodation created succesfully with id: ${response.id}`,
                Accommodation: response,
            });
        })
        .catch(err => {
            res.status(400).json({ message: err.errors[0].message })
        })
    } 
}

const editAccommodation = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (!Object.keys(data).length) {
        return res.status(400).json({
            message: "Missing Data and All fields must be completed",
            fields: {
                "title": "title",
                "description": "description",
                "guests": 5,
                "rooms": 5,
                "beds": 4,
                "bathrooms": 3,
                "price": 8,
                "hostId": "ba0495ea-460a-4d48-9ddb-34eab4734c45",
                "userId": "ba0495ea-460a-4d48-9ddb-34eab4734c45",
                "score": 3,
                "placeId": "ba0495ea-460a-4d48-9ddb-34eab4734c45",
                "commision": 3
            }
        });
    } else {
        accommodationControllers.editAccommodation(id, data, data.role, "UUID HOST")//, req.user.rol
            .then((response) => {
                res.status(200).json({
                    message: 'Accommodation edited succesfully',
                    user: response
                })
            })
            .catch((err) => {
                res.status(400).json({ message: err.errors[0].message })
            })
    }
}
const deleteAccommodation = (req, res) => {
    const id = req.params.id;
    accommodationControllers.deleteAccommodation(id)
        .then((response) => {
            if (response) {
                res.status(204).json()
            } else {
                res.status(400).json({
                    message: 'Invalid ID'
                })
            }
        })
}

module.exports = {
    getAll,
    getById,
    createAccommodation,
    editAccommodation,
    deleteAccommodation
}


