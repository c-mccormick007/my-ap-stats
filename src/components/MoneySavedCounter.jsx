import { useEffect, useState } from "react";

const MoneySavedCounter =({ target = 10000, duration = 2000 }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment   = Math.ceil(target / (duration / 16));
        const interval = setInterval(() => {
            start += increment;
            setCurrent(start);
            if (start >= target) {
                setCurrent(target);
                clearInterval(interval);
            } else {
                setCurrent(start);
            }
        }, 16);
    }, [target, duration]);

    const formatted = current.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });

    return (
        <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 border border-green-500 rounded-2xl shadow-[0_10px_25px_rgba(0,255,100,0.2)] p-6 max-w-md mx-auto">
            <div className="text-4xl font-bold, text-green-400 text-center p-4">
                    {formatted} Saved
            </div>
        </div>
    );
};

export default MoneySavedCounter;
