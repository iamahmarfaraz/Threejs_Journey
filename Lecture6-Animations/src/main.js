import * as THREE from "three"
import gsap from "gsap";


const canvas = document.querySelector('.webgl');


const scene = new THREE.Scene();

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.8,0.8,0.8),
  new THREE.MeshBasicMaterial({color:'yellow'})
);

scene.add(cube);

const size = {
  width : 800,
  height : 600
}

const camera = new THREE.PerspectiveCamera(75, size.width/size.height);
camera.position.z = 2
scene.add(camera);

// Axes Helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);



const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height);
gsap.to(cube.position,{duration:1 , delay : 1 , x : 2});
renderer.render(scene,camera);


// GSAP ANIME
let timer = 0;
const gsapanime = () => {
  console.log(timer++);
  renderer.render(scene,camera);
  window.requestAnimationFrame(gsapanime);
}
// gsapanime();


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

