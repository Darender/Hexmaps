document.addEventListener('DOMContentLoaded', (event) => {
    let hexagon = document.querySelector('.hex-puntiagudo');
    let keysPressed = new Set();
    let velocidad = 3;
    let moving = false;

    // Funciones que se ejecutan al cargar
    window.addEventListener('load', () => {
        let offsetX = (window.innerWidth - hexagon.offsetWidth) / 2;
        let offsetY = (window.innerHeight - hexagon.offsetHeight) / 2;
        hexagon.style.left = `${offsetX}px`;
        hexagon.style.top = `${offsetY}px`;
    });

    // Funciones para el movimiento 
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

        if (keysPressed.has('ArrowUp')) {
            top -= velocidad;
        }
        if (keysPressed.has('ArrowDown')) {
            top += velocidad;
        }

        if (keysPressed.has('ArrowLeft')) {
            left -= velocidad;
        }
        if (keysPressed.has('ArrowRight')) {
            left += velocidad;
        }

        hexagon.style.left = `${left}px`;
        hexagon.style.top = `${top}px`;

        requestAnimationFrame(move);
    }

    // Funciones para hacer zoom-in y zoom-out
    var btnZoomIn = document.querySelector("#Zoom-in");
    var btnZoomOut = document.querySelector("#Zoom-out");
    var scale = 1;

    btnZoomIn.addEventListener("click", (e) => {
        scale += 0.5;
        hexagon.style.transform = `scale(${scale})`;
    });

    btnZoomOut.addEventListener("click", (e) => {
        scale -= 0.5;
        hexagon.style.transform = `scale(${scale})`;
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