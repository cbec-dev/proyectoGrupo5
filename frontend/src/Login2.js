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
        this.setState({userLogged: false});
        Header.render();
        Header.forceUpdate();
        this.props.callbackFromParent(this.state.userLogged);


    }

    handleGoogleLogin() {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        Header.render();
        Header.forceUpdate();
        this.setState({userLogged: true});
        localStorage.setItem(firebaseAuthKey, "1");
        this.props.callbackFromParent(this.state.userLogged);
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
                console.log(domain[1]);
                if(domain[1] != "usach.cl\""){
                    console.log("EMAIL INVALIDOOOOOOOOO");
                    alert("Solo se puede iniciar sesion con cuentas @usach.cl");
                    localStorage.removeItem(appTokenKey);
                    console.log("user signed out from firebase");
                    return this.props.history.push("/Login2");
                }
                else{
                    console.log("EMAIL VALIDO C:");
                    console.log("User email signed in: ", JSON.stringify(user.email));
                    // store the token
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