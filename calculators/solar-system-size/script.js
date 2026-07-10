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

    const monthly = Number(monthlyConsumption.value);
    const sun = Number(sunHours.value);
    const eff = Number(efficiency.value);
    const panel = Number(panelSize.value);

    if(monthly <= 0){

        monthlyConsumption.focus();
        return;

    }

    if(sun < 1 || sun > 10){

        sunHours.focus();
        return;

    }

    if(eff < 50 || eff > 100){

        efficiency.focus();
        return;

    }

    if(panel < 350 || panel > 1000){

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