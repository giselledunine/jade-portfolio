import { useTransitionStore } from "@/stores/useTransitionStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const { hover } = useTransitionStore((s) => s);
    useEffect(() => {
        document.addEventListener("mousemove", (e) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                });
            }
        });
    }, []);

    useEffect(() => {
        if (cursorRef.current) {
            if (hover) {
                gsap.to(cursorRef.current, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power3.inOut",
                });
            } else {
                gsap.to(cursorRef.current, {
                    scale: 0,
                    duration: 0.2,
                    ease: "power3.inOut",
                });
            }
        }
    }, [hover]);
    return (
        <div
            ref={cursorRef}
            className={`absolute pointer-events-none flex justify-center items-center -translate-1/2 bg-accent z-50 w-[80px] h-[80px] rounded-full`}>
            <span className="text-lg/4 text-secondary text-center">
                Double Click
            </span>
        </div>
    );
}
