import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Star from "./components/Star";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
//import LoadingAnimation from "./components/LoadingAnimation";

export default function Layout() {
    return (
        <>
            <Header></Header>
            <div className="h-[100vh] w-[100vw]">
                <Canvas>
                    <color attach={"background"} args={["#FFFFF4"]}></color>
                    <Star></Star>
                    <ScrollControls
                        pages={5}
                        damping={0.3}
                        key={location.pathname}>
                        <Outlet></Outlet>
                    </ScrollControls>
                </Canvas>
            </div>
        </>
    );
}
