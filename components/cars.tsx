import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class Cars extends React.Component <any, data.Car []> {

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