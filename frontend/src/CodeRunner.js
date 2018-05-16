import React, { Component } from 'react';



class CodeRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "print('pantalones!')",
            rawSalida: "",
            salida: "",
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://localhost:8081/api/compiler/runCode')
            .then(response => response.json())
            .then(data => this.setState({rawSalida: data.stdout, isLoading: false}));
        }

    render() {
        return (
            <div>
                <h1>Código:</h1>
                <p>{this.state.codigo}</p>

                <h1>Salida:</h1>
                <p>{this.state.rawSalida}</p>

            </div>
        );

    }
}

export default CodeRunner;


