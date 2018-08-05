import React, { Component } from 'react';



class CodeRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "print 33",
            salida: ""
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://209.97.152.30:8080/backendGrupo5/api/compiler/runCode?code='+this.state.codigo)
            .then(response => response.json())
            .then(data => this.setState({salida: data.stdout}));
        }

    render() {
        return (
            <div>
                <h1>Código:</h1>
                <p>{this.state.codigo}</p>

                <h1>Salida:</h1>
                <p>{this.state.salida}</p>

            </div>
        );

    }
}

export default CodeRunner;


