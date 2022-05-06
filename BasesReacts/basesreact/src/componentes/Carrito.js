import React from 'react';
import './carrito.css';
import { CompraArticulo } from './CompraArticulo';
import Producto from './Producto';

const Carrito = ({carrito, agregarProducto}) => {

    //console.log(listaCarrito);
    return (
        <div className='carrito'>
            <h2>Tu carrito de compras</h2>

            {carrito.length === 0 
                ? <p>No hay elementos en el carrito</p>
                : carrito.map(producto => (
                    <Producto 
                        key={producto[0].id}
                        producto={producto[0]}
                        carrito={carrito}
                        agregarProducto={agregarProducto}
                    />
                )) }
           
        </div>
    )
}

export default Carrito;
