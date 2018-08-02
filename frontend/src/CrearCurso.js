import React, { Component } from 'react';
import logo from './logo.svg';
import './css/CrearCurso.css';
import axios from 'axios';


class CrearCurso extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.removeProfesor = this.removeProfesor.bind(this);
        this.state = {
            products: [],
            isLoading: true,
            sectionName:"",
            teacherId:"",
            sections: [],
            profesores: [],
            response: "",

        };
        }
    removeProfesor(e){
        var section = e;
        console.log("REMOVER PROFESOR: " + e + "-" + section)
        this.setState({isLoading: true})
        fetch('http://localhost:8081/sections/removeP/'+section.idSection)
            .then(response => this.setState({response: response, isLoading: true}))
            .then(alert("Profesor removido correctamente"))
            .then(fetch('http://localhost:8081/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}))) 

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
            .then(this.setState({isLoading: true}))
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
            .then(data => this.setState({sections: data}))
            .then(fetch('http://localhost:8081/users/searchtype/'+3)
            .then(response => response.json())
            .then(data => this.setState({profesores: data, isLoading: false})))

    }
        render() {
            const sections =  this.state.sections;
            const isLoading = this.state.isLoading;
            const profesores = this.state.profesores;
            var prof_ = sections.map(section=> 
            {
                if(section.profesor!==null){
                    return section.profesor
                }
            }
                );
            //var eq = Object.toJSON(user1) == Object.toJSON(user2);
            prof_ = prof_.filter(profesor => profesor !== undefined)


            console.log("PROFESORES CON SECCION: ")
            console.log(prof_)
            console.log(prof_.includes(profesores[0]))
            console.log(prof_.includes(profesores[1]))
            console.log(prof_.includes(profesores[2]))
            console.log(prof_.includes(profesores[3]))
            console.log(prof_.includes(profesores[10]))
            console.log(prof_.includes(profesores[9]))
            console.log("----------------")
            const profesores_filtrados =  this.state.profesores.filter(function(profesor) {
              //return seccion.profesor === null
              return prof_.includes(JSON.stringify(profesor))===true

                })
            console.log("profesores pwp: ");
            console.log(profesores)
            console.log("------------")

            console.log("profesores sin seccion: ");
            console.log(profesores_filtrados)
            console.log("------------")
            if(isLoading===true){
                return(<p> Cargando...</p>)
            }
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
                    <th> Accion</th>
                    
                
                    </tr>
                            {sections.map((section) =>
                            {
                                if(section.profesor!==null){
                                   return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>{section.profesor.userName}</th>
                                        <th><button type="button" onClick={(e) => this.removeProfesor(section)}>Remover Profesor</button> </th>

                                        
                                        
                                    </tr> 
                                }
                                else{
                                    return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>sin asignar</th>
                                        <th> ------------DEBE IR UN SELECT CON PROFESORES DISPONIBLES----------</th>
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