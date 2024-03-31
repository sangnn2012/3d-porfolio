import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';


//     <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
//         Popup
//     </div>

const Home = () => {
    const [currentStage, setCurrentStage] = useState(1);
    const [isRotating, setIsRotating] = useState(false);
    const [isPlayingMusic, setIsPlayingMusic] = useState(false);

    const adjustIslandForScreenSize = () => {
        let screenScale = null, 
        screenPosition = [0, -6.5, -43], 
        rotation = [0.1, 4.7, 0];
        if(window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }

        return [screenScale, screenPosition, rotation];
    }

    const adjustPlaneForScreenSize = () => {
        let screenScale, screenPosition;
        if(window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 0];
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -4, -5];
        }

        return [screenScale, screenPosition];
    }

    const [islandScale, isLandPosition] = adjustIslandForScreenSize();
    const [planeScale, planePosition] = adjustPlaneForScreenSize();

    return (
        <section className="w-full h-screen relative">
            <Canvas 
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}` }
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    {/* Read README for more info about three components*/}
                    <directionalLight 
                        position={[1,1,1]}
                        intensity={2}
                    />
                    <ambientLight intensity={0.2} />
                    <hemisphereLight 
                        skyColor="#b1e1ff" 
                        groundColor="#000000" 
                        intensity={1}
                    />

                    <Bird />
                    <Sky />
                    <Island 
                        position={isLandPosition}
                        scale={islandScale}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane 
                        position={planePosition}
                        scale={planeScale}
                        setIsRotating={setIsRotating}
                        rotation={[0, 20.1, 0]}
                    />
                </Suspense>
            </Canvas>
        </section>
        
    )
};

export default Home;