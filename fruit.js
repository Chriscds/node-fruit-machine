
    

// Spin fruit machine
// Check if user wins
// Update user balance
// Play again?

    // Deposit funds

const prompt = require("prompt-sync")();

const deposit = () => {
    // loop infinatly with while loop set to true
    while (true) {

    const depositAmount = prompt("Enter a deposit amount: ");

    // convert string to number using parseFloat
    const numberDepositAmount = parseFloat(depositAmount);

    // check if user entered a number
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Please enter a number and try again!");
    } else {
        return numberDepositAmount;
    }
}
};

    // Determine number of lines to bet on

const getNumberOfLines = () => {
    while (true) {

        const lines = prompt("Enter the number of lines to bet on (1-3): ");
    
        // convert string to number using parseFloat
        const numberOfLines = parseFloat(lines);
    
        // check if user entered a number equal to 1-3
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines!");
        } else {
            return numberOfLines;
        }
    }
};

    // Collect bet amount
const getBet = (balance, lines) => {
    while (true) {

        const bet = prompt("Enter the bet amount per line: ");
    
        // convert string to number using parseFloat
        const numberBet = parseFloat(bet);
    
        // check if user entered a number equal to 1-3
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet!");
        } else {
            return numberBet;
        }
    }
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);

// console.log("Deposit amounted: " + depositAmount);