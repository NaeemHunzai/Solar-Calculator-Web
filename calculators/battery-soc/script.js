// -------------------------
// INPUTS
// -------------------------

const batteryType = document.getElementById("batteryType");
const batteryVoltage = document.getElementById("batteryVoltage");
const customVoltageGroup = document.getElementById("customVoltageGroup");
const customVoltage = document.getElementById("customVoltage");

const batteryCapacity = document.getElementById("batteryCapacity");

const calculationMethod = document.getElementById("calculationMethod");

const voltageMethod = document.getElementById("voltageMethod");
const remainingMethod = document.getElementById("remainingMethod");
const usedMethod = document.getElementById("usedMethod");

const batteryVoltageReading = document.getElementById("batteryVoltageReading");
const remainingCapacity = document.getElementById("remainingCapacity");
const usedCapacity = document.getElementById("usedCapacity");

const batteryTemp = document.getElementById("batteryTemp");
const batteryRest = document.getElementById("batteryRest");

const loadPower = document.getElementById("loadPower");

// -------------------------
// BUTTONS
// -------------------------

const calculateBtn = document.querySelector(".primary-button");
const resetBtn = document.querySelector(".secondary-button");

// -------------------------
// RESULT SHEET
// -------------------------

const resultSheet = document.getElementById("resultSheet");
const doneButton = document.getElementById("doneButton");
const closeSheet = document.getElementById("closeSheet");
const copyResults = document.getElementById("copyResults");

// -------------------------
// RESULT FIELDS
// -------------------------

const socResult = document.getElementById("socResult");
const batteryStatusResult = document.getElementById("batteryStatusResult");

const remainingCapacityResult = document.getElementById("remainingCapacityResult");
const usedCapacityResult = document.getElementById("usedCapacityResult");

const remainingEnergyResult = document.getElementById("remainingEnergyResult");
const usedEnergyResult = document.getElementById("usedEnergyResult");

const dodResult = document.getElementById("dodResult");

const backupTimeRow = document.getElementById("backupTimeRow");
const backupTimeResult = document.getElementById("backupTimeResult");

const batteryTypeResult = document.getElementById("batteryTypeResult");
const batteryVoltageResult = document.getElementById("batteryVoltageResult");
const methodResult = document.getElementById("methodResult");

const recommendationResult = document.getElementById("recommendationResult");

const accuracyRow = document.getElementById("accuracyRow");
const accuracyResult = document.getElementById("accuracyResult");

const temperatureResult = document.getElementById("temperatureResult");

const engineeringSummary = document.getElementById("engineeringSummary");

// -------------------------
// NOTIFIER
// -------------------------

const notifier = document.getElementById("notifier");
const notifierText = document.getElementById("notifierText");

function showNotifier(message){

    notifierText.textContent = message;

    notifier.classList.add("show");

    setTimeout(function(){

        notifier.classList.remove("show");

    },2500);

}

// -------------------------
// OPEN RESULT SHEET
// -------------------------

function openSheet(){

    resultSheet.classList.add("show");

}

// -------------------------
// CLOSE RESULT SHEET
// -------------------------

function closeResultSheet(){

    resultSheet.classList.remove("show");

}

doneButton.onclick = closeResultSheet;
closeSheet.onclick = closeResultSheet;

// Tap outside to close

resultSheet.addEventListener("click", function(e){

    if(e.target === resultSheet){

        closeResultSheet();

    }

});

// -------------------------
// UI EVENTS
// -------------------------

batteryVoltage.addEventListener("change", function(){

    if(batteryVoltage.value === "custom"){

        customVoltageGroup.classList.remove("hidden");

    }

    else{

        customVoltageGroup.classList.add("hidden");

        customVoltage.value = "";

    }

});

calculationMethod.addEventListener("change", function(){

    voltageMethod.classList.add("hidden");
    remainingMethod.classList.add("hidden");
    usedMethod.classList.add("hidden");

    if(calculationMethod.value === "voltage"){

        voltageMethod.classList.remove("hidden");

    }

    else if(calculationMethod.value === "remaining"){

        remainingMethod.classList.remove("hidden");

    }

    else{

        usedMethod.classList.remove("hidden");

    }

});
// -------------------------
// BATTERY DATABASE
// Resting open-circuit voltage
// Values are for a 12 V battery.
// Higher-voltage banks are normalized
// back to 12 V before interpolation.
// -------------------------

const batteryDatabase = {

    leadacid:[

        {soc:100, voltage:12.73},
        {soc:90, voltage:12.62},
        {soc:80, voltage:12.50},
        {soc:70, voltage:12.37},
        {soc:60, voltage:12.24},
        {soc:50, voltage:12.10},
        {soc:40, voltage:11.96},
        {soc:30, voltage:11.81},
        {soc:20, voltage:11.66},
        {soc:10, voltage:11.51},
        {soc:0, voltage:11.31}

    ],

    agm:[

        {soc:100, voltage:12.90},
        {soc:90, voltage:12.80},
        {soc:80, voltage:12.70},
        {soc:70, voltage:12.58},
        {soc:60, voltage:12.46},
        {soc:50, voltage:12.34},
        {soc:40, voltage:12.22},
        {soc:30, voltage:12.10},
        {soc:20, voltage:11.98},
        {soc:10, voltage:11.86},
        {soc:0, voltage:11.70}

    ],

    gel:[

        {soc:100, voltage:12.85},
        {soc:90, voltage:12.75},
        {soc:80, voltage:12.65},
        {soc:70, voltage:12.53},
        {soc:60, voltage:12.41},
        {soc:50, voltage:12.29},
        {soc:40, voltage:12.17},
        {soc:30, voltage:12.05},
        {soc:20, voltage:11.93},
        {soc:10, voltage:11.81},
        {soc:0, voltage:11.60}

    ],

    lifepo4:[

        {soc:100, voltage:13.60},
        {soc:90, voltage:13.40},
        {soc:80, voltage:13.30},
        {soc:70, voltage:13.25},
        {soc:60, voltage:13.20},
        {soc:50, voltage:13.15},
        {soc:40, voltage:13.10},
        {soc:30, voltage:13.00},
        {soc:20, voltage:12.90},
        {soc:10, voltage:12.60},
        {soc:0, voltage:10.00}

    ],

    lithiumion:[

        {soc:100, voltage:12.60},
        {soc:90, voltage:12.45},
        {soc:80, voltage:12.30},
        {soc:70, voltage:12.15},
        {soc:60, voltage:12.00},
        {soc:50, voltage:11.85},
        {soc:40, voltage:11.70},
        {soc:30, voltage:11.40},
        {soc:20, voltage:11.10},
        {soc:10, voltage:10.80},
        {soc:0, voltage:9.00}

    ]

};

// -------------------------
// GET BATTERY VOLTAGE
// -------------------------

function getBatteryVoltage(){

    if(batteryVoltage.value==="custom"){

        return Number(customVoltage.value);

    }

    return Number(batteryVoltage.value);

}

// -------------------------
// INTERPOLATE SOC
// -------------------------

function interpolateSOC(type, voltage){

    const table = batteryDatabase[type];

    if(voltage >= table[0].voltage){

        return 100;

    }

    if(voltage <= table[table.length-1].voltage){

        return 0;

    }

    for(let i=0;i<table.length-1;i++){

        const upper = table[i];
        const lower = table[i+1];

        if(voltage <= upper.voltage &&
           voltage >= lower.voltage){

            const soc =

            lower.soc +

            (voltage-lower.voltage)

            *

            (upper.soc-lower.soc)

            /

            (upper.voltage-lower.voltage);

            return soc;

        }

    }

    return 0;

}

// -------------------------
// FORMAT TIME
// -------------------------

function formatTime(hours){

    if(!isFinite(hours) || hours<=0){

        return "--";

    }

    const h = Math.floor(hours);

    const m = Math.round((hours-h)*60);

    if(h===0){

        return m+" min";

    }

    if(m===0){

        return h+" hr";

    }

    return h+" hr "+m+" min";

}
// -------------------------
// CALCULATE
// -------------------------

calculateBtn.addEventListener("click", function(){

// -------------------------
// EMPTY FIELD VALIDATION
// -------------------------

if(batteryCapacity.value.trim() === ""){

    showNotifier("Please enter Battery Capacity.");

    batteryCapacity.focus();

    return;

}

if(calculationMethod.value === "voltage"){

    if(batteryVoltageReading.value.trim() === ""){

        showNotifier("Please enter Measured Battery Voltage.");

        batteryVoltageReading.focus();

        return;

    }

}

if(calculationMethod.value === "remaining"){

    if(remainingCapacity.value.trim() === ""){

        showNotifier("Please enter Remaining Capacity.");

        remainingCapacity.focus();

        return;

    }

}

if(calculationMethod.value === "used"){

    if(usedCapacity.value.trim() === ""){

        showNotifier("Please enter Used Capacity.");

        usedCapacity.focus();

        return;

    }

}

if(batteryVoltage.value === "custom"){

    if(customVoltage.value.trim() === ""){

        showNotifier("Please enter Custom Battery Voltage.");

        customVoltage.focus();

        return;

    }

}

// -------------------------
// READ VALUES
// -------------------------

const capacity =
Number(batteryCapacity.value);

const bankVoltage =
getBatteryVoltage();

const temperature =
Number(batteryTemp.value);

const load =
Number(loadPower.value);

let soc = 0;

let measuredVoltage = 0;

let remainingAh = 0;

let usedAh = 0;

// -------------------------
// RANGE VALIDATION
// -------------------------

if(capacity <= 0){

    showNotifier("Battery Capacity must be greater than zero.");

    batteryCapacity.focus();

    return;

}

if(bankVoltage <= 0){

    showNotifier("Battery Voltage must be greater than zero.");

    if(batteryVoltage.value === "custom"){

        customVoltage.focus();

    }

    return;

}

// -------------------------
// SOC CALCULATION
// -------------------------

if(calculationMethod.value === "voltage"){

    measuredVoltage =
    Number(batteryVoltageReading.value);

    if(measuredVoltage <= 0){

        showNotifier("Measured Battery Voltage must be greater than zero.");

        batteryVoltageReading.focus();

        return;

    }

    // Normalize battery bank voltage to 12 V equivalent

    const normalizedVoltage =

    measuredVoltage /

    (bankVoltage / 12);

    soc = interpolateSOC(

        batteryType.value,

        normalizedVoltage

    );

    remainingAh =
    capacity * soc / 100;

    usedAh =
    capacity - remainingAh;

}

else if(calculationMethod.value === "remaining"){

    remainingAh =
    Number(remainingCapacity.value);

    if(remainingAh < 0){

        showNotifier("Remaining Capacity cannot be negative.");

        remainingCapacity.focus();

        return;

    }

    if(remainingAh > capacity){

        showNotifier("Remaining Capacity cannot exceed Battery Capacity.");

        remainingCapacity.focus();

        return;

    }

    soc =
    (remainingAh / capacity) * 100;

    usedAh =
    capacity - remainingAh;

}

else{

    usedAh =
    Number(usedCapacity.value);

    if(usedAh < 0){

        showNotifier("Used Capacity cannot be negative.");

        usedCapacity.focus();

        return;

    }

    if(usedAh > capacity){

        showNotifier("Used Capacity cannot exceed Battery Capacity.");

        usedCapacity.focus();

        return;

    }

    remainingAh =
    capacity - usedAh;

    soc =
    (remainingAh / capacity) * 100;

}

// -------------------------
// LIMIT SOC
// -------------------------

soc = Math.max(0, Math.min(100, soc));
// -------------------------
// DERIVED CALCULATIONS
// -------------------------

const remainingEnergy =
(remainingAh * bankVoltage);

const usedEnergy =
(usedAh * bankVoltage);

const dod =
100 - soc;

let backupTime = 0;

if(load > 0){

    backupTime =
    remainingEnergy / load;

}

// -------------------------
// BATTERY STATUS
// -------------------------

let batteryStatus = "";

if(soc >= 95){

    batteryStatus = "Fully Charged";

}

else if(soc >= 80){

    batteryStatus = "Excellent";

}

else if(soc >= 60){

    batteryStatus = "Good";

}

else if(soc >= 40){

    batteryStatus = "Moderate";

}

else if(soc >= 20){

    batteryStatus = "Low";

}

else if(soc >= 10){

    batteryStatus = "Very Low";

}

else{

    batteryStatus = "Critical";

}

// -------------------------
// RECOMMENDATION
// -------------------------

let recommendation = "";

if(soc >= 95){

    recommendation =
    "Battery is fully charged and ready for use.";

}

else if(soc >= 80){

    recommendation =
    "Battery charge is healthy.";

}

else if(soc >= 60){

    recommendation =
    "Battery is in normal operating range.";

}

else if(soc >= 40){

    recommendation =
    "Consider recharging soon.";

}

else if(soc >= 20){

    recommendation =
    "Recharge recommended.";

}

else if(soc >= 10){

    recommendation =
    "Recharge immediately.";

}

else{

    recommendation =
    "Critical battery level. Charge now to avoid damage.";

}

// -------------------------
// VOLTAGE ACCURACY
// -------------------------

let voltageAccuracy = "--";

if(calculationMethod.value === "voltage"){

    if(batteryRest.value === "yes"){

        voltageAccuracy =
        "High (Battery at Rest)";

    }

    else{

        voltageAccuracy =
        "Approximate (Battery Under Load)";

    }

}

// -------------------------
// TEMPERATURE WARNING
// -------------------------

let temperatureWarning = "";

if(temperature < 0){

    temperatureWarning =
    "Low temperature may reduce available battery capacity.";

}

else if(temperature > 40){

    temperatureWarning =
    "High temperature may shorten battery life.";

}

else{

    temperatureWarning =
    "Battery temperature is within the normal operating range.";

}

// -------------------------
// ENGINEERING SUMMARY
// -------------------------

let engineeringText =

"Battery SOC is "

+ soc.toFixed(1)

+ "%. ";

engineeringText +=

"Estimated DOD is "

+ dod.toFixed(1)

+ "%. ";

engineeringText +=

"Battery condition is "

+ batteryStatus

+ ". ";

if(load > 0){

    engineeringText +=

    "Estimated backup time is "

    + formatTime(backupTime)

    + ". ";

}

if(calculationMethod.value === "voltage"){

    engineeringText +=

    voltageAccuracy

    + ".";

}
// -------------------------
// POPULATE RESULTS
// -------------------------

socResult.textContent =
soc.toFixed(1) + " %";

batteryStatusResult.textContent =
batteryStatus;

remainingCapacityResult.textContent =
remainingAh.toFixed(1) + " Ah";

usedCapacityResult.textContent =
usedAh.toFixed(1) + " Ah";

remainingEnergyResult.textContent =
remainingEnergy.toFixed(0) + " Wh";

usedEnergyResult.textContent =
usedEnergy.toFixed(0) + " Wh";

dodResult.textContent =
dod.toFixed(1) + " %";

batteryTypeResult.textContent =
batteryType.options[batteryType.selectedIndex].text;

batteryVoltageResult.textContent =
bankVoltage + " V";

methodResult.textContent =
calculationMethod.options[calculationMethod.selectedIndex].text;

recommendationResult.textContent =
recommendation;

temperatureResult.textContent =
temperatureWarning;

engineeringSummary.textContent =
engineeringText;

// -------------------------
// BACKUP TIME
// -------------------------

if(load > 0){

    backupTimeRow.style.display = "flex";

    backupTimeResult.textContent =
    formatTime(backupTime);

}

else{

    backupTimeRow.style.display = "none";

}

// -------------------------
// VOLTAGE ACCURACY
// -------------------------

if(calculationMethod.value === "voltage"){

    accuracyRow.style.display = "flex";

    accuracyResult.textContent =
    voltageAccuracy;

}

else{

    accuracyRow.style.display = "none";

}

// -------------------------
// SHOW RESULT SHEET
// -------------------------

openSheet();

});

// -------------------------
// RESET
// -------------------------

resetBtn.addEventListener("click", function(){

    batteryType.selectedIndex = 0;
    batteryVoltage.selectedIndex = 0;
    calculationMethod.selectedIndex = 0;
    batteryRest.selectedIndex = 0;

    batteryCapacity.value = "";
    customVoltage.value = "";
    batteryVoltageReading.value = "";
    remainingCapacity.value = "";
    usedCapacity.value = "";
    loadPower.value = "";

    batteryTemp.value = "25";

    customVoltageGroup.classList.add("hidden");
    voltageMethod.classList.remove("hidden");
    remainingMethod.classList.add("hidden");
    usedMethod.classList.add("hidden");

});

// -------------------------
// COPY RESULTS
// -------------------------

copyResults.addEventListener("click", function(){

    let report =

`Battery State of Charge Report

Battery Type : ${batteryType.options[batteryType.selectedIndex].text}
Battery Voltage : ${bankVoltage} V
Battery Capacity : ${capacity.toFixed(1)} Ah

Calculation Method : ${calculationMethod.options[calculationMethod.selectedIndex].text}

State of Charge : ${soc.toFixed(1)} %
Battery Status : ${batteryStatus}

Remaining Capacity : ${remainingAh.toFixed(1)} Ah
Used Capacity : ${usedAh.toFixed(1)} Ah

Remaining Energy : ${remainingEnergy.toFixed(0)} Wh
Used Energy : ${usedEnergy.toFixed(0)} Wh

Depth of Discharge : ${dod.toFixed(1)} %`;

    if(load > 0){

        report += `

Estimated Backup Time : ${formatTime(backupTime)}`;

    }

    if(calculationMethod.value === "voltage"){

        report += `

Voltage Accuracy : ${voltageAccuracy}`;

    }

    report += `

Recommendation : ${recommendation}

Temperature :
${temperatureWarning}

Engineering Summary :
${engineeringText}`;

    navigator.clipboard.writeText(report);

    showNotifier("Results copied successfully.");

});