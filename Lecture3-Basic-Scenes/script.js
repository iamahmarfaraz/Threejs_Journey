
//scene
const scene = new THREE.Scene();


// red cube
//BoxGeometry(width,height,depth)
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:'green'});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

// sizes
const sizes = {
    width : 800,
    height : 600,
};

// Camera
//PerspectiveCamera(fov,aspect ratio)
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 1.5;
camera.position.y = 1;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl'); 
const renderer = new THREE.WebGLRenderer({ canvas:canvas }); 
renderer.setSize(sizes.width, sizes.height); 

renderer.render(scene,camera)