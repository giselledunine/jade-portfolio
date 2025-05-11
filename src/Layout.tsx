import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Star from "./components/Star";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useTransitionStore } from "./stores/useTransitionStore";
import LoadingAnimation from "./components/LoadingAnimation";
import Cursor from "./components/Cursor";
//import LoadingAnimation from "./components/LoadingAnimation";

export default function Layout() {
    const { starAnimationAloadLinks, setStarAnimationAload } =
        useTransitionStore((s) => s);
    const location = useLocation();
    const pages = useMemo(() => {
        console.log("location", location.pathname);
        switch (location.pathname) {
            case "/":
                return 1;
            case "/photographie":
                return 2;
            default:
                return 5;
        }
    }, [location.pathname]);

    useEffect(() => {
        if (!starAnimationAloadLinks.includes(location.pathname)) {
            setStarAnimationAload(location.pathname);
        }
    }, [location.pathname, setStarAnimationAload, starAnimationAloadLinks]);
    return (
        <>
            <Header></Header>
            <Cursor></Cursor>
            <LoadingAnimation></LoadingAnimation>
            <div className="h-[100vh] w-[100vw]">
                <Canvas
                    orthographic
                    camera={{ zoom: 100, position: [0, 0, 10] }}>
                    <Star></Star>
                    <ScrollControls
                        pages={pages}
                        damping={0.3}
                        key={location.pathname}>
                        <Outlet />
                    </ScrollControls>
                </Canvas>
            </div>
        </>
    );
}
