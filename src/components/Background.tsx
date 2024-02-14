import { Box, OrbitControls, Plane, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";
import useStore from "../state/store";

const Background = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 opacity-50">
      <Canvas
        camera={{
          position: [1.0798102224990016, 4.7193683979334, 1.249630502917676],
        }}
      >
        <Boxes />
        <Boxes x={-3} delay={1200} />
        <Boxes x={-6} delay={300} />
        <Boxes x={-9} delay={600} />
        <Boxes x={3} delay={2000} />
        <Boxes x={6} delay={400} />
        <Boxes x={9} delay={200} />
      </Canvas>
    </div>
  );
};

const Boxes = ({ x = 0, delay = 0 }) => {
  const store = useStore();
  const [props] = useSpring(() => ({
    from: { position: [x, 0, 15] },
    to: { position: [x, 0, -15] },
    delay: delay,

    config: { mass: 0.1, tension: 50 * (1 + store.autorecyclers) },
    loop: true,
  }));

  return <Boxy position={props.position} />;
};

const Boxy = (props: any) => {
  return (
    <animated.mesh {...props}>
      <Box
        material={
          new THREE.MeshBasicMaterial({
            color: new THREE.Color("#D8FF42").convertSRGBToLinear(),
          })
        }
        args={[2, 0.01, 3]}
        castShadow
      />
    </animated.mesh>
  );
};

export default Background;
