// ==========================================
// GENERATOR SIZE CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const mode =
document.getElementById("mode");

const phase =
document.getElementById("phase");

const load =
document.getElementById("load");

const loadUnit =
document.getElementById("loadUnit");

const loadType =
document.getElementById("loadType");

const powerFactor =
document.getElementById("powerFactor");

const voltage =
document.getElementById("voltage");

const frequency =
document.getElementById("frequency");

const startingMultiplier =
document.getElementById("startingMultiplier");

const diversityFactor =
document.getElementById("diversityFactor");

const simultaneousFactor =
document.getElementById("simultaneousFactor");

const altitude =
document.getElementById("altitude");

const temperature =
document.getElementById("temperature");

const efficiency =
document.getElementById("efficiency");

// ==========================================
// PROFESSIONAL MODE
// ==========================================

const professionalFields =
document.getElementById("professionalFields");

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

const generatorResult =
document.getElementById("generatorResult");

const loadResult =
document.getElementById("loadResult");

const apparentPowerResult =
document.getElementById("apparentPowerResult");

const startingResult =
document.getElementById("startingResult");

const recommendedResult =
document.getElementById("recommendedResult");

const currentResult =
document.getElementById("currentResult");

const loadingResult =
document.getElementById("loadingResult");

const fuelResult =
document.getElementById("fuelResult");

const voltageResult =
document.getElementById("voltageResult");

const frequencyResult =
document.getElementById("frequencyResult");

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
// MODE
// ==========================================

function updateMode(){

    if(mode.value==="professional"){

        professionalFields.style.display="block";

    }

    else{

        professionalFields.style.display="none";

    }

}

mode.addEventListener(

"change",

updateMode

);

updateMode();

// ==========================================
// PHASE
// ==========================================

function updatePhase(){

    if(phase.value==="single"){

        voltage.value=230;

    }

    else{

        voltage.value=400;

    }

}

phase.addEventListener(

"change",

updatePhase

);

updatePhase();
// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

// ------------------------------------------
// INPUT VALUES
// ------------------------------------------

let loadKW =
Number(load.value);

const pf =
Number(powerFactor.value);

const V =
Number(voltage.value);

const Hz =
Number(frequency.value);

// Convert W → kW

if(loadUnit.value==="1"){

    loadKW =
    loadKW/1000;

}

// ------------------------------------------
// VALIDATION
// ------------------------------------------

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(loadKW) || loadKW <= 0){

    showNotifier("Enter a valid connected load.");

    load.focus();

    return;

}

if(loadKW > 10000){

    showNotifier("Maximum supported connected load is 10 MW (10,000 kW).");

    load.focus();

    return;

}

if(isNaN(pf) || pf<0.5 || pf>1){

    showNotifier("Power Factor must be between 0.5 and 1.0.");

    powerFactor.focus();

    return;

}

if(isNaN(V) || V<=0){

    showNotifier("Enter a valid system voltage.");

    voltage.focus();

    return;

}

// ------------------------------------------
// LOAD TYPE FACTOR
// ------------------------------------------

let sizingFactor = 1;

switch(loadType.value){

case "resistive":

    sizingFactor=1.10;

break;

case "residential":

    sizingFactor=1.20;

break;

case "commercial":

    sizingFactor=1.25;

break;

case "industrial":

    sizingFactor=1.30;

break;

case "motor":

    sizingFactor=1.50;

break;

}

// ------------------------------------------
// PROFESSIONAL MODE
// ------------------------------------------

let startMultiplier=1;

let diversity=1;

let simultaneous=1;

let altitudeFactor=1;

let temperatureFactor=1;

let engineEfficiency=1;

if(mode.value==="professional"){

startMultiplier=
Number(startingMultiplier.value);

diversity=
Number(diversityFactor.value);

simultaneous=
Number(simultaneousFactor.value)/100;

const alt=
Number(altitude.value);

const temp=
Number(temperature.value);

engineEfficiency=
Number(efficiency.value)/100;

// Validation

if(startMultiplier<1 || startMultiplier>8){

showNotifier("Starting Current Multiplier must be between 1 and 8.");

startingMultiplier.focus();

return;

}

if(diversity<0.3 || diversity>1){

showNotifier("Diversity Factor must be between 0.3 and 1.");

diversityFactor.focus();

return;

}

if(simultaneous<0.1 || simultaneous>1){

showNotifier("Simultaneous Load Factor must be between 10% and 100%.");

simultaneousFactor.focus();

return;

}

if(alt<0 || alt>5000){

showNotifier("Altitude must be between 0 and 5000 m.");

altitude.focus();

return;

}

if(temp<-10 || temp>60){

showNotifier("Temperature must be between -10°C and 60°C.");

temperature.focus();

return;

}

if(engineEfficiency<0.80 || engineEfficiency>0.98){

showNotifier("Diesel Engine Efficiency must be between 80% and 98%.");

efficiency.focus();

return;

}

// Altitude Derating

if(alt>1000){

altitudeFactor=
1-((alt-1000)/1000)*0.03;

}

// Temperature Derating

if(temp>40){

temperatureFactor=
1-((temp-40)*0.005);

}

}

// ------------------------------------------
// CALCULATIONS
// ------------------------------------------

const adjustedLoad=

loadKW*
simultaneous/
diversity;

const apparentPower=

(adjustedLoad/pf)*
sizingFactor;

const startingKVA=

apparentPower*
startMultiplier;

let requiredGenerator=

startingKVA;

requiredGenerator=
requiredGenerator/
altitudeFactor;

requiredGenerator=
requiredGenerator/
temperatureFactor;

requiredGenerator=
requiredGenerator/
engineEfficiency;

// ------------------------------------------
// STANDARD GENERATORS
// ------------------------------------------
const standardGenerators=[

5,
7.5,
10,
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
400,
500,
625,
750,
800,
1000,
1250,
1500,
1600,
1750,
2000,
2250,
2500,
2750,
3000,
3500,
4000,
4500,
5000,
6000,
7000,
8000,
9000,
10000,
12500

];

const maxGenerator =
standardGenerators[standardGenerators.length-1];

if(requiredGenerator > maxGenerator){

    showNotifier(
    "Required generator size exceeds the maximum supported rating."
    );

    return;

}

let recommendedGenerator=
standardGenerators[standardGenerators.length-1];



for(const rating of standardGenerators){

if(rating>=requiredGenerator){

recommendedGenerator=rating;

break;

}

}

// ------------------------------------------
// CURRENT
// ------------------------------------------

let current;

if(phase.value==="single"){

current=

(apparentPower*1000)/V;

}

else{

current=

(apparentPower*1000)/(Math.sqrt(3)*V);

}
// ------------------------------------------
// GENERATOR LOADING
// ------------------------------------------

const loading =

(apparentPower/recommendedGenerator)*100;

// ------------------------------------------
// ESTIMATED FUEL CONSUMPTION
// ------------------------------------------

// Approximation:
// Diesel Generator ≈ 0.24 L/kWh

const fuelConsumption =

adjustedLoad*0.24;

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

let summary="";

if(loading<40){

summary=
"The selected generator is lightly loaded. Consider a smaller standard generator if future load expansion is not expected.";

}

else if(loading<=80){

summary=
"The selected generator operates within the recommended loading range and provides adequate reserve capacity.";

}

else{

summary=
"The generator operates at a high loading level. Selecting the next higher standard generator is recommended for continuous operation.";

}

if(mode.value==="professional"){

summary +=
" Professional corrections including diversity, simultaneous load, starting current, altitude, temperature and engine efficiency were applied.";

}

// ------------------------------------------
// RESULT SHEET
// ------------------------------------------

generatorResult.textContent=
recommendedGenerator.toFixed(0)+" kVA";

loadResult.textContent=
adjustedLoad.toFixed(2)+" kW";

apparentPowerResult.textContent=
apparentPower.toFixed(2)+" kVA";

startingResult.textContent=
startingKVA.toFixed(2)+" kVA";

recommendedResult.textContent=
recommendedGenerator.toFixed(0)+" kVA";

currentResult.textContent=
current.toFixed(2)+" A";

loadingResult.textContent=
loading.toFixed(1)+" %";

fuelResult.textContent=
fuelConsumption.toFixed(2)+" L/hr";

voltageResult.textContent=
V.toFixed(0)+" V";

frequencyResult.textContent=
Hz+" Hz";

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

mode.value="simple";

phase.value="three";

load.value="";

loadUnit.value="1000";

loadType.value="commercial";

powerFactor.value="0.80";

voltage.value="400";

frequency.value="50";

// Professional

startingMultiplier.value="1";

diversityFactor.value="1";

simultaneousFactor.value="100";

altitude.value="0";

temperature.value="25";

efficiency.value="90";

updateMode();

updatePhase();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

const text=

`Generator Size Calculator

Recommended Generator
${generatorResult.textContent}

Connected Load
${loadResult.textContent}

Apparent Power
${apparentPowerResult.textContent}

Starting kVA
${startingResult.textContent}

Generator Current
${currentResult.textContent}

Generator Loading
${loadingResult.textContent}

Estimated Fuel Consumption
${fuelResult.textContent}

Voltage
${voltageResult.textContent}

Frequency
${frequencyResult.textContent}

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