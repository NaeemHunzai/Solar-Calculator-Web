// ==========================================
// CAPACITOR BANK SIZING CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const kvar =
document.getElementById("kvar");

const phase =
document.getElementById("phase");

const connection =
document.getElementById("connection");

const voltage =
document.getElementById("voltage");

const voltageUnit =
document.getElementById("voltageUnit");

const frequency =
document.getElementById("frequency");

const safetyMargin =
document.getElementById("safetyMargin");

const stepSize =
document.getElementById("stepSize");

const continuousDuty =
document.getElementById("continuousDuty");

// ==========================================
// GROUPS
// ==========================================

const connectionGroup =
document.getElementById("connectionGroup");

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

const capacitanceResult =
document.getElementById("capacitanceResult");

const kvarResult =
document.getElementById("kvarResult");

const currentResult =
document.getElementById("currentResult");

const recommendationResult =
document.getElementById("recommendationResult");

const stepsResult =
document.getElementById("stepsResult");

const voltageRatingResult =
document.getElementById("voltageRatingResult");

const connectionResult =
document.getElementById("connectionResult");

const frequencyResult =
document.getElementById("frequencyResult");

const marginResult =
document.getElementById("marginResult");

const dutyResult =
document.getElementById("dutyResult");

// ==========================================
// NOTIFIER
// ==========================================

const notifier =
document.getElementById("notifier");

const notifierText =
document.getElementById("notifierText");

// ==========================================
// NOTIFIER FUNCTION
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
// RESULT SHEET FUNCTIONS
// ==========================================

function openSheet(){

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
// SHOW / HIDE CONNECTION TYPE
// ==========================================

function updatePhase(){

    if(phase.value==="single"){

        connectionGroup.style.display="none";

    }

    else{

        connectionGroup.style.display="block";

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

const Q=

Number(kvar.value);

let V=

Number(voltage.value);

const F=

Number(frequency.value);

const margin=

Number(safetyMargin.value);

const step=

Number(stepSize.value);

// Convert kV → V

V*=Number(voltageUnit.value);

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(Q) || Q<=0){

showNotifier("Enter a valid reactive power.");

kvar.focus();

return;

}

if(isNaN(V) || V<=0){

showNotifier("Enter a valid system voltage.");

voltage.focus();

return;

}

if(margin<0 || margin>50){

showNotifier("Safety margin must be between 0 and 50%.");

safetyMargin.focus();

return;

}

if(isNaN(step) || step<=0){

showNotifier("Enter a valid capacitor step size.");

stepSize.focus();

return;

}

// ------------------------------------------
// APPLY SAFETY MARGIN
// ------------------------------------------

const designKvar=

Q*(1+margin/100);
const designVar = designKvar * 1000;

// ------------------------------------------
// CALCULATE CAPACITANCE
// ------------------------------------------

let capacitance=0;

let current=0;

if(phase.value==="single"){

// Single Phase

capacitance =
designVar /
(2*Math.PI*F*V*V);

current=

(designKvar*1000)/V;

}

else{

// Three Phase Current

current=

(designKvar*1000)/(Math.sqrt(3)*V);

if(connection.value==="delta"){

// Delta

capacitance =
designVar /
(3*2*Math.PI*F*V*V);

}

else{

// Star

capacitance =
(3*designVar) /
(2*Math.PI*F*V*V);

}

}

// ------------------------------------------
// STANDARD CAPACITOR BANK
// ------------------------------------------

const standardBanks=[

2.5,

5,

7.5,

10,

12.5,

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

500

];

let recommendedBank=

standardBanks[standardBanks.length-1];

for(const bank of standardBanks){

if(bank>=designKvar){

recommendedBank=bank;

break;

}

}

// ------------------------------------------
// STEP CONFIGURATION
// ------------------------------------------

const totalSteps=

Math.ceil(recommendedBank/step);

// ------------------------------------------
// VOLTAGE RATING
// ------------------------------------------

let voltageRating="";

if(V<=230){

voltageRating="250 V";

}

else if(V<=400){

voltageRating="440 V";

}

else if(V<=415){

voltageRating="480 V";

}

else if(V<=440){

voltageRating="525 V";

}

else if(V<=690){

voltageRating="750 V";

}

else{

voltageRating=

Math.ceil(V/100)*100+

" V";

}
// ==========================================
// FORMAT CAPACITANCE
// ==========================================

let capDisplay="";


const capacitanceMicro = capacitance * 1000000;

let capDisplay;

if(capacitanceMicro >= 1000){

    capDisplay =
    (capacitanceMicro / 1000).toFixed(2) +
    " mF / Phase";

}
else{

    capDisplay =
    capacitanceMicro.toFixed(2) +
    " µF / Phase";

}


}

// ==========================================
// POPULATE RESULT SHEET
// ==========================================

capacitanceResult.textContent=
capDisplay;

kvarResult.textContent=
designKvar.toFixed(2)+" kVAR";

currentResult.textContent=
current.toFixed(2)+" A";

recommendationResult.textContent=
recommendedBank.toFixed(2)+" kVAR";

stepsResult.textContent=
totalSteps+
" × "+
step.toFixed(2)+
" kVAR";

voltageRatingResult.textContent=
voltageRating;

if(phase.value==="single"){

    connectionResult.textContent=
    "Single Phase";

}

else if(connection.value==="delta"){

    connectionResult.textContent=
    "Three Phase - Delta";

}

else{

    connectionResult.textContent=
    "Three Phase - Star";

}

frequencyResult.textContent=
F+" Hz";

marginResult.textContent=
margin.toFixed(0)+" %";

dutyResult.textContent=
continuousDuty.value==="yes"
?
"Continuous Duty"
:
"Intermittent Duty";

// ==========================================
// OPEN RESULT SHEET
// ==========================================

openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    kvar.value="";

    phase.value="three";

    connection.value="delta";

    voltage.value="";

    voltageUnit.value="1";

    frequency.value="50";

    safetyMargin.value="10";

    stepSize.value="5";

    continuousDuty.value="yes";

    updatePhase();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

const text=

`Capacitor Bank Sizing Calculator

Required Capacitance
${capacitanceResult.textContent}

Required Reactive Power
${kvarResult.textContent}

Capacitor Current
${currentResult.textContent}

Recommended Capacitor Bank
${recommendationResult.textContent}

Step Configuration
${stepsResult.textContent}

Recommended Voltage Rating
${voltageRatingResult.textContent}

Connection
${connectionResult.textContent}

Frequency
${frequencyResult.textContent}

Safety Margin
${marginResult.textContent}

Duty
${dutyResult.textContent}

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