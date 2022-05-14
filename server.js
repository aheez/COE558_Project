const path = require('path');
const express = require('express');
const { urlencoded } = require('express');
const mongoose = require('mongoose');
// import * as schema from './schemas.mjs';
// const schema = require('./schemas.js');

const app = express();
const port = 3000;

let StaticPath = path.join(__dirname, '/');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(StaticPath));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

const mongoURI = 'mongodb://localhost:27017/';
const dbName = 'COE558_ProjectDB';

mongoose.connect(mongoURI + dbName, { useUnifiedTopology: true, serverSelectionTimeoutMS: 1000 });

// Schemas
const DriverSchema = new mongoose.Schema({
    fname   : {
        type    : String,
        required : true
    },
    lname   : {
        type    : String,
        required : true
    },
    govID   : {
        type    : Number,
        required : true,
        unique  : true,
        length  : 10
    },
    Id      : {
        type    : Number,
        required : true,
        unique  : true
    },
    phone   : {
        type    : Number,
        required : true,
        unique  : true,
        length  : 10
    },
    age     : {
        type    : Number,
        required : true,
        min     : 18,
        max     : 60
    },
    address : {
        type    : String,
        required : true
    },
    email   : {
        type    : String,
        required : true,
        unique  : true
    },
    licenseStatus : {
        type    : String,
        required : true,
        enum    : ['Valid', 'Invalid', 'Pending']
    },
    startDate : {
        type    : String,
        default : new Date().toDateString(),
        required : true
    },
    endDate : {
        type    : String,
        default : new Date().toDateString(),
        required : true
    },
    score : {
        type    : Number,
        required : true,
        min     : 0,
        max     : 100
    },
    workStatus : {
        type    : String,
        required : true,
        enum    : ['On Duty', 'Off Duty', 'On Leave', 'On Training', 'On Vacation']
    }
});

const CustomerSchema = new mongoose.Schema({
    fname   : String,
    lname   : String,
    address : String,
    email   : String,
    phone   : Number
});

const CarSchema = new mongoose.Schema({
    licensePlate : {
        type    : String,
        required : true,
        unique  : true
    },
    make : {
        type    : String,
        required : true
    },
    model : {
        type    : String,
        required : true
    },
    year : {
        type    : Number,
        required : true,
        min     : 2011
    },
    carStatus : {
        type    : String,
        required : true,
        enum    : ['Available', 'Unavailable']
    }
});

const PackageSchema = new mongoose.Schema({
    id : {
        type : Number,
        unique : true,
        required : true
    },
    customerPhone: {
        type : String,
        required: true
    },
    location_x : {
        type : Number,
        required: true
    },
    location_y : {
        type : Number,
        required: true
    },
    packageStatus : {
        type : String,
        enum : ['Pending', 'Delivered', 'In Transit', 'Cancelled'],
        required: true
    },
    priority : {
        type : String,
        required: true,
        enum : ['High', 'Medium', 'Low'],
        default : 'Low'
    },
    deliveryDate : {
        type : String,
        default : new Date().toISOString(),
        required: true
    }
});

const DriverCarSchema = new mongoose.Schema({
    driver : {
        // type : mongoose.Schema.Types.ObjectId,
        type : Number,
        ref : 'Driver ID',
        required: true
    },
    car : {
        // type : mongoose.Schema.Types.ObjectId,
        type : String,
        ref : 'Car License Plate',
        required: true
    },
    date : {
        type : String,
        required: true,
        default : new Date().toISOString()
    }
});

const RouteSchema = new mongoose.Schema({
    driver : {
        type : Number,
        ref : 'Driver ID',
        required: true
    },
    car : {
        type : String,
        ref : 'Car License Plate',
        required: true
    },
    packages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Package',
        required: true
    }],
    date : {
        type : String,
        required: true,
        default : new Date().toISOString()
    }
});

const WarningSchema = new mongoose.Schema({
    severity : {
        type : String,
        required: true,
        enum : ['Critical','High', 'Medium', 'Low'],
        default : 'Low'
    },
    message : {
        type : String,
        length : 255,
        required: true
    },
    date : {
        type : String,
        required: true,
        default : new Date().toISOString()
    }
});

// init collections
const Driver = mongoose.model('Driver', DriverSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const Car = mongoose.model('Car', CarSchema);
const Package = mongoose.model('Package', PackageSchema);
const DriverCar = mongoose.model('DriverCar', DriverCarSchema);
const Route = mongoose.model('Route', RouteSchema);
const Warning = mongoose.model('Warning', WarningSchema);

console.log(`Connecting to MongoDB ...`);

function testDB() {
    console.log(`Testing DB ...`);
    let dbEntry = new Driver({
        fname : 'John',
        lname : 'Doe',
        govID : 123456789,
        Id : 1,
        phone : 1234567890,
        age : 20,
        address : '123 Main St',
        email : 'test',
        licenseStatus : 'Valid',
        startDate : '01/01/2020',
        endDate : '01/01/2021',
        score : 100,
        workStatus : 'On Duty'
    });
    dbEntry.save((err, data) => {
        if (err) {
            console.log(`Error: ${err}`);
        } else {
            console.log(`Data: ${data}`);
        }
    }
    );
}

// APIs

app.get('/api/warnings', (req, res) => {
    Warning.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // res.send(data);
            // console.log(data);
            res.send(response = data.map(warning => {
                return {
                    severity : warning.severity,
                    message : warning.message,
                    date :  warning.date
                }
           }));
        }
    });
});

// raise warning
app.post('/api/warnings', (req, res) => {
    let warning = new Warning({
        severity : req.body.severity,
        message : req.body.message
    });
    warning.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Warning raised'});
        }
    });
});

// get all drivers
app.get('/api/drivers', (req, res) => {
    Driver.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

// register DriverCar
app.post('/api/driverCar', (req, res) => {
    let driverCar = new DriverCar({
        driver : req.body.driver,
        car : req.body.car
    });
    driverCar.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'DriverCar registered'});
        }
    });
});

// update drivercar
app.put('/api/driverCar', (req, res) => {
    DriverCar.findOneAndUpdate({driver : req.body.driver, car : req.body.car}, {$set : {date : req.body.date}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'DriverCar updated'});
        }
    });
});

// register driver
app.post('/api/drivers', (req, res) => {
    let driver = new Driver({
        fname : req.body.fname,
        lname : req.body.lname,
        govID : req.body.govID,
        Id : req.body.id,
        phone : req.body.phone,
        age : req.body.age,
        address : req.body.address,
        email : req.body.email,
        licenseStatus : req.body.licenseStatus,
        startDate : req.body.startDate,
        endDate : req.body.endDate,
        score : req.body.score,
        workStatus : req.body.workStatus
    });
    driver.save((err, data) => {
        if (err) {
            console.log(req.body);
            res.status(500).send(err);
        } else {
            res.json({'message': 'Driver registered'});
        }
    });
});

// register car
app.post('/api/cars', (req, res) => {
    let car = new Car({
        licensePlate : req.body.licensePlate,
        make : req.body.make,
        model : req.body.model,
        year : req.body.year,
        carStatus: req.body.status
    });
    car.save((err, data) => {
        if (err) {
            console.log(req.body);
            console.log(car)
            res.status(500).send(err);
        } else {
            res.json({'message': 'Car registered'});
        }
    });
});

// get all cars
app.get('/api/cars', (req, res) => {
    Car.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

// register customer
app.post('/api/customers', (req, res) => {
    let customer = new Customer({
        fname : req.body.fname,
        lname : req.body.lname,
        address : req.body.address,
        phone : req.body.phone,
        email : req.body.email
    });
    customer.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Customer registered'});
        }
    });
});


//link packages to customer id
app.post('/api/packages', (req, res) => {
    let pkg = new Package({
        id : req.body.id,
        customerPhone : req.body.customerPhone,
        location_x : req.body.location_x,
        location_y : req.body.location_y,
        priority : req.body.priority,
        deliveryDate : req.body.deliveryDate,
        packageStatus: req.body.status
    });
    console.log(pkg);
    pkg.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Package registered'});
        }
    });
});


// get all packages
app.get('/api/packages', (req, res) => {
    Package.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

// get a single customer by phone number
app.get('/api/customers', (req, res) => {
    Customer.findOne({phone: parseInt(req.body.phone)}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    });
});

// sync function get customer 
function getCustomer_idByPhone(phone) {
    cust_id = Customer.findOne({phone: phone})
    Customer.findOne({phone: parseInt(phone)}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            return data._id;
        }
    });
}

// function getCustomer_idByPhone (phone)  {
//     return new Promise((resolve, reject) => {
//         Customer.findOne({phone: parseInt(phone)}, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

app.get('/api/test', (req, res) => {
    getCustomer_idByPhone(req.body.phone).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    });
});

// update driver score
app.put('/api/drivers', (req, res) => {
    Driver.findOneAndUpdate({Id : req.body.id}, {$set : {score : req.body.score}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Driver updated'});
        }
    });
});

// update package status
app.put('/api/packages', (req, res) => {
    Package.findOneAndUpdate({id : req.body.id}, {$set : {packageStatus : req.body.status}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Package updated'});
        }
    });
});

// update driver work status
app.put('/api/drivers', (req, res) => {
    Driver.findOneAndUpdate({Id : req.body.id}, {$set : {workStatus : req.body.status}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Driver updated'});
        }
    });
});

// update car status
app.put('/api/cars', (req, res) => {
    Car.findOneAndUpdate({licensePlate : req.body.licensePlate}, {$set : {carStatus : req.body.status}}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'Car updated'});
        }
    });
});

// post drivercar
app.post('/api/drivercar', (req, res) => {
    let drivercar = new DriverCar({
        driver : req.body.driver,
        car : req.body.car
    });
    drivercar.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({'message': 'DriverCar registered'});
        }
    });
});

// request route
// check if driver is in the database
// if not return error
// check if car is in the database
// if not return error
// set package status to 'In Transit' and delivery date to current date
// arrange packages by priority
// set driver work status to 'On Duty'
// save the route
// return packages (id, location_x, location_y, deliveryDate)

app.get('/api/request-route', (req, res) => {
    driver = Driver.findOne({Id : req.body.driverId});
    car = Car.findOne({licensePlate : req.body.carLicensePlate});

    packages = req.body.packagesId.map((id) => {
        return Package.findOne({id : id})
    });
    if (driver == null) {
        res.status(500).send('Driver not found');
    } else if (car == null) {
        res.status(500).send('Car not found');
    } else {
        packages.foreach((id) => {
            fetch(`http://localhost:3000/api/packages/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    status: 'In Transit',
                    deliveryDate: new Date()
                })
            });
        });
        fetch(`http://localhost:3000/api/drivers/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: driver.Id,
                status: 'On Duty'
            })
        });
        fetch(`http://localhost:3000/api/cars/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                licensePlate: car.licensePlate,
                status: 'Available'
            })
        });
        res.send(packages);
    }

    // arrange packages by priority highest to lowest
    packages.sort((a, b) => {
        return priority2value[b.priority] - priority2value[a.priority];
    });

    // response data is the x, y coordinates of the packages
    responseData = packages.map((id) => {
        return {
            x: packages[id].location_x,
            y: packages[id].location_y
        };
    });
    console.log(responseData);
    let route = new Route({
        driver: driver.Id,
        car: car.licensePlate,
        packages: responseData
    });
    console.log(route);
    route.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        }});
    res.send(responseData);
});

priority2value = {
    'High': 3,
    'Medium': 2,
    'Low': 1
};