
import * as THREE from "three"
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();

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



// full screen for gaming and all that
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


const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height);
// smooth edges
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
// gsap.to(cube.position,{duration:1 , delay : 1 , x : 2});
renderer.render(scene,camera);



// CAMERA MOVEMENT W.R.T MOUSE MOVEMENT
const cameraMoveWRTMouse = () => {

  // camera.lookAt(cube.position)

  orbitcontrol.update();
  


  renderer.render(scene,camera);
  window.requestAnimationFrame(cameraMoveWRTMouse)
}
cameraMoveWRTMouse();



