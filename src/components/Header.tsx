import gsap from "gsap";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { AnimatedLink } from "./AnimateLink";
import { useTransitionStore } from "@/stores/useTransitionStore";

export default function Header({
    //    setActive,
    active,
}: {
    active?: string;
    setActive?: Dispatch<SetStateAction<string>>;
}) {
    const headerRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLAnchorElement>(null);
    const firstAnimation = useRef<HTMLDivElement>(null);
    const { isAnimating, starAload } = useTransitionStore((s) => s);

    useEffect(() => {
        const tl = gsap.timeline();
        console.log("ANIMATE", isAnimating, starAload);
        if (isAnimating && !starAload) {
            tl.to(firstAnimation.current, {
                transform: "translateY(0)",
                duration: 1,
            }).to(firstAnimation.current, {
                transform: "translateY(-100%)",
                delay: 1.5,
                duration: 1,
            });
        }
    }, [isAnimating, starAload]);

    useEffect(() => {
        if (active !== "") {
            gsap.to(headerRef.current, {
                color: "#FFFFF4",
                duration: 0.8,
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
                color: "#000000",
                duration: 1.5,
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
    });
    return (
        <>
            <div
                ref={firstAnimation}
                className="absolute z-50 w-full h-[100vh] bg-accent -translate-y-full"></div>
            <div
                ref={headerRef}
                className="fixed top-0 z-40 w-full p-4 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img
                        className="w-[44px] h-[44px]"
                        alt="iconHeader"
                        src="/iconJadePortfolio.svg"></img>
                    <a
                        ref={backRef}
                        //onClick={() => setActive("")}
                        className="hover:cursor-pointer">
                        {"< back"}
                    </a>
                </div>
                <div className="flex gap-4 mr-4 text-primary">
                    <AnimatedLink to={"/"}>Home</AnimatedLink>
                    <AnimatedLink to={"/print"}>Print</AnimatedLink>
                    <AnimatedLink to={"/branding"}>Branding</AnimatedLink>
                    <AnimatedLink to={"/photographie"}>
                        Photographie
                    </AnimatedLink>
                    <AnimatedLink to={"/art"}>Art</AnimatedLink>
                </div>
            </div>
        </>
    );
}
