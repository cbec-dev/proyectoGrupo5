import { Button } from 'react-bootstrap';
import { NavItem, ButtonGroup, DropdownButton, MenuItem, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { Grid, Row, Col } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarEnunciados.css';
import Enunciado from './verEnunciado';
import CardEnunciados from './CardEnunciados';
const imgUrls = ['https://source.unsplash.com/PC_lbSSxCZE/800x600','https://source.unsplash.com/lVmR1YaBGG4/800x600','https://source.unsplash.com/5KvPQc1Uklk/800x600','https://source.unsplash.com/GtYFwFrFbMA/800x600','https://source.unsplash.com/Igct8iZucFI/800x600','https://source.unsplash.com/M01DfkOqz7I/800x600','https://source.unsplash.com/MoI_cHNcSK8/800x600','https://source.unsplash.com/M0WbGFRTXqU/800x600','https://source.unsplash.com/s48nn4NtlZ4/800x600','https://source.unsplash.com/E4944K_4SvI/800x600','https://source.unsplash.com/F5Dxy9i8bxc/800x600','https://source.unsplash.com/iPum7Ket2jo/800x600'
];
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
        fetch('http://142.93.191.219:8080/backendGrupo5/api/statements/search/seccion/'+ e)
        .then(response => response.json())
        .then(data => this.setState({statements: data, isSelected: true}))
        

    }
    componentDidMount() {
        const usuarioActivo = this.props.activeUser;
        if(usuarioActivo!==null &&this.props.typeUser!==null){
            if(this.props.typeUser===1&&this.props.activeUser.section!==null){
                //alumno
                fetch('http://142.93.191.219:8080/backendGrupo5/sections/search/'+ this.props.activeUser.section.idSection)
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}))
                .then(fetch('http://142.93.191.219:8080/backendGrupo5/api/statements/search/seccion/'+ this.props.activeUser.section.idSection)
                .then(response => response.json())
                .then(data => this.setState({statements: data, isLoading: false})))
            }
            else if(this.props.typeUser===2){
                //coordinador
                fetch('http://142.93.191.219:8080/backendGrupo5/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}))
                .then(fetch('http://142.93.191.219:8080/backendGrupo5/api/statements/all')
                .then(response => response.json())
                .then(data => this.setState({statements: data, isLoading: false})))                

            }
            else if(this.props.typeUser===3){
                //profesor
                fetch('http://142.93.191.219:8080/backendGrupo5/sections/search/profesor/'+this.props.activeUser.idUser)
                .then(response =>  response.json())
                .then(data => fetch('http://142.93.191.219:8080/backendGrupo5/api/statements/search/seccion/'+ data.idSection)
                .then(response => response.json())
                .then(data => this.setState({statements: data, isLoading: false})))
                /*.then(data => this.setState({sections: data, isLoading: false}))
                .catch(err => {
                    console.log("fetch error" + err);
                    this.setState({sections:null, isLoading: false})
                })
                .then(fetch('http://142.93.191.219:8080/backendGrupo5/api/statements/search/seccion/'+ this.state.sections.idSection)
                .then(response => response.json())
                .then(data => this.setState({statements: data, isLoading: false})))*/
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
               <div className="container">
               <Grid className="container">
                <Row className="show-grid">  
                <Grid className="container" fluid="true"> 
                  {statements.map(statement=> 
                    <Col xs={6} md={4}>
                  <CardEnunciados link={imgUrls[Math.floor((Math.random() * 10) + 1)]} history={this.props.history} statement={statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>
                  </Col>
                    )}
                  
                </Grid>

                </Row>
                </Grid>
            </div>
            
                
            );
        }
        else if(typeUser===3){
            return (
                <div className="container">
               <Grid className="container">
                <Row className="show-grid">  
                <Grid className="container" fluid="true"> 
                  {statements.map(statement=> 
                    <Col xs={6} md={4}>
                  <CardEnunciados link={imgUrls[Math.floor((Math.random() * 10) + 1)]} history={this.props.history} statement={statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>
                  </Col>
                    )}
                  
                </Grid>

                </Row>
                </Grid>
            </div>
            
                
            );
        }
        else if(typeUser===1){
            return (
                <div className="container">
               <Grid className="container">
                <Row className="show-grid">  
                <Grid className="container" fluid="true"> 
                  {statements.map(statement=> 
                    <Col xs={6} md={4}>
                  <CardEnunciados link={imgUrls[Math.floor((Math.random() * 10) + 1)]} history={this.props.history} statement={statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>
                  </Col>
                    )}
                  
                </Grid>

                </Row>
                </Grid>
            </div>
            
                
            );

        }
        else{
            return <p> No hay secciones que mostrar para este usuario </p>
        }
        }
}

export default ListarEnunciados;