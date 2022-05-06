import React from 'react'

function Producto({producto, carrito, agregarProducto, productos, listaCarrito}) {

    const {nombre, precio, id } = producto;


    //Agregar productos
    const seleccionarProducto = (rf) => {
        const itemSeleccionado = productos.filter(item => item.id === rf);
        agregarProducto([
            ...carrito,
            itemSeleccionado
        ]);
    }

    //Quitar productos
    const eliminarProducto = (rf) => {
        const itemSeleccionado = carrito.filter(item => item[0].id !== rf);
        agregarProducto(itemSeleccionado);
    }

    return (
        <div>
            <h2>{nombre}</h2>
            <p>${precio}</p>

            { productos 
            ?
                (
                    <button 
                        type="button"
                        onClick={ () => seleccionarProducto(id) }
                    >Comprar</button>
                )
            : 
                (
                    <button 
                        type="button"
                        onClick={ () => eliminarProducto(id) }
                    >Eliminar</button>
                )
            }
        </div>
  )
}

export default Producto;