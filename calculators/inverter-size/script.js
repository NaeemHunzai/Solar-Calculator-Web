// ==========================================
// INVERTER SIZE CALCULATOR
// ==========================================

// INPUTS

const mode = document.getElementById("mode");

const connectedLoad = document.getElementById("connectedLoad");

const safetyMargin = document.getElementById("safetyMargin");

const powerFactor = document.getElementById("powerFactor");

const surgeFactor = document.getElementById("surgeFactor");

const systemVoltage = document.getElementById("systemVoltage");

const inverterEfficiency = document.getElementById("inverterEfficiency");

const professionalFields = document.getElementById("professionalFields");

// BUTTONS

const calculateBtn = document.querySelector(".primary-button");

const resetBtn = document.querySelector(".secondary-button");

// RESULT SHEET

const resultSheet = document.getElementById("resultSheet");

const doneButton = document.getElementById("doneButton");

const closeSheet = document.getElementById("closeSheet");

const copyResults = document.getElementById("copyResults");

// RESULT LABELS

const recommendedInverterResult =
document.getElementById("recommendedInverterResult");

const connectedLoadResult =
document.getElementById("connectedLoadResult");

const surgeRatingResult =
document.getElementById("surgeRatingResult");

const dcCurrentResult =
document.getElementById("dcCurrentResult");

const batteryVoltageResult =
document.getElementById("batteryVoltageResult");

// NOTIFIER

const notifier = document.getElementById("notifier");

const notifierText = document.getElementById("notifierText");

// ==========================================
// NOTIFIER
// ==========================================

function showNotifier(message){

    notifierText.textContent = message;

    notifier.classList.add("show");

    setTimeout(function(){

        notifier.classList.remove("show");

    },2500);

}

// ==========================================
// RESULT SHEET
// ==========================================

function openSheet(){

    resultSheet.classList.add("show");

}

function closeResultSheet(){

    resultSheet.classList.remove("show");

}

doneButton.onclick = closeResultSheet;

closeSheet.onclick = closeResultSheet;

resultSheet.addEventListener("click",function(e){

    if(e.target===resultSheet){

        closeResultSheet();

    }

});

// ==========================================
// SIMPLE / PROFESSIONAL MODE
// ==========================================

function updateMode(){

    if(mode.value==="simple"){

        professionalFields.style.display="none";

    }

    else{

        professionalFields.style.display="block";

    }

}

mode.addEventListener("change",updateMode);

updateMode();

// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click", function(){

    // -----------------------------
    // Empty Field Validation
    // -----------------------------

    if(connectedLoad.value.trim()===""){

        showNotifier("Please enter Total Connected Load.");

        connectedLoad.focus();

        return;

    }

    // -----------------------------
    // Read Inputs
    // -----------------------------

    const load = Number(connectedLoad.value);

    const margin = Number(safetyMargin.value);

    const pf = Number(powerFactor.value);

    let surge = 2;

    let voltage = 48;

    let efficiency = 95;

    if(mode.value==="professional"){

        surge = Number(surgeFactor.value);

        voltage = Number(systemVoltage.value);

        efficiency = Number(inverterEfficiency.value);

    }

    // -----------------------------
    // Validation
    // -----------------------------

    if(load<=0){

        showNotifier("Connected Load must be greater than zero.");

        connectedLoad.focus();

        return;

    }

    if(margin<10 || margin>50){

        showNotifier("Safety Margin must be between 10% and 50%.");

        safetyMargin.focus();

        return;

    }

    if(pf<0.70 || pf>1){

        showNotifier("Power Factor must be between 0.70 and 1.00.");

        powerFactor.focus();

        return;

    }

    if(surge<1 || surge>5){

        showNotifier("Surge Factor must be between 1 and 5.");

        surgeFactor.focus();

        return;

    }

    if(efficiency<80 || efficiency>100){

        showNotifier("Inverter Efficiency must be between 80% and 100%.");

        inverterEfficiency.focus();

        return;

    }

    // -----------------------------
    // Engineering Calculations
    // -----------------------------

    const designLoad =
        load * (1 + margin/100);

    const inverterVA =
        designLoad / pf;

    const inverterKVA =
        inverterVA / 1000;

    const surgeVA =
        inverterVA * surge;

    const surgeKVA =
        surgeVA / 1000;

    const dcCurrent =
        designLoad /
        (voltage * (efficiency/100));

    // -----------------------------
    // Recommended Battery Voltage
    // (Simple Mode)
    // -----------------------------

    let recommendedVoltage;

if(mode.value==="simple"){
      if(inverterKVA <= 1){

    recommendedVoltage = "12 V";

}

else if(inverterKVA <= 2.5){

    recommendedVoltage = "24 V";

}

else if(inverterKVA <= 8){

    recommendedVoltage = "48 V";

}

else{

    recommendedVoltage = "96 V";

}

    }

    else{

        recommendedVoltage=
            voltage + " V";

    }
        // ==========================================
    // POPULATE RESULT SHEET
    // ==========================================

  const standardSizes = [
    0.5, 1, 1.5, 2, 3, 5, 6, 8, 10, 15, 20, 25, 30
];

let recommendedSize = standardSizes[standardSizes.length - 1];

for(const size of standardSizes){

    if(inverterKVA <= size){

        recommendedSize = size;

        break;

    }

}

recommendedInverterResult.textContent =
    recommendedSize.toFixed(1) + " kVA";

    connectedLoadResult.textContent =
    designLoad.toFixed(0) + " W";
    surgeRatingResult.textContent =
        surgeKVA.toFixed(2) + " kVA";

    dcCurrentResult.textContent =
        dcCurrent.toFixed(1) + " A";

    batteryVoltageResult.textContent =
        recommendedVoltage;

    // Open Result Sheet

    openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click", function(){

    connectedLoad.value = "";

    safetyMargin.value = 25;

    powerFactor.value = 0.90;

    surgeFactor.value = 2;

    systemVoltage.value = 48;

    inverterEfficiency.value = 95;

    mode.value = "simple";

    updateMode();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click", async function(){

    const text =

`Inverter Size Calculator

Recommended Inverter Size : ${recommendedInverterResult.textContent}

Connected Load : ${connectedLoadResult.textContent}

Surge Rating : ${surgeRatingResult.textContent}

Estimated DC Current : ${dcCurrentResult.textContent}

Recommended Battery Voltage : ${batteryVoltageResult.textContent}`;

    try{

        await navigator.clipboard.writeText(text);

        copyResults.textContent = "Copied ✓";

        setTimeout(function(){

            copyResults.textContent = "Share Results";

        },1500);

    }

    catch{

        showNotifier("Unable to copy results.");

    }

});