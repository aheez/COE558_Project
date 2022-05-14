import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

// Drivers Profiles Page
export class DriversProfiles extends React.Component <any, data.Driver []> {

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