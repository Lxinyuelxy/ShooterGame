function Player(position,velocity,acc,img){
	Characters.call(this,position,velocity,acc,img);
	
	this.isDragged = false;//ÊÇ·ñ±»ÍÏ×§
	this.moveDistance = 0;//ÒÆ¶¯¾àÀë
	
	
}

Player.prototype = Object.create(Characters.prototype); 
Player.prototype.constructor = Player;
