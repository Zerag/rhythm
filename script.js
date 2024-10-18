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

// Crear "notas" con tiempo de llegada
function createNotes() {
    setInterval(() => {
        const note = {
            x: 0,  // Las notas cubrirán todo el ancho del canvas
            y: 0,
            size: 50,
            timeToHit: Date.now() + 2000 // La nota llegará al punto de acierto en 3 segundos
        };
        notes.push(note);
    }, 1000); // Generar nota cada segundo
}

// Variables del área de acierto (guía)
const hitZoneY = canvas.height - 50;  // Una línea delgada al final del canvas
const lineThickness = 50; 
const noteThickness = 5; // Grosor de la guía y las notas

// Actualización del juego (ajustar para líneas delgadas)
function updateGame() {
    if (isGameRunning) {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar la línea de acierto (guía)
        ctx.fillStyle = 'green';
        ctx.fillRect(0, hitZoneY, canvas.width, lineThickness);  // Línea de la guía

        // Dibujar y mover las notas
        const currentTime = Date.now();
        notes.forEach((note, index) => {
            // Calcular la posición de la nota en base al tiempo que le queda para llegar a la línea
            const timeLeft = note.timeToHit - currentTime;

            // Si el tiempo es negativo, significa que la nota debería haber llegado o haber sido presionada
            if (timeLeft < 0) {
                notes.splice(index, 1);  // Eliminar la nota si pasó el tiempo
            } else {
                // Mover la nota en función del tiempo restante
                const percentComplete = (3000 - timeLeft) / 3000;
                note.y = percentComplete * canvas.height;

                // Dibujar la nota como una línea delgada
                ctx.fillStyle = 'red';
                ctx.fillRect(note.x, note.y, canvas.width, lineThickness);  // Línea para cada nota
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

function checkHit() {
    const currentTime = Date.now();  // Tiempo actual en milisegundos
    
    notes.forEach((note, index) => {
        const timeDifference = Math.abs(note.timeToHit - currentTime);

        // Definir ventanas de precisión en milisegundos
        const perfectWindow = 100;  // ±100ms para Perfecto
        const goodWindow = 250;     // ±250ms para Bien
        const badWindow = 500;      // ±500ms para Malo

        // Calcular la precisión basado en el tiempo
        if (timeDifference <= perfectWindow) {
            lastAccuracy = 'Perfecto';
            score += 100;
        } else if (timeDifference <= goodWindow) {
            lastAccuracy = 'Bien';
            score += 50;
        } else if (timeDifference <= badWindow) {
            lastAccuracy = 'Malo';
            score += 10;
        } else {
            // Si está fuera de la ventana de acierto, no hacemos nada
            return;
        }

        // Mostrar la precisión en la pantalla
        accuracyText.textContent = lastAccuracy;

        // Eliminar la nota del arreglo una vez se presiona
        notes.splice(index, 1);
        console.log(`¡${lastAccuracy}! Puntuación: ${score}`);
    });
}

const accuracyText = document.getElementById('accuracy-text');  // Seleccionamos el elemento donde se mostrará la precisión

// Modificar checkHit para actualizar la precisión visual
function checkHit() {
    notes.forEach((note, index) => {
        const noteCenter = note.y + lineThickness / 2;
        
        if (noteCenter > hitZoneY && noteCenter < hitZoneY + lineThickness) {
            const hitAccuracy = Math.abs((hitZoneY + lineThickness / 2) - noteCenter);

            if (hitAccuracy < 5) {
                lastAccuracy = 'Perfecto';
                score += 100;
            } else if (hitAccuracy < 15) {
                lastAccuracy = 'Bien';
                score += 50;
            } else {
                lastAccuracy = 'Malo';
                score += 10;
            }

            // Mostrar la precisión en la nueva sección
            accuracyText.textContent = lastAccuracy;

            // Eliminar la nota una vez se presiona
            notes.splice(index, 1);
            console.log(`¡${lastAccuracy}! Puntuación: ${score}`);
        }
    });
}
