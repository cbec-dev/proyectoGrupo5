import React, { Component } from 'react';
import logo from './logo.svg';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            
            isLoading: false,
            email:"",
            password:"",

        };
        }
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.user = {id: "", idCareer: "", sectionName: "", email: ""}
        this.user.idCareer = e.idCareer;
        this.user.sectionName = e.sectionName;
        this.user.email = e.email+ "@usach.cl";
        this.user.password = e.password; 
        if(this.user.idCareer==="" || this.user.sectionName ==="" ||this.user.email ===""){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.user);
            console.log("Datos: "+ this.user.email);
            console.log("Datos:"+ this.user.password);
            fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.user.codigo+'&nombre='+this.user.nombre+'&fecha='+this.user.fecha+'&categoria='+this.user.categoria+'&precio='+this.user.precio)
            .then(response => console.log("Producto Agregado"+response)) 
            }
       
        return;
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, email: "", password:""});
            this.render();
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 
        this.setState({
            [name]: value
            });
        console.log(name, value, target);
        }


        render() {
                return (
                    <form>
                    <div>
                        <label> Email:  </label>
                        <input name= "email" type = "text" value={this.state.email} 
                        onChange = {this.handleInputChange} /><label> @usach.cl  </label>
                    </div>
                    <div>
                        <label> Password:  </label>
                        <input name= "password" type = "password" value={this.state.password} 
                        onChange = {this.handleInputChange} />
                    </div>
                    <div>
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Registrarme</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
    
                    
                );
            }
          }
    
    
    export default Login;