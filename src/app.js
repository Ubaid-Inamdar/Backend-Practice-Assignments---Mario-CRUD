const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get("/mario", (req, res) => {
    marioModel.find().then((data) => res.json(data)).catch((error) => {
        res.status(400).json({"message": error.message});
    });
});

app.get("/mario/:id",(req, res) => {
    marioModel.findById(req.params.id).then((data) => {
        res.json(data);
    }).catch((error) => {
        res.status(400).json({"message": error.message});
    });
});

app.post("/mario", (req, res) => {
    let newMario = new marioModel ({
        name : req.body.name,
        weight: req.body.weight
    }) 
    newMario.save().then((data) => {
        res.status(201).json(data);
    }).catch((error) => {
        res.status(400).json({"message": 'either name or weight is missing' })
    })
});

app.patch("/mario/:id", (req, res) => {
    marioModel.findByIdANDUpdate(req.params.id, rq.body, {new:true})
    .then(data => res.status(200).json(data))
    .catch(error => res.status(400).json({"message": error.message}))
})

app.delete("/mario/:id", (req, res) => {
    marioModel.delete({_id: rq.params.id}).then(data => {
        return res.status(200).send({"message": 'character deleted'})
    }).catch(error => res.status(400).json({"message": error.message}))
})




module.exports = app;
