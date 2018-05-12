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

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        userLogged: false,
        firebaseUser: "",
      };
   
    }
    myCallbackLogin = (dataFromLogin1, dataFromLogin2) => {
      this.setState({ userLogged: dataFromLogin1, firebaseUser:dataFromLogin2});
      alert(this.state.userLogged);
      console.log(this.state.dataFromLogin2.displayName);
      console.log("CALLBACK FROM LOGIN IN APP :C");
      
    };
    myCallbackHome = (dataFromHome) => {
      this.setState({userLogged: dataFromHome});
      alert(this.state.userLogged);
      console.log("CALLBACK FROM HOME IN APP :C");
    }
    handleLogout() {
      logout().then(function () {
          localStorage.removeItem(appTokenKey);
          this.props.history.push("/Login2");
          console.log("user signed out from firebase");
      }.bind(this));
      this.setState({userLogged: false, firebaseUser: ""});
      this.props.callbackFromParent(this.state.userLogged, this.firebaseUser);


  }

  handleGoogleLogin() {
      loginWithGoogle()
          .catch(function (error) {
              alert(error); // or show toast
              localStorage.removeItem(firebaseAuthKey);
          });
      this.setState({userLogged: true, firebaseUser: JSON.parse(localStorage.getItem('user'))});
      localStorage.setItem(firebaseAuthKey, "1");
      this.props.callbackFromParent(this.state.userLogged, this.firebaseUser);

  }

  render() {
    if(this.state.userLogged==true){
      alert("THE BEST APP");
    }
    else{
      alert("THE WORST APP");
    }
    console.log("PRINT DE APP UWU C:");
    return (
      <body>
      <div>
        <Header callbackFromParent={this.myCallbackHeader}/>
        <MuiThemeProvider muiTheme={muiTheme}>
  <Router history={customHistory} callbackFromParentHome ={this.myCallbackHome}>     
      <Switch>
        <Route path="/Registro" component={Registro} />
        <Route path="/RegistroProfesor" component={RegistroProfesor} />
        <Route path="/Prueba" component={Prueba} />
        <Route path="/Enunciado" component={Enunciado} />
        <Route path="/Solucion" component={Solucion}  />
        <Route path="/Code" component={CodeMirror} />
    <Route path= "/Login2" component={()=> <Login2 callbackFromParentLogin ={this.myCallbackLogin} history={customHistory}/>}/>
        <Route path="/Home" component={()=> <Home callbackFromParentHome ={this.myCallbackHome} history={customHistory}/>} />
        <Route path="/CrearCurso" component={CrearCurso}/>
        <Route path="/verEnunciado:id" component={verEnunciado}/>
        <Route path="/ListarEnunciados:id" component={ListarEnunciados}/>
      

      </Switch>
  </Router>
  </MuiThemeProvider> 
      </div>
       <label> {this.state.userLogged} </label> 
      <label> {this.state.firebaseUser.displayName} </label>
        <label>PRUEBAA </label>
        {console.log("APP APP APP" , this.state)}
      </body>
    );
  }
}

export default App;
