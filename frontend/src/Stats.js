import React, { Component } from 'react';
import qs from 'qs';
import axios from 'axios';



class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: ""
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        this.statsdata = {filter: "career", method: "time", id: 1}

        

        console.log("DATOS MANDADOS: ")
        console.log(this,this.statsdata)
            axios({
                method: 'post',
                url: 'http://209.97.152.30:8080/backendGrupo5/solutions/getStats',
                data: qs.stringify(this.statsdata),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "http://209.97.152.30:5050",
                    "Access-Control-Allow-Methods": "POST",
            },
             }).then(response => this.setState({stats: response.data}));   
        }

    render() {
        return (
            <div>

                <h1>Estadísticas:</h1>
                <p>{this.state.stats}</p>

            </div>
        );

    }
}

export default Stats;


