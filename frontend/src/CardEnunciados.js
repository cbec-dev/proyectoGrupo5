import './css/Card.css';
import axios from 'axios';
import React from 'react';
import { Redirect} from "react-router-dom";
import { Thumbnail, Panel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";
import Solucion from "./Solucion";

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
);

class CardEnunciados extends React.Component {
  constructor(props) {
    super(props);
    this.solucionEnunciado = this.solucionEnunciado.bind(this)
    this.state = {
      isHovering: false,
      isSelectedSolution:false,


    };
 
  }
  solucionEnunciado(e){
        this.setState({isSelectedSolution: true, statement: e})
        console.log("solucion enunciado")
        return (<Redirect push to="/Solucion" render={()=><Solucion statement = {this.props.statement} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>);
        //return <Redirect to="/Solucion" render={()=><Solucion statement = {e} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>

        //return <Link to={{
  //pathname: '/Solucion',
  //state: { statement: e }
//}}/>

        /*return this.props.history.push({
            pathname:"/Solucion",
            state:{
                statement:this.state.statement,
                typeUser: this.props.typeUser,
                idUser: this.props.activeUser.idUser,
                history: this.props.history,
                activeUser: this.props.activeUser,

              }
            });*/
        //return <Link to={'/Solucion'+e }>Create Idea</Link>
    }
  componentDidMount(){

  }
constructTooltip(e){
  return (<Tooltip id="tooltip">
    <strong>{this.props.statement.statementName}</strong> Click para ver.
  </Tooltip>)
}
 
  render() {
    const statement  = this.props.statement;
    
   
    return (
      <div>
      <Panel className="grid" alt= "50x50">
      <OverlayTrigger placement="top" overlay={this.constructTooltip(statement)}>
      <LinkContainer to={{ pathname: '/MostrarEnunciado', state: { statement: statement} }}>
         <Thumbnail src={this.props.link} alt="50x50" className="thumbnail" onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}>
        
        </Thumbnail>
        
        </LinkContainer>
        </OverlayTrigger>
        <h3>{statement.statementName}</h3>
        <p>Fecha Inicial: {statement.initialDate} </p> 
        <p>Fecha Final: {statement.finalDate}</p>
        <p>{statement.section.profesor.userName}</p>
        <p>{statement.section.sectionName}</p>
        <p>
        
          <div className="container-button">
            <LinkContainer to={{ pathname: '/MostrarEnunciado', state: { statement: statement} }}>
            <Button className="button1" eventKey={3.6} href="#">
                Ver Enunciado
            </Button>
             </LinkContainer>
          
            <Button className="button1" onClick={(e) => this.solucionEnunciado(statement)} eventKey={3.6} href="#">
                Subir Solucion
            </Button>
      
          </div>
        </p>
      </Panel>
      
      </div>
    );
  }
}
export default CardEnunciados;