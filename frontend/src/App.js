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
        <Router>
      <ul>
       <label className="link-home">
         <Link to = "/"> Home </Link>
         </label>
         <label className="link-login">
         <Link to = "/Login"> Login </Link>
         </label>
        <label className="link-registro">
          <Link to="/Registro">Registro</Link>
        </label>
       

        <Route path="/Registro" component={Registro} />
        <Route path="/Login" component={Login} />

      </ul>

  </Router>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Plataforma FCyP.</h1>
          
        </header>
        <p className="App-intro">
        
        </p>
      </div>
    );
  }
}

export default App;
