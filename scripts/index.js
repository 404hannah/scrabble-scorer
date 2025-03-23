let players = ["", ""];

// Renders the first two player text boxes
render();

function start(){
    const dbxplayers = document.querySelector(".dbx-players");

    dbxplayers.style.display = "flex";
}

function add(){
    const addBtn = document.getElementById("add");

    players.push("");
    playersInit();

    // Hides add button again when players are 4, the maximum
    if (players.length == 4){
        addBtn.style.display = "none";
    }

    render();
}

function render(){
    let playersHTML = '';

    for(let i = 0; i < players.length; i++){
        const player = `
            <div class="player-row">
                <h2>${i + 1}</h2>
                <input type="text" placeholder="Name" class="txt" value="${players[i]}">
                <i class='bx bx-x' id="x" onclick="remove(${i})"></i>
            </div>
        `
        playersHTML += player;
    }

    document.querySelector('.player-container').innerHTML = playersHTML;
}

function playersInit(){
    const txtBoxes = document.querySelectorAll(".txt");

    // Condition is the number of text boxes so that surplus of players would not result in an error
    for(let i = 0; i < txtBoxes.length; i++){
        players[i] = txtBoxes[i].value;
    }
}

function remove(i){
    const addBtn = document.getElementById("add");

    // Initialization first so that the removing of data is not futile
    playersInit();
    players.splice(i, 1);

    // Displays add button again when players are below 4 in number
    if (players.length < 4){
        addBtn.style.display = "flex";
    }

    render();
}

function message(message){
    const msg = document.querySelector(".msg-container");
    const content = document.querySelector(".msg-content");
    content.innerHTML = message;
    msg.style.display = "flex";
}

function messageClose(){
    const msg = document.querySelector(".msg-container");
    msg.style.display = "none";
}

function play(){
    playersInit()

    // Checks if all names are filled
    noNames = true;

    for(let i = 0; i < players.length; i++){
        if(players[i] === ""){
            noNames = false;
        }
    }

    if (noNames && (players.length > 1)) {
        for(let i = 0; i < players.length; i++){
            sessionStorage.setItem(String(i+1), players[i]);
        }
        sessionStorage.setItem("numPlayers", players.length);
        window.location.href = "play.html";
    } else if (players.length == 0) {
        message("Input players.");
    } else if (players.length == 1) {
        message("Single player is not allowed.");
    } else {
        message("Please write the players' names.");
    }
}