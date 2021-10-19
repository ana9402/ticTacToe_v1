// INITIALISATION DES VARIABLES **********
let statut = document.getElementById('statut');
let square = document.querySelectorAll('.square')
let reset = document.getElementById('reset')
let runningGame = true;
let player1 = "X";
let player2 = "O";
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
const turnMessage = () => `C'est au tour du joueur ${currentPlayer}.`
const winMessage = () => `Le joueur ${currentPlayer} a gagné la partie !`
const equalityMessage = () => `Egalité !`
statut.innerHTML = turnMessage();

// EVENEMENTS **********
square.forEach(square => square.addEventListener('click', clickOnSquare));
reset.addEventListener('click', resetGame)

// FONCTIONS **********

// Click sur la case ----------
function clickOnSquare() {
    let squareIndex = parseInt(this.dataset.index);
    console.log(squareIndex)
    // Si la case est déjà remplie ou que le jeu n'est pas en cours
    if (gameRecord[squareIndex] !== "" || runningGame === false) {
        return
    } 
   
    this.innerHTML = currentPlayer;
    gameRecord[squareIndex] = currentPlayer;

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

// Recommencer la partie ----------
function resetGame() {
    window.location.reload();
}