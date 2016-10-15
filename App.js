var player;
var foeA = new Array();
var foeB = new Array();
var numOffoeA;
var numOffoeB;

var fr = 30;

var bgImg;
var heartImg;
var playerImg;
var foeBImg;
var foeAImg;

var fontVag;
var playerDieSound;

function preload(){
	bgImg = loadImage("./assets/bg.PNG");
	heartImg = loadImage("./assets/heart.png"); 
	playerImg = loadImage("./assets/player.png");
	foeBImg = loadImage("./assets/foeB.png");
	foeAImg = loadImage("./assets/foeA.png");
	fontVag = loadFont("./assets/vag.ttf");
	playerDieSound = loadSound("./assets/playerDie.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(fr); 
	
	maxVelocity = createVector(10,10);
    maxPosition = createVector(windowWidth,windowHeight);

	//初始化玩家属性 
	var position = createVector(100,100);
	var velocity = createVector(0,0);
	var acc = createVector(0,0);
	
	//创建玩家对象
	player = new Player(position, velocity, acc, playerImg);

	
	//随机创建敌人对象
	randGenerateFoe();

	
}

function randGenerateFoe(){
	numOffoeA = parseInt(random(2,5));
	//numOffoeB = 10 - numOffoeA;
	numOffoeB = 1;
	
	//创建敌人对象
	for(var i = 0;i < numOffoeB;i++){
		var p = createVector(random(50,windowWidth - 50),random(50,windowHeight - 50));
		//var v = createVector(random(-2,2),random(-2,2));
		var a = random(-3,3);
		var b = random(-3,3);
		a = abs(a) > 1 ? a : (a = a > 0 ? a+1:a-1);
		b = abs(b) > 1 ? b : (b = b > 0 ? b+1:b-1);
		var v = createVector(a,b);
		var a = createVector(-0,0);
		
		foeB[i] = new Characters(p,v,a,foeBImg);
		//console.log("foeB["+i+"].position.x="+foeB[i].position.x);
		console.log("foeB["+i+"].velocity.x="+foeB[i].velocity.x+",foeB["+i+"].velocity.y="+foeB[i].velocity.y);

	}
}

function updateFoe(){
	for(var i = 0;i < numOffoeB;i++){ 
		foeB[i].accelerate(foeB[i].acc);
	    foeB[i].update();
	    foeB[i].display();
		
	}
	

}


function draw() {
  clear();
  background(bgImg); 
  showLife(player.life);
  
  push();
  textFont(fontVag);
  textSize(30);
  text("Life:", 30, 35);
  text("Time:"+frameCount , windowWidth-250, 35);
  pop();

  updateFoe();
  
  //显示玩家圆形
  player.display();
  updatePlayerLife();
  if(mouseIsPressed){
	  var accOfPlayer;
	  if(player.moveDistance <= 5){ 
		  player.position.x = player.position.x + 0.6 * (mouseX - player.position.x);
		  player.position.y = player.position.y + 0.6 * (mouseY - player.position.y);

	  }else{
		  player.position.x = player.position.x + 0.06 * (mouseX - player.position.x);
		  player.position.y = player.position.y + 0.06 * (mouseY - player.position.y);
	  }
	 // player.accelerate(acc);
	 // player.update();
	 player.display();
	
    }

  if(keyIsPressed === true){	  
	  var A = 0.5;
	  var acc;
	  
	  if(UP_ARROW==keyCode){
		  acc = createVector(0,-A);
		  player.accelerate(acc);
			  
	  }
	  else if(DOWN_ARROW==keyCode){
		acc = createVector(0,A);
		player.accelerate(acc);
	  }
	  else if(RIGHT_ARROW==keyCode){
		acc = createVector(A,0);
		player.accelerate(acc);
	  }
	  else if(LEFT_ARROW ==keyCode){
		acc = createVector(-A,0);
		player.accelerate(acc);
	  }
	  player.update();
	  player.display();
	  
  }

  
}

function keyReleased(){
	if(UP_ARROW==keyCode||DOWN_ARROW==keyCode||RIGHT_ARROW==keyCode||LEFT_ARROW==keyCode){
		
		console.log("玩家x方向上的加速度是："+player.acc.x+",y方向的加速度是："+player.acc.y);
		console.log("玩家x方向上的速度是："+player.velocity.x+",y方向的速度是："+player.velocity.y);
		console.log("玩家x方向上的坐标是："+player.position.x+",y方向的坐标是："+player.position.y);
		
		player.acc = createVector(0,0);
		player.velocity = createVector(0,0);
	}
}

function mousePressed(){
     player.moveDistance = dist(player.position.x, player.position.y, mouseX, mouseY);
	 player.isDragged = true;
	 console.log("mouseX="+mouseX+", mouseY="+mouseY);
	 
}

function mouseReleased(){
	player.isDragged = false;
}

function updatePlayerLife(){
	for(var i=0;i < numOffoeB;i++){
		var disToFoeB = dist(player.position.x, player.position.y, foeB[i].position.x, foeB[i].position.y);
		if(abs(disToFoeB) < 100){
			player.life--;
			playerDieSound.setVolume(0.1);
			playerDieSound.play();
		}
		console.log("玩家距敌人的距离是："+disToFoeB);
		console.log("玩家x方向上的坐标是："+player.position.x+",y方向的坐标是："+player.position.y);
		console.log("敌人x方向上的坐标是："+foeB[i].position.x+",y方向的坐标是："+foeB[i].position.y);
	}
	
}
function showLife(life){
	for(var i=0;i < life;i++){
		image(heartImg, 90 + i*35, 15);
	}
}
