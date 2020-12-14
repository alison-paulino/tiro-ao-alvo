

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
    music[1].play();
    
  }

 const myGameArea = {
    canvas: document.querySelector('#canvas'),
    spaceControl : false,
    press : 0,
    balls : [],
    countRound : 0,
    score : 0,
    countHits : 0,
    level : 0,
    message : true,
    start: function() {
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = 800;
      this.canvas.height = 500;
      if(!this.interval){
        this.interval = setInterval(updateGameArea, 20);
      }
    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 
    stop : function (){
      clearInterval(this.interval);
      music[1].play();

      if(this.countRound % 5  === 0 ) {
       if(this.countRound /5 * this.countHits  < this.countRound / 5 * 3 ){
          this.counRound = 0;
        return  myGameArea.gameOver();
        }else 
        myGameArea.level += 1;
        myGameArea.countHits = 0;
        setTimeout(this.newRound, 1000);
      }
      else{
           console.log(myGameArea.message);
        if(myGameArea.message === true){
           myGameArea.ctx.fillStyle = 'red';
           myGameArea.ctx.font = '28px serif';
           myGameArea.ctx.fillText(`Tente Novamente`,320,130);
        }
        setTimeout(this.newRound, 1000);
      }
        
    },
    gameOver: function () {
      console.log('entrei no game over')
      music[1].pause();
      music[2].play();
      myGameArea.clear();
      let img = new Image();
      img.src = './images/fundo1.jpg';
      img.onload = function() {
      myGameArea.ctx.drawImage(img,0,0,800,500);
      myGameArea.ctx.fillStyle = '#350E9E';
      myGameArea.ctx.fillStyle = 'red';
      myGameArea.ctx.font = '38px serif';
      myGameArea.ctx.fillText('GAME OVER',280,150);
      myGameArea.ctx.fillText(`Pontuação: ${myGameArea.score} `,280,250);
      myGameArea.ctx.fillText(`Level: ${myGameArea.level}`,280,300);
      }
      document.getElementById("restart-button").style.display = "block";
      document.getElementById("restart-button").onclick = function() {
        reStart();
      }
      document.getElementById("menu").style.display = "block";
      document.getElementById("menu").onclick = function() {
        window.location.href = "index.html";
      }

    },
    newRound: () => {
      myGameArea.balls.splice(0,1);
      snowMan.x = parseInt(Math.random() * (520-120) + 120);
      snowMan.speed = myGameArea.level + 2;
      console.log(snowMan.speed);
      getSpeed = 0;
      getX = 0;
      myGameArea.press = 0;
      forceControl.z = 2;
      forceControl.speed =150;
      directionControl.z = 2;
      directionControl.x = 0;
      myGameArea.interval = setInterval(updateGameArea, 20);
      
    },
  }
      function reStart(){
        music[1].play();
        document.getElementById("restart-button").style.display = 'none';
        document.getElementById("menu").style.display = 'none';
        myGameArea.canvas = document.querySelector('#canvas');
        myGameArea.press = 0;
        myGameArea.balls = [];
        myGameArea.countRound = 0;
        myGameArea.score = 0;
        myGameArea.countHits = 0;
        myGameArea.level = 0;
        snowMan.x = parseInt(Math.random() * (520-120) + 120);
        snowMan.speed = 2;
        getSpeed = 0;
        getX = 0;
        forceControl.z = 2;
        forceControl.speed =150;
        directionControl.z = 2;
        directionControl.x = 0;
        myGameArea.interval = setInterval(updateGameArea,20);
     }

  function startGame(){
    myGameArea.spaceControl = true;
    console.log("entrei na start");
    console.log(myGameArea.spaceControl);
    document.getElementById("game").style.display = 'flex';
    //document.getElementById("pageInitial").style.display = 'none';
    document.getElementById("home").style.display = 'none';
    document.getElementById("regras").style.display = 'none';
    document.getElementById("owner").style.display = 'none';
    document.getElementById("my-menu").style.display = 'none';
    myGameArea.start();
  }
  function updateGameArea(){
    myGameArea.clear();
    background.draw();
    snowMan.draw();
    snowMan.move();
    directionControl.draw();
    directionControl.move();
    forceControl.draw();
    forceControl.move();
    updateBall();
    checkColisao();
  }
  function updateBall(){
    for(let i = 0; i < myGameArea.balls.length; i += 1){
      myGameArea.balls[i].move();
      myGameArea.balls[i].draw();
    }
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
    myGameArea.ctx.fillStyle = 'red';
    myGameArea.ctx.font = '28px serif';
    myGameArea.ctx.fillText(`Rodada ${myGameArea.countRound}`,20,30);
    myGameArea.ctx.fillText(`Acertos ${myGameArea.score}`,155,30);
    myGameArea.ctx.fillText(`Nivel ${myGameArea.level}`,300,30);
    
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
    myGameArea.ctx.drawImage(this.img, this.x - 35, this.y,this.width, this.height);    
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
        if(this.x > 500) this.x -= 0.08;
        else{
          if(this.x < 300) this.x += 0.22;
        }
        console.log(this.x);
      }
      if(this.speed == -1){ 
        this.y += this.speed;
        this.width -= 0.5;
        this.height -= 0.5;
        if(this.x > 500) this.x -= 0.08;
        else{
          if(this.x < 300) this.x += 0.22;
        }
        console.log(this.x);
      }
      if(this.speed == -1.5){ 
        this.y += this.speed;
        this.width -= 0.75;
        this.height -= 0.75;
        if(this.x > 500) this.x -= 0.08;
        else{
          if(this.x < 300) this.x += 0.22;
        }
        console.log(this.x);
      }
      if(this.speed == -2){ 
        this.y += this.speed;
        this.width -= 1;
        this.height -= 1;
        if(this.x > 500) this.x -= 0.08;
        else{
          if(this.x < 300) this.x += 0.22;
        }
        console.log(this.x);
      }
      if(this.speed == -2.5){ 
        this.y += this.speed;
        this.width -= 1.3;
        this.height -= 1.3;
        if(this.x > 500) this.x -= 0.08;
        else{
          if(this.x < 300) this.x += 0.22;
        }
        console.log(this.x);
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

  function checkColisao(){
    myGameArea.message = true;
    for(let i =0; i < myGameArea.balls.length; i += 1){
    if(myGameArea.balls[0].y < 305){
        myGameArea.countRound += 1;
      if(snowMan.checkCrash(myGameArea.balls[0])===true){
        music[1].pause();
        music[0].play();
        myGameArea.balls[0].speed = 0;
        myGameArea.balls[0].y = 306;
        snowMan.speed = 0;
        myGameArea.countHits += 1;
        myGameArea.score += 1;
        myGameArea.message = false;
      
        myGameArea.stop();
      }
      if(snowMan.checkCrash(myGameArea.balls[0])===false){
        console.log('não colidiu');
        myGameArea.balls[0].speed = 0;
        myGameArea.balls[0].y = 306;
        snowMan.speed = 0;
        myGameArea.stop();
      }
     
    }
  }
  }
  
  class SnowMan{
    constructor(source, x, width, height,speed){
      this.img = new Image();
      this.img.src = source;
      this.x = x;
      this.y = 160;
      this.width = width;
      this.height = height;
      //this.speed = 2;
      this.speed = speed;
    }
    draw(){
        myGameArea.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    move(){
      this.x += this.speed;
     if(this.x >= canvas.width - 200) this.speed = - this.speed;
     if(this.x <= (canvas.width -canvas.width) + 100) this.speed = - this.speed;
    
    }
    left(){
      return this.x + 10;
    }
    rigth(){
      return this.x -10 + this.width;
    }
    checkCrash(ball){
      return !(ball.left()> this.rigth()||ball.rigth()<this.left())
    }
  }  
  const snowMan = new SnowMan('./images/boneco3.png',120, 120, 200, 2);
  //const snowBall = new SnowBall('./images/bola-de-neve.png',450, 439, 100, 100);
  const snowBall = new SnowBall();
  function newBall(x,speed){
    myGameArea.balls.push(new SnowBall('./images/bad-ball.png',x, 439, 100, 100, speed));
    console.log(myGameArea.balls[0]);
  }
let getX = 0;
let getSpeed = 0;
document.addEventListener('keydown', (e) => {
  if(myGameArea.spaceControl === true){
  if(myGameArea.press === 0){
    if (e.keyCode === 32) {
      getX = directionControl.x;
      directionControl.z = 0;
    }
  }
  if(myGameArea.press === 1){
    if (e.keyCode === 32) {
      getSpeed = forceControl.speed;
      forceControl.z = 0;
      newBall(getX, getSpeed);
      myGameArea.press = 1;
    }
  }
  myGameArea.press +=1;
}
})

class ForceControl{
  constructor(){
    this.speed = 150;
    this.z = 0;
    this.img = new Image();
    this.img.src = './images/barra-velocidade.png'
  }
  draw(){
    myGameArea.ctx.drawImage(this.img,10,150,20,200);
    myGameArea.ctx.strokeRect(10, 150, 20,200);
    myGameArea.ctx.fillStyle = 'red';
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
    myGameArea.ctx.fillStyle = 'white';
    myGameArea.ctx.strokeRect(0, 480, 800,20);
    myGameArea.ctx.fill();
    myGameArea.ctx.beginPath(); 
    myGameArea.ctx.arc(this.x, 480, 15, 0, Math.PI *2);
    myGameArea.ctx.closePath();
  }
  move(){
    this.x += this.z;
     if(this.x === 0) this.z = 2;
    if(this.x === 800)this.z = -2
  }
}

  const background = new Background('./images/fundo2.jpg',800, 600);
  const directionControl = new DirectionControl();
  const forceControl = new ForceControl();

  
}  
