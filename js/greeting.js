document.addEventListener("DOMContentLoaded", function () {

    const greeting = document.getElementById("greetingText");

    if (!greeting) return;

    const hour = new Date().getHours();

    let message = "";

    if (hour >= 5 && hour < 12) {

        message = "Good Morning ☀️";

    } else if (hour >= 12 && hour < 17) {

        message = "Good Afternoon 👋";

    } else if (hour >= 17 && hour < 21) {

        message = "Good Evening 🌇";

    } else {

        message = "Good Night 🌙";

    }

    greeting.textContent = message;

});