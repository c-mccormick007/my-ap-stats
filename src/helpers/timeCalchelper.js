/**
 * @param {Array} stats - Array of { name, value } objects
 * @param {Object} timePerUnit - Object mapping stat name to seconds saved per unit
 * @returns {Array} - Array of { name, value, seconds_saved } objects
 */

export function calculateTimeSaved(stats, timePerUnit) {
    const grouped = stats.reduce((acc, {name , value}) => {
        if (!acc[name]) {
            acc[name] = 0;
        }
        acc[name] += value;
        return acc;
    }, {});

    let totalSeconds = 0;

    const result = Object.entries(grouped).map(([name, value]) => {
        const secondsSaved = timePerUnit[name] ? value * timePerUnit[name] : 0;
        totalSeconds += secondsSaved;
        return { name, value, seconds_saved: secondsSaved };
    });

    result.total_seconds_saved = totalSeconds;

    return result;
}