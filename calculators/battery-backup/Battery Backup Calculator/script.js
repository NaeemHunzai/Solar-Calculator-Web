const monthlyConsumption = document.getElementById("monthlyConsumption");
const sunHours = document.getElementById("sunHours");
const efficiency = document.getElementById("efficiency");
const panelSize = document.getElementById("panelSize");

const calculateBtn = document.querySelector(".primary-button");
const resetBtn = document.querySelector(".secondary-button");

// Result Sheet
const resultSheet = document.getElementById("resultSheet");
const doneButton = document.getElementById("doneButton");
const closeSheet = document.getElementById("closeSheet");
const copyResults = document.getElementById("copyResults");

// Result Fields
const systemSizeResult = document.getElementById("systemSizeResult");
const panelCountResult = document.getElementById("panelCountResult");
const dailyEnergyResult = document.getElementById("dailyEnergyResult");
const monthlyEnergyResult = document.getElementById("monthlyEnergyResult");
const roofAreaResult = document.getElementById("roofAreaResult");

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

function openSheet() {

    resultSheet.classList.add("show");

}

// -------------------------
// CLOSE RESULT SHEET
// -------------------------

function closeResultSheet() {

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
// CALCULATE
// -------------------------

calculateBtn.addEventListener("click", function(){

  // Check empty fields

if(monthlyConsumption.value.trim() === ""){

    showNotifier("Please enter Monthly Energy Consumption.");

    monthlyConsumption.focus();

    return;

}

if(sunHours.value.trim() === ""){

    showNotifier("Please enter Peak Sun Hours.");

    sunHours.focus();

    return;

}

if(efficiency.value.trim() === ""){

    showNotifier("Please enter System Efficiency.");

    efficiency.focus();

    return;

}

if(panelSize.value.trim() === ""){

    showNotifier("Please enter Solar Panel Wattage.");

    panelSize.focus();

    return;

}

// Read values

const monthly = Number(monthlyConsumption.value);

const sun = Number(sunHours.value);

const eff = Number(efficiency.value);

const panel = Number(panelSize.value);

// Validation

if(monthly <= 0){

    showNotifier("Monthly Energy Consumption must be greater than zero.");

    monthlyConsumption.focus();

    return;

}

if(sun > 10){

    showNotifier("Peak Sun Hours cannot be greater than 10.");

    sunHours.focus();

    return;

}

if(sun < 1){

    showNotifier("Peak Sun Hours must be at least 1.");

    sunHours.focus();

    return;

}

if(eff < 50 || eff > 100){

    showNotifier("System Efficiency must be between 50% and 100%.");

    efficiency.focus();

    return;

}

if(panel < 150 || panel > 1000){

    showNotifier("Solar Panel Wattage must be between 150 W and 1000 W.");

    panelSize.focus();

    return;

}

    const dailyEnergy = monthly / 30;

    const systemSize =
        dailyEnergy / (sun * (eff/100));

    const panels =
        Math.ceil(systemSize * 1000 / panel);

    const roofArea =
        panels * (panel / 230);

    // Populate Result Sheet

    systemSizeResult.textContent =
        systemSize.toFixed(2) + " kW";

    panelCountResult.textContent =
        panels + " Panels";

    dailyEnergyResult.textContent =
        dailyEnergy.toFixed(2) + " kWh/day";

    monthlyEnergyResult.textContent =
        monthly.toFixed(0) + " kWh";

    roofAreaResult.textContent =
        roofArea.toFixed(1) + " m²";

    openSheet();

});

// -------------------------
// RESET
// -------------------------

resetBtn.addEventListener("click", function(){

    monthlyConsumption.value = "";
    sunHours.value = "";
    efficiency.value = 80;
    panelSize.value = "";

});

// -------------------------
// COPY RESULTS
// -------------------------

copyResults.addEventListener("click", async function(){

    const text =

`Solar System Size

Required System Size : ${systemSizeResult.textContent}

Solar Panels : ${panelCountResult.textContent}

Daily Energy : ${dailyEnergyResult.textContent}

Monthly Energy : ${monthlyEnergyResult.textContent}

Roof Area : ${roofAreaResult.textContent}`;

    try{

        await navigator.clipboard.writeText(text);

        copyResults.textContent = "Copied ✓";

        setTimeout(()=>{

            copyResults.textContent="Copy Results";

        },1500);

    }

    catch{

        copyResults.textContent="Copy Failed";

    }

});