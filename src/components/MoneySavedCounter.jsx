import { useEffect, useState } from "react";

const easeInOutExpo = (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2;

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

    return (
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-green-500 rounded-2xl shadow-[0_10px_25px_rgba(0,255,100,0.2)] p-6 max-w-md mx-auto">
            <div className="text-4xl font-bold text-green-400 text-center p-4">
                    {formatted} Saved
            </div>
        </div>
    );
};

export default MoneySavedCounter;
