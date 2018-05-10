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
        userLogged: false,
      };
    }
    myCallbackHeader = (dataFromHeader) => {
      this.setState({ userLogged: dataFromHeader });
      alert(this.state.userLogged);
      
    };

  render() {
    
    return (
      <div>
        <Header callbackFromParent={this.myCallbackHeader}/>
        <MuiThemeProvider muiTheme={muiTheme}>
  <Router history={customHistory}>     
      <Switch>
        <Route path="/Registro" component={Registro} />
        <Route path="/RegistroProfesor" component={RegistroProfesor} />
        <Route path="/Prueba" component={Prueba} />
        <Route path="/Enunciado" component={Enunciado} />
        <Route path="/Solucion" component={Solucion} />
        <Route path="/Code" component={CodeMirror} />
        <Route path="/Login2" component={Login2}/>
        <Route path="/Home" component={Home}/>
        <Route path="/CrearCurso" component={CrearCurso}/>
        <Route path="/verEnunciado:id" component={verEnunciado}/>
        <Route path="/ListarEnunciados:id" component={ListarEnunciados}/>
      

      </Switch>
  </Router>
  </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
