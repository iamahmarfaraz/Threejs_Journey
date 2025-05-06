
import * as THREE from "three"
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import gsap from 'gsap';

const scene = new THREE.Scene();
// GUI From lil-gui for debug UI
const gui = new GUI();

const size = {
  width : window.innerWidth,
  height : window.innerHeight
}

window.addEventListener('resize',()=>{

  // update sizes
  size.width = window.innerWidth,
  size.height = window.innerHeight

  // update camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix();

  renderer.setSize(size.width,size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
})

window.addEventListener('keypress',(e) => {
  if (e.key === 'h' || e.key === 'H') {
    if (gui._hidden) {
      gui.show()
    }
    else{
      gui.hide()
    }
  }
})



window.addEventListener('dblclick',() => {
  console.log("Double Click");
  if (!document.fullscreenElement) {
    console.log("Go Fullscreen")
    canvas.requestFullscreen();
  }
  else{
    console.log("Exit Fullscreen");
    document.exitFullscreen();
  }
})


const cursor = {
  x:0,
  y:0
}
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = (e.clientY / size.height - 0.5);
  // console.log(cursor.x,cursor.y);
})

const canvas = document.querySelector('.webgl');

 
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.8,0.8,0.8,12,12,12),
  new THREE.MeshBasicMaterial({color:'yellow'})
);


scene.add(cube);

//Folder in DEBUGGING
const cubeFolder = gui.addFolder('Cube')
// Adding cube properties for DEBUG
// gui.add(cube.position, 'x').min(-5).max(5).step(0.1)
cubeFolder.add(cube.position, 'x').min(-5).max(5).step(0.1).name('Cube X Position')
cubeFolder.add(cube.position,'y').min(-5).max(5).step(0.1).name('Cube Y Position')
cubeFolder.add(cube.position,'z').min(-5).max(5).step(0.1).name('Cube Z Position')
cubeFolder.add(cube,'visible').name('Visible')
cubeFolder.add(cube.material,'wireframe').name('Wireframe')
cubeFolder
  .addColor(cube.material, 'color')
  .name('Cube Color')
  .onChange(() => {
    cube.material.needsUpdate = true;
  });

const parameter = {
  spin: () => {
    gsap.to(
      cube.rotation,
      {
        duration:1,
        y: cube.rotation.y + Math.PI * 2
      }
    )
  }
}  
cubeFolder.add(parameter,'spin').name('Spin Animation')

// Explanation:
// cube.position is a THREE.Vector3 (with .x, .y, .z).
// 'x' tells gui to watch and control cube.position.x.
// .min(-5).max(5) sets the range of movement.
// .step(0.1) determines how smooth the slider is.
// .name() gives it a label in the GUI.


const cameraFolder = gui.addFolder('Camera')
const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 2;
scene.add(camera);
cameraFolder.add(camera.position,'x').min(-5).max(5).step(0.1).name('Camera X Position')
cameraFolder.add(camera.position,'y',-5,5,0.1).name('Camera Y Position')
cameraFolder.add(camera.position,'z').min(-5).max(5).step(0.1).name('Camera Z Position')
cameraFolder.add(camera, 'fov').min(10).max(100).step(1).name('Field of View').onChange(() => {
  camera.updateProjectionMatrix();
});
// .onChange(() => { camera.updateProjectionMatrix(); }) line is essential when you modify 
// properties like fov, aspect, near, or far on a THREE.PerspectiveCamera.
// without calling .updateProjectionMatrix(), your changes won't visually affect the rendered scene.


const orbitcontrol = new OrbitControls(camera,canvas);
orbitcontrol.enableDamping = true;



const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.render(scene,camera);





const cameraMoveWRTMouse = () => {

  orbitcontrol.update();
  
  camera.lookAt(cube.position)

  renderer.render(scene,camera);
  window.requestAnimationFrame(cameraMoveWRTMouse)
}
cameraMoveWRTMouse();



