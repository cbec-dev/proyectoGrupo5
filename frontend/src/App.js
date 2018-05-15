import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import Registro from './Registro';
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from "react-router-dom";
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
import CodeRunner from './CodeRunner';

const muiTheme = getMuiTheme({
  appBar: {
      color: "#37517E",
      height: 50
  },
});

injectTapEventPlugin();

const customHistory = createBrowserHistory();


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        
      };
    }


  render() {
    
    return (
      <div>
        <Header history={customHistory} typeUser={this.state.user.userType} activeUser={this.state.user} userAvatar={this.state.firebaseUser.providerData[0].photoURL} loggedState={this.state.userLogged} />
        <MuiThemeProvider muiTheme={muiTheme}>
  <Router history={customHistory}>     
      <Switch>
        <Route path="/Registro" component={()=> <Registro typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/RegistroProfesor" component={()=> <RegistroProfesor typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Prueba" component={()=> <Prueba typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Enunciado" component={()=> <Enunciado typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Solucion" component={()=> <Solucion typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}  />
        <Route path="/Code" component={()=> <CodeMirror typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>} />
    <Route path= "/Login2" component={()=> <Login2 typeUser={this.state.user.userType} callbackFromParentLogin ={this.myCallbackLogin} history={customHistory}/>}/>
        <Route path="/Home" component={()=> <Home typeUser={this.state.user.userType} callbackFromParentHome ={this.myCallbackHome} history={customHistory} callbackFromParentHomeUser ={this.myCallbackHomeUser}/>} />
        <Route path="/CrearCurso" component={()=><CrearCurso typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/verEnunciado" component={()=><verEnunciado typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/ListarEnunciados" component={()=><ListarEnunciados typeUser={this.state.user.userType} history={customHistory} activeUser={this.state.user}/>}/>
      

      </Switch>
  </Router>
  </MuiThemeProvider>

      </div>
    );
  }
  else{
    return (
      <body>
      <div>
        <Header history={customHistory} loggedState={false} typeUser = {4}/>
        <MuiThemeProvider muiTheme={muiTheme}>
  <Router history={customHistory} callbackFromParentHome ={this.myCallbackHome}>     
      <Switch>
        
      <Route path="/Registro" component={()=> <Registro history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/RegistroProfesor" component={()=> <RegistroProfesor history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Prueba" component={()=> <Prueba history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Enunciado" component={()=> <Enunciado history={customHistory} activeUser={this.state.user}/>} />
        <Route path="/Solucion" component={()=> <Solucion history={customHistory} activeUser={this.state.user}/>}  />
        <Route path="/Code" component={()=> <CodeMirror history={customHistory} activeUser={this.state.user}/>} />
    <Route path= "/Login2" component={()=> <Login2 callbackFromParentLogin ={this.myCallbackLogin} history={customHistory}/>}/>
        <Route path="/Home" component={()=> <Home callbackFromParentHome ={this.myCallbackHome} history={customHistory} callbackFromParentHomeUser ={this.myCallbackHomeUser}/>} />
        <Route path="/CrearCurso" component={()=><CrearCurso history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/verEnunciado" component={()=><verEnunciado history={customHistory} activeUser={this.state.user}/>}/>
        <Route path="/ListarEnunciados" component={()=><ListarEnunciados history={customHistory} activeUser={this.state.user}/>}/>
      
      

      </Switch>
  </Router>
  </MuiThemeProvider> 
      </div>
       <label> ningun usuario logueado </label> 
        <label>PRUEBAA </label>
        {console.log("APP APP APP" , this.state)}
      </body>
      );
  }
  }
}

export default App;
