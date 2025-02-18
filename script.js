let scene, camera, renderer, controls;
let walls = [];
let mazeSize = 10;
let velocity = new THREE.Vector3(); // Bewegungsgeschwindigkeit
let direction = new THREE.Vector3(); // Bewegungsrichtung
let speed = 0.1; // Bewegungsgeschwindigkeit

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    controls = new THREE.PointerLockControls(camera, document.body);
    document.addEventListener('click', () => controls.lock());

    createMaze();
    
    camera.position.set(1, 1.8, 1);

    // Keyboard event listener for movement
    document.addEventListener('keydown', onKeyDown, false);
}

function createMaze() {
    let wallGeometry = new THREE.BoxGeometry(1, 2, 1);
    let wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            if (Math.random() > 0.7 || i === 0 || j === 0 || i === mazeSize - 1 || j === mazeSize - 1) {
                let wall = new THREE.Mesh(wallGeometry, wallMaterial);
                wall.position.set(i, 1, j);
                scene.add(wall);
                walls.push(wall);
            }
        }
    }
}

function onKeyDown(event) {
    // Reset velocity for each key press
    velocity.set(0, 0, 0);

    // Move forward (W)
    if (event.key === 'w' || event.key === 'W') {
        direction.z = -1;
    }
    // Move backward (S)
    if (event.key === 's' || event.key === 'S') {
        direction.z = 1;
    }
    // Move left (A)
    if (event.key === 'a' || event.key === 'A') {
        direction.x = -1;
    }
    // Move right (D)
    if (event.key === 'd' || event.key === 'D') {
        direction.x = 1;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Normalize direction vector to ensure consistent speed in all directions
    direction.normalize();

    // Apply movement to velocity
    velocity.x = direction.x * speed;
    velocity.z = direction.z * speed;

    // Move the camera according to the velocity
    camera.position.add(velocity);

    // Render the scene
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
