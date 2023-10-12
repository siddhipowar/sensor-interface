import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PointCloudMaterial, PointCloudOctree, PointSizeType } from 'three-point-cloud';
// import { getVerticesFromBytes } from './your-utility'; // Replace with your utility to convert bytes to vertices

function getVerticesFromBytes(binaryData) {
    const dataView = new DataView(binaryData);
  
    // Assuming each point has X, Y, and Z coordinates as 32-bit floats (12 bytes per point)
    const numPoints = binaryData.byteLength / 12;
    const vertices = new Float32Array(numPoints * 3);
  
    for (let i = 0; i < numPoints; i++) {
      const offset = i * 12;
  
      // Read X, Y, and Z coordinates
      const x = dataView.getFloat32(offset, true);  // true indicates little-endian
      const y = dataView.getFloat32(offset + 4, true);
      const z = dataView.getFloat32(offset + 8, true);
  
      // Store the coordinates in the vertices array
      vertices[i * 3] = x;
      vertices[i * 3 + 1] = y;
      vertices[i * 3 + 2] = z;
    }
  
    return vertices;
  }
  
const PointCloudRenderer = ({ binaryData }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  const pointCloud = new PointCloudOctree();

  const containerRef = useRef();

  useEffect(() => {
    // Set up your Three.js scene
    camera.position.z = 5;

    const material = new PointCloudMaterial();
    material.sizeType = PointSizeType.ATTENUATED;

    // Set up the point cloud
    pointCloud.material = material;

    // Set up the binary data to vertices (replace this with your data conversion utility)
    const vertices = getVerticesFromBytes(binaryData);

    // Add vertices to the point cloud
    pointCloud.geometry.setFromVertices(vertices);

    scene.add(pointCloud);

    // Append the renderer to the container
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, [binaryData]);

  return <div ref={containerRef} />;
};

export default PointCloudRenderer;
