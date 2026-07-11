// ==========================================
// SINGLE & THREE PHASE POWER CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const mode =
document.getElementById("mode");

const phase =
document.getElementById("phase");

const calculateType =
document.getElementById("calculateType");

const power =
document.getElementById("power");

const voltage =
document.getElementById("voltage");

const current =
document.getElementById("current");

const powerFactor =
document.getElementById("powerFactor");

const efficiency =
document.getElementById("efficiency");

const safetyMargin =
document.getElementById("safetyMargin");

const demandFactor =
document.getElementById("demandFactor");

const frequency =
document.getElementById("frequency");

// ==========================================
// GROUPS
// ==========================================

const professionalFields =
document.getElementById("professionalFields");

const powerGroup =
document.getElementById("powerGroup");

const voltageGroup =
document.getElementById("voltageGroup");

const currentGroup =
document.getElementById("currentGroup");

// ==========================================
// BUTTONS
// ==========================================

const calculateBtn =
document.getElementById("calculateBtn");

const resetBtn =
document.getElementById("resetBtn");

// ==========================================
// RESULT SHEET
// ==========================================

const resultSheet =
document.getElementById("resultSheet");

const doneButton =
document.getElementById("doneButton");

const closeSheet =
document.getElementById("closeSheet");

const copyResults =
document.getElementById("copyResults");

// ==========================================
// RESULT LABELS
// ==========================================

const heroLabel =
document.getElementById("heroLabel");

const heroResult =
document.getElementById("heroResult");

const apparentPowerResult =
document.getElementById("apparentPowerResult");

const reactivePowerResult =
document.getElementById("reactivePowerResult");

const powerFactorResult =
document.getElementById("powerFactorResult");

const breakerResult =
document.getElementById("breakerResult");

const cableResult =
document.getElementById("cableResult");

const systemTypeResult =
document.getElementById("systemTypeResult");

const frequencyResult =
document.getElementById("frequencyResult");

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

    notifierText.textContent = message;

    notifier.classList.add("show");

    setTimeout(function(){

        notifier.classList.remove("show");

    },2500);

}

// ==========================================
// RESULT SHEET
// ==========================================

function openSheet(){

    resultSheet.classList.add("show");

}

function closeResultSheet(){

    resultSheet.classList.remove("show");

}

doneButton.onclick = closeResultSheet;

closeSheet.onclick = closeResultSheet;

resultSheet.addEventListener("click",function(e){

    if(e.target===resultSheet){

        closeResultSheet();

    }

});

// ==========================================
// SIMPLE / PROFESSIONAL MODE
// ==========================================

function updateMode(){

    if(mode.value==="simple"){

        professionalFields.style.display="none";

    }

    else{

        professionalFields.style.display="block";

    }

}

mode.addEventListener("change",updateMode);

updateMode();

// ==========================================
// UPDATE INPUT FIELDS
// ==========================================

function updateInputFields(){

    powerGroup.style.display="block";

    voltageGroup.style.display="block";

    currentGroup.style.display="block";

    if(calculateType.value==="current"){

        currentGroup.style.display="none";

    }

    if(calculateType.value==="power"){

        powerGroup.style.display="none";

    }

    if(calculateType.value==="voltage"){

        voltageGroup.style.display="none";

    }

}

calculateType.addEventListener(

"change",

updateInputFields

);

updateInputFields();
// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

    let P;
    let V;
    let I;

    const pf = Number(powerFactor.value);

    let eff = 100;
    let margin = 0;
    let demand = 100;

    // =====================================
    // PROFESSIONAL SETTINGS
    // =====================================

    if(mode.value==="professional"){

        eff = Number(efficiency.value);

        margin = Number(safetyMargin.value);

        demand = Number(demandFactor.value);

        if(eff<80 || eff>100){

            showNotifier("Efficiency must be between 80% and 100%.");

            efficiency.focus();

            return;

        }

        if(margin<0 || margin>50){

            showNotifier("Safety Margin must be between 0% and 50%.");

            safetyMargin.focus();

            return;

        }

        if(demand<1 || demand>100){

            showNotifier("Demand Factor must be between 1% and 100%.");

            demandFactor.focus();

            return;

        }

    }

    // =====================================
    // POWER FACTOR
    // =====================================

    if(powerFactor.value.trim()==""){

        showNotifier("Please enter Power Factor.");

        powerFactor.focus();

        return;

    }

    if(pf<0.70 || pf>1){

        showNotifier("Power Factor must be between 0.70 and 1.00.");

        powerFactor.focus();

        return;

    }

    // =====================================
    // CALCULATE CURRENT
    // =====================================

    if(calculateType.value==="current"){

        if(power.value.trim()==""){

            showNotifier("Please enter Power.");

            power.focus();

            return;

        }

        if(voltage.value.trim()==""){

            showNotifier("Please enter Voltage.");

            voltage.focus();

            return;

        }

        P = Number(power.value);

        V = Number(voltage.value);

        if(P<=0){

            showNotifier("Power must be greater than zero.");

            return;

        }

        if(V<=0){

            showNotifier("Voltage must be greater than zero.");

            return;

        }

        if(phase.value==="single"){

            I =
            P /
            (V * pf * (eff/100));

        }

        else{

            I =
            P /
            (1.732 * V * pf * (eff/100));

        }

    }

    // =====================================
    // CALCULATE POWER
    // =====================================

    else if(calculateType.value==="power"){

        if(current.value.trim()==""){

            showNotifier("Please enter Current.");

            current.focus();

            return;

        }

        if(voltage.value.trim()==""){

            showNotifier("Please enter Voltage.");

            voltage.focus();

            return;

        }

        I = Number(current.value);

        V = Number(voltage.value);

        if(I<=0){

            showNotifier("Current must be greater than zero.");

            return;

        }

        if(V<=0){

            showNotifier("Voltage must be greater than zero.");

            return;

        }

        if(phase.value==="single"){

            P =
            V *
            I *
            pf *
            (eff/100);

        }

        else{

            P =
            1.732 *
            V *
            I *
            pf *
            (eff/100);

        }

    }

    // =====================================
    // CALCULATE VOLTAGE
    // =====================================

    else{

        if(power.value.trim()==""){

            showNotifier("Please enter Power.");

            power.focus();

            return;

        }

        if(current.value.trim()==""){

            showNotifier("Please enter Current.");

            current.focus();

            return;

        }

        P = Number(power.value);

        I = Number(current.value);

        if(P<=0){

            showNotifier("Power must be greater than zero.");

            return;

        }

        if(I<=0){

            showNotifier("Current must be greater than zero.");

            return;

        }

        if(phase.value==="single"){

            V =
            P /
            (I * pf * (eff/100));

        }

        else{

            V =
            P /
            (1.732 * I * pf * (eff/100));

        }

    }

    // =====================================
    // APPLY DEMAND FACTOR
    // =====================================

    P =
    P *
    (demand/100);

    // =====================================
    // ENGINEERING VALUES
    // =====================================

    const apparentPower =
    P / pf;

    const reactivePower =
    Math.sqrt(
        (apparentPower*apparentPower)
        -
        (P*P)
    );

    // Values continue in Part 3...

        // =====================================
    // RECOMMENDED BREAKER SIZE
    // =====================================

    let breakerCurrent =
        I * (1 + margin/100);

    let breaker;

    if(breakerCurrent<=6){

        breaker=6;

    }

    else if(breakerCurrent<=10){

        breaker=10;

    }

    else if(breakerCurrent<=16){

        breaker=16;

    }

    else if(breakerCurrent<=20){

        breaker=20;

    }

    else if(breakerCurrent<=25){

        breaker=25;

    }

    else if(breakerCurrent<=32){

        breaker=32;

    }

    else if(breakerCurrent<=40){

        breaker=40;

    }

    else if(breakerCurrent<=50){

        breaker=50;

    }

    else if(breakerCurrent<=63){

        breaker=63;

    }

    else if(breakerCurrent<=80){

        breaker=80;

    }

    else if(breakerCurrent<=100){

        breaker=100;

    }

    else if(breakerCurrent<=125){

        breaker=125;

    }

    else{

        breaker=160;

    }

    // =====================================
    // RECOMMENDED CABLE SIZE
    // =====================================

    let cable;

    if(I<=10){

        cable="1.5 mm²";

    }

    else if(I<=16){

        cable="2.5 mm²";

    }

    else if(I<=25){

        cable="4 mm²";

    }

    else if(I<=32){

        cable="6 mm²";

    }

    else if(I<=40){

        cable="10 mm²";

    }

    else if(I<=63){

        cable="16 mm²";

    }

    else if(I<=80){

        cable="25 mm²";

    }

    else if(I<=100){

        cable="35 mm²";

    }

    else if(I<=125){

        cable="50 mm²";

    }

    else{

        cable="70 mm²";

    }

    // =====================================
    // HERO RESULT
    // =====================================

    if(calculateType.value==="current"){

        heroLabel.textContent="Current";

        heroResult.textContent=
        I.toFixed(2)+" A";

    }

    else if(calculateType.value==="power"){

        heroLabel.textContent="Power";

        if(P>=1000){

            heroResult.textContent=
            (P/1000).toFixed(2)+" kW";

        }

        else{

            heroResult.textContent=
            P.toFixed(0)+" W";

        }

    }

    else{

        heroLabel.textContent="Voltage";

        heroResult.textContent=
        V.toFixed(1)+" V";

    }

    // =====================================
    // RESULT SHEET
    // =====================================

    apparentPowerResult.textContent=
    (apparentPower/1000).toFixed(2)+" kVA";

    reactivePowerResult.textContent=
    (reactivePower/1000).toFixed(2)+" kVAR";

    powerFactorResult.textContent=
    pf.toFixed(2);

    breakerResult.textContent=
    breaker+" A";

    cableResult.textContent=
    cable;

    systemTypeResult.textContent=
    phase.value==="single"
    ?
    "Single Phase"
    :
    "Three Phase";

    frequencyResult.textContent=
    frequency.value+" Hz";

    // =====================================
    // OPEN RESULT
    // =====================================

    openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    mode.value="simple";

    phase.value="single";

    calculateType.value="current";

    power.value="";

    voltage.value="";

    current.value="";

    powerFactor.value="0.90";

    efficiency.value="95";

    safetyMargin.value="20";

    demandFactor.value="100";

    frequency.value="50";

    updateMode();

    updateInputFields();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

    let resultValue="";

    if(calculateType.value==="current"){

        resultValue=heroResult.textContent;

    }

    else if(calculateType.value==="power"){

        resultValue=heroResult.textContent;

    }

    else{

        resultValue=heroResult.textContent;

    }

    const text=

`Single & Three Phase Power Calculator

System Type : ${systemTypeResult.textContent}

Calculation : ${heroLabel.textContent}

Result : ${resultValue}

------------------------------------

Power Factor : ${powerFactorResult.textContent}

Apparent Power : ${apparentPowerResult.textContent}

Reactive Power : ${reactivePowerResult.textContent}

Recommended Breaker : ${breakerResult.textContent}

Recommended Cable : ${cableResult.textContent}

Frequency : ${frequencyResult.textContent}

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