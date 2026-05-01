import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const container = document.getElementById('canvas-container');
if (container) {
  container.appendChild(renderer.domElement);
}

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xec4899, 1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0x3b82f6, 1);
pointLight2.position.set(-2, -3, 2);
scene.add(pointLight2);

// Create floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 300;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  // Spread particles around
  posArray[i] = (Math.random() - 0.5) * 15;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create some abstract 3D shapes (e.g., representing floating photos/lenses)
const shapes = [];
const geometries = [
  new THREE.TorusGeometry(0.5, 0.1, 16, 100),
  new THREE.OctahedronGeometry(0.6),
  new THREE.IcosahedronGeometry(0.7)
];

const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.2,
  roughness: 0.1,
  transmission: 0.9, // glass-like
  thickness: 0.5,
  transparent: true
});

for (let i = 0; i < 5; i++) {
  const geo = geometries[Math.floor(Math.random() * geometries.length)];
  const mesh = new THREE.Mesh(geo, material);
  
  mesh.position.x = (Math.random() - 0.5) * 10;
  mesh.position.y = (Math.random() - 0.5) * 10;
  mesh.position.z = (Math.random() - 0.5) * 5 - 2;
  
  mesh.rotation.x = Math.random() * Math.PI;
  mesh.rotation.y = Math.random() * Math.PI;
  
  scene.add(mesh);
  shapes.push(mesh);
}

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX / window.innerWidth - 0.5;
  mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  // Rotate particles
  particlesMesh.rotation.y = elapsedTime * 0.05;
  particlesMesh.rotation.x = elapsedTime * 0.02;

  // Gently move particles based on mouse
  particlesMesh.position.x += (mouseX * 0.5 - particlesMesh.position.x) * 0.05;
  particlesMesh.position.y += (-mouseY * 0.5 - particlesMesh.position.y) * 0.05;

  // Animate abstract shapes
  shapes.forEach((shape, index) => {
    shape.rotation.x += 0.005 * (index + 1);
    shape.rotation.y += 0.01;
    shape.position.y += Math.sin(elapsedTime + index) * 0.002;
  });

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
