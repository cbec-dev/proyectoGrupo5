import { LinkContainer } from "react-router-bootstrap";
import { NavItem } from "react-bootstrap";

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Holy guacamole!</strong> Check this info.
  </Tooltip>
);

class CardEnunciados extends React.Component {
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
    <strong>{this.props.statement.statementName}</strong> Click para ver.
  </Tooltip>)
}
 
  render() {
    const statement  = this.props.statement;
    
   
    return (
      
      <Panel className="grid" alt= "50x50">
      <OverlayTrigger placement="top" overlay={this.constructTooltip(statement)}>
      <LinkContainer to={{ pathname: '/MostrarEnunciado', state: { statement: statement, typeUser: this.props.typeUser, activeUser: this.props.activeUser} }}>
         <Thumbnail src={this.props.link} alt="50x50" className="thumbnail" onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}>
        
        </Thumbnail>
        
        </LinkContainer>
        </OverlayTrigger>
        <h3>{statement.statementName}</h3>
        <p>{statement.initialDate} - {statement.finalDate}</p>
        <p>{statement.section.profesor.userName}</p>
        <p>{statement.section.sectionName}</p>
        <p>
        
          <div className="container-button">
            <LinkContainer to={{ pathname: '/MostrarEnunciado', state: { statement: statement, typeUser: this.props.typeUser, activeUser: this.props.activeUser} }}>
            <Button className="button1" eventKey={3.6} href="#">
                Ver Enunciado
            </Button>
             </LinkContainer>
          
          <Button className="button" bsStyle="default">Button</Button>
          </div>
        </p>
      </Panel>
      
    );
  }
}
export default CardEnunciados;