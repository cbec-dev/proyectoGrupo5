import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Registro from './Registro';
import {Router as Router, Route, Redirect, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Enunciado from './Enunciado';
import Solucion from './Solucion';
import CodeMirror from './codemirror/CodeMirror';
import Prueba from './Prueba';
import Login2 from './Login2';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import createBrowserHistory from "history/createBrowserHistory";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import ListarEnunciados from './ListarEnunciados';
import RegistroProfesor from './RegistroProfesor';
import CrearCurso from './CrearCurso';
import verEnunciado from './verEnunciado';
import {loginWithGoogle, logout} from "./firebase/auth";
import {firebaseAuth} from "./firebase/constants";
import axios from 'axios';
import ListarSoluciones from './ListarSoluciones';
import VerSolucion from './verSolucion';
import {BrowserRouter} from "react-router-dom";



const muiTheme = getMuiTheme({
  appBar: {
      color: "#37517E",
      height: 50
  },
});
injectTapEventPlugin();
const customHistory = createBrowserHistory();
const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
const placeHolder = JSON.parse(localStorage.getItem('user'));
var statement = "";


class App extends Component {

  constructor(props) {
    super(props);
    const stateUWU= JSON.parse(localStorage.getItem('state'));
      this.state = {
          userLogged: JSON.parse(localStorage.getItem('userLogged')),
          firebaseUser: JSON.parse(localStorage.getItem('user')),
          isLoading: false,
          user: JSON.parse(localStorage.getItem('activeUserObject')),
          statement: "",
        };

    }
    myCallbackLogin = (dataFromLogin1, dataFromLogin2, dataFromLogin3) => {
      if(dataFromLogin3===undefined){
        this.setState({ userLogged: false, firebaseUser:dataFromLogin2, user: dataFromLogin3});
        localStorage.setItem('state', JSON.stringify(this.state));
        localStorage.setItem('activeUserObject', JSON.stringify(dataFromLogin3));
      }
      else{
        this.setState({ userLogged: dataFromLogin1, firebaseUser:dataFromLogin2, user: dataFromLogin3});
      localStorage.setItem('state', JSON.stringify(this.state));
      localStorage.setItem('activeUserObject', JSON.stringify(dataFromLogin3));
      }
      
      
    };
    myCallbackHome = (dataFromHome) => {
      this.setState({userLogged: dataFromHome, firebaseUser: null});
      localStorage.removeItem("state");
      localStorage.removeItem("userLogged");
      localStorage.removeItem("activeUserObject");
    }

    myCallbackHomeUser = (dataFromHome) => {
      this.setState({user: dataFromHome});
    }
    myCallBackStatement = (dataFromStatement) => {
      statement = dataFromStatement;
      //this.setState({statement: dataFromStatement});
    }
    componentWillMount(){
   
      
    
  }



    
  render() {
    if(this.state.firebaseUser!==null && this.state.user!==null && this.state.userLogged===true){
      const userLogged = this.state.userLogged;
      const firebaseUser = this.state.firebaseUser;
      const user = this.state.user;
      return (
      <body>
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
  <BrowserRouter history={customHistory} callbackFromParentHome ={this.myCallbackHome}>
  <React.Fragment>
  <Header history={customHistory} typeUser={this.state.user.userType} activeUser={this.state.user} userAvatar={this.state.firebaseUser.providerData[0].photoURL} loggedState={this.state.userLogged} />
     
      <Switch>
        <Route path="/Registro" component={()=> <Registro typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/RegistroProfesor" component={()=> <RegistroProfesor typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Prueba" component={()=> <Prueba typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Enunciado" component={()=> <Enunciado typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Solucion" component={()=> <Solucion statement={statement} callBackFromParentStatement= {this.myCallbackStatement} location={this.props.location} typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}  />
        <Route path="/Code" component={()=> <CodeMirror typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
    <Route path= "/Login2" component={()=> <Login2 typeUser={this.state.user.userType} callbackFromParentLogin ={this.myCallbackLogin} history={customHistory}/>}/>
        <Route path="/Home" component={()=> <Home typeUser={this.state.user.userType} callbackFromParentHome ={this.myCallbackHome} history={customHistory} callbackFromParentHomeUser ={this.myCallbackHomeUser}/>} />
        <Route path="/CrearCurso" component={()=><CrearCurso typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/verEnunciado" component={()=><verEnunciado typeUser={this.state.user.userType} history={customHistory} callBackFromParentStatement= {this.myCallBackStatement} activeUser={this.state.user}/>}/>
        <Route path="/ListarEnunciados" component={()=><ListarEnunciados typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user} callBackFromParentStatement= {this.myCallBackStatement}/>}/>
        <Route path="/ListarSoluciones" component={()=><ListarSoluciones typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/VerSolucion" component={()=><verSolucion typeUser={this.state.user.userType} history={customHistory} callBackFromParentStatement= {this.myCallBackStatement} activeUser={this.state.user}/>}/>
        <Route path="/Stats" component={()=> <Stats typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />


      </Switch>
  </React.Fragment>
  </BrowserRouter>
  </MuiThemeProvider> 
      </div>
     
      </body>
    );
  }
  else{
    return (
      <body>
      <div>
        <Header history={customHistory} loggedState={false} typeUser = {4}/>
        <MuiThemeProvider muiTheme={muiTheme}>
  <BrowserRouter history={customHistory} callbackFromParentHome ={this.myCallbackHome}>     
      <Switch>
        
      <Route path="/Registro" component={()=> <Registro history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/RegistroProfesor" component={()=> <RegistroProfesor history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Prueba" component={()=> <Prueba history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Enunciado" component={()=> <Enunciado history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Solucion" component={()=> <Solucion location={this.props.location} history={customHistory} activeUser={this.state.user}/>}  />
        <Route path="/Code" component={()=> <CodeMirror history={customHistory} activeUser={this.state.user}/>} />
    <Route path= "/Login2" component={()=> <Login2 callbackFromParentLogin ={this.myCallbackLogin} history={customHistory}/>}/>
        <Route path="/Home" component={()=> <Home callbackFromParentHome ={this.myCallbackHome} history={customHistory} callbackFromParentHomeUser ={this.myCallbackHomeUser}/>} />
        <Route path="/CrearCurso" component={()=><CrearCurso history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/verEnunciado" component={()=><verEnunciado history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/ListarEnunciados" component={()=><ListarEnunciados history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/ListarSoluciones" component={()=><ListarSoluciones history={customHistory} activeUser={this.state.user}/>}/>

      

      </Switch>
  </BrowserRouter>
  </MuiThemeProvider> 
      </div>
      </body>
      );
  }
  }
}

export default App;
