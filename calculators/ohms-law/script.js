// ==========================================
// RESISTOR COLOR CODE CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const mode =
document.getElementById("mode");

const bandCount =
document.getElementById("bandCount");

const band1 =
document.getElementById("band1");

const band2 =
document.getElementById("band2");

const band3 =
document.getElementById("band3");

const multiplier =
document.getElementById("multiplier");

const tolerance =
document.getElementById("tolerance");

const temperatureBand =
document.getElementById("temperatureBand");

// ==========================================
// GROUPS
// ==========================================

const thirdDigitGroup =
document.getElementById("thirdDigitGroup");

const tempGroup =
document.getElementById("tempGroup");

// ==========================================
// BUTTONS
// ==========================================

const calculateBtn =
document.getElementById("calculateBtn");

const resetBtn =
document.getElementById("resetBtn");

// ==========================================
// LIVE RESISTOR
// ==========================================

const liveBand1 =
document.getElementById("liveBand1");

const liveBand2 =
document.getElementById("liveBand2");

const liveBand3 =
document.getElementById("liveBand3");

const liveBand4 =
document.getElementById("liveBand4");

const liveBand5 =
document.getElementById("liveBand5");

const liveBand6 =
document.getElementById("liveBand6");

// ==========================================
// COLOR PREVIEWS
// ==========================================

const multiplierPreview =
document.getElementById("multiplierPreview");

const tolerancePreview =
document.getElementById("tolerancePreview");

const tempPreview =
document.getElementById("tempPreview");

// ==========================================
// COLOR MAP
// ==========================================

const colors={

Black:"#000000",

Brown:"#6D4C41",

Red:"#E53935",

Orange:"#FB8C00",

Yellow:"#FDD835",

Green:"#43A047",

Blue:"#1E88E5",

Violet:"#8E24AA",

Grey:"#9E9E9E",

White:"#FFFFFF",

Gold:"#D4AF37",

Silver:"#C0C0C0"

};




// ==========================================
// RESULT SHEET
// ==========================================

const resultSheet =
document.getElementById("resultSheet");

const doneButton =
document.getElementById("doneButton");

const closeSheet =
document.getElementById("closeSheet");

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
// SIMPLE / PROFESSIONAL
// ==========================================

function updateMode(){

    if(mode.value==="simple"){

        // Professional UI will be added later

    }

    else{

        // Professional UI

    }

}

mode.addEventListener("change",updateMode);

updateMode();

// ==========================================
// BAND VISIBILITY
// ==========================================

function updateBandVisibility(){

    const bands =
    Number(bandCount.value);

    thirdDigitGroup.style.display =
    bands>=5
    ?
    "block"
    :
    "none";

    tempGroup.style.display =
    bands===6
    ?
    "block"
    :
    "none";

    liveBand3.style.display =
    bands>=5
    ?
    "block"
    :
    "none";

    liveBand6.style.display =
    bands===6
    ?
    "block"
    :
    "none";

}

bandCount.addEventListener(

"change",

updateBandVisibility

);

updateBandVisibility();
// ==========================================
// LIVE COLOR PREVIEW
// ==========================================

function updatePreviewBoxes(){

    multiplierPreview.style.background =
    colors[multiplier.value];

    tolerancePreview.style.background =
    colors[tolerance.value];

    tempPreview.style.background =
    colors[temperatureBand.value];

}

// ==========================================
// LIVE RESISTOR
// ==========================================

function updateResistor(){

    const bands =
    Number(bandCount.value);

    // Reset

    liveBand1.style.display="block";
    liveBand2.style.display="block";
    liveBand3.style.display="block";
    liveBand4.style.display="block";
    liveBand5.style.display="block";
    liveBand6.style.display="block";

    // 1st Digit

    liveBand1.style.background =
    colors[band1.value];

    // 2nd Digit

    liveBand2.style.background =
    colors[band2.value];

    if(bands===4){

        // Multiplier

        liveBand3.style.background =
        colors[multiplier.value];

        // Tolerance

        liveBand4.style.background =
        colors[tolerance.value];

        // Hide unused bands

        liveBand5.style.display="none";
        liveBand6.style.display="none";

    }

    else if(bands===5){

        // 3rd Digit

        liveBand3.style.background =
        colors[band3.value];

        // Multiplier

        liveBand4.style.background =
        colors[multiplier.value];

        // Tolerance

        liveBand5.style.background =
        colors[tolerance.value];

        liveBand6.style.display="none";

    }

    else{

        // 3rd Digit

        liveBand3.style.background =
        colors[band3.value];

        // Multiplier

        liveBand4.style.background =
        colors[multiplier.value];

        // Tolerance

        liveBand5.style.background =
        colors[tolerance.value];

        // Temperature

        liveBand6.style.background =
        colors[temperatureBand.value];

    }

    updatePreviewBoxes();

}

// ==========================================
// LIVE EVENTS
// ==========================================

band1.addEventListener(
"change",
updateResistor
);

band2.addEventListener(
"change",
updateResistor
);

band3.addEventListener(
"change",
updateResistor
);

multiplier.addEventListener(
"change",
updateResistor
);

tolerance.addEventListener(
"change",
updateResistor
);

temperatureBand.addEventListener(
"change",
updateResistor
);

bandCount.addEventListener(
"change",
function(){

    updateBandVisibility();

    updateResistor();

});

// Initial Preview

updateResistor();
// ==========================================
// RESISTOR DATA
// ==========================================

const digits={

Black:0,
Brown:1,
Red:2,
Orange:3,
Yellow:4,
Green:5,
Blue:6,
Violet:7,
Grey:8,
White:9

};

const multipliers={

Black:1,

Brown:10,

Red:100,

Orange:1000,

Yellow:10000,

Green:100000,

Blue:1000000,

Violet:10000000,

Grey:100000000,

White:1000000000,

Gold:0.1,

Silver:0.01

};

const tolerances={

Brown:1,

Red:2,

Green:0.5,

Blue:0.25,

Violet:0.1,

Grey:0.05,

Gold:5,

Silver:10

};

const temperatureCoeff={

Brown:100,

Red:50,

Orange:15,

Yellow:25,

Blue:10,

Violet:5

};

// ==========================================
// FORMAT RESISTANCE
// ==========================================

function formatResistance(value){

    if(value>=1000000){

        return (value/1000000).toFixed(2)+" MΩ";

    }

    if(value>=1000){

        return (value/1000).toFixed(2)+" kΩ";

    }

    return value.toFixed(2)+" Ω";

}

// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

    const bands=
    Number(bandCount.value);

    // Validation

    if(

        band1.value==="Gold" ||

        band1.value==="Silver" ||

        band2.value==="Gold" ||

        band2.value==="Silver"

    ){

     showNotifier("Gold and Silver cannot be used as significant digits.");

        return;

    }

    let resistance=0;

    // -------------------------

    // 4 BAND

    // -------------------------

    if(bands===4){

        resistance=

        (

        digits[band1.value]*10

        +

        digits[band2.value]

        )

        *

        multipliers[multiplier.value];

    }

    // -------------------------

    // 5 BAND

    // -------------------------

    else{

        resistance=

        (

        digits[band1.value]*100

        +

        digits[band2.value]*10

        +

        digits[band3.value]

        )

        *

        multipliers[multiplier.value];

    }

    const tol=

    tolerances[tolerance.value];

    const minimum=

    resistance-

    (resistance*tol/100);

    const maximum=

    resistance+

    (resistance*tol/100);

    // Continue in Part 4...

        // ==========================================
    // RESULT SHEET
    // ==========================================

    resistanceResult.textContent =
    formatResistance(resistance);

    toleranceResult.textContent =
    "±"+tol+"%";

    minimumResult.textContent =
    formatResistance(minimum);

    maximumResult.textContent =
    formatResistance(maximum);

    if(bands===6){

        temperatureResult.textContent =
        temperatureCoeff[
        temperatureBand.value
        ]+" ppm/°C";

    }

    else{

        temperatureResult.textContent =
        "--";

    }

    // Color sequence

    let sequence=[];

    sequence.push(band1.value);

    sequence.push(band2.value);

    if(bands>=5){

        sequence.push(band3.value);

    }

    sequence.push(multiplier.value);

    sequence.push(tolerance.value);

    if(bands===6){

        sequence.push(
        temperatureBand.value
        );

    }

    colorSequenceResult.textContent =
    sequence.join(" • ");

    openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    mode.value="simple";

    bandCount.value="4";

    band1.value="Brown";

    band2.value="Black";

    band3.value="Black";

    multiplier.value="Red";

    tolerance.value="Gold";

    temperatureBand.value="Brown";

    updateMode();

    updateBandVisibility();

    updateResistor();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

const text=

`Resistor Color Code

Resistance

${resistanceResult.textContent}

Tolerance

${toleranceResult.textContent}

Minimum Resistance

${minimumResult.textContent}

Maximum Resistance

${maximumResult.textContent}

Temperature Coefficient

${temperatureResult.textContent}

Color Bands

${colorSequenceResult.textContent}

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