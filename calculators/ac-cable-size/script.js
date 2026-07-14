// ==========================================
// AC CABLE SIZE CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const systemType =
document.getElementById("systemType");

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

const powerFactor =
document.getElementById("powerFactor");

const customPowerFactor =
document.getElementById("customPowerFactor");

const customPowerFactorGroup =
document.getElementById("customPowerFactorGroup");

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

const systemTypeResult =
document.getElementById("systemTypeResult");

const voltageResult =
document.getElementById("voltageResult");

const currentResult =
document.getElementById("currentResult");

const pfResult =
document.getElementById("pfResult");

const lengthResult =
document.getElementById("lengthResult");

const materialResult =
document.getElementById("materialResult");

const dropVoltResult =
document.getElementById("dropVoltResult");

const dropPercentResult =
document.getElementById("dropPercentResult");

const receivingVoltageResult =
document.getElementById("receivingVoltageResult");

const efficiencyResult =
document.getElementById("efficiencyResult");

const powerLossResult =
document.getElementById("powerLossResult");

const marginResult =
document.getElementById("marginResult");

const statusResult =
document.getElementById("statusResult");

const kwResult =
document.getElementById("kwResult");

const kvaResult =
document.getElementById("kvaResult");

const selectionBasis =
document.getElementById("selectionBasis");

const smallerCable =
document.getElementById("smallerCable");

const smallerDrop =
document.getElementById("smallerDrop");

const largerCable =
document.getElementById("largerCable");

const largerDrop =
document.getElementById("largerDrop");

const awgResult =
document.getElementById("awgResult");

const resistanceResult =
document.getElementById("resistanceResult");

const reactanceResult =
document.getElementById("reactanceResult");

const ampacityResult =
document.getElementById("ampacityResult");

const utilizationResult =
document.getElementById("utilizationResult");

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
// Resistance (Ω/km @20°C)
// Reactance (Ω/km typical)
// ==========================================

const cableDatabase=[

{
size:1.5,
awg:"15 AWG",
copperResistance:12.10,
aluminiumResistance:19.90,
reactance:0.080,
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
reactance:0.080,
ampacityCopper:24,
ampacityAluminium:20,
weight:29,
applications:"Lighting Circuits"
},

{
size:4,
awg:"11 AWG",
copperResistance:4.61,
aluminiumResistance:7.58,
reactance:0.080,
ampacityCopper:32,
ampacityAluminium:27,
weight:46,
applications:"Socket Circuits"
},

{
size:6,
awg:"9 AWG",
copperResistance:3.08,
aluminiumResistance:5.06,
reactance:0.080,
ampacityCopper:41,
ampacityAluminium:35,
weight:68,
applications:"Small Feeders"
},

{
size:10,
awg:"7 AWG",
copperResistance:1.83,
aluminiumResistance:3.01,
reactance:0.079,
ampacityCopper:57,
ampacityAluminium:48,
weight:113,
applications:"Distribution Boards"
},

{
size:16,
awg:"5 AWG",
copperResistance:1.15,
aluminiumResistance:1.89,
reactance:0.078,
ampacityCopper:76,
ampacityAluminium:65,
weight:181,
applications:"Motor Feeders"
},

{
size:25,
awg:"3 AWG",
copperResistance:0.727,
aluminiumResistance:1.19,
reactance:0.077,
ampacityCopper:101,
ampacityAluminium:86,
weight:284,
applications:"Sub Feeders"
},

{
size:35,
awg:"2 AWG",
copperResistance:0.524,
aluminiumResistance:0.862,
reactance:0.076,
ampacityCopper:125,
ampacityAluminium:106,
weight:397,
applications:"Distribution Feeders"
},

{
size:50,
awg:"1/0 AWG",
copperResistance:0.387,
aluminiumResistance:0.636,
reactance:0.075,
ampacityCopper:150,
ampacityAluminium:128,
weight:568,
applications:"Main Feeders"
},

{
size:70,
awg:"2/0 AWG",
copperResistance:0.268,
aluminiumResistance:0.441,
reactance:0.074,
ampacityCopper:192,
ampacityAluminium:163,
weight:795,
applications:"Large Feeders"
},

{
size:95,
awg:"3/0 AWG",
copperResistance:0.193,
aluminiumResistance:0.317,
reactance:0.073,
ampacityCopper:232,
ampacityAluminium:197,
weight:1080,
applications:"Industrial Distribution"
},

{
size:120,
awg:"4/0 AWG",
copperResistance:0.153,
aluminiumResistance:0.252,
reactance:0.072,
ampacityCopper:269,
ampacityAluminium:229,
weight:1360,
applications:"Main Distribution"
},

{
size:150,
awg:"250 kcmil",
copperResistance:0.124,
aluminiumResistance:0.203,
reactance:0.071,
ampacityCopper:309,
ampacityAluminium:263,
weight:1700,
applications:"Industrial Feeders"
},

{
size:185,
awg:"350 kcmil",
copperResistance:0.0991,
aluminiumResistance:0.163,
reactance:0.070,
ampacityCopper:353,
ampacityAluminium:300,
weight:2100,
applications:"Heavy Industrial"
},

{
size:240,
awg:"500 kcmil",
copperResistance:0.0754,
aluminiumResistance:0.124,
reactance:0.069,
ampacityCopper:415,
ampacityAluminium:353,
weight:2730,
applications:"Heavy Distribution"
},

{
size:300,
awg:"600 kcmil",
copperResistance:0.0601,
aluminiumResistance:0.0990,
reactance:0.068,
ampacityCopper:477,
ampacityAluminium:406,
weight:3410,
applications:"Power Distribution"
},

{
size:400,
awg:"750 kcmil",
copperResistance:0.0470,
aluminiumResistance:0.0773,
reactance:0.067,
ampacityCopper:545,
ampacityAluminium:463,
weight:4550,
applications:"Large Power Feeders"
},

{
size:500,
awg:"1000 kcmil",
copperResistance:0.0366,
aluminiumResistance:0.0602,
reactance:0.066,
ampacityCopper:620,
ampacityAluminium:527,
weight:5680,
applications:"Industrial Power"
},

{
size:630,
awg:"1250 kcmil",
copperResistance:0.0283,
aluminiumResistance:0.0466,
reactance:0.065,
ampacityCopper:710,
ampacityAluminium:603,
weight:7160,
applications:"Utility Distribution"
}

];
// ==========================================
// VOLTAGE OPTIONS
// ==========================================

const singlePhaseVoltages=[

120,
127,
220,
230,
240

];

const threePhaseVoltages=[

380,
400,
415,
440,
480,
690

];

// ==========================================
// UPDATE VOLTAGE LIST
// ==========================================

function updateVoltageOptions(){

systemVoltage.innerHTML="";

const list=

systemType.value==="single"

?singlePhaseVoltages

:threePhaseVoltages;

list.forEach(function(voltage){

const option=
document.createElement("option");

option.value=
voltage;

option.textContent=
voltage+" V";

systemVoltage.appendChild(option);

});

const customOption=
document.createElement("option");

customOption.value="custom";

customOption.textContent="Custom";

systemVoltage.appendChild(customOption);

// Default Voltage

if(systemType.value==="single"){

systemVoltage.value="230";

}

else{

systemVoltage.value="415";

}

customVoltageGroup.style.display="none";

customVoltage.value="";

}

updateVoltageOptions();

systemType.addEventListener(

"change",

updateVoltageOptions

);

// ==========================================
// SHOW / HIDE CUSTOM INPUTS
// ==========================================

systemVoltage.addEventListener(

"change",

function(){

if(systemVoltage.value==="custom"){

customVoltageGroup.style.display="block";

}

else{

customVoltageGroup.style.display="none";

}

}

);

voltageDrop.addEventListener(

"change",

function(){

if(voltageDrop.value==="custom"){

customDropGroup.style.display="block";

}

else{

customDropGroup.style.display="none";

}

}

);

powerFactor.addEventListener(

"change",

function(){

if(powerFactor.value==="custom"){

customPowerFactorGroup.style.display="block";

}

else{

customPowerFactorGroup.style.display="none";

}

}

);

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

resultSheet.querySelector(

".result-sheet-content"

);

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

resultSheet.addEventListener(

"click",

function(e){

if(e.target===resultSheet){

closeResultSheet();

}

}

);

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

let pf;

if(powerFactor.value==="custom"){

    pf=
    Number(customPowerFactor.value);

}
else{

    pf=
    Number(powerFactor.value);

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

    return;

}

if(voltage<120||voltage>1500){

    showNotifier("Voltage must be between 120 V and 1500 V.");

    return;

}

if(isNaN(current)||current<=0){

    showNotifier("Enter a valid load current.");

    loadCurrent.focus();

    return;

}

if(current>2000){

    showNotifier("Maximum supported current is 2000 A.");

    return;

}

if(isNaN(length)||length<=0){

    showNotifier("Enter a valid cable length.");

    cableLength.focus();

    return;

}

if(length>1000){

    showNotifier("Maximum supported cable length is 1000 m.");

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

if(isNaN(pf)||pf<=0||pf>1){

    showNotifier("Power factor must be between 0.01 and 1.00.");

    return;

}

// ------------------------------------------
// UNIT CONVERSION
// ------------------------------------------

const lengthMeters=

lengthUnit.value==="ft"

?length*0.3048

:length;

// ------------------------------------------
// ALLOWABLE VOLTAGE DROP
// ------------------------------------------

const allowableDrop=

(voltage*maxDrop)/100;

// ------------------------------------------
// LOAD POWER
// ------------------------------------------

let kva;

let kw;

if(systemType.value==="single"){

    kva=

    (voltage*current)/1000;

}
else{

    kva=

    (Math.sqrt(3)*voltage*current)/1000;

}

kw=

kva*pf;

// ------------------------------------------
// PREPARE CABLE SEARCH
// ------------------------------------------

let selectedCable=null;

let selectedResistance=0;

let selectedReactance=0;

let selectedAmpacity=0;

let actualDrop=0;

let actualDropPercent=0;

let powerLoss=0;

let selectionReason="Voltage Drop Controlled";// ------------------------------------------
// FIND SMALLEST SUITABLE CABLE
// ------------------------------------------

for(const cable of cableDatabase){

    const resistance=

    conductor==="copper"

    ?cable.copperResistance

    :cable.aluminiumResistance;

    const reactance=
    cable.reactance;

    let ampacity=

    conductor==="copper"

    ?cable.ampacityCopper

    :cable.ampacityAluminium;

    // --------------------------------------
    // TEMPERATURE CORRECTION
    // --------------------------------------

    const tempFactor=

    temperature.value==="90"

    ?1.08

    :1.00;

    ampacity=
    ampacity*tempFactor;

    // --------------------------------------
    // AMPACITY CHECK
    // --------------------------------------

    if(current>ampacity){

        continue;

    }

    // --------------------------------------
    // AC VOLTAGE DROP
    // --------------------------------------

    const cosPhi=
    pf;

    const sinPhi=

    Math.sqrt(
    1-(pf*pf)
    );

    let voltageDropVolts;

    if(systemType.value==="single"){

        voltageDropVolts=

        (
        2*
        lengthMeters*
        current*
        (
        resistance*cosPhi+
        reactance*sinPhi
        )
        )/1000;

    }

    else{

        voltageDropVolts=

        (
        Math.sqrt(3)*
        lengthMeters*
        current*
        (
        resistance*cosPhi+
        reactance*sinPhi
        )
        )/1000;

    }

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

        selectedReactance=
        reactance;

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
// DETERMINE SELECTION BASIS
// ------------------------------------------

const safetyMargin=

selectedAmpacity-
current;

const utilization=

(
current/
selectedAmpacity
)*100;

if(utilization>90){

   selectionReason=
"Ampacity Controlled";

}

else{

    selectionReason=
"Voltage Drop Controlled";

}

// ------------------------------------------
// RECEIVING VOLTAGE
// ------------------------------------------

const receivingVoltage=

voltage-
actualDrop;

// ------------------------------------------
// VOLTAGE EFFICIENCY
// ------------------------------------------

const voltageEfficiency=

(
receivingVoltage/
voltage
)*100;

// ------------------------------------------
// VOLTAGE DROP STATUS
// ------------------------------------------

let status="";

if(actualDropPercent<2){

    status=
    "🟢 Excellent";

}

else if(actualDropPercent<=3){

    status=
    "🟡 Acceptable";

}

else if(actualDropPercent<=5){

    status=
    "🟠 High";

}

else{

    status=
    "🔴 Excessive";

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

let smallerDropValue="N/A";
let largerDropValue="N/A";

// ------------------------------------------
// SMALLER CABLE VOLTAGE DROP
// ------------------------------------------

if(smaller){

const r=

conductor==="copper"

?smaller.copperResistance

:smaller.aluminiumResistance;

const x=
smaller.reactance;

const cosPhi=
pf;

const sinPhi=
Math.sqrt(1-pf*pf);

let vd;

if(systemType.value==="single"){

vd=

(
2*
lengthMeters*
current*
(
r*cosPhi+
x*sinPhi
)
)/1000;

}
else{

vd=

(
Math.sqrt(3)*
lengthMeters*
current*
(
r*cosPhi+
x*sinPhi
)
)/1000;

}

smallerDropValue=

(vd/voltage*100).toFixed(2)+
"%";

}

// ------------------------------------------
// LARGER CABLE VOLTAGE DROP
// ------------------------------------------

if(larger){

const r=

conductor==="copper"

?larger.copperResistance

:larger.aluminiumResistance;

const x=
larger.reactance;

const cosPhi=
pf;

const sinPhi=
Math.sqrt(1-pf*pf);

let vd;

if(systemType.value==="single"){

vd=

(
2*
lengthMeters*
current*
(
r*cosPhi+
x*sinPhi
)
)/1000;

}
else{

vd=

(
Math.sqrt(3)*
lengthMeters*
current*
(
r*cosPhi+
x*sinPhi
)
)/1000;

}

largerDropValue=

(vd/voltage*100).toFixed(2)+
"%";

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

systemTypeResult.textContent=

systemType.value==="single"

?"Single Phase"

:"Three Phase";

voltageResult.textContent=

voltage.toFixed(0)+
" V";

currentResult.textContent=

current.toFixed(1)+
" A";

pfResult.textContent=

pf.toFixed(2);

lengthResult.textContent=

length.toFixed(2)+
" "+
lengthUnit.value;

materialResult.textContent=

conductor==="copper"

?"Copper"

:"Aluminium";

dropVoltResult.textContent=

actualDrop.toFixed(2)+
" V";

dropPercentResult.textContent=

actualDropPercent.toFixed(2)+
" %";

receivingVoltageResult.textContent=

receivingVoltage.toFixed(2)+
" V";

efficiencyResult.textContent=

voltageEfficiency.toFixed(2)+
" %";

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
// LOAD POWER
// ------------------------------------------

kwResult.textContent=

kw.toFixed(2)+
" kW";

kvaResult.textContent=

kva.toFixed(2)+
" kVA";

// ------------------------------------------
// SELECTION BASIS
// ------------------------------------------

selectionBasis.textContent=
selectionReason;

// ------------------------------------------
// CABLE COMPARISON
// ------------------------------------------

smallerCable.textContent=

smaller

?smaller.size+
" mm²"

:"None";

smallerDrop.textContent=

smallerDropValue;

largerCable.textContent=

larger

?larger.size+
" mm²"

:"None";

largerDrop.textContent=

largerDropValue;

// ------------------------------------------
// CABLE DETAILS
// ------------------------------------------

awgResult.textContent=

selectedCable.awg;

resistanceResult.textContent=

selectedResistance.toFixed(3)+
" Ω/km";

reactanceResult.textContent=

selectedReactance.toFixed(3)+
" Ω/km";

ampacityResult.textContent=

selectedAmpacity.toFixed(1)+
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

" cable is recommended for this "+

(systemType.value==="single"
?"single-phase"
:"three-phase")+

" AC system operating at "+

voltage+

" V, carrying "+

current.toFixed(1)+

" A over "+

length.toFixed(2)+

" "+

lengthUnit.value+

" with a power factor of "+

pf.toFixed(2)+

". This is the smallest standard cable that satisfies the selected "+

maxDrop+

"% voltage drop limit while maintaining adequate current carrying capacity.";

// ------------------------------------------
// OPEN RESULT SHEET
// ------------------------------------------

openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    // System Type
    systemType.value="single";

    // Reload default voltage list
    updateVoltageOptions();

    // Custom Voltage
    customVoltage.value="";
    customVoltageGroup.style.display="none";

    // Load Current
    loadCurrent.value="";

    // Cable Length
    cableLength.value="";
    lengthUnit.value="m";

    // Voltage Drop
    voltageDrop.value="3";
    customDrop.value="";
    customDropGroup.style.display="none";

    // Material
    material.value="copper";

    // Power Factor
    powerFactor.value="0.90";
    customPowerFactor.value="";
    customPowerFactorGroup.style.display="none";

    // Temperature
    temperature.value="90";

    // Close Result Sheet
    closeResultSheet();

    showNotifier("Calculator reset successfully.");

});