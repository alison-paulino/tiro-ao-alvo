window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  }
  
 
 const myGameArea = {
    canvas: document.querySelector('#canvas'),
    clicks : 0,
    press : 0,
    balls : [],
      start: function() {
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = 800;
      this.canvas.height = 500;
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 
    stop : function (){
      console.log('entrei no stop')
      clearInterval(this.interval);
      console.log('executei clear interval')
      setTimeout(this.gameOver, 1000);
    },
    gameOver: function () {
      console.log('entrei no game over')
      myGameArea.clear();
    }
  }
  function startGame(){
    myGameArea.start();
    background.draw();
    snowMan.draw(); 
    //snowBall.draw();
  }
  function updateGameArea(){
    myGameArea.clear();
    background.draw();
    snowMan.draw();
    snowMan.move();
    //snowMan.checkCrash();
    directionControl.draw();
    directionControl.move();
    forceControl.draw();
    forceControl.move();
    myGameArea.balls[0].draw();
    myGameArea.balls[0].move();
    verColisao();
  }
  
  class Background {
    constructor(source, width, height){
      this.img = new Image();
      this.img.src = source;
      this.x = 0;
      this.y = 0;
      this.width = width;
      this.height = height;
    }
    draw() {
    myGameArea.ctx.drawImage(this.img, this.x, this.y,this.width, this.height);
    }
  }  

  class SnowBall{
    constructor(source, x, y, width, height,speed){
      this.img = new Image();
      this.img.src = source;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
    }
    draw(){
    myGameArea.ctx.drawImage(this.img, this.x, this.y,this.width, this.height);    
    }
    move(){ 
      if(this.speed >= 150 && this.speed < 187) this.speed = -2.5
      if(this.speed >= 187 && this.speed < 224) this.speed = -2
      if(this.speed >= 224 && this.speed < 261) this.speed = -1.5
      if(this.speed >= 261 && this.speed < 298) this.speed = -1
      if(this.speed >= 298 && this.speed < 330) this.speed = -0.5
      if(this.y < 440 && this.y >= 305) {
      if(this.speed == -0.5){ 
        this.y += this.speed;
        this.width -= 0.25;
        this.height -= 0.25;
        if(this.x > 500) this.x -= 0.1;
      }
      if(this.speed == -1){ 
        this.y += this.speed;
        this.width -= 0.5;
        this.height -= 0.5;
        if(this.x > 500) this.x -= 0.1;
      }
      if(this.speed == -1.5){ 
        this.y += this.speed;
        this.width -= 0.75;
        this.height -= 0.75;
        if(this.x > 500) this.x -= 0.1;
      }
      if(this.speed == -2){ 
        this.y += this.speed;
        this.width -= 1;
        this.height -= 1;
        if(this.x > 500) this.x -= 0.1;
      }
      if(this.speed == -2.5){ 
        this.y += this.speed;
        this.width -= 1.3;
        this.height -= 1.3;
        if(this.x > 500) this.x -= 0.1;
      }
      
      }
      
     }
  left(){
      return this.x;
    }
    rigth(){
      return this.x + this.width;
    }
  }

  function verColisao(){
    if(myGameArea.balls[0].y < 305){
        
      if(snowMan.checkCrash(myGameArea.balls[0])===true){
        console.log('colisão')
        myGameArea.balls[0].speed = 0;
        myGameArea.balls[0].y = 306;

        myGameArea.stop();
      //myGameArea.ctx.fillRect(300,300,100,100);
      //myGameArea.ctx.clearRect(300,300,100,100);
      
      }
      if(snowMan.checkCrash(myGameArea.balls[0])===false){
        console.log('não colidiu')
      myGameArea.ctx.fillRect(400,400,100,100);
      myGameArea.ctx.clearRect(400,400,100,100);
      }
     
    }
  }

  class SnowMan{
    constructor(source, x, width, height){
      this.img = new Image();
      this.img.src = source;
      this.x = x;
      this.y = 160;
      this.width = width;
      this.height = height;
      this.speed = 2;
    }
    draw(){
        myGameArea.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    move(){
     this.x += this.speed;
     if(this.x === 620) this.speed = -2;
     if(this.x === 120) this.speed = 2
    
    }
    left(){
      return this.x + 15;
    }
    rigth(){
      return this.x -15 + this.width;
    }
    checkCrash(ball){
      return !(ball.left()> this.rigth()||ball.rigth()<this.left())
    }
  }  

  
  const snowMan = new SnowMan('../images/boneco3.png',120, 120, 200);
  //const snowBall = new SnowBall('../images/bola-de-neve.png',450, 439, 100, 100);
  const snowBall = new SnowBall();
  function newBall(x,speed){
    myGameArea.balls.push(new SnowBall('./images/bola-de-neve.png',x, 439, 100, 100, speed));
    console.log(myGameArea.balls);
  }
  
/*  
document.addEventListener('click', getPosition, true);
let clickPosition = {x : 0, speed : 0}
function getPosition(e) {
  if(myGameArea.clicks === 0){
    // click botao start
    console.log(myGameArea.clicks);
    }
    if(myGameArea.clicks ===1){
      clickPosition.x = e.pageX;
      console.log(myGameArea.clicks);
    }
    if(myGameArea.clicks ===2){
      clickPosition.speed = e.pageY;
      console.log(myGameArea.clicks);
      newBall(clickPosition.x, clickPosition.speed);
      myGameArea.clicks = 0;
    }
    myGameArea.clicks += 1;    
} */
let getX = 0;
let getSpeed = 0;
document.addEventListener('keydown', (e) => {
  console.log(myGameArea.press);
  if(myGameArea.press === 0){
    if (e.keyCode === 32) {
      getX = directionControl.x;
      directionControl.z = 0;
      console.log(getX);
    }
  }
  if(myGameArea.press === 1){
    if (e.keyCode === 32) {
      getSpeed = forceControl.speed;
      forceControl.z = 0;
      console.log(getSpeed);
      newBall(getX, getSpeed);
      myGameArea.press = 1;
      
    }
  }
  myGameArea.press +=1;
})

class ForceControl{
  constructor(){
    this.speed = 150;
    this.z = 0;
  }
  draw(){
    myGameArea.ctx.fillStyle = 'red';
    myGameArea.ctx.strokeRect(10, 150, 20,200);
    myGameArea.ctx.fill();
    myGameArea.ctx.beginPath(); 
    myGameArea.ctx.fillRect(10, this.speed, 20, 20);
    myGameArea.ctx.closePath();
  }
  move(){
    this.speed += this.z;
    if(this.speed === 150) this.z = 2;
   if(this.speed === 330)this.z = -2
  }
}  

 class DirectionControl{
   constructor(){
     this.x = 0;
     this.z = 0;
   }
 
  draw(){
    myGameArea.ctx.fillStyle = 'red';
    myGameArea.ctx.strokeRect(0, 480, 800,20);
    myGameArea.ctx.fill();
    myGameArea.ctx.beginPath(); 
    myGameArea.ctx.arc(this.x, 480, 15, 0, Math.PI *2);
    //myGameArea.ctx.fillRect((this.x), 480, 800,15);
    myGameArea.ctx.closePath();
  }
  move(){
    this.x += this.z;
     if(this.x === 0) this.z = 2;
    if(this.x === 800)this.z = -2
  }
}
  const background = new Background('../images/fundo6.jpg',800, 500);
  const directionControl = new DirectionControl();
  const forceControl = new ForceControl();
}  
