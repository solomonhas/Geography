let numFlags = 4; //default to 4
let includeStates = false; //default no states
let streak = 0;  //streak counter

//All countries and some states
async function loadCountries() {
    const response = await fetch('Geography/codes.json');
    countries = await response.json();
    displayFlags(); // Start the game after loading the data
}

//get a random flag
function getRandomFlags(num) {
    let countryCodes = Object.keys(countries);

    if (!includeStates) { //if no remove all the start with US
        countryCodes = countryCodes.filter(code => !code.startsWith('us-'));
    }

    const randomFlags = [];
    while (randomFlags.length < num) {
        const randomCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
        if (!randomFlags.includes(randomCode)) {
            randomFlags.push(randomCode);
        }
    }

    return randomFlags;
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}


//This is to display flags
async function displayFlags() {
    const flagsContainer = document.getElementById('flags-container');
    const content = document.getElementById('content');
    const randomFlags = getRandomFlags(numFlags); //get the ammount of flags needed
    const streakDisplay = document.getElementById('streak');

    const randomCountryCode = randomFlags[Math.floor(Math.random() * randomFlags.length)];
    const randomCountryName = countries[randomCountryCode];

    content.textContent = `Click on the flag of ${randomCountryName}`;

    //Clear the container... idk
    flagsContainer.innerHTML = '';

    randomFlags.forEach(code => {
        const flagUrl = `https://flagcdn.com/w160/${code}.png`;
        const countryName = countries[code];

        //create the image from the flag URL?????
        const img = document.createElement('img');
        img.src = flagUrl;
        img.alt = countryName;

        img.addEventListener('click', async () => {
            if (countryName === randomCountryName) {
                content.textContent = "CORRECT!";
                streak++;
                streakDisplay.textContent = `Current Streak: ${streak}`;
                await delay(1000); 
                displayFlags()
            } else {
                streak = 0;
                content.textContent = "Incorrect, try again!"
                streakDisplay.textContent = `Current Streak: ${streak}`;
                await delay(1000);
                content.textContent = `Click on the flag of ${randomCountryName}`;
            }
        });

        flagsContainer.appendChild(img);
    });
}

document.getElementById('settingsButton').addEventListener('click', () => {
    const panel = document.getElementById('settingsPanel');
    panel.style.right = panel.style.right === '10px' ? '-250px' : '10px';
});

//This function is for the save
document.getElementById('saveSettings').addEventListener('click', () => {
    const newNumFlags = parseInt(document.getElementById('numFlags').value);
    checkbox = document.getElementById('includeStates');
    if (checkbox.checked) {
        includeStates = true; //if the checkbox is true, show states
    } else {
        includeStates = false; //or else leave as false HORRIBLE BUT IT FINALLY WORKS //it had to be let not const
    }

    if (newNumFlags >= 2 && newNumFlags <= 10) {
        numFlags = newNumFlags;
        displayFlags();
        document.getElementById('settingsPanel').style.right = '-250px';
    } else {
        alert("Please enter a number between 2 and 10.");
    }
});

document.addEventListener('click', (event) => {
    const settingsPanel = document.getElementById('settingsPanel');
    const settingsButton = document.getElementById('settingsButton');
    
    //if you click outside, close it
    if (!settingsPanel.contains(event.target) && event.target !== settingsButton) {
        settingsPanel.style.right = '-250px'; // Close the settings panel
    }
});


//Load the flags
displayFlags();

//If you want new flags click a button
document.getElementById('myButton').addEventListener('click', displayFlags);