import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class RegisterCar extends React.Component <any, any> {
    
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