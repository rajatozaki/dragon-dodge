import * as THREE from 'three';

// --- CORE SETUP (No changes here) ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 1, 100);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 6, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// --- LIGHTING (No changes here) ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// --- GAME OBJECTS (No changes here) ---
const playerDragon = new THREE.Group();
const dragonBody = [];
const dragonHeadMaterial = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
const dragonBodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2ecc71 });
const head = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), dragonHeadMaterial);
playerDragon.add(head);
dragonBody.push(head);
for (let i = 1; i < 7; i++) {
    const segment = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), dragonBodyMaterial);
    segment.position.z = i * 0.8;
    playerDragon.add(segment);
    dragonBody.push(segment);
}
scene.add(playerDragon);
playerDragon.position.y = 5;
const buildings = [];
const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xbdc3c7 });
for (let i = 0; i < 50; i++) {
    const height = Math.random() * 20 + 5;
    const building = new THREE.Mesh(new THREE.BoxGeometry(4, height, 4), buildingMaterial);
    building.position.x = (Math.random() - 0.5) * 100;
    building.position.z = (Math.random() - 0.5) * 200;
    building.position.y = height / 2;
    scene.add(building);
    buildings.push(building);
}

// --- GAME STATE & UI ---
let isGameRunning = false;
let score = 0;
const clock = new THREE.Clock();
const keyboard = {};
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('game-over');
const titleScreenElement = document.getElementById('title-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

// --- NEW: HOMEPAGE ANIMATION ---
let homepageAnimationId;
function animateHomepage() {
    homepageAnimationId = requestAnimationFrame(animateHomepage);

    // Slowly rotate the camera around the dragon
    const time = clock.getElapsedTime() * 0.2;
    camera.position.x = Math.sin(time) * 12;
    camera.position.z = Math.cos(time) * 12;
    camera.lookAt(playerDragon.position); // Always look at the dragon

    renderer.render(scene, camera);
}

// --- EVENT LISTENERS ---
document.addEventListener('keydown', (e) => (keyboard[e.key.toLowerCase()] = true));
document.addEventListener('keyup', (e) => (keyboard[e.key.toLowerCase()] = false));

startButton.addEventListener('click', () => {
    // --- NEW: Stop homepage animation and reset camera ---
    cancelAnimationFrame(homepageAnimationId);
    camera.position.set(0, 6, 10); // Reset camera for gameplay
    // ---

    isGameRunning = true;
    titleScreenElement.classList.add('hidden');
    scoreElement.classList.remove('hidden');
    animateGame(); // Start the actual game loop
});

restartButton.addEventListener('click', () => {
    // Reset camera for gameplay
    camera.position.set(0, 6, 10);
    playerDragon.position.set(0, 5, 0);
    score = 0;
    scoreElement.textContent = `Score: ${score}`;
    isGameRunning = true;
    buildings.forEach(b => {
        b.position.z = (Math.random() - 0.5) * 200;
    });
    gameOverElement.classList.add('hidden');
    animateGame(); // Start the game loop again
});


// --- RE-NAMED a nimate() to animateGame() ---
function animateGame() {
    if (!isGameRunning) return;

    requestAnimationFrame(animateGame);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    const moveSpeed = 10 * delta;
    playerDragon.position.z -= moveSpeed;
    if (keyboard['a'] || keyboard['arrowleft']) playerDragon.position.x -= moveSpeed;
    if (keyboard['d'] || keyboard['arrowright']) playerDragon.position.x += moveSpeed;

    dragonBody.forEach((segment, index) => {
        segment.position.y = Math.sin(time * 5 + index * 0.5) * 0.3;
    });

    buildings.forEach(building => {
        if (building.position.z > camera.position.z) {
            building.position.z -= 200;
            building.position.x = (Math.random() - 0.5) * 100;
        }
    });

    const dragonHeadBox = new THREE.Box3().setFromObject(dragonBody[0]);
    for (const building of buildings) {
        const buildingBox = new THREE.Box3().setFromObject(building);
        if (dragonHeadBox.intersectsBox(buildingBox)) {
            isGameRunning = false;
            gameOverElement.classList.remove('hidden');
        }
    }

    score += delta * 10;
    scoreElement.textContent = `Score: ${Math.floor(score)}`;
    
    camera.position.x += (playerDragon.position.x - camera.position.x) * 0.1;
    camera.position.z = playerDragon.position.z + 10;

    renderer.render(scene, camera);
}

// --- RESPONSIVENESS (No changes here) ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- START THE HOMEPAGE ANIMATION ---
scoreElement.classList.add('hidden'); // Hide score initially
animateHomepage(); // Start with the homepage loop```