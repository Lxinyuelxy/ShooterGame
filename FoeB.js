function FoeB(position,velocity,acc,img){
	Characters.call(this,position,velocity,acc,img);
}

FoeB.prototype = Object.create(Characters.prototype); 
FoeB.prototype.constructor = Player;