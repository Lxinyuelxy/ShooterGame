function Ball(position,velocity,acc,path){  //构建圆形对象的构造函数

	this.position = createVector(position.x,position.y);//位置
	this.velocity = createVector(velocity.x,velocity.y);//速度
	this.acc = createVector(acc.x,acc.y);//加速度
	
	this.life =  3;
	this.isDragged = false;//是否被拖拽
	this.moveDistance = 0;//移动距离

	this.img = loadImage(path); 
	
	
	this.accelerate = function(a){
		this.acc = a;
		this.velocity.x += this.acc.x;
		this.velocity.y += this.acc.y;
		
		this.velocity = limitValue(this.velocity,maxVelocity);
	}
	
	this.update = function(){
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		
		this.position = limitValue(this.position,maxPosition);
	}
	
	
	this.display = function(){
		if(this.life > 0){
			image(this.img, this.position.x, this.position.y);
		}
	}

}

function limitValue(value,limit){
	if(abs(value.x) > limit.x){
		if(value.x > 0){
			value.x = limit.x;
		}
		else{
			value.x = -limit.x;
		}
	}
	if(abs(value.y) > limit.y){
		if(value.y > 0){
			value.y = limit.y;
		}
		else{
			value.y = -limit.y;
		}
	}
	return value;
}

function showLife(life){
	for(var i=0;i < life;i++){
		image(heartImg, 90 + i*35, 15);
	}
}






