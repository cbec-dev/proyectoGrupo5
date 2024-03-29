import React, { Component } from 'react';
import logo from './logo.svg';
import './css/RegistroProfesor.css';
import {Button} from "react-bootstrap";

class RegistroProfesor extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            sections: [],
            isLoading: false,
            id:"",
            idCareer:"",
            sectionName:"",
            email:"",
            userName:"",

        };
        this.limpiarValores = this.limpiarValores.bind(this);
        this.subirFormulario = this.subirFormulario.bind(this);


        }
        subirFormulario(e) {
            var user = {userName:"", section: "", email: "", userType: ""}
            user.userType= 3;
            user.section = e.sectionName;
            user.userName = e.userName;
            var verificador = e.email.split("@")
            //ENTREGAR MENSAJE POR CORREO REPETIDO
     
            if(verificador.length>1){
                alert("Correo invalido ingrese datos nuevamente")
                this.limpiarValores(1);
                return;
            }
            user.email = e.email+ "@usach.cl";
            if(user.section ==="" ||user.email ===""||user.userName===""){
                alert("Debe llenar todos las casillas");
                return;
            }
            else{
                this.limpiarValores(1);
           
                var bool = true
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                    }
                  };
                fetch('http://142.93.191.219:8080/backendGrupo5/users/add/profesor?correo='+user.email+'&userName='+user.userName+'&userType='+user.userType)
                .then(response=> response.text())
                .then(data =>
                    {
                        if(data==="mail ya se encuentra registrado"){
                            alert(data)
                            bool = false
                            user.email = ""
                            user.section = ""
                            return;
                        }
                        else{
                            alert(data)
                        }
                    })
                //fetch('http://localhost:8081/users/add/'+user.userName+'/'+user.userType+'/'+user.email)
                .then(response => fetch('http://142.93.191.219:8080/backendGrupo5/sections/update/'+user.email+'/'+user.section)
                .then(response => fetch('http://142.93.191.219:8080/backendGrupo5/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: true}))))
                //axios.post('http://localhost:8081/users/add', user)
                //.then(res => {
                //alert(res);
               // alert(res.data);
               // alert("USUARIO REGISTRADO C:")
                this.limpiarValores(1);
                }
           
            return;
            } 
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, idCareer: "", email: "", userName:""});
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
        componentDidMount(){
            
            fetch('http://142.93.191.219:8080/backendGrupo5/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: true}))          
            }

    
        render() {
            const sections =  this.state.sections.filter(function(seccion) {
              return seccion.profesor === null
                })
            const typeUser = this.props.typeUser;
            if(typeUser===2){
                return (
                    <body className="body">
                    <h1 className="header1">
                    <span className="texto"> Registrar Profesor </span>
                    </h1>
                    <form className="formulario">
                   
                    <div className="div3"><label className="label1"> Nombre:  </label> </div>
                    <div>
                        <input name= "userName" type = "text" value={this.state.userName}
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
                        <option > </option>
                        {sections.map((section =>
                        {
                            
                                return <option key={section.idSection} value={section.idSection}>{section.sectionName}</option>

                        
                        }
                        ))}
                           
                         </select>
                    </div>
                    <div className="div7">
                      <Button bsStyle="primary" type="button" onClick={(e) => this.subirFormulario(this.state)}>Registrarme</Button>
                      <Button bsStyle="warning" type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</Button>
                    </div>
                  </form>
                    </body>
                    
                );
            }
            else{
                alert("No tiene permisos para acceder a esta vista")
                return(
                    <div> {this.props.history.push("/")} </div>
                );
            }
            }
          }
    
    
    export default RegistroProfesor;