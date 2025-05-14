
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



import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


const gui = new GUI();

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


const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
// const colorTexture = textureLoader2.load('../static/textures/door/color.jpg')
const doorColorTexture = textureLoader.load('../static/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
doorColorTexture.generateMipmaps = false;  
doorColorTexture.minFilter     = THREE.NearestFilter;  
doorColorTexture.magFilter     = THREE.NearestFilter;
const doorAlphaTexture = textureLoader.load('../static/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('../static/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('../static/textures/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('../static/textures/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('../static/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('../static/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('../static/textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('../static/textures/gradients/3.jpg')

const enviromentMapTexture = cubeTextureLoader.load([
  // its a 6D image like front,back,left,right,up and down
  '../static/textures/environmentMap/1/px.png',
  '../static/textures/environmentMap/1/nx.png',
  '../static/textures/environmentMap/1/py.png',
  '../static/textures/environmentMap/1/ny.png',
  '../static/textures/environmentMap/1/pz.png',
  '../static/textures/environmentMap/1/nz.png',
])

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene();




const material = new THREE.MeshBasicMaterial({
  map: doorColorTexture
});

const normalMaterial = new THREE.MeshNormalMaterial();

const matcapMaterial = new THREE.MeshMatcapMaterial();
matcapMaterial.matcap = matcapTexture

const lambertMaterial = new THREE.MeshLambertMaterial({
  map: doorColorTexture,
  color: 0xffffff
});

const phongMaterial = new THREE.MeshPhongMaterial();
phongMaterial.shininess = 100

const toonMaterial = new THREE.MeshToonMaterial();

const standardMaterial = new THREE.MeshStandardMaterial({
  // map:            doorColorTexture,
  // aoMap:          doorAmbientOcclusionTexture,
  // normalMap:      doorNormalTexture,
  // metalnessMap:   doorMetalnessTexture,
  // roughnessMap:   doorRoughnessTexture,
  // displacementMap : doorHeightTexture,
  // displacementScale:0.02,
  metalness:      0.7,
  roughness:      0.2,
  envMap: enviromentMapTexture

});

const materials = gui.addFolder('Material')
materials.add(standardMaterial,'metalness',0,5,0.1).name('Metalness')
materials.add(standardMaterial,'roughness',0,5,0.1).name('Roughness')
materials.add(standardMaterial,'aoMapIntensity',0,10,0.1).name('AoMap Intensity')
materials.add(standardMaterial,'displacementScale',0,1,0.01).name('Displacement Scale')

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.5,0.5,0.5,12,12,12) ,
  standardMaterial);
cube.position.x = -0.35
cube.geometry.setAttribute('uv2', new THREE.BufferAttribute(cube.geometry.attributes.uv.array, 2));

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,64,64),
  standardMaterial
)
sphere.position.x = -1.5;
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2));

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(0.5, 0.5),
  standardMaterial
)
plane.position.x = 0.45
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  standardMaterial
)
torus.position.x = 1.5
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2));
  
scene.add(sphere,cube,plane,torus);

// LIGHTS
// new THREE.AmbientLight(color,intensity)
const ambientLight = new THREE.AmbientLight(0xffffff,0.8)
scene.add(ambientLight)

const lighting = gui.addFolder('Lights');
lighting.add(ambientLight,'intensity',0,5,0.05).name('Ambient Light Intensity')


const pointLight = new THREE.PointLight(0xffffff,4.5)
pointLight.position.x = 0
pointLight.position.y = 2
pointLight.position.z = 1
scene.add(pointLight)
lighting.add(pointLight,'intensity',0,10,0.1).name('Point Light Intensity');
lighting.add(pointLight.position,'x',0,10,0.1).name('Point Light x');
lighting.add(pointLight.position,'y',0,10,0.1).name('Point Light y');
lighting.add(pointLight.position,'z',0,10,0.1).name('Point Light z');

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
scene.add(pointLightHelper);

const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.z = 2;
scene.add(camera);


const orbitcontrol = new OrbitControls(camera,canvas);
orbitcontrol.enableDamping = true;


const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width,size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.render(scene,camera);


const animate = () => {
  orbitcontrol.update(); // Required for damping and orbit control
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate(); // Start the loop

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // cube.rotation.y = 0.1 * elapsedTime
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // cube.rotation.x = 0.15 * elapsedTime
    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    orbitcontrol.update(); // Required for damping and orbit control
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

tick()






