// ==========================================
// BREAKER SIZE CALCULATOR
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

const loadType =
document.getElementById("loadType");

const loadCurrent =
document.getElementById("loadCurrent");

const breakerCurve =
document.getElementById("breakerCurve");

const curveGroup =
document.getElementById("curveGroup");

const breakingCapacity =
document.getElementById("breakingCapacity");

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

const recommendedBreaker =
document.getElementById("recommendedBreaker");

const protectionAssessment =
document.getElementById("protectionAssessment");

const designCurrentResult =
document.getElementById("designCurrentResult");

const safetyFactorResult =
document.getElementById("safetyFactorResult");

const adjustedCurrentResult =
document.getElementById("adjustedCurrentResult");

const voltageResult =
document.getElementById("voltageResult");

const systemResult =
document.getElementById("systemResult");

const loadTypeResult =
document.getElementById("loadTypeResult");

const breakerTypeResult =
document.getElementById("breakerTypeResult");

const deviceCategoryResult =
document.getElementById("deviceCategoryResult");

const poleResult =
document.getElementById("poleResult");

const curveResult =
document.getElementById("curveResult");

const breakingCapacityResult =
document.getElementById("breakingCapacityResult");

const marginResult =
document.getElementById("marginResult");

const utilizationResult =
document.getElementById("utilizationResult");

const smallerBreakerResult =
document.getElementById("smallerBreakerResult");

const largerBreakerResult =
document.getElementById("largerBreakerResult");

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
// STANDARD BREAKER DATABASE
// ==========================================

const breakerDatabase=[

6,
10,
16,
20,
25,
32,
40,
50,
63,
80,
100,
125,
160,
200,
250,
315,
400,
500,
630,
800,
1000

];

// ==========================================
// LOAD TYPE DATABASE
// ==========================================

const loadDatabase={

continuous:{
factor:1.25,
name:"Continuous Load"
},

noncontinuous:{
factor:1.00,
name:"Non-Continuous Load"
},

motor:{
factor:1.50,
name:"Motor"
},

solar:{
factor:1.25,
name:"Solar PV Array"
},

battery:{
factor:1.25,
name:"Battery Circuit"
},

inverter:{
factor:1.25,
name:"Inverter Output"
},

general:{
factor:1.25,
name:"General Purpose"
}

};
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

const singleVoltages=[
120,
127,
220,
230,
240
];

const threeVoltages=[
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

let voltages=[];

if(systemType.value==="dc"){

voltages=dcVoltages;

curveGroup.style.display="none";

}
else if(systemType.value==="single"){

voltages=singleVoltages;

curveGroup.style.display="block";

}
else{

voltages=threeVoltages;

curveGroup.style.display="block";

}

systemVoltage.innerHTML="";

voltages.forEach(function(v){

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

// Default Voltages

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

const current=
Number(loadCurrent.value);

const load=
loadDatabase[
loadType.value
];

const safetyFactor=
load.factor;

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(voltage)||voltage<=0){

showNotifier(
"Enter a valid system voltage."
);

return;

}

if(isNaN(current)||current<=0){

showNotifier(
"Enter a valid load current."
);

loadCurrent.focus();

return;

}

if(current>1000){

showNotifier(
"Maximum supported current is 1000 A."
);

return;

}

// ------------------------------------------
// TEMPERATURE FACTOR
// ------------------------------------------

let temperatureFactor=1.00;

switch(temperature.value){

case "30":

temperatureFactor=1.00;

break;

case "40":

temperatureFactor=1.05;

break;

case "50":

temperatureFactor=1.10;

break;

}

// ------------------------------------------
// DESIGN CURRENT
// ------------------------------------------

const adjustedCurrent=

current*
safetyFactor*
temperatureFactor;

// ------------------------------------------
// SELECT BREAKER
// ------------------------------------------

let selectedBreaker=null;

for(let i=0;

i<breakerDatabase.length;

i++){

if(

breakerDatabase[i]>=
adjustedCurrent

){

selectedBreaker=
breakerDatabase[i];

break;

}

}

if(selectedBreaker===null){

showNotifier(

"No suitable standard breaker found."

);

return;

}

// ------------------------------------------
// NEXT SMALLER / LARGER
// ------------------------------------------

const breakerIndex=

breakerDatabase.indexOf(
selectedBreaker
);

let smallerBreaker="None";

let largerBreaker="None";

if(breakerIndex>0){

smallerBreaker=

breakerDatabase[
breakerIndex-1
]+" A";

}

if(

breakerIndex<

breakerDatabase.length-1

){

largerBreaker=

breakerDatabase[
breakerIndex+1
]+" A";

}

// ------------------------------------------
// PROTECTION MARGIN
// ------------------------------------------

const margin=

selectedBreaker-
adjustedCurrent;

// ------------------------------------------
// UTILIZATION
// ------------------------------------------

const utilization=

(
adjustedCurrent/
selectedBreaker
)*100;
// ------------------------------------------
// PROTECTION ASSESSMENT
// ------------------------------------------

let assessment="";

if(utilization>=80&&utilization<=95){

assessment=
"🟢 Excellent Selection";

}
else if(utilization>=60){

assessment=
"🟡 Conservative Selection";

}
else if(utilization>=40){

assessment=
"🟠 Oversized";

}
else{

assessment=
"🔴 Significantly Oversized";

}

// ------------------------------------------
// BREAKER TYPE
// ------------------------------------------

let breakerType="";
let deviceCategory="";
let application="";

if(selectedBreaker<=63){

breakerType="MCB";

deviceCategory=
"Miniature Circuit Breaker";

application=
"Lighting circuits, socket outlets and residential distribution boards.";

}
else if(selectedBreaker<=630){

breakerType="MCCB";

deviceCategory=
"Molded Case Circuit Breaker";

application=
"Industrial feeders, distribution panels, motor control and large commercial installations.";

}
else{

breakerType="ACB";

deviceCategory=
"Air Circuit Breaker";

application=
"Main LV switchboards, industrial power distribution and utility applications.";

}

// ------------------------------------------
// BREAKER POLES
// ------------------------------------------

let poles="";

switch(systemType.value){

case "dc":

poles="2P DC";

break;

case "single":

poles="2 Pole";

break;

case "three":

poles="3 Pole";

break;

}

// ------------------------------------------
// BREAKER CURVE
// ------------------------------------------

let curve="N/A";

if(systemType.value!=="dc"){

curve=
breakerCurve.value+
" Curve";

}
// ------------------------------------------
// RESULT CARD
// ------------------------------------------

recommendedBreaker.textContent=
selectedBreaker+" A";

protectionAssessment.textContent=
assessment;

designCurrentResult.textContent=
current.toFixed(1)+" A";

safetyFactorResult.textContent=
safetyFactor.toFixed(2);

adjustedCurrentResult.textContent=
adjustedCurrent.toFixed(1)+" A";

voltageResult.textContent=
voltage+" V";

systemResult.textContent=

systemType.value==="dc"

?"DC"

:systemType.value==="single"

?"AC Single Phase"

:"AC Three Phase";

loadTypeResult.textContent=
load.name;

breakerTypeResult.textContent=
breakerType;

deviceCategoryResult.textContent=
deviceCategory;

poleResult.textContent=
poles;

curveResult.textContent=
curve;

breakingCapacityResult.textContent=
breakingCapacity.value+" kA";

marginResult.textContent=
margin.toFixed(1)+" A";

utilizationResult.textContent=
utilization.toFixed(1)+" %";

smallerBreakerResult.textContent=
smallerBreaker;

largerBreakerResult.textContent=
largerBreaker;

applicationResult.textContent=
application;

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

engineeringSummary.textContent=

"Based on a "+

current.toFixed(1)+

" A "+

load.name.toLowerCase()+

", the design current becomes "+

adjustedCurrent.toFixed(1)+

" A after applying the recommended safety and temperature factors. The nearest standard breaker is "+

selectedBreaker+

" A ("+

breakerType+

"), providing approximately "+

margin.toFixed(1)+

" A of protection margin.";

// ------------------------------------------
// OPEN RESULT SHEET
// ------------------------------------------

openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener(

"click",

function(){

systemType.value="single";

updateInterface();

customVoltage.value="";

loadCurrent.value="";

loadType.value="continuous";

breakerCurve.value="C";

breakingCapacity.value="10";

temperature.value="40";

customVoltageGroup.style.display="none";

curveGroup.style.display="block";

closeResultSheet();

showNotifier(

"Calculator reset successfully."

);

}

);

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener(

"click",

function(){

const text=

"Breaker Size Calculator\n\n"+

"Recommended Breaker : "+selectedBreaker+" A\n"+

"Breaker Type : "+breakerType+"\n"+

"Protection Device : "+deviceCategory+"\n"+

"System : "+systemResult.textContent+"\n"+

"Voltage : "+voltage+" V\n"+

"Load Current : "+current.toFixed(1)+" A\n"+

"Adjusted Current : "+adjustedCurrent.toFixed(1)+" A\n"+

"Load Type : "+load.name+"\n"+

"Breaker Curve : "+curve+"\n"+

"Breaking Capacity : "+breakingCapacity.value+" kA";

if(navigator.share){

navigator.share({

title:"Breaker Size Calculator",

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