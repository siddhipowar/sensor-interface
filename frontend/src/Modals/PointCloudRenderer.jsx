import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PointCloudViewer = ({ frameData }) => {
  const rendererRef = useRef(null);

  useEffect(() => {
    let camera, scene, points, renderer;

    const init = () => {
      camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
      camera.position.z = 2750;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050505);

      const geometry = new THREE.BufferGeometry();
      const positions = [];

      if (frameData) {
        let vertexIndex = 0;
        for (let i = 0; i < frameData.length; i++) {
          const rowData = frameData[i];
          for (let j = 0; j < rowData.length; j++) {
            const [x, y, z] = rowData[j];
            positions[vertexIndex++] = x;
            positions[vertexIndex++] = y;
            positions[vertexIndex++] = z;
          }
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({ size: 15, color: 0x00ff00 });

      points = new THREE.Points(geometry, material);
      scene.add(points);

      renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      window.addEventListener('resize', onWindowResize);

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    init();

    // Cleanup on component unmount
    return () => {
      if (renderer) {
        document.body.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [frameData]);

  return <div ref={rendererRef}></div>;
};

export default PointCloudViewer;




  

//   // const geometry = new THREE.BufferGeometry();
//   // const vertices = new Float32Array(240 * 320 * 3); // Total number of vertices
//   // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
//   // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//   // const pointCloud = new THREE.Mesh(geometry, material);
//   // scene.add(pointCloud);

//   // Create a geometry (a single quad)
//   let imageData = new Float32Array(240 * 320 * 3); 

//   const animate = () => {
//     requestAnimationFrame(animate);

//     if (frameData) {
//       // Iterate through frameData and populate the vertices array
//       // let vertexIndex = 0;
//       // for (let i = 0; i < frameData.length; i++) {
//       //   const rowData = frameData[i];
//       //   for (let j = 0; j < rowData.length; j++) {
//       //     const [x, y, z] = rowData[j];
//       //     vertices[vertexIndex++] = x;
//       //     vertices[vertexIndex++] = y;
//       //     vertices[vertexIndex++] = z;
//       //     // console.log(vertices)
//       //   }
//       // }
//       function clipWithProportion(value, min, max) {
//         return Math.min(Math.max(value, min), max);
//       }
      
//       function clipProportional(value, originalMin, originalMax, targetMin, targetMax) {
//         // Scale the value from the original range to the target range
//         const scaledValue = ((value - originalMin) / (originalMax - originalMin)) * (targetMax - targetMin) + targetMin;
      
//         // Clip the scaled value to the target range
//         return clipWithProportion(scaledValue, targetMin, targetMax);
//       }

//       let vertexIndex = 0;
      
//       for (let i = 0; i < frameData.length; i++) {
//         const rowData = frameData[i];
//         for (let j = 0; j < rowData.length; j++) {
//           const [r, g, b] = rowData[j];
//           let red=clipProportional(Math.abs(r*255), 0, 800, 0, 255);
//           let green=clipProportional(Math.abs(g*255), 0, 800, 0, 255);
//           let blue=clipProportional(Math.abs(b*255), 0, 800, 0, 255);
//           let a = 255
//           imageData[vertexIndex++] = red;
//           imageData[vertexIndex++] = green;
//           imageData[vertexIndex++] = blue;
//           imageData[vertexIndex++] = a;
//           // console.log(vertices)
//         }
//       }
  
// // Create a Uint8Array from the flattened array
//       imageData = new Uint8Array(imageData);
//       console.log("imageDta ", imageData)
//       // pointCloud.geometry.attributes.position.needsUpdate = true;
//     }

//     const geometry = new THREE.PlaneGeometry(2, 2);

// // Create an array of RGB values for each pixel (240x320)
//       // This should contain your RGB data in the format [R, G, B, R, G, B, ...]

// // Create a texture with your image data
// const texture = new THREE.DataTexture(
//   new Uint8Array(imageData),
//   320,
//   240,
//   THREE.RGBAFormat
// );


// // Create a material using the texture
// const material = new THREE.MeshBasicMaterial({ map: texture });

// // Create a mesh
// const mesh = new THREE.Mesh(geometry, material);
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(mesh);
// scene.add(ambientLight)
// texture.needsUpdate = true;
  
//   camera.position.z = 5;

//     // Update the cube's position or other elements based on frameData
//     // Example: cube.rotation.x += frameData.rotationX;

//     renderer.render(scene, camera);
//   };

//   useEffect(() => {
//     animate(); // Start the animation loop
//   }, []);

//   // Update the scene or elements based on frameData whenever it changes
//   useEffect(() => {
//     // Example: cube.rotation.x = frameData.rotationX;
//     // You can update other properties of the scene or objects here.
//   }, [frameData]);

  



