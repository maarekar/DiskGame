//-----------------------------Canvas-----------------------------//
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
context.fillStyle = "black";

//-----------------------------Global variables-----------------------------//
const balls_number = 4;
const ball_radius = 12;
const max_speed_range = 4;
let balls = [];

//-----------------------------Classes-----------------------------//
function Ball(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.delta_x = dx;
    this.delta_y = dy;
}

//-----------------------------Main function-----------------------------//
Main();

function Main(){
    initBalls();
    for(let i = 0; i < balls.length; i++)
        drawBall(balls[i]);
}
//-----------------------------functions-----------------------------//

//initialize balls functions
function initBalls(){
    createBall(ball_radius,getRndIntegerForPosition(canvas.height-ball_radius,ball_radius),
                getRndInteger(max_speed_range), getRndInteger(max_speed_range)); // left
    createBall(getRndIntegerForPosition(canvas.width-ball_radius,ball_radius), canvas.height - ball_radius,
                getRndInteger(max_speed_range), getRndInteger(max_speed_range)); // bottom
    createBall(getRndIntegerForPosition(canvas.width-ball_radius,ball_radius), ball_radius,
                getRndInteger(max_speed_range), getRndInteger(max_speed_range)); // up
    createBall(canvas.width - ball_radius, getRndIntegerForPosition(canvas.height-ball_radius,ball_radius),
                getRndInteger(max_speed_range), getRndInteger(max_speed_range)); // right
}

function createBall(x, y, dx, dy){
    const res_ball = new Ball(x, y, dx, dy);
    balls.push(res_ball);
}


//draw balls functions
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // console.log(balls.length);
    for(let i = 0; i < balls.length; i++){ 
        drawBall(balls[i]);
        moveBall(balls[i]);
    }
    
}

function drawBall(ball){
    context.beginPath();
    context.arc(ball.x, ball.y, ball_radius, 0, Math.PI*2);
    context.fillStyle = "yellow";
    context.fill();
    context.closePath();
}


function moveBall(ball){
    if(ball.x + ball.delta_x > canvas.width-ball_radius || ball.x + ball.delta_x < 0 + ball_radius) {
        ball.delta_x = -ball.delta_x;
    }
    if(ball.y + ball.delta_y > canvas.height-ball_radius || ball.y + ball.delta_y < 0 + ball_radius) {
        ball.delta_y = -ball.delta_y;
    }
    
    ball.x += ball.delta_x;
    ball.y += ball.delta_y;

}

function checkBallCollision(){
    for(let i = 0; i < balls.length; i++){
        for(let j = i+1; j < balls.length; j++){

            dx = balls[j].x - balls[i].x;
            dy = balls[j].y - balls[i].y;
            dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < (ball_radius + ball_radius))
            {
                normal_x = dx / dist;
                normal_y = dy / dist;
                midpoint_x = (balls[i].x + balls[j].x)/2;
                midpoint_y = (balls[i].y + balls[j].y)/2;

                //do_somthing
                rand_num = getRndInteger(1,0);

                if(rand_num == 1)
                    balls.splice(i,1);
                else
                    balls.splice(j,1);
                
            }
        }
    }
}

//random functions
function getRndIntegerForPosition(max, min) {
    return (Math.floor(Math.random() * (max - min)) + 10);
  }

  function getRndInteger(num) {
    return (Math.floor(Math.random() * num) + 1);
  }


//-----------------------------Buttons handle-----------------------------//
let interval_Id,interval_Id_2;
const btn_start = document.querySelector("#btn_start");
const btn_stop = document.querySelector("#btn_stop");

function start(){
    if(!interval_Id && !interval_Id_2){      // enable to add more interval of the function

        interval_Id = setInterval(draw, 10);
        interval_Id_2 = setInterval(checkBallCollision, 10);
    }
}

function stop(){
    clearInterval(interval_Id);
    clearInterval(interval_Id_2);
    interval_Id = 0;
    interval_Id_2 = 0;
}

function reset(){
    balls = [];
    initBalls();
    const button = document.getElementById("btn_start");
    button.click();
}

btn_start.addEventListener("click", start);
btn_stop.addEventListener("click", stop);
btn_reset.addEventListener("click", reset);

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





