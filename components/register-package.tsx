import * as React from 'react';

import * as styles from './Styles';
import * as data from './DataTypes';

// register package page with customer phone
export class RegisterPackage extends React.Component <any, any> {
    
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