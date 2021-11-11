
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

context.fillStyle = "black";
const balls_number = 4;

let balls = [];

const ball1 = new Ball(0, canvas.height / 2);  // left
balls.push(ball1);
const ball2 = new Ball(canvas.width  / 2, canvas.height);   // up
balls.push(ball2);
const ball3 = new Ball(canvas.width  / 2, 0);    // bottom
balls.push(ball3);
const ball4 = new Ball(canvas.width, canvas.height / 2);   // right
balls.push(ball4);

const ballRadius = 20;

function drawBall(ball){
    context.beginPath();
    context.arc(ball.x, ball.y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    // console.log(balls.length);
    for(let i = 0; i < balls.length; i++){
        drawBall(balls[i]);
        moveBall(balls[i]);
    }

}

function moveBall(ball){
    if(ball.x + ball.delta_x > canvas.width-ballRadius || ball.x + ball.delta_x < ballRadius) {
        ball.delta_x = -ball.delta_x;
    }
    if(ball.y + ball.delta_y > canvas.height-ballRadius || ball.y + ball.delta_y < ballRadius) {
        ball.delta_y = -ball.delta_y;
    }
    
    ball.x += ball.delta_x;
    ball.y += ball.delta_y;
}



function Ball(x, y){
    this.x = x;
    this.y = y;
    this.delta_x = 20;
    this.delta_y = -20;
}

let intervalId;

const btn_start = document.querySelector("#btn_start");
const btn_stop = document.querySelector("#btn_stop");

function start(){
    if(!intervalId){                  // enable to add more interval of the function
        console.log("inside start function")
        intervalId = setInterval(draw, 150);
    }
}

function stop(){
    clearInterval(intervalId);
    intervalId = 0;
}

btn_start.addEventListener("click", start);
btn_stop.addEventListener("click", stop);

draw();

//   // declare variables
//   const FPS = 30;
//   var bs = 30;
//   var bx, by;
//   var xv, yv;
//   var canvas, context;
  
//   // load canvas
//   canvas = document.getElementById("myCanvas");
//   context = canvas.getContext("2d");

//   // set up interval (game loop)
//   setInterval(update, 1000 / FPS);
  
//   // ball starting position
//   bx = canvas.width / 2;
//   by = canvas.height / 2;
  
//   // random ball starting speed (between 25 and 100 pps)
//   xv = Math.floor(Math.random() * 76 + 25) / FPS;
//   yv = Math.floor(Math.random() * 76 + 25) / FPS;
  
//   // random ball direction
//   if (Math.floor(Math.random() * 2) == 0) {
//       xv = -xv;
//   }
//   if (Math.floor(Math.random() * 2) == 0) {
//       yv = -yv;
//   }
  
//   // update function
//   function update() {
//       // move the ball
//       bx += xv;
//       by += yv;
      
//       // bounce the ball off each wall
//       if (bx - bs / 2 < 0 && xv < 0) {
//           xv = -xv;
//       }
//       if (bx + bs / 2 > canvas.width && xv > 0) {
//           xv = -xv;
//       }
//       if (by - bs / 2 < 0 && yv < 0) {
//           yv = -yv;
//       }
//       if (by + bs / 2 > canvas.height && yv > 0) {
//           yv = -yv;
//       }
      
//       // draw background and ball
//       context.fillStyle = "black";
//       context.fillRect(0, 0, canvas.width, canvas.height);
//       context.fillStyle = "yellow";
//       context.fillRect(bx - bs / 2, by - bs / 2, bs, bs);
//   }





