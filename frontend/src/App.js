import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        
      };
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Plataforma FCyP.</h1>
        </header>
        <p className="App-intro">
          Bienvenido!
        </p>
      </div>
    );
  }
}

export default App;
