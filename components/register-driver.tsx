import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class RegisterDriver extends React.Component <any, any> {

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