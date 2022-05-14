import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class DriverInfo extends React.Component <any, any> {

    defaultDriver: data.Driver = {
            fname: "",
            lname: "",
            govID: 0,
            Id: 0,
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
            params: {
                id: req_id
            }
        };

        fetch('/api/drivers/id', request).
        then(res => {
            console.log(res.json());
            res.json();
        }).
        then(data => {
            console.log(data);
            if (data == null) {
                this.setState(this.defaultDriver);
            } else {
                this.setState(data);
            }
        }).catch(err => console.log(err));
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