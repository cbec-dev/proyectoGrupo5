import React from "react";
import {FontIcon, RaisedButton} from "material-ui";
import {loginWithGoogle, logout} from "./firebase/auth";
import {firebaseAuth} from "./firebase/constants";
import './css/Login.css';
import Header from './Header';
import axios from 'axios';
import { Redirect } from 'react-router'



const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";
/*const getUser = async (correo) =>{
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
        }
      };

      var self = this;
      try {
        let res = await axios({
             url: 'http://142.93.191.219:8080/backendGrupo5/users/searchbyEmail/'+correo,
             method: 'get',
             timeout: 8000,
             headers: {
                 'Content-Type': 'application/json',
             }
         })
         if(res.status == 200){
             // test for status you want, etc
             console.log(res.status)
             console.log(res.data)
         }    
         // Don't forget to return something   
         return res.data
     }
     catch (err) {
         console.error(err);
     }
};*/

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false,
            userLogged: false,
            firebaseUser: "",
            userPlaceHolder:"",
            users: [],
            userEmail: "",
            persons:[],
            a: [],
            activeUser: [],
            state: "",
            user:"",
            redirect: false,
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        //this.stateSet = this.stateSet.bind(this);


    }
    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            this.props.callbackFromParentLogin(this.state.userLogged, this.firebaseUser);
            this.props.history.push("/Login2");
            console.log("user signed out from firebase");
        }.bind(this));
        this.setState({userLogged: false, firebaseUser: ""});
        //this.props.callbackFromParentLogin(this.state.userLogged, this.firebaseUser);


    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);

            });
        localStorage.setItem(firebaseAuthKey, "1");
        



    }
    //stateSet(email){
    //     const user = getUser(email);
    //     alert(user)
    //     return user;
   // }
    componentWillMount() {
        /*         firebaseAuth().getRedirectResult().then(function(result) {
         if (result.user) {
         console.log("GoogleLogin Redirect result");
         if (result.credential) {
         // This gives you a Google Access Token. You can use it to access the Google API.
         let token = result.credential.accessToken;
         // ...
         }
         // The signed-in user info.
         let user = result.user;
         console.log("user:", JSON.stringify(user));
         }
         }).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;
         // ...
         alert(error);
         })*/
        ;

        /**
         * We have appToken relevant for our backend API
         */
        if (localStorage.getItem(appTokenKey)) {
            this.props.history.push("/Home");
            return;
        }
        

        firebaseAuth().onAuthStateChanged(user => {
            if (user) {

                localStorage.removeItem(firebaseAuthKey);
        
                // here you could authenticate with you web server to get the
                // application specific token so that you do not have to
                // authenticate with firebase every time a user logs in
                localStorage.setItem(appTokenKey, user.uid);
                localStorage.setItem("user", JSON.stringify(user));                
                var email = JSON.stringify(user.email);
                var domain = email.split("@");
                var userLogged = true;
                var correo = email.split("\"");
                this.setState({userEmail: correo[1]});
                
                /*fetch('http://142.93.191.219:8080/backendGrupo5/users/searchbyEmail/'+correo[1])
                .then(response => response.json())
                .then(console.log('algo' + this.state.a)
                .then(data => this.setState({a: data})));
                
              */
             

                
                
            
                if(domain[1] !== "usach.cl\"" && domain[1]!==""){
                    alert("Solo se puede iniciar sesion con cuentas @usach.cl");
                    localStorage.removeItem(appTokenKey);
                    localStorage.removeItem("user");
                    localStorage.removeItem(firebaseAuthKey);
                    this.setState({userLogged: false, firebaseUser: ""});
                    //this.props.callbackFromParentLogin(this.state.userLogged, this.state.firebaseUser);
                    localStorage.clear();
                    window.localStorage.clear();
                    return this.props.history.push("/Login2");
                }
                else{
                    // store the token
                    localStorage.setItem("userLogged", JSON.stringify(userLogged));
                    this.setState({userLogged: true, firebaseUser: JSON.parse(localStorage.getItem('user'))});
                    //getUser(correo[1])
                    fetch('http://142.93.191.219:8080/backendGrupo5/users/searchbyEmail2/'+correo[1])
                    .then(response => response.json())
                    .then(data => {
                        console.log("fetch en login c:")
                        console.log(data)
                        console.log(data)
                        console.log("response json y response json data")
                        console.log(data)
                        console.log(data)
                        console.log("UWU")
                        if(data==="false"||data===false){
                            alert("No se encuentra registrado, sera regresado a login");
                            localStorage.removeItem(appTokenKey);
                            localStorage.removeItem("user");
                            localStorage.removeItem(firebaseAuthKey);
                            this.setState({userLogged: false, firebaseUser: ""});
                            //this.props.callbackFromParentLogin(this.state.userLogged, this.state.firebaseUser);
                            localStorage.clear();
                            window.localStorage.clear();
                            return this.props.history.push("/Login2");           
                        }
                        else{
                            console.log("else, usuario existe")
                            fetch('http://142.93.191.219:8080/backendGrupo5/users/searchbyEmail/'+correo[1])
                            .then(response => response.json())
                            .then(data =>{
                                console.log("usuario: ")
                                console.log(data)                                
                                this.props.callbackFromParentLogin(true, JSON.parse(localStorage.getItem('user')), data)
                                this.setState({redirect: true})
                                //return this.props.history.push("/Home")
                                    })
                            }

                        })
                    
               }
            }
        });
    }
    
    componentDidMount(){

        /*if(this.state.state===null){
            alert("usuario no registrado")
            localStorage.removeItem(appTokenKey);
            localStorage.removeItem("user");
            localStorage.removeItem(firebaseAuthKey);
            this.setState({userLogged: false, firebaseUser: ""});
            //this.props.callbackFromParentLogin(this.state.userLogged, this.state.firebaseUser);
            console.log("user signed out from firebase");
            localStorage.clear();
            window.localStorage.clear();
            return this.props.history.push("/Login2");


        }
        else{
            alert("usuario valido c:")
        }*/
       /*let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                    }
                  };
                
                  var self = this;
                  axios.get('http://142.93.191.219:8080/backendGrupo5/users/searchbyEmail/'+correo[1], axiosConfig)
                   .then(function (response) {
                     console.log(response);
                     self.setState({activeUser: response.data})
                   })
                  .catch(function (error) {
                     console.log(error);
                     self.setState({state: true})
                  });
 */       
}

    render() {
        console.log("render login")
        console.log(this.state.redirect)
        console.log("$$$$$$$$$$$$")
        if(this.state.redirect===true||this.props.bool===true){
            console.log("redirigiendo...")
            return <Redirect to='/Home'/>;
        }
        if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
        return <LoginPage handleGoogleLogin={this.handleGoogleLogin}/>;
    }
}

const iconStyles = {
    color: "#ffffff"
};
const LoginPage = ({handleGoogleLogin}) => (
    <body className="body">
        <div className="div1">
            <h1 className="Header1">Login</h1>
            <div className="div1">
                <RaisedButton
                    label="Sign in with Google"
                    labelColor={"#ffffff"}
                    backgroundColor="#dd4b39"
                    icon={<FontIcon className="fa fa-google-plus" style={iconStyles}/>}
                    onClick={handleGoogleLogin}
                />
                
            </div>
        </div>
    </body>
);
const SplashScreen = () => (<p>Loading...</p>)