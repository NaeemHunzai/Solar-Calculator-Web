// ==========================================
// FUSE SIZE CALCULATOR
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

const protectionType =
document.getElementById("protectionType");

const protectionHelper =
document.getElementById("protectionHelper");

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

const recommendedFuse =
document.getElementById("recommendedFuse");

const protectionAssessment =
document.getElementById("protectionAssessment");

const designCurrentResult =
document.getElementById("designCurrentResult");

const safetyFactorResult =
document.getElementById("safetyFactorResult");

const temperatureFactorResult =
document.getElementById("temperatureFactorResult");

const adjustedCurrentResult =
document.getElementById("adjustedCurrentResult");

const deviceResult =
document.getElementById("deviceResult");

const iecResult =
document.getElementById("iecResult");

const speedResult =
document.getElementById("speedResult");

const breakingCapacityResult =
document.getElementById("breakingCapacityResult");

const marginResult =
document.getElementById("marginResult");

const utilizationResult =
document.getElementById("utilizationResult");

const protectedLoadResult =
document.getElementById("protectedLoadResult");

const voltageRatingResult =
document.getElementById("voltageRatingResult");

const smallerFuseResult =
document.getElementById("smallerFuseResult");

const largerFuseResult =
document.getElementById("largerFuseResult");

const applicationResult =
document.getElementById("applicationResult");

const locationResult =
document.getElementById("locationResult");

const replacementResult =
document.getElementById("replacementResult");

const iecStandardResult =
document.getElementById("iecStandardResult");

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
// STANDARD FUSE DATABASE
// ==========================================

const fuseDatabase=[

2,
4,
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
// LOAD DATABASE
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
name:"Solar PV"
},

battery:{
factor:1.25,
name:"Battery"
},

inverter:{
factor:1.25,
name:"Inverter"
},

general:{
factor:1.25,
name:"General Purpose"
}

};

// ==========================================
// PROTECTION DATABASE
// ==========================================

const protectionDatabase={

general:{

device:"General Purpose Fuse",

iec:"gG",

speed:"General Purpose",

standard:"IEC 60269-2",

application:"Lighting circuits, socket outlets and general electrical distribution.",

location:"Residential Distribution Board",

replacement:"Replace only with the same current rating and gG classification.",

helper:"Suitable for lighting, socket outlets and general electrical distribution."

},

motor:{

device:"Motor Protection Fuse",

iec:"aM",

speed:"Time Delay",

standard:"IEC 60269-2",

application:"Motors, compressors and pumps.",

location:"Motor Control Center",

replacement:"Replace only with the same current rating and aM classification.",

helper:"Designed for motors and inductive loads."

},

pv:{

device:"Photovoltaic Fuse",

iec:"gPV",

speed:"Fast Acting",

standard:"IEC 60269-6",

application:"Solar strings, combiner boxes and PV arrays.",

location:"Solar Combiner Box",

replacement:"Replace only with the same current rating and gPV classification.",

helper:"Designed specifically for photovoltaic systems."

},

battery:{

device:"Battery Protection Fuse",

iec:"gBat",

speed:"Fast Acting",

standard:"IEC 60269",

application:"Battery banks, UPS systems and energy storage.",

location:"Battery Bank",

replacement:"Replace only with the same current rating and battery protection classification.",

helper:"Suitable for battery banks and energy storage systems."

},

semiconductor:{

device:"Semiconductor Fuse",

iec:"aR",

speed:"Ultra Fast",

standard:"IEC 60269-4",

application:"VFDs, inverters, rectifiers and power electronics.",

location:"Power Electronics Panel",

replacement:"Replace only with the same current rating and aR classification.",

helper:"Provides ultra-fast protection for semiconductor devices."

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

}
else if(systemType.value==="single"){

voltages=singleVoltages;

}
else{

voltages=threeVoltages;

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
// PROTECTION HELPER
// ==========================================

function updateProtectionHelper(){

const protection=

protectionDatabase[
protectionType.value
];

protectionHelper.textContent=

protection.helper;

}

updateProtectionHelper();

protectionType.addEventListener(

"change",

updateProtectionHelper

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

calculateBtn.addEventListener(

"click",

function(){

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

const protection=

protectionDatabase[
protectionType.value
];

const safetyFactor=
load.factor;

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(

isNaN(voltage)||
voltage<=0

){

showNotifier(

"Enter a valid system voltage."

);

return;

}

if(

isNaN(current)||
current<=0

){

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
// ADJUSTED CURRENT
// ------------------------------------------

const adjustedCurrent=

current*
safetyFactor*
temperatureFactor;

// ------------------------------------------
// SELECT FUSE
// ------------------------------------------

let selectedFuse=null;

for(

let i=0;

i<fuseDatabase.length;

i++

){

if(

fuseDatabase[i]>=
adjustedCurrent

){

selectedFuse=

fuseDatabase[i];

break;

}

}

if(selectedFuse===null){

showNotifier(

"No suitable standard fuse found."

);

return;

}

// ------------------------------------------
// SMALLER / LARGER FUSE
// ------------------------------------------

const fuseIndex=

fuseDatabase.indexOf(
selectedFuse
);

let smallerFuse="None";

let largerFuse="None";

if(fuseIndex>0){

smallerFuse=

fuseDatabase[
fuseIndex-1
]+" A";

}

if(

fuseIndex<
fuseDatabase.length-1

){

largerFuse=

fuseDatabase[
fuseIndex+1
]+" A";

}

// ------------------------------------------
// PROTECTION MARGIN
// ------------------------------------------

const margin=

selectedFuse-
adjustedCurrent;

// ------------------------------------------
// UTILIZATION
// ------------------------------------------

const utilization=

(
adjustedCurrent/
selectedFuse
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
// APPROXIMATE PROTECTED LOAD
// ------------------------------------------

let protectedLoad;

let protectedLoadText="";

if(systemType.value==="three"){

protectedLoad=

Math.sqrt(3)*
voltage*
selectedFuse;

protectedLoadText=

(protectedLoad/1000).toFixed(2)+
" kVA";

}
else if(systemType.value==="single"){

protectedLoad=

voltage*
selectedFuse;

protectedLoadText=

(protectedLoad/1000).toFixed(2)+
" kVA";

}
else{

protectedLoad=

voltage*
selectedFuse;

if(protectedLoad>=1000){

protectedLoadText=

(protectedLoad/1000).toFixed(2)+
" kVA";

}
else{

protectedLoadText=

protectedLoad.toFixed(0)+
" VA";

}

}

// ------------------------------------------
// VOLTAGE RATING
// ------------------------------------------

let voltageRating="";

if(systemType.value==="dc"){

voltageRating=
voltage+" V DC";

}
else{

voltageRating=
voltage+" V AC";

}

// ------------------------------------------
// RESULT CARD
// ------------------------------------------

recommendedFuse.textContent=
selectedFuse+" A";

protectionAssessment.textContent=
assessment;

designCurrentResult.textContent=
current.toFixed(1)+" A";

safetyFactorResult.textContent=
safetyFactor.toFixed(2);

temperatureFactorResult.textContent=
temperatureFactor.toFixed(2);

adjustedCurrentResult.textContent=
adjustedCurrent.toFixed(1)+" A";

deviceResult.textContent=
protection.device;

iecResult.textContent=
protection.iec;

speedResult.textContent=
protection.speed;

breakingCapacityResult.textContent=
breakingCapacity.value+" kA";

marginResult.textContent=
margin.toFixed(1)+" A";

utilizationResult.textContent=
utilization.toFixed(1)+" %";

protectedLoadResult.textContent=
protectedLoadText;

voltageRatingResult.textContent=
voltageRating;

smallerFuseResult.textContent=
smallerFuse;

largerFuseResult.textContent=
largerFuse;

applicationResult.textContent=
protection.application;

locationResult.textContent=
protection.location;

replacementResult.textContent=
protection.replacement;

iecStandardResult.textContent=
protection.standard;

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

engineeringSummary.textContent=

"A "+

selectedFuse+

" A "+

protection.device+

" ("+

protection.iec+

") is recommended. After applying the load and ambient temperature factors, the adjusted current becomes "+

adjustedCurrent.toFixed(1)+

" A. The selected fuse provides an appropriate protection margin of "+

margin.toFixed(1)+

" A and is suitable for "+

protection.application.toLowerCase();

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

protectionType.value="general";

breakingCapacity.value="50";

temperature.value="40";

customVoltageGroup.style.display="none";

updateProtectionHelper();

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

"Fuse Size Calculator\n\n"+

"Recommended Fuse : "+selectedFuse+" A\n"+

"Protection Device : "+protection.device+"\n"+

"IEC Classification : "+protection.iec+"\n"+

"Fuse Speed : "+protection.speed+"\n"+

"System : "+voltageRating+"\n"+

"Load Current : "+current.toFixed(1)+" A\n"+

"Adjusted Current : "+adjustedCurrent.toFixed(1)+" A\n"+

"Protection Margin : "+margin.toFixed(1)+" A\n"+

"Breaking Capacity : "+breakingCapacity.value+" kA\n"+

"Approximate Protected Load : "+protectedLoadText+"\n"+

"IEC Standard : "+protection.standard;

if(navigator.share){

navigator.share({

title:"Fuse Size Calculator",

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