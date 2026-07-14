// ==========================================
// VOLTAGE DROP CALCULATOR
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

const material =
document.getElementById("material");

const cableSize =
document.getElementById("cableSize");

const powerFactor =
document.getElementById("powerFactor");

const powerFactorGroup =
document.getElementById("powerFactorGroup");

const customPowerFactor =
document.getElementById("customPowerFactor");

const customPowerFactorGroup =
document.getElementById("customPowerFactorGroup");

const temperature =
document.getElementById("temperature");

const allowableDrop =
document.getElementById("allowableDrop");

const customDrop =
document.getElementById("customDrop");

const customDropGroup =
document.getElementById("customDropGroup");

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

const voltageDropResult =
document.getElementById("voltageDropResult");

const dropAssessment =
document.getElementById("dropAssessment");

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

const resistanceResult =
document.getElementById("resistanceResult");

const reactanceResult =
document.getElementById("reactanceResult");

const selectedCableResult =
document.getElementById("selectedCableResult");

const awgResult =
document.getElementById("awgResult");

const ampacityResult =
document.getElementById("ampacityResult");

const utilizationResult =
document.getElementById("utilizationResult");

const weightResult =
document.getElementById("weightResult");

const applicationResult =
document.getElementById("applicationResult");

const maxLengthResult =
document.getElementById("maxLengthResult");

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
// Resistance values are Ω/km @20°C
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

const dcVoltages=[
12,
24,
48,
96,
110,
220,
380,
600
];

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
// UPDATE INTERFACE
// ==========================================

function updateInterface(){

let list=[];

if(systemType.value==="dc"){

list=dcVoltages;

powerFactorGroup.style.display="none";

customPowerFactorGroup.style.display="none";

}
else if(systemType.value==="single"){

list=singlePhaseVoltages;

powerFactorGroup.style.display="block";

}
else{

list=threePhaseVoltages;

powerFactorGroup.style.display="block";

}

systemVoltage.innerHTML="";

list.forEach(function(v){

const option=
document.createElement("option");

option.value=v;

option.textContent=v+" V";

systemVoltage.appendChild(option);

});

const customOption=
document.createElement("option");

customOption.value="custom";

customOption.textContent="Custom";

systemVoltage.appendChild(customOption);

// Default Voltage

if(systemType.value==="dc"){

systemVoltage.value="48";

}
else if(systemType.value==="single"){

systemVoltage.value="230";

}
else{

systemVoltage.value="415";

}

customVoltage.value="";

customVoltageGroup.style.display="none";

}

updateInterface();

systemType.addEventListener(

"change",

updateInterface

);

// ==========================================
// CUSTOM VOLTAGE
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

// ==========================================
// CUSTOM POWER FACTOR
// ==========================================

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
// CUSTOM VOLTAGE DROP
// ==========================================

allowableDrop.addEventListener(

"change",

function(){

if(allowableDrop.value==="custom"){

customDropGroup.style.display="block";

}
else{

customDropGroup.style.display="none";

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

let pf=1;

if(systemType.value!=="dc"){

if(powerFactor.value==="custom"){

pf=
Number(customPowerFactor.value);

}
else{

pf=
Number(powerFactor.value);

}

}

let allowable;

if(allowableDrop.value==="custom"){

allowable=
Number(customDrop.value);

}
else{

allowable=
Number(allowableDrop.value);

}

const current=
Number(loadCurrent.value);

const length=
Number(cableLength.value);

const conductor=
material.value;

const size=
Number(cableSize.value);

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(voltage)||voltage<=0){

showNotifier("Enter a valid system voltage.");

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

if(systemType.value!=="dc"){

if(isNaN(pf)||pf<=0||pf>1){

showNotifier("Power factor must be between 0.01 and 1.00.");

return;

}

}

if(isNaN(allowable)||allowable<=0){

showNotifier("Enter a valid allowable voltage drop.");

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
// FIND SELECTED CABLE
// ------------------------------------------

const cable=

cableDatabase.find(function(item){

return item.size===size;

});

if(!cable){

showNotifier("Cable data not found.");

return;

}

// ------------------------------------------
// CABLE DATA
// ------------------------------------------

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

// ------------------------------------------
// TEMPERATURE CORRECTION
// ------------------------------------------

if(temperature.value==="90"){

ampacity*=1.08;

}

// ------------------------------------------
// AMPACITY UTILIZATION
// ------------------------------------------

const utilization=

(current/ampacity)*100;
// ------------------------------------------
// VOLTAGE DROP
// ------------------------------------------

let voltageDrop=0;

if(systemType.value==="dc"){

    voltageDrop=

    (
    2*
    current*
    lengthMeters*
    resistance
    )/1000;

}
else{

    const cosPhi=
    pf;

    const sinPhi=

    Math.sqrt(
    1-(pf*pf)
    );

    if(systemType.value==="single"){

        voltageDrop=

        (
        2*
        current*
        lengthMeters*
        (
        resistance*cosPhi+
        reactance*sinPhi
        )
        )/1000;

    }

    else{

        voltageDrop=

        (
        Math.sqrt(3)*
        current*
        lengthMeters*
        (
        resistance*cosPhi+
        reactance*sinPhi
        )
        )/1000;

    }

}

// ------------------------------------------
// VOLTAGE DROP PERCENT
// ------------------------------------------

const voltageDropPercent=

(
voltageDrop/
voltage
)*100;

// ------------------------------------------
// RECEIVING VOLTAGE
// ------------------------------------------

const receivingVoltage=

voltage-
voltageDrop;

// ------------------------------------------
// VOLTAGE EFFICIENCY
// ------------------------------------------

const voltageEfficiency=

(
receivingVoltage/
voltage
)*100;

// ------------------------------------------
// POWER LOSS
// ------------------------------------------

const powerLoss=

voltageDrop*
current;

// ------------------------------------------
// MAXIMUM RECOMMENDED LENGTH
// ------------------------------------------

const allowableVoltage=

(
allowable*
voltage
)/100;

let denominator=0;

if(systemType.value==="dc"){

    denominator=

    2*
    current*
    resistance;

}
else{

    const cosPhi=
    pf;

    const sinPhi=

    Math.sqrt(
    1-(pf*pf)
    );

    if(systemType.value==="single"){

        denominator=

        2*
        current*
        (
        resistance*cosPhi+
        reactance*sinPhi
        );

    }

    else{

        denominator=

        Math.sqrt(3)*
        current*
        (
        resistance*cosPhi+
        reactance*sinPhi
        );

    }

}

const maximumLength=

(
allowableVoltage*
1000
)/
denominator;

// ------------------------------------------
// VOLTAGE DROP ASSESSMENT
// ------------------------------------------

let assessment="";

if(voltageDropPercent<=1){

assessment=
"🟢 Excellent";

}
else if(voltageDropPercent<=3){

assessment=
"🟢 Within Limit";

}
else if(voltageDropPercent<=5){

assessment=
"🟠 High";

}
else{

assessment=
"🔴 Excessive";

}
// ------------------------------------------
// RESULT CARD
// ------------------------------------------

voltageDropResult.textContent=
voltageDrop.toFixed(2)+" V";

dropAssessment.textContent=
assessment;

dropVoltResult.textContent=
voltageDrop.toFixed(2)+" V";

dropPercentResult.textContent=
voltageDropPercent.toFixed(2)+" %";

receivingVoltageResult.textContent=
receivingVoltage.toFixed(2)+" V";

efficiencyResult.textContent=
voltageEfficiency.toFixed(2)+" %";

powerLossResult.textContent=
powerLoss.toFixed(1)+" W";

resistanceResult.textContent=
resistance.toFixed(3)+" Ω/km";

reactanceResult.textContent=

systemType.value==="dc"

?"N/A"

:reactance.toFixed(3)+" Ω/km";

selectedCableResult.textContent=
size+" mm²";

awgResult.textContent=
cable.awg;

ampacityResult.textContent=
ampacity.toFixed(1)+" A";

utilizationResult.textContent=
utilization.toFixed(1)+" %";

weightResult.textContent=
cable.weight+" kg/km";

applicationResult.textContent=
cable.applications;

maxLengthResult.textContent=
maximumLength.toFixed(1)+" m";

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

let summary="";

if(voltageDropPercent<=allowable){

summary=

"The selected "+

size+

" mm² "+

conductor+

" cable produces a voltage drop of "+

voltageDrop.toFixed(2)+

" V ("+

voltageDropPercent.toFixed(2)+

"%), which is within the selected "+

allowable+

"% design limit.";

}
else{

summary=

"The selected "+

size+

" mm² "+

conductor+

" cable produces a voltage drop of "+

voltageDrop.toFixed(2)+

" V ("+

voltageDropPercent.toFixed(2)+

"%), exceeding the selected "+

allowable+

"% design limit. Consider using a larger cable or reducing the cable length.";

}

engineeringSummary.textContent=
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

systemType.value="single";

updateInterface();

customVoltage.value="";

loadCurrent.value="";

cableLength.value="";

lengthUnit.value="m";

material.value="copper";

cableSize.value="10";

powerFactor.value="0.90";

customPowerFactor.value="";

temperature.value="90";

allowableDrop.value="3";

customDrop.value="";

customVoltageGroup.style.display="none";

customPowerFactorGroup.style.display="none";

customDropGroup.style.display="none";

closeResultSheet();

showNotifier(

"Calculator reset successfully."

);

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",function(){

const text=

"Voltage Drop Calculator\n\n"+

"System: "+systemType.value+"\n"+

"Voltage: "+voltage+" V\n"+

"Current: "+current+" A\n"+

"Cable: "+size+" mm² "+conductor+"\n"+

"Length: "+length+" "+lengthUnit.value+"\n"+

"Voltage Drop: "+voltageDrop.toFixed(2)+" V\n"+

"Voltage Drop (%): "+voltageDropPercent.toFixed(2)+"%\n"+

"Receiving Voltage: "+receivingVoltage.toFixed(2)+" V";

if(navigator.share){

navigator.share({

title:"Voltage Drop Calculator",

text:text

});

}
else{

navigator.clipboard.writeText(text);

showNotifier(

"Results copied to clipboard."

);

}

});