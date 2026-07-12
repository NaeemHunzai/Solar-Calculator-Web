// ==========================================
// LOAD CURRENT CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const phase =
document.getElementById("phase");

const voltage =
document.getElementById("voltage");

const load =
document.getElementById("load");

const loadUnit =
document.getElementById("loadUnit");

const powerFactor =
document.getElementById("powerFactor");

const powerFactorGroup =
document.getElementById("powerFactorGroup");

// ==========================================
// BUTTONS
// ==========================================

const calculateBtn =
document.getElementById("calculateBtn");

const resetBtn =
document.getElementById("resetBtn");

const copyResults =
document.getElementById("copyResults");

const doneButton =
document.getElementById("doneButton");

const closeSheet =
document.getElementById("closeSheet");

// ==========================================
// RESULT SHEET
// ==========================================

const resultSheet =
document.getElementById("resultSheet");

const currentResult =
document.getElementById("currentResult");

const phaseResult =
document.getElementById("phaseResult");

const voltageResult =
document.getElementById("voltageResult");

const loadResult =
document.getElementById("loadResult");

const pfResult =
document.getElementById("pfResult");

const apparentPowerResult =
document.getElementById("apparentPowerResult");

const currentValueResult =
document.getElementById("currentValueResult");

const engineeringSummary =
document.getElementById("engineeringSummary");

// ==========================================
// NOTIFIER
// ==========================================

const notifier =
document.getElementById("notifier");

const notifierText =
document.getElementById("notifierText");

// ==========================================
// NOTIFIER
// ==========================================

function showNotifier(message){

    notifierText.textContent =
    message;

    notifier.classList.add("show");

    setTimeout(function(){

        notifier.classList.remove("show");

    },2500);

}

// ==========================================
// RESULT SHEET
// ==========================================

function openSheet(){

    const content =
    resultSheet.querySelector(".result-sheet-content");

    if(content){

        content.scrollTop = 0;

    }

    resultSheet.classList.add("show");

}

function closeResultSheet(){

    resultSheet.classList.remove("show");

}

doneButton.onclick =
closeResultSheet;

closeSheet.onclick =
closeResultSheet;

resultSheet.addEventListener("click",function(e){

    if(e.target===resultSheet){

        closeResultSheet();

    }

});

// ==========================================
// UPDATE PHASE
// ==========================================

function updatePhase(){

    if(phase.value==="single"){

        voltage.value = 230;

    }

    else{

        voltage.value = 400;

    }

}

phase.addEventListener(

"change",

updatePhase

);

// ==========================================
// UPDATE LOAD UNIT
// ==========================================

function updateLoadUnit(){

    if(loadUnit.value==="kva"){

        powerFactorGroup.style.display="none";

    }

    else{

        powerFactorGroup.style.display="block";

    }

}

loadUnit.addEventListener(

"change",

updateLoadUnit

);

// ==========================================
// INITIALIZE
// ==========================================

updatePhase();

updateLoadUnit();
// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

// ------------------------------------------
// INPUT VALUES
// ------------------------------------------

const system =
phase.value;

const unit =
loadUnit.value;

const V =
Number(voltage.value);

const loadValue =
Number(load.value);

const pf =
Number(powerFactor.value);

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(loadValue) || loadValue<=0){

    showNotifier("Enter a valid load value.");

    load.focus();

    return;

}

if(unit==="w" && loadValue>10000000){

    showNotifier("Maximum supported load is 10 MW.");

    load.focus();

    return;

}

if(unit==="kw" && loadValue>10000){

    showNotifier("Maximum supported load is 10 MW.");

    load.focus();

    return;

}

if(unit==="kva" && loadValue>10000){

    showNotifier("Maximum supported load is 10,000 kVA.");

    load.focus();

    return;

}

if(isNaN(V) || V<=0 || V>1000){

    showNotifier("Voltage must be between 1 V and 1000 V.");

    voltage.focus();

    return;

}

if(unit!=="kva"){

    if(isNaN(pf) || pf<0.1 || pf>1){

        showNotifier("Power Factor must be between 0.1 and 1.0.");

        powerFactor.focus();

        return;

    }

}

// ------------------------------------------
// CALCULATIONS
// ------------------------------------------

let watts;

let kW;

let kVA;

let current;

// Convert Load

if(unit==="w"){

    watts =
    loadValue;

    kW =
    watts/1000;

}

else if(unit==="kw"){

    kW =
    loadValue;

    watts =
    kW*1000;

}

else{

    kVA =
    loadValue;

}

// ------------------------------------------
// W / kW
// ------------------------------------------

if(unit!=="kva"){

    kVA =
    kW/pf;

    if(system==="single"){

        current =
        watts/
        (V*pf);

    }

    else{

        current =
        watts/
        (Math.sqrt(3)*V*pf);

    }

}

// ------------------------------------------
// kVA
// ------------------------------------------

else{

    if(system==="single"){

        current =
        (kVA*1000)/V;

    }

    else{

        current =
        (kVA*1000)/
        (Math.sqrt(3)*V);

    }

    kW =
    0;

}

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

let summary="";

if(system==="single"){

summary=
"The load current was calculated using the single-phase power equation.";

}

else{

summary=
"The load current was calculated using the three-phase power equation.";

}

if(unit==="kva"){

summary +=
" Since the load was entered in kVA, Power Factor was not required.";

}

else{

summary +=
" Power Factor was included in the calculation.";

}

// ------------------------------------------
// RESULT SHEET
// ------------------------------------------

currentResult.textContent =
current.toFixed(2)+" A";

phaseResult.textContent =
system==="single"
?
"Single Phase"
:
"Three Phase";

voltageResult.textContent =
V.toFixed(0)+" V";

loadResult.textContent =
loadValue.toFixed(2)+" "+unit.toUpperCase();

pfResult.textContent =
unit==="kva"
?
"Not Required"
:
pf.toFixed(2);

apparentPowerResult.textContent =
kVA.toFixed(2)+" kVA";

currentValueResult.textContent =
current.toFixed(2)+" A";

engineeringSummary.textContent =
summary;

// ------------------------------------------
// OPEN RESULT SHEET
// ------------------------------------------

openSheet();

});
// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

phase.value="three";

voltage.value="400";

load.value="";

loadUnit.value="kw";

powerFactor.value="0.80";

updatePhase();

updateLoadUnit();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

const text=

`Load Current Calculator

Calculated Load Current
${currentResult.textContent}

Phase Type
${phaseResult.textContent}

Voltage
${voltageResult.textContent}

Input Load
${loadResult.textContent}

Power Factor
${pfResult.textContent}

Apparent Power
${apparentPowerResult.textContent}

Calculated Current
${currentValueResult.textContent}

Engineering Summary

${engineeringSummary.textContent}

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