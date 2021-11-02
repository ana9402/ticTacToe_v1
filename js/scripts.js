// INITIALISATION DES VARIABLES **********
let player1Score = document.getElementById('player1Score');
let player2Score = document.getElementById('player2Score');
let statut = document.getElementById('statut');
let square = document.querySelectorAll('.square');
let replay = document.getElementById('replay');
let reset = document.getElementById('reset');
let runningGame = true;
let player1 = {
    name: "X",
    sign: "X",
    score: 0
};
let player2 = {
    name: "0",
    sign: "0",
    score: 0
};
let currentPlayer = player1;
let gameRecord = ["", "", "", "", "", "", "", "", ""]

const successCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// MESSAGES **********
const turnMessage = () => `Player ${currentPlayer.name}, it's your turn.`
const winMessage = () => `Player ${currentPlayer.name} wins !`
const equalityMessage = () => `Draw !`
statut.innerHTML = turnMessage();

// EVENEMENTS **********
square.forEach(square => square.addEventListener('click', clickOnSquare));
replay.addEventListener('click', replayGame)
reset.addEventListener('click', resetGame)

// FONCTIONS **********

// Affichage du score sur la page ----------
function displayScore() {
    let players = JSON.parse(localStorage.getItem('players'))

    if (players !== null) {
        player1Score.innerHTML = players.player1.score;
        player2Score.innerHTML = players.player2.score;
    } else {
        let players = {
            player1,
            player2
        }
        localStorage.setItem('players', JSON.stringify(players))
    }
}
displayScore();

// Au clic sur la case ----------
function clickOnSquare() {
    let squareIndex = parseInt(this.dataset.index);
    // Si la case est déjà remplie ou que le jeu n'est pas en cours
    if (gameRecord[squareIndex] !== "" || runningGame === false) {
        return
    } 
   
    this.innerHTML = currentPlayer.sign;
    gameRecord[squareIndex] = currentPlayer.sign;

    gameCheck();
}

// Vérification de la victoire ----------
function gameCheck() {
    let win = false;

    // On vérifie si l'une des combinaisons a été remplie
    for (let combination of successCombinations) {
        let val1 = gameRecord[combination[0]];
        let val2 = gameRecord[combination[1]];
        let val3 = gameRecord[combination[2]];

        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }

        if (val1 ===  val2 && val2 === val3) {
            win = true;
            break;
        }
    }

    // Si l'un des joueurs a aligné 3 cases
    if (win) {
        statut.innerHTML = winMessage();
        runningGame = false;
        updateScore()
        return
    }

    // S'il y a une égalité
    if (!gameRecord.includes("")) {
        statut.innerHTML = equalityMessage();
        runningGame = false;
        return
    }

    // Si le jeu continue
    changePlayer();
}

// Changement du joueur actif ----------
function changePlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    statut.innerHTML = turnMessage();
}

// Mettre à jour le score dans le localstorage ----------
function updateScore() {
    let players = JSON.parse(localStorage.getItem('players'))

    if (currentPlayer === player1) {
        players.player1.score++;
    } else {
        players.player2.score++;
    }
    
    localStorage.setItem('players', JSON.stringify(players));
}

// Recommencer la partie ----------
function replayGame() {
    window.location.reload();
}

// Réinitialiser le score ----------
function resetGame() {
    localStorage.clear();
    window.location.reload();
}