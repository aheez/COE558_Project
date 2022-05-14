import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class Packages extends React.Component <any, data.Package[]> {

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