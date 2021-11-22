const g_state = {
    canvas : document.getElementById("myCanvas"),
    context : null,
    ball_radius : 15,
    max_speed_range : 4,
    balls : [],
    is_started : false,
    colors_red_white : ["red", "white"],
    interval_Id : 0,
    interval_Id_2 : 0, 
    timer_interval : 0,
    default_timer : 60,
    btn_start : document.querySelector("#btn_start"),
    btn_stop : document.querySelector("#btn_stop"),
    btn_reset : document.querySelector("#btn_reset"),
}
//-----------------------------Canvas-----------------------------//
g_state.context = g_state.canvas.getContext("2d");
g_state.context.fillStyle = "white";

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
    for(let i = 0; i < g_state.balls.length; i++)
        drawBall(g_state.balls[i]);
}
//-----------------------------functions-----------------------------//

//initialize balls functions
function initBalls(){
    createBall(g_state.ball_radius,getRndIntegerForPosition(g_state.canvas.height-g_state.ball_radius,g_state.ball_radius),
                getRndInteger(g_state.max_speed_range), getRndInteger(g_state.max_speed_range)); // left
    createBall(getRndIntegerForPosition(g_state.canvas.width-g_state.ball_radius,g_state.ball_radius), g_state.canvas.height - g_state.ball_radius,
                getRndInteger(g_state.max_speed_range), getRndInteger(g_state.max_speed_range)); // bottom
    createBall(getRndIntegerForPosition(g_state.canvas.width-g_state.ball_radius,g_state.ball_radius), g_state.ball_radius,
                getRndInteger(g_state.max_speed_range), getRndInteger(g_state.max_speed_range)); // up
    createBall(g_state.canvas.width - g_state.ball_radius, getRndIntegerForPosition(g_state.canvas.height-g_state.ball_radius,g_state.ball_radius),
                getRndInteger(g_state.max_speed_range), getRndInteger(g_state.max_speed_range)); // right
}

function createBall(x, y, dx, dy){
    const res_ball = new Ball(x, y, dx, dy, 0);
    g_state.balls.push(res_ball);
}


//draw balls functions
function draw(){
    g_state.context.clearRect(0, 0, g_state.canvas.width, g_state.canvas.height);

    for(let i = 0; i < g_state.balls.length; i++){ 
        drawBall(g_state.balls[i]);
        moveBall(g_state.balls[i]);
    }

    if(g_state.balls.length == 1){
        finishGame();
    }
    
}

function drawBall(ball){
    const rand_color1 = g_state.colors_red_white[Math.floor(Math.random()*g_state.colors_red_white.length)];
    const rand_color2 = g_state.colors_red_white[Math.floor(Math.random()*g_state.colors_red_white.length)];
    drawBallHelper(ball, "black", g_state.ball_radius);

    if(ball.kills == 0)
    {
        drawBallHelper(ball, "white", g_state.ball_radius/1.5);
        drawBallHelper(ball, "black", g_state.ball_radius/2.5);
        drawBallHelper(ball, "red", g_state.ball_radius/6);
    }
    else if(ball.kills == 1)
    {
        drawBallHelper(ball, "cyan", g_state.ball_radius/1.5);
        drawBallHelper(ball, "white", g_state.ball_radius/2.5);
        drawBallHelper(ball, "blue", g_state.ball_radius/6);
    }
    else if(ball.kills == 2)
    {
        drawBallHelper(ball, rand_color1, g_state.ball_radius/1.5);
        drawBallHelper(ball, "purple", g_state.ball_radius/2.5);
        drawBallHelper(ball, rand_color2, g_state.ball_radius/6);
    }
    else
    {
        drawBallHelper(ball, "green", g_state.ball_radius/1.5);
    }
}

function drawBallHelper(ball, color, radius)
{
    g_state.context.beginPath();
    g_state.context.arc(ball.x, ball.y, radius, 0, Math.PI*2);
    g_state.context.fillStyle = color;
    g_state.context.fill();
    g_state.context.closePath();
}


function moveBall(ball){
    if(ball.x + ball.delta_x > g_state.canvas.width-g_state.ball_radius || ball.x + ball.delta_x < 0 + g_state.ball_radius) {
        ball.delta_x = -ball.delta_x;
    }
    if(ball.y + ball.delta_y > g_state.canvas.height-g_state.ball_radius || ball.y + ball.delta_y < 0 + g_state.ball_radius) {
        ball.delta_y = -ball.delta_y;
    }
    
    ball.x += ball.delta_x;
    ball.y += ball.delta_y;

}

function checkBallCollision(){
    for(let i = 0; i < g_state.balls.length; i++){
        for(let j = i+1; j < g_state.balls.length; j++){

            dx = g_state.balls[j].x - g_state.balls[i].x;
            dy = g_state.balls[j].y - g_state.balls[i].y;
            dist = Math.sqrt(dx*dx + dy*dy);

            if(dist < (2 * g_state.ball_radius))
            {
                normal_x = dx / dist;
                normal_y = dy / dist;
                midpoint_x = (g_state.balls[i].x + g_state.balls[j].x)/2;
                midpoint_y = (g_state.balls[i].y + g_state.balls[j].y)/2;

                rand_num = getRndInteger(1,0);

                if(rand_num == 1)
                {
                    g_state.balls[j].kills += 1;
                    g_state.balls.splice(i,1);
                }
                else
                {
                    g_state.balls[i].kills += 1;
                    g_state.balls.splice(j,1);
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


function start(){
    if(!g_state.interval_Id && !g_state.interval_Id_2){      // enable to add more interval of the function
        startTimer();
        g_state.interval_Id = setInterval(draw, 10);
        g_state.interval_Id_2 = setInterval(checkBallCollision, 10);
    }
}

function stop(){
    clearIntervals();
    g_state.interval_Id = 0;
    g_state.interval_Id_2 = 0;
}

function reset(){
    clearSummary();
    g_state.balls = [];
    initBalls();
    stop();
    draw();
    document.getElementById("time").disabled = false;
    document.getElementById("time").value = g_state.default_timer;
    g_stateis_started = false;
}

function startTimer(){
    g_stateis_started = true;
    document.getElementById("time").disabled = true;
    g_state.timer_interval = setInterval(decreaseTimer, 1000);

}

function decreaseTimer(){
    let timer = document.getElementById("time");
    timer.value = timer.value - 1;
    if(timer.value == 0){
        finishGame();
    }
}

function clearIntervals(){
    clearInterval(g_state.interval_Id);
    clearInterval(g_state.interval_Id_2);
    clearInterval(g_state.timer_interval);
}

function finishGame(){
    g_stateis_started = false;
    clearIntervals();
    let message;

    if(g_state.balls.length > 1){
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

g_state.btn_start.addEventListener("click", start);
g_state.btn_stop.addEventListener("click", stop);
g_state.btn_reset.addEventListener("click", reset);

//-----------------------------Warning message-----------------------------//
window.onbeforeunload = function () {  // WHY THE MESSAGE IS NOT COORECT ??????????
    if (g_state.is_started) {
      return "The game is not finished. Are you sure ?";
    }
};








