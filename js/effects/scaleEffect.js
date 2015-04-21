//Applies a color effect.
function ScaleEffect(target, vars){

    this.target = target;
    this.type = 'scale';

    this.fromX = target.scaleX;
    this.fromY = target.scaleY;
    this.xDiff = vars.to - this.fromX;
    this.yDiff = vars.to - this.fromY;
    this.duration = vars.time;
    this.timeRemaining = vars.time;
};

ScaleEffect.prototype.tick = function(){
  
    var pct = (this.duration - this.timeRemaining) / this.duration;
    this.target.scaleX = this.fromX + this.xDiff * pct;
    this.target.scaleY = this.fromY + this.yDiff * pct;    
};