// ==========================================
// DC CABLE SIZE CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const systemVoltage =
document.getElementById("systemVoltage");

const customVoltage =
document.getElementById("customVoltage");

const customVoltageGroup =
document.getElementById("customVoltageGroup");

const loadCurrent =
document.getElementById("loadCurrent");

const cableLength =
document.getElementById("cableLength");

const lengthUnit =
document.getElementById("lengthUnit");

const voltageDrop =
document.getElementById("voltageDrop");

const customDrop =
document.getElementById("customDrop");

const customDropGroup =
document.getElementById("customDropGroup");

const material =
document.getElementById("material");

const temperature =
document.getElementById("temperature");

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

const recommendedCable =
document.getElementById("recommendedCable");

const recommendedReason =
document.getElementById("recommendedReason");

const voltageResult =
document.getElementById("voltageResult");

const currentResult =
document.getElementById("currentResult");

const lengthResult =
document.getElementById("lengthResult");

const materialResult =
document.getElementById("materialResult");

const dropVoltResult =
document.getElementById("dropVoltResult");

const dropPercentResult =
document.getElementById("dropPercentResult");

const resistanceResult =
document.getElementById("resistanceResult");

const powerLossResult =
document.getElementById("powerLossResult");

const ampacityResult =
document.getElementById("ampacityResult");

const marginResult =
document.getElementById("marginResult");

const utilizationResult =
document.getElementById("utilizationResult");

const statusResult =
document.getElementById("statusResult");

const smallerCable =
document.getElementById("smallerCable");

const smallerStatus =
document.getElementById("smallerStatus");

const largerCable =
document.getElementById("largerCable");

const largerBenefit =
document.getElementById("largerBenefit");

const awgResult =
document.getElementById("awgResult");

const ohmKmResult =
document.getElementById("ohmKmResult");

const weightResult =
document.getElementById("weightResult");

const applicationResult =
document.getElementById("applicationResult");

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
// STANDARD CABLE DATABASE
// Resistance values are Ohms/km at 20°C
// Ampacity values are typical and conservative
// ==========================================

const cableDatabase = [

{
size:1.5,
awg:"15 AWG",
copperResistance:12.10,
aluminiumResistance:19.90,
ampacityCopper:18,
ampacityAluminium:15,
weight:18,
applications:"Control Circuits"
},

{
size:2.5,
awg:"13 AWG",
copperResistance:7.41,
aluminiumResistance:12.20,
ampacityCopper:24,
ampacityAluminium:20,
weight:29,
applications:"Small DC Loads"
},

{
size:4,
awg:"11 AWG",
copperResistance:4.61,
aluminiumResistance:7.58,
ampacityCopper:32,
ampacityAluminium:27,
weight:46,
applications:"Solar Strings"
},

{
size:6,
awg:"9 AWG",
copperResistance:3.08,
aluminiumResistance:5.06,
ampacityCopper:41,
ampacityAluminium:35,
weight:68,
applications:"PV Strings"
},

{
size:10,
awg:"7 AWG",
copperResistance:1.83,
aluminiumResistance:3.01,
ampacityCopper:57,
ampacityAluminium:48,
weight:113,
applications:"Battery Banks"
},

{
size:16,
awg:"5 AWG",
copperResistance:1.15,
aluminiumResistance:1.89,
ampacityCopper:76,
ampacityAluminium:65,
weight:181,
applications:"Battery & Inverter"
},

{
size:25,
awg:"3 AWG",
copperResistance:0.727,
aluminiumResistance:1.19,
ampacityCopper:101,
ampacityAluminium:86,
weight:284,
applications:"Large PV Systems"
},

{
size:35,
awg:"2 AWG",
copperResistance:0.524,
aluminiumResistance:0.862,
ampacityCopper:125,
ampacityAluminium:106,
weight:397,
applications:"DC Distribution"
},

{
size:50,
awg:"1/0 AWG",
copperResistance:0.387,
aluminiumResistance:0.636,
ampacityCopper:150,
ampacityAluminium:128,
weight:568,
applications:"Large Battery Banks"
},

{
size:70,
awg:"2/0 AWG",
copperResistance:0.268,
aluminiumResistance:0.441,
ampacityCopper:192,
ampacityAluminium:163,
weight:795,
applications:"Industrial DC"
},

{
size:95,
awg:"3/0 AWG",
copperResistance:0.193,
aluminiumResistance:0.317,
ampacityCopper:232,
ampacityAluminium:197,
weight:1080,
applications:"Industrial DC"
},

{
size:120,
awg:"4/0 AWG",
copperResistance:0.153,
aluminiumResistance:0.252,
ampacityCopper:269,
ampacityAluminium:229,
weight:1360,
applications:"Main DC Feeders"
},

{
size:150,
awg:"250 kcmil",
copperResistance:0.124,
aluminiumResistance:0.203,
ampacityCopper:309,
ampacityAluminium:263,
weight:1700,
applications:"Main DC Feeders"
},

{
size:185,
awg:"350 kcmil",
copperResistance:0.0991,
aluminiumResistance:0.163,
ampacityCopper:353,
ampacityAluminium:300,
weight:2100,
applications:"Large Industrial"
},

{
size:240,
awg:"500 kcmil",
copperResistance:0.0754,
aluminiumResistance:0.124,
ampacityCopper:415,
ampacityAluminium:353,
weight:2730,
applications:"Heavy Industrial"
},

{
size:300,
awg:"600 kcmil",
copperResistance:0.0601,
aluminiumResistance:0.0990,
ampacityCopper:477,
ampacityAluminium:406,
weight:3410,
applications:"Heavy Industrial"
},

{
size:400,
awg:"750 kcmil",
copperResistance:0.0470,
aluminiumResistance:0.0773,
ampacityCopper:545,
ampacityAluminium:463,
weight:4550,
applications:"Power Distribution"
},

{
size:500,
awg:"1000 kcmil",
copperResistance:0.0366,
aluminiumResistance:0.0602,
ampacityCopper:620,
ampacityAluminium:527,
weight:5680,
applications:"Power Distribution"
},

{
size:630,
awg:"1250 kcmil",
copperResistance:0.0283,
aluminiumResistance:0.0466,
ampacityCopper:710,
ampacityAluminium:603,
weight:7160,
applications:"Utility DC Systems"
}

];
// ==========================================
// SHOW / HIDE CUSTOM INPUTS
// ==========================================

systemVoltage.addEventListener("change",function(){

    if(systemVoltage.value==="custom"){

        customVoltageGroup.style.display="block";

    }

    else{

        customVoltageGroup.style.display="none";

    }

});

voltageDrop.addEventListener("change",function(){

    if(voltageDrop.value==="custom"){

        customDropGroup.style.display="block";

    }

    else{

        customDropGroup.style.display="none";

    }

});

// ==========================================
// NOTIFIER
// ==========================================

function showNotifier(message){

    notifierText.textContent=
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

    const content=
    resultSheet.querySelector(".result-sheet-content");

    if(content){

        content.scrollTop=0;

    }

    resultSheet.classList.add("show");

}

function closeResultSheet(){

    resultSheet.classList.remove("show");

}

doneButton.onclick=
closeResultSheet;

closeSheet.onclick=
closeResultSheet;

resultSheet.addEventListener("click",function(e){

    if(e.target===resultSheet){

        closeResultSheet();

    }

});

// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

// ------------------------------------------
// INPUT VALUES
// ------------------------------------------

let voltage;

if(systemVoltage.value==="custom"){

    voltage=
    Number(customVoltage.value);

}
else{

    voltage=
    Number(systemVoltage.value);

}

let maxDrop;

if(voltageDrop.value==="custom"){

    maxDrop=
    Number(customDrop.value);

}
else{

    maxDrop=
    Number(voltageDrop.value);

}

const current=
Number(loadCurrent.value);

const length=
Number(cableLength.value);

const conductor=
material.value;

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(voltage)||voltage<=0){

    showNotifier("Enter a valid system voltage.");

    if(systemVoltage.value==="custom"){

        customVoltage.focus();

    }

    return;

}

if(voltage<12||voltage>1500){

    showNotifier("Voltage must be between 12 V and 1500 V.");

    return;

}

if(isNaN(current)||current<=0){

    showNotifier("Enter a valid load current.");

    loadCurrent.focus();

    return;

}

if(current>2000){

    showNotifier("Maximum supported current is 2000 A.");

    loadCurrent.focus();

    return;

}

if(isNaN(length)||length<=0){

    showNotifier("Enter a valid cable length.");

    cableLength.focus();

    return;

}

if(length>1000){

    showNotifier("Maximum supported cable length is 1000 m.");

    cableLength.focus();

    return;

}

if(isNaN(maxDrop)||maxDrop<=0){

    showNotifier("Enter a valid voltage drop.");

    return;

}

if(maxDrop>10){

    showNotifier("Voltage drop cannot exceed 10%.");

    return;

}

// ------------------------------------------
// UNIT CONVERSION
// ------------------------------------------

const lengthMeters=

lengthUnit.value==="ft"

? length*0.3048

: length;

// ------------------------------------------
// ALLOWABLE VOLTAGE DROP
// ------------------------------------------

const allowableDrop=

(voltage*maxDrop)/100;

// ------------------------------------------
// PREPARE CABLE SEARCH
// ------------------------------------------

let selectedCable=null;

let selectedResistance=0;

let selectedAmpacity=0;

let actualDrop=0;

let actualDropPercent=0;

let powerLoss=0;
// ------------------------------------------
// FIND SMALLEST SUITABLE CABLE
// ------------------------------------------

for(const cable of cableDatabase){

    const resistance=

    conductor==="copper"

    ? cable.copperResistance

    : cable.aluminiumResistance;

    let ampacity=

conductor==="copper"

? cable.ampacityCopper

: cable.ampacityAluminium;

// --------------------------------------
// TEMPERATURE CORRECTION
// --------------------------------------

const tempFactor=

temperature.value==="90"

?1.08

:1.00;

ampacity=
ampacity*
tempFactor;

    // --------------------------------------
    // CHECK AMPACITY
    // --------------------------------------

    if(current>ampacity){

        continue;

    }

    // --------------------------------------
    // DC VOLTAGE DROP
    // --------------------------------------

    const voltageDropVolts=

    (
        2*
        lengthMeters*
        current*
        resistance
    )/1000;

    const voltageDropPercent=

    (
        voltageDropVolts/
        voltage
    )*100;

    // --------------------------------------
    // ACCEPTABLE CABLE
    // --------------------------------------

    if(voltageDropPercent<=maxDrop){

        selectedCable=
        cable;

        selectedResistance=
        resistance;

        selectedAmpacity=
        ampacity;

        actualDrop=
        voltageDropVolts;

        actualDropPercent=
        voltageDropPercent;

        powerLoss=

        voltageDropVolts*
        current;

        break;

    }

}

// ------------------------------------------
// NO SUITABLE CABLE
// ------------------------------------------

if(selectedCable===null){

    showNotifier(

    "No suitable standard cable found."

    );

    return;

}

// ------------------------------------------
// SAFETY MARGIN
// ------------------------------------------

const safetyMargin=

selectedAmpacity-
current;

// ------------------------------------------
// AMPACITY UTILIZATION
// ------------------------------------------

const utilization=

(
current/
selectedAmpacity
)*100;

// ------------------------------------------
// VOLTAGE DROP STATUS
// ------------------------------------------

let status="";

if(actualDropPercent<2){

    status="🟢 Excellent";

}

else if(actualDropPercent<=3){

    status="🟡 Acceptable";

}

else if(actualDropPercent<=5){

    status="🟠 High";

}

else{

    status="🔴 Excessive";

}
// ------------------------------------------
// SMALLER / LARGER CABLE
// ------------------------------------------

const selectedIndex=

cableDatabase.findIndex(function(cable){

    return cable.size===selectedCable.size;

});

let smaller=null;

let larger=null;

if(selectedIndex>0){

    smaller=
    cableDatabase[selectedIndex-1];

}

if(selectedIndex<cableDatabase.length-1){

    larger=
    cableDatabase[selectedIndex+1];

}

// ------------------------------------------
// SMALLER CABLE STATUS
// ------------------------------------------

let smallerMessage="N/A";

if(smaller){

let smallerMessage="N/A";

if(smaller){

const r=

conductor==="copper"

?smaller.copperResistance

:smaller.aluminiumResistance;

const vd=

(
2*
lengthMeters*
current*
r
)/1000;

const vdPercent=

(vd/voltage)*100;

smallerMessage=

vdPercent.toFixed(2)+

"% ❌";

}

}

// ------------------------------------------
// LARGER CABLE BENEFIT
// ------------------------------------------

let largerMessage="N/A";

if(larger){

 let largerMessage="N/A";

if(larger){

const r=

conductor==="copper"

?larger.copperResistance

:larger.aluminiumResistance;

const vd=

(
2*
lengthMeters*
current*
r
)/1000;

const vdPercent=

(vd/voltage)*100;

largerMessage=

vdPercent.toFixed(2)+

"% ✔";

}

}

// ------------------------------------------
// HERO RESULT
// ------------------------------------------

recommendedCable.textContent=

selectedCable.size+
" mm² "+
(conductor==="copper"
?"Copper"
:"Aluminium");

recommendedReason.textContent=

"Smallest standard cable satisfying the selected voltage drop limit.";

// ------------------------------------------
// RESULT VALUES
// ------------------------------------------

voltageResult.textContent=

voltage.toFixed(0)+" V";

currentResult.textContent=

current.toFixed(1)+" A";

lengthResult.textContent=

length.toFixed(2)+" "+
lengthUnit.value;

materialResult.textContent=

conductor==="copper"

?"Copper"

:"Aluminium";

dropVoltResult.textContent=

actualDrop.toFixed(2)+" V";

dropPercentResult.textContent=

actualDropPercent.toFixed(2)+" %";

resistanceResult.textContent=

selectedResistance.toFixed(3)+
" Ω/km";

powerLossResult.textContent=

powerLoss.toFixed(1)+
" W";

marginResult.textContent=

safetyMargin.toFixed(1)+
" A";

statusResult.textContent=

status+

" ("+

actualDropPercent.toFixed(2)+

"%)";

// ------------------------------------------
// CABLE COMPARISON
// ------------------------------------------

smallerCable.textContent=

smaller

?smaller.size+" mm²"

:"None";

smallerStatus.textContent=

smallerMessage;

largerCable.textContent=

larger

?larger.size+" mm²"

:"None";

largerBenefit.textContent=

largerMessage;

// ------------------------------------------
// CABLE DETAILS
// ------------------------------------------

awgResult.textContent=

selectedCable.awg;

ohmKmResult.textContent=

selectedResistance.toFixed(3)+
" Ω/km";

ampacityResult.textContent=

selectedAmpacity+
" A";

utilizationResult.textContent=

utilization.toFixed(1)+
" %";

weightResult.textContent=

selectedCable.weight+
" kg/km";

applicationResult.textContent=

selectedCable.applications;

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

engineeringSummary.textContent=

"A "+

selectedCable.size+

" mm² "+

(conductor==="copper"
?"copper"
:"aluminium")+

" cable is recommended because it is the smallest standard cable that satisfies the selected "+

maxDrop+

"% voltage drop limit for a "+

voltage+

" V DC system carrying "+

current.toFixed(1)+

" A over "+

length.toFixed(2)+

" "+

lengthUnit.value+

". A smaller cable would exceed the selected design limits, while a larger cable would further reduce voltage drop and power loss.";

// ------------------------------------------
// OPEN RESULT SHEET
// ------------------------------------------

openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    systemVoltage.value="48";

    customVoltage.value="";

    customVoltageGroup.style.display="none";

    loadCurrent.value="";

    cableLength.value="";

    lengthUnit.value="m";

    voltageDrop.value="3";

    customDrop.value="";

    customDropGroup.style.display="none";

    material.value="copper";

    temperature.value="90";

    closeResultSheet();

    showNotifier(

    "Calculator reset successfully."

    );

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",function(){

const report=

`DC Cable Size Calculator

Recommended Cable
${recommendedCable.textContent}

System Voltage
${voltageResult.textContent}

Load Current
${currentResult.textContent}

Cable Length
${lengthResult.textContent}

Conductor Material
${materialResult.textContent}

Voltage Drop
${dropVoltResult.textContent}

Voltage Drop %
${dropPercentResult.textContent}

Cable Resistance
${resistanceResult.textContent}

Power Loss
${powerLossResult.textContent}

Safety Margin
${marginResult.textContent}

Voltage Drop Status
${statusResult.textContent}

Equivalent AWG
${awgResult.textContent}

Current Capacity
${ampacityResult.textContent}

Ampacity Utilization
${utilizationResult.textContent}

Approx. Weight
${weightResult.textContent}

Typical Applications
${applicationResult.textContent}

Engineering Summary
${engineeringSummary.textContent}

Generated by Solar Toolkit`;

if(navigator.share){

navigator.share({

title:"DC Cable Size Calculator",

text:report

}).catch(function(){});

}

else{

navigator.clipboard.writeText(report);

showNotifier(

"Results copied to clipboard."

);

}

});