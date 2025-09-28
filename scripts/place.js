// Get DOM elements
const temperatureElement = document.getElementById('temperature');
const windSpeedElement = document.getElementById('windSpeed');
const windChillElement = document.getElementById('windChill');

// Static weather values (will be replaced with API data in future)
const temperature = 28; // °C
const windSpeed = 15;  // km/h

// Calculate wind chill
function calculateWindChill(tempC, speedKmh) {
    // Convert Celsius to Fahrenheit
    const tempF = (tempC * 9/5) + 32;
    // Convert km/h to mph
    const speedMph = speedKmh / 1.609344;

    // Check if temperature and wind speed meet the requirements
    if (tempF <= 50 && speedMph > 3) {
        // Official Wind Chill Formula
        const windChillF = 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(speedMph, 0.16)) + (0.4275 * tempF * Math.pow(speedMph, 0.16));
        // Convert back to Celsius
        const windChillC = (windChillF - 32) * 5/9;
        return windChillC.toFixed(1) + '°C';
    }
    return 'N/A - Temperature too high or wind too low';
}

// Update weather display
function updateWeather() {
    // Display temperature
    temperatureElement.textContent = temperature;
    windSpeedElement.textContent = windSpeed;
    
    // Calculate and display wind chill
    const windChill = calculateWindChill(temperature, windSpeed);
    windChillElement.textContent = windChill;
}

// Update copyright year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

// Initialize weather display
updateWeather();