// Lista para almacenar los nombres de los amigos
let listaAmigos = [];

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    listaAmigos.push(nombre);
    actualizarListaAmigos();
    input.value = ""; // Limpiar el campo de entrada
}

// Función para actualizar la lista visible en la página
function actualizarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiar lista

    listaAmigos.forEach((amigo, index) => {
        const item = document.createElement("li");
        item.textContent = amigo;
        item.classList.add("name-item");
        lista.appendChild(item);
    });
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("La lista está vacía. Por favor, añade al menos un nombre antes de sortear.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const amigoSecreto = listaAmigos[indiceAleatorio];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultado previo

    const itemResultado = document.createElement("li");
    itemResultado.textContent = `El amigo secreto es: ${amigoSecreto}`;
    itemResultado.classList.add("result-item");
    resultado.appendChild(itemResultado);
}
