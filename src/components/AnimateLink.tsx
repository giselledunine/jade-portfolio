import { useNavigate } from "react-router-dom";
import { useTransitionStore } from "../stores/useTransitionStore";

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

    return (
        <button
            className="hover:text-accent hover:cursor-pointer"
            onClick={handleClick}>
            {children}
        </button>
    );
}
