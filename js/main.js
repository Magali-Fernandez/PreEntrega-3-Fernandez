class Peluche {
    constructor(nombre, stock, precio) {
        this.nombre = nombre;
        this.stock = stock;
        this.precio = precio;
    }

    hayStock(cantidad) {
        return this.stock >= cantidad;
    }

    calcularTotal(cantidad) {
        return this.precio * cantidad;
    }
}

// Array de peluches (simulando una tienda con tres peluches)
let stockPeluches = [
    new Peluche("oso", 10, 20),
    new Peluche("conejo", 5, 15),
    new Peluche("gato", 7, 10),
];

// Mostrar peluches disponibles en la página
const listaPeluches = document.getElementById("listaPeluches");
function mostrarPeluches() {
    listaPeluches.innerHTML = stockPeluches
        .map(
            (peluche) =>
                `<li>${peluche.nombre} - $${peluche.precio} - Stock: ${peluche.stock}</li>`
        )
        .join("");
}
mostrarPeluches();

// Función para buscar un peluche en el array
function buscarPeluche(nombre) {
    return stockPeluches.find(
        (peluche) => peluche.nombre.toLowerCase() === nombre.toLowerCase()
    );
}

// Evento para el botón de compra
document.getElementById("botonCompra").addEventListener("click", () => {
    const nombrePeluche = document.getElementById("peluche").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const resultado = document.getElementById("resultado");

    // Buscar el peluche por nombre
    let pelucheEncontrado = buscarPeluche(nombrePeluche);

    const mensajeResultado = pelucheEncontrado
        ? pelucheEncontrado.hayStock(cantidad)
            ? `Total a pagar por ${cantidad} ${
                  pelucheEncontrado.nombre
              }(s): $${pelucheEncontrado.calcularTotal(
                  cantidad
              )}. ¡Gracias por su compra!`
            : `No tenemos suficiente stock de ${pelucheEncontrado.nombre}.`
        : "Peluche no disponible.";

    // Actualizar el contenido del elemento resultado
    resultado.innerHTML = mensajeResultado;

    // Si el peluche fue encontrado y hay suficiente stock, actualizar el stock
    if (pelucheEncontrado && pelucheEncontrado.hayStock(cantidad)) {
        let total = pelucheEncontrado.calcularTotal(cantidad);

        // Guardar la compra en localStorage
        let compra = {
            nombre: pelucheEncontrado.nombre,
            cantidad: cantidad,
            total: total,
        };
        localStorage.setItem("ultimaCompra", JSON.stringify(compra));

        // Reducir el stock del peluche y actualizar la lista de peluches
        pelucheEncontrado.stock -= cantidad;
        mostrarPeluches();

        // Limpiar los inputs
        document.getElementById("peluche").value = "";
        document.getElementById("cantidad").value = "";

        const listaCompras = document.getElementById("listaCompras");

        // Crear un nuevo elemento <li> para la lista de compras
        const nuevaCompra = document.createElement("li");
        nuevaCompra.textContent = `Compraste ${cantidad} ${pelucheEncontrado.nombre}(s) por $${total}.`;

        listaCompras.appendChild(nuevaCompra);
    }
});

// Función para mostrar la última compra almacenada
function mostrarUltimaCompra() {
    const ultimaCompra = JSON.parse(localStorage.getItem("ultimaCompra"));
    if (ultimaCompra) {
        document.getElementById(
            "resultado"
        ).innerHTML = `Última compra: ${ultimaCompra.cantidad} ${ultimaCompra.nombre}(s) por $${ultimaCompra.total}.`;
    }
}

mostrarUltimaCompra();
