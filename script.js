const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')


// contexto.fillStyle = "red"
// contexto.fillRect(300, 300, 50, 50)

const size = 30
const snake = [
    {x:270, y:240},
    {x: 300, y:240},

]

const drawSnake = () => {
    contexto.fillStyle = "green"
    

   snake.forEach((position,index) => {
  if(index == snake.length - 1){
    contexto.fillStyle = "darkgreen";
  }
  else {
    contexto.fillStyle = "green";
  }
    contexto.fillRect(position.x, position.y, size, size)
   })
}

// const drawSnake = () => {
//     contexto.fillStyle = "red"

//    snake.forEach((position,index) => {
//   if(index == snake.length - 1){
//     contexto.fillStyle="white"
//   }
//     contexto.fillRect(position.x, position.y, size, size)
//    })
// }

const randomNumber = (min,max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
  const number = randomNumber(0, canvas.width - size)
  return Math.round(number / 30) * 30
}

const randomColor = () =>{
  const red = randomNumber(0,255)
  const green = randomNumber(0,255)
  const blue = randomNumber(0,255)

  return `rgb(${red},${green},${blue})`
}


const food = {
  // x: randomPosition(),
  x: randomPosition(),
  y: randomPosition(),
  color: randomColor()
}

const drawFood = () => {
  const {x, y, color} = food

  contexto.shadowColor = "yellow"
  contexto.shadowBlur = 35
  contexto.fillStyle = color

  contexto.fillRect(x, y, size, size)
  contexto.shadowBlur = 0
};


let direction, loopId


const moveSnake = () =>{
    if (!direction) return

    const head = snake[snake.length - 1];

   if(direction == "right") {
    snake.push({ x: head.x + size, y: head.y })
   }
   if(direction == "left") {
    snake.push({ x: head.x - size, y: head.y })
   }
   if(direction == "down") {
    snake.push({ x: head.x, y: head.y + size })
   }
   if(direction == "up") {
    snake.push({ x: head.x, y: head.y - size })
   }
   snake.shift()
}

const drawGrid = () => {
  contexto.lineWidth = 1
  contexto.strokeStyle = " rgb(47, 47, 47)"

for (let i = 30; i < canvas.width; i += 30){
  contexto.beginPath()
  contexto.lineTo(i,0)
  contexto.lineTo(i,600)
  contexto.stroke()

  contexto.beginPath()
  contexto.lineTo(0,i)
  contexto.lineTo(600,i)
  contexto.stroke()
}
}

const checkEat = () => {
const head = snake[snake.length - 1]

if (head.x == food.x && head.y == food.y) {
    snake.push(head)

  // food.x = randomPosition(),
  // food.y = randomPosition(),
  // food.color = randomColor()

  let x = randomPosition()
  let y = randomPosition()

  while (snake.find((position) => position.x == x && position.y == y)){
    x = randomPosition()
    y = randomPosition()
  }

  food.x = x
  food.y = y
  food.color = randomColor()
}
}


const checkCollision = () => {
  const head = snake[snake.length - 1];
  const canvasLimit = canvas.width - size;
  const neckIndex = snake.length - 2;

  const wallCollision
   = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

  
  const selfCollision = snake.find((position, index) => {
    return index < neckIndex && position.x == head.x && position.y == head.y
  })

  if (selfCollision || wallCollision) {
    location.reload();
    alert("Fim de jogo");
  }
};

const gameOver = () => {
  direction = undefined
}

const gameLoop = () => {
  clearInterval(loopId)
    contexto.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout(() =>{
      gameLoop()
    }, 100)

    // lembrar de botar um botão de fácil, médio e difícil
}

gameLoop()

document.addEventListener("keydown", ({key}) => {
 if(key == "ArrowRight" && direction != "left"){
  direction = "right"
 }
 if(key == "ArrowLeft" && direction != "right"){
  direction = "left"
 }
 if(key == "ArrowUp" && direction != "down"){
  direction = "up"
 }
 if(key == "ArrowDown" && direction != "up"){
  direction = "down"
 }
})