//-----------------------------Canvas-----------------------------//
let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
context.fillStyle = "white";

//-----------------------------Global variables-----------------------------//
const balls_number = 4;
const ball_radius = 15;
const max_speed_range = 4;
let balls = [];
let is_started = false;
let colors_red_white = ["red", "white"];

//-----------------------------Classes-----------------------------//
function Ball(x, y, dx, dy, kills){
    this.x = x;
    this.y = y;
    this.delta_x = dx;
    this.delta_y = dy;
    this.kills = kills;
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
    const res_ball = new Ball(x, y, dx, dy, 0);
    balls.push(res_ball);
}


//draw balls functions
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < balls.length; i++){ 
        drawBall(balls[i]);
        moveBall(balls[i]);
    }

    if(balls.length == 1){
        finishGame();
    }
    
}

function drawBall(ball){
    const rand_color1 = colors_red_white[Math.floor(Math.random()*colors_red_white.length)];
    const rand_color2 = colors_red_white[Math.floor(Math.random()*colors_red_white.length)];
    drawBallHelper(ball, "black", ball_radius);

    if(ball.kills == 0)
    {
        drawBallHelper(ball, "white", ball_radius/1.5);
        drawBallHelper(ball, "black", ball_radius/2.5);
        drawBallHelper(ball, "red", ball_radius/6);
    }
    else if(ball.kills == 1)
    {
        drawBallHelper(ball, "cyan", ball_radius/1.5);
        drawBallHelper(ball, "white", ball_radius/2.5);
        drawBallHelper(ball, "blue", ball_radius/6);
    }
    else if(ball.kills == 2)
    {
        drawBallHelper(ball, rand_color1, ball_radius/1.5);
        drawBallHelper(ball, "purple", ball_radius/2.5);
        drawBallHelper(ball, rand_color2, ball_radius/6);
    }
    else
    {
        drawBallHelper(ball, "green", ball_radius/1.5);
    }
}

function drawBallHelper(ball, color, radius)
{
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, Math.PI*2);
    context.fillStyle = color;
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
                {
                    balls[j].kills += 1;
                    balls.splice(i,1);
                }
                else
                {
                    balls[i].kills += 1;
                    balls.splice(j,1);
                }
                
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
let interval_Id,interval_Id_2, timer_interval;
const default_timer = 60;
const btn_start = document.querySelector("#btn_start");
const btn_stop = document.querySelector("#btn_stop");

function start(){
    if(!interval_Id && !interval_Id_2){      // enable to add more interval of the function
        startTimer();
        interval_Id = setInterval(draw, 10);
        interval_Id_2 = setInterval(checkBallCollision, 10);
    }
}

function stop(){
    clearIntervals();
    interval_Id = 0;
    interval_Id_2 = 0;
}

function reset(){
    clearSummary();
    balls = [];
    initBalls();
    stop();
    draw();
    // const button = document.getElementById("btn_start");
    // button.click();
    document.getElementById("time").disabled = false;
    document.getElementById("time").value = default_timer;
    is_started = false;
}

function startTimer(){
    is_started = true;
    document.getElementById("time").disabled = true;
    timer_interval = setInterval(decreaseTimer, 1000);

}

function decreaseTimer(){
    let timer = document.getElementById("time");
    timer.value = timer.value - 1;
    if(timer.value == 0){
        finishGame();
    }
}

function clearIntervals(){
    clearInterval(interval_Id);
    clearInterval(interval_Id_2);
    clearInterval(timer_interval);
}

function finishGame(){
    is_started = false;
    clearIntervals();
    // show finish message
    let message;
    if(balls.length > 1){
        message = "The game finished before all the balls evaporated !";
    }
    else{
        message = "The game finished before the times out !";
    }
    document.getElementById("summary").style.visibility = "visible";
    document.getElementById("summaryText").textContent += message;
}

function clearSummary(){
    document.getElementById("summary").style.visibility = "hidden";
    document.getElementById("summaryText").textContent = "";
}

btn_start.addEventListener("click", start);
btn_stop.addEventListener("click", stop);
btn_reset.addEventListener("click", reset);

//-----------------------------Warning message-----------------------------//
window.onbeforeunload = function () {  // WHY THE MESSAGE IS NOT COORECT ??????????
    if (is_started) {
      return "The game is not finished. Are you sure ?";
    }
};








