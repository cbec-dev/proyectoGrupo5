import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registro from './Registro';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

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
          <Router>
          <li>
            <Link to = "./Registro">Registro </Link>
            </li>
            </Router>
        </p>
      </div>
    );
  }
}

export default App;
