// ==========================================
// SOLAR STRING SIZING CALCULATOR
// ==========================================

// ==========================================
// PANEL INFORMATION
// ==========================================

const panelSource =
document.getElementById("panelSource");

const manufacturer =
document.getElementById("manufacturer");

const panelModel =
document.getElementById("panelModel");

const manufacturerGroup =
document.getElementById("manufacturerGroup");

const modelGroup =
document.getElementById("modelGroup");

// ==========================================
// PANEL SPECIFICATIONS
// ==========================================

const panelPower =
document.getElementById("panelPower");

const panelVoc =
document.getElementById("panelVoc");

const panelVmp =
document.getElementById("panelVmp");

const panelIsc =
document.getElementById("panelIsc");

const panelImp =
document.getElementById("panelImp");

const tempCoefficient =
document.getElementById("tempCoefficient");

// ==========================================
// INVERTER SPECIFICATIONS
// ==========================================

const maxDcVoltage =
document.getElementById("maxDcVoltage");

const mpptMinVoltage =
document.getElementById("mpptMinVoltage");

const mpptMaxVoltage =
document.getElementById("mpptMaxVoltage");

const maxMpptCurrent =
document.getElementById("maxMpptCurrent");

const maxShortCircuitCurrent =
document.getElementById("maxShortCircuitCurrent");

const mpptCount =
document.getElementById("mpptCount");

// ==========================================
// SITE CONDITIONS
// ==========================================

const lowestTemperature =
document.getElementById("lowestTemperature");

const highestTemperature =
document.getElementById("highestTemperature");

// ==========================================
// ARRAY CONFIGURATION
// ==========================================

const seriesPanels =
document.getElementById("seriesPanels");

const parallelStrings =
document.getElementById("parallelStrings");

// ==========================================
// LIVE INFORMATION
// ==========================================

const liveInfoCard =
document.getElementById("liveInfoCard");

const liveTotalPanels =
document.getElementById("liveTotalPanels");

const liveTotalPower =
document.getElementById("liveTotalPower");

const liveStringVoc =
document.getElementById("liveStringVoc");

const liveStringVmp =
document.getElementById("liveStringVmp");

const liveArrayCurrent =
document.getElementById("liveArrayCurrent");

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

const totalPanelsResult =
document.getElementById("totalPanelsResult");

const totalPowerResult =
document.getElementById("totalPowerResult");

const stringVocResult =
document.getElementById("stringVocResult");

const correctedVocResult =
document.getElementById("correctedVocResult");

const stringVmpResult =
document.getElementById("stringVmpResult");

const arrayCurrentResult =
document.getElementById("arrayCurrentResult");

const arrayIscResult =
document.getElementById("arrayIscResult");

const dcVoltageCheck =
document.getElementById("dcVoltageCheck");

const mpptVoltageCheck =
document.getElementById("mpptVoltageCheck");

const currentCheck =
document.getElementById("currentCheck");

const iscCheck =
document.getElementById("iscCheck");

const voltageMarginResult =
document.getElementById("voltageMarginResult");

const mpptMarginResult =
document.getElementById("mpptMarginResult");

const currentMarginResult =
document.getElementById("currentMarginResult");

const iscMarginResult =
document.getElementById("iscMarginResult");

const recommendedSeriesResult =
document.getElementById("recommendedSeriesResult");

const enteredConfigurationResult =
document.getElementById("enteredConfigurationResult");

// Engineering Analysis

const configurationReview =
document.getElementById("configurationReview");

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
// PANEL DATABASE
// ==========================================

const panelDatabase = {

longi:{

"LR5-72HTH-550M":{
power:550,
voc:49.50,
vmp:41.80,
isc:13.90,
imp:13.16,
tempCoeff:-0.29
}

},

jasolar:{

"JAM72S30-550":{
power:550,
voc:49.45,
vmp:41.65,
isc:13.95,
imp:13.21,
tempCoeff:-0.29
}

},

jinko:{

"JKM550M-72HL4":{
power:550,
voc:49.60,
vmp:41.75,
isc:13.94,
imp:13.18,
tempCoeff:-0.29
}

},

trina:{

"TSM-550DE18M":{
power:550,
voc:49.30,
vmp:41.40,
isc:13.88,
imp:13.29,
tempCoeff:-0.29
}

},

canadian:{

"CS6W-550MS":{
power:550,
voc:49.40,
vmp:41.60,
isc:13.91,
imp:13.22,
tempCoeff:-0.29
}

},

risen:{

"RSM144-550M":{
power:550,
voc:49.50,
vmp:41.70,
isc:13.93,
imp:13.19,
tempCoeff:-0.29
}

},

astronergy:{

"CHSM72M-550":{
power:550,
voc:49.48,
vmp:41.68,
isc:13.90,
imp:13.20,
tempCoeff:-0.29
}

},

twsolar:{

"TWMNH-550":{
power:550,
voc:49.42,
vmp:41.63,
isc:13.92,
imp:13.21,
tempCoeff:-0.29
}

},

qcells:{

"Q.PEAK DUO XL 550":{
power:550,
voc:49.55,
vmp:41.85,
isc:13.89,
imp:13.15,
tempCoeff:-0.29
}

},

rec:{

"REC550AA":{
power:550,
voc:49.47,
vmp:41.72,
isc:13.91,
imp:13.18,
tempCoeff:-0.29
}

}

};

// ==========================================
// PANEL SOURCE
// ==========================================

function updatePanelSource() {

    const useDatabase = panelSource.value === "database";

    manufacturerGroup.style.display = useDatabase ? "block" : "none";
    modelGroup.style.display = useDatabase ? "block" : "none";

}

panelSource.addEventListener("change", updatePanelSource);

// ==========================================
// LOAD PANEL MODELS
// ==========================================

function loadModels() {

    panelModel.innerHTML =
        '<option value="">Select Model</option>';

    const brand = manufacturer.value;

    if (!brand || !panelDatabase[brand]) return;

    Object.keys(panelDatabase[brand]).forEach(model => {

        const option = document.createElement("option");

        option.value = model;
        option.textContent = model;

        panelModel.appendChild(option);

    });

}

manufacturer.addEventListener("change", loadModels);

// ==========================================
// LOAD PANEL DATA
// ==========================================

function loadPanelData() {

    const brand = manufacturer.value;
    const model = panelModel.value;

    if (!brand || !model) return;

    const panel = panelDatabase[brand][model];

    panelPower.value = panel.power;
    panelVoc.value = panel.voc;
    panelVmp.value = panel.vmp;
    panelIsc.value = panel.isc;
    panelImp.value = panel.imp;
    tempCoefficient.value = panel.tempCoeff;

    updateLiveInformation();

}

panelModel.addEventListener("change", loadPanelData);

// ==========================================
// LIVE INFORMATION
// ==========================================

function updateLiveInformation() {

    const series = Number(seriesPanels.value);
    const parallel = Number(parallelStrings.value);

    const power = Number(panelPower.value);
    const voc = Number(panelVoc.value);
    const vmp = Number(panelVmp.value);
    const imp = Number(panelImp.value);

    if (
        series <= 0 ||
        parallel <= 0 ||
        power <= 0 ||
        voc <= 0 ||
        vmp <= 0 ||
        imp <= 0
    ) {

        liveInfoCard.style.display = "none";
        return;

    }

    const totalPanels = series * parallel;
    const totalPower = totalPanels * power;

    const stringVoc = series * voc;
    const stringVmp = series * vmp;
    const arrayCurrent = parallel * imp;

    liveTotalPanels.textContent = totalPanels;

    liveTotalPower.textContent =
        totalPower.toFixed(0) + " W";

    liveStringVoc.textContent =
        stringVoc.toFixed(1) + " V";

    liveStringVmp.textContent =
        stringVmp.toFixed(1) + " V";

    liveArrayCurrent.textContent =
        arrayCurrent.toFixed(2) + " A";

    liveInfoCard.style.display = "block";

}

// ==========================================
// LIVE UPDATE LISTENERS
// ==========================================

[
panelPower,
panelVoc,
panelVmp,
panelImp,
seriesPanels,
parallelStrings

].forEach(function(element){

element.addEventListener(

"input",

updateLiveInformation

);

});

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

function openResultSheet(){

resultSheet.classList.add("show");

const content =

resultSheet.querySelector(

".result-sheet-content"

);

if(content){

content.scrollTop = 0;

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
// RESET
// ==========================================

resetBtn.addEventListener(

"click",

function(){

document.querySelector("form")?.reset();

panelModel.innerHTML =
'<option value="">Select Model</option>';

updatePanelSource();

liveInfoCard.style.display="none";

resultSheet.classList.remove("show");

showNotifier("Calculator reset.");

}

);

// ==========================================
// INITIALIZE
// ==========================================

updatePanelSource();

liveInfoCard.style.display="none";
// ==========================================
// RESET CALCULATOR
// ==========================================

resetBtn.addEventListener("click", function () {

panelSource.value="database";

manufacturer.value="";
panelModel.innerHTML='<option value="">Select Model</option>';

[
panelPower,
panelVoc,
panelVmp,
panelIsc,
panelImp,
tempCoefficient,
maxDcVoltage,
mpptMinVoltage,
mpptMaxVoltage,
maxMpptCurrent,
maxShortCircuitCurrent,
lowestTemperature,
highestTemperature,
seriesPanels,
parallelStrings

].forEach(function(input){

input.value="";

});

mpptCount.value="2";

updatePanelSource();

liveInfoCard.style.display="none";

resultSheet.classList.remove("show");

showNotifier("Calculator reset successfully.");

});

// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

// ------------------------------------------
// READ INPUTS
// ------------------------------------------

const power=Number(panelPower.value);

const voc=Number(panelVoc.value);

const vmp=Number(panelVmp.value);

const isc=Number(panelIsc.value);

const imp=Number(panelImp.value);

const tempCoeff=Number(tempCoefficient.value);

const maxDc=Number(maxDcVoltage.value);

const mpptMin=Number(mpptMinVoltage.value);

const mpptMax=Number(mpptMaxVoltage.value);

const maxCurrent=Number(maxMpptCurrent.value);

const maxIsc=Number(maxShortCircuitCurrent.value);

const lowestTemp=Number(lowestTemperature.value);

const highestTemp=Number(highestTemperature.value);

const series=Number(seriesPanels.value);

const parallel=Number(parallelStrings.value);

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(power<=0){

showNotifier("Enter a valid panel power.");

return;

}

if(voc<=0){

showNotifier("Enter a valid Voc.");

return;

}

if(vmp<=0){

showNotifier("Enter a valid Vmp.");

return;

}

if(isc<=0){

showNotifier("Enter a valid Isc.");

return;

}

if(imp<=0){

showNotifier("Enter a valid Imp.");

return;

}

if(maxDc<=0){

showNotifier("Enter maximum DC voltage.");

return;

}

if(mpptMin<=0||mpptMax<=0){

showNotifier("Enter MPPT voltage range.");

return;

}

if(mpptMin>=mpptMax){

showNotifier("Invalid MPPT voltage range.");

return;

}

if(maxCurrent<=0){

showNotifier("Enter maximum MPPT current.");

return;

}

if(maxIsc<=0){

showNotifier("Enter maximum short-circuit current.");

return;

}

if(series<=0){

showNotifier("Enter panels in series.");

return;

}

if(parallel<=0){

showNotifier("Enter parallel strings.");

return;

}

if(

lowestTemperature.value.trim()==="" ||

highestTemperature.value.trim()===""

){

showNotifier("Enter site temperatures.");

return;

}

if(

isNaN(lowestTemp) ||

isNaN(highestTemp)

){

showNotifier("Invalid temperature.");

return;

}

if(lowestTemp>highestTemp){

showNotifier("Lowest temperature cannot exceed highest temperature.");

return;

}

// ------------------------------------------
// ELECTRICAL CALCULATIONS
// ------------------------------------------

const totalPanels=

series*parallel;

const totalPower=

totalPanels*power;

const stringVoc=

series*voc;

const stringVmp=

series*vmp;

const arrayImp=

parallel*imp;

const arrayIsc=

parallel*isc;

// ------------------------------------------
// COLD WEATHER VOC
// ------------------------------------------

const deltaTemp=

25-lowestTemp;

const correctedVocPerPanel=

voc*(1+(Math.abs(tempCoeff)/100)*deltaTemp);

const correctedStringVoc=

correctedVocPerPanel*series;

// ------------------------------------------
// PASS / FAIL
// ------------------------------------------

const dcPass=

correctedStringVoc<=maxDc;

const mpptPass=

stringVmp>=mpptMin&&
stringVmp<=mpptMax;

const currentPass=

arrayImp<=maxCurrent;

const iscPass=

arrayIsc<=maxIsc;

// ------------------------------------------
// MARGINS
// ------------------------------------------

const voltageMargin=

maxDc-correctedStringVoc;

const currentMargin=

maxCurrent-arrayImp;

const iscMargin=

maxIsc-arrayIsc;

let mpptMargin=0;

if(stringVmp<mpptMin){

mpptMargin=

mpptMin-stringVmp;

}

else if(stringVmp>mpptMax){

mpptMargin=

stringVmp-mpptMax;

}

else{

mpptMargin=

Math.min(

stringVmp-mpptMin,

mpptMax-stringVmp

);

}

// ------------------------------------------
// RECOMMENDED SERIES RANGE
// ------------------------------------------

const recommendedMinimum=

Math.ceil(mpptMin/vmp);

const recommendedMaximum=

Math.floor(maxDc/correctedVocPerPanel);
// ==========================================
// HERO RESULT
// ==========================================

heroLabel.textContent = "Configuration Status";

if(dcPass && mpptPass && currentPass && iscPass){

    if(voltageMargin>100 &&
       currentMargin>5 &&
       iscMargin>5){

        heroResult.textContent =
        "🟢 Excellent Design";

    }
    else{

        heroResult.textContent =
        "🟡 Acceptable Design";

    }

}
else{

    heroResult.textContent =
    "🔴 Redesign Required";

}

// ==========================================
// ELECTRICAL RESULTS
// ==========================================

totalPanelsResult.textContent =
totalPanels;

totalPowerResult.textContent =
totalPower.toFixed(0)+" W";

stringVocResult.textContent =
stringVoc.toFixed(1)+" V";

correctedVocResult.textContent =
correctedStringVoc.toFixed(1)+" V";

stringVmpResult.textContent =
stringVmp.toFixed(1)+" V";

arrayCurrentResult.textContent =
arrayImp.toFixed(2)+" A";

arrayIscResult.textContent =
arrayIsc.toFixed(2)+" A";

// ==========================================
// COMPATIBILITY
// ==========================================

dcVoltageCheck.textContent =
dcPass
?
"🟢 PASS"
:
"🔴 FAIL";

mpptVoltageCheck.textContent =
mpptPass
?
"🟢 PASS"
:
"🔴 FAIL";

currentCheck.textContent =
currentPass
?
"🟢 PASS"
:
"🔴 FAIL";

iscCheck.textContent =
iscPass
?
"🟢 PASS"
:
"🔴 FAIL";

// ==========================================
// ENGINEERING MARGINS
// ==========================================

voltageMarginResult.textContent =
voltageMargin.toFixed(1)+" V";

mpptMarginResult.textContent =
mpptMargin.toFixed(1)+" V";

currentMarginResult.textContent =
currentMargin.toFixed(2)+" A";

iscMarginResult.textContent =
iscMargin.toFixed(2)+" A";

// ==========================================
// CONFIGURATION
// ==========================================

recommendedSeriesResult.textContent =
recommendedMinimum+
" - "+
recommendedMaximum+
" Panels";

enteredConfigurationResult.textContent =
series+
"S × "+
parallel+
"P";

// ==========================================
// CONFIGURATION REVIEW
// ==========================================

let review="";

if(dcPass &&
   mpptPass &&
   currentPass &&
   iscPass){

review=
"The proposed PV string configuration is electrically compatible with the selected inverter.";

}
else{

review=
"The proposed PV string configuration requires modification before installation.";

}

configurationReview.textContent=
review;

// ==========================================
// WARNINGS
// ==========================================

let warnings=[];

if(!dcPass){

warnings.push(
"❌ Cold-weather string voltage exceeds the inverter maximum DC voltage."
);

}

else if(voltageMargin<=50){

warnings.push(
"⚠ Cold-weather string voltage is close to the inverter limit."
);

}

if(!mpptPass){

if(stringVmp<mpptMin){

warnings.push(
"⚠ String voltage is below the MPPT operating range."
);

}
else{

warnings.push(
"⚠ String voltage is above the MPPT operating range."
);

}

}

if(!currentPass){

warnings.push(
"❌ Array operating current exceeds the inverter rating."
);

}

if(!iscPass){

warnings.push(
"❌ Array short-circuit current exceeds the inverter rating."
);

}

if(series<recommendedMinimum){

warnings.push(
"⚠ Increase the number of panels in series."
);

}

if(series>recommendedMaximum){

warnings.push(
"⚠ Reduce the number of panels in series."
);

}

if(warnings.length===0){

warnings.push(
"🟢 No engineering issues detected."
);

}

warningsResult.innerHTML=
warnings.join("<br><br>");

// ==========================================
// ENGINEERING SUMMARY
// ==========================================

engineeringSummary.textContent=

"The system consists of "+

totalPanels+

" solar panels arranged as "+

series+

"S × "+

parallel+

", producing "+

totalPower.toFixed(0)+

" W. The corrected cold-weather string voltage is "+

correctedStringVoc.toFixed(1)+

" V while the operating string voltage is "+

stringVmp.toFixed(1)+

" V. The array operating current is "+

arrayImp.toFixed(2)+

" A and the short-circuit current is "+

arrayIsc.toFixed(2)+

" A. "+

review;

// ==========================================
// SHOW RESULT
// ==========================================

openResultSheet();

});
// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",function(){

const report =

`Solar String Sizing Results

Configuration:
${heroResult.textContent}

Total Panels:
${totalPanelsResult.textContent}

Total PV Power:
${totalPowerResult.textContent}

String Voc:
${stringVocResult.textContent}

Corrected Cold Voc:
${correctedVocResult.textContent}

String Vmp:
${stringVmpResult.textContent}

Operating Current:
${arrayCurrentResult.textContent}

Short-Circuit Current:
${arrayIscResult.textContent}

DC Voltage Check:
${dcVoltageCheck.textContent}

MPPT Voltage Check:
${mpptVoltageCheck.textContent}

Current Check:
${currentCheck.textContent}

Short-Circuit Check:
${iscCheck.textContent}

Voltage Margin:
${voltageMarginResult.textContent}

MPPT Margin:
${mpptMarginResult.textContent}

Current Margin:
${currentMarginResult.textContent}

Short-Circuit Margin:
${iscMarginResult.textContent}

Recommended Series:
${recommendedSeriesResult.textContent}

Entered Configuration:
${enteredConfigurationResult.textContent}

Configuration Review:
${configurationReview.textContent}

Warnings:
${warningsResult.innerText}

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
// LIVE UPDATE LISTENERS
// ==========================================

[
panelPower,
panelVoc,
panelVmp,
panelImp,
seriesPanels,
parallelStrings

].forEach(function(input){

input.addEventListener(

"input",

updateLiveInformation

);

});

// ==========================================
// RESULT SHEET CLOSE
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
// INITIALIZE
// ==========================================

updatePanelSource();

liveInfoCard.style.display="none";