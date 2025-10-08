// Array principal del ejercicio, conteniendo las 13 frutas que vamos a utilizar
const frutas = [
  { id: 1, nombre: "Arandano", precio: 5000, ruta_img: "img/arandano.jpg" },
  { id: 2, nombre: "Anana", precio: 3000, ruta_img: "img/anana.jpg" },
  { id: 3, nombre: "Frambuesa", precio: 4000, ruta_img: "img/frambuesa.png" },
  { id: 4, nombre: "Frutilla", precio: 3000, ruta_img: "img/frutilla.jpg" },
  { id: 5, nombre: "Kiwi", precio: 2000, ruta_img: "img/kiwi.jpg" },
  { id: 6, nombre: "Mandarina", precio: 800, ruta_img: "img/mandarina.jpg" },
  { id: 7, nombre: "Manzana", precio: 1500, ruta_img: "img/manzana.jpg" },
  { id: 8, nombre: "Naranja", precio: 9000, ruta_img: "img/naranja.jpg" },
  { id: 9, nombre: "Pera", precio: 2500, ruta_img: "img/pera.jpg" },
  { id: 10, nombre: "Pomelo-amarillo", precio: 2000, ruta_img: "img/pomelo-amarillo.jpg" },
  { id: 11, nombre: "Pomelo-rojo", precio: 2000, ruta_img: "img/pomelo-rojo.jpg" },
  { id: 12, nombre: "Banana", precio: 1000, ruta_img: "img/banana.jpg" },
  { id: 13, nombre: "Sandia", precio: 2500, ruta_img: "img/sandia.jpg" },
];

// Variables JS-HTML
// Acá sencillamente vinculamos nuestros contenedores en HTML con una variable en JavaScript para poder referenciarlo luego

let contenedorFrutas = document.querySelector("#contenedorFrutas");

let barraBusqueda = document.querySelector("#barraBusqueda");

let contenedorCarrito = document.querySelector("#contenedorCarrito");

let contenedorAlumno = document.querySelector("#nombreAlumno");

let contadorCarrito = document.querySelector("#contadorCarrito");

let totalCarrito = document.querySelector("#totalCarrito");

let botonOrdenarPorNombre = document.querySelector("#botonOrdenarPorNombre");

let botonOrdenarPorPrecio = document.querySelector("#botonOrdenarPorPrecio");

let botonVaciar = document.querySelector("#botonVaciar");


// Objeto alumno y función imprimirDatosAlumno():
// En este caso tenemos una función sencilla que define los datos a mostrar en pantalla y efectivamente los mostramos con innerHTML.

const alumno = {
    dni: "42727066",
    nombre: "Matías",
    apellido: "Buttafuoco"
}
function imprimirDatosAlumno() {
    let cartaAlumno = `${alumno.nombre} ${alumno.apellido}`
    console.log(cartaAlumno + ` - ${alumno.dni}`);
    contenedorAlumno.innerHTML = cartaAlumno;
}

/* 
Evento barra búsqueda: Esto funciona para que cuando el usuario escriba algo en nuestra variable barraBusqueda, se ejecute la función pasada.
Evento boton ordenarPorPrecio y ordenarPorNombre: Esto funciona para que cuando apreten los botones se ejecuten las funciones asignadas
*/

barraBusqueda.addEventListener("keyup", filtrarFrutas);
botonOrdenarPorNombre.addEventListener("click", ordenarPorNombre);
botonOrdenarPorPrecio.addEventListener("click", ordenarPorPrecio);


// Creacion del carrito, el condicional funiona para detectar si existe en memoria un carrito ya creado, en caso positivo, lo parseamos y lo utilizamos

let carritoDeCompras = [];

if (localStorage.getItem("carrito")) {
  let carrito = localStorage.getItem("carrito");
  carritoDeCompras = JSON.parse(carrito);
  mostrarCarrito();
}

/* 
  Funcion mostrarFrutas():
  Acá principalmente declaramos una variable donde vamos a introducir todo nuestro código HTML que se mostrará en pantalla.
  Luego, utilizando el forEach, pasamos por cada uno de los componentes del array pasado por parametro y por cada uno de ellos ejecutamos esa pieza de código que contiene el HTML que se mostrará en pantalla. 
  Además, el botón tiene un componente onclick que llama a otra función. 
  Finalmente, con innerHTML lo mostramos.
*/

function mostrarFrutas(array) {
  let cartaFrutas = "";
  array.forEach((fruta) => {
    cartaFrutas += `
            <div class="card-fruta">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}"/>
            <h3>${fruta.nombre}</h3>
            <p>$ ${fruta.precio}</p>
            <button class="boton-agregar" onclick="agregarAlCarrito(${fruta.id})">Agregar al carrito</button>
            </div>`;
  });
  contenedorFrutas.innerHTML = cartaFrutas;
}

/* Función filtrar frutas, instanciamos una variable donde se almacenará el valor ingresado en la barra de busqueda y ademas, convertimos ese valor a minusculas, por si el usuario decide ingresar el texto en mayusculas quiero que siga funcionando, utilizamos filter e includes, comparamos con el nombre de la fruta (en lowerCase para que sea igual al valorBusqueda) con los existentes en el array, en caso de que exista al menos una coincidencia, recurrimos a mostrarFrutas() de ese filtro hecho, imaginando el caso en el que no exista ninguna coincidencia, se alerta al usuario con un mensaje en pantalla
*/

function filtrarFrutas() {

  let valorBusqueda = barraBusqueda.value.toLowerCase();  

  let frutasFiltradas = frutas.filter((f) =>
  f.nombre.toLowerCase().includes(valorBusqueda)
);

  if (frutasFiltradas.length > 0) {
    mostrarFrutas(frutasFiltradas);
  } else {
    contenedorFrutas.innerHTML = `<p class ="mensaje-vacio">No se encontraron conincidencias</p>`
  }

}

/* 
Funcion agregarAlCarrito(): 
Esta función va a recibir un id asociado al botón en la carta de la fruta, con ese ID vamos a utilizar el find para matchearlo con el del array frutas, una vez hallado, usamos push y agregamos ese elemento al carrito de compras, en este caso no vamos a validar que los objetos se puedan agregar una sola vez ya que un usuario podría comprar más de una fruta.
Finalmente, lo mostramos en consola, actualizamos el localStorage y nos aseguramos de usar mostrarCarrito() ya que si estamos utilizando la función agregar es porque se modificó.
*/

function agregarAlCarrito(id) {
  let frutaSeleccionada = frutas.find((f) => f.id === id);
  
  carritoDeCompras.push(frutaSeleccionada);
  
  console.log(carritoDeCompras);

  localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));

  mostrarCarrito();
}

/* 
  mostrarCarrito(): Esta función es prácticamente idéntica en funcionamiento a mostrarFrutas, solo que acá definimos contenedorCarrito que es donde vamos a insertar el código HTML para poder mostrar en pantalla los seleccionados, nuevamente usamos foreach, recorremos la lista, imprimimos por cada elemento y finalmente lo mostramos en el DOM.
  Además, incorporamos el contador y el total de carrito acá para que se actualice constantemente, ponemos un condicional, en caso de que el carrito este vacío, lo mostramos, y en caso de tener productos, especificamos la cantidad/monto. A ultimo momento cree tambien la variable botonVaciarCarrito para agregarla fuera del contenedorCarrito, asi quedaba mas parecido a la imagen que pasaron.
*/ 

function mostrarCarrito() {
  let cartaCarrito = "<ul>";
  carritoDeCompras.forEach((elemento, indice) => {
    cartaCarrito += `
          <li class="bloque-item">
            <p class="nombre-item">${elemento.nombre} - $${elemento.precio}</p>
            <button class="boton-eliminar" onclick='eliminarProducto(${indice})'>Eliminar</button>
          </li>`;
  });
  cartaCarrito += `</ul>`

  let botonVaciarCarrito = "";

  if (carritoDeCompras.length > 0) {
    botonVaciarCarrito = `<button class="boton-vaciar" onclick='vaciarCarrito()'>Vaciar Carrito</button>`;
    
  }
  contenedorCarrito.innerHTML = cartaCarrito;
  botonVaciar.innerHTML = botonVaciarCarrito;

  // Contador de carrito
  let labelCarrito = "";

  if (carritoDeCompras.length == 0) {
    labelCarrito += `<p id="contadorCarrito">Carrito Vacío</p>`
  } else {
    labelCarrito += `<p id="contadorCarrito">Carrito: ${carritoDeCompras.length} productos</p>`
  }
  contadorCarrito.innerHTML = labelCarrito;

  // Total de carrito
  let labelTotal = "";

  totalProductos = 0;

  carritoDeCompras.forEach((producto) => {
    totalProductos += producto.precio;
  })

  if (carritoDeCompras.length == 0) {
    labelTotal += `<p id="contadorCarrito">Total: $0</p>`
  } else {
    labelTotal += `<p id="contadorCarrito">Total: $${totalProductos}</p>`
  }
  totalCarrito.innerHTML = labelTotal;
}

/* 
  vaciarCarrito(): 
  En este caso, vaciar carrito lo que va a hacer es volver a definir el array como [] para borrar todos los productos que estén dentro, modificamos el carrito, por ende, tenemos que actualizar el localStorage, y en este caso decidí agregar mostrarCarrito() para que el botón de Vaciar Carrito no desaparezca de la pantalla
*/

function vaciarCarrito() {
  carritoDeCompras = [];
  localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
  mostrarCarrito();
  contenedorCarrito.innerHTML = "";
  botonVaciar.innerHTML = "";
}

/* 
  eliminarProducto(): Esta función es sencilla, solamente le pasamos por parámetro un índice, el cual luego insertaremos en un splice para poder remover al objeto del carrito, por supuesto, como hicimos una modificación, nuevamente tenemos que actualizar el localStorage.
*/
function eliminarProducto(indice) {
  carritoDeCompras.splice(indice,1);
  localStorage.setItem("carrito",JSON.stringify(carritoDeCompras));
  mostrarCarrito();
}

/*
ordenarPorNombre(): En este caso, vamos a crear una variable frutasOrdenadas para no modificar el array original, sobre este, vamos a utilizar el método sort que nos permite ordenar el array, para esta funcion, comparamos usando el atributo nombre de las frutas (con localCompare porque en este caso es un string)
*/
function ordenarPorNombre() {
  let frutasOrdenadas = frutas;
  
  frutasOrdenadas.sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );
  mostrarFrutas(frutasOrdenadas);
}

/*
ordenarPorPrecio(): Al igual que la funcion anterior, creamos una variable para no modificar el array original, tambien vamos a utilizar el método sort, pero para esta funcion, comparamos usando el atributo precio de las frutas.
*/
function ordenarPorPrecio() {
  let frutasOrdenadas = frutas;
  
  frutasOrdenadas.sort((a, b) => 
    a.precio - b.precio
  );
  mostrarFrutas(frutasOrdenadas);
}


function init() {
    imprimirDatosAlumno();
    mostrarFrutas(frutas);
}

init();