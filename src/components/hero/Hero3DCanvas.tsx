import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Network Globe with glowing nodes and connecting arcs
const NetworkGlobe: React.FC = () => {
  const globeGroupRef = useRef<THREE.Group>(null);

  // Generate nodes on sphere surface (lat/lon to 3D Cartesian)
  const { nodePoints, hubCoordinates } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const hubs: { name: string; pos: THREE.Vector3 }[] = [];
    const radius = 2.4;

    // Major global NOC & Cloud regions (approx coordinates)
    const majorLocations = [
      { name: 'Chennai / India', lat: 13.08, lon: 80.27 },
      { name: 'Mumbai (ap-south-1)', lat: 19.07, lon: 72.87 },
      { name: 'Singapore (ap-southeast-1)', lat: 1.35, lon: 103.81 },
      { name: 'Frankfurt (eu-central-1)', lat: 50.11, lon: 8.68 },
      { name: 'Virginia (us-east-1)', lat: 38.03, lon: -78.47 },
      { name: 'Oregon (us-west-2)', lat: 45.51, lon: -122.67 },
      { name: 'Tokyo (ap-northeast-1)', lat: 35.67, lon: 139.65 },
      { name: 'London (eu-west-2)', lat: 51.50, lon: -0.12 },
      { name: 'Sydney (ap-southeast-2)', lat: -33.86, lon: 151.20 }
    ];

    majorLocations.forEach(loc => {
      const phi = (90 - loc.lat) * (Math.PI / 180);
      const theta = (loc.lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      const v = new THREE.Vector3(x, y, z);
      hubs.push({ name: loc.name, pos: v });
      points.push(v);
    });

    // Add random supplementary mesh nodes
    for (let i = 0; i < 90; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.05 + radius;
      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }

    return { nodePoints: points, hubCoordinates: hubs };
  }, []);

  // Create connecting arcs between hubs
  const { arcCurves, arcLineObjects } = useMemo(() => {
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const lines: THREE.Line[] = [];

    const mat1 = new THREE.LineBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.35 });
    const mat2 = new THREE.LineBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.35 });

    for (let i = 0; i < hubCoordinates.length; i++) {
      for (let j = i + 1; j < hubCoordinates.length; j++) {
        if (Math.random() > 0.4) {
          const v1 = hubCoordinates[i].pos;
          const v2 = hubCoordinates[j].pos;
          const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
          const distance = v1.distanceTo(v2);
          mid.normalize().multiplyScalar(2.4 + distance * 0.3);
          const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
          curves.push(curve);

          const points = curve.getPoints(24);
          const geom = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geom, lines.length % 2 === 0 ? mat1 : mat2);
          lines.push(line);
        }
      }
    }
    return { arcCurves: curves, arcLineObjects: lines };
  }, [hubCoordinates]);

  // Traveling data packet particles along the arcs
  const packetCount = 20;
  const packetProgress = useRef<number[]>(arcCurves.map(() => Math.random()));
  const packetMeshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((_, delta) => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += delta * 0.15;
      globeGroupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08;
    }

    // Animate data packets
    arcCurves.forEach((curve, i) => {
      packetProgress.current[i] = (packetProgress.current[i] + delta * 0.35) % 1;
      const mesh = packetMeshRefs.current[i];
      if (mesh) {
        const point = curve.getPoint(packetProgress.current[i]);
        mesh.position.copy(point);
      }
    });
  });

  return (
    <group ref={globeGroupRef} position={[0, 0, 0]}>
      {/* Outer Wireframe Sphere */}
      <mesh>
        <sphereGeometry args={[2.4, 24, 24]} />
        <meshBasicMaterial
          color="#0066ff"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Inner Dense Core */}
      <mesh>
        <sphereGeometry args={[2.36, 16, 16]} />
        <meshBasicMaterial
          color="#00f3ff"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Rotating Latitude Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[2.6, 2.62, 64]} />
        <meshBasicMaterial color="#00f3ff" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 6, 0, 0]}>
        <ringGeometry args={[2.8, 2.82, 64]} />
        <meshBasicMaterial color="#00ff66" side={THREE.DoubleSide} transparent opacity={0.2} />
      </mesh>

      {/* Fixed Geospatial Nodes */}
      {nodePoints.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[idx < 9 ? 0.045 : 0.02, 8, 8]} />
          <meshBasicMaterial
            color={idx < 9 ? (idx % 2 === 0 ? '#00f3ff' : '#00ff66') : '#38bdf8'}
          />
        </mesh>
      ))}

      {/* Connecting Network Arcs Lines as Three.js primitives */}
      <group>
        {arcLineObjects.map((lineObj, idx) => (
          <primitive key={idx} object={lineObj} />
        ))}

        {/* Orbiting / Travelling Packets */}
        {arcCurves.slice(0, packetCount).map((_, idx) => (
          <mesh
            key={`packet-${idx}`}
            ref={(el) => {
              packetMeshRefs.current[idx] = el;
            }}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#00ff66" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 3D Procedural Hardware: Cisco Rack Switch
const HardwareSwitch: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const switchRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (switchRef.current) {
      switchRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={switchRef} position={position} scale={0.5}>
        <mesh>
          <boxGeometry args={[2.4, 0.4, 1.4]} />
          <meshStandardMaterial color="#0a1226" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.71]}>
          <boxGeometry args={[2.36, 0.36, 0.02]} />
          <meshStandardMaterial color="#050a18" metalness={0.9} roughness={0.3} />
        </mesh>
        {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
          <group key={i} position={[x, 0, 0.73]}>
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[0.15, 0.1, 0.02]} />
              <meshBasicMaterial color="#1a2754" />
            </mesh>
            <mesh position={[0, -0.06, 0]}>
              <boxGeometry args={[0.15, 0.1, 0.02]} />
              <meshBasicMaterial color="#1a2754" />
            </mesh>
            <mesh position={[0.1, 0.1, 0]}>
              <sphereGeometry args={[0.02, 6, 6]} />
              <meshBasicMaterial color={i % 2 === 0 ? '#00ff66' : '#00f3ff'} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
};

// 3D Procedural Hardware: Edge Router
const HardwareRouter: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group position={position} scale={0.45}>
        <mesh>
          <cylinderGeometry args={[1.1, 1.2, 0.35, 24]} />
          <meshStandardMaterial color="#0d1b3e" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.19, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.6} />
        </mesh>
        <mesh position={[-0.7, 0.6, -0.4]} rotation={[0.2, 0, -0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
          <meshStandardMaterial color="#1a284e" />
        </mesh>
        <mesh position={[0.7, 0.6, -0.4]} rotation={[0.2, 0, 0.2]}>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
          <meshStandardMaterial color="#1a284e" />
        </mesh>
      </group>
    </Float>
  );
};

// Floating background network particle starfield
const NetworkParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#00f3ff');
    const blue = new THREE.Color('#0066ff');
    const green = new THREE.Color('#00ff66');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      const chosen = Math.random() > 0.6 ? green : Math.random() > 0.3 ? cyan : blue;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.7}
      />
    </points>
  );
};

export const Hero3DCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#00f3ff" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#0066ff" />
        <pointLight position={[3, -2, 4]} intensity={1.2} color="#00ff66" />

        <NetworkParticles />
        <NetworkGlobe />
        <HardwareSwitch position={[-3.6, -1.8, -1]} />
        <HardwareRouter position={[3.6, 1.8, -1.2]} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
    </div>
  );
};
