import React from 'react';
import SkySene from '../assets/3d/sky.glb';
import { useGLTF } from '@react-three/drei'


const Sky = () => {
    const sky = useGLTF(SkySene)
    return (
        <mesh>
            <primitive object={sky.scene} />
        </mesh>
    )
};

export default Sky;