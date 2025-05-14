import './style.css'


// === Imports ===
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import gsap from 'gsap';

//way1 of loading font
// import ttf from 'three/examples/fonts/optimer_bold.typeface.json'
// console.log(ttf);

//way2 of loading font - much easier-just copy ur font &
//license from node_modules/three/examples/fonts and paste it in static/font
import ttf from '../static/fonts/helvetiker_regular.typeface.json'
console.log(ttf);


// WAY3 - FONTLOADER
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
const fontLoader = new FontLoader();
// fontLoader.load(
//   '../static/fonts/helvetiker_regular.typeface.json',
//   (font) => {
//     console.log(font);
//   }
// )

import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

// === Scene Setup ===
const scene = new THREE.Scene();
const canvas = document.querySelector('.webgl');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// // Axes Helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper)

// === Ambient Light ===
const ambientLight = new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambientLight);

// === Point Light ===
const pointLight = new THREE.PointLight(0xffffff,4.5);
pointLight.position.set(2,3,4);
scene.add(pointLight)


// === Camera ===
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);


// === Renderer ===
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// === Controls ===
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


// === Cursor Tracking ===
const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});


// === Handle Resize ===
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// === Fullscreen Toggle on Double Click ===
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});


// === GUI ===
const gui = new GUI();

window.addEventListener('keypress', (e) => {
  if (e.key.toLowerCase() === 'h') {
    gui._hidden ? gui.show() : gui.hide();
  }
});



// === Loading Manager ===
const loadingManager = new THREE.LoadingManager();
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


// === Texture Loader ===
const textureLoader = new THREE.TextureLoader(loadingManager);
const matcapTexture = textureLoader.load('../static/textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.generateMipmaps = false;
matcapTexture.minFilter = THREE.NearestFilter;
matcapTexture.magFilter = THREE.NearestFilter



// === 3D Text ===
fontLoader.load(
  '../static/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeo = new TextGeometry('Hello, Three.js !', {
      font:           font,    // the font you loaded
      size:           0.19,     // how tall each letter is
      depth:         0.05,     // how deep (thick) each letter is
      curveSegments:  6,      // how smooth round parts are
      bevelEnabled:   true,    // turn on a little angled edge
      bevelThickness: 0.01,    // how thick that edge is
      bevelSize:      0.02,    // how far it sticks out
      bevelOffset:    0,       // move the bevel in or out
      bevelSegments:  4        // smoothness of the bevel
     });

     //Harder way to center your textgeo in canvas
    //  textGeo.computeBoundingBox();
    //  textGeo.translate(
    //   - (textGeo.boundingBox.max.x - 0.02) * 0.5,
    //   - (textGeo.boundingBox.max.y - 0.02) * 0.5,
    //   - (textGeo.boundingBox.max.z - 0.03) * 0.5
    //  )

    //SIMPLER WAY TO CENTER YOUR TEXT GEOMETRY
     textGeo.center()

     const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture
     });
     const text = new THREE.Mesh(textGeo,textMaterial);
     camera.lookAt(text.position);
     scene.add(text)

     console.time('donuts');

     const donutGeo = new THREE.TorusGeometry(0.3,0.2,20,45);
     const donutMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture});

     for (let index = 0; index < 300; index++) {
      
      const donut = new THREE.Mesh(donutGeo,donutMaterial);

      // console.log("Math.Random :- ",Math.random());

      // // Random position within view range (adjust to taste)
      donut.position.x = (Math.random() - 0.5) * 10; // X between -5 and 5
      donut.position.y = (Math.random() - 0.5) * 10; // Y between -5 and 5
      donut.position.z = (Math.random() - 0.5) * 10; // Z between -5 and 5

      // Random rotation(Half rotated)
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;
      
      //Random Scaling -  but it should be same for all x,y&z so,
      const scale = Math.random();
      // donut.scale.x = scale
      // donut.scale.y = scale
      // donut.scale.z = scale
      donut.scale.set(scale,scale,scale)

      // console.log(donut);
      scene.add(donut)
      
     }
     console.timeEnd('donuts');
  }
)



// === Animation Loop ===
const animate = () => {
  controls.update(); // Required for damping
   
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

animate();
