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
    }
    componentDidMount(){
        /*if(this.state.firebaseUser!==null){
            this.setState({userLogged: true, name: this.state.firebaseUser.displayName})
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
          axios.get('http://localhost:8081/users/searchbyEmail/'+email, axiosConfig)
          .then((response) => {
            this.setState({state: response.data, bool: true});
            console.log("RESPONSE: " + response.data);
          }).catch((error) => {
            console.log(error);
            this.setState({bool: false})
          });
          */


    }
    

    render() {
        return(

            <p> Uwu </p>
        );
       
    }
}
