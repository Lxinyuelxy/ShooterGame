var maxVelocity;
var maxPosition;

function Characters(position,velocity,acc,img){  

	this.position = createVector(position.x,position.y);//位置
	this.velocity = createVector(velocity.x,velocity.y);//速度
	this.acc = createVector(acc.x,acc.y);//加速度
	this.img = img; 
	 
	this.life =  3;
}

Characters.prototype.accelerate = function(a){
	this.acc = a;
	this.velocity.x += this.acc.x;
	this.velocity.y += this.acc.y;
		
	this.velocity = limitValue(this.velocity,maxVelocity);
}

Characters.prototype.update = function(){
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

	if((this.position.x- this.img.width/2) <=0 || (this.position.x + this.img.width/2) >= windowWidth){
		this.velocity.x = -this.velocity.x;
	}
	if((this.position.y - this.img.height/2) <=0 || (this.position.y + this.img.height/2) >= windowHeight){
		this.velocity.y = -this.velocity.y;
	}
}


Characters.prototype.display = function(){
	if(this.life > 0){
		image(this.img, this.position.x - this.img.width/2, this.position.y - this.img.height/2);
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








