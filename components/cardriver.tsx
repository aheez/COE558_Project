import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class CarDriverAllocation extends React.Component <any, any> {

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
        Id: 1,
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