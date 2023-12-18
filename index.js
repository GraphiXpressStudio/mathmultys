
// Variables to store player and game data
let equations = 0;
let correctequations = 0;
let currentAnswer = 0;
let firstName = "";
let lastName = "";
let age = 0;
let gender = "";
let incorrectequations = 0;
let dob = "";
const today = new Date();
let percentage = 0;
let player = {
    firstName,
    lastName,
    dob,
    age,
    gender,
    equations,
    correctequations,
    incorrectequations,
    today,
};
let playerIndex = -1;

// Array to store player registration data
const PlayerRegistrationData = [];

// Hide the play area initially
document.getElementById("play").style.display = "none";

// Function to start the game
function PlayGame() {
    document.getElementById("reg").style.display = "none";
    document.getElementById("play").style.display = "block";

    // Enable buttons and input for the game
    document.getElementById('accept').disabled = false;
    document.getElementById('next').disabled = false;
    document.getElementById('userAnswer').disabled = false;

    // Generate random numbers for the equation
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;

    // Display the equation
    document.getElementById("equation").innerText = `${num1} x ${num2} = ?`;

    // Calculate the correct answer
    currentAnswer = num1 * num2;
    equations++;

    // Update player object with current game data
    player.firstName = firstName;
    player.lastName = lastName;
    player.dob = dob;
    player.age = age;
    player.gender = gender;
    player.equations = equations;
    player.correctequations = correctequations;
    player.incorrectequations = incorrectequations;
    player.today = today;

    // Find player index in the registration data array
    playerIndex = -1;
    for (let i = 0; i < PlayerRegistrationData.length; i++) {
        if (PlayerRegistrationData[i].firstName === player.firstName && PlayerRegistrationData[i].lastName === player.lastName) {
            playerIndex = i;
            break;
        }
    }

    // Update or add player data in the array
    if (playerIndex !== -1) {
        PlayerRegistrationData[playerIndex] = player;
    } else {
        PlayerRegistrationData.push(player);
    }

    // Display player statistics
    showpercentage();
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswerInput = document.getElementById("userAnswer").value;
    const userAnswer = parseInt(userAnswerInput);

    // Check if the user's answer is correct
    if (userAnswer === currentAnswer) {
        alert("Correct!!");
        correctequations++;
    } else {
        alert("Wrong!!");
        incorrectequations++;
    }

    // Display player statistics
    showpercentage();
    showAllStats();
}

// Function to display the player statistics
function showpercentage() {
    playerIndex = findPlayerIndex();

    // Display player statistics in the UI
    document.getElementById('SFirstName').innerText = PlayerRegistrationData[playerIndex].firstName;
    document.getElementById('SLastName').innerText = PlayerRegistrationData[playerIndex].lastName;
    document.getElementById('SGender').innerText = PlayerRegistrationData[playerIndex].gender;
    document.getElementById('SDob').innerText = PlayerRegistrationData[playerIndex].dob;
    document.getElementById('SAge').innerText = PlayerRegistrationData[playerIndex].age;
    document.getElementById('SEquations').innerText = PlayerRegistrationData[playerIndex].equations;
    document.getElementById('SCorrect').innerText = PlayerRegistrationData[playerIndex].correctequations;
    document.getElementById('SIncorrect').innerText = PlayerRegistrationData[playerIndex].incorrectequations;
}

// Function to show all player statistics
function showAllStats() {
    // Get the table container
    var tableContainer = document.getElementById("table");

    // Clear the existing content of the table
    tableContainer.innerHTML = "";

    // Create a new table element
    var table = document.createElement("table");
    table.border = "1";

    // Add a header to the table
    var thead = table.createTHead();
    var headerRow = thead.insertRow();
    var headers = ["First Name", "Last Name", "Dob", "Age", "Gender", "# of Equations", "# of Correct Equations", "# of Incorrect Equations", "Date"];

    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement("th");
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }

    // Populate the table with data from PlayerRegistrationData
    for (var i = 0; i < PlayerRegistrationData.length; i++) {
        var row = table.insertRow();
        for (var j = 0; j < headers.length; j++) {
            var cell = row.insertCell(j);
            cell.textContent = PlayerRegistrationData[i][headers[j].replace(/\s+/g, '')]; // Corrected access to player data
        }
    }

    // Append the table to the table container
    tableContainer.appendChild(table);
}

// Function to calculate age based on date of birth
function calculateAge() {
    // Get the date of birth from the input field
    const dobInput = document.getElementById('dob').value;

    // Calculate age
    const dob = new Date(dobInput);
    let age = today.getFullYear() - dob.getFullYear();

    // Check if birthday has occurred this year
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }

    // Update the age input field
    document.getElementById('age').value = age;
}

// Function to handle player registration
function Register() {
    // Get form values
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    dob = document.getElementById('dob').value;
    age = document.getElementById('age').value;
    gender = document.getElementById('gender').value;

    // Validate form fields
    if (!firstName || !lastName || !dob || !age || !gender) {
        alert('All fields are required!');
        return;
    }

    // Disable buttons in the form
    const form = document.getElementById('playerForm');
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }

    // Enable the "START" button
    document.getElementById('start').disabled = false;

    // Console log player registration data for testing
    console.log("register::" + PlayerRegistrationData + "\n---------------");
}

// Function to find the player index in the registration data array
function findPlayerIndex() {
    let index = -1;
    for (let i = 0; i < PlayerRegistrationData.length; i++) {
        if (PlayerRegistrationData[i].firstName === player.firstName && PlayerRegistrationData[i].lastName === player.lastName) {
            index = i;
            break;
        }
    }
    return index;
}

