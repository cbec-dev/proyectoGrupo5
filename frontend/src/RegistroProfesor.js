import React, { Component } from 'react';
import logo from './logo.svg';
import './RegistroProfesor.css';

class RegistroProfesor extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            products: [],
            isLoading: false,
            id:"",
            idCareer:"",
            sectionName:"",
            email:"",
            userName:"",

        };
        }
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.user = {id: "", idCareer: "", userName:"", sectionName: "", email: ""}
        this.user.idCareer = e.idCareer;
        this.user.sectionName = e.sectionName;
        this.user.userName = e.userName;
        this.user.email = e.email+ "@usach.cl";

        if(this.user.idCareer==="" || this.user.sectionName ==="" ||this.user.email ===""){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.user);
            console.log("Datos: "+ this.user.sectionName);
            console.log("Datos: "+ this.user.idCareer);
            console.log("Datos: "+ this.user.email);
            
            fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.user.codigo+'&nombre='+this.user.nombre+'&fecha='+this.user.fecha+'&categoria='+this.user.categoria+'&precio='+this.user.precio)
            .then(response => console.log("Producto Agregado"+response)) 
            }
       
        return;
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, idCareer: "", sectionName: "", email: "", userName:""});
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
                    <body className="body">
                    <h1 className="header1">
                    <span className="texto"> Registrar Profesor </span>
                    </h1>
                    <form className="formulario">
                   
                    <div className="div3"><label className="label1"> Nombre:  </label> </div>
                    <div>
                        <input name= "userName" type = "text" value={this.state.sectionName}
                        onChange = {this.handleInputChange} />
                    </div>
                    <div className="div4"><label className="label2"> Email:  </label> </div>

                    <div className="div5">
                        <input name= "email" type = "text" value={this.state.email} 
                        onChange = {this.handleInputChange} /><label> @usach.cl  </label>
                    </div>
                    <div className="div6"> <label className="label3"> Seccion:  </label></div>

                    <div className="div6">
                        <select name="sectionName" component="select" onChange = {this.handleInputChange}>
                        value={this.state.sectionName}
                            <option value={"A-1"}>A-1</option>
                            <option value={"B-2"}>B-2</option>
                           
                         </select>
                    </div>
                    <div className="div7">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Registrarme</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
                    </body>
                    
                );
            }
          }
    
    
    export default RegistroProfesor;