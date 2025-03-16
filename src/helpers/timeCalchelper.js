/**
 * @param {Array} stats - Array of { name, value } objects
 * @param {Object} timePerUnit - Object mapping stat name to seconds saved per unit
 * @returns {Array} - Array of { name, value, seconds_saved } objects
 */

export function calculateTimeSaved(stats, timePerUnit) {
    return stats.map((entry) => {
        const secondsSaved = timePerUnit[entry.name]
        ? entry.value * timePerUnit[entry.name]
        : 0;

        return {
            ...entry,
            seconds_saved: secondsSaved
        };
    });
}