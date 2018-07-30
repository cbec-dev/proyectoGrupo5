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
            sections: [],

        };
        }
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.section = {sectionName: ""}
        this.section.sectionName = e.sectionName;
       
        if(this.section.sectionName ===""){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            fetch('http://localhost:8081/sections/addSection?sectionName='+this.section.sectionName)
            .then(response => console.log("Seccion Agregada"+response))
            .then(fetch('http://localhost:8081/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}))) 
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

    componentDidMount(){
        
        fetch('http://localhost:8081/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}))

    }
        render() {
            const sections =  this.state.sections;
            if(this.props.typeUser ==2){
                return (
                    <body className="body">
                    <h1 className="header1">
                    <span className="texto"> Registrar Curso: </span>
                    </h1>
                            
                <table id="t02">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Profesor Encargado</th>
                    
                
                    </tr>
                            {sections.map((section) =>
                            {
                                if(section.profesor!==null){
                                   return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>{section.profesor.userName}</th>
                                    </tr> 
                                }
                                else{
                                    return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>sin asignar</th>
                                    </tr>

                                }
                            }
                              )}
                </tbody>
                </table>

                    <form className="formulario">
                   
                    <div className="div3"><label className="label1"> Nombre Seccion:  </label> </div>
                    <div>
                        <input name= "sectionName" type = "text" value={this.state.sectionName}
                        onChange = {this.handleInputChange} />
                    </div>
                
                    <div className="div7">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Agregar Curso</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
                    </body>
                    
                );
                }
            else{
                alert("No posee permisos para acceder a esta vista");
                return(
                    <div> {this.props.history.push("/")} </div>
                    );
                }
            }
          }
    
    
    
    export default CrearCurso;