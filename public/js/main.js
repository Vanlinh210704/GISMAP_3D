const panorama = new PANOLENS.ImagePanorama( '../images/alamy.jpg' );
const panorama2 = new PANOLENS.ImagePanorama('../images/thang_6_ip.jpg');
let imageContainer = document.querySelector('.image-container')


var infospotPositions = [
    new THREE.Vector3(-2136.06, 16.30, 890.14),
    new THREE.Vector3(-3136.06, 296.30, -4290.14),
    
  ];

const viewer = new PANOLENS.Viewer({
    container: imageContainer,
    autoRotate: true,
    autoRotateSpeed: 0.3,
    controlBar: true,
});

panorama.link( panorama2, infospotPositions[0]);
panorama2.link( panorama, infospotPositions[1]);

viewer.add( panorama,panorama2 );
// const express = require('express');
// const main = express.Router();

// main.get('/index', (req, res) => {

//   const data = JSON.parse(decodeURIComponent(req.query.data));
//   const panoImage = document.querySelector('.image-container');
//   const miamiPano = data;

//   const panorama = new PANOLENS.ImagePanorama(miamiPano);
//   const viewer = new PANOLENS.viewer({
//       container: panoImage
//   })
//   viewer.add(panorama); 

// });
