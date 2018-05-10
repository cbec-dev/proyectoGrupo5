import React, { Component } from 'react';
import logo from './logo.svg';
import './css/CrearCurso.css';

class CrearCurso extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            products: [],
            isLoading: false,
            sectionName:"",
            teacherId:"",

        };
        }
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.section = {sectionName: "", teacherId: ""}
        this.section.teacherId = e.teacherId;
        this.section.sectionName = e.sectionName;
       
        if(this.user.idCareer==="" || this.section.sectionName ==="" ||this.section.teacherId ===""){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.user);
            console.log("Datos: "+ this.user.sectionName);
            console.log("Datos: "+ this.user.teacherId);
            
            fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.user.codigo+'&nombre='+this.user.nombre+'&fecha='+this.user.fecha+'&categoria='+this.user.categoria+'&precio='+this.user.precio)
            .then(response => console.log("Producto Agregado"+response)) 
            }
       
        return;
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, sectionName: "", teacherId:""});
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
                    <span className="texto"> Registrar Curso: </span>
                    </h1>
                    <form className="formulario">
                   
                    <div className="div3"><label className="label1"> Nombre Seccion:  </label> </div>
                    <div>
                        <input name= "sectionName" type = "text" value={this.state.sectionName}
                        onChange = {this.handleInputChange} />
                    </div>
                    
                    <div className="div6"> <label className="label3"> Profesor:  </label></div>

                    <div className="div6">
                        <select name="teacherName" component="select" onChange = {this.handleInputChange}>
                        value={this.state.teacherId}
                            <option value={"id-profesor"}>UWU</option>
                            <option value={"id-profesor"}>OWO</option>
                           
                         </select>
                    </div>
                    <div className="div7">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Agregar Curso</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
                    </body>
                    
                );
            }
          }
    
    
    export default CrearCurso;