$(document).ready( function () {
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/cartoon_ricochet2.mp3");
    audioElement.loop = true;
    var victoryAudio = document.createElement("audio");
    victoryAudio.setAttribute("src", "assets/victory.mp3");

    // GLobal variables
    var gameWords = ["COWBOYS", "GUNSLINGER", "SALOON", "HORSES", "TUMBLEWEED",
                    "DESERT", "TOMBSTONE", "WINCHESTER", "CADDLE", "PISTOL",
                        "RANGER", "WANTED", "OUTLAW", "GUNFIGHT", "HIGH NOON", 
                            "DODGE CITY", "TRAIN ROBBER", "DUEL", "QUICKDRAW", "SHOWDOWN"];
    var places = []; 

    // Game Object 
    var  newGame = { 
        word: "" , 
        // checks to see if game is finished
        win : true ,
        // list of missed guesses
        lettersGuessed : [] ,
        // guesses 
        guesses : 7
    }
    //  main function 
    document.onkeyup = function(event) {
        //audioElement.pause();
        var test = event.keyCode;
        //accept only letters
        if (test >= 65 && test <= 90 ) {
            console.log(test); 
            //check guesses
            if(newGame.guesses === 0){
                alert("GAME OVER \nYou ran out of guesses. The word was " + 
                newGame.word + ". \nPress OK to try again.");
                newGame.win = true;  
            }
            //check if game is over
            if(newGame.win) {
                startNew();
                printPlaces();
                newGame.lettersGuessed = []; 
                printStats();
            }
            else {
                // Users Guess letter
                var usersGuess = event.key.toUpperCase();
                console.log(usersGuess);
                //loops to check word for user guess
                checkGuess(usersGuess); 
                if ( printPlaces() === newGame.word) {
                    alert("Congrats! You Won! \n You guessed the word correctly. Press any key to play again.");
                    newGame.win = true; 
                    victoryAudio.play();
                }
                printStats(); 
            }
        }
    }

    function checkGuess(guess) {
        // resets the test variable if you guessed correctly
        var got1 = false; 
        //loops through the game word 
        for(var i = 0; i < newGame.word.length; i++) {
            //tests each letter with the Users guess
            if(guess === newGame.word[i]) {
                //if guess is correct places guess in places array
                places[i] = guess; 
                // changes the test variable for guessing correctly
                got1 = true;
            }
            console.log(places[i]);
        }
        console.log(got1);
        if (got1 != true){
            // records failed letter guessed
            newGame.lettersGuessed.push(guess);  
           audioElement.play();
            setTimeout(function() { audioElement.pause(); }, 1500);
            // lowers lives or number of missed guess remaining
            newGame.guesses -= 1; 
        }
        
    }

    //adds the "to the game screen"
    function printPlaces() {
        var gameLetters = "";
        for (var i = 0; i < newGame.word.length; i++) {
            console.log(places[i]);
            gameLetters += places[i];
        }
        document.getElementById("places").innerHTML = gameLetters;
        return gameLetters; 
    }


    function printStats() {
        //sets up the stats section of the game 
        var stats = "Letters Guessed: <br> <hr>"; 
        if (newGame.lettersGuessed.length >= 1) {
            stats += newGame.lettersGuessed[0];
        }
        if (newGame.lettersGuessed.length >= 2) {
            for (var i = 1; i < newGame.lettersGuessed.length; i++) {
                stats += ", " + newGame.lettersGuessed[i]; 
            }
        }
        stats += " <br> <hr> Guesses Remaining: "
        + newGame.guesses; 
        document.getElementById("stat").innerHTML = stats; 
    }

    function startNew() { 
        //Initializes all the game propertizes
    newGame.word =  gameWords[Math.floor(Math.random() * gameWords.length)]
    newGame.win = false; 
    newGame.guesses = 7; 
    console.log(newGame.word);
        //changes screen to game screen
        var beginHTML = 
            "Press a letter to guess it in the word. <br>"; 
        document.getElementById("gameDirections").innerHTML = beginHTML;
    
        //sets the number of "_" equal to length in game Word  
        for (var i = 0; i < newGame.word.length; i++) {
            //looks for spaces in word
            if(newGame.word[i] === " ") {
                places[i] = " "; 
            }
            else {
                places[i] = "_";
            console.log(places[i]);
            }
        }
        function checkKey (keyPress) {

        }
    
    }
}); 