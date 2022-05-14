import * as React from 'react';
import * as data from './DataTypes';
import * as styles from './Styles';

export class Home extends React.Component <any, any> {

    defaultWarning : data.Warning = {
        severity: data.WarningSeverity.low,
        message: "This is a default warning message",
        date: "01/01/2018"
    }

    getWarning() {
        let newData : data.Warning [];
        let request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/warnings', request).
        then(response => response.json()).
        then(data => {
            newData = data.map(this.formatData);
            console.log(data.map(this.formatData));
        }).catch(err => console.log(err));
        this.setState(newData);
        console.log(`length of state = ${this.state.length}`);
    }

    // Format the response of getWarning to data.Warning type
    formatData(wdata: any) {
        let newData: data.Warning;
        newData = {
            severity: data.convertWarnToEnum(wdata.severity),
            message: wdata.message,
            date: wdata.date
        }
        return newData;
    }
    
    
    constructor(props: any) {
        super(props);
        this.getWarning = this.getWarning.bind(this);
        this.state = fetch('/api/warnings').then(response => response.json()).then(data => {
            return data.map(this.formatData)
            }).catch(err => console.log(err));
    }

    render() {
        if (this.state.length > 0) {
            return (
                <div>
                    <h1 style={styles.h1Styles}>Home</h1>
                    <h2 style={styles.h2Styles}>Warnings</h2>
                    <h2 style={styles.h2Styles}>{this.state[0].message}</h2>
                    <table style={styles.tableStyles}>
                        <thead>
                            <tr style={styles.trStyles}>
                                <th>Severity</th>
                                <th>Message</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.map((warning: data.Warning) => {
                                return (
                                    <tr style={styles.trStyles}>
                                        <td>{warning.severity}</td>
                                        <td>{warning.message}</td>
                                        <td>{warning.date}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    <form style={styles.formStyle}>
                        <button style={styles.buttonStyles} onClick={this.getWarning}>Get Warnings</button>
                    </form>
                </div>
            );
        } 
        else {
            console.log(this.state.length)
            return (
                <div>
                    <h1 style={styles.h1Styles}>Home</h1>
                    <h2 style={styles.h2Styles}>Warnings</h2>
                    <p style={styles.pStyles}>No warnings found</p>
                    <form style={styles.formStyle}>
                        <button style={styles.buttonStyles} onClick={this.getWarning}>Get Warnings</button>
                    </form>
                </div>
            );
        }
    }
}