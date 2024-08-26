$(document).ready(function() {
    const gameContainer = $('#gameContainer');
const doofus = $('#doofus');
const gameWidth = gameContainer.width();
    const gameHeight = gameContainer.height();





    const pulpitSize = 100;

    const pulpitLifetimeRange = { min: 10000, max: 20000 }; 
    const moveStep = 50; 
    const moveDelay = 100; 
    const gameLoopInterval = 2000; 

    let score = 0;
    let gameInterval;
    let pulpits = [];



                                  resetGame();//aur over hoga to

    // Keyboard controls
    $(document).keydown(function(e) {
        handleMovement(e.which);
    });

    //     alert(score)

    $('#restartButton').click(resetGame);

    function handleMovement(key) {
        const doofusPos = doofus.position();
        setTimeout(function() {
            switch (key) {


//if(e.key==65)

case 37: case 65: // Leftkey aur a letter key ka bhi
                if (doofusPos.left > 0) doofus.css('left', Math.max(0, doofusPos.left - moveStep));
                    break;
                    console.log('key press hui h');
                case 38: case 87: // Up key ka aur w letter key ka bhi
                    if (doofusPos.top > 0) doofus.css('top', Math.max(0, doofusPos.top - moveStep));
                    break;
         case 39: case 68: // Right key ka aur d key ka bhi
                    if (doofusPos.left + pulpitSize < gameWidth) doofus.css('left', Math.min(gameWidth - pulpitSize, doofusPos.left + moveStep));
            break;
                case 40: case 83: // Down key ka aur s key ka bhi
                    if (doofusPos.top + pulpitSize < gameHeight) doofus.css('top', Math.min(gameHeight - pulpitSize, doofusPos.top + moveStep));
                    break;
            }
            checkIfOnPulpit();
        }, moveDelay);
    }

    function resetGame() {
        score = 0;
        $('#score').text(score);
        //konsi key press hui h






        doofus.css({ top: '0px', left: '0px' });
        $('#gameOver').hide();
        clearInterval(gameInterval);
        pulpits.forEach(p => p.remove());



pulpits = [];
        spawnPulpit();

        //game loop interval 3 baar chl chuka hoga tb check hona h game over ya ni
        gameInterval = setInterval(gameLoop, gameLoopInterval);
    }

    function gameLoop() {
        if (pulpits.length < 2) spawnPulpit();

pulpits.forEach((pulpit, index) => {
let remainingLife = pulpit.data('lifetime') - gameLoopInterval;
pulpit.data('lifetime', remainingLife);
 if (remainingLife <= 0) {
                 pulpit.remove();
             pulpits.splice(index, 1);
        }
    });

        checkGameOver();
    }

function spawnPulpit() {//take the position generate by get random number and placetile
        const pulpit = $('<div class="pulpit"></div>');
        let randomX, randomY;

        do {
            randomX = Math.floor(Math.random() * (gameWidth / pulpitSize)) * pulpitSize;
            randomY = Math.floor(Math.random() * (gameHeight / pulpitSize)) * pulpitSize;
        } while (pulpits.some(p => p.position().left === randomX && p.position().top === randomY));

 pulpit.css({ left: randomX, top: randomY });
        pulpit.data('lifetime', getRandomInt(pulpitLifetimeRange.min, pulpitLifetimeRange.max));
                              gameContainer.append(pulpit);
        pulpits.push(pulpit);
    }

    function checkIfOnPulpit() {
const doofusPos = doofus.position();
        const onPulpit = pulpits.some(pulpit => {
            const pulpitPos = pulpit.position();
            //check kr rha ki tile p h ya ni h
            return (
                doofusPos.left >= pulpitPos.left &&

       doofusPos.left < pulpitPos.left + pulpitSize &&
                     doofusPos.top >= pulpitPos.top &&
                doofusPos.top < pulpitPos.top + pulpitSize
            );
        });

if (onPulpit) {
   score++;
            $('#score').text(score);
        }
    }

                  function checkGameOver() {
        const doofusPos = doofus.position();
        const onPulpit = pulpits.some(pulpit => {
            const pulpitPos = pulpit.position();
            return (


                doofusPos.left >= pulpitPos.left &&
                      doofusPos.left < pulpitPos.left + pulpitSize &&
                doofusPos.top >= pulpitPos.top &&
                 doofusPos.top < pulpitPos.top + pulpitSize
            );
        });

        if (!onPulpit) endGame();//agar tile p ni mila to onpulpit
    }

function endGame() {
        clearInterval(gameInterval);
        $('#gameOver').show();
    }

function getRandomInt(min, max) {//tile ki position generate hogi is se



     return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
