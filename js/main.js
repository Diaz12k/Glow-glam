// ====== SELECCIÓN DE ELEMENTOS ======
const carrito = document.getElementById('carrito');
const btnCarrito = document.querySelector('.cart');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = carrito.querySelector('.total');
const btnVaciar = carrito.querySelector('.btn-vaciar');
const btnCerrarCarrito = document.getElementById('cerrarCarrito');
const overlay = document.getElementById('overlay');

let productosEnCarrito = [];

// ====== MOSTRAR / OCULTAR CARRITO ======
btnCarrito.addEventListener('click', () => {
  carrito.classList.toggle('visible');
  overlay.classList.toggle('activo');
});

if (btnCerrarCarrito) {
  btnCerrarCarrito.addEventListener('click', () => {
    carrito.classList.remove('visible');
    overlay.classList.remove('activo');
  });
}

overlay.addEventListener('click', () => {
  carrito.classList.remove('visible');
  overlay.classList.remove('activo');
});

// ====== AGREGAR PRODUCTOS AL CARRITO ======
document.querySelectorAll('.btn-agregar').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const nombre = card.querySelector('h4').textContent;
    const precioTexto = card.querySelector('p').textContent;
    const precio = parseFloat(precioTexto.replace('$', '').replace(',', '.').trim());

    agregarProductoAlCarrito({ nombre, precio });
  });
});

function agregarProductoAlCarrito(producto) {
  const productoExistente = productosEnCarrito.find(p => p.nombre === producto.nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    productosEnCarrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarritoUI();
}

// ====== ACTUALIZAR INTERFAZ DEL CARRITO ======
function actualizarCarritoUI() {
  listaCarrito.innerHTML = '';

  productosEnCarrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toLocaleString()}`;

    // Botón eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      productosEnCarrito.splice(index, 1);
      actualizarCarritoUI();
    });

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
  });

  const total = productosEnCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
}

// ====== VACIAR CARRITO ======
btnVaciar.addEventListener('click', () => {
  productosEnCarrito = [];
  actualizarCarritoUI();
});
