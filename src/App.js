import React, {Component} from 'react';
import Progress from 'react-progressbar';
import Logo from "./firelogo.jpg";

class App extends Component {

    state = {
        loading: true,
        sensors: null,
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        fetch('http://localhost:8080/SensorData_REST_API/rest/sensors')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    sensors: data,
                    loading: false
                })
                // console.log(data);
            });
    }

    render() {
        if (this.state.loading) {
            return (
                <div className={"container"}>
                    <div className={"row mt-4 justify-content-center"}>

                        <div className="spinner-border" role="status"></div>
                    </div>
                    <div className={"row mt-4 justify-content-center"}>
                        <h1>Fetching data...please wait</h1>
                    </div>
                </div>
            )

        }
        if (!this.state.sensors) {
            return <div>No sensors found!!!</div>
        }


        return (
            <div className={"row md-16 ml-4 mr-4"}>
                <nav className="navbar fixed-top navbar-dark bg-dark" style={{opacity: 0.9}}>
                    <div className={"row justify-content-left"}>
                        <div className={"col"}>
                            <img src={Logo} style={{height: 75}} alt={"Logo"}/>
                        </div>
                        <div className={""}>
                            <h1 className={"ml-2 text-white display-5"}>Fire Alarms Dashboard</h1>
                            <h5 className={"ml-2 text-white"}>Real-time sensor data updates every: 40 seconds</h5>
                        </div>


                    </div>
                </nav>

                <div className={"row justify-content-center"} style={{marginTop: 115}}>

                    {this.state.sensors.map((value) => {

                        return (

                            (value.smokeLevel >= 5 || value.co2Level >= 5) ? (

                                <div className={"box m-2"}>
                                    <div className={"card border-danger mb-3"}>

                                        <div className="card-header bg-danger"><h5
                                            className={"text-white"}>Sid: {value.sid} </h5>
                                        </div>

                                        <div className="card-body text-danger">

                                            <h4>CO2 Level: {value.co2Level}</h4>

                                            {(value.co2Level >= 5) ? (
                                                <Progress color={"red"} height={10} completed={value.co2Level * 10}/>
                                            ) : (
                                                <Progress color={"green"} height={10} completed={value.co2Level * 10}/>
                                            )}
                                            <h4>Smoke Level: {value.smokeLevel}</h4>

                                            {(value.smokeLevel >= 5) ? (
                                                <Progress color={"red"} height={10} completed={value.smokeLevel * 10}/>
                                            ) : (
                                                <Progress color={"green"} height={10}
                                                          completed={value.smokeLevel * 10}/>
                                            )}

                                            <div className={"mt-2 card-footer bg-transparent border-danger"}>
                                                <h5>Floor No: {value.floorNo}</h5>
                                                <h5>Room No: {value.roomNo}</h5>
                                            </div>

                                            <div className={"mt-2 card-footer bg-danger"}>
                                                <h4 className={"text-white"}>Fire Warning</h4>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={"box m-2"}>
                                    <div className={"card border-success mb-3"}>

                                        <div className="card-header bg-success"><h5
                                            className={"text-white"}>Sid: {value.sid} </h5>
                                        </div>

                                        <div className="card-body text-success">

                                            <h4>CO2 Level: {value.co2Level}</h4>

                                            {(value.co2Level >= 5) ? (
                                                <Progress color={"red"} height={10} completed={value.co2Level * 10}/>
                                            ) : (
                                                <Progress color={"green"} height={10} completed={value.co2Level * 10}/>
                                            )}

                                            <h4>Smoke Level: {value.smokeLevel}</h4>

                                            {(value.smokeLevel >= 5) ? (
                                                <Progress color={"red"} height={10} completed={value.smokeLevel * 10}/>
                                            ) : (
                                                <Progress color={"green"} height={10}
                                                          completed={value.smokeLevel * 10}/>
                                            )}

                                            <div className={"mt-2 card-footer bg-transparent border-success"}>
                                                <h5>Floor No: {value.floorNo}</h5>
                                                <h5>Room No: {value.roomNo}</h5>
                                            </div>

                                            <div className={"mt-2 card-footer bg-success"}>
                                                <h4 className={"text-white text-center"}>Safe </h4>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            )

                        );

                    })}

                </div>
            </div>

        );


    }
}

export default App;