// Posisiones de la snake y de la food

/*Posicion de la vivora */

let comidaX
let comidaY 
let snakeX = Math.floor(Math.random()*30)+1
let snakeY = Math.floor(Math.random()*30)+1
let direccion = ""
let puntaje = 0
let cuerpoSerpiente = []

let gameOver = false
let setIntervalId; 

let highScorePantalla = localStorage.getItem(".highScore") || 0


// tablero del juego

const battleField = document.querySelector(".game")
const score = document.querySelector(".score")
const highscore = document.querySelector(".highScore")

highscore.innerHTML = highScorePantalla


function comidaRandom(){
    comidaX = Math.floor(Math.random()*30)+1
    comidaY = Math.floor(Math.random()*30)+1
}

const handleGameOver = ()=>{
    clearInterval(setIntervalId)
    alert("Game Over")
    location.reload()
}
const movimiento = ()=>{
    /*Control de la direccion de la serpiente */
    if(direccion ==="ArrowDown"){
        snakeY+=1
        snakeX+=0
    } else if(direccion ==="ArrowUp"){
        snakeY-=1
        snakeX+=0
    } else if(direccion ==="ArrowLeft"){
        snakeY+=0
        snakeX-=1
    } else if(direccion === "ArrowRight"){
        snakeY+=0
        snakeX+=1
    }
    /*caso en que coma  la serpiente la comida  */
    if(comidaX===snakeX && comidaY===snakeY){
        comidaRandom()
        puntaje+=1
        cuerpoSerpiente.push([comidaY,comidaX])
        highScorePantalla = puntaje >= highScorePantalla ? puntaje : highScorePantalla	
        localStorage.setItem(".highScore", highScorePantalla)
        highscore.innerHTML = highScorePantalla
    }
    /*actualiza el campo visual cada que se ejecuta esta funcion que es cada 125ms */
    iniciarJuego()
}
/*este lo hice yo.  */
// const iniciarJuego = ()=>{
//     let ubicacionHTML = `<div class="food" style="grid-area:${comidaY}/${comidaX}"></div>`
//     ubicacionHTML+=`<div class="snake" style="grid-area:${snakeY}/${snakeX}"></div>`
    
//     score.innerHTML = puntaje

//     /*Parte nueva */

//     /*agrega una parte al div  */

//     for (let i = 0; i < cuerpoSerpiente.length; i++) {
//         ubicacionHTML += `<div class="snake" style="grid-area:${cuerpoSerpiente[i][0]}/${cuerpoSerpiente[i][1]}"></div>`;
//     }
// /*agrega una parte a la cabeza */
//     for (let i = 0; i < cuerpoSerpiente.length; i++) {
//         ubicacionHTML += `<div class="snake" style="grid-area:${cuerpoSerpiente[i][0]}/${cuerpoSerpiente[i][1]}"></div>`;
//     }
// /*este mueve el cuerpo exepto la cabeza */
//     for (let i = cuerpoSerpiente.length - 1; i > 0; i--) {
//         cuerpoSerpiente[i] = cuerpoSerpiente[i - 1]; // Cada parte del cuerpo toma la posición de la anterior
//     }
//     cuerpoSerpiente[0] = [snakeY, snakeX];
//     battleField.innerHTML = ubicacionHTML
// }

/*este lo hizo chatgpt */
const iniciarJuego = () => {
    // Comprueba antes de ejecutarse si gameover es true o false3

    if(gameOver) return handleGameOver()

    // Mueve el cuerpo de la serpiente, excepto la cabeza
    for (let i = cuerpoSerpiente.length - 1; i > 0; i--) {
        cuerpoSerpiente[i] = cuerpoSerpiente[i - 1]; // Cada parte del cuerpo toma la posición de la anterior
    }
    cuerpoSerpiente[0] = [snakeY, snakeX]; // Actualiza la cabeza

    // Crea el HTML para la comida y la serpiente
    let ubicacionHTML = `<div class="food" style="grid-area:${comidaY}/${comidaX}"></div>`;
    
    // Dibuja cada parte del cuerpo
    for (let i = 0; i < cuerpoSerpiente.length; i++) {
        ubicacionHTML += `<div class="snake" style="grid-area:${cuerpoSerpiente[i][0]}/${cuerpoSerpiente[i][1]}"></div>`;
        if(i !==0 && cuerpoSerpiente[0][1] === cuerpoSerpiente[i][1] && cuerpoSerpiente[0][0] === cuerpoSerpiente[i][0]){
            gameOver = true
        }
    }
    
    // Actualiza el puntaje
    score.innerHTML = puntaje;

    // Dibuja el campo de batalla
    battleField.innerHTML = ubicacionHTML;


    /*aca esta el control de que pasa si se va de los limites */
    if(snakeX<=0 || snakeX >30 ||snakeY<=0 || snakeY >30){
        gameOver = true
    }
}




document.addEventListener("keydown",(tipoDato)=>{
    direccion = tipoDato.key
})

// Inicia el juego
comidaRandom()
setIntervalId = setInterval(movimiento,125)



