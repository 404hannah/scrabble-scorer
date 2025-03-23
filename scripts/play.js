// Players

var players = {};
var numPlayers = Number(sessionStorage.getItem("numPlayers"));

// Determine number of players
for(let i=1; i <= numPlayers; i++){
    if(!(sessionStorage.getItem(String(i)) === null)){
        players[i] = {name: sessionStorage.getItem(String(i)), score: 0, rank: 0, moves: {}};
    }
}

var idCell;
var turnCounter = 1;
let firstBool = true;
var dirMove;

// Renders starting or blank board
renderBoard();

// Renders the players' information
renderPlayersCtr();
renderPlayers();

firstMove();

function renderBoard(){
    let boardHTML = '';
    let id;
    let idArray = [];

    // Assigning id according to the position
    for(let i = 0; i < 15; i++){
        let cell;
        
        for(let j = 0; j < 15; j++){
            if (j < 9) {
                id = `${i + 1}0${j + 1}`;
            } else {
                id = `${String(i + 1) + String(j + 1)}`;
            }

            idArray.push(id);
            cell = `
                    <div class="cell" id="${id}" onclick="turnShow(this.id)"></div>
                `

            boardHTML += cell;
        }
    }

    document.querySelector('.board-sub-ctr').innerHTML = boardHTML;

    // Paint special cells
    let h = 0;
    for(let i = 0; i < 15; i++){
        for(let j = 0; j < 15; j++){

            const specialCell = document.getElementById(idArray[h]);
            h++;
            switch(i){
                case 0:
                    row0or14(j, specialCell);
                    break;
                case 1:
                    row1or13(j, specialCell);
                    break;
                case 2:
                    row2or12(j, specialCell);
                    break;
                case 3:
                    row3or11(j, specialCell);
                    break;
                case 4:
                    row4or10(j, specialCell);
                    break;
                case 5:
                    row5or9(j, specialCell);
                    break;
                case 6:
                    row6or8(j, specialCell);
                    break;
                case 7:
                    row7(j, specialCell);
                    break;
                case 8:
                    row6or8(j, specialCell);
                    break;
                case 9:
                    row5or9(j, specialCell);
                    break;
                case 10:
                    row4or10(j, specialCell);
                    break;
                case 11:
                    row3or11(j, specialCell);
                    break;
                case 12:
                    row2or12(j, specialCell);
                    break;
                case 13:
                    row1or13(j, specialCell);
                    break;
                case 14:
                    row0or14(j, specialCell);
                    break;
            }   
        }
    }
}

function row0or14(column, specialCell){
    switch(column){
        case 0:
            // 3W
            TW(specialCell);
            break;
        case 3:
            // 2L
            DL(specialCell);
            break;
        case 7:
            // 3W
            TW(specialCell);
            break;
        case 11:
            // 2L
            DL(specialCell);
            break;
        case 14:
            // 3W
            TW(specialCell);
            break;
    }
}

function row1or13(column, specialCell){
    switch(column){
        case 1:
            // 2W
            DW(specialCell);
            break;
        case 5:
            // 3L
            TL(specialCell);
            break;
        case 9:
            // 3L
            TL(specialCell);
            break;
        case 13:
            // 2W
            DW(specialCell);
            break;
    }
}

function row2or12(column, specialCell){
    switch(column){
        case 2:
            // 2W
            DW(specialCell);
            break;
        case 6:
            // 2L
            DL(specialCell);
            break;
        case 8:
            // 2L
            DL(specialCell);
            break;
        case 12:
            // 2W
            DW(specialCell);
            break;
    }
} 

function row3or11(column, specialCell){
    switch(column){
        case 0:
            DL(specialCell);
            break;
        case 3:
            DW(specialCell);
            break;
        case 7:
            DL(specialCell);
            break;
        case 11:
            // 2W
            DW(specialCell);
            break;
        case 14:
            // 2L
            DL(specialCell);
            break;
    }
}

function row4or10(column, specialCell){
    switch(column){
        case 4:
            // 2W
            DW(specialCell);
            break;
        case 10:
            // 2W
            DW(specialCell);
            break;
    }
}

function row5or9(column, specialCell){
    switch(column){
        case 1:
            // 3L
            TL(specialCell);
            break;
        case 5:
            // 3L
            TL(specialCell);
            break;
        case 9:
            // 3L
            TL(specialCell);
            break;
        case 13:
            // 3L
            TL(specialCell);
            break;
    }
}

function row6or8(column, specialCell){
    switch(column){
        case 2:
            // 2L
            DL(specialCell);
            break;
        case 6:
            // 2L
            DL(specialCell);
            break;
        case 8:
            // 2L
            DL(specialCell);
            break;
        case 12:
            // 2L
            DL(specialCell);
            break;
    }
}

function row7(column, specialCell){
    switch(column){
        case 0:
            // 3W
            TW(specialCell);
            break;
        case 3:
            // 2L
            DL(specialCell);
            break;
        case 7:
            // Star
            specialCell.classList.add('star');
            break;
        case 11:
            // 2L
            DL(specialCell);
            break;
        case 14:
            // 3W
            TW(specialCell);
            break;
    }
}

function TW(specialCell){
    specialCell.classList.add('TW');
    specialCell.innerText = "3W";
}

function DW(specialCell){
    specialCell.classList.add('DW');
    specialCell.innerText = "2W";
}

function TL(specialCell){
    specialCell.classList.add('TL');
    specialCell.innerText = "3L";
}

function DL(specialCell){
    specialCell.classList.add('DL');
    specialCell.innerText = "2L";
}

function renderPlayersCtr(){
    let pctrHTML = '';

    // Assigning id according to the position
    for(let i = 1; i <= numPlayers; i++){
        let pctr;
        
        pctr = `
                <div class="player-ctr pctr-${i}">
                    <div class="text-ctr">
                            Name<br>Score:<br>Rank:
                    </div>
                    <div class="button-ctr">
                        <button id="${i}" onclick="viewMoves(this.id)">View Moves</button>
                    </div>          
                </div>
                `

        pctrHTML += pctr;
    }

    document.querySelector('.players-ctr').innerHTML = pctrHTML;

}

// Display the player's new information
function renderPlayers(){
    for(let i = 1; i <= numPlayers; i++){
        pCon = document.querySelector(`.pctr-${i} .text-ctr`);
        pCon.innerHTML = `${players[i]["name"]}<br>Score: ${players[i]["score"]}<br>Rank: ${players[i]["rank"]}`;
    }
}

// Rank the players (sort of Bubble Sort)
function ranking(){
    let playersDup = {...players};
    let numPlayersDup = numPlayers;
    let highest = -1;
    let highestPlayer;
    let skipped = [];
    let tie = [];

    for(let i = 1; i <= numPlayers; i++){
        for(let j = 1; j <= numPlayersDup; j++){
            if(!skipped.includes(j)){
                if (highest < playersDup[j]["score"]){
                    highest = playersDup[j]["score"];
                    highestPlayer = j;
                }
            }

            // Records after everything is searched.
            if((j + 1 > numPlayersDup) && (highest != -1)){
                players[highestPlayer]["rank"] = i;
                delete playersDup[highestPlayer];
                skipped.push(highestPlayer);

                // Checks for a tie
                for(let k = 1; k <= numPlayersDup; k++){
                    if(!skipped.includes(k)){
                        if (highest == playersDup[k]["score"]){
                            players[k]["rank"] = i;
                            delete playersDup[k];
                            skipped.push(k);
                        }
                    }
                }
            }
        }
        highest = -1;
        highestPlayer = "";
    }
}

function firstMove(){
    turnShow(808);
}

// Instructions is exited
function insExit(){
    const ins = document.querySelector(".ins-container");
    ins.style.display = "none";
}

function errExit(){
    const errCon = document.querySelector(".err-container");
    errCon.style.display = "none";
}

// Dialog box for making a turn
function turnShow(cell){
    var letterCell = document.getElementById(cell);
    letterCell = String(letterCell.innerHTML);

    const msgs = document.querySelector(".msgs");
    const turnCon = document.querySelector(".turn-container");
    const turnH2 = document.querySelector(".turn-container h2");
    
    msgs.style.display = "flex";
    turnCon.style.display = "flex";
    turnH2.innerText = `${players[turnCounter]["name"]}'s Turn`;

    // Sets clicked cell
    idCell = cell;
}

function turnExit(){
    if(firstBool){
        const errCon = document.querySelector(".err-container");
        const errContent = document.querySelector(".err-content");

        errCon.style.display = "flex";
        errContent.innerText = "Starting position could not be changed.";
    } else {
        const msgs = document.querySelector(".msgs");
        const turnCon = document.querySelector(".turn-container");
        const txtBox = document.querySelector(".textbox");

        msgs.style.display = "none";
        turnCon.style.display = "none";
        txtBox.value = "";
    }
    
}

function direction(dir){
    const xBtn = document.querySelector(".horizontal");
    const yBtn = document.querySelector(".vertical");

    if(dir === "x"){
        xBtn.style.backgroundColor = "#009DFF";
        yBtn.style.backgroundColor = "#FFFFFF";
    } else if(dir === "y"){
        yBtn.style.backgroundColor = "#009DFF";
        xBtn.style.backgroundColor = "#FFFFFF";
    }
    
    dirMove = dir;
}

var word;
var idBCellRef;
var turnScore;

// Button function for a word played
function play(){
    const txtBox = document.querySelector(".textbox");

    if(txtBox.value === "" || (dirMove != "x" && dirMove != "y")){
        const errCon = document.querySelector(".err-container");
        const errContent = document.querySelector(".err-content");

        errCon.style.display = "flex";
        errContent.innerText = "Input the values necessary.";
    } else {
        let idCell1 = idCell;

        word = txtBox.value.toUpperCase();
        let paintWord = txtBox.value.toUpperCase();
        let letMismatch = false;
        let yesAdjacent = false;

        // Identify which cell is clicked.
        let j;

        // Sets the direction
        if (dirMove === "x"){
            j = 1;
            k = 100;
        } else if (dirMove === "y"){
            j = 100;
            k = 1;
        }

        idCell = String(idCell);
        idBCellRef = "";

        var idBCell = Number(idCell) - j;
        idBCell = String(idBCell);
        befFull(j, idBCell);

        var idACell = Number(idCell) + (paintWord.length) * j;
        idACell = String(idACell);
        afFull(j, idACell);

        // Checks if a letter already played will not be changed        
        for(let i=0; i < paintWord.length; i++){
            var letterCell = document.getElementById(idCell);
            
            if (letterCell.classList.contains("played")){
                // How to get the cell of a certain 
                let letterInCell = document.querySelector(`.L${idCell}`);
                if (paintWord[i] != letterInCell.innerText){
                    letMismatch = true;
                }
            }

            idCell = Number(idCell) + j;
        }
        
        idCell = String(idCell1);

        // Checks for a neighbor square 
        for(let i=0; i < paintWord.length; i++){
            var letterCell = document.getElementById(idCell);
            if (letterCell.classList.contains("played")){
                idCell = Number(idCell) + j;
                idCell = String(idCell);
                continue;
            }

            let sideCellId1 = Number(idCell) - k;
            sideCellId1 = String(sideCellId1);
            let sideCellId2 = Number(idCell) + k;
            sideCellId2 = String(sideCellId2);

            switch (j){
                case 1:
                    // Check for the top neighbor cell
                    if (Number(sideCellId1) > 115){
                        var sideCell1 = document.getElementById(sideCellId1);
                        if(sideCell1.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }
            
                    // Check for the bottom neighbor cell
                    if (Number(sideCellId2) <= 1515){
                        var sideCell2 = document.getElementById(sideCellId2);
                        if(sideCell2.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }

                    // Check for the left neighbor cell
                    var leftCellId = Number(idCell) - 1;
                    leftCellId = String(leftCellId);
                    if (Number(leftCellId.substring(leftCellId.length - 2)) != 0){
                        var leftCell = document.getElementById(leftCellId);
                        if(leftCell.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }
            
                    // Check for the right neighbor cell
                    var rgtCellId = Number(idCell) + 1;
                    rgtCellId = String(rgtCellId);
                    if (Number(rgtCellId.substring(rgtCellId.length - 2)) <= 15){
                        var rgtCell = document.getElementById(rgtCellId);
                        if(rgtCell.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }
                    break;

                case 100:
                    // Check for the left neighbor cell
                    if (Number(sideCellId1.substring(sideCellId1.length - 2)) != 0){
                        var sideCell1 = document.getElementById(sideCellId1);
                        if (sideCell1.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }
            
                    // Check for the right neighbor cell
                    if (Number(sideCellId2.substring(sideCellId2.length - 2)) <= 15){
                        var sideCell2 = document.getElementById(sideCellId2);
                        if(sideCell2.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }

                    // Check for the top neighbor cell
                    var topCellId = Number(idCell) - 100;
                    if (Number(topCellId) > 100){
                        var topCell = document.getElementById(topCellId);
                        if(topCell.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }
            
                    // Check for the bottom neighbor cell
                    var btmCellId = Number(idCell) + 100;
                    if (Number(btmCellId) <= 1515){
                        var btmCell = document.getElementById(btmCellId);
                        if(btmCell.classList.contains("played")){
                            yesAdjacent = true;
                        }
                    }
                    break;  
            }

            idCell = Number(idCell) + j;
            idCell = String(idCell);
        }

        idCell = idCell1;

        if (turnCounter == 1){
            yesAdjacent = true;
        }

        if(!yesAdjacent){
            // Error message
            const errCon = document.querySelector(".err-container");
            const errContent = document.querySelector(".err-content");
            
            errCon.style.display = "flex";
            errContent.innerText = "The word does not connect to other words.";
        } else if (letMismatch){
            // Error message
            const errCon = document.querySelector(".err-container");
            const errContent = document.querySelector(".err-content");
    
            errCon.style.display = "flex";
            errContent.innerText = "A letter is already in one or more of the squares you're trying to play and the letter you're playing is a mismatch.";
        } else {
            // var words = {1: word}; 
            turnScore = 0;
            calcuWord(paintWord, word, j, idBCellRef);

            // Calculate the words formed other than the main word if there are any
            let wordCopy = word;
            idCell = idCell1;
            
            if (idBCellRef === ""){
                idBCellRef = idCell;
            }
            var idBCROrg = idBCellRef;

            for(let i = 0; i < wordCopy.length; i++){
                var letterCell = document.getElementById(idBCROrg);
        
                if (!letterCell.classList.contains("played")){ 
                    // Mark cell as played so the special cell extra points could not be used again
                    letterCell.classList.add("played");

                    var letterInCell = document.querySelector(`.L${idBCROrg}`);
                    word = letterInCell.innerText;
                    paintWord = word;

                    idBCROrg = String(idBCROrg);
                    idBCellRef = "";
                    var idBCell = Number(idBCROrg) - k;
                    idBCell = String(idBCell);
                    befFull(k, idBCell);

                    var idACell = Number(idBCROrg) + (paintWord.length) * k;
                    idACell = String(idACell);
                    afFull(k, idACell);

                    if (!(word === letterInCell.innerText)){
                        calcuWord(paintWord, word, k, idBCellRef);
                    }
                }

                idBCROrg = Number(idBCROrg) + j;
            }

            idCell = "";
            idBCROrg = "";
            word = "";
            paintWord = "";
           
            counter();
        }
    }

    txtBox.value = "";
}

function befFull(j, idBCell){
    // Checking for letters before the word
    if ((Number(idCell) > 115 && j == 100) || (Number(idCell.substring(idCell.length - 2)) != 1 && j == 1)){
        var beforeCell = document.getElementById(idBCell);
        var letterInCell;
        var letterBCell;
        
        while(beforeCell.classList.contains("played")){
            idBCellRef = idBCell;
            letterInCell = document.querySelector(`.L${idBCell}`);
            letterBCell = letterInCell.innerText;

            word = String(letterBCell).concat(word);
            idBCell = Number(idBCell) - j;
            idBCell = String(idBCell);

            // It will stop checking if it exceeds the border.
            if ((Number(idBCell) < 100 && j == 100) || (Number(idBCell.substring(idBCell.length-2)) == 0 && j == 1)){
                break;
            }

            beforeCell = document.getElementById(idBCell);
        }
    }
}

function afFull(j, idACell){
    // Checking for letters after the word
    if ((Number(idACell) <= 1515 && j == 100) || (Number(idACell.substring(idACell.length - 2)) <= 15 && j == 1)){
        var afterCell = document.getElementById(idACell);
        var letterInCell;
        var letterACell;

        while(afterCell.classList.contains("played")){
            letterInCell = document.querySelector(`.L${idACell}`);
            letterACell = letterInCell.innerText;
            word = String(word).concat(letterACell);
            idACell = Number(idACell) + j;
            idACell = String(idACell);

            // It will stop checking if it exceeds the border.
            if ((Number(idACell) > 1515 && j == 100) || (Number(idACell.substring(idACell.length - 2)) > 15 && j == 1)){
                break;
            }
            afterCell = document.getElementById(idACell);
        }
    }
}

function initIdBCellRef(idBCellRef1){
    let idBCellRef = idBCellRef1;
    if (idBCellRef === ""){
        idBCellRef = idCell;
    }
    return idBCellRef;
}

// Calculates the score of a word
function calcuWord(paintWord, word, j, idBCellRef){
    // Points of each letter
    let letterValue = {A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10, _: 0};

    var score = 0;
    var specialClass;
    var idCell1 = idCell;
    let idBCellRef1 = idBCellRef; 
    
    // Displays the letter
    for(let i = 0; i < paintWord.length; i++){
        var letterCell = document.getElementById(idCell);
        
        if (!letterCell.classList.contains("played")){ 
            letterCell.innerHTML = `
                    <div class="L${idCell} letter">${paintWord[i]}</div>
                `;
        }

        idCell = Number(idCell) + j;
    }

    idCell = idCell1;
    idBCellRef = initIdBCellRef(idBCellRef1);

    // Calculating the points of ordinary cells
    for(let i = 0; i < word.length; i++){
        var letterCell = document.getElementById(idBCellRef);

        score += Number(letterValue[word[i]]);

        idBCellRef = Number(idBCellRef) + j;
    }
    
    idBCellRef = initIdBCellRef(idBCellRef1);

    if(firstBool){
        // First turn score is doubled.
        score *= 2;
        firstBool = false;
    }

    // Triple or Double Word Calculation
    for(let i = 0; i < word.length; i++){
        var letterCell = document.getElementById(idBCellRef);
        specialClass = letterCell.classList;

        if(!specialClass.contains("played")){
            if(specialClass.contains("TW")){
                score *= 3;
            } else if(specialClass.contains("DW")){
                score *= 2;
            }
        }

        idBCellRef = Number(idBCellRef) + j;
    }

    idBCellRef = initIdBCellRef(idBCellRef1);
    
    // Triple or Double Letter Calculation
    for(let i = 0; i < word.length; i++){
        var letterCell = document.getElementById(idBCellRef);
        specialClass = letterCell.classList;

        if(!specialClass.contains("played")){
            // Subtracts the ordinary value of special cells added before.
            if(specialClass.contains("TL")){
                score += ((3 * Number(letterValue[word[i]])) - Number(letterValue[word[i]]));
            } else if(specialClass.contains("DL")){
                score += ((2 * Number(letterValue[word[i]])) - Number(letterValue[word[i]]));
            }
        }
        
        idBCellRef = Number(idBCellRef) + j;
    }

    idBCellRef = "";

    players[turnCounter]["score"] += score;

    // Records the moves
    players[turnCounter]["moves"][dupChecker(word)] = score;

    turnExit();
    
    // Shows total score for all the words in the turn
    turnScore += score;
    showScore(turnScore);

    ranking();
    renderPlayers();
}

// Repeating words are allowed.
function dupChecker(word){
    var checker = word;
    var i = 1
    while (Object.keys(players[turnCounter]["moves"]).includes(checker)){
        checker = word.concat(" (", i, ")");
        i++;
    }
    return checker;
}

function showScore(score){
    const msgs = document.querySelector(".msgs");
    const scoreCon = document.querySelector(".score-container");
    const scoreContent = document.querySelector(".score-content");
       
    scoreContent.innerText = score;
    msgs.style.display = "flex";
    scoreCon.style.display = "flex";
}

function exitScore(){
    const msgs = document.querySelector(".msgs");
    const scoreCon = document.querySelector(".score-container");
    
    msgs.style.display = "none";
    scoreCon.style.display = "none";
}

// Determines whose turn is it
function counter(){
    if(turnCounter == numPlayers){
        turnCounter = 1;
    } else {
        turnCounter++;
    }
}

// If a player chooses to skip his or her turn
function skip(){
    counter();
    if(firstBool){
        firstBool = false;
    }
    turnExit();
}

// Provides the list of a certain players' moves
function viewMoves(num){
    const msgs = document.querySelector(".msgs");
    const movesCon = document.querySelector(".moves-container");
    const movesH2 = document.querySelector(".moves-container h2");
    const movesContent = document.querySelector(".moves-content");
    var txtMoves = "";

    msgs.style.display = "flex";
    movesCon.style.display = "flex";
    movesH2.innerText = `${players[num]["name"]}'s Moves`;

    for(let move in players[num]["moves"]){
        txtMoves += `${move} - ${players[num]["moves"][move]}\n`;
    }
    movesContent.innerText = txtMoves;
}

function movesExit(){
    const msgs = document.querySelector(".msgs");
    const movesCon = document.querySelector(".moves-container");
    msgs.style.display = "none";
    movesCon.style.display = "none";
}


// Asks for confirmation if the game will be finished
function finMsg(){
    const msgs = document.querySelector(".msgs");
    const finMsg = document.querySelector(".fin-container");

    msgs.style.display = "flex";
    finMsg.style.display = "flex";
}

// Code for a finished game
function fin(bool){
    const msgs = document.querySelector(".msgs");
    const finMsg = document.querySelector(".fin-container");

    if(bool){
        results();
    }
    
    msgs.style.display = "none";
    finMsg.style.display = "none";
}

function results(){
    let highest = -1;
    let highestPlayer;

    for(let i = 1; i <= numPlayers; i++){
        if (highest < players[i]["score"]){
            highest = players[i]["score"];
        }

        // Displays a trophy for the highest score.
        if(i + 1 > numPlayers){
            // Checks for a tie
            for(let j = 1; j <= numPlayers; j++){
                if (highest == players[j]["score"]){
                    const trophyDiv = document.querySelector(`.pctr-${j} .button-ctr`);
                    trophyDiv.style.alignItems = "space-between";

                    trophyDiv.innerHTML = `
                        <div class="trophy"><i class='bx bxs-trophy bx-lg'></i></div>
                        <button id="${j}" onclick="viewMoves(this.id)">View Moves</button>
                    `
                }
            }
        }
    } 
}

// Asks for confirmation if the user truly will exit the game
function exitMsg(){
    const msgs = document.querySelector(".msgs");
    const exitMsg = document.querySelector(".exit-container");

    msgs.style.display = "flex";
    exitMsg.style.display = "flex";
}

function exit(bool){
    const msgs = document.querySelector(".msgs");
    const exitMsg = document.querySelector(".exit-container");

    if(bool){
        window.location.href = "index.html";
    } else {
        msgs.style.display = "none";
        exitMsg.style.display = "none";
    }
}