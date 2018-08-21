import { Button } from 'react-bootstrap';
import { NavItem, ButtonGroup, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Grid, Row, Col } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarEnunciados.css';
import Enunciado from './verEnunciado';
import CardEnunciados from './CardEnunciados';
class ListarEnunciados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            statement:"",
            section: "",
            sections:[],
            isLoading: true,
            statementSelected:"",
            isSelected: false,
        };
        this.verEnunciados = this.verEnunciados.bind(this)
        }
    verEnunciados(e){
        fetch('http://209.97.152.30:8080/backendGrupo5/api/statements/search/seccion/'+ e)
        .then(response => response.json())
        .then(data => this.setState({statements: data, isSelected: true}))
        

    }
    componentDidMount() {
        const usuarioActivo = this.props.activeUser;
        if(usuarioActivo!==null &&this.props.typeUser!==null){
            if(this.props.typeUser===1&&this.props.activeUser.section!==null){
                //alumno
                fetch('http://209.97.152.30:8080/backendGrupo5/sections/search/'+ this.props.activeUser.section.idSection)
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}));
            }
            else if(this.props.typeUser===2){
                //coordinador
                fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}))
                .then(fetch('http://209.97.152.30:8080/backendGrupo5/api/statements/all')
                .then(response => response.json())
                .then(data => this.setState({statements: data, isLoading: false})))                

            }
            else if(this.props.typeUser===3){
                //profesor
                fetch('http://209.97.152.30:8080/backendGrupo5/sections/search/profesor/'+this.props.activeUser.idUser)
                .then(response =>  response.json())
                .then(data => this.setState({sections: data, isLoading: false}))
                .catch(err => {
                    console.log("fetch error" + err);
                    this.setState({sections:null, isLoading: false})
                });
            }
            else{
                this.setState({section: null, sections: null, isLoading: false});
            }
        }
        else{
            this.setState({section: null, sections: null, isLoading: true});
            return;
        }

        
        }

    render() {
        const section = this.state.section;
        const sections = this.state.sections;
        const typeUser = this.props.typeUser;
        const activeUser = this.props.activeUser;
        const isLoading = this.state.isLoading;
        const statements = this.state.statements;
       
        if (isLoading) {
            return <p>Cargando...</p>;
        }

        if(typeUser===2 && sections!==null){
            return (
               <div>
               <Grid>
                <Row>  
                <Grid className="container" fluid="true"> 
                  {statements.map(statement=> 
                    <Col xs={6} md={4}>
                  <CardEnunciados link={imgUrls[Math.floor((Math.random() * 10) + 1)]} statement={statement}/>
                  </Col>
                    )}
                  
                </Grid>

                </Row>
                </Grid>
            </div>
            
                
            );
        }
        else if(typeUser===3&&sections!==null){
            return (
                <div>
                            
                <table id="t02">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Profesor Encargado</th>
                    <th>Accion</th>
                    
                
                    </tr>
                            
                                   <tr key={sections.idSection}>
                                        <th>{sections.idSection}</th>
                                        <th>{sections.sectionName}</th>
                                        <th>{sections.profesor.userName}</th>
                                        <th> <Button bsStyle="primary" onClick={(e) => this.verEnunciados(sections.idSection)}>Ver Enunciados</Buttonutton></th>
                                    </tr> 
                                
                            
                              
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <Enunciado statements = {this.state.statements} callBackFromParentStatement= {this.props.callBackFromParentStatement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser} history = {this.props.history}/>:
                    null
                     }
                </div>
                    
            </div>
            
                
            );
        }
        else if(typeUser===1){
            return (
                <div>
                            
                <table id="t02">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Profesor Encargado</th>
                    <th>Accion</th>
                    
                
                    </tr>
                            
                                   <tr key={sections.idSection}>
                                        <th>{sections.idSection}</th>
                                        <th>{sections.sectionName}</th>
                                        <th>{sections.profesor.userName}</th>
                                        <th> <Button bsStyle="primary" onClick={(e) => this.verEnunciados(sections.idSection)}>Ver Enunciados</Button></th>
                                    </tr> 
                                
                            
                              
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <Enunciado statements = {this.state.statements} callBackFromParentStatement= {this.props.callBackFromParentStatement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser} history = {this.props.history}/>:
                    null
                     }
                </div>
                    
            </div>
            
                
            );

        }
        else{
            return <p> No hay secciones que mostrar para este usuario </p>
        }
        }
}

export default ListarEnunciados;