import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Home.css';
import Registro from './Registro';
import {Router as Redirect, Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import {Avatar, RaisedButton} from "material-ui";
import {logout} from "./firebase/auth";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import createBrowserHistory from "history/createBrowserHistory";
import Login2 from './Login2';
import Solucion from './Solucion';
import App from './App';
import { PropTypes } from 'react';
import axios from 'axios';
import {ProgressBar} from "react-bootstrap"

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
            userLogged: false,
            name:"",
            userPlaceHolder: null,
            user: {career: "", correo: "", idUser: "", section:"", userName:"", userType:""},
            bool: "",
            state:"",
        };
        if(this.state.firebaseUser!=null){
            console.log("User:", this.state.firebaseUser.displayName);
        }
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            localStorage.removeItem("user");
            localStorage.removeItem("activeUserObject");
            this.props.callbackFromParentHome(this.state.userLogged);
            this.setState({userLogged: false, firebaseUser: ""});
            localStorage.clear();
            window.localStorage.clear(); 
            this.props.history.push("/");

        }.bind(this));
    }
    componentDidMount(){
        console.log("home")
        if(this.state.firebaseUser!==null){
            console.log("usuario logueado")
            this.setState({userLogged: true, name: this.state.firebaseUser.displayName})
        }
        else{
            console.log("ningun usuario")
           return this.props.history.push("/Login2")
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
            }
          };
          var email = this.state.firebaseUser.email;
          var self = this;
          axios.get('http://142.93.191.219:8080/backendGrupo5/users/searchbyEmail/'+email, axiosConfig)
          .then((response) => {
            this.setState({state: response.data, bool: true});
          }).catch((error) => {
            this.setState({bool: false})
          });


    }
    

    render() {
       
        const userEmail = this.state.state.correo;
        const bool = this.state.bool;
        console.log("render home")
        console.log(this.state.bool)
        console.log(this.state.firebaseUser)
        if(bool===true||this.props.bool===true){
            return (
                <body className="body">
                    <div className = "div1">
                        <h1 className = "h">Home</h1>
                        <div className = "div2">
                        </div>
                        
                        <h3 className = "h">Bienvenido {this.state.name}</h3>
                
                        <div className = "div3">
                            <RaisedButton className = "button"
                                backgroundColor="#a4c639"
                                labelColor="#ffffff"
                                label="Sign Out"
                                onClick={(e) => this.handleLogout()}
                            />
                        </div>
                    </div>
                </body>
            );
        }
        else if(bool===false){
            alert("No se encuentra registrado, sera regresado al login");

            return(
                <div> {this.handleLogout()} </div>
            );
        }
        else{
            return(
                <p className="p1"> < ProgressBar  active now={100} /></p>
                );
        }
       
    }
}
