import { useNavigate } from "react-router-dom";
import { useTransitionStore } from "../stores/useTransitionStore";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export function AnimatedLink({
    to,
    children,
}: {
    to: string;
    children: React.ReactNode;
}) {
    const navigate = useNavigate();
    const {
        triggerAnimation,
        endAnimation,
        starAnimationAloadLinks,
        setStarAload,
        setStarNotAload,
    } = useTransitionStore((s) => s);
    const { progress } = useProgress();
    const handleClick = () => {
        if (starAnimationAloadLinks.includes(to)) {
            setStarAload();
        }
        triggerAnimation();
        setTimeout(() => {
            navigate(to);
            setStarNotAload();
            endAnimation(); // Important si tu veux éviter des bugs si tu reviens direct
        }, 2200); // même durée que dans Layout
    };

    useEffect(() => {
        console.log("progress", progress);
    }, [progress]);

    return (
        <button
            className="hover:text-accent hover:cursor-pointer"
            onClick={handleClick}>
            {children}
        </button>
    );
}
