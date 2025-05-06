
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


// WIREFRAME
// const geo = new THREE.BoxGeometry(
//   width,           // size along X axis 
//   height,          // size along Y axis 
//   depth,           // size along Z axis 
//   widthSegments,   // subdivisions along X (default 1) 
//   heightSegments,  // subdivisions along Y (default 1) 
//   depthSegments    // subdivisions along Z (default 1) 
//  );
 
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.8,0.8,0.8,12,12,12),
  new THREE.MeshBasicMaterial({color:'yellow',wireframe:true})
);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({color:'red',wireframe:true})
) 


// scene.add(cube);
// scene.add(sphere);








// const cameraMoveWRTMouse = () => {

//   orbitcontrol.update();
  
//   camera.lookAt(sphere.position)

//   renderer.render(scene,camera);
//   window.requestAnimationFrame(cameraMoveWRTMouse)
// }
// cameraMoveWRTMouse();



//BUFFERGEOMETRY
// // create an empty BufferGeometry
// const geometry = new THREE.BufferGeometry();

// // define a flat triangle via a typed array of 3 vertices (x,y,z)
// const positions = new Float32Array([
// 0, 0, 0,    // vertex A
// 1, 0, 0,    // vertex B
// 0, 1, 0     // vertex C
// ]);

// // wrap the array in a BufferAttribute (3 values per vertex)
// const positionAttribute = new THREE.BufferAttribute(positions, 3);

// // assign it to the geometry under the “position” name
// geometry.setAttribute('position', positionAttribute);


const geometry = new THREE.BufferGeometry();

//No. of Triangles
const count = 5000;

// For every triangle i want 3 vertices and for each vertices i want 3 value(x,y,z cordi)
const positionArray = new Float32Array(count*3*3);


// filling random value in positionArray
for (let index = 0; index < positionArray.length; index++) {
  positionArray[index] = (Math.random() - 0.5) * 4;
  
}

// create Position Attribute for buffer geo
// new THREE.BufferAttribute(positionArray,no of value for each vertices)
const positionAttribute = new THREE.BufferAttribute(positionArray,3)

geometry.setAttribute('position',positionAttribute);
const BufferMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const BufferMesh = new THREE.Mesh(geometry, BufferMaterial);
BufferMesh.position.z = -8
scene.add(BufferMesh);




const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 2
scene.add(camera);



const orbitcontrol = new OrbitControls(camera,canvas);
orbitcontrol.enableDamping = true;

const renderer = new THREE.WebGLRenderer({canvas:canvas});
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.render(scene,camera);


const cameraMoveWRTMouse = () => {
  camera.lookAt(BufferMesh.position)
  orbitcontrol.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(cameraMoveWRTMouse);
}
cameraMoveWRTMouse();
