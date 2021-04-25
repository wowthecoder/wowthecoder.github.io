var enemyXPositions = []; //empty square brackets means new empty array
var enemyYPositions = [];
var avatarX = 0;
var avatarY = 0;
var avatarImage;
var enemyImage;
var secondsSurvived = 0;
var BestScore = 0;
var gameTheme = document.getElementById("music");

function setUpGame() {
    var gameCanvas = document.getElementById("gameCanvas");
    gameTheme = new Audio();
    gameTheme.src = "sound/Sculpture-Garden.mp3"
    avatarImage = new Image();
    enemyImage = new Image();
    avatarImage.src = "img/AngryBird.png";
    enemyImage.src = "img/DurianHammer.png";

    gameTheme.play();

    enemyYPositions.push(0);
    enemyXPositions.push(250);

    gameCanvas.getContext("2d").drawImage(avatarImage, Math.random() * 100, Math.random()* 100);

    gameCanvas.addEventListener("mousemove", handleMouseMovement);
    setInterval(handleTick,100)

    if (localStorage.getItem("Highest Score")) {
        BestScore = localStorage.getItem("Highest Score");
    }
}

function handleMouseMovement(mouseEvent) {
    avatarX = mouseEvent.offsetX;
    avatarY = mouseEvent.offsetY;
    //setting boundaries for avatar
    if (avatarX < 0) {
        avatarX = 0;
    }
    if (avatarX > 560) {
        avatarX = 560;
    }
    if (avatarY < 0) {
        avatarY = 0;
    }
    if (avatarY > 410) {
        avatarY = 410;
    }
}

function handleTick() {
    var gameCanvas = document.getElementById("gameCanvas");
    var currentEnemyNumber = 0;
    var numberOfEnemies = enemyXPositions.length;
    var enemyYSpeed = [5, 8, 12, 15, 20];
    var enemySpeedNumber = 0;
    var difficulty = 1/4;

    if (Math.random() < difficulty) {
        enemyYPositions.push(0);
        enemyXPositions.push(Math.random() * 600);  
    }

    while (currentEnemyNumber < numberOfEnemies) {
        enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] + enemyYSpeed[enemySpeedNumber];
        currentEnemyNumber = currentEnemyNumber + 1;
        enemySpeedNumber = enemySpeedNumber + 1;
        if (enemySpeedNumber > 4) {
            enemySpeedNumber = enemySpeedNumber - 4;
        }
    }
    
    gameCanvas.width = 600;
    gameCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY);
    
    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        gameCanvas.getContext("2d").drawImage(enemyImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber]);
        currentEnemyNumber = currentEnemyNumber + 1;
    }

    gameCanvas.getContext("2d").font = "20px Lobster";
    gameCanvas.getContext("2d").textBaseline = "top";
    gameCanvas.getContext("2d").fillText("Score:" + (secondsSurvived + 1), 5, 2);
    gameCanvas.getContext("2d").fillText("Best Score:" + BestScore, 470,2);

    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        if ( ( (avatarX < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < avatarX + 25) || (enemyXPositions[currentEnemyNumber] < avatarX + 10 && avatarX < enemyXPositions[currentEnemyNumber] + 30) ) && ( (avatarY < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < avatarY + 13) || (enemyYPositions[currentEnemyNumber] < avatarY && avatarY < enemyYPositions[currentEnemyNumber] + 20) ) ) {           
            gameTheme.pause();
            alert("Banged with enemy!! You survived " + secondsSurvived + " gameseconds.");
            if ( secondsSurvived > BestScore ) {
                alert("New high score!");
                alert("You beat your old high score by " + (secondsSurvived - BestScore) + " gameseconds!")
                BestScore = secondsSurvived;
                localStorage.setItem("Highest Score", BestScore);
            } 
            startNewGame();
        }
    currentEnemyNumber =  currentEnemyNumber + 1;
    }
    
    secondsSurvived = secondsSurvived + 1;
}

function startNewGame() {
    enemyXPositions = [];
    enemyYPositions = [];
    secondsSurvived = 0;
    gameTheme.play();
}