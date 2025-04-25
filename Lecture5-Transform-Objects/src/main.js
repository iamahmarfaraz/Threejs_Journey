import * as THREE from "three";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// group
const group = new THREE.Group();
scene.add(group);

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7)
const material = new THREE.MeshBasicMaterial({ color: 'green' })
const mesh = new THREE.Mesh(geometry, material)

const geometry2 = new THREE.BoxGeometry(0.7, 0.7, 0.7)
const material2 = new THREE.MeshBasicMaterial({ color: 'red' })
const cube2 = new THREE.Mesh(geometry2, material2)


const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.7,0.7,0.7),
  new THREE.MeshBasicMaterial({color:'blue'})
)

cube2.position.set(2,0,0)
cube3.position.set(-2,0,0)

group.add(mesh);
group.add(cube2);
group.add(cube3);

// group rotation
group.position.y = 1


// Position
mesh.position.y= 1;
mesh.position.set(0.2,0.1,0.1)

// Scale
mesh.scale.x = 1.2
mesh.scale.y = 1.2
mesh.scale.z = 1.1 

// rotation
mesh.rotation.y = 0.5
mesh.rotation.x = 0.2

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 1.2
camera.position.y = 0.7
scene.add(camera)

// lookAt
// camera.lookAt(new THREE.Vector3(1,0.5,2));
camera.lookAt(mesh.position);

console.log(mesh.position.distanceTo(camera.position));

// Axes Helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
