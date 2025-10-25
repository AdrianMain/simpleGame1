let points1 = 0;
let points2 = 0;
let isp1blocked = false;
let isp2blocked = false;
let timeDisp = document.getElementById('time');
let info = document.getElementById('info');
const player1 = document.getElementById('p1');
const player2 = document.getElementById('p2');
const light = document.getElementById('light');
const start = document.getElementById('start');
const block1 = document.getElementById('block1');
const block2 = document.getElementById('block2');
let roundNumber = 0;

// timeCount()   dla rozpoczęcia jednej rundy

function listenerFunc(event) {
        if (event.defaultPrevented) {
        return;
    }
    switch(event.key){
        case "a":
            if(!isp1blocked) {
                console.log('aaa');
                addPoints(1);
                window.removeEventListener("keydown", listenerFunc, true);
                changingLight('Grey');
                player1.classList.add('rotate');
                setTimeout(()=> player1.classList.remove('rotate'), 3000);
                setTimeout(gameManager, 3000);
            }
            break;
        case 'l':
            if(!isp2blocked) {
                console.log('lll');
                addPoints(2);
                window.removeEventListener("keydown", listenerFunc, true);
                changingLight('Grey');
                player2.classList.add('rotate');
                setTimeout(()=> player2.classList.remove('rotate'), 3000);
                setTimeout(gameManager, 3000);
            }
            break;
        default:
            return;
    }
    event.preventDefault();
}
function setTrap(event) {
    console.log('trap activated');
        if (event.defaultPrevented) {
        return;
    }
    switch(event.key){
        case "a":
            if(!isp1blocked) {
                block1.classList.add('block');
                isp1blocked = true;
                setTimeout(()=> {block1.classList.remove('block'); isp1blocked = false;}, 2000);
            }
            break;
        case 'l':
            if(!isp2blocked) {
                block2.classList.add('block');
                isp2blocked = true;
                setTimeout(()=> {block2.classList.remove('block'); isp2blocked = false;}, 2000);
            }
            break;
        default:
            return;
    }
    event.preventDefault();
}


function gameManager() {
    roundNumber ++;
    if(roundNumber<=10) {
        roundManager(roundNumber);
    }
    else {
        endGame();
    }
}
function roundManager(num) {
    changingLight('');
    light.classList.remove('trafficLight');
    light.classList.add('roundManager');
    light.innerHTML = 'Runda '+ num;
    setTimeout(timeCount, 3000);
}


function startGame() {
    start.style.display = 'none';
    gameManager();
}

function timeCount() {
    light.innerHTML = '';
    light.classList.remove('roundManager');
    light.classList.add('trafficLight');
    let chosenTime = Math.floor((Math.random()*6)+1)+1;
    console.log(chosenTime);
    // info.innerHTML = `Wylosowany czas jest równy ${chosenTime}s`;
    window.addEventListener("keydown", setTrap, true);
    setTimeout(() => window.removeEventListener("keydown", setTrap, true), (chosenTime*1000)-20);
    changingLight('Red');
    setTimeout(() => changingLight('Yellow'), (chosenTime*1000)-900);
    setTimeout(startRound, chosenTime*1000);
}

function startRound() {
    window.addEventListener("keydown",listenerFunc ,true)
    changingLight('Green');
    console.log('START');
}

function addPoints(who) {
    if (who == 1) {
        points1 += 1;
        player1.innerHTML = `Punkty: ${points1}`
    }
    if (who == 2) {
        points2 += 1;
        player2.innerHTML = `Punkty: ${points2}`
    }
}
function blockPlayer() {

}

function changingLight(color) {
    light.classList.remove('trafficRed');
    light.classList.remove('trafficYellow');
    light.classList.remove('trafficGreen');
    light.classList.remove('trafficGrey');
    text = 'traffic' + color;
    console.log('Changing to ' + text);
    light.classList.add(text);
}

function endGame() {
    changingLight('');
    light.classList.remove('trafficLight');
    light.classList.add('endGame');
    if(points1 > points2) {
        light.innerHTML = 'Gracz 1 wygrał!!';
    }
    else if(points1 < points2) {
        light.innerHTML = 'Gracz 2 wygrał!!';
    }
    else {
        light.innerHTML = 'Mamy remis!'
    }
}