// Lista para almacenar los nombres de los amigos
let listaAmigos = JSON.parse(localStorage.getItem('listaAmigos')) || [];

// Función para agregar un nombre a la lista
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (/\d/.test(nombre)) {
        alert("El nombre no puede contener números.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("El nombre ya está en la lista.");
        return;
    }

    listaAmigos.push(nombre);
    actualizarListaAmigos();
    input.value = ""; // Limpiar el campo de entrada
    guardarListaAmigos();
}

// Función para actualizar la lista visible en la página
function actualizarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpiar lista

    listaAmigos.forEach((amigo, index) => {
        const item = document.createElement("li");
        item.textContent = amigo;
        item.classList.add("name-item");

        // Crear botón de eliminación
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = () => eliminarAmigo(index);

        item.appendChild(deleteButton);
        lista.appendChild(item);
    });
}

// Nueva función para eliminar un amigo de la lista
function eliminarAmigo(index) {
    listaAmigos.splice(index, 1);
    actualizarListaAmigos();
    guardarListaAmigos();
}

// Función para sortear un amigo secreto
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("La lista está vacía. Por favor, añade al menos un nombre antes de sortear.");
        return;
    }

    // Mostrar el popup con la animación de la ruleta
    const popup = document.getElementById("popup");
    const winnerName = document.getElementById("winner-name");
    const spinner = document.querySelector(".spinner");
    const winnerSound = document.getElementById("winner-sound");
    popup.style.display = "flex";
    winnerName.textContent = "";

    setTimeout(() => {
        const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
        const amigoSecreto = listaAmigos[indiceAleatorio];

        // Detener la animación de la ruleta
        spinner.style.animation = "none";

        winnerName.textContent = `El amigo secreto es: ${amigoSecreto}`;
        winnerSound.play(); // Reproducir el sonido
    }, 1000);
}

// Función para cerrar el popup y reiniciar la plantilla
function cerrarPopup() {
    const popup = document.getElementById("popup");
    const spinner = document.querySelector(".spinner");
    popup.style.display = "none";
    listaAmigos = [];
    guardarListaAmigos();
    actualizarListaAmigos();

    // Reiniciar la animación de la ruleta
    spinner.style.animation = "spin 1s linear infinite";
}

// Función para guardar la lista de amigos en el almacenamiento local
function guardarListaAmigos() {
    localStorage.setItem('listaAmigos', JSON.stringify(listaAmigos));
}

// Actualizar la lista al cargar la página
window.onload = actualizarListaAmigos;
