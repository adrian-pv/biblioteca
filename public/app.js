// Gestor de Biblioteca - lógica de la página
const USUARIO_VALIDO = "admin";
const CLAVE_VALIDA = "admin123";
const CLAVE_STORAGE = "biblioteca-libros";

const login = document.getElementById("login");
const panel = document.getElementById("panel");
const loginMsg = document.getElementById("login-msg");
const formMsg = document.getElementById("form-msg");
const tabla = document.getElementById("tabla-libros");
const tablaVacia = document.getElementById("tabla-vacia");

// ---------- Datos (localStorage) ----------
function cargarLibros() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) || [];
  } catch (e) {
    return [];
  }
}

function guardarLibros(libros) {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(libros));
}

// ---------- Login ----------
document.getElementById("btn-login").addEventListener("click", () => {
  const usuario = document.getElementById("usuario").value.trim();
  const clave = document.getElementById("clave").value;

  if (usuario === USUARIO_VALIDO && clave === CLAVE_VALIDA) {
    loginMsg.textContent = "";
    login.classList.add("oculto");
    panel.classList.remove("oculto");
    mostrarLibros();
  } else {
    loginMsg.textContent = "Usuario o contraseña incorrectos.";
  }
});

document.getElementById("btn-salir").addEventListener("click", () => {
  panel.classList.add("oculto");
  login.classList.remove("oculto");
  document.getElementById("clave").value = "";
});

// ---------- Agregar libro ----------
document.getElementById("btn-agregar").addEventListener("click", () => {
  const titulo = document.getElementById("titulo").value.trim();
  const autor = document.getElementById("autor").value.trim();
  const copias = parseInt(document.getElementById("copias").value, 10);

  if (!titulo || !autor) {
    formMsg.textContent = "El título y el autor son obligatorios.";
    return;
  }

  // Validación: no se permiten 0 copias (ni valores inválidos)
  // if (isNaN(copias) || copias <= 0) {
  //   formMsg.textContent = "El número de copias debe ser mayor a 0.";
  //   return;
  // }

  formMsg.textContent = "";
  const libros = cargarLibros();
  libros.push({ id: Date.now(), titulo, autor, copias });
  guardarLibros(libros);
  mostrarLibros();

  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("copias").value = "";
});

// ---------- Eliminar libro ----------
function eliminarLibro(id) {
  const libros = cargarLibros().filter((libro) => libro.id !== id);
  guardarLibros(libros);
  mostrarLibros();
}

// ---------- Mostrar tabla ----------
function mostrarLibros() {
  const libros = cargarLibros();
  tabla.innerHTML = "";

  libros.forEach((libro) => {
    const fila = document.createElement("tr");
    fila.className = "fila";

    const celdaTitulo = document.createElement("td");
    celdaTitulo.className = "col-titulo";
    celdaTitulo.textContent = libro.titulo;

    const celdaAutor = document.createElement("td");
    celdaAutor.textContent = libro.autor;

    const celdaCopias = document.createElement("td");
    celdaCopias.textContent = libro.copias;

    const celdaAccion = document.createElement("td");
    const boton = document.createElement("button");
    boton.className = "btn-eliminar";
    boton.textContent = "Eliminar";
    boton.addEventListener("click", () => eliminarLibro(libro.id));
    celdaAccion.appendChild(boton);

    fila.append(celdaTitulo, celdaAutor, celdaCopias, celdaAccion);
    tabla.appendChild(fila);
  });

  tablaVacia.style.display = libros.length === 0 ? "block" : "none";
}
