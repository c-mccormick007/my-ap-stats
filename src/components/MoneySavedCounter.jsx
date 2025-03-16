import { useEffect, useState } from "react";
import StatCard from "./StatCard";

const easeInOutExpo = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

const MoneySavedCounter =({ target = 98456123, duration = 5000 }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        let animationFrameId;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutExpo(progress);
            const newValue = eased * target;

            setCurrent(newValue);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else{
                setCurrent(target);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [target, duration]);

    const formatted = current.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });

    return <StatCard label="Money Saved" color="green">{formatted}</StatCard>;
};

export default MoneySavedCounter;
