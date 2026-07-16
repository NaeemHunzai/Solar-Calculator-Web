// ==========================================
// BATTERY CHARGING TIME CALCULATOR
// ==========================================

// ==========================================
// BATTERY INFORMATION
// ==========================================

const batteryType =
document.getElementById("batteryType");

const batteryVoltage =
document.getElementById("batteryVoltage");

const customVoltageGroup =
document.getElementById("customVoltageGroup");

const customVoltage =
document.getElementById("customVoltage");

const batteryCapacity =
document.getElementById("batteryCapacity");

const currentSOC =
document.getElementById("currentSOC");

const targetSOC =
document.getElementById("targetSOC");

// ==========================================
// CHARGING PARAMETERS
// ==========================================

const chargingSource =
document.getElementById("chargingSource");

const chargingCurrent =
document.getElementById("chargingCurrent");

const chargingEfficiency =
document.getElementById("chargingEfficiency");

const batteryTemperature =
document.getElementById("batteryTemperature");

const includeAbsorption =
document.getElementById("includeAbsorption");

// ==========================================
// LIVE INFORMATION
// ==========================================

const liveInfoCard =
document.getElementById("liveInfoCard");

const liveBatteryEnergy =
document.getElementById("liveBatteryEnergy");

const liveEnergyRequired =
document.getElementById("liveEnergyRequired");

const liveCRate =
document.getElementById("liveCRate");

const liveChargingPower =
document.getElementById("liveChargingPower");

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

// Hero Result

const heroLabel =
document.getElementById("heroLabel");

const heroResult =
document.getElementById("heroResult");

// Results

const batteryEnergyResult =
document.getElementById("batteryEnergyResult");

const energyRequiredResult =
document.getElementById("energyRequiredResult");

const chargingPowerResult =
document.getElementById("chargingPowerResult");

const chargingCurrentResult =
document.getElementById("chargingCurrentResult");

const chargingEfficiencyResult =
document.getElementById("chargingEfficiencyResult");

const chargingRateResult =
document.getElementById("chargingRateResult");

const chargingSpeedResult =
document.getElementById("chargingSpeedResult");

const chargingStageResult =
document.getElementById("chargingStageResult");

const finishSocResult =
document.getElementById("finishSocResult");

// Analysis

const batteryRecommendation =
document.getElementById("batteryRecommendation");

const chargingAnalysis =
document.getElementById("chargingAnalysis");

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
// BATTERY DATABASE
// ==========================================

const batteryDatabase = {

leadacid:{

name:"Lead Acid Flooded",
efficiency:80,
absorptionFactor:1.20,
recommendedMin:0.10,
recommendedMax:0.20,
stage:"Bulk → Absorption → Float"

},

agm:{

name:"AGM",
efficiency:90,
absorptionFactor:1.15,
recommendedMin:0.10,
recommendedMax:0.30,
stage:"Bulk → Absorption → Float"

},

gel:{

name:"Gel",
efficiency:90,
absorptionFactor:1.15,
recommendedMin:0.10,
recommendedMax:0.20,
stage:"Bulk → Absorption → Float"

},

lifepo4:{

name:"Lithium LiFePO₄",
efficiency:98,
absorptionFactor:1.05,
recommendedMin:0.20,
recommendedMax:0.50,
stage:"CC → CV"

},

liion:{

name:"Lithium-ion",
efficiency:95,
absorptionFactor:1.05,
recommendedMin:0.30,
recommendedMax:0.70,
stage:"CC → CV"

}

};
// ==========================================
// BATTERY TYPE
// ==========================================

function updateBatterySettings(){

const battery =
batteryDatabase[batteryType.value];

chargingEfficiency.value =
battery.efficiency;

updateLiveInformation();

}

batteryType.addEventListener(

"change",

updateBatterySettings

);

// ==========================================
// BATTERY VOLTAGE
// ==========================================

function updateVoltageInput(){

if(batteryVoltage.value==="custom"){

customVoltageGroup.style.display="block";

}
else{

customVoltageGroup.style.display="none";

}

updateLiveInformation();

}

batteryVoltage.addEventListener(

"change",

updateVoltageInput

);

// ==========================================
// LIVE INFORMATION
// ==========================================

function updateLiveInformation(){

let voltage=0;

if(batteryVoltage.value==="custom"){

voltage=
Number(customVoltage.value);

}
else{

voltage=
Number(batteryVoltage.value);

}

const capacity=
Number(batteryCapacity.value);

const soc=
Number(currentSOC.value);

const current=
Number(chargingCurrent.value);

const efficiency=
Number(chargingEfficiency.value);

if(

voltage<=0 ||

capacity<=0 ||

soc<0 ||

soc>100 ||

current<=0 ||

efficiency<=0

){

liveInfoCard.style.display="none";

return;

}

const batteryEnergy=

(voltage*capacity)/1000;

const energyRequired=

batteryEnergy*
((100-soc)/100);

const chargingPower=

voltage*current;

const cRate=

current/capacity;

// Battery Energy

liveBatteryEnergy.textContent=

batteryEnergy.toFixed(2)+
" kWh";

// Energy Required

liveEnergyRequired.textContent=

energyRequired.toFixed(2)+
" kWh";

// Charging Power

liveChargingPower.textContent=

chargingPower.toFixed(0)+
" W";

// C-Rate

liveCRate.textContent=

cRate.toFixed(2)+
"C";

liveInfoCard.style.display="block";

}

// ==========================================
// LIVE UPDATE LISTENERS
// ==========================================

[

batteryCapacity,
currentSOC,
chargingCurrent,
customVoltage

].forEach(function(input){

input.addEventListener(

"input",

updateLiveInformation

);

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

function openResultSheet(){

resultSheet.classList.add("show");

const content=

resultSheet.querySelector(

".result-sheet-content"

);

if(content){

content.scrollTop=0;

}

}

function closeResultSheet(){

resultSheet.classList.remove("show");

}

closeSheet.addEventListener(

"click",

closeResultSheet

);

doneButton.addEventListener(

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
// INITIALIZATION
// ==========================================

updateBatterySettings();

updateVoltageInput();

liveInfoCard.style.display="none";
// ==========================================
// RESET CALCULATOR
// ==========================================

resetBtn.addEventListener("click",function(){

batteryType.value="leadacid";

batteryVoltage.value="12";

customVoltage.value="";

customVoltageGroup.style.display="none";

batteryCapacity.value="";

currentSOC.value="";

targetSOC.value="";

chargingSource.value="solar";

chargingCurrent.value="";

batteryTemperature.value="25";

includeAbsorption.value="yes";

updateBatterySettings();

liveInfoCard.style.display="none";

resultSheet.classList.remove("show");

showNotifier("Calculator reset successfully.");

});

// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

// ------------------------------------------
// BATTERY DATA
// ------------------------------------------

const battery =
batteryDatabase[batteryType.value];

// ------------------------------------------
// VOLTAGE
// ------------------------------------------

let voltage=0;

if(batteryVoltage.value==="custom"){

voltage=
Number(customVoltage.value);

}
else{

voltage=
Number(batteryVoltage.value);

}

// ------------------------------------------
// USER INPUTS
// ------------------------------------------

const capacity=
Number(batteryCapacity.value);

const startSOC=
Number(currentSOC.value);

const endSOC=
Number(targetSOC.value);

const current=
Number(chargingCurrent.value);

const efficiency=
Number(chargingEfficiency.value);

const temperature=
Number(batteryTemperature.value);

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(voltage<=0){

showNotifier("Enter a valid battery voltage.");

return;

}

if(capacity<=0){

showNotifier("Enter battery capacity.");

return;

}

if(startSOC<0||startSOC>100){

showNotifier("Current SOC must be between 0 and 100%.");

return;

}

if(endSOC<=0||endSOC>100){

showNotifier("Target SOC must be between 1 and 100%.");

return;

}

if(endSOC<=startSOC){

showNotifier("Target SOC must be greater than current SOC.");

return;

}

if(current<=0){

showNotifier("Enter charging current.");

return;

}

// ------------------------------------------
// CALCULATIONS
// ------------------------------------------

const socDifference=

endSOC-startSOC;

const requiredAh=

capacity*
(socDifference/100);

const batteryEnergy=

(voltage*capacity)/1000;

const energyRequired=

(voltage*requiredAh)/1000;

const chargingPower=

voltage*current;

const cRate=

current/capacity;

// ------------------------------------------
// CHARGING TIME
// ------------------------------------------

let chargingTime=

requiredAh/

(current*(efficiency/100));

if(includeAbsorption.value==="yes"){

chargingTime*=battery.absorptionFactor;

}

// ------------------------------------------
// HOURS / MINUTES
// ------------------------------------------

const hours=

Math.floor(chargingTime);

const minutes=

Math.round(

(chargingTime-hours)*60

);
// ==========================================
// HERO RESULT
// ==========================================

heroLabel.textContent =
"Estimated Charging Time";

heroResult.textContent =
hours+
" hr "+
minutes+
" min";

// ==========================================
// RESULT VALUES
// ==========================================

batteryEnergyResult.textContent =
batteryEnergy.toFixed(2)+" kWh";

energyRequiredResult.textContent =
energyRequired.toFixed(2)+" kWh";

chargingPowerResult.textContent =
chargingPower.toFixed(0)+" W";

chargingCurrentResult.textContent =
current.toFixed(2)+" A";

chargingEfficiencyResult.textContent =
efficiency.toFixed(0)+" %";

chargingRateResult.textContent =
cRate.toFixed(2)+" C";

// ==========================================
// CHARGING SPEED
// ==========================================

let chargingSpeed="";
let recommendation="";

if(cRate<0.10){

chargingSpeed="🟢 Slow";

recommendation=
"Charging rate is gentle and provides maximum battery life.";

}
else if(cRate<=battery.recommendedMax){

chargingSpeed="🟢 Normal";

recommendation=
"Charging current is within the recommended range for "+
battery.name+
" batteries.";

}
else if(cRate<=1){

chargingSpeed="🟡 Fast";

recommendation=
"Fast charging is acceptable but frequent use may reduce battery life.";

}
else{

chargingSpeed="🔴 Very Fast";

recommendation=
"Charging current is excessively high and may damage the battery or reduce its service life.";

}

chargingSpeedResult.textContent=
chargingSpeed;

// ==========================================
// CHARGING STAGE
// ==========================================

chargingStageResult.textContent=
battery.stage;

// ==========================================
// FINISH SOC
// ==========================================

finishSocResult.textContent=
endSOC.toFixed(0)+" %";

// ==========================================
// BATTERY HEALTH
// ==========================================

batteryRecommendation.textContent=
recommendation;

// ==========================================
// CHARGING ANALYSIS
// ==========================================

chargingAnalysis.textContent=

"A "+

capacity.toFixed(0)+

" Ah "+

battery.name+

" battery will require approximately "+

hours+

" hour(s) "+

minutes+

" minute(s) to charge from "+

startSOC.toFixed(0)+

"% to "+

endSOC.toFixed(0)+

"% using a "+

current.toFixed(1)+

" A charging source.";

// ==========================================
// ENGINEERING SUMMARY
// ==========================================

engineeringSummary.textContent=

"The battery stores "+

batteryEnergy.toFixed(2)+

" kWh of energy. Approximately "+

energyRequired.toFixed(2)+

" kWh must be supplied to reach the target state of charge. The charging rate is "+

cRate.toFixed(2)+

"C with an estimated charging power of "+

chargingPower.toFixed(0)+

" W. Battery chemistry, charging efficiency and charging stages have been considered in the charging time estimate.";

// ==========================================
// SHOW RESULT
// ==========================================

openResultSheet();

});
// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click", function () {

const report =

`Battery Charging Time Calculator

Estimated Charging Time:
${heroResult.textContent}

Battery Type:
${batteryDatabase[batteryType.value].name}

Battery Voltage:
${batteryVoltage.value==="custom" ? customVoltage.value+" V" : batteryVoltage.value+" V"}

Battery Capacity:
${batteryCapacity.value} Ah

Current SOC:
${currentSOC.value} %

Target SOC:
${targetSOC.value} %

Charging Current:
${chargingCurrentResult.textContent}

Charging Efficiency:
${chargingEfficiencyResult.textContent}

Battery Energy:
${batteryEnergyResult.textContent}

Energy Required:
${energyRequiredResult.textContent}

Charging Power:
${chargingPowerResult.textContent}

Charging Rate:
${chargingRateResult.textContent}

Charging Speed:
${chargingSpeedResult.textContent}

Charging Stage:
${chargingStageResult.textContent}

Battery Health Recommendation:
${batteryRecommendation.textContent}

Charging Analysis:
${chargingAnalysis.textContent}

Engineering Summary:
${engineeringSummary.textContent}

Generated by Solar Toolkit`;

navigator.clipboard.writeText(report)

.then(function(){

showNotifier(

"Results copied successfully."

);

})

.catch(function(){

showNotifier(

"Unable to copy results."

);

});

});

// ==========================================
// RESULT SHEET CONTROLS
// ==========================================

closeSheet.addEventListener(

"click",

closeResultSheet

);

doneButton.addEventListener(

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
// LIVE UPDATE LISTENERS
// ==========================================

[

batteryType,
batteryVoltage,
batteryCapacity,
currentSOC,
chargingCurrent,
customVoltage

].forEach(function(input){

input.addEventListener(

"input",

updateLiveInformation

);

input.addEventListener(

"change",

updateLiveInformation

);

});

// ==========================================
// INITIALIZE
// ==========================================

updateBatterySettings();

updateVoltageInput();

updateLiveInformation();

liveInfoCard.style.display="none";