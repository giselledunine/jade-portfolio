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
    const triggerAnimation = useTransitionStore((s) => s.triggerAnimation);
    const endAnimation = useTransitionStore((s) => s.endAnimation);

    const handleClick = () => {
        triggerAnimation();
        setTimeout(() => {
            navigate(to);
            endAnimation(); // Important si tu veux éviter des bugs si tu reviens direct
        }, 500); // même durée que dans Layout
    };

    return (
        <button
            className="hover:text-accent hover:cursor-pointer"
            onClick={handleClick}>
            {children}
        </button>
    );
}
