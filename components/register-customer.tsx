import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class RegisterCustomer extends React.Component <any, any> {
    
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