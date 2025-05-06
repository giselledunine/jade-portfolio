import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useTransitionStore } from "./stores/useTransitionStore";
import { useEffect, useRef } from "react";
import gsap from "gsap";
//import LoadingAnimation from "./components/LoadingAnimation";

export default function Layout() {
    const { isAnimating } = useTransitionStore((s) => s);
    const linkAnimation = useRef<HTMLDivElement>(null);
    const tl = gsap.timeline();

    useEffect(() => {
        if (isAnimating) {
            tl.to(
                linkAnimation.current,
                {
                    transform: "translateY(0px)",
                },
                0
            ).to(
                linkAnimation.current,
                {
                    transform: "translateY(-100%)",
                },
                1
            );
        }
    });

    return (
        <>
            <div
                ref={linkAnimation}
                className="absolute top-0 z-50 w-[100vw] h-[100vh] bg-[#00C21F] -translate-y-full"></div>
            {/* <LoadingAnimation></LoadingAnimation> */}
            <Header></Header>
            <Outlet></Outlet>
        </>
    );
}
