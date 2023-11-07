import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from 'react-three-fiber';

const PointCloudViewer = ({ socket }) => {
  const { scene } = useThree();
  const [pointCloud, setPointCloud] = useState(null);

  useEffect(() => {
    const handleSocketMessage = (event) => {
      const frameData = JSON.parse(event.data);

      const pointsGeometry = new THREE.BufferGeometry();
      frameData.forEach((point) => {
        pointsGeometry.vertices.push(new THREE.Vector3(point[0], point[1], point[2]));
      });

      const pointsMaterial = new THREE.PointsMaterial({ size: 0.05 });
      const newPointCloud = new THREE.Points(pointsGeometry, pointsMaterial);

      if (pointCloud) {
        scene.remove(pointCloud); // Remove the previous point cloud
      }

      setPointCloud(newPointCloud);
      scene.add(newPointCloud);
    };

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [scene, socket]);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default PointCloudViewer;
