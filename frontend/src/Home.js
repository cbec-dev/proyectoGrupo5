import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Registro from './Registro';
import Login from './Login';
import {BrowserRouter as Redirect, Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import {Avatar, RaisedButton} from "material-ui";
import {logout} from "./auth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import createBrowserHistory from "history/createBrowserHistory";
import Login2 from './Login2';
import Solucion from './Solucion';
import App from './App';

const customHistory = createBrowserHistory();
const muiTheme = getMuiTheme({
  appBar: {
      color: "#37517E",
      height: 50
  },
});

const appTokenKey = "appToken"; // also duplicated in Login.js
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firebaseUser: JSON.parse(localStorage.getItem("firebaseUser"))
        };

        //console.log("User:", this.state.firebaseUser);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            this.props.history.push("/login2");
            console.log("user signed out from firebase");
        }.bind(this));

    }

    render() {

    
        console.log("THE WORO WORO");
        console.log(this.state.firebaseUser);
        console.log("THE WORO WORO");
        return (
            <div>
                <h1>Home</h1>
                <div>
                  <label> {this.state.firebaseUser}</label>
                  </div>
                  
                <h3>Welcome</h3>
        
                <div>
                    <RaisedButton
                        backgroundColor="#a4c639"
                        labelColor="#ffffff"
                        label="Sign Out"
                        onTouchTap={this.handleLogout}
                    />
                </div>
            </div>
        );
    }
}
