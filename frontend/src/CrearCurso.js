import React, { Component } from 'react';
import logo from './logo.svg';
import './css/CrearCurso.css';
import axios from 'axios';
import {ProgressBar,Button,ButtonGroup,Table} from "react-bootstrap";


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
            prof: ""

        };
        }
    agregarProfesor(profesor, section){
        console.log("AGREGAR PROFESOR: ")
        console.log(profesor)
        console.log(section)
        this.limpiarValores(1)
        if(profesor!==null && section !==null && profesor !== undefined && section !== undefined && profesor!== ""){
        fetch('http://209.97.152.30:8080/backendGrupo5/sections/update/'+profesor+'/'+section.idSection)
                .then(response => fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false})))
        }
        else{
            alert("Debe seleccionar un profesor!")
        }
    }
    removeProfesor(e){
        var section = e;
        console.log("REMOVER PROFESOR: " + e + "-" + section)
        this.setState({isLoading: true})
        fetch('http://209.97.152.30:8080/backendGrupo5/sections/removeP/'+section.idSection)
            .then(response => this.setState({response: response, isLoading: true}))
            .then(alert("Profesor removido correctamente"))
            .then(fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}))) 

    }
    subirFormulario(e) {
        this.section = {sectionName: ""}
        this.section.sectionName = e.sectionName;
       
        if(this.section.sectionName ===""){
            alert("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            fetch('http://209.97.152.30:8080/backendGrupo5/sections/addSection?sectionName='+this.section.sectionName)
            .then(response => console.log("Seccion Agregada"+response))
            .then(this.setState({isLoading: true}))
            .then(fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}))) 
            }
       
        return;
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, sectionName: "", teacherId:"", prof: ""});
            this.render();
        }
    }
    verificar(array, object){
        var largo = array.length
        var i;
        var contador=0;
  
        for(i = 0; i < largo; i++){ 
            if(object.idUser!==array[i].idUser){
                contador++;
            }
        }
        if(contador===largo){
            return true
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
        fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data}))
            .then(fetch('http://209.97.152.30:8080/backendGrupo5/users/searchtype/'+3)
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
            var i = 0
            var array = []
            var largo = profesores.length
            for(i=0; i<largo;i++){
                if(this.verificar(prof_, profesores[i])===true){
                    array.push(profesores[i])

                }
            }
            //const profesores_filtrados =  this.state.profesores.filter(function(profesor) {
              //return seccion.profesor === null
              //return this.verificar(prof_,profesor)

                //})
          
            if(isLoading===true){
                return(<p className="p1">< ProgressBar  active now={100} /></p>)
            }
            if(this.props.typeUser ==2){
                return (
                    <body className="body">
                    <h1 className="header1">
                    <span className="texto"> Registrar Seccion</span>
                    </h1>
                            
                <Table responsive="true">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Profesor Encargado</th>
                        <th>Profesores Disponibles</th>
                        <th> Accion </th>
                
                    </tr>
                </thead>
                <tbody>
                            {sections.map((section) =>
                            {
                                if(section.profesor!==null){
                                   return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>{section.profesor.userName}</th>
                                        <th><span className=" glyphicon glyphicon-minus "></span></th>
                                        <th><Button  bsStyle="danger" onClick={(e) => this.removeProfesor(section)}><span className="glyphicon glyphicon-trash"></span><span className="glyphicon glyphicon-user"></span></Button> </th>
                                        
                                        
                                        
                                    </tr> 
                                }
                                else{
                                    return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th><span className=" glyphicon glyphicon-minus "></span></th>
                                        <th> 
                                        <div className="div6">
                                            <select name="prof" component="select" onChange = {this.handleInputChange}>
                                            <option > </option>
                                            {array.map((profesor =>
                                            {
                                                
                                                    return <option key={profesor.idUser} value={profesor.correo}>{profesor.userName}</option>

                                            
                                            }
                                            ))}
                                               
                                             </select>
                                        </div>

                                        </th>
                                        <th><Button bsStyle="success" onClick={(e,d) => this.agregarProfesor(this.state.prof, section)}><span className="glyphicon glyphicon-plus"></span><span className="glyphicon glyphicon-user"></span></Button></th>

                                    </tr>

                                }
                            }
                              )}
                </tbody>
                </Table>

                    <form className="formulario">
                   
                    <div className="div3"><label className="label1"> Nombre Seccion</label> </div>
                    <div>
                        <input name= "sectionName" type = "text" value={this.state.sectionName}
                        onChange = {this.handleInputChange} />
                    </div>
                    
                    <div className="div7">&nbsp;</div>
                    <div className="div7">
                    <ButtonGroup>
                      <Button bsStyle="primary" onClick={(e) => this.subirFormulario(this.state)}>Agregar Seccion</Button>
                      <Button bsStyle="warning" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</Button>
                    </ButtonGroup>
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