//Student Name: Zhouxuan He
//Student Id: 301120369
//program: COMP229 sec.003
//Web App: Car Website

// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
// LIST PAGE
module.exports.carList = function(req, res, next) {  
    CarModel.find((err, carsList) => {
        //console.log(carList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('cars/list', {
                title: 'Cars List', 
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a car by id and renders the details page.
// DETAILS PAGE
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('cars/details', {
                title: 'Car Details', 
                car: carToShow,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
// 2.a) ADD PAGE
module.exports.displayAddPage = (req, res, next) => {
    
    res.render('cars/add_edit', {
        "title": "Add Car",
        car: {
            "make": "",
            "model": "",
            "year": null,
            "kilometers": null,
            "doors": null,
            "seats": null,
            "color": "",
            "price": null,
        },
        userName: req.user ? req.user.username : ''
    })      

}

// Processes the data submitted from the Add form to create a new car
// ADDED THEN RETURN TO DETAIL PAGE
module.exports.processAddPage = (req, res, next) => {
    //Object of details of new Added car
    let thisCar = {
        "make": req.body.make,
        "model": req.body.model,
        "year": req.body.year,
        "kilometers": req.body.kilometers,
        "doors": req.body.doors,
        "seats": req.body.seats,
        "color": req.body.color,
        "price": req.body.price
    }

    //Create method to add it to DB
    CarModel.create(thisCar, (err, doc) =>{
        if(err) console.log(err);
        else console.log(doc);
    })

    //Return to Car Details Page
    res.render('cars/details', {
    title: 'Car Added', 
    car: thisCar,
    userName: req.user ? req.user.username : ''
});

}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
//2.c)
// EDIT PAGE
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    //Find detials of current car by id
    CarModel.findById(id, (err, carToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('cars/add_edit', {
                title: 'Edit Car', 
                car: carToShow,
                userName: req.user ? req.user.username : ''
            })
        }
    });

}

// Processes the data submitted from the Edit form to update a car
// 2.d)
// EDITED THEN RETURN TO DETAIL PAGE
module.exports.processEditPage = (req, res, next) => {
    //get car id
    let id = req.params.id;
    //create object of details of edited car
    let thisCar = {
        "make": req.body.make,
        "model": req.body.model,
        "year": req.body.year,
        "kilometers": req.body.kilometers,
        "doors": req.body.doors,
        "seats": req.body.seats,
        "color": req.body.color,
        "price": req.body.price
    };
    //Update by id on mongoDB
    CarModel.collection.updateOne({_id: require("mongodb").ObjectId(id)}, {$set:thisCar}, {upsert: false});
    
    //Return to details view
    res.render('cars/details', {
        title: 'Car Edited', 
        car: thisCar,
        userName: req.user ? req.user.username : ''
    });  
    
}

// Deletes a car based on its id.
// 2.e)
// DETELE THEN RETURN TO LIST PAGE
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    //delete by id
    CarModel.collection.deleteOne({_id: require("mongodb").ObjectId(id)});

    //Return to Car List Page
    CarModel.find((err, carsList) => {
        // console.log(carsList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('cars/list', {
                title: 'Car List', 
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });

}