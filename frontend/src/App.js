import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registro from './Registro';
import Login from './Login';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        
      };
    }


  render() {
    
    return (
      <div>
        <Header/>
    
  <Router>     
      <Switch>
        <Route path="/Registro" component={Registro} />
        <Route path="/Login" component={Login} />
      </Switch>
  </Router>
      
      </div>
    );
  }
}

export default App;
