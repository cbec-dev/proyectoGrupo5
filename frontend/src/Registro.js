import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Registro.css';
import axios from 'axios';
import {Button,ButtonGroup} from 'react-bootstrap';


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
            fetch('http://209.97.152.30:8080/backendGrupo5/users/add/'+user.career+'/'+user.section+'/'+user.userName+'/'+user.userType+'/'+user.email)
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
        fetch('http://209.97.152.30:8080/backendGrupo5/Careers/all')
            .then(response => response.json())
           .then(data => this.setState({careers: data, isLoading: false}));
            fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
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
                    <body>
                    <div className="columna2">&nbsp;</div>
                    <h1 className="columna2">
                    <span className="texto">Registrar Alumno </span>
                    </h1>
                    <form className="formulario">
                    <div className="columna">&nbsp;</div>
                    <div className="columna"> <label className="label4"> Carrera:  </label></div>

                    <div className="columna">&nbsp;</div>
                    <div className="columna">
                        <select name="idCareer" component="select" onChange = {this.handleInputChange}>
                        <option > </option>

                        {careers.map((career) =>
                <option key={career.idCareer} value={career.idCareer}>{career.careerName}</option>
                        )}
                           
                         </select>
                    </div>
                    <div className="columna">&nbsp;</div>
                    <div className="columna"><label className="label1"> Nombre:  </label> </div>

                    <div className="columna">&nbsp;</div>
                    <div className="columna">
                        <input name= "userName" type = "text" value={this.state.userName}
                        onChange = {this.handleInputChange} />
                    </div>

                    <div className="columna">&nbsp;</div>
                    <div className="columna"><label className="label2"> Email:  </label> </div>
                    
                    <div className="columna">&nbsp;</div>
                    <div className="columna">
                        <input name= "email" type = "text" value={this.state.email} 
                        onChange = {this.handleInputChange} /><label> @usach.cl  </label>
                    </div>

                    <div className="columna">&nbsp;</div>
                    <div className="columna"> <label className="label3"> Seccion:  </label></div>
                    
                    <div className="columna">&nbsp;</div>
                    <div className="columna">
                        <select name="sectionName" component="select" onChange = {this.handleInputChange}>
                        <option > </option>
                        {sections.map((section) =>
                <option key={section.idSection} value={section.idSection}>{section.sectionName}</option>
                        )}
                           
                         </select>
                    </div>
                    <div className="columna">&nbsp;</div>
                    <div className="columna">&nbsp;</div>
                    <div className="columna">&nbsp;</div>

                    <div className="columna">
                        <ButtonGroup>
                            <Button bsStyle="primary" type="button" onClick={(e) => this.subirFormulario(this.state)}>Registrarme</Button>
                            <Button bsStyle="warning" type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</Button>
                        </ButtonGroup>
                    </div>
                  </form>
                    </body>
                    
                );
            }
          }
    
    
    export default Registro;
    