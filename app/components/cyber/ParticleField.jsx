import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 200 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((particle, index) => {
      let { time, factor, speed, x, y, z } = particle;
      time = particle.time += speed / 2;
      const a = Math.cos(time) + Math.sin(time * 1) / 20;
      const b = Math.sin(time) + Math.cos(time * 2) / 20;
      const s = Math.cos(time);

      dummy.position.set(
        x + Math.cos((time / 20) * factor) + (Math.sin(time * 1) * factor) / 10,
        y + Math.sin((time / 20) * factor) + (Math.cos(time * 2) * factor) / 10,
        z + Math.cos((time / 20) * factor) + (Math.sin(time * 3) * factor) / 10
      );

      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index++, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <pointLight ref={light} distance={400} intensity={8} color="#00f0ff" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[2, 0]} />
        <meshPhongMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} transparent opacity={0.3} />
      </instancedMesh>
    </>
  );
}

function Stars({ count = 5000 }) {
  const positions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    return new Float32Array(positions);
  }, [count]);

  return (
    <points positions={positions}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

function FloatingGeometry() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.002;
      mesh.current.rotation.y += 0.003;
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 2;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -50]}>
      <torusKnotGeometry args={[10, 3, 200, 32]} />
      <meshStandardMaterial
        color="#b846f4"
        emissive="#b846f4"
        emissiveIntensity={0.2}
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 150], fov: 75, near: 0.1, far: 2000 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[100, 100, 100]} intensity={0.5} color="#00f0ff" />
        <pointLight position={[-100, -100, -100]} intensity={0.3} color="#b846f4" />
        <Particles count={150} />
        <Stars count={3000} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
