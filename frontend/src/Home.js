import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';
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
            firebaseUser: JSON.parse(localStorage.getItem('user')),
        };

        console.log("User:", this.state.firebaseUser.displayName);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            this.props.history.push("/Login2");
            console.log("user signed out from firebase");
        }.bind(this));

    }

    render() {

    
        console.log("USUARIO LOGUEADO");
        console.log(JSON.parse(localStorage.getItem("user")));
        console.log("USUARIO LOGUEADO");
        return (
            <body className="body">
                <div className = "div1">
                    <h1 className = "h">Home</h1>
                    <div className = "div2">
                    </div>
                    
                    <h3 className = "h">Bienvenido {this.state.firebaseUser.displayName}</h3>
            
                    <div className = "div3">
                        <RaisedButton className = "button"
                            backgroundColor="#a4c639"
                            labelColor="#ffffff"
                            label="Sign Out"
                            onTouchTap={this.handleLogout}
                        />
                    </div>
                </div>
            </body>
        );
    }
}
