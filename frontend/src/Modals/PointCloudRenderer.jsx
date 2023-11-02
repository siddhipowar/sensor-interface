import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import THREE
import { Canvas, useThree } from 'react-three-fiber';

const PointCloudViewer = () => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket('ws://127.0.0.1:8001/pointcloud-stream/2020045');

    return () => {
      socket.current.close();
    };
  }, []);

  const { scene } = useThree();

  useEffect(() => {
    const handleSocketMessage = (event) => {
      const frameData = JSON.parse(event.data);

      const pointsGeometry = new THREE.Geometry(); // Create a new THREE.Geometry
      frameData.forEach((point) => {
        pointsGeometry.vertices.push(new THREE.Vector3(point[0], point[1], point[2]));
      });

      const pointsMaterial = new THREE.PointsMaterial({ size: 0.05 });
      const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);

      scene.add(pointCloud);
    };

    socket.current.addEventListener('message', handleSocketMessage);

    return () => {
      socket.current.removeEventListener('message', handleSocketMessage);
    };
  }, [scene]);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default PointCloudViewer;
