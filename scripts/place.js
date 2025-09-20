// Get DOM elements
const temperatureElement = document.getElementById('temperature');
const windSpeedElement = document.getElementById('windSpeed');
const windChillElement = document.getElementById('windChill');

// Static weather values (will be replaced with API data in future)
const temperature = 28; // °C
const windSpeed = 15;  // km/h

// Calculate wind chill
function calculateWindChill(temp, speed) {
    // Convert Celsius to Fahrenheit for the formula
    const tempF = (temp * 9/5) + 32;
    const speedMph = speed / 1.609344;

    // Check if conditions meet the requirements for wind chill calculation
    if (temp <= 10 && speed > 4.8) {
        // Wind chill formula
        const windChill = 13.12 + 0.6215 * tempF - 11.37 * Math.pow(speedMph, 0.16) + 0.3965 * tempF * Math.pow(speedMph, 0.16);
        // Convert back to Celsius
        return ((windChill - 32) * 5/9).toFixed(1);
    }
    return 'N/A';
}

// Update weather information
function updateWeather() {
    temperatureElement.textContent = temperature;
    windSpeedElement.textContent = windSpeed;
    windChillElement.textContent = calculateWindChill(temperature, windSpeed);
}

// Update copyright year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

// Initialize weather display
updateWeather();