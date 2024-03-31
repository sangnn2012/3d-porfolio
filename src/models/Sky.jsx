import SkySene from '../assets/3d/sky.glb';
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


const Sky = ({ isRotating }) => {
    const sky = useGLTF(SkySene)
    const skyRef = useRef();

    useFrame((_, delta) => {
        if (isRotating) {
            // Adjust the rotation speed as needed
            skyRef.current.rotation.y += 0.25 * delta;
        }
    });

    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    )
};

export default Sky;