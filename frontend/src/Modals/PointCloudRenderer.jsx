import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PointCloudViewer = ({ frameData }) => {
  const rendererRef = useRef(null);

  useEffect(() => {
    let camera, scene, points, renderer;

    function getColor(z, zMin, zMax) {
      // Ensure valid numbers and prevent division by zero
      if (zMin === zMax || isNaN(z) || isNaN(zMin) || isNaN(zMax)) {
        return { r: 0, g: 0, b: 0 };
      }
    
      // Normalize z value
      const zNorm = (z - zMin) / (zMax - zMin);
    
      // Define gradient breakpoints and colors
      const gradient = [
        { bp: 0, color: new THREE.Color(0x00ffff) },    // Blue-Green
        { bp: 0.25, color: new THREE.Color(0x00ff00) }, // Green
        { bp: 0.5, color: new THREE.Color(0xffff00) },  // Yellow
        { bp: 0.75, color: new THREE.Color(0xff7f00) }, // Orange
        { bp: 1, color: new THREE.Color(0xff0000) }     // Red
      ];
    
      // Find the two breakpoints the zNorm falls between
      let prevBp = gradient[0], nextBp = gradient[gradient.length - 1];
      for (let i = 1; i < gradient.length; i++) {
        if (zNorm < gradient[i].bp) {
          nextBp = gradient[i];
          prevBp = gradient[i - 1];
          break;
        }
      }
    
      // Linear interpolation between the two colors
      const alpha = (zNorm - prevBp.bp) / (nextBp.bp - prevBp.bp);
      const color = prevBp.color.clone().lerp(nextBp.color, alpha);
    
      return { r: color.r, g: color.g, b: color.b };
    }
    

    const init = () => {
      camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
      camera.position.z = 2750;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x050505);

      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = []; 

      if (frameData) {
        let vertexIndex = 0;
        let zmin = Number.POSITIVE_INFINITY;
        let zmax = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < frameData.length; i++) {
          const rowData = frameData[i];
          for (let j = 0; j < rowData.length; j++) {
            const [x, y, z] = rowData[j];
            zmin = Math.min(zmin, z);
            zmax = Math.max(zmax, z);
            // positions[vertexIndex++] = x;
            // positions[vertexIndex++] = y;
            // positions[vertexIndex++] = z;

            // // Calculate color based on z-coordinate using the getColor function
            // const color = getColor(z, 1000, 3000);
            // colors.push(color);
            // Calculate color based on z-coordinate using the getColor function
            // console.log(z, zmin, zmax);
            const color = getColor(z, zmin, zmax);
            
            // Ensure color is a THREE.Color instance
            const threeColor = new THREE.Color(color.r, color.g, color.b);

            positions[vertexIndex++] = x;
            positions[vertexIndex++] = y;
            positions[vertexIndex++] = z;

            colors.push(threeColor.r, threeColor.g, threeColor.b);
          }
        }
      }
      
      //geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      // const material = new THREE.PointsMaterial({ size: 1, color: 0x00ff00 });
      const material = new THREE.PointsMaterial({ size: 1, vertexColors: true});

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




  
