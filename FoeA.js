function FoeA(position,velocity,acc,img){
	Characters.call(this,position,velocity,acc,img);
}

FoeA.prototype = Object.create(Characters.prototype); 
FoeA.prototype.constructor = FoeA;