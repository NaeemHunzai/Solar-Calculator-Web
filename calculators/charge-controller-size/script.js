// ==========================================
// CHARGE CONTROLLER SIZE CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const controllerType =
document.getElementById("controllerType");

const controllerHelper =
document.getElementById("controllerHelper");

const systemVoltage =
document.getElementById("systemVoltage");

const customVoltage =
document.getElementById("customVoltage");

const customVoltageGroup =
document.getElementById("customVoltageGroup");

const inputMethod =
document.getElementById("inputMethod");

const powerGroup =
document.getElementById("powerGroup");

const panelGroup =
document.getElementById("panelGroup");

const pvPower =
document.getElementById("pvPower");

const panelCount =
document.getElementById("panelCount");

const panelPower =
document.getElementById("panelPower");

const batteryCapacity =
document.getElementById("batteryCapacity");

const batteryType =
document.getElementById("batteryType");

const safetyFactor =
document.getElementById("safetyFactor");

const temperature =
document.getElementById("temperature");

// ==========================================
// LIVE PV INFORMATION
// ==========================================

const livePowerCard =
document.getElementById("livePowerCard");

const livePvPower =
document.getElementById("livePvPower");

const liveChargingCurrent =
document.getElementById("liveChargingCurrent");

const liveControllerSize =
document.getElementById("liveControllerSize");

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

const recommendedController =
document.getElementById("recommendedController");

const designVerdict =
document.getElementById("designVerdict");

const pvPowerResult =
document.getElementById("pvPowerResult");

const chargingCurrentResult =
document.getElementById("chargingCurrentResult");

const safetyFactorResult =
document.getElementById("safetyFactorResult");

const temperatureFactorResult =
document.getElementById("temperatureFactorResult");

const designCurrentResult =
document.getElementById("designCurrentResult");

const controllerTypeResult =
document.getElementById("controllerTypeResult");

const efficiencyResult =
document.getElementById("efficiencyResult");

const utilizationResult =
document.getElementById("utilizationResult");

const marginResult =
document.getElementById("marginResult");

const maxPvResult =
document.getElementById("maxPvResult");

const remainingPvResult =
document.getElementById("remainingPvResult");

const additionalPanelsResult =
document.getElementById("additionalPanelsResult");

const batteryCard =
document.getElementById("batteryCard");

const batteryResult =
document.getElementById("batteryResult");

const recommendedChargeResult =
document.getElementById("recommendedChargeResult");

const actualChargeResult =
document.getElementById("actualChargeResult");

const batteryStatusResult =
document.getElementById("batteryStatusResult");

const controllerAdvice =
document.getElementById("controllerAdvice");

const warningsResult =
document.getElementById("warningsResult");

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
// STANDARD CONTROLLER RATINGS (IEC COMMON)
// ==========================================

const controllerRatings = [

10,
20,
30,
40,
50,
60,
80,
100,
120,
150,
200,
250,
300

];

// ==========================================
// CONTROLLER INFORMATION
// ==========================================

const controllerData = {

mppt:{

name:"MPPT",

display:"MPPT",

efficiency:"95–99%",

helper:"MPPT is recommended for most solar systems due to higher efficiency and better energy harvest.",

advice:"MPPT controllers provide superior performance for medium and large PV systems and are recommended for long cable runs and varying weather conditions."

},

pwm:{

name:"PWM",

display:"PWM",

efficiency:"75–85%",

helper:"PWM controllers are suitable for small and economical solar systems.",

advice:"PWM controllers are best suited to smaller systems. Consider MPPT for higher efficiency on larger PV arrays."

}

};

// ==========================================
// BATTERY INFORMATION
// ==========================================

const batteryData = {

lead:{

name:"Lead Acid",

minRate:0.10,

maxRate:0.20

},

agm:{

name:"AGM / Gel",

minRate:0.10,

maxRate:0.20

},

lifepo4:{

name:"LiFePO₄",

minRate:0.20,

maxRate:0.50

},

liion:{

name:"Lithium-ion",

minRate:0.20,

maxRate:0.50

}

};

// ==========================================
// TEMPERATURE FACTORS
// ==========================================

const temperatureFactors = {

25:1.00,

40:1.05,

50:1.10

};
// ==========================================
// CONTROLLER HELPER
// ==========================================

function updateControllerHelper(){

controllerHelper.textContent=

controllerData[
controllerType.value
].helper;

}

updateControllerHelper();

controllerType.addEventListener(

"change",

updateControllerHelper

);

// ==========================================
// CUSTOM VOLTAGE
// ==========================================

function updateVoltageInput(){

if(systemVoltage.value==="custom"){

customVoltageGroup.style.display="block";

}
else{

customVoltageGroup.style.display="none";

}

updateLiveCalculation();

}

systemVoltage.addEventListener(

"change",

updateVoltageInput

);

customVoltage.addEventListener(

"input",

updateLiveCalculation

);

// ==========================================
// INPUT METHOD
// ==========================================

function updateInputMethod(){

if(inputMethod.value==="power"){

powerGroup.style.display="block";

panelGroup.style.display="none";

livePowerCard.style.display="none";

}
else{

powerGroup.style.display="none";

panelGroup.style.display="block";

updateLiveCalculation();

}

}

inputMethod.addEventListener(

"change",

updateInputMethod

);

// ==========================================
// LIVE PV CALCULATION
// ==========================================

function updateLiveCalculation(){

if(inputMethod.value!=="panels"){

livePowerCard.style.display="none";

return;

}

const panels=

Number(panelCount.value);

const panelWatts=

Number(panelPower.value);

let voltage;

if(systemVoltage.value==="custom"){

voltage=
Number(customVoltage.value);

}
else{

voltage=
Number(systemVoltage.value);

}

if(

panels<=0||
panelWatts<=0||
voltage<=0||
isNaN(voltage)

){

livePowerCard.style.display="none";

return;

}

// ------------------------------------------
// LIVE CALCULATIONS
// ------------------------------------------

const totalPower=

panels*
panelWatts;

const chargingCurrent=

totalPower/
voltage;

// ------------------------------------------
// CONTROLLER ESTIMATE
// ------------------------------------------

let estimatedController=">300 A";

for(

let i=0;

i<controllerRatings.length;

i++

){

if(

controllerRatings[i]>=
chargingCurrent

){

estimatedController=

controllerRatings[i]+
" A";

break;

}

}

// ------------------------------------------
// UPDATE LIVE CARD
// ------------------------------------------

livePvPower.textContent=

totalPower.toFixed(0)+
" W";

liveChargingCurrent.textContent=

chargingCurrent.toFixed(1)+
" A";

liveControllerSize.textContent=

estimatedController;

livePowerCard.style.display="block";

}

// ==========================================
// LIVE LISTENERS
// ==========================================

panelCount.addEventListener(

"input",

updateLiveCalculation

);

panelPower.addEventListener(

"input",

updateLiveCalculation

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

doneButton.addEventListener(

"click",

closeResultSheet

);

closeSheet.addEventListener(

"click",

closeResultSheet

);

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
// SYSTEM VOLTAGE
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

// ------------------------------------------
// PV ARRAY POWER
// ------------------------------------------

let totalPvPower;

if(inputMethod.value==="power"){

totalPvPower=
Number(pvPower.value);

}
else{

totalPvPower=

Number(panelCount.value)*
Number(panelPower.value);

}

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

isNaN(totalPvPower)||
totalPvPower<=0

){

showNotifier(

"Enter a valid PV array power."

);

return;

}

if(totalPvPower>100000){

showNotifier(

"PV array power is unrealistically high."

);

return;

}

// ------------------------------------------
// CHARGING CURRENT
// ------------------------------------------

const chargingCurrent=

totalPvPower/
voltage;

// ------------------------------------------
// SAFETY FACTOR
// ------------------------------------------

const safety=

Number(
safetyFactor.value
);

// ------------------------------------------
// TEMPERATURE FACTOR
// ------------------------------------------

const tempFactor=

temperatureFactors[
temperature.value
];

// ------------------------------------------
// DESIGN CURRENT
// ------------------------------------------

const designCurrent=

chargingCurrent*
safety*
tempFactor;

// ------------------------------------------
// SELECT CONTROLLER
// ------------------------------------------

let controllerRating=null;

for(

let i=0;

i<controllerRatings.length;

i++

){

if(

controllerRatings[i]>=
designCurrent

){

controllerRating=

controllerRatings[i];

break;

}

}

if(controllerRating===null){

showNotifier(

"No standard controller rating available."

);

return;

}

// ------------------------------------------
// CONTROLLER UTILIZATION
// ------------------------------------------

const utilization=

(
designCurrent/
controllerRating
)
*
100;

// ------------------------------------------
// AVAILABLE CAPACITY
// ------------------------------------------

const availableCapacity=

100-
utilization;

// ------------------------------------------
// CURRENT MARGIN
// ------------------------------------------

const currentMargin=

controllerRating-
designCurrent;

// ------------------------------------------
// MAXIMUM PV POWER
// ------------------------------------------

const maximumPvPower=

controllerRating*
voltage;

// ------------------------------------------
// REMAINING PV CAPACITY
// ------------------------------------------

let remainingPvPower=

maximumPvPower-
totalPvPower;

if(remainingPvPower<0){

remainingPvPower=0;

}

// ------------------------------------------
// ADDITIONAL PANELS
// ------------------------------------------

let additionalPanels="N/A";

if(

inputMethod.value==="panels"

){

const panelSize=

Number(panelPower.value);

if(panelSize>0){

additionalPanels=

Math.floor(

remainingPvPower/
panelSize

);

}

}

// ------------------------------------------
// CONTROLLER INFORMATION
// ------------------------------------------

const controller=

controllerData[
controllerType.value
];

const battery=

batteryData[
batteryType.value
];
// ==========================================
// DESIGN VERDICT
// ==========================================

let verdict;

if(utilization>=80&&utilization<=95){

verdict="🟢 Excellent Design";

}
else if(utilization>=60){

verdict="🟡 Good Design";

}
else if(utilization>=40){

verdict="🟠 Review Recommended";

}
else{

verdict="🔴 Oversized Design";

}

// ==========================================
// HERO RESULT
// ==========================================

recommendedController.textContent=

controllerRating+
" A "+
controller.display;

designVerdict.textContent=
verdict;

// ==========================================
// ELECTRICAL RESULTS
// ==========================================

pvPowerResult.textContent=

totalPvPower.toFixed(0)+
" W";

chargingCurrentResult.textContent=

chargingCurrent.toFixed(1)+
" A";

safetyFactorResult.textContent=

safety.toFixed(2);

temperatureFactorResult.textContent=

tempFactor.toFixed(2);

designCurrentResult.textContent=

designCurrent.toFixed(1)+
" A";

// ==========================================
// CONTROLLER INFORMATION
// ==========================================

controllerTypeResult.textContent=

controller.display;

efficiencyResult.textContent=

controller.efficiency;

utilizationResult.textContent=

utilization.toFixed(1)+
" %";

marginResult.textContent=

currentMargin.toFixed(1)+
" A ("+
availableCapacity.toFixed(1)+
"% Available)";

// ==========================================
// EXPANSION ANALYSIS
// ==========================================

maxPvResult.textContent=

maximumPvPower.toFixed(0)+
" W";

remainingPvResult.textContent=

remainingPvPower.toFixed(0)+
" W";

if(inputMethod.value==="panels"){

additionalPanelsResult.textContent=

additionalPanels+
" Panel(s)";

}
else{

additionalPanelsResult.textContent=

"N/A";

}
// ==========================================
// BATTERY ANALYSIS
// ==========================================

const batteryAh =
Number(batteryCapacity.value);

let batteryWarning=false;

if(batteryAh>0){

batteryCard.style.display="block";

const recommendedMin=
batteryAh*
battery.minRate;

const recommendedMax=
batteryAh*
battery.maxRate;

batteryResult.textContent=
battery.name+
" ("+
batteryAh.toFixed(0)+
" Ah)";

recommendedChargeResult.textContent=

recommendedMin.toFixed(1)+
" - "+
recommendedMax.toFixed(1)+
" A";

actualChargeResult.textContent=

chargingCurrent.toFixed(1)+
" A";

let batteryStatus="";

if(chargingCurrent<recommendedMin){

batteryStatus=

"⚠ Charging current is below the recommended range.";

batteryWarning=true;

}
else if(chargingCurrent>recommendedMax){

batteryStatus=

"⚠ Charging current exceeds the recommended range.";

batteryWarning=true;

}
else{

batteryStatus=

"🟢 Charging current is within the recommended range.";

}

batteryStatusResult.textContent=
batteryStatus;

}
else{

batteryCard.style.display="none";

}

// ==========================================
// CONTROLLER ADVICE
// ==========================================

controllerAdvice.textContent=

controller.advice;

// ==========================================
// WARNINGS
// ==========================================

let warningList=[];

// Controller near limit

if(utilization>95){

warningList.push(

"⚠ Controller utilization exceeds 95%. Select the next higher controller rating."

);

}

// Controller oversized

if(utilization<40){

warningList.push(

"⚠ Controller is significantly oversized unless future expansion is planned."

);

}

// Limited expansion

if(remainingPvPower===0){

warningList.push(

"⚠ No remaining PV expansion capacity."

);

}

if(

inputMethod.value==="panels"&&
additionalPanels===0

){

warningList.push(

"⚠ No additional solar panels can be added without upgrading the controller."

);

}

// PWM recommendation

if(

controllerType.value==="pwm"&&
totalPvPower>500

){

warningList.push(

"ℹ MPPT controllers are generally recommended for PV arrays above 500 W."

);

}

// Battery warning

if(batteryWarning){

warningList.push(

"⚠ Battery charging current should be reviewed."

);

}

// Default

if(warningList.length===0){

warningList.push(

"🟢 No engineering issues detected."

);

}

warningsResult.innerHTML=

warningList.join("<br><br>");

// ==========================================
// FINAL DESIGN VERDICT
// =========================================

// ==========================================
// FINAL DESIGN VERDICT
// ==========================================

// The verdict evaluates only the controller sizing.
// Battery-related issues are shown separately
// in the Warnings section.

if(utilization>95){

designVerdict.textContent=

"🔴 Redesign Required";

}
else if(utilization>=80){

designVerdict.textContent=

"🟢 Excellent Design";

}
else if(utilization>=60){

designVerdict.textContent=

"🟡 Good Design";

}
else if(utilization>=40){

designVerdict.textContent=

"🟠 Review Recommended";

}
else{

designVerdict.textContent=

"🔴 Oversized Design";

}

// ==========================================
// ENGINEERING SUMMARY
// ==========================================

engineeringSummary.textContent=

"A "+

controllerRating+

" A "+

controller.display+

" charge controller is recommended for a "+

totalPvPower.toFixed(0)+

" W photovoltaic array operating at "+

voltage+

" V. The calculated charging current is "+

chargingCurrent.toFixed(1)+

" A and the design current after applying the selected safety factor and temperature correction is "+

designCurrent.toFixed(1)+

" A. The controller will operate at "+

utilization.toFixed(1)+

"% utilization and supports approximately "+

remainingPvPower.toFixed(0)+

" W of additional photovoltaic capacity.";

// ==========================================
// SHOW RESULTS
// ==========================================

openSheet();

});
// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener(

"click",

function(){

controllerType.value="mppt";

systemVoltage.value="24";

customVoltage.value="";

inputMethod.value="power";

pvPower.value="";

panelCount.value="";

panelPower.value="";

batteryCapacity.value="";

batteryType.value="lead";

safetyFactor.value="1.25";

temperature.value="40";

updateControllerHelper();

updateVoltageInput();

updateInputMethod();

livePowerCard.style.display="none";

batteryCard.style.display="none";

resultSheet.classList.remove("show");

showNotifier(

"Calculator has been reset."

);

}

);

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener(

"click",

function(){

const resultText=

"Charge Controller Size Calculator\n\n"+

"Recommended Controller: "+

recommendedController.textContent+

"\n"+

"Design Verdict: "+

designVerdict.textContent+

"\n\n"+

"PV Array Power: "+

pvPowerResult.textContent+

"\n"+

"Charging Current: "+

chargingCurrentResult.textContent+

"\n"+

"Design Current: "+

designCurrentResult.textContent+

"\n"+

"Controller Utilization: "+

utilizationResult.textContent+

"\n"+

"Current Margin: "+

marginResult.textContent+

"\n"+

"Maximum PV Capacity: "+

maxPvResult.textContent+

"\n"+

"Remaining PV Capacity: "+

remainingPvResult.textContent+

"\n"+

"Additional Panels: "+

additionalPanelsResult.textContent+

"\n\n"+

"Engineering Summary\n"+

engineeringSummary.textContent;

if(

navigator.share

){

navigator.share({

title:

"Charge Controller Size Calculator",

text:

resultText

}).catch(function(){});

}
else{

navigator.clipboard.writeText(

resultText

).then(function(){

showNotifier(

"Results copied to clipboard."

);

});

}

});

// ==========================================
// INITIALIZE
// ==========================================

batteryCard.style.display="none";

livePowerCard.style.display="none";

closeResultSheet();

updateControllerHelper();

updateVoltageInput();

updateInputMethod();