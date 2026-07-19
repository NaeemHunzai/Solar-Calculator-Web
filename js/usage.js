// ===================================
// SOLAR TOOLKIT USAGE TRACKER
// ===================================

const STORAGE_KEY = "solarToolkitUsage";

const DEFAULT_QUICK_ACCESS = [
    "battery-backup",
    "solar-system-size",
    "inverter-size",
    "roi-calculator"
];

// Record calculator usage
function recordUsage(id) {

    let usage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    usage[id] = (usage[id] || 0) + 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));

}

// Return complete usage object
function getUsageData() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

}

// Return top calculator ids
function getTopCalculators(limit = 4) {

    const usage = getUsageData();

    const ids = Object.keys(usage);

    if (ids.length === 0) {

        return DEFAULT_QUICK_ACCESS;

    }

    ids.sort((a, b) => usage[b] - usage[a]);

    const result = ids.slice(0, limit);

    // Fill remaining slots with defaults
    DEFAULT_QUICK_ACCESS.forEach(id => {

        if (!result.includes(id) && result.length < limit) {

            result.push(id);

        }

    });

    return result;

}

// Reset usage (for testing)
function resetUsage() {

    localStorage.removeItem(STORAGE_KEY);

}

// Automatically record calculator usage
document.addEventListener("DOMContentLoaded", function () {

    const calculatorId = document.body.dataset.calculator;

    if (calculatorId) {

        recordUsage(calculatorId);

    }

});