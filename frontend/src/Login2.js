import React from "react";
import {FontIcon, RaisedButton} from "material-ui";
import {loginWithGoogle, logout} from "./firebase/auth";
import {firebaseAuth} from "./firebase/constants";
import './css/Login.css';
import Header from './Header';
 


const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false,
            userLogged: false,
            firebaseUser: "",
        };

        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

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
        localStorage.setItem(firebaseAuthKey, "1");



    }

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
                console.log("User signed in: ", JSON.stringify(user));

                localStorage.removeItem(firebaseAuthKey);
        
                // here you could authenticate with you web server to get the
                // application specific token so that you do not have to
                // authenticate with firebase every time a user logs in
                localStorage.setItem(appTokenKey, user.uid);
                localStorage.setItem("user", JSON.stringify(user));                
                var email = JSON.stringify(user.email);
                var domain = email.split("@");
                var userLogged = true;
                console.log(domain[1]);
                if(email=="\"espinoza.isaac.18@gmail.com\""){
                    alert("EMAIL VALIDO ADMINISTRADOR C:");
                    console.log("User email signed in: ", JSON.stringify(user.email));
                    // store the token
                    localStorage.setItem("userType", JSON.stringify("administrator"));
                    localStorage.setItem("userLogged", JSON.stringify(userLogged));
                    this.setState({userLogged: true, firebaseUser: JSON.parse(localStorage.getItem('user'))});
                    console.log("LOGIN, ESTADO USERLOGGED: ", this.userLogged);
                    this.props.callbackFromParentLogin(this.state.userLogged, this.state.firebaseUser);
                    return this.props.history.push("/Home");

                }
                else if(domain[1] != "usach.cl\""){
                    alert("EMAIL INVALIDOOOOOOOOO");
                    alert("Solo se puede iniciar sesion con cuentas @usach.cl");
                    localStorage.removeItem(appTokenKey);
                    localStorage.removeItem("user");
                    console.log("user signed out from firebase");
                    return this.props.history.push("/Login2");
                }
                else{
                    alert("EMAIL VALIDO C:");
                    console.log("User email signed in: ", JSON.stringify(user.email));
                    // store the token
                    localStorage.setItem("userLogged", JSON.stringify(userLogged));
                    this.setState({userLogged: true, firebaseUser: JSON.parse(localStorage.getItem('user'))});
                    console.log("LOGIN, ESTADO USERLOGGED: ", this.userLogged);
                    this.props.callbackFromParentLogin(this.state.userLogged, this.state.firebaseUser);
                    return this.props.history.push("/Home");
                }
               
            }
        });
    }

    render() {
        console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
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