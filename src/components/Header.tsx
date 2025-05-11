import gsap from "gsap";
import { useEffect, useRef } from "react";
import { AnimatedLink } from "./AnimateLink";
import { useTransitionStore } from "@/stores/useTransitionStore";
import { useTheme } from "@/ThemeProvider";

export default function Header() {
    const headerRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLAnchorElement>(null);
    const { setPortalActive, activePortal } = useTransitionStore((s) => s);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        if (activePortal !== "") {
            gsap.to(headerRef.current, {
                color: "var(--secondary)",
                delay: 0.3,
                ease: "power3.inOut",
            });
            gsap.to(backRef.current, {
                visibility: "visible",
                duration: 0.8,
                ease: "power3.inOut",
            });
            gsap.to(backRef.current, {
                opacity: 1,
                duration: 0.8,
                ease: "power3.inOut",
            });
        } else {
            gsap.to(headerRef.current, {
                color: "var(--primary)",
                delay: 0.9,
                ease: "power3.inOut",
            });
            gsap.to(backRef.current, {
                visibility: "hidden",
                delay: 0.8,
                duration: 0.8,
                ease: "power3.inOut",
            });
            gsap.to(backRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power3.inOut",
            });
        }
    }, [activePortal]);
    return (
        <>
            <div
                ref={headerRef}
                id="header"
                className="fixed text-primary top-0 z-40 w-full p-4 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img
                        className="w-[44px] h-[44px]"
                        alt="iconHeader"
                        src="/iconJadePortfolio.svg"></img>
                    <a
                        ref={backRef}
                        onClick={() => setPortalActive("")}
                        className="hover:cursor-pointer">
                        {"< back"}
                    </a>
                </div>
                <div className="flex gap-4 mr-4">
                    <AnimatedLink to={"/"}>Home</AnimatedLink>
                    <AnimatedLink to={"/print"}>Print</AnimatedLink>
                    <AnimatedLink to={"/branding"}>Branding</AnimatedLink>
                    <AnimatedLink to={"/photographie"}>
                        Photographie
                    </AnimatedLink>
                    <AnimatedLink to={"/art"}>Art</AnimatedLink>
                    <button
                        onClick={() =>
                            theme == "light"
                                ? setTheme("dark")
                                : setTheme("light")
                        }>
                        {theme === "light" ? "light" : "dark"}
                    </button>
                </div>
            </div>
        </>
    );
}
