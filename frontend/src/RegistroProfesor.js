import React, { Component } from 'react';
import logo from './logo.svg';
import './css/RegistroProfesor.css';

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
        }

        createSelectItems() {
            let sections = [];         
            for (let i = 0; i <= this.state.sections.length; i++) {             
                 sections.push(<option key={this.state.sections[i].idSection} value={this.state.sections[i].idSection}>{this.state.sections[i].sectionName}</option>);   
                 //here I will be creating my options dynamically based on
                 //what props are currently passed to the parent component
            }
            return sections;
        }  
        subirFormulario(e) {
            console.log("formulario enviado c:");
            var user = {userName:"", section: "", email: "", userType: ""}
            user.userType= 3;
            user.section = e.sectionName;
            user.userName = e.userName;
            user.email = e.email+ "@usach.cl";
    
            if(user.section ==="" ||user.email ===""||user.userName===""){
                alert("Debe llenar todos las casillas");
                return;
            }
            else{
                this.limpiarValores(1);
                console.log("Usuario: "+ user);
                console.log("Datos: "+ user.section);
                console.log("Datos: "+ user.email);
                console.log("Datos: "+ user.userName);
                console.log("Datos: "+ user.userType);
    
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                    }
                  };
                alert("formulario enviado");
                //fetch('http://localhost:8081/users/add?career='+user.career+'&email='+user.email+'&section='+user.section+'&userName='+user.userName+'&userType='+user.userType)
                //.then(response => alert("Usuario Agregado"+response))
                fetch('http://localhost:8081/users/add/'+user.userName+'/'+user.userType+'/'+user.email)
                .then(response => fetch('http://localhost:8081/sections/update/'+user.email+'/'+user.section)
                .then(response => alert("Seccion actualizada"+response)))

            
                
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
        componentDidMount(){
                fetch('http://localhost:8081/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}));
                console.log("SECCIONES: ", this.state.sections);
        }

    
        render() {
            const sections = this.state.sections;
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
                            if(section.profesor===null){
                                return <option key={section.idSection} value={section.idSection}>{section.sectionName}</option>

                            }
                            else{
                                <option > </option>
                            }
                        }
                        ))}
                           
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
            else{
                alert("No tiene permisos para acceder a esta vista")
                return(
                    <div> {this.props.history.push("/")} </div>
                );
            }
            }
          }
    
    
    export default RegistroProfesor;