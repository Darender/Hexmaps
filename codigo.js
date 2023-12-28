document.addEventListener('DOMContentLoaded', (event) => {
    let hexagon = document.querySelector('.hexagono');
    // Guarda la tecla presionada
    let keysPressed = new Set();

    // Valores que guardan la velocidad, la escala y el angulo
    let velocidad = 3;
    var scale = 1;
    let angulo = 0;

    let moving = false;

    var btnZoomIn = document.querySelector("#Zoom-in");
    var btnZoomOut = document.querySelector("#Zoom-out");

    // Funciones que se ejecutan al cargar
    window.addEventListener('load', () => {
        let offsetX = (window.innerWidth - hexagon.offsetWidth) / 2;
        let offsetY = (window.innerHeight - hexagon.offsetHeight) / 2;
        hexagon.style.left = `${offsetX}px`;
        hexagon.style.top = `${offsetY}px`;
    });

    // Funcione que se activa al hacer click al objetvo
    let cambiado = false;
    hexagon.addEventListener('click', function() {
        if(!cambiado) {
            hexagon.style.backgroundColor = 'blue';
            cambiado = true;
        } else {
            hexagon.style.backgroundColor = 'rgb(131, 159, 164)';
            
            cambiado = false;
        }
    });

    // Funciones para el movimiento, rotacion y escalado
    function startMoving() {
        moving = true;
        requestAnimationFrame(move);
    }

    function stopMoving() {
        moving = false;
    }

    function move() {
        if (!moving) {
            return;
        }

        const style = window.getComputedStyle(hexagon);
        let left = parseInt(style.left);
        let top = parseInt(style.top);

        if (keysPressed.has('ArrowUp') || keysPressed.has('W') || keysPressed.has('w')) {
            top -= velocidad;
        }
        if (keysPressed.has('ArrowDown') || keysPressed.has('S') || keysPressed.has('s')) {
            top += velocidad;
        }

        if (keysPressed.has('ArrowLeft') || keysPressed.has('A') || keysPressed.has('a')) {
            left -= velocidad;
        }
        if (keysPressed.has('ArrowRight') || keysPressed.has('D') || keysPressed.has('d')) {
            left += velocidad;
        }

        hexagon.style.left = `${left}px`;
        hexagon.style.top = `${top}px`;

        if (keysPressed.has('Q') || keysPressed.has('q')) {
            angulo -= 1;
        }

        if (keysPressed.has('E') || keysPressed.has('e')) {
            angulo += 1;
        }

        if (keysPressed.has('+')) {
            scale += 0.05;
        }

        if (keysPressed.has('-')) {
            scale -= 0.05;
        }

        if (scale < 0.05) {
            scale = 0.05;
        }

        hexagon.style.transform = 'rotate(' + angulo + 'deg) scale(' + scale + ')';

        requestAnimationFrame(move);
    }

    //Funciones acticvadas al hacer click en los botones
    btnZoomIn.addEventListener("click", (e) => {
        scale += 0.5;
        hexagon.style.transform = 'rotate(' + angulo + 'deg) scale(' + scale + ')';
    });

    btnZoomOut.addEventListener("click", (e) => {
        scale -= 0.5;
        hexagon.style.transform = 'rotate(' + angulo + 'deg) scale(' + scale + ')';
    });

    // Eventos de tecla presionada y tecla soltada
    window.addEventListener('keydown', (e) => {
        keysPressed.add(e.key);
        if (!moving) {
            startMoving();
        }
    });

    window.addEventListener('keyup', (event) => {
        keysPressed.delete(event.key);
        if (keysPressed.size === 0) {
            stopMoving();
        }
    });
});