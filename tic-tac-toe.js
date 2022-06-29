/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    board[position] = mark;
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
    console.log(board[1], '|' , board[2] , '|' , board[3] );
    console.log('---------');
    console.log(board[4], '|' , board[5] , '|' , board[6] );
    console.log('---------');
    console.log(board[7], '|' , board[8] , '|' , board[9] );
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
    let convertPosition = Number(position)
    if((/^[a-zA-Z]*$/).test(position)){
        console.log("Sorry. Please enter number 1 to 9 only.")
        return false;
    }
    else if(convertPosition < 1 || convertPosition > 9){
        console.log("Sorry. The input value is out of bound.")
        return false;
    }
    else if(board[convertPosition]==='X' || board[convertPosition]==='O'){
        console.log("Sorry. The position is already occupied.")
        return false;
    }
    else{
        return true;
    }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],[4, 5, 6],[7, 8, 9],
    [1, 4, 7],[2, 5, 8],[3, 6, 9],
    [1, 5, 9],[3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for(const winCondition of winCombinations){
        const [a, b, c] = winCondition;
        if(board[a] != ' ' && board[a]===player && board[b]===board[a] && board[c]===board[b]){
            console.log(player, "Win.")
            winnerIdentified=true;
            return true;
        }
    }
    return false
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    let count=0
    for(let i=1; i<10; i++){
        if(board[i] === 'X' || board[i] === 'O'){
            count += 1;
        }
    }
    if(count===9){
        console.log("The board is already full. So, it is a draw.")
        winnerIdentified=true;
        return true;
    }
    else{
        return false;
    } 
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let boardPosition = prompt("Player: "+ player + " Now is your turn. ");
    while(!validateMove(boardPosition)){
        boardPosition = prompt("Player: "+ player + " Now is your turn. ");
    }
    markBoard(boardPosition, player);
    printBoard();
    checkWin(player);
    checkFull();
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'


while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
    if(currentTurnPlayer=='X'){
        currentTurnPlayer='O'
    }
    else if(currentTurnPlayer=='O'){
        currentTurnPlayer='X'
    }
}



// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function resetGame(){
    for(let i=1; i<10;i++){
        board[i]= ' ';
    }

    console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

    winnerIdentified = false
    currentTurnPlayer = 'X'

    while(!winnerIdentified){
        playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie
        if(currentTurnPlayer=='X'){
            currentTurnPlayer='O'
        }
        else if(currentTurnPlayer=='O'){
            currentTurnPlayer='X'
        }
    }
}


while(winnerIdentified===true){
    let option = prompt('Do you want to play again? (Please press y to continue.) ');
    if(option==='y' || option==='Y'){
    resetGame();
    }
    else if(option==='n' || option==='N'){
     console.log('Thank for playing the game.');
     break;
    }
}