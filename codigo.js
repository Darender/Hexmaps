document.addEventListener('DOMContentLoaded', (event) => {
    let circle = document.querySelector('.hex-puntiagudo');
    let keysPressed = new Set();
    let velocidad = 3;
    let moving = false;

    window.addEventListener('load', () => {
        circle.style.position = 'absolute';
        circle.style.left = window.innerWidth / 2 + 'px';
        circle.style.top = window.innerHeight / 2 + 'px';
    });

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

        const style = window.getComputedStyle(circle);
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

        circle.style.left = `${left}px`;
        circle.style.top = `${top}px`;

        requestAnimationFrame(move);
    }


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