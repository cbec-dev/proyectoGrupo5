import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Registro.css';
import axios from 'axios';
import {Button} from 'react-bootstrap';


class Registro extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            careers: [],
            sections: [],
            isLoading: false,
            id:"",
            idCareer:"",
            sectionName:"",
            email:"",
            userName:"",
            userType: "",
            response: ""

        };
        }
        
    subirFormulario(e) {
        var user = {career: "", userName:"", section: "", email: "", userType: ""}
        user.career = e.idCareer;
        user.userType= 1;
        user.section = e.sectionName;
        user.userName = e.userName;
        user.email = e.email+ "@usach.cl";
        var verificador = e.email.split("@")
        
            if(verificador.length>1){
                alert("Correo invalido ingrese datos nuevamente")
                this.limpiarValores(1);
                return;
            }
        //ENTREGAR MENSAJE POR CORREO REPETIDOOO
        if(user.career==="" || user.section ==="" ||user.email ===""||user.userName===""){
            alert("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
     

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                }
              };
            //fetch('http://localhost:8081/users/add?career='+user.career+'&email='+user.email+'&section='+user.section+'&userName='+user.userName+'&userType='+user.userType)
            //.then(response => alert("Usuario Agregado"+response))
            fetch('http://142.93.191.219:8080/backendGrupo5/users/add/'+user.career+'/'+user.section+'/'+user.userName+'/'+user.userType+'/'+user.email)
            .then(response => response.text())
            .then(data=> alert(data))

            //axios.post('http://localhost:8081/users/add', user)
            //.then(res => {
            //alert(res);
           // alert(res.data);
           // alert("USUARIO REGISTRADO C:")
          
            }
       
        return;
        } 
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, email: "", userName:""});
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
        }
    componentDidMount(){
        fetch('http://142.93.191.219:8080/backendGrupo5/Careers/all')
            .then(response => response.json())
           .then(data => this.setState({careers: data, isLoading: false}));
            fetch('http://142.93.191.219:8080/backendGrupo5/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}));

    }

        render() {
            const careers = this.state.careers;
            const sections = this.state.sections;
            const isLoading = this.state.isLoading;
            if(isLoading){
                return <p> Loading...</p>

            }
                return (
                    <body className="body">
                    <h1 className="header1">
                    <span className="texto"> Registrar Alumno </span>
                    </h1>
                    <form className="formulario">
                        <div className="div1"> <label className="label4"> Carrera:  </label></div>
                    <div className="div2">
                        <select name="idCareer" component="select" onChange = {this.handleInputChange}>
                        <option > </option>

                        {careers.map((career) =>
                <option key={career.idCareer} value={career.idCareer}>{career.careerName}</option>
                        )}
                           
                         </select>
                    </div>
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
                        {sections.map((section) =>
                <option key={section.idSection} value={section.idSection}>{section.sectionName}</option>
                        )}
                           
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
          }
    
    
    export default Registro;
    