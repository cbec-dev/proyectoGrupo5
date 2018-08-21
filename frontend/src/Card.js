import './Card.css';
import axios from 'axios';
import React from 'react';
import { Redirect} from "react-router-dom";
import { Thumbnail, Panel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import url from '../../global.js';
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
    <strong>{this.props.evento.title}</strong> Click para editar.
  </Tooltip>)
}
 
  render() {
    const evento  = this.props.evento;
    
   
    return (
      
      <Panel className="grid" alt= "50x50">
      <OverlayTrigger placement="top" overlay={this.constructTooltip(evento)}>
      <LinkContainer to={{ pathname: '/editarEventos', state: { evento: evento} }}>
         <Thumbnail src={this.props.link} alt="50x50" className="thumbnail" onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}>
        
        </Thumbnail>
        
        </LinkContainer>
        </OverlayTrigger>
        <h3>{evento.title}</h3>
        <p>{evento.description}</p>
        <p>{evento.fecha}</p>
        <p>
        
          <div className="container-button">
            <LinkContainer to={{ pathname: '/editarEventos', state: { evento: evento} }}>
            <Button className="button1" eventKey={3.6} href="#">
                Editar Evento
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