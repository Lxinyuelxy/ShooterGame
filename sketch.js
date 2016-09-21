var centerX = 100,
	centerY = 100,
	radius = 100;
	
var fr = 50;//帧率
var moveSpeed = 100;//圆形每秒移动的像素
var changeOfRadius = 10;//圆形每秒半径变换的像素

var move = false;
var len;//圆心到鼠标点的距离
var lenX;
var lenY;


function setup() {
	frameRate(fr);
	cnv = createCanvas(1360, 680);
	//cnv.mouseMoved(changeMoveSpeed);
}

function draw() {
  clear();
  ellipse(centerX, centerY, radius, radius);
  fill(color(0, 0, 255));
  //push();
 // strokeWeight(5);
  //ellipse(centerX, centerY,radius + 100, radius + 100);

  switch(key){
	  case 'w':
		centerY = centerY - moveSpeed/fr;
		break;
	  case 's':
		centerY = centerY + moveSpeed/fr;
		break;
	  case 'a':
		centerX = centerX - moveSpeed/fr;
		break;
	  case 'd':
		centerX = centerX + moveSpeed/fr;
		break;
	  case 'q':
		radius = radius + changeOfRadius/fr;
		break;
	  case 'e':
		radius = radius - changeOfRadius/fr;
		break;
  }
}

// function mousePressed(){
	// move = true;
// }

// function mouseMoved(){
	// /*if(move){
		// strokeWeight(5);
		// ellipse(centerX, centerY,radius + 100, radius + 100);
	
		// len = getLen();
		// lenX = mouseX - centerX;
		// lenY = mouseY - centerY;
	
		// console.log("len= "+len);
		// console.log("lenX= "+lenX);
		// console.log("lenY= "+lenY);
	// }*/
	// strokeWeight(5);
	// ellipse(centerX, centerY,radius + 100, radius + 100);
	
	// len = getLen();
	// lenX = mouseX - centerX;
	// lenY = mouseY - centerY;
	
	// console.log("len= "+len);
	// console.log("lenX= "+lenX);
	// console.log("lenY= "+lenY);

// }

// function mouseReleased(){
	// move = false;
	//pop();
// }

function getLen(){
	return sqrt((mouseX-centerX)*(mouseX-centerX)+(mouseY-centerY)*(mouseY-centerY));
}


// function changeMoveSpeed(){
	// if(move){
		// console.log("!!!!!!!!!!");
		// if(len <= radius){
			// centerX = mouseX;
			// centerY = mouseY;
		// }else{
			// var temp = 0.4;
			// while(getLen()>0 && temp>0){
				// centerX = centerX + temp * lenX;
				// centerY = centerY + temp * lenY;
				// temp = temp - 0.1;
				// console.log("temp = "+temp);
			// }
		// }
		
	// }
// }

function mouseDragged() {
    // strokeWeight(5);
	// ellipse(centerX, centerY,radius + 100, radius + 100);
	
	len = getLen();
	lenX = mouseX - centerX;
	lenY = mouseY - centerY;
	
	// console.log("len= "+len);
	// console.log("lenX= "+lenX);
	// console.log("lenY= "+lenY);
	
	
	if(len <= radius){
			centerX = mouseX;
			centerY = mouseY;
		}else{
			var temp = 0.4;
			while(getLen()>0 && temp>0){
				centerX = centerX + temp * lenX;
				centerY = centerY + temp * lenY;
				temp = temp - 0.1;
				console.log("temp = "+temp);
			}
		}
}

/*function keyTyped() {
  switch(key){
	  case 'w':
		centerY = centerY - 2;
		break;
	  case 's':
		centerY = centerY + 2;
		break;
	  case 'a':
		centerX = centerX - 2;
		break;
	  case 'd':
		centerX = centerX + 2;
		break;
	  case 'q':
		radius = radius + 0.2;
		break;
	  case 'e':
		radius = radius - 0.2;
		break;
  }
  //ellipse(centerX, centerY, radius, radius);
  // uncomment to prevent any default behavior
  // return false;
}*/