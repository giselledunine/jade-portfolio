//import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";

function App() {
    //const [count, setCount] = useState(0);

    return (
        <div className="w-[100vw] h-[100vh]">
            <Canvas>
                <color attach="background" args={["000000"]} />
                <ScrollControls damping={0.3} pages={5}>
                    <Scroll html style={{ width: "100%" }}>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-black">
                            <h1 className="text-white">Jade</h1>
                        </div>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-white">
                            <h1 className="text-black">Kaidi</h1>
                        </div>
                        <div className="flex justify-center items-center w-[100vw] h-[100vh] bg-black">
                            <h1 className="text-white">Portfolio</h1>
                        </div>
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}

export default App;
