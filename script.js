// script.js
let scene, camera, renderer, controls;
let walls = [];
let mazeSize = 10;

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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
