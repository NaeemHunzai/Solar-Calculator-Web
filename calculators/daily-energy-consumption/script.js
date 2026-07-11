// ==========================================
// DAILY ENERGY CONSUMPTION CALCULATOR
// ==========================================

// ==========================================
// INPUTS
// ==========================================

const mode =
document.getElementById("mode");

const appliance =
document.getElementById("appliance");

const power =
document.getElementById("power");

const quantity =
document.getElementById("quantity");

const hours =
document.getElementById("hours");

const days =
document.getElementById("days");

const rate =
document.getElementById("rate");

const standby =
document.getElementById("standby");

const loadFactor =
document.getElementById("loadFactor");

const utilization =
document.getElementById("utilization");
const professionalFields =
document.getElementById("professionalFields");

// ==========================================
// BUTTONS
// ==========================================

const addAppliance =
document.getElementById("addAppliance");

const calculateBtn =
document.getElementById("calculateBtn");

const resetBtn =
document.getElementById("resetBtn");

// ==========================================
// APPLIANCE LIST
// ==========================================

const applianceList =
document.getElementById("applianceList");

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

const monthlyEnergyResult =
document.getElementById("monthlyEnergyResult");

const totalAppliancesResult =
document.getElementById("totalAppliancesResult");

const dailyEnergyResult =
document.getElementById("dailyEnergyResult");

const dailyCostResult =
document.getElementById("dailyCostResult");

const monthlyCostResult =
document.getElementById("monthlyCostResult");

const yearlyEnergyResult =
document.getElementById("yearlyEnergyResult");

const yearlyCostResult =
document.getElementById("yearlyCostResult");

const co2Result =
document.getElementById("co2Result");

// ==========================================
// NOTIFIER
// ==========================================

const notifier =
document.getElementById("notifier");

const notifierText =
document.getElementById("notifierText");

// ==========================================
// DATA STORAGE
// ==========================================

let appliances = [];

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
// AUTO UPDATE WATTAGE
// ==========================================

appliance.addEventListener("change",function(){

    if(appliance.value!="0"){

        power.value=appliance.value;

    }

});
// ==========================================
// RENDER APPLIANCE LIST
// ==========================================

function renderAppliances(){

    applianceList.innerHTML = "";

    if(appliances.length===0){

        applianceList.innerHTML = `

        <tr>

            <td colspan="3"
                style="text-align:center;padding:20px;color:#888;">

                No appliances added yet

            </td>

        </tr>

        `;

        return;

    }

    appliances.forEach(function(item,index){

        applianceList.innerHTML += `

        <tr>

            <td>${item.name}</td>

            <td>${item.quantity}</td>

            <td>

                <button
                    class="remove-btn"
                    onclick="removeAppliance(${index})">

                    🗑

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// ADD APPLIANCE
// ==========================================

addAppliance.addEventListener("click",function(){

    // Validation

    if(power.value.trim()===""){

        showNotifier("Please enter Power.");

        power.focus();

        return;

    }

    if(quantity.value.trim()===""){

        showNotifier("Please enter Quantity.");

        quantity.focus();

        return;

    }

    if(hours.value.trim()===""){

        showNotifier("Please enter Hours Used Per Day.");

        hours.focus();

        return;

    }

    const watt = Number(power.value);

    const qty = Number(quantity.value);

    const hrs = Number(hours.value);

    if(watt<=0){

        showNotifier("Power must be greater than zero.");

        return;

    }

    if(qty<1){

        showNotifier("Quantity must be at least 1.");

        return;

    }

    if(hrs<0 || hrs>24){

        showNotifier("Hours must be between 0 and 24.");

        return;

    }

    let standbyPower = 0;

    let load = 100;

    let util = 100;

    if(mode.value==="professional"){

        standbyPower = Number(standby.value);

        load = Number(loadFactor.value);

        util = Number(utilization.value);

    }

    const effectivePower =

        (watt + standbyPower)

        *

        (load/100)

        *

        (util/100);

    const dailyEnergy =

        effectivePower

        *

        qty

        *

        hrs

        /

        1000;

    appliances.push({

        name:

        appliance.options[appliance.selectedIndex].text,

        power:watt,

        quantity:qty,

        hours:hrs,

        dailyEnergy:dailyEnergy

    });

    renderAppliances();

    quantity.value = 1;

    hours.value = "";

    showNotifier("Appliance added.");

});

// ==========================================
// REMOVE APPLIANCE
// ==========================================

function removeAppliance(index){

    appliances.splice(index,1);

    renderAppliances();

    showNotifier("Appliance removed.");

}

// ==========================================
// INITIALIZE
// ==========================================

renderAppliances();
// ==========================================
// CALCULATE TOTALS
// ==========================================

calculateBtn.addEventListener("click",function(){

    if(appliances.length===0){

        showNotifier("Please add at least one appliance.");

        return;

    }

    if(days.value.trim()===""){

        showNotifier("Please enter Days Used Per Month.");

        days.focus();

        return;

    }

    if(rate.value.trim()===""){

        showNotifier("Please enter Electricity Rate.");

        rate.focus();

        return;

    }

    const monthDays = Number(days.value);

    const tariff = Number(rate.value);

    if(monthDays<1 || monthDays>31){

        showNotifier("Days must be between 1 and 31.");

        return;

    }

    if(tariff<0 || tariff>10){

        showNotifier("Electricity Rate must be between 0 and 10.");

        return;

        
    }

    // ----------------------------------
// PROFESSIONAL MODE VALIDATION
// ----------------------------------

if(mode.value==="professional"){

    const standbyPower = Number(standby.value);

    const load = Number(loadFactor.value);

    const util = Number(utilization.value);

    if(standbyPower < 0 || standbyPower > 500){

        showNotifier("Standby Power must be between 0 W and 500 W.");

        standby.focus();

        return;

    }

    if(load < 1 || load > 100){

        showNotifier("Load Factor must be between 1% and 100%.");

        loadFactor.focus();

        return;

    }

    if(util < 1 || util > 100){

        showNotifier("Utilization Factor must be between 1% and 100%.");

        utilization.focus();

        return;

    }

}

    // -----------------------------
    // TOTAL DAILY ENERGY
    // -----------------------------

    let totalDailyEnergy = 0;

    appliances.forEach(function(item){

        totalDailyEnergy += item.dailyEnergy;

    });

    const monthlyEnergy =
        totalDailyEnergy * monthDays;

    const yearlyEnergy =
        monthlyEnergy * 12;

    const dailyCost =
        totalDailyEnergy * tariff;

    const monthlyCost =
        monthlyEnergy * tariff;

    const yearlyCost =
        yearlyEnergy * tariff;

    const co2 =
        monthlyEnergy * 0.42;

    // -----------------------------
    // POPULATE RESULTS
    // -----------------------------

    monthlyEnergyResult.textContent =
        monthlyEnergy.toFixed(2) + " kWh";

    totalAppliancesResult.textContent =
        appliances.length;

    dailyEnergyResult.textContent =
        totalDailyEnergy.toFixed(2) + " kWh";

    dailyCostResult.textContent =
        "$" + dailyCost.toFixed(2);

    monthlyCostResult.textContent =
        "$" + monthlyCost.toFixed(2);

    yearlyEnergyResult.textContent =
        yearlyEnergy.toFixed(2) + " kWh";

    yearlyCostResult.textContent =
        "$" + yearlyCost.toFixed(2);

    co2Result.textContent =
        co2.toFixed(2) + " kg/month";

    openSheet();

});

// ==========================================
// RESET
// ==========================================

resetBtn.addEventListener("click",function(){

    appliances = [];

    appliance.value = "75";

    power.value = 75;

    quantity.value = 1;

    hours.value = "";

    days.value = 30;

    rate.value = 0.15;

    standby.value = 0;

    loadFactor.value = 100;

    utilization.value = 100;

    mode.value = "simple";

    updateMode();

    renderAppliances();

});

// ==========================================
// SHARE RESULTS
// ==========================================

copyResults.addEventListener("click",async function(){

let text =

`Daily Energy Consumption

Total Appliances : ${appliances.length}

Daily Energy : ${dailyEnergyResult.textContent}

Monthly Energy : ${monthlyEnergyResult.textContent}

Average Daily Cost : ${dailyCostResult.textContent}

Monthly Cost : ${monthlyCostResult.textContent}

Yearly Energy : ${yearlyEnergyResult.textContent}

Yearly Cost : ${yearlyCostResult.textContent}

Estimated CO₂ : ${co2Result.textContent}

-----------------------------------

Appliance Details

`;

    appliances.forEach(function(item){

        text +=

`${item.name}

Power : ${item.power} W

Quantity : ${item.quantity}

Hours : ${item.hours}

Daily Energy : ${item.dailyEnergy.toFixed(2)} kWh

-------------------------

`;

    });

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
