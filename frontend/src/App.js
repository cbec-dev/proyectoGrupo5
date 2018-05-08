import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registro from './Registro';
import Login from './Login';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Enunciado from './Enunciado';
import Solucion from './Solucion';
import CodeMirror from './CodeMirror';
import Prueba from './Prueba';

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
        <Route path="/Prueba" component={Prueba} />
        <Route path="/Login" component={Login} />
        <Route path="/Enunciado" component={Enunciado} />
        <Route path="/Solucion" component={Solucion} />
        <Route path="/Code" component={CodeMirror} />

        <Route exact path="/" component={Home} />

      </Switch>
  </Router>
      
      </div>
    );
  }
}

export default App;
