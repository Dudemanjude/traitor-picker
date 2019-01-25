var newGame = document.querySelector('#newGame');
var nextPlayer = document.querySelector('#nextPlayer');
var reveal = document.querySelector('#reveal');
var playerNum = document.querySelector('#playerNum');
var role = document.querySelector('#role');
var numberOfPlayers = document.querySelector('#numPlayers');
var numberOfTraitors = document.querySelector('#numTraitors');

var players = [];
var currentPlayerNum;

function onNewGame() {
    players = [];
    for (let i = 0; i < numberOfPlayers.value; i++) {
        var player = {'role': 'Innocent'};
        players[i] = player;
    }
    var traitorsPicked = 0
    while (traitorsPicked < numberOfTraitors.value) {
        var playerPicked = players[Math.floor(Math.random() * players.length)];

        if (playerPicked.role != 'Traitor') {
            playerPicked.role = 'Traitor';
            traitorsPicked++;
        }
    }
    var detectivePicked = false;
    while (!detectivePicked) {
        var playerPicked = players[Math.floor(Math.random() * players.length)];
        if (playerPicked.role != 'Traitor') {
            playerPicked.role = 'Detective';
            detectivePicked = true;
        }
    }
    console.log(players);
    currentPlayerNum = 0;
    updateUI();
    enableUI();
}

function revealRole() {
    role.textContent = players[currentPlayerNum].role;
}

function goToNextPlayer() {
    if (currentPlayerNum < players.length-1) {
        currentPlayerNum++;
        updateUI()
    } else {
        disableUI();
    }
}

function updateUI() {
    playerNum.textContent = currentPlayerNum + 1;
    role.textContent = '';
}

function enableUI() {
    reveal.disabled = false;
    nextPlayer.disabled = false;
}

function disableUI() {
    reveal.disabled = true;
    nextPlayer.disabled = true;
    role.textContent = '';
}

newGame.addEventListener('click', onNewGame);
reveal.addEventListener('click', revealRole);
nextPlayer.addEventListener('click', goToNextPlayer);
