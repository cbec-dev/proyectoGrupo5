import { NavItem, ButtonGroup, Button, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Grid, Row, Col } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarSoluciones.css';
import VerSolucion from './verSolucion';
import MostrarSolucion from './MostrarSolucion';
import Card from './Card';
const imgUrls = ['https://source.unsplash.com/PC_lbSSxCZE/800x600','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600','https://source.unsplash.com/Igct8iZucFI/800x600','https://source.unsplash.com/M01DfkOqz7I/800x600','https://source.unsplash.com/MoI_cHNcSK8/800x600','https://source.unsplash.com/M0WbGFRTXqU/800x600','https://source.unsplash.com/s48nn4NtlZ4/800x600','https://source.unsplash.com/E4944K_4SvI/800x600','https://source.unsplash.com/F5Dxy9i8bxc/800x600','https://source.unsplash.com/iPum7Ket2jo/800x600'
];
class ListarSoluciones extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            solutions: [],
            statements: [],
            statement:"",
            section: "",
            isLoading: false,
            isSelected: false,
            isSelectedSolutionStatement: false,
            isSelectedSolution:false,
            idStatement: "",
            solutionsBySection: [],
            sections: [],
            solutionsByUser: [],
            allSolutions: [],
            solutionsByStatement: [],
            users: [],
            solution: "",
            prof_section: "",
        };
        this.mostrarSolucion = this.mostrarSolucion.bind(this)
        }
    mostrarSolucion(object, type){
        if(type==="enunciado"){
            fetch('http://209.97.152.30:8080/backendGrupo5/solutions/searchbyStatement/' + object.idStatement)
            .then(response => response.json())
            .then(data => this.setState({solutions: data, isSelectedSolutionStatement: true}))
        }
        else if(type==="alumno"){
            this.setState({solution: object, isSelectedSolutionStatement: true})
            

        }
    }
    componentDidMount(){
        if(this.props.activeUser!==null){
            if(this.props.activeUser.userType===1){
                fetch('http://209.97.152.30:8080/backendGrupo5/solutions/searchbyUser/' + this.props.activeUser.idUser)
                .then(response => response.json())
                .then(data => this.setState({solutions: data}))

            }
            else if(this.props.activeUser.userType===2 || this.props.activeUser.userType===3){
                fetch('http://209.97.152.30:8080/backendGrupo5/users/searchtype/'+"1")
                .then(response => response.json())
                .then(data => this.setState({users: data}))
                .then(fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data})))
                .then(fetch('http://209.97.152.30:8080/backendGrupo5/api/statements/all')
                .then(response => response.json())
                .then(data => this.setState({statements: data})))
                .then(fetch('http://209.97.152.30:8080/backendGrupo5/solutions/all')
                .then(response => response.json())
                .then(data => this.setState({allSolutions: data})))
            }
            else if(this.props.activeUser.typeUser===3){
                fetch('http://209.97.152.30:8080/backendGrupo5/sections/search/profesor/'+this.props.activeUser.idUser)
                .then(response => response.json())
                .then(data => this.setState({prof_section: data}))
                .then(fetch('http://209.97.152.30:8080/backendGrupo5/solutions/all')
                .then(response => response.json())
                .then(data => this.setState({allSolutions: data})))
            }
        }   

    }
    render() {
        const users = this.state.users;
        const sections = this.state.sections;
        const statements = this.state.statements;
        const solutions = this.state.solutions;
        const allSolutions = this.state.allSolutions;
        const pSection = this.state.prof_section;
        console.log(allSolutions)
        if(this.props.typeUser===2){
            return(
                <div className="container">
                <Grid className="container">
                <Row className="show-grid">  
                <Grid className="container" fluid="true"> 
                  {allSolutions.map(solution=> 
                    <Col xs={6} md={4}>
                  <Card link={imgUrls[Math.floor((Math.random() * 10) + 1)]} solution={solution}/>
                  </Col>
                    )}
                  
                </Grid>

                </Row>
                </Grid>
            </div>
            );
        }
        else if(this.props.typeUser===3 ){
        var sol_ = allSolutions.map(solution=> 
            {
                if(solution.statement.section.idSection===pSection.idSection){
                    return solution
                }
            }
                );
            //var eq = Object.toJSON(user1) == Object.toJSON(user2);
            //prof_ = prof_.filter(profesor => profesor !== undefined)
            //var i = 0
            //var array = []
            //var largo = profesores.length
            //for(i=0; i<largo;i++){
            //    if(this.verificar(prof_, profesores[i])===true){
            //        array.push(profesores[i])

            //    }
            //}
            return (
                <div className="container">
                <Grid className="container">
                <Row className="show-grid">  
                <Grid className="container" fluid="true"> 
                  {sol_.map(solution=> 
                    <Col xs={6} md={4}>
                  <Card link={imgUrls[Math.floor((Math.random() * 10) + 1)]} solution={solution}/>
                  </Col>
                    )}
                  
                </Grid>

                </Row>
                </Grid>
            </div>
            );
        
        }
        else if(this.props.typeUser===1){
            console.log(solutions)
            if(solutions.length===0){
                return(
                    <p>No posee soluciones</p>
                    );
            }
            return (
                <div className="container">
               <Grid className="container">
                <Row className="show-grid">  
                <Grid className="container" fluid="true"> 
                  {solutions.map(solution=> 
                    <Col xs={6} md={4}>
                  <Card link={imgUrls[Math.floor((Math.random() * 10) + 1)]} solution={solution}/>
                  </Col>
                    )}
                  
                </Grid>
                </Row>
                </Grid>
            </div>
            
                
            );

        }
        }
}

export default ListarSoluciones;