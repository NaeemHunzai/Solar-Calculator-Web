// ==========================================
// POWER FACTOR CORRECTION CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const mode = document.getElementById("mode");
const systemType = document.getElementById("systemType");

const load = document.getElementById("load");

const existingPF = document.getElementById("existingPF");
const targetPF = document.getElementById("targetPF");

const voltage = document.getElementById("voltage");
const frequency = document.getElementById("frequency");

// Professional

const professionalFields =
document.getElementById("professionalFields");

const connectionType =
document.getElementById("connectionType");

const operatingHours =
document.getElementById("operatingHours");

const electricityCost =
document.getElementById("electricityCost");

const safetyMargin =
document.getElementById("safetyMargin");

// Buttons

const calculateBtn =
document.getElementById("calculateBtn");

const resetBtn =
document.getElementById("resetBtn");

// Result Sheet

const resultSheet =
document.getElementById("resultSheet");

const doneButton =
document.getElementById("doneButton");

const closeSheet =
document.getElementById("closeSheet");

const copyResults =
document.getElementById("copyResults");

// Result Labels

const capacitorResult =
document.getElementById("capacitorResult");

const existingKVAResult =
document.getElementById("existingKVAResult");

const correctedKVAResult =
document.getElementById("correctedKVAResult");

const existingKVARResult =
document.getElementById("existingKVARResult");

const requiredKVARResult =
document.getElementById("requiredKVARResult");

const recommendedBankResult =
document.getElementById("recommendedBankResult");

const currentBeforeResult =
document.getElementById("currentBeforeResult");

const currentAfterResult =
document.getElementById("currentAfterResult");

const currentReductionResult =
document.getElementById("currentReductionResult");

// Notifier

const notifier =
document.getElementById("notifier");

const notifierText =
document.getElementById("notifierText");

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
// SIMPLE / PROFESSIONAL
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

calculateBtn.addEventListener("click",function(){

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if(load.value.trim()==""){

        showNotifier("Please enter Load.");

        load.focus();

        return;

    }

    const P =
    Number(load.value);

    const pf1 =
    Number(existingPF.value);

    const pf2 =
    Number(targetPF.value);

    const V =
    Number(voltage.value);

    if(P<=0){

        showNotifier("Load must be greater than zero.");

        return;

    }

    if(V<=0){

        showNotifier("Voltage must be greater than zero.");

        return;

    }

    if(pf1<0.50 || pf1>0.99){

        showNotifier("Existing Power Factor must be between 0.50 and 0.99.");

        return;

    }

    if(pf2<=pf1){

        showNotifier("Target Power Factor must be greater than Existing Power Factor.");

        return;

    }

    if(pf2>0.99){

        showNotifier("Target Power Factor cannot exceed 0.99.");

        return;

    }

    // -----------------------------
    // PROFESSIONAL SETTINGS
    // -----------------------------

    let margin=0;

    if(mode.value==="professional"){

        margin=
        Number(safetyMargin.value);

    }

    // -----------------------------
    // POWER FACTOR CORRECTION
    // -----------------------------

    const phi1 =
    Math.acos(pf1);

    const phi2 =
    Math.acos(pf2);

    // Existing Apparent Power

    const kva1 =
    P/pf1;

    // Corrected Apparent Power

    const kva2 =
    P/pf2;

    // Existing Reactive Power

    const kvar1 =
    P*Math.tan(phi1);

    // Corrected Reactive Power

    const kvar2 =
    P*Math.tan(phi2);

    // Required Capacitor

    let capacitor=
    kvar1-kvar2;

    // Apply Safety Margin

    capacitor=
    capacitor*
    (1+margin/100);

    // -----------------------------
    // CURRENT
    // -----------------------------

    let currentBefore;

    let currentAfter;

    if(systemType.value==="single"){

        currentBefore=
        (kva1*1000)/V;

        currentAfter=
        (kva2*1000)/V;

    }

    else{

        currentBefore=
        (kva1*1000)/(1.732*V);

        currentAfter=
        (kva2*1000)/(1.732*V);

    }

    // -----------------------------
    // CURRENT REDUCTION
    // -----------------------------

    const currentReduction=

    ((currentBefore-currentAfter)

    /

    currentBefore)

    *100;

    // -----------------------------
    // STANDARD CAPACITOR BANK
    // -----------------------------

    const standardBanks=[
5,
7.5,
10,
12.5,
15,
20,
25,
30,
40,
50,
60,
75,
100,
125,
150,
200,
250,
300,
350,
400,
500,
600,
800,
1000
]

    let recommended=

    standardBanks[standardBanks.length-1];

    for(let i=0;i<standardBanks.length;i++){

        if(capacitor<=standardBanks[i]){

            recommended=
            standardBanks[i];

            break;

        }

    }

    // Continue in Part 3...
        // ==========================================
    // RESULT SHEET
    // ==========================================

    capacitorResult.textContent =
    capacitor.toFixed(2) + " kVAR";

    existingKVAResult.textContent =
    kva1.toFixed(2) + " kVA";

    correctedKVAResult.textContent =
    kva2.toFixed(2) + " kVA";

    existingKVARResult.textContent =
    kvar1.toFixed(2) + " kVAR";

    requiredKVARResult.textContent =
    capacitor.toFixed(2) + " kVAR";

    recommendedBankResult.textContent =
    recommended + " kVAR";

    currentBeforeResult.textContent =
    currentBefore.toFixed(2) + " A";

    currentAfterResult.textContent =
    currentAfter.toFixed(2) + " A";

    currentReductionResult.textContent =
    currentReduction.toFixed(1) + " %";

    openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    mode.value="simple";

    systemType.value="three";

    load.value="";

    existingPF.value="0.80";

    targetPF.value="0.95";

    voltage.value="400";

    frequency.value="50";

    connectionType.value="delta";

    operatingHours.value="8";

    electricityCost.value="0.15";

    safetyMargin.value="10";

    updateMode();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

    const text =

`Power Factor Correction Calculator

System Type : ${
systemType.value==="single"
?
"Single Phase"
:
"Three Phase"
}

Load : ${load.value} kW

Existing PF : ${existingPF.value}

Target PF : ${targetPF.value}

Voltage : ${voltage.value} V

Frequency : ${frequency.value} Hz

--------------------------------

Required Capacitor :

${capacitorResult.textContent}

Existing kVA :

${existingKVAResult.textContent}

Corrected kVA :

${correctedKVAResult.textContent}

Existing Reactive Power :

${existingKVARResult.textContent}

Recommended Capacitor Bank :

${recommendedBankResult.textContent}

Current Before :

${currentBeforeResult.textContent}

Current After :

${currentAfterResult.textContent}

Current Reduction :

${currentReductionResult.textContent}

Generated by Solar Toolkit`;

    try{

        await navigator.clipboard.writeText(text);

        copyResults.textContent="Copied ✓";

        setTimeout(function(){

            copyResults.textContent="Share Results";

        },1500);

    }

    catch{

        showNotifier("Unable to copy results.");

    }

});