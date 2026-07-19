// ===================================
// SOLAR TOOLKIT SEARCH
// ===================================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if (searchInput && searchResults) {

    const calculators = [

        // Quick Access
        {
            name: "Battery Backup",
            icon: "battery_charging_full",
            url: "calculators/battery-backup/index.html"
        },
        {
            name: "Solar System",
            icon: "solar_power",
            url: "calculators/solar-system-size/index.html"
        },
        {
            name: "Inverter Size",
            icon: "bolt",
            url: "calculators/inverter-size/index.html"
        },
        {
            name: "ROI Calculator",
            icon: "payments",
            url: "calculators/roi-calculator/index.html"
        },

        // General Calculators
        {
            name: "Daily Energy Consumption",
            icon: "electric_bolt",
            url: "calculators/daily-energy-consumption/index.html"
        },
        {
            name: "Single & Three Phase Power",
            icon: "bolt",
            url: "calculators/single-three-phase-power/index.html"
        },
        {
            name: "Power Factor Correction",
            icon: "power",
            url: "calculators/power-factor-correction/index.html"
        },
        {
            name: "Resistor Color Code",
            icon: "memory",
            url: "calculators/ohms-law/index.html"
        },
        {
            name: "Capacitor Bank",
            icon: "settings_input_component",
            url: "calculators/capacitor-bank/index.html"
        },
        {
            name: "Generator Size",
            icon: "electrical_services",
            url: "calculators/generator-size/index.html"
        },
        {
            name: "Transformer kVA",
            icon: "transform",
            url: "calculators/transformer-kva/index.html"
        },
        {
            name: "Load Current",
            icon: "electrical_services",
            url: "calculators/load-current/index.html"
        },
        {
            name: "Lighting Calculator",
            icon: "lightbulb",
            url: "calculators/lighting-calculator/index.html"
        },

        // Technical Calculators
        {
            name: "DC Cable Size",
            icon: "cable",
            url: "calculators/dc-cable-size/index.html"
        },
        {
            name: "AC Cable Size",
            icon: "electrical_services",
            url: "calculators/ac-cable-size/index.html"
        },
        {
            name: "Voltage Drop",
            icon: "show_chart",
            url: "calculators/voltage-drop/index.html"
        },
        {
            name: "Breaker Size",
            icon: "toggle_on",
            url: "calculators/breaker-size/index.html"
        },
        {
            name: "Fuse Size",
            icon: "flash_on",
            url: "calculators/fuse-size/index.html"
        },
        {
            name: "Charge Controller Size",
            icon: "tune",
            url: "calculators/charge-controller-size/index.html"
        },
        {
            name: "Solar String Sizing",
            icon: "solar_power",
            url: "calculators/solar-string-sizing/index.html"
        },
        {
            name: "Battery Charging Time",
            icon: "battery_charging_full",
            url: "calculators/battery-charging-time/index.html"
        },
        {
            name: "Battery State of Charge (SOC)",
            icon: "battery_6_bar",
            url: "calculators/battery-soc/index.html"
        },

        // Solar Design Tools
        {
            name: "Solar Tilt Angle",
            icon: "wb_sunny",
            url: "calculators/solar-tilt-angle/index.html"
        }

    ];

    searchInput.addEventListener("input", function () {

        const keyword = this.value.trim().toLowerCase();

        searchResults.innerHTML = "";

        if (keyword === "") {

            searchResults.classList.remove("show");
            return;

        }

        const matches = calculators.filter(function (item) {

            return item.name.toLowerCase().includes(keyword);

        });

        if (matches.length === 0) {

            searchResults.innerHTML =

                `<div class="search-empty">

                    No calculators found

                </div>`;

            searchResults.classList.add("show");

            return;

        }

        matches.forEach(function (item) {

            searchResults.innerHTML += `

                <div class="search-item">

                    <span class="material-symbols-rounded">

                        ${item.icon}

                    </span>

                    <span>

                        ${item.name}

                    </span>

                </div>

            `;

        });

        searchResults.classList.add("show");

        document.querySelectorAll(".search-item").forEach(function(card,index){

            card.onclick = function(){

                location.href = matches[index].url;

            };

        });

    });

    document.addEventListener("click", function (e) {

        if (
            !searchInput.contains(e.target) &&
            !searchResults.contains(e.target)
        ) {

            searchResults.classList.remove("show");

        }

    });

}