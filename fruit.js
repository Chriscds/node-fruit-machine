// Check if user wins
// Update user balance
// Play again?

    // Deposit funds
const prompt = require("prompt-sync")();

// global variables
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}
// multiplier amount value
const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}


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
// Spin fruit machine
const spin = () => {
    const symbols = [];
    // loop through all entries in SYMBOLS_COUNT
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        // for loop to push symbols into the array of const symbols
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // each nested array is a column
    const reels = [[], [], []];
    // while i is < than the amount of COLS keep looping through, then increment i by 1
    for (let i =0; i < COLS; i++) {
        // added all available symbols into reelSymbols using spread operator
        const reelSymbols = [...symbols];
        // nested for loop because we are using a nested array
        for (let j = 0; j < ROWS; j++) {
            // generate a random index from reelSymbols times by lenght and minus one
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); 
            const selectedSymbol = reelSymbols[randomIndex];
            // push selectedSymbol into the index of reels
            reels[i].push(selectedSymbol);
            // remove 1 element from the randomIndex so it is not selected again while generating reel
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;

};
    // run functions
const reels = spin();
console.log(reels);
let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);

// console.log("Deposit amounted: " + depositAmount);