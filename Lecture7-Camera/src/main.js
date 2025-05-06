
import * as THREE from "three"
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();

const size = {
  width : 800,
  height : 600
}

const cursor = {
  x:0,
  y:0
}
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = (e.clientY / size.height - 0.5);
  // console.log(cursor.x,cursor.y);
})
 

// const camera = new THREE.PerspectiveCamera(  
//   fov,            // vertical FOV in degrees  
//   aspect,         // canvas width ÷ canvas height  
//   near,           // near clipping plane  - any object nearer than this won't show up like focal length
//   far             // far clipping plane  - any object further than this won't show up like focal length
// ); 

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)

const canvas = document.querySelector('.webgl');

 



const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.8,0.8,0.8),
  new THREE.MeshBasicMaterial({color:'yellow'})
);

scene.add(cube);



// const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 2
scene.add(camera);


// OrbitControls
const orbitcontrol = new OrbitControls(camera,canvas);
// Damping - for smooth animation and friction to make it look more realistic
orbitcontrol.enableDamping = true

// Axes Helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);



const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height);
// gsap.to(cube.position,{duration:1 , delay : 1 , x : 2});
renderer.render(scene,camera);



// CAMERA MOVEMENT W.R.T MOUSE MOVEMENT
const cameraMoveWRTMouse = () => {

  // camera.position.x = -(cursor.x * 10);
  // camera.position.y = cursor.y * 10;
  // camera.position.x = (-(Math.sin(cursor.x * Math.PI * 2))) * 3;
  // camera.position.z = (Math.cos(cursor.x * Math.PI * 2)) * 3;
  // camera.position.y = (Math.sin(cursor.y * Math.PI * 2)) * 3;

  // camera.lookAt(cube.position)

  //update controls
  orbitcontrol.update();
  


  renderer.render(scene,camera);
  window.requestAnimationFrame(cameraMoveWRTMouse)
}
cameraMoveWRTMouse();


// GSAP ANIME
let timer = 0;
const gsapanime = () => {
  console.log(timer++);
  renderer.render(scene,camera);
  window.requestAnimationFrame(gsapanime);
}
// gsapanime();
// new


// ANIMATIONS
const cubeRotation = () => {
  let timer = 0;
  console.log(timer++)
  cube.rotation.y += 0.01;

  renderer.render(scene, camera)  

  window.requestAnimationFrame(cubeRotation);
}

 //cubeRotation();



const animation = () => {
  cube.position.x += 0.006;
  renderer.render(scene,camera);
  window.requestAnimationFrame(animation);
}

// animation();


// More animation with time


let time =  Date.now();

const anime = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  console.log("Delta Time : ",deltaTime);
  time = currentTime;

  cube.rotation.y += 0.001 * deltaTime;
  renderer.render(scene,camera);

  window.requestAnimationFrame(anime);

}

//anime();




// THREEJS Clock
const clock = new THREE.Clock();


const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime)

  cube.rotation.y = elapsedTime * Math.PI * 0.3;

  // using sin and cos for oscillation 
  cube.position.y = Math.sin(elapsedTime);
  cube.position.x = Math.cos(elapsedTime);
  camera.lookAt(cube.position)

  renderer.render(scene,camera);
  window.requestAnimationFrame(tick);
}
// tick();


