import './css/Card.css';
import axios from 'axios';
import React from 'react';
import { Redirect} from "react-router-dom";
import { Thumbnail, Panel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
);

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
 
  }
  componentDidMount(){

  }
constructTooltip(e){
  return (<Tooltip id="tooltip">
    <strong>{this.props.solution.solutionName}</strong> Click para ver.
  </Tooltip>)
}
 
  render() {
    const solution  = this.props.solution;
    
   
    return (
      
      <Panel className="grid" alt= "50x50">
      <OverlayTrigger placement="top" overlay={this.constructTooltip(solution)}>
      <LinkContainer to={{ pathname: '/MostrarSolucion', state: { solution: solution, statement: solution.statement, typeUser: this.props.typeUser, activeUser: this.props.activeUser} }}>
         <Thumbnail src={this.props.link} alt="50x50" className="thumbnail" onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}>
        
        </Thumbnail>
        
        </LinkContainer>
        </OverlayTrigger>
        <h3>{solution.solutionName}</h3>
        <p>{solution.statement.statementName}</p>
        <p>{solution.user.userName}</p>
        <p>{solution.user.section.sectionName}</p>
        <p>
        
          <div className="container-button">
            <LinkContainer to={{ pathname: '/MostrarSolucion', state: { solution: solution, statement: solution.statement, typeUser: this.props.typeUser, activeUser: this.props.activeUser} }}>
            <Button className="button1" eventKey={3.6} href="#">
                Ver Solucion
            </Button>
             </LinkContainer>
          
          <Button className="button" bsStyle="default">Button</Button>
          </div>
        </p>
      </Panel>
      
    );
  }
}
export default Card;