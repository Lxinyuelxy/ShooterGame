function Player(position,velocity,acc,img){
	Characters.call(this,position,velocity,acc,img);
	
	this.isDragged = false;//�Ƿ���ק
	this.moveDistance = 0;//�ƶ�����
	
	
}

Player.prototype = Object.create(Characters.prototype); 
Player.prototype.constructor = Player;
