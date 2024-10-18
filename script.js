// Selección de elementos de la página
const startButton = document.getElementById('start-game');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Variables del juego
let isGameRunning = false;
let notes = [];
let score = 0;
let gameSpeed = 2;

// Iniciar juego
startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    canvas.style.display = 'block';
    startGame();
});

// Función para iniciar el juego
function startGame() {
    isGameRunning = true;
    score = 0;
    notes = [];
    createNotes();
    updateGame();
}

// Crear "notas" (objetos que caen)
function createNotes() {
    // Cada nota se genera a intervalos regulares
    setInterval(() => {
        const note = {
            x: Math.random() * (canvas.width - 50),  // Posición aleatoria
            y: 0,
            size: 50
        };
        notes.push(note);
    }, 1000); // Cada segundo
}

// Actualización del juego
function updateGame() {
    if (isGameRunning) {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar y mover las notas
        notes.forEach((note, index) => {
            note.y += gameSpeed;

            // Dibujar la nota
            ctx.fillStyle = 'red';
            ctx.fillRect(note.x, note.y, note.size, note.size);

            // Comprobar si la nota sale de la pantalla
            if (note.y > canvas.height) {
                notes.splice(index, 1);  // Eliminar la nota
            }
        });

        // Continuar actualizando el juego
        requestAnimationFrame(updateGame);
    }
}

// Escuchar las teclas presionadas (para detectar si el jugador acierta)
window.addEventListener('keydown', (e) => {
    if (isGameRunning) {
        // Aquí puedes definir las teclas que corresponden a las notas
        if (e.key === 'a') {
            checkHit();
        }
    }
});

// Comprobar si el jugador acertó
function checkHit() {
    notes.forEach((note, index) => {
        // Si la nota está cerca del fondo, cuenta como acierto
        if (note.y > canvas.height - 100 && note.y < canvas.height - 50) {
            score += 10;
            notes.splice(index, 1);  // Eliminar la nota
            console.log('¡Acierto! Puntuación: ' + score);
        }
    });
}
