let points1 = 0;
let points2 = 0;
let timeDisp = document.getElementById('time');
let info = document.getElementById('info');
const player1 = document.getElementById('p1');
const player2 = document.getElementById('p2');


function timeCount() {
    let chosenTime = Math.floor((Math.random()*10)+1);
    console.log(chosenTime);
    info.innerHTML = `Wylosowany czas jest równy ${chosenTime}s`;
    let time = setTimeout(alertME, chosenTime*1000);
}

function alertME() {
    window.alert('Czas minął!!');
}

window.addEventListener("keydown", function(event){
    if (event.defaultPrevented) {
        return;
    }
    switch(event.key){
        case "a":
            console.log('aaa');
            addPoints(1)
            break;
        case 'l':
            console.log('lll');
            addPoints(2)
            break;
        default:
            return;
    }
    event.preventDefault();
}, true)

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