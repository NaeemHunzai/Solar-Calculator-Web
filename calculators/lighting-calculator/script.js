// ==========================================
// LIGHTING CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================


const lux =
document.getElementById("lux");

const roomLength =
document.getElementById("roomLength");

const lengthUnit =
document.getElementById("lengthUnit");

const roomWidth =
document.getElementById("roomWidth");

const widthUnit =
document.getElementById("widthUnit");

const fixture =
document.getElementById("fixture");

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

const lightsResult =
document.getElementById("lightsResult");

const areaResult =
document.getElementById("areaResult");





const fixtureResult =
document.getElementById("fixtureResult");

const fixtureLumensResult =
document.getElementById("fixtureLumensResult");

const requiredLumensResult =
document.getElementById("requiredLumensResult");

const installedLumensResult =
document.getElementById("installedLumensResult");

const estimatedLuxResult =
document.getElementById("estimatedLuxResult");

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
// ROOM DATABASE
// ==========================================



// ==========================================
// FIXTURE DATABASE
// ==========================================

const fixtureDatabase = {

led_bulb_3:{name:"LED Bulb - 3 W",watt:3,lumens:250},
led_bulb_5:{name:"LED Bulb - 5 W",watt:5,lumens:450},
led_bulb_7:{name:"LED Bulb - 7 W",watt:7,lumens:650},
led_bulb_9:{name:"LED Bulb - 9 W",watt:9,lumens:850},
led_bulb_10:{name:"LED Bulb - 10 W",watt:10,lumens:1000},
led_bulb_12:{name:"LED Bulb - 12 W",watt:12,lumens:1200},
led_bulb_15:{name:"LED Bulb - 15 W",watt:15,lumens:1500},
led_bulb_18:{name:"LED Bulb - 18 W",watt:18,lumens:2000},
led_bulb_20:{name:"LED Bulb - 20 W",watt:20,lumens:2200},
led_bulb_24:{name:"LED Bulb - 24 W",watt:24,lumens:2600},
led_bulb_30:{name:"LED Bulb - 30 W",watt:30,lumens:3300},

tube_9:{name:"LED Tube - 9 W",watt:9,lumens:900},
tube_18:{name:"LED Tube - 18 W",watt:18,lumens:2000},
tube_20:{name:"LED Tube - 20 W",watt:20,lumens:2200},
tube_24:{name:"LED Tube - 24 W",watt:24,lumens:2800},
tube_36:{name:"LED Tube - 36 W",watt:36,lumens:4000},
tube_40:{name:"LED Tube - 40 W",watt:40,lumens:4400},

panel_12:{name:"LED Panel - 12 W",watt:12,lumens:1200},
panel_18:{name:"LED Panel - 18 W",watt:18,lumens:1800},
panel_24:{name:"LED Panel - 24 W",watt:24,lumens:2800},
panel_36:{name:"LED Panel - 36 W",watt:36,lumens:4000},
panel_48:{name:"LED Panel - 48 W",watt:48,lumens:5500},
panel_60:{name:"LED Panel - 60 W",watt:60,lumens:7000},

downlight_5:{name:"LED Downlight - 5 W",watt:5,lumens:450},
downlight_7:{name:"LED Downlight - 7 W",watt:7,lumens:650},
downlight_9:{name:"LED Downlight - 9 W",watt:9,lumens:850},
downlight_12:{name:"LED Downlight - 12 W",watt:12,lumens:1200},
downlight_15:{name:"LED Downlight - 15 W",watt:15,lumens:1500},
downlight_18:{name:"LED Downlight - 18 W",watt:18,lumens:2000}

};

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

resultSheet.addEventListener("click",function(e){

    if(e.target===resultSheet){

        closeResultSheet();

    }

});
// ==========================================
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click",function(){

// ------------------------------------------
// INPUT VALUES
// ------------------------------------------
const length =
Number(roomLength.value);

const width =
Number(roomWidth.value);

const selectedFixture =
fixture.value;

// Convert to metres

const lengthMeters =
lengthUnit.value === "ft"
? length * 0.3048
: length;

const widthMeters =
widthUnit.value === "ft"
? width * 0.3048
: width;

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if(isNaN(length) || length<=0){

    showNotifier("Enter a valid room length.");

    roomLength.focus();

    return;

}

if(length>500){

    showNotifier("Maximum supported room length is 500 m.");

    roomLength.focus();

    return;

}

if(isNaN(width) || width<=0){

    showNotifier("Enter a valid room width.");

    roomWidth.focus();

    return;

}

if(width>500){

    showNotifier("Maximum supported room width is 500 m.");

    roomWidth.focus();

    return;

}

// ------------------------------------------
// ROOM DATA
// ------------------------------------------

const targetLux =
Number(lux.value);
const fixtureData =
fixtureDatabase[selectedFixture];

// ------------------------------------------
// CALCULATIONS
// ------------------------------------------

// Room Area

const area =
lengthMeters * widthMeters;

// Standard Design Factors

const utilizationFactor = 0.80;

const maintenanceFactor = 0.80;

// Required Lumens

const requiredLumens =

(targetLux*area)/
(utilizationFactor*maintenanceFactor);

// Number of Fixtures

const requiredFixtures =

Math.ceil(

requiredLumens/
fixtureData.lumens

);

// Installed Lumens

const installedLumens =

requiredFixtures*
fixtureData.lumens;

// Estimated Lux

const estimatedLux =

installedLumens*
utilizationFactor*
maintenanceFactor/
area;

// ------------------------------------------
// ENGINEERING SUMMARY
// ------------------------------------------

const summary =

`Based on the room dimensions, approximately ${requiredFixtures} × ${fixtureData.name} are recommended for this space. Actual lighting performance may vary depending on ceiling height, fixture spacing, room finishes and manufacturer specifications.`;

// ------------------------------------------
// RESULT SHEET
// ------------------------------------------

lightsResult.textContent =
requiredFixtures+" Lights";

areaResult.textContent =
area.toFixed(2)+" m²";




fixtureResult.textContent =
fixtureData.name;

fixtureLumensResult.textContent =
fixtureData.lumens.toLocaleString()+" lm";

requiredLumensResult.textContent =
requiredLumens.toFixed(0).toLocaleString()+" lm";

installedLumensResult.textContent =
installedLumens.toLocaleString()+" lm";

estimatedLuxResult.textContent =
estimatedLux.toFixed(0)+" lux";

engineeringSummary.textContent =
summary;

// ------------------------------------------
// OPEN RESULT SHEET
// ------------------------------------------

openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click", function () {

    lux.value = "150";

    roomLength.value = "";

    roomWidth.value = "";

    fixture.value = "led_bulb_9";

    closeResultSheet();

    showNotifier("Calculator reset successfully.");

});