// =====================================
// VARIABLES
// =====================================

// CONTADOR
let contador = 0;

// TOTAL
let total = 0;

// ARRAY DEL CARRITO
let carrito = [];

// BOTONES AGREGAR
const botonesAgregar = document.querySelectorAll(".agregar-carrito");

// CONTADOR HTML
const contadorCarrito = document.getElementById("contador-carrito");

// MODAL
const cartModal = document.getElementById("cartModal");

// BOTONES
const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");

// CONTENEDOR PRODUCTOS
const cartItems = document.getElementById("cartItems");

// TOTAL HTML
const cartTotal = document.getElementById("cartTotal");

// =====================================
// ABRIR CARRITO
// =====================================

abrirCarrito.addEventListener("click", () => {
  cartModal.classList.add("active");
});

// =====================================
// CERRAR CARRITO
// =====================================

cerrarCarrito.addEventListener("click", () => {
  cartModal.classList.remove("active");
});

// =====================================
// AGREGAR PRODUCTOS
// =====================================

botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", () => {
    // CARD
    const card = boton.closest(".card");

    // NOMBRE
    const nombre = card.querySelector(".card-title").textContent;

    // PRECIO
    const precioTexto = card.querySelector(".card-text").textContent;

    // LIMPIAR PRECIO
    const precio = parseInt(precioTexto.replace(/\D/g, ""));

    // IMAGEN
    const imagen = card.querySelector("img").src;

    // PRODUCTO
    const producto = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    };

    // AGREGAR AL ARRAY
    carrito.push(producto);

    // ACTUALIZAR CONTADOR
    contador++;

    contadorCarrito.textContent = contador;

    // ACTUALIZAR TOTAL
    total += precio;

    cartTotal.textContent = total.toLocaleString();

    // ACTUALIZAR HTML
    actualizarCarrito();

    // ALERTA
    mostrarAlerta();
  });
});

// =====================================
// ACTUALIZAR CARRITO
// =====================================

function actualizarCarrito() {
  // LIMPIAR
  cartItems.innerHTML = "";

  // RECORRER PRODUCTOS
  carrito.forEach((producto, index) => {
    const div = document.createElement("div");

    div.classList.add("producto-carrito");

    div.innerHTML = `

            <img src="${producto.imagen}" class="img-carrito">

            <div class="info-carrito">

                <h5>${producto.nombre}</h5>

                <p>$${producto.precio.toLocaleString()}</p>

            </div>

            <button class="eliminar-producto" onclick="eliminarProducto(${index})">

                <i class="bi bi-trash"></i>

            </button>

        `;

    cartItems.appendChild(div);
  });
}

// =====================================
// ELIMINAR PRODUCTO
// =====================================

function eliminarProducto(index) {
  // RESTAR TOTAL
  total -= carrito[index].precio;

  // RESTAR CONTADOR
  contador--;

  // ACTUALIZAR CONTADOR
  contadorCarrito.textContent = contador;

  // ACTUALIZAR TOTAL
  cartTotal.textContent = total.toLocaleString();

  // ELIMINAR PRODUCTO
  carrito.splice(index, 1);

  // SI QUEDA VACÍO
  if (carrito.length === 0) {
    cartItems.innerHTML = `

            <p class="carrito-vacio">

                Tu carrito está vacío

            </p>

        `;
  } else {
    actualizarCarrito();
  }
}

// =====================================
// ALERTA VISUAL
// =====================================

function mostrarAlerta() {
  const alerta = document.createElement("div");

  alerta.classList.add("alerta-carrito");

  alerta.textContent = "Producto agregado al carrito";

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 2000);
}

// =====================================
// SCROLL SUAVE
// =====================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
