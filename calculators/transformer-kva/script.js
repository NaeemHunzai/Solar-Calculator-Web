// ==========================================
// TRANSFORMER SIZING CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const mode =
document.getElementById("mode");

const load =
document.getElementById("load");

const loadUnit =
document.getElementById("loadUnit");

const phase =
document.getElementById("phase");

const powerFactor =
document.getElementById("powerFactor");

const primaryVoltage =
document.getElementById("primaryVoltage");

const primaryVoltageUnit =
document.getElementById("primaryVoltageUnit");

const secondaryVoltage =
document.getElementById("secondaryVoltage");

const secondaryVoltageUnit =
document.getElementById("secondaryVoltageUnit");

const frequency =
document.getElementById("frequency");

const futureExpansion =
document.getElementById("futureExpansion");

// ==========================================
// PROFESSIONAL MODE
// ==========================================

const demandFactor =
document.getElementById("demandFactor");

const diversityFactor =
document.getElementById("diversityFactor");

const loadingFactor =
document.getElementById("loadingFactor");

const temperature =
document.getElementById("temperature");

const altitude =
document.getElementById("altitude");

const coolingType =
document.getElementById("coolingType");

const efficiency =
document.getElementById("efficiency");

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

const transformerResult =
document.getElementById("transformerResult");

const calculatedCapacityResult =
document.getElementById("calculatedCapacityResult");

const loadResult =
document.getElementById("loadResult");

const apparentPowerResult =
document.getElementById("apparentPowerResult");

const currentResult =
document.getElementById("currentResult");

const loadingResult =
document.getElementById("loadingResult");

const primaryVoltageResult =
document.getElementById("primaryVoltageResult");

const secondaryVoltageResult =
document.getElementById("secondaryVoltageResult");

const coolingResult =
document.getElementById("coolingResult");

const efficiencyResult =
document.getElementById("efficiencyResult");

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

        primaryVoltage.value=230;

        secondaryVoltage.value=230;

        primaryVoltageUnit.value="1";

        secondaryVoltageUnit.value="1";

    }

    else{

        primaryVoltage.value=11000;

        secondaryVoltage.value=400;

        primaryVoltageUnit.value="1";

        secondaryVoltageUnit.value="1";

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

let primaryV =
Number(primaryVoltage.value);

let secondaryV =
Number(secondaryVoltage.value);

const Hz =
Number(frequency.value);

const expansion =
Number(futureExpansion.value);

// Convert units

if(loadUnit.value==="1000"){

    loadKW =
    loadKW/1000;

}

else if(loadUnit.value==="0.001"){

    loadKW =
    loadKW*1000;

}

primaryV *=
Number(primaryVoltageUnit.value);

secondaryV *=
Number(secondaryVoltageUnit.value);

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(loadKW) || loadKW<=0){

    showNotifier("Enter a valid connected load.");

    load.focus();

    return;

}

if(loadKW>10000){

    showNotifier("Maximum supported connected load is 10 MW.");

    load.focus();

    return;

}

if(isNaN(pf) || pf<0.5 || pf>1){

    showNotifier("Power Factor must be between 0.5 and 1.0.");

    powerFactor.focus();

    return;

}

if(primaryV<=0){

    showNotifier("Enter a valid primary voltage.");

    primaryVoltage.focus();

    return;

}

if(secondaryV<=0){

    showNotifier("Enter a valid secondary voltage.");

    secondaryVoltage.focus();

    return;

}

if(expansion<0 || expansion>100){

    showNotifier("Future Expansion must be between 0 and 100%.");

    futureExpansion.focus();

    return;

}

// ------------------------------------------
// SIMPLE MODE
// ------------------------------------------

let demand=1;

let diversity=1;

let loading=80;

let temp=25;

let alt=0;

let eff=98;

let cooling="ONAN";

// ------------------------------------------
// PROFESSIONAL MODE
// ------------------------------------------

if(mode.value==="professional"){

    demand=
    Number(demandFactor.value);

    diversity=
    Number(diversityFactor.value);

    loading=
    Number(loadingFactor.value);

    temp=
    Number(temperature.value);

    alt=
    Number(altitude.value);

    eff=
    Number(efficiency.value);

    cooling=
    coolingType.options[
    coolingType.selectedIndex
    ].text;

    if(demand<0.1 || demand>1){

        showNotifier("Demand Factor must be between 0.1 and 1.0.");

        demandFactor.focus();

        return;

    }

    if(diversity<1){

        showNotifier("Diversity Factor cannot be less than 1.");

        diversityFactor.focus();

        return;

    }

    if(loading<50 || loading>100){

        showNotifier("Loading Factor must be between 50% and 100%.");

        loadingFactor.focus();

        return;

    }

    if(temp<-10 || temp>60){

        showNotifier("Ambient Temperature must be between -10°C and 60°C.");

        temperature.focus();

        return;

    }

    if(alt<0 || alt>5000){

        showNotifier("Installation Altitude must be between 0 and 5000 m.");

        altitude.focus();

        return;

    }

    if(eff<90 || eff>100){

        showNotifier("Transformer Efficiency must be between 90% and 100%.");

        efficiency.focus();

        return;

    }

}

// ------------------------------------------
// CALCULATIONS
// ------------------------------------------

let adjustedLoad =

loadKW*
demand;

adjustedLoad /=

diversity;

adjustedLoad *=

(1+expansion/100);

// Apparent Power

let requiredKVA=

adjustedLoad/
pf;

// Transformer Loading

requiredKVA /=

(loading/100);

// Temperature Derating

if(temp>40){

requiredKVA/=

(1-((temp-40)*0.005));

}

// Altitude Derating

if(alt>1000){

requiredKVA/=

(1-(((alt-1000)/1000)*0.03));

}

// Efficiency

requiredKVA/=

(eff/100);

// ------------------------------------------
// STANDARD TRANSFORMERS
// ------------------------------------------

const standardTransformers=[

25,
50,
63,
100,
160,
200,
250,
315,
400,
500,
630,
800,
1000,
1250,
1600,
2000,
2500,
3150,
4000,
5000,
6300,
8000,
10000,
12500,
16000,
20000

];

let recommendedTransformer=

standardTransformers[
standardTransformers.length-1
];

for(const rating of standardTransformers){

    if(rating>=requiredKVA){

        recommendedTransformer=
        rating;

        break;

    }

}

// ------------------------------------------
// FULL LOAD CURRENT
// ------------------------------------------

let current;

if(phase.value==="single"){

current=

(recommendedTransformer*1000)/

secondaryV;

}

else{

current=

(recommendedTransformer*1000)/

(Math.sqrt(3)*secondaryV);

}
// ------------------------------------------
// TRANSFORMER LOADING
// ------------------------------------------

const loadingPercent =

(requiredKVA/recommendedTransformer)*100;

// ------------------------------------------
// RESULT SHEET
// ------------------------------------------

transformerResult.textContent =
recommendedTransformer.toFixed(0)+" kVA";

calculatedCapacityResult.textContent =
requiredKVA.toFixed(2)+" kVA";

loadResult.textContent =
loadKW.toFixed(2)+" kW";

apparentPowerResult.textContent =
(requiredKVA*loadingPercent/100).toFixed(2)+" kVA";

currentResult.textContent =
current.toFixed(2)+" A";

loadingResult.textContent =
loadingPercent.toFixed(1)+" %";

primaryVoltageResult.textContent =
(primaryV>=1000
?
(primaryV/1000).toFixed(2)+" kV"
:
primaryV.toFixed(0)+" V");

secondaryVoltageResult.textContent =
(secondaryV>=1000
?
(secondaryV/1000).toFixed(2)+" kV"
:
secondaryV.toFixed(0)+" V");

coolingResult.textContent =
cooling;

efficiencyResult.textContent =
eff.toFixed(1)+" %";

frequencyResult.textContent =
Hz+" Hz";

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

let summary="";

if(loadingPercent<=60){

summary=
"The selected transformer has a generous capacity margin and is lightly loaded.";

}

else if(loadingPercent<=80){

summary=
"The selected transformer operates within the recommended continuous loading range.";

}

else if(loadingPercent<=95){

summary=
"The transformer operates at a high loading level. Future expansion should be carefully evaluated.";

}

else{

summary=
"The transformer operates near full capacity. Consider selecting the next larger standard rating.";

}

engineeringSummary.textContent=
summary;

// ------------------------------------------
// OPEN RESULT
// ------------------------------------------

openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

mode.value="simple";

load.value="";

loadUnit.value="1";

phase.value="three";

powerFactor.value="0.80";

primaryVoltage.value="";

primaryVoltageUnit.value="1";

secondaryVoltage.value="400";

secondaryVoltageUnit.value="1";

frequency.value="50";

futureExpansion.value="20";

demandFactor.value="1.0";

diversityFactor.value="1.0";

loadingFactor.value="80";

temperature.value="25";

altitude.value="0";

coolingType.value="onan";

efficiency.value="98";

updateMode();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

const text=

`Transformer Sizing Calculator

Recommended Standard Transformer
${transformerResult.textContent}

Required Transformer Capacity
${calculatedCapacityResult.textContent}

Connected Load
${loadResult.textContent}

Apparent Power
${apparentPowerResult.textContent}

Full Load Current
${currentResult.textContent}

Estimated Transformer Loading
${loadingResult.textContent}

Primary Voltage
${primaryVoltageResult.textContent}

Secondary Voltage
${secondaryVoltageResult.textContent}

Cooling Type
${coolingResult.textContent}

Transformer Efficiency
${efficiencyResult.textContent}

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