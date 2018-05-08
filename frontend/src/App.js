import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registro from './Registro';
import Login from './Login';
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
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Registro">Registro</Link>
        </li>
        <Route exact path="/" component={App} />
        <Route path="/Registro" component={Registro} />
       
      </ul>

      <hr />

      
    </div>
  </Router>
        </p>
      </div>
    );
  }
}

export default App;
