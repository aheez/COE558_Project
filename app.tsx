import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import * as styles from './styles';
import * as data from './DataTypes';

// Homepage
class Home extends React.Component <any, any> {

    defaultWarning : data.Warning = {
        severity: data.WarningSeverity.low,
        message: "This is a default warning message",
        date: "01/01/2018"
    }

    getWarning() {
        let newData : data.Warning [];
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/warnings', request).
        then(response => response.json()).
        then(data => {
            newData = data.map(this.formatData);
            console.log(data.map(this.formatData));
            // newData = data;
            // console.log(newData);
        }).catch(err => console.log(err));
        this.setState(newData);
        console.log(`length of state = ${this.state.length}`);
        // console.log(`length of data = ${newData}`);
        // return newData;
    }

    // Format the response of getWarning to data.Warning type
    formatData(wdata: any) {
        let newData: data.Warning;
        newData = {
            severity: data.convertWarnToEnum(wdata.severity),
            message: wdata.message,
            date: wdata.date
        }
        return newData;
    }
    
    
    constructor(props: any) {
        super(props);
        this.getWarning = this.getWarning.bind(this);
        this.state = [];
        // this.state = this.getWarning();
    }

    // componentDidMount() {
    //     this.setState(this.getWarning());
    // }

    render() {
        if (this.state.length > 0) {
            return (
                <div>
                    <h1 style={styles.h1Styles}>Home</h1>
                    <h2 style={styles.h2Styles}>Warnings</h2>
                    <h2 style={styles.h2Styles}>{this.state[0].message}</h2>
                    <table style={styles.tableStyles}>
                        <thead>
                            <tr style={styles.trStyles}>
                                <th>Severity</th>
                                <th>Message</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.map((warning: data.Warning) => {
                                return (
                                    <tr style={styles.trStyles}>
                                        <td>{warning.severity}</td>
                                        <td>{warning.message}</td>
                                        <td>{warning.date}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    <form style={styles.formStyle}>
                        <button style={styles.buttonStyles} onClick={this.getWarning}>Get Warnings</button>
                    </form>
                </div>
            );
        } 
        else {
            console.log(this.state.length)
            return (
                <div>
                    <h1 style={styles.h1Styles}>Home</h1>
                    <h2 style={styles.h2Styles}>Warnings</h2>
                    <p style={styles.pStyles}>No warnings found</p>
                    <form style={styles.formStyle}>
                        <button style={styles.buttonStyles} onClick={this.getWarning}>Get Warnings</button>
                    </form>
                </div>
            );
            }
        }
}

// Car-Driver Allocation Page
class CarDriverAllocation extends React.Component <any, any> {

    defaultCar: data.Car = {
        licensePlate: "KKD 1234",
        make: "Toyota",
        model: "Corolla",
        year: 2019,
        status: data.CarStatus.available
    };
    defaultDriver: data.Driver = {
        fname: "John",
        lname: "Doe",
        govID: 123456789,
        id: 1,
        phone: 1234567890,
        age: 30,
        address: "123 Main St",
        email: "test.tests@test.com",
        licenseStatus: data.LicenseStatus.valid,
        startingDate: "2019-01-01",
        endDate: "2019-12-31",
        score: 0,
        workStatus: data.WorkStatus.OnDuty
    };

    formatData(dcData: [data.Driver, data.Car]) {
        let data = [
            dcData[0].fname,
            dcData[0].lname,
            dcData[0].licenseStatus,
            dcData[0].workStatus,
            dcData[1].licensePlate,
            dcData[1].make,
            dcData[1].model
        ];
        console.log(data);
        return data;
    }

    getData() {
        let newData : [[data.Driver, data.Car]];
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ''
        };
        fetch('/api/allocatedCars', request).
        then(response => response.json()).
        then(data => {
            // TODO: 
            // console.log(data);
            newData = data;
        }).catch(err => console.log(err));

        return newData;
    }

    constructor(props: any) {
        super(props);
        this.formatData = this.formatData.bind(this);
        this.state = this.formatData([this.defaultDriver, this.defaultCar]);
        // this.state = map(this.getData(), this.formatData);
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>Car-Driver Allocation</h1>

                <div>
                    <table style={styles.tableStyles}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Driving License Status</th>
                                <th>Work Status</th>
                                <th>License Plate</th>
                                <th>Make</th>
                                <th>Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.map((data) => {
                                return (
                                    <tr key={data} style={styles.trStyles}>
                                        <td>{data[0]}</td>
                                        <td>{data[1]}</td>
                                        <td>{data[2]}</td>
                                        <td>{data[3]}</td>
                                        <td>{data[4]}</td>
                                        <td>{data[5]}</td>
                                        <td>{data[6]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// Cars Page
class Cars extends React.Component <any, data.Car []> {

    defaultCar: data.Car = {
        licensePlate: "DKD 1111",
        make: "Toyota",
        model: "Corolla",
        year: 0,
        status: data.CarStatus.available
    }
    constructor(props) {
        super(props);
        this.getCars = this.getCars.bind(this);
        this.state = [this.defaultCar];
        // this.state = this.getCars();
    }

    getCars() {
        let newData : data.Car [];
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ''
        };
        // fetch('/api/cars').catch(err => console.log(err));
        fetch('/api/cars', request).
        then(response => response.json()).
        then(data => {
            newData = data;
        }).catch(err => console.log(err));
        return newData;
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>SDS Cars</h1>

                <table style={styles.tableStyles}>
                    <thead>
                        <tr>
                            <th>License Plate</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.map((car: data.Car) => {
                            return (
                                <tr key={car.licensePlate} style={styles.trStyles}>
                                    <td>{car.licensePlate}</td>
                                    <td>{car.make}</td>
                                    <td>{car.model}</td>
                                    <td>{car.year}</td>
                                    <td>{car.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

// Drivers Profiles Page
class DriversProfiles extends React.Component <any, data.Driver []> {

    defaultDriver: data.Driver = {
        fname: "John",
        lname: "Doe",
        govID: 123456789,
        id: 0,
        phone: 1234567890,
        age: 0,
        address: "123 Main St",
        email: "john@doe.com",
        licenseStatus: data.LicenseStatus.valid,
        startingDate: "01/01/2020",
        endDate: "01/01/2020",
        score: 0,
        workStatus: data.WorkStatus.OnDuty
    }

    constructor(props) {
        super(props);
        this.getDrivers = this.getDrivers.bind(this);
        this.state = [];
        // this.state = this.getDrivers();
    }

    getDrivers() {
        let newData : data.Driver [];
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ''
        }
        fetch('/api/drivers').then(res => res.json()).then(data => {
            // this.setState(data);
            newData = data;
        }).catch(err => console.log(err));
        return newData;
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>SDS Drivers</h1>
                <div>
                    <table style={styles.tableStyles}>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Score</th>
                                <th>Work Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.map((driver: data.Driver, index) => {
                                return (
                                    <tr key={driver.id} style={styles.trStyles}>
                                        <td>{driver.fname}</td>
                                        <td>{driver.lname}</td>
                                        <td>{driver.score}</td>
                                        <td>{driver.workStatus}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// Packages Page
class Packages extends React.Component <any, data.Package[]> {

    deafultCustomer: data.Customer = {
        fname: "John",
        lname: "Doe",
        address: "123 Main St",
        email: "tests@test.com",
        phone: 1234567890
    }

    defaultPackage: data.Package = {
        id: 0,
        customer: this.deafultCustomer,
        status: data.PackageStatus.delivered,
        priority: data.PackagePriority.medium,
        location_x: 0,
        location_y: 0,
        deliveryDate: "01/01/2020"
    }
    constructor(props) {
        super(props);
        this.getPackages = this.getPackages.bind(this);
        // TODO: Get packages from server
        this.state = [this.defaultPackage];
        // this.state = this.getPackages();
    }
    
    getPackages() {

        let newData : data.Package [];
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ''
        }

        fetch('/api/packages', request).
        then(response => response.json()).
        then(data => {
            newData = data;
            // this.setState(data);
        }
        ).catch(err => console.log(err));

        return newData;
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>Packages</h1>
                <div>
                    <table style={styles.tableStyles}>
                        <thead>
                            <tr>
                                <th>Package ID</th>
                                <th>Customer Name</th>
                                <th>Customer Number</th>
                                <th>Package Status</th>
                                <th>Delivery Date</th>
                                <th>Package Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.map((pkg: data.Package, index) => {
                                return (
                                    <tr key={pkg.id} style={styles.trStyles}>
                                        <td>{pkg.id}</td>
                                        <td>{pkg.customer.fname}</td>
                                        <td>{pkg.customer.phone}</td>
                                        <td>{pkg.status}</td>
                                        <td>{pkg.deliveryDate}</td>
                                        <td>{pkg.priority}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

// register driver page
class RegisterDriver extends React.Component <any, any> {

    constructor(props) {
        super(props);
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let driver: data.Driver = {
            fname: event.target.fname.value,
            lname: event.target.lname.value,
            govID: event.target.govID.value,
            id: event.target.id.value,
            phone: event.target.phone.value,
            age: event.target.age.value,
            address: event.target.address.value,
            email: event.target.email.value,
            licenseStatus: data.LicenseStatus.valid,
            startingDate: new Date().toISOString().substring(0, 10),
            endDate: new Date().toISOString().substring(0, 10),
            score: event.target.score.value,
            workStatus: data.WorkStatus.OnDuty
        }
        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(driver)
        }
        fetch('/api/drivers', request).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }


    render () {
        return (
            <div>
                <h1 style={styles.h1Styles}>Register Driver</h1>
                <form style={styles.formStyle} onSubmit={this.handleSubmit} >
                    <div>
                        <label>First Name</label>
                        <input type="text" name="fname" placeholder="John" />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lname" placeholder="Doe" />
                    </div>
                    <div>
                        <label>Government ID</label>
                        <input type="text" name="govID" placeholder="123456789" />
                    </div>
                    <div>
                        <label>ID</label>
                        <input type="text" name="id" placeholder="123456789" />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input type="text" name="phone" placeholder="1234567890" />
                    </div>
                    <div>
                        <label>Age</label>
                        <input type="text" name="age" placeholder="20" />
                    </div>
                    <div>
                        <label>Address</label>
                        <input type="text" name="address" placeholder="123 Main St" />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" placeholder="" />
                    </div>
                    <div>
                        <label>License Status</label>
                        <select name="licenseStatus">
                            <option value="data.LicenseStatus.valid">Valid</option>
                            <option value="data.LicenseStatus.invalid">Invalid</option>
                            <option value="data.LicenseStatus.pending">Pending</option>
                        </select>
                    </div>
                    <div>
                        <label>Work Status</label>
                        <select name="workStatus">
                            <option value="data.WorkStatus.OnDuty">On Duty</option>
                            <option value="data.WorkStatus.OffDuty">Off Duty</option>
                        </select>
                    </div>
                    <div>
                        <label>Score</label>
                        <input type="text" name="score" placeholder="0" />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        );
    }
}
    

// Driver Info Page
class DriverInfo extends React.Component <any, data.Driver> {

    defaultDriver: data.Driver = {
            fname: "",
            lname: "",
            govID: 0,
            id: 0,
            phone: 0,
            age: 0,
            address: "",
            email: "",
            licenseStatus: data.LicenseStatus.pending,
            startingDate: "",
            endDate: "",
            score: 0,
            workStatus: data.WorkStatus.OffDuty
        };
    constructor(props: any) {
        super(props);
        
        this.state = this.defaultDriver;
        this.getDriver = this.getDriver.bind(this);
    }

    getDriver(event) {
        event.preventDefault();
        let req_id : number = event.target.id.value;

        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: req_id
            })
        };

        fetch('/api/drivers', request).then(res => res.json()).then(data => {
            this.setState(data);
        }).catch(err => console.log(err));

        // console.log(`Driver ID: ${event.target.id.value}`);
    }

    render() {
        if(this.state == this.defaultDriver) {
            return (
                <div>
                    <h1 style={styles.h1Styles}>Driver Info</h1>
                    <h2 style={styles.h2Styles}>No Driver were selected</h2>

                    <form onSubmit={this.getDriver} style={styles.formStyle}>
                        <label>ID:</label>
                        <input type="text" name="id" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
        } else {
            return (
                <div>
                    <h1 style={styles.h1Styles}>{this.state.fname} {this.state.lname}</h1>
                    <div>
                        {/* <img src="./28003-1631171950.webp" alt="driver" style={styles.driverImage} /> */}
                    </div>
                    {/* Print Driver Info */}
                    <div>
                        <table style={styles.tableStyles}>
                            <tr>
                                <td>Govt. ID:</td>
                                <td>{this.state.govID}</td>
                            </tr>
                            <tr>
                                <td>ID:</td>
                                <td>{this.state.id}</td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td>{this.state.age}</td>
                            </tr>
                            <tr>
                                <td>Address:</td>
                                <td>{this.state.address}</td>
                            </tr>
                            <tr>
                                <td>Phone:</td>
                                <td>{this.state.phone}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>License:</td>
                                <td>{this.state.licenseStatus}</td>
                            </tr>
                            <tr>
                                <td>Starting Date:</td>
                                <td>{this.state.startingDate}</td>
                            </tr>
                            <tr>
                                <td>End Date:</td>
                                <td>{this.state.endDate}</td>
                            </tr>
                            <tr>
                                <td>Score:</td>
                                <td>{this.state.score}</td>
                            </tr>
                            <tr>
                                <td>Work Status:</td>
                                <td>{this.state.workStatus}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

// register car page
class RegisterCar extends React.Component <any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {}
        this.registerCar = this.registerCar.bind(this);
    }

    registerCar(event) {
        event.preventDefault();
        let car : data.Car = {
            licensePlate: event.target.licensePlate.value,
            make: event.target.make.value,
            model: event.target.model.value,
            year: event.target.year.value,
            status: data.CarStatus.available
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        };

        console.log(request);

        fetch('/api/cars', request).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>Register Car</h1>
                <form onSubmit={this.registerCar} style={styles.formStyle}>
                    <div>
                        <label>License Plate:</label>
                        <input type="text" name="licensePlate" />
                    </div>
                    <div>
                        <label>Make:</label>
                        <input type="text" name="make" />
                    </div>
                    <div>
                        <label>Model:</label>
                        <input type="text" name="model" />
                    </div>
                    <div>
                        <label>Year:</label>
                        <input type="text" name="year" />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        );
    }
}

// register customer page
class RegisterCustomer extends React.Component <any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {}
        this.registerCustomer = this.registerCustomer.bind(this);
    }

    registerCustomer(event) {
        event.preventDefault();
        let customer : data.Customer = {
            fname: event.target.fname.value,
            lname: event.target.lname.value,
            phone: event.target.phone.value,
            address: event.target.address.value,
            email: event.target.email.value
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        };

        console.log(request);

        fetch('/api/customers', request).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>Register Customer</h1>
                <form onSubmit={this.registerCustomer} style={styles.formStyle}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="fname" />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lname" />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" name="phone" />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input type="text" name="address" />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        );
    }
}

// register package page with customer phone
class RegisterPackage extends React.Component <any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {}
        this.registerPackage = this.registerPackage.bind(this);
    }

    registerPackage(event) {
        event.preventDefault();
        let NewPackage = {
            customerPhone: event.target.customerPhone.value,
            id : event.target.id.value,
            location_x: event.target.location_x.value,
            location_y: event.target.location_y.value,
            status: data.PackageStatus.pending,
            priority: event.target.priority.value,
            deliveryDate: event.target.delivDate.value
        }

        let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NewPackage)
        };

        console.log(request);

        fetch('/api/packages', request).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>Register Package</h1>
                <form onSubmit={this.registerPackage} style={styles.formStyle}>
                    <div>
                        <label>Customer Phone:</label>
                        <input type="text" name="customerPhone" />
                    </div>
                    <div>
                        <label>Package ID:</label>
                        <input type="text" name="id" />
                    </div>
                    <div>
                        <label>Location X:</label>
                        <input type="text" name="location_x" />
                    </div>
                    <div>
                        <label>Location Y:</label>
                        <input type="text" name="location_y" />
                    </div>
                    <div>
                        <label>Priority:</label>
                        <select name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label>Delivery Date:</label>
                        <input type="text" name="delivDate" />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        );
    }
}


// App Class
class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul style={styles.navBarStyles}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/car-driver-allocation">Car-Driver Allocation</Link></li>
                        <li><Link to="/packages">Packages</Link></li>
                        <li><Link to="/drivers-profiles">SDS Drivers</Link></li>
                        <li><Link to="/cars">Cars</Link></li>
                        <li><Link to="/driver-info">Driver Info</Link></li>
                        <li><Link to="/register-driver">Register Driver</Link></li>
                        <li><Link to="/register-car">Register Car</Link></li>
                        <li><Link to="/register-customer">Register Customer</Link></li>
                        <li><Link to="/register-package">Register Package</Link></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/car-driver-allocation" component={CarDriverAllocation} />
                    <Route path="/packages" component={Packages} />
                    <Route path="/drivers-profiles" component={DriversProfiles} />
                    <Route path="/cars" component={Cars} />
                    <Route path="/driver-info" component={DriverInfo} />
                    <Route path="/register-driver" component={RegisterDriver} />
                    <Route path="/register-car" component={RegisterCar} />
                    <Route path="/register-customer" component={RegisterCustomer} />
                    <Route path="/register-package" component={RegisterPackage} />
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));