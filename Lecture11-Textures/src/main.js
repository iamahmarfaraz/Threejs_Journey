
import * as THREE from "three"
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

// import imageSource from '../static/textures/door/color.jpg'

// console.log("Image :- ",imageSource);

// TEXTURES

// WAY1 - NATIVE JS
const image = new Image();
const textureNative =  new THREE.Texture(image);

// image.onload = () => {
//   // we have convert image into texture to use it
//   const texture =  new THREE.Texture(image);
//   console.log("Texture Loaded :- ",texture);
// }
// image.src = '../static/textures/door/color.jpg'

image.onload = () => {
  textureNative.colorSpace = THREE.SRGBColorSpace //for perfect color of texture
  textureNative.needsUpdate = true
}
image.src = '../static/textures/door/color.jpg'


// WAY2-TEXTURELOADER
const textureLoader = new THREE.TextureLoader();
const texture2 = textureLoader.load('../static/textures/door/color.jpg')
texture2.colorSpace = THREE.SRGBColorSpace

// Adding LoadingManager in TEXTURELOADER
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
   console.log('loading started')
}
loadingManager.onLoad = () =>
{
   console.log('loading finished')
}
loadingManager.onProgress = () =>
{
   console.log('loading progressing')
}
loadingManager.onError = () =>
{
   console.log('loading error')
}


const textureLoader2 = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader2.load('../static/textures/door/color.jpg')
const colorTexture = textureLoader2.load('../static/textures/minecraft.png')
colorTexture.colorSpace = THREE.SRGBColorSpace
// sharp texture in all side where even the camera doesn't focus it'll be 
//sharp and not blurry using MinMapping
colorTexture.generateMipmaps = false
 colorTexture.minFilter = THREE.NearestFilter
 colorTexture.magFilter = THREE.NearestFilter
const alphaTexture = textureLoader.load('../static/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('../static/textures/door/height.jpg')
const normalTexture = textureLoader.load('../static/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('../static/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('../static/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('../static/textures/door/roughness.jpg')


// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5,
// colorTexture.center.y = 0.5



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


//REPLACE THE COLOR PROPERTY TO `MAP` AND USE 'TEXTURE' 
const geometry = new THREE.BoxGeometry(0.8,0.8,0.8,12,12,12);
console.log(geometry.attributes.uv);
const cube = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({map:colorTexture})
);

// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(0.8,0.8,0.8,12,12,12),
//   new THREE.MeshStandardMaterial({
//     map: colorTexture,
//     alphaMap: alphaTexture,
//     displacementMap: heightTexture,
//     normalMap: normalTexture,
//     aoMap: ambientOcclusionTexture,
//     metalnessMap: metalnessTexture,
//     roughnessMap: roughnessTexture,
//     metalness: 1,
//     roughness: 1,
//   })
// );


scene.add(cube);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(1, 1, 1);
// scene.add(directionalLight);



const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 2;
scene.add(camera);



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



