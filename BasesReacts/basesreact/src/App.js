import React, {useState} from 'react';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Producto from './componentes/Producto'; 
import Carrito  from './componentes/Carrito';

function App() {  

//Crear un listado de productos
const [productos, setProductos] = useState([
    { id: 1, nombre: 'Camisa', precio: 50},
    { id: 2, nombre: 'Pantalon', precio: 40},
    { id: 3, nombre: 'Gorra', precio: 35},
    { id: 4, nombre: 'Zapatos', precio: 42}
]);

  //State para un carrito de compras
  const [carrito, setCarrito] = useState([]);

  //Obtener fecha
  const fecha = new Date().getFullYear();

  return (
    <div className='App'>
      <Header
        titulo = "Tienda Virtual"
      />

      <h1>Lista de Productos</h1>

      {productos.map(producto => (
        <Producto
            key = {producto.id} 
            producto = {producto}
            carrito = {carrito}
            agregarProducto = {setCarrito}
            productos = {productos}
        />
      ))}

      <Carrito 
        carrito = {carrito}
        agregarProducto = {setCarrito}
      />

      <Footer 
        fecha = {fecha}
      />        
    </div>
  );
}

export default App;