import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import * as styles from './styles';
import * as data from './DataTypes';

// Homepage
class Home extends React.Component <any, data.Warning []> {

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
            },
            body : ''
        }
        fetch('/api/warnings', request).
        then(response => response.json()).
        then(data => {
            newData = data;
        }).catch(err => console.log(err));
    }
    
    constructor(props: any) {
        super(props);
        this.getWarning = this.getWarning.bind(this);
        this.state = [this.defaultWarning];
        // this.state = this.getWarning();
    }

    render() {
        return (
            <div>
                <h1 style={styles.h1Styles}>Home</h1>
                <h2 style={styles.h2Styles}>Warnings</h2>
                <table style={styles.tableStyles}>
                    <thead>
                        <tr style={styles.trStyles}>
                            <th>Severity</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.map((warning: data.Warning, index: number) => {
                            return (
                                <tr style={styles.trStyles} key={index}>
                                    <td>{warning.severity}</td>
                                    <td>{warning.message}</td>
                                    <td>{warning.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

// Car-Driver Allocation Page
class CarDriverAllocation extends React.Component <any, any> {

    defaultCar: data.Car = {
        licensePlate: "KKD 1234",
        make: "Toyota",
        model: "Corolla",
        year: 2019,
        status: data.CarStatus.Available
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
        status: data.CarStatus.Available
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
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/car-driver-allocation" component={CarDriverAllocation} />
                    <Route path="/packages" component={Packages} />
                    <Route path="/drivers-profiles" component={DriversProfiles} />
                    <Route path="/cars" component={Cars} />
                    <Route path="/driver-info" component={DriverInfo} />
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));