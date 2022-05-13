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
        required : true
    },
    endDate : {
        type    : String,
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
    licesePlate : {
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
    customer: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
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
        required: true
    }
});

const DriverCarSchema = new mongoose.Schema({
    driver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Driver',
        required: true
    },
    car : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Car',
        required: true
    },
    date : {
        type : String,
        required: true,
        default : Date.now()
    }
});

const RouteSchema = new mongoose.Schema({
    driver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Driver',
        required: true
    },
    car : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Car',
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
        default : Date.now()
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
        default : Date.now()
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

testDB();
