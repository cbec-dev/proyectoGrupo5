import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarEnunciados.css';

class ListarEnunciados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            section: "",
            isLoading: false
        };
        }

    componentDidMount() {
        const usuarioActivo = this.props.activeUser;
        if(usuarioActivo!=null){
            fetch('http://localhost:8081/sections/search/{IdSection}'+ usuarioActivo.sectio.idSection)
            .then(response => response.json())
            .then(data => this.setState({section: data, isLoading: false}));
        }
        this.setState({isLoading: true});

        
        }

    render() {
        const {products, isLoading} = this.state;
        if (isLoading) {
            return <p>Cargando...</p>;
        }


        return (
            <div>
                          
            <table id="t02">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>PLACEHOLDER</th>
                  <th>Accion</th>
                  
            
                </tr>
                        {products.map((product) =>
                <tr key={product.id}>
                    <th>{product.id}</th>
                    <th>{product.codigo}</th>
                    <th>{product.precio}</th>
                    <th> UWUWUWUUWUW</th>
                    <th> <button href="/verEnunciado:id">Ver Enunciado</button></th>
                </tr> 
                        )}
              </tbody>
            </table>
        </div>

            
        );
        }
}

export default ListarEnunciados;