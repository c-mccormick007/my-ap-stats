import { useEffect, useState } from "react";
import StatCard from "./StatCard";

const easeInOutExpo = (t) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

const calculateJobsSaved = (seconds, days) => {
    const workdaySeconds = 8 * 60 * 60;
    const annualWorkdays = 260;

    const projectedAnnualSeconds = (seconds / (days+13)) * annualWorkdays; //13 for the lapse in time between 2/6 and first commit

    const oneJobSeconds = workdaySeconds * annualWorkdays;

    const fullTimeJobsSaved = projectedAnnualSeconds / oneJobSeconds;

    return fullTimeJobsSaved.toFixed(2);
};

const TimeSavedCounter =({ target = 98456123, duration = 5000 , days = 0}) => {
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

    const formatted = calculateJobsSaved(current, days);

    return <StatCard label="Potential Yearly Time Saved" color="fuchsia">{formatted} FTEs</StatCard>;
};

export default TimeSavedCounter;
