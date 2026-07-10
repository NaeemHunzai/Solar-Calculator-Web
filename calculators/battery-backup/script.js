// ========================================
// BATTERY BACKUP CALCULATOR
// ========================================

// INPUTS

const mode = document.getElementById("mode");

const batteryVoltage = document.getElementById("batteryVoltage");

const batteryCapacity = document.getElementById("batteryCapacity");

const batteryCount = document.getElementById("batteryCount");

const loadPower = document.getElementById("loadPower");

const batteryConnection = document.getElementById("batteryConnection");

const dod = document.getElementById("dod");

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

const bankEnergyResult = document.getElementById("bankEnergyResult");

const usableEnergyResult = document.getElementById("usableEnergyResult");

const backupTimeResult = document.getElementById("backupTimeResult");

const currentDrawResult = document.getElementById("currentDrawResult");

const runtimeResult = document.getElementById("runtimeResult");

// NOTIFIER

const notifier = document.getElementById("notifier");

const notifierText = document.getElementById("notifierText");

// ========================================
// SHOW NOTIFIER
// ========================================

function showNotifier(message){

    notifierText.textContent = message;

    notifier.classList.add("show");

    setTimeout(function(){

        notifier.classList.remove("show");

    },2500);

}

// ========================================
// RESULT SHEET
// ========================================

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

// ========================================
// MODE SWITCHING
// ========================================

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
// ========================================
// CALCULATE
// ========================================

calculateBtn.addEventListener("click",function(){

    // Empty Fields

    if(batteryVoltage.value.trim()===""){

        showNotifier("Please enter Battery Voltage.");

        batteryVoltage.focus();

        return;

    }

    if(batteryCapacity.value.trim()===""){

        showNotifier("Please enter Battery Capacity.");

        batteryCapacity.focus();

        return;

    }

    if(batteryCount.value.trim()===""){

        showNotifier("Please enter Number of Batteries.");

        batteryCount.focus();

        return;

    }

    if(loadPower.value.trim()===""){

        showNotifier("Please enter Load Power.");

        loadPower.focus();

        return;

    }

    // Read Values

    const voltage = Number(batteryVoltage.value);

    const capacity = Number(batteryCapacity.value);

    const batteries = Number(batteryCount.value);

    const load = Number(loadPower.value);

    let depthOfDischarge = 80;

    let inverterEff = 90;

    if(mode.value==="professional"){

        depthOfDischarge = Number(dod.value);

        inverterEff = Number(inverterEfficiency.value);

    }

    // Validation

    if(voltage < 6 || voltage > 100){

        showNotifier("Battery Voltage must be between 6 V and 100 V.");

        batteryVoltage.focus();

        return;

    }

    if(capacity < 10 || capacity > 1000){

        showNotifier("Battery Capacity must be between 10 Ah and 1000 Ah.");

        batteryCapacity.focus();

        return;

    }

    if(batteries < 1 || batteries > 100){

        showNotifier("Number of Batteries must be between 1 and 100.");

        batteryCount.focus();

        return;

    }

    if(load <= 0){

        showNotifier("Load Power must be greater than zero.");

        loadPower.focus();

        return;

    }

    if(depthOfDischarge < 50 || depthOfDischarge > 100){

        showNotifier("Depth of Discharge must be between 50% and 100%.");

        dod.focus();

        return;

    }

    if(inverterEff < 70 || inverterEff > 100){

        showNotifier("Inverter Efficiency must be between 70% and 100%.");

        inverterEfficiency.focus();

        return;

    }

    // =====================================
    // CALCULATIONS
    // =====================================

    const bankEnergyWh =
        voltage * capacity * batteries;

    const usableEnergyWh =
        bankEnergyWh *
        (depthOfDischarge / 100) *
        (inverterEff / 100);

    const backupHours =
        usableEnergyWh / load;

    const runtimeMinutes =
        backupHours * 60;

    const currentDraw =
        load / voltage;

    const hours =
        Math.floor(backupHours);

    const minutes =
        Math.round((backupHours - hours) * 60);
            // =====================================
    // SHOW RESULTS
    // =====================================

    bankEnergyResult.textContent =
        (bankEnergyWh / 1000).toFixed(2) + " kWh";

    usableEnergyResult.textContent =
        (usableEnergyWh / 1000).toFixed(2) + " kWh";

    backupTimeResult.textContent =
        hours + " Hours " + minutes + " Minutes";

    currentDrawResult.textContent =
        currentDraw.toFixed(2) + " A";

    runtimeResult.textContent =
        Math.round(runtimeMinutes) + " Minutes";

    // Open Result Sheet

    openSheet();

});

// ========================================
// RESET
// ========================================

resetBtn.addEventListener("click", function(){

    batteryVoltage.value = "";

    batteryCapacity.value = "";

    batteryCount.value = 1;

    loadPower.value = "";

    batteryConnection.selectedIndex = 0;

    dod.value = 80;

    inverterEfficiency.value = 90;

    mode.value = "simple";

    updateMode();

});

// ========================================
// SHARE RESULTS
// ========================================

copyResults.addEventListener("click", async function(){

    const text =

`Battery Backup Calculator

Battery Bank Energy : ${bankEnergyResult.textContent}

Usable Energy : ${usableEnergyResult.textContent}

Backup Time : ${backupTimeResult.textContent}

Current Draw : ${currentDrawResult.textContent}

Runtime : ${runtimeResult.textContent}`;

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