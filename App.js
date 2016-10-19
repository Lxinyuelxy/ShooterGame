var player;
var foeA = new Array();
var foeB = new Array();
var mushroom = new Array();
var numOffoeA;
var numOffoeB;
var numOfMushroom = 3;

var fr = 30;

var bgImg;
var heartImg;
var playerImg;
var foeBImg;
var foeAImg;
var mushroomImg;
var fontVag;
var playerDieSound;
var winSound;
var loseSound;

var deathDis;
var delayFrame = 0;
var playedLoseSound = false;
var playedWinSound = false;

function preload(){
	bgImg = loadImage("./assets/bg.PNG");
	heartImg = loadImage("./assets/heart.png"); 
	playerImg = loadImage("./assets/player.png");
	foeBImg = loadImage("./assets/foeB.png");
	foeAImg = loadImage("./assets/foeA.png");
	mushroomImg = loadImage("./assets/mushroom.png");
	fontVag = loadFont("./assets/vag.ttf");
	playerDieSound = loadSound("./assets/playerDie.mp3");
	winSound = loadSound("./assets/win.wav");
	loseSound = loadSound("./assets/lose.wav");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(fr); 
	deathDis = foeBImg.width;
	
	maxVelocity = createVector(4,4);
    maxPosition = createVector(windowWidth,windowHeight);

	//初始化玩家属性 
	var position = createVector(100,100);
	var velocity = createVector(0,0);
	var acc = createVector(0,0);
	
	//创建玩家
	player = new Player(position, velocity, acc, playerImg);
	
	//随机创建敌人
	randGenerateFoe();
	
	//创建蘑菇
	randGenerateMushroom();


	
}

function randGenerateFoe(){
	numOffoeA = parseInt(random(2,5));
	numOffoeB = 10 - numOffoeA;
	
	for(var i = 0;i < numOffoeB;i++){
		var p = createVector(random(50,windowWidth - 50),random(50,windowHeight - 50));
		var a = random(-3,3);
		var b = random(-3,3);
		a = abs(a) > 1 ? a : (a = a > 0 ? a+1 : a-1);
		b = abs(b) > 1 ? b : (b = b > 0 ? b+1 : b-1);
		var v = createVector(a,b);
		var a = createVector(-0,0);
		
		foeB[i] = new Characters(p,v,a,foeBImg);
	}
	
	for(var i=0;i < numOffoeA;i++){
		var p = createVector(random(50,windowWidth - 50),random(50,windowHeight - 50));
		var v = createVector(0,0);
		var a = createVector(0,0);
		
		foeA[i] = new FoeA(p,v,a,foeAImg);
	}
}


function randGenerateMushroom(){
	for(var i = 0;i < numOfMushroom;i++){
		var p = createVector(random(20,windowWidth - 20),random(20,windowHeight - 20));
		var v = createVector(0,0);
		var a = createVector(0,0);
		
		mushroom[i] = new Characters(p,v,a,mushroomImg);
	}
}


function draw() {
  clear();
  frameRate(fr);
  background(bgImg); 
  showLife(player.life);
 
  
  if(player.life > 0){
	  player.display();
	  showMushroom(numOfMushroom);
	  
	  push();
      textFont(fontVag);
      textSize(30);
      text("Life:", 30, 35);
      text("Time: "+ parseInt(frameCount/30)+" s", windowWidth-250, 35);
      pop();
	  
	  updatePlayer();
	  updateFoe();
	  updateMushroom();
	  
 
	  delayFrame++;
      if(updatePlayerLife(deathDis)){
		  deathDis = 5;
		}
		
	  if(delayFrame == 40){
		  deathDis = foeBImg.width;
		  delayFrame = 0;
		}
	  
    }else{	
		gameOver();

	}
  
}

function updatePlayer(){
	updatePlayerWithMouse();
	updatePlayerWithKey();
}

function updatePlayerWithMouse(){
	if(mouseIsPressed){
		var accOfPlayer;
		if(player.moveDistance <= 5){
			player.position.x = player.position.x + 0.6 * (mouseX - player.position.x);
		    player.position.y = player.position.y + 0.6 * (mouseY - player.position.y);
		}else{
			player.position.x = player.position.x + 0.06 * (mouseX - player.position.x);
			player.position.y = player.position.y + 0.06 * (mouseY - player.position.y);
		}
		player.display();
	}
}

function updatePlayerWithKey(){
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

function updateFoe(){
	for(var i = 0;i < numOffoeB;i++){ 
		foeB[i].accelerate(foeB[i].acc);
	    foeB[i].update();
	    foeB[i].display();
	}
	
	for(var i = 0;i < numOffoeA;i++){
		var a = createVector(0.01*(player.position.x-foeA[i].position.x),0.01*(player.position.y-foeA[i].position.y));
		foeA[i].accelerate(a);
		foeA[i].update();
	    foeA[i].display();
		
		console.log("敌人A在x方向的速度是:"+foeA[i].velocity.x+",y方向的速度是:"+foeA[i].velocity.y);
	}
	
}

function updateMushroom(){
	for(var i=0;i < numOfMushroom;i++){
		if(mushroom[i] != null){
			var disToMushroom = dist(player.position.x - playerImg.width/2,
			player.position.y - playerImg.height/2, 
			mushroom[i].position.x - mushroomImg.width/2, 
			mushroom[i].position.y - mushroomImg.height/2); 
		
			if(disToMushroom <= playerImg.width/2+mushroomImg.width/2){
				player.life++;
				//numOfMushroom--;
				mushroom[i] = null;
				console.log("numOfMushroom="+numOfMushroom);
				console.log("player.life="+player.life);
			}
		}
	
	}
}

function gameOver(){
	push();
	textFont(fontVag);
	textSize(60);
	text("You Lose!", windowWidth/2.5, windowHeight/2);
	pop();
	if(!playedLoseSound){
		loseSound.play();
		playedLoseSound = true;
	}
}

function keyReleased(){
	if(UP_ARROW==keyCode||DOWN_ARROW==keyCode||RIGHT_ARROW==keyCode||LEFT_ARROW==keyCode){
		
		// console.log("玩家x方向上的加速度是："+player.acc.x+",y方向的加速度是："+player.acc.y);
		// console.log("玩家x方向上的速度是："+player.velocity.x+",y方向的速度是："+player.velocity.y);
		// console.log("玩家x方向上的坐标是："+player.position.x+",y方向的坐标是："+player.position.y);
		
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

function updatePlayerLife(dis){
	for(var i=0;i < numOffoeB;i++){
		var disToFoeB = dist(player.position.x - playerImg.width/2,
		player.position.y - playerImg.height/2, 
		foeB[i].position.x - foeBImg.width/2, 
		foeB[i].position.y - foeBImg.height/2);
		
		if(abs(disToFoeB) <= dis){
			player.life--;
			playerDieSound.setVolume(0.1);
			playerDieSound.play();
			return true;
		}
		//console.log("玩家距敌人的距离是："+disToFoeB);
		// console.log("玩家x方向上的坐标是："+player.position.x+",y方向的坐标是："+player.position.y);
		// console.log("敌人x方向上的坐标是："+foeB[i].position.x+",y方向的坐标是："+foeB[i].position.y);
	}
	
	for(var i = 0;i < numOffoeA;i++){
		var disToFoeA = dist(player.position.x - playerImg.width/2,
		player.position.y - playerImg.height/2, 
		foeA[i].position.x - foeAImg.width/2, 
		foeA[i].position.y - foeAImg.height/2);
		
		if(abs(disToFoeA) <= dis){
			player.life--;
			playerDieSound.setVolume(0.1);
			playerDieSound.play();
			return true;
		}
	}
	return false;
	
}
function showLife(life){
	for(var i=0;i < life;i++){
		image(heartImg, 90 + i*35, 15);
	}
}

function showMushroom(numOfMushroom){
	for(var i=0;i < numOfMushroom;i++){
		if(mushroom[i] != null){
			image(mushroomImg, mushroom[i].position.x, mushroom[i].position.y);
		}
		
	}
}
