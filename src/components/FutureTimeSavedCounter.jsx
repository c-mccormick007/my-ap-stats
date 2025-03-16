import { useEffect, useState } from "react";
import StatCard from "./StatCard";

const easeInOutExpo = (t) =>
    t === 0
      ? 0
      : t === 1
      ? 1
      : t < 0.5
      ? Math.pow(2, 20 * t - 10) / 2
      : (2 - Math.pow(2, -20 * t + 10)) / 2;

const calculateJobsSaved = (seconds) => {
    const workdaySeconds = 8 * 60 * 60;
    const annualWorkdays = 260;
    const sampleDays = 18;

    const projectedAnnualSeconds = (seconds / sampleDays) * annualWorkdays;

    const oneJobSeconds = workdaySeconds * annualWorkdays;

    const fullTimeJobsSaved = projectedAnnualSeconds / oneJobSeconds;

    return fullTimeJobsSaved.toFixed(2);
};

const TimeSavedCounter =({ target = 98456123, duration = 5000 }) => {
    const [current, setCurrent] = useState(0);

    //2/6 to 3/4 - implement dynamically when pushing our stats to repo

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

    const formatted = calculateJobsSaved(current);

    return <StatCard label="Potential Yearly Time Saved" color="fuchsia">{formatted}</StatCard>;
};

export default TimeSavedCounter;
