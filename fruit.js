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

    // Deposit funds
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
    const reels = [];
    // while i is < than the amount of COLS keep looping through, then increment index by 1
    for (let i =0; i < COLS; i++) {
        reels.push([]);
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

const transpose = (reels) => {
    const rows = [];

    for (let i =0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows = (rows) => {
    // loop through each row in rows
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            // check if index is the last, if not, add | symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}
// Check if user wins
const getWinnings = (rows, bet, lines) => {
    let winnings =0;

    for (let row =0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () =>  {
        // run functions
    let balance = deposit();

    while (true) {
        console.log("You have a balance of £" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        // Update user balance
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        // Update user balance
        balance += winnings;
        console.log("You won, £" + winnings.toString());

        if (balance <= 0) {
            console.log("Ooops, you have run out of money!");
            break;
        }
        // Play again?
        const playAgain = prompt("Would you like to play again? (y/n)? ")

        if (playAgain != "y") break;

        }
};
// run game
game();