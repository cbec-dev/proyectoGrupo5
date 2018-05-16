import React, { Component } from 'react';

import GlotAPI from 'glot-api'
const glot = new GlotAPI('630953e5-4643-4643-b7e0-107713756318')



function run(code) {
    var files = {
        "files": [{
        "name": "main.py",
        "content": code
        }]
      };

    var salida = glot.run("python", "latest", files)

    return salida;
}



class CodeRunner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "print('pantalones!')",
            salida: "",
        };
    }

    render() {
        this.state.salida2 = run(this.state.codigo);
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


