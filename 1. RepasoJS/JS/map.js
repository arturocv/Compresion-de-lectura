const carrito = ['producto1', 'producto2', 'producto3'];

const appContenedor = document.querySelector("#app");
// appContenedor.innerHTML = carrito;

let html = '';
carrito.forEach(producto => {
    html += `<li>${producto}</li>`;
});

// appContenedor.innerHTML = html;

//Imprimir usando MAP

carrito.map(productoMap =>{
    return 'El producto es: ' + productoMap;
})