
window.onload=function(){
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    ctx.stroke();
};




// function Ball(start_x, start_y, start_wall){
//     this.x = start_x;
//     this.y = start_y;
//     this.wall = start_wall;
//     this.speed = 1;
//     //this.changeSpeed = function(new_speed) { this.speed = new_speed; }
// }

// function Wall(name, x, y){
//     this.name = name;
//     this.x = x;
//     this.y = y; 
// }

