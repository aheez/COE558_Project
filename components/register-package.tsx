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
            id : event.target.id.value,
            location_x: event.target.location_x.value,
            location_y: event.target.location_y.value,
            status: data.PackageStatus.pending,
            priority: event.target.priority.value,
            deliveryDate: event.target.delivDate.value,
            customer: {
                fname: event.target.fname.value,
                lname: event.target.lname.value,
                phone: event.target.phone.value
            }
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
                <h1 style={styles.h1Styles}>Register Package and Customer</h1>
                <form onSubmit={this.registerPackage}>
                    <div>
                        <h2 style={styles.h2Styles}>Package Informatio</h2>
                        <label>Package ID:</label>
                        <input type="text" name="id" />
                        <label>Location X:</label>
                        <input type="text" name="location_x" />
                        <label>Location Y:</label>
                        <input type="text" name="location_y" />
                        <label>Priority:</label>
                        <select name="priority">
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <label>Delivery Date:</label>
                        <input type="date" name="delivDate" />
                    </div>
                    <div>
                        <h2 style={styles.h2Styles}>Customer Information</h2>
                        <label>First Name</label>
                        <input type="text" name="fname" />
                        <label>Last Name</label>
                        <input type="text" name="lname" />
                        <label>Customer Phone:</label>
                        <input type="text" name="phone" />
                    </div>
                    <input type="submit" value="Register Package" style={styles.buttonStyles}/>
                </form>
            </div>
        );
    }
}