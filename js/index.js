window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  }
 
 const myGameArea = {
    canvas: document.querySelector('#canvas'),
      start: function() {
        console.log('entrei na start')
      this.ctx = this.canvas.getContext('2d');
      this.canvas.width = 800;
      this.canvas.height = 500;
      this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 
    balls : [],
    /*stop : function (){
      this.clear();
      background.draw();
    }*/
  }
  function startGame(){
    myGameArea.start();
    background.draw();
    snowMan.draw(); 
    snowBall.draw();
  }
  function updateGameArea(){
    myGameArea.clear();
    background.draw();
    snowMan.draw();
    snowMan.move();
    //snowMan.checkCrash();
    snowBall.draw();
    snowBall.move();
    snowBall.directionControl();
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
    constructor(source, x, y, width, height){
      this.img = new Image();
      this.img.src = source;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = 0;
    }
    draw(){
    myGameArea.ctx.drawImage(this.img, this.x, this.y,this.width, this.height);    
    }
    move(){
      console.log(this.y)
      
      if(this.y < 440 && this.y > 305) {
        this.speed = -1;
      this.y += this.speed;
      this.width -= 0.5;
      this.height -= 0.5;
      this.x -= 0.1;
      }
      if(this.y === 305){
        console.log("check crash")
        
        if(snowMan.checkCrash(myGameArea.balls[0])===true){
        myGameArea.ctx.fillRect(300,300,100,100);
        myGameArea.ctx.clearRect(300,300,100,100);
        console.log(`x da bola ${this.x}`);
        console.log(`x do boneco ${snowMan.x}`)
        }
        myGameArea.stop();
      }
     }
  left(){
      return this.x;
    }
    rigth(){
      return this.x + this.width;
    }
    directionControl(){
      myGameArea.ctx.beginPath();
      myGameArea.ctx.fillRect(0, 480, 800,20);
      myGameArea.ctx.fillStyle = 'blue';
      myGameArea.ctx.fill();
      myGameArea.ctx.closePath()
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
      return this.x;
    }
    rigth(){
      return this.x + this.width;
    }
    checkCrash(ball){
      return !(ball.left()> this.rigth()||ball.rigth()<this.left())
    }
  }  

  
  const snowMan = new SnowMan('../images/boneco3.png',120, 120, 200);
  const snowBall = new SnowBall('../images/bola-de-neve.png',450, 439, 100, 100);
  myGameArea.balls.push(snowBall);
  console.log(myGameArea.balls);

  const background = new Background('../images/fundo6.jpg',800, 500);
  
}  
