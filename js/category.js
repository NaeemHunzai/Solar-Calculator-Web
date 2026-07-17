const categories = {

    general: {

        title: "General Calculators",

        subtitle: "9 Professional Tools",

        calculators: [

            {
                name: "Daily Energy Consumption",
                icon: "electric_bolt",
                folder: "daily-energy-consumption"
            },

            {
                name: "Single & Three Phase Power",
                icon: "bolt",
                folder: "single-three-phase-power"
            },

            {
                name: "Power Factor Correction",
                icon: "power",
                folder: "power-factor-correction"
            },

            {
    name: "Resistor Color Code",
    icon: "memory",
    folder: "ohms-law"
},

            {
                name: "Capacitor Bank",
                icon: "settings_input_component",
                folder: "capacitor-bank"
            },

           {
    name: "Generator Size",
    icon: "electrical_services",
    folder: "generator-size"
},

            {
                name: "Transformer kVA",
                icon: "transform",
                folder: "transformer-kva"
            },

            {
                name: "Load Current",
                icon: "electrical_services",
                folder: "load-current"
            },

            {
                name: "Lighting Calculator",
                icon: "lightbulb",
                folder: "lighting-calculator"
            }

        ]

    },

    technical: {

    title: "Technical Calculators",

    subtitle: "9 Professional Tools",

    calculators: [

        {
            name: "DC Cable Size",
            icon: "cable",
            folder: "dc-cable-size"
        },

        {
            name: "AC Cable Size",
            icon: "electrical_services",
            folder: "ac-cable-size"
        },

        {
            name: "Voltage Drop",
            icon: "show_chart",
            folder: "voltage-drop"
        },

        {
            name: "Breaker Size",
            icon: "toggle_on",
            folder: "breaker-size"
        },

        {
            name: "Fuse Size",
            icon: "flash_on",
            folder: "fuse-size"
        },

        {
            name: "Charge Controller Size",
            icon: "tune",
            folder: "charge-controller-size"
        },

        {
            name: "Solar String Sizing",
            icon: "solar_power",
            folder: "solar-string-sizing"
        },

       

        {
            name: "Battery Charging Time",
            icon: "battery_charging_full",
            folder: "battery-charging-time"
        },

      

        {
            name: "Battery State of Charge (SOC)",
            icon: "battery_6_bar",
            folder: "battery-soc"
        },

       
    ]

},

    solar: {

    title: "Solar Design Tools",

    subtitle: "2 Professional Tools",

    calculators: [

        {
            name: "Solar Tilt Angle",
            icon: "wb_sunny",
            folder: "solar-tilt-angle"
        },

        {
            name: "Solar Panel Orientation",
            icon: "explore",
            folder: "solar-panel-orientation"
        }

    ]

},
    
converter: {

    title: "Unit Converters",

    subtitle: "5 Professional Tools",

    calculators: [

        {
            name: "Watt ↔ kW ↔ MW Converter",
            icon: "swap_horiz",
            folder: "power-converter"
        },

        {
            name: "Ah ↔ Wh Converter",
            icon: "battery_horiz_075",
            folder: "ah-wh-converter"
        },

        {
            name: "AWG ↔ mm² Converter",
            icon: "straighten",
            folder: "awg-mm2-converter"
        },

        {
            name: "Energy Converter (Wh ↔ kWh ↔ MWh)",
            icon: "bolt",
            folder: "energy-converter"
        },

        {
            name: "Temperature Converter (°C ↔ °F)",
            icon: "device_thermostat",
            folder: "temperature-converter"
        }

    ]

},

};

const hash = window.location.hash.substring(1);

const current = categories[hash] || categories.general;

document.getElementById("pageTitle").textContent = current.title;

document.getElementById("pageSubtitle").textContent = current.subtitle;

const container = document.getElementById("calculatorContainer");

current.calculators.forEach(calc => {

    container.innerHTML += `

    <div class="calculator-card"
         onclick="location.href='${calc.folder}/index.html'">

        <div class="calculator-icon">

            <span class="material-symbols-rounded">

                ${calc.icon}

            </span>

        </div>

        <div class="calculator-info">

            <h4>${calc.name}</h4>

        </div>

        <span class="material-symbols-rounded arrow-icon">

            chevron_right

        </span>

    </div>

    `;

});