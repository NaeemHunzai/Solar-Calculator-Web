/* ==========================================
   SOLAR TILT ANGLE CALCULATOR
   Part 1 - Initialization & Helpers
========================================== */

/* ==========================================
   DOM ELEMENTS
========================================== */

const latitudeInput = document.getElementById("latitude");
const optimizationSelect = document.getElementById("optimization");
const monthGroup = document.getElementById("monthGroup");
const monthSelect = document.getElementById("month");
const roofPitchInput = document.getElementById("roofPitch");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const resultSheet = document.getElementById("resultSheet");
const closeSheet = document.getElementById("closeSheet");
const doneButton = document.getElementById("doneButton");
const copyResults = document.getElementById("copyResults");

const notifier = document.getElementById("notifier");
const notifierText = document.getElementById("notifierText");

/* ==========================================
   RESULT ELEMENTS
========================================== */

const recommendedTiltResult = document.getElementById("recommendedTiltResult");

const optimizationResult = document.getElementById("optimizationResult");
const hemisphereResult = document.getElementById("hemisphereResult");
const directionResult = document.getElementById("directionResult");

const annualTiltResult = document.getElementById("annualTiltResult");
const summerTiltResult = document.getElementById("summerTiltResult");
const springTiltResult = document.getElementById("springTiltResult");
const winterTiltResult = document.getElementById("winterTiltResult");

const roofPitchResult = document.getElementById("roofPitchResult");
const differenceResult = document.getElementById("differenceResult");
const compatibilityResult = document.getElementById("compatibilityResult");

const recommendationResult = document.getElementById("recommendationResult");

/* ==========================================
   EVENT LISTENERS
========================================== */

optimizationSelect.addEventListener("change", toggleMonthSelection);

calculateBtn.addEventListener("click", calculateTilt);

resetBtn.addEventListener("click", resetCalculator);

closeSheet.addEventListener("click", closeResultSheet);

doneButton.addEventListener("click", closeResultSheet);

copyResults.addEventListener("click", copyCalculation);

/* ==========================================
   INITIALIZATION
========================================== */

toggleMonthSelection();

/* ==========================================
   SHOW / HIDE MONTH DROPDOWN
========================================== */

function toggleMonthSelection() {

    monthGroup.style.display =
        optimizationSelect.value === "monthly"
            ? "flex"
            : "none";

}

/* ==========================================
   VALIDATION
========================================== */

function validateInputs() {

    const latitude = parseFloat(latitudeInput.value);

    if (latitudeInput.value.trim() === "") {

        showNotifier("Please enter latitude.");

        latitudeInput.focus();

        return false;

    }

    if (isNaN(latitude)) {

        showNotifier("Invalid latitude.");

        latitudeInput.focus();

        return false;

    }

    if (latitude < -90 || latitude > 90) {

        showNotifier("Latitude must be between -90° and 90°.");

        latitudeInput.focus();

        return false;

    }

    if (roofPitchInput.value.trim() !== "") {

        const roofPitch = parseFloat(roofPitchInput.value);

        if (isNaN(roofPitch) || roofPitch < 0 || roofPitch > 90) {

            showNotifier("Roof pitch must be between 0° and 90°.");

            roofPitchInput.focus();

            return false;

        }

    }

    return true;

}

/* ==========================================
   HELPER FUNCTIONS
========================================== */

function round(value, decimals = 1) {

    return Number(value.toFixed(decimals));

}

function getLatitude() {

    return parseFloat(latitudeInput.value);

}

function getRoofPitch() {

    if (roofPitchInput.value.trim() === "") {

        return null;

    }

    return parseFloat(roofPitchInput.value);

}

function getHemisphere(latitude) {

    return latitude >= 0
        ? "Northern Hemisphere"
        : "Southern Hemisphere";

}

function getPanelDirection(latitude) {

    return latitude >= 0
        ? "True South"
        : "True North";

}

/* ==========================================
   MONTH NAMES
========================================== */

const MONTH_NAMES = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];
/* ==========================================
   ENGINEERING CALCULATION FUNCTIONS
========================================== */

/*
Empirical fixed-tilt equations based on
industry recommendations for fixed PV arrays.
*/

function calculateAnnualTilt(latitude){

    const lat = Math.abs(latitude);

    let tilt;

    if(lat <= 25){

        tilt = lat * 0.87;

    }
    else if(lat <= 50){

        tilt = (lat * 0.76) + 3.1;

    }
    else{

        tilt = lat;

    }

    return round(tilt);

}

/* ==========================================
   SEASONAL TILTS
========================================== */

function calculateSummerTilt(latitude){

    return Math.max(

        0,

        round(calculateAnnualTilt(latitude)-15)

    );

}

function calculateWinterTilt(latitude){

    return round(

        calculateAnnualTilt(latitude)+15

    );

}

function calculateSpringTilt(latitude){

    return round(

        calculateAnnualTilt(latitude)

    );

}

/* ==========================================
   MONTHLY OFFSETS
========================================== */

const monthlyOffsetsNorth=[

15,
12,
8,
4,
0,
-8,
-15,
-10,
-4,
2,
8,
13

];

const monthlyOffsetsSouth=[

-15,
-10,
-4,
2,
8,
13,
15,
12,
8,
4,
0,
-8

];

/* ==========================================
   MONTHLY TILT
========================================== */

function calculateMonthlyTilt(

latitude,

month

){

    const annual=

    calculateAnnualTilt(latitude);

    const offset=

    latitude>=0

    ?

    monthlyOffsetsNorth[month-1]

    :

    monthlyOffsetsSouth[month-1];

    return round(

        annual+offset

    );

}

/* ==========================================
   COMPATIBILITY
========================================== */

function getCompatibility(

difference

){

    if(difference<=5){

        return{

            status:"Excellent",

            recommendation:

            "Existing roof pitch is very close to the recommended solar panel tilt. Standard fixed mounting is recommended."

        };

    }

    if(difference<=10){

        return{

            status:"Very Good",

            recommendation:

            "Roof pitch is acceptable. A small tilt adjustment may slightly improve annual energy production."

        };

    }

    if(difference<=15){

        return{

            status:"Acceptable",

            recommendation:

            "Consider adjustable mounting brackets for improved seasonal performance."

        };

    }

    return{

        status:"Needs Adjustment",

        recommendation:

        "Roof pitch differs considerably from the recommended tilt. Adjustable mounting structure is recommended."

    };

}

/* ==========================================
   DETERMINE RECOMMENDED TILT
========================================== */

function getRecommendedTilt(

latitude

){

    const mode=

    optimizationSelect.value;

    switch(mode){

        case "summer":

            return calculateSummerTilt(latitude);

        case "winter":

            return calculateWinterTilt(latitude);

        case "spring":

            return calculateSpringTilt(latitude);

        case "monthly":

            return calculateMonthlyTilt(

                latitude,

                Number(monthSelect.value)

            );

        default:

            return calculateAnnualTilt(latitude);

    }

}
/* ==========================================
   CALCULATE
========================================== */

function calculateTilt(){

    if(!validateInputs()){

        return;

    }

    // ------------------------------------------
    // READ INPUTS
    // ------------------------------------------

    const latitude =
    getLatitude();

    const roofPitch =
    getRoofPitch();

    const annualTilt =
    calculateAnnualTilt(latitude);

    const summerTilt =
    calculateSummerTilt(latitude);

    const winterTilt =
    calculateWinterTilt(latitude);

    const springTilt =
    calculateSpringTilt(latitude);

    const recommendedTilt =
    getRecommendedTilt(latitude);

    const hemisphere =
    getHemisphere(latitude);

    const direction =
    getPanelDirection(latitude);

    // ------------------------------------------
    // OPTIMIZATION LABEL
    // ------------------------------------------

    let optimizationLabel =
    optimizationSelect.options[
        optimizationSelect.selectedIndex
    ].text;

    // ------------------------------------------
    // ROOF ANALYSIS
    // ------------------------------------------

    let roofPitchDisplay="--";
    let differenceDisplay="--";
    let compatibility="Not Evaluated";
    let recommendation="";

    if(roofPitch!==null){

        const difference =
        Math.abs(
            roofPitch-
            recommendedTilt
        );

        const review =
        getCompatibility(difference);

        roofPitchDisplay =
        round(roofPitch)+"°";

        differenceDisplay =
        round(difference)+"°";

        compatibility =
        review.status;

        recommendation =
        review.recommendation;

    }
    else{

        recommendation=
        "Roof pitch was not provided. The recommended tilt is based solely on the selected optimization mode.";

    }

    // ------------------------------------------
    // HERO RESULT
    // ------------------------------------------

    recommendedTiltResult.textContent =
    recommendedTilt+"°";

    // ------------------------------------------
    // RESULTS
    // ------------------------------------------

    optimizationResult.textContent =
    optimizationLabel;

    hemisphereResult.textContent =
    hemisphere;

    directionResult.textContent =
    direction;

    annualTiltResult.textContent =
    annualTilt+"°";

    summerTiltResult.textContent =
    summerTilt+"°";

    springTiltResult.textContent =
    springTilt+"°";

    winterTiltResult.textContent =
    winterTilt+"°";

    roofPitchResult.textContent =
    roofPitchDisplay;

    differenceResult.textContent =
    differenceDisplay;

    compatibilityResult.textContent =
    compatibility;

    recommendationResult.textContent =
    recommendation;

    // ------------------------------------------
    // SHOW RESULT SHEET
    // ------------------------------------------

    openResultSheet();

}

/* ==========================================
   RESULT SHEET
========================================== */

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

/* ==========================================
   COPY RESULTS
========================================== */

copyResults.addEventListener(

    "click",

    function(){

        const report =

`Solar Tilt Angle Calculator

Recommended Tilt:
${recommendedTiltResult.textContent}

Optimization:
${optimizationResult.textContent}

Hemisphere:
${hemisphereResult.textContent}

Panel Direction:
${directionResult.textContent}

Annual Tilt:
${annualTiltResult.textContent}

Summer Tilt:
${summerTiltResult.textContent}

Spring / Autumn Tilt:
${springTiltResult.textContent}

Winter Tilt:
${winterTiltResult.textContent}

Roof Pitch:
${roofPitchResult.textContent}

Difference:
${differenceResult.textContent}

Compatibility:
${compatibilityResult.textContent}

Engineering Recommendation:
${recommendationResult.textContent}

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

    }

);

/* ==========================================
   NOTIFIER
========================================== */

function showNotifier(message){

    notifierText.textContent = message;

    notifier.classList.add("show");

    setTimeout(function(){

        notifier.classList.remove("show");

    },2500);

}
/* ==========================================
   RESET CALCULATOR
========================================== */

function resetCalculator(){

    latitudeInput.value = "";

    optimizationSelect.value = "annual";

    monthSelect.value = "1";

    monthGroup.style.display = "none";

    roofPitchInput.value = "";

    recommendedTiltResult.textContent = "--";

    optimizationResult.textContent = "--";

    hemisphereResult.textContent = "--";

    directionResult.textContent = "--";

    annualTiltResult.textContent = "--";

    summerTiltResult.textContent = "--";

    springTiltResult.textContent = "--";

    winterTiltResult.textContent = "--";

    roofPitchResult.textContent = "--";

    differenceResult.textContent = "--";

    compatibilityResult.textContent = "--";

    recommendationResult.textContent = "--";

    closeResultSheet();

    showNotifier("Calculator reset successfully.");

}

/* ==========================================
   EVENT LISTENERS
========================================== */

optimizationSelect.addEventListener(

    "change",

    toggleMonthSelection

);

calculateBtn.addEventListener(

    "click",

    calculateTilt

);

resetBtn.addEventListener(

    "click",

    resetCalculator

);

/* ==========================================
   INITIALIZE
========================================== */

toggleMonthSelection();

recommendedTiltResult.textContent="--";

optimizationResult.textContent="--";

hemisphereResult.textContent="--";

directionResult.textContent="--";

annualTiltResult.textContent="--";

summerTiltResult.textContent="--";

springTiltResult.textContent="--";

winterTiltResult.textContent="--";

roofPitchResult.textContent="--";

differenceResult.textContent="--";

compatibilityResult.textContent="--";

recommendationResult.textContent="--";

closeResultSheet();