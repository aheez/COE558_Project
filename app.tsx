import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import * as styles from './components/Styles';

import { Home } from './components/home';
import { CarDriverAllocation } from './components/cardriver';
import { Cars } from './components/cars';
import { RegisterCar } from './components/register-car';
import { RegisterDriver } from './components/register-driver';
import { DriversProfiles } from './components/drivers-profiles';
import { Packages } from './components/packages';
import { DriverInfo } from './components/driver-info';
import { RegisterPackage } from './components/register-package';


// App Class
class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul style={styles.navBarStyles}>
                        <li><Link to="/">Home</Link></li>
                        {/* <li><Link to="/car-driver-allocation">Car-Driver Allocation</Link></li> */}
                        {/* <li><Link to="/packages">Packages</Link></li> */}
                        {/* <li><Link to="/drivers-profiles">SDS Drivers</Link></li> */}
                        {/* <li><Link to="/cars">Cars</Link></li> */}
                        {/* <li><Link to="/driver-info">Driver Info</Link></li> */}
                        <li><Link to="/register-driver">Register Driver</Link></li>
                        <li><Link to="/register-car">Register Car</Link></li>
                        <li><Link to="/register-package">Register Package</Link></li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/car-driver-allocation" component={CarDriverAllocation} />
                    <Route path="/packages" component={Packages} />
                    <Route path="/drivers-profiles" component={DriversProfiles} />
                    <Route path="/cars" component={Cars} />
                    <Route path="/driver-info" component={DriverInfo} />
                    <Route path="/register-driver" component={RegisterDriver} />
                    <Route path="/register-car" component={RegisterCar} />
                    <Route path="/register-package" component={RegisterPackage} />
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));