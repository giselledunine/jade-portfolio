import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Star from "./components/Star";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { useEffect } from "react";
import { useTransitionStore } from "./stores/useTransitionStore";
//import LoadingAnimation from "./components/LoadingAnimation";

export default function Layout() {
    const { starAnimationAloadLinks, setStarAnimationAload } =
        useTransitionStore((s) => s);
    const { pathname } = useLocation();
    const location = useLocation();
    useEffect(() => {
        if (!starAnimationAloadLinks.includes(pathname)) {
            setStarAnimationAload(pathname);
        }
    }, [pathname, setStarAnimationAload, starAnimationAloadLinks]);
    return (
        <>
            <Header></Header>
            <div className="h-[100vh] w-[100vw]">
                <Canvas>
                    <Star></Star>
                    <color attach={"background"} args={["pink"]}></color>
                    <ScrollControls
                        pages={location.pathname === "/" ? 1 : 5}
                        damping={0.3}
                        key={location.pathname}>
                        <Outlet />
                    </ScrollControls>
                </Canvas>
            </div>
        </>
    );
}
