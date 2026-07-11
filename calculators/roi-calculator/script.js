// ==========================================
// ROI CALCULATOR
// ==========================================

// ===============================
// INPUTS
// ===============================

const mode = document.getElementById("mode");

const systemSize = document.getElementById("systemSize");

const installationCost = document.getElementById("installationCost");

const monthlyBill = document.getElementById("monthlyBill");

const monthlySavings = document.getElementById("monthlySavings");

const tariffIncrease = document.getElementById("tariffIncrease");

const systemLifetime = document.getElementById("systemLifetime");

const maintenanceCost = document.getElementById("maintenanceCost");

const degradation = document.getElementById("degradation");

const discountRate = document.getElementById("discountRate");

const professionalFields =
document.getElementById("professionalFields");

// ===============================
// BUTTONS
// ===============================

const calculateBtn =
document.querySelector(".primary-button");

const resetBtn =
document.querySelector(".secondary-button");

// ===============================
// RESULT SHEET
// ===============================

const resultSheet =
document.getElementById("resultSheet");

const doneButton =
document.getElementById("doneButton");

const closeSheet =
document.getElementById("closeSheet");

const copyResults =
document.getElementById("copyResults");

// ===============================
// RESULT FIELDS
// ===============================

const paybackResult =
document.getElementById("paybackResult");

const annualSavingsResult =
document.getElementById("annualSavingsResult");

const lifetimeSavingsResult =
document.getElementById("lifetimeSavingsResult");

const netProfitResult =
document.getElementById("netProfitResult");

const roiResult =
document.getElementById("roiResult");

const investmentResult =
document.getElementById("investmentResult");

// ===============================
// NOTIFIER
// ===============================

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
// CALCULATE
// ==========================================

calculateBtn.addEventListener("click", function(){

    // ------------------------------
    // EMPTY FIELD VALIDATION
    // ------------------------------

    if(systemSize.value.trim()===""){

        showNotifier("Please enter Solar System Size.");

        systemSize.focus();

        return;

    }

    if(installationCost.value.trim()===""){

        showNotifier("Please enter Installation Cost.");

        installationCost.focus();

        return;

    }

    if(monthlyBill.value.trim()===""){

        showNotifier("Please enter Monthly Electricity Bill.");

        monthlyBill.focus();

        return;

    }

    if(monthlySavings.value.trim()===""){

        showNotifier("Please enter Estimated Monthly Savings.");

        monthlySavings.focus();

        return;

    }

    // ------------------------------
    // READ INPUTS
    // ------------------------------

    const size = Number(systemSize.value);

    const cost = Number(installationCost.value);

    const bill = Number(monthlyBill.value);

    const savings = Number(monthlySavings.value);

    const tariff = Number(tariffIncrease.value);

    let lifetime = 25;

    let maintenance = 100;

    let panelLoss = 0.5;

    let discount = 0;

    if(mode.value==="professional"){

        lifetime = Number(systemLifetime.value);

        maintenance = Number(maintenanceCost.value);

        panelLoss = Number(degradation.value);

        discount = Number(discountRate.value);

    }

    // ------------------------------
    // VALIDATION
    // ------------------------------

    if(size<=0){

        showNotifier("Solar System Size must be greater than zero.");

        return;

    }

    if(cost<=0){

        showNotifier("Installation Cost must be greater than zero.");

        return;

    }

    if(savings<=0){

        showNotifier("Monthly Savings must be greater than zero.");

        return;

    }

    // Monthly Savings cannot exceed Monthly Bill

if(savings > bill){

    showNotifier("Estimated Monthly Savings cannot exceed the Monthly Electricity Bill.");

    monthlySavings.focus();

    return;

}

    // ------------------------------
    // PAYBACK PERIOD
    // ------------------------------

    const annualSavings = savings*12;

    const paybackYears = cost/annualSavings;

    const years = Math.floor(paybackYears);

    const months = Math.round((paybackYears-years)*12);

    // ------------------------------
    // LIFETIME SAVINGS
    // ------------------------------

    let totalSavings = 0;

    for(let year=1; year<=lifetime; year++){

        let yearlySaving = annualSavings;

        yearlySaving *= Math.pow(1+tariff/100,year-1);

        yearlySaving *= Math.pow(1-panelLoss/100,year-1);

        yearlySaving -= maintenance;

        if(yearlySaving<0){

            yearlySaving=0;

        }

        // Future use (Discount Rate)

        if(discount>0){

            yearlySaving =
                yearlySaving /
                Math.pow(1+discount/100,year);

        }

        totalSavings += yearlySaving;

    }

    // ------------------------------
    // NET PROFIT
    // ------------------------------

    const netProfit =
        totalSavings-cost;

    const roi =
        (netProfit/cost)*100;

    // ------------------------------
    // RESULT SHEET
    // ------------------------------

    paybackResult.textContent =
        years+" Years "+months+" Months";

    annualSavingsResult.textContent =
        "$"+annualSavings.toFixed(0);

    lifetimeSavingsResult.textContent =
        "$"+totalSavings.toFixed(0);

    netProfitResult.textContent =
        "$"+netProfit.toFixed(0);

    roiResult.textContent =
        roi.toFixed(1)+"%";

    investmentResult.textContent =
        "$"+cost.toFixed(0);

    openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    systemSize.value="";

    installationCost.value="";

    monthlyBill.value="";

    monthlySavings.value="";

    tariffIncrease.value=5;

    systemLifetime.value=25;

    maintenanceCost.value=100;

    degradation.value=0.5;

    discountRate.value=0;

    mode.value="simple";

    updateMode();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

    const text=

`ROI Calculator

Payback Period : ${paybackResult.textContent}

Annual Savings : ${annualSavingsResult.textContent}

Lifetime Savings : ${lifetimeSavingsResult.textContent}

Net Profit : ${netProfitResult.textContent}

ROI : ${roiResult.textContent}

Installation Cost : ${investmentResult.textContent}`;

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