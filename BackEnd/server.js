const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Car = require('./models/Car');

const app = express();

mongoose.connect("mongodb://localhost/techcars");

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/get/cars', (req,res) => {

    Car.distinct("carname",(err,cars) => {

        console.log(cars.length);
        if(err){
            res.status(500);
            res.send({"message" : "App Error"});
        }else if(cars.length > 0){
            console.log(cars);
            res.status(200);
            res.send(cars);
        }else{
            res.status(204);
            res.send({"message" : "No models"});
        }

    });

});

app.get('/get/models/:carname',(req,res) => {
    let params = req.params;
    console.log(params);
    
    Car.distict("modelname", {"carname" :params.carname}, (err,models) => {
        console.log(models.length);
        if(err){
            res.status(500);
            res.send({"message" : "App Error"});
        }else if(models.length > 0){
            console.log(models);
            res.status(200);
            res.send(models);
        }else{
            res.status(204);
            res.send({"message" : "No models"});
        }
        
    })

});


app.post('/save/car/details', (req,res) => {
    console.log(req.body);
    let newCar = new Car({
        carname : req.body.carname,
        modelname : req.body.modelname,
        carimageurl : req.body.carimageurl
    });

    newCar.save((err) => {
        if(err){
            res.status(500);
            res.send({message : "Server Error"});
        }else{
            res.status(200);
            res.send({message : "Data saved"});
        }
    })
});

app.listen(3000, () => {
    console.log("Server running at port 3000");
});