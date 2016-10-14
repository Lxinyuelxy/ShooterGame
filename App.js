var player;//玩家圆形对象
var foeA = new Array();
var numOffoeA = 6;
var fr = 30;

var maxVelocity;
var maxPosition;

var bg;
var heartImg;
var fontRegular;


function preload(){
	bg = loadImage("./assets/bg.PNG");
	heartImg = loadImage("./assets/heart.png"); 
	fontVag = loadFont("./assets/vag.ttf");
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
	var path = "./assets/player.png";
	
	//创建玩家对象
	player = new Ball(position, velocity, acc, path);

	
	//随机创建敌人对象
	randGenerateFoe();

	
}

function randGenerateFoe(){
	// var rn = random(0,100);
	
	//创建敌人圆形对象
	// for(var i = 0;i < numOffoeA;i++){
		// var p = createVector(random(0,windowWidth),0);
		// var v = createVector(0,0);
		// var r = 30;
		// foeA[i] = new Ball(p,v,r);
		// foeA[i].color = color(255,0,0);
	// }
}


function draw() {
  clear();
  background(bg); 
  showLife(player.life);
  
  push();
  textFont(fontVag);
  textSize(30);
  text("Life:", 30, 35);
  text("Time:"+frameCount, windowWidth-250, 35);
  pop();

  //显示玩家圆形
  player.display();
  if(mouseIsPressed){
	  // if(player.moveDistance <= radius){
		  // player.update(player.position.x + 0.3 * (mouseX - player.position.x), player.position.y + 0.3 * (mouseY - player.position.y));
		  // player.display();
		  // console.log("player.position.x = "+player.position.x);
	  // }else{
		  player.update(player.position.x + 0.06 * (mouseX - player.position.x), player.position.y + 0.06 * (mouseY - player.position.y));
		  player.display();
		  console.log("player.position.x = "+player.position.x);
	 // }
  }
  
  //显示敌人圆形
  // for(var i=0;i < numOffoeA;i++){
	  // foeA[i].position.y = foeA[i].position.y + 2;
	  // if(foeA[i].position.y > windowHeight){
		  // foeA[i].position.y = 0;
	  // }
	  // random(0,10) > 5 ? foeA[i].position.x = foeA[i].position.x + 10 : foeA[i].position.x = foeA[i].position.x - 10;
	  
	  // foeA[i].display();
	  // console.log("foeA["+i+"]:x="+foeA[i].position.x+",y="+foeA[i].position.y);
  // }
  if(keyIsPressed === true){	  
	  var A = 0.5;
	  var acc;
	  
	  if(UP_ARROW==keyCode){
		  acc = createVector(0,-A);	  
	  }
	  else if(DOWN_ARROW==keyCode){
		acc = createVector(0,A);
	  }
	  else if(RIGHT_ARROW==keyCode){
		acc = createVector(A,0);
	  }
	  else if(LEFT_ARROW ==keyCode){
		acc = createVector(-A,0);
	  }
	  player.accelerate(acc);
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
}

function mouseReleased(){
	player.isDragged = false;
}

