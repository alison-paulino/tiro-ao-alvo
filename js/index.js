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
      this.interval = setInterval(updateGameArea, 10);
    },
    clear: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  function startGame(){
    myGameArea.start();
    background.draw();
    snowMan.draw(); 
  }
  
  function updateGameArea(){
    myGameArea.clear();
    background.draw();
    snowMan.draw();
    snowMan.move();
    //snowMan.checkCrash();
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
    console.log('desenhei o background')
    myGameArea.ctx.drawImage(this.img, this.x, this.y,this.width, this.height);
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
      this.speed = 1;
    }
    draw(){
      console.log('desenhei o boneco')
        myGameArea.ctx.drawImage(this.img, this.x, this.y,this.width, this.height);
    }
    move(){
     this.x += this.speed;
     if(this.x === 620) {
       this.speed = -1;
     }
     if(this.x === 120) this.speed = 1
     console.log(this.x)
     console.log(this.speed)
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
  const background = new Background('../images/fundo6.jpg',800, 500);
}  
