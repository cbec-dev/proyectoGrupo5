import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarEnunciados.css';

class ListarEnunciados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: false
        };
        }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('http://104.236.68.75:8080/backendGrupo5/api/all')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}));
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
                  
            
                </tr>
                        {products.map((product) =>
                <tr key={product.id}>
                    <th>{product.id}</th>
                    <th>{product.codigo}</th>
                    <th>{product.precio}</th>
                </tr> 
                        )}
              </tbody>
            </table>
        </div>

            
        );
        }
}

export default ListarEnunciados;