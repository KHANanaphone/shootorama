// Creates a timing ring effect where the object is surrounded by
// two rings, with the larger one shrinking into the smaller one,
// then they both fade out.
function RingEffect(target, vars){
    
    this.target = target;
    this.type = 'ring';
    
    this.timeRemaining = vars.start;
    this.start = vars.start;
    this.window = vars.window;
    
    this.color1 = vars.color1;
    this.color2 = vars.color2;
    
    this.outerRing = new createjs.Shape();
    this.innerRing = new createjs.Shape();
    target.addChild(this.outerRing);
    target.addChild(this.innerRing);
    
    this.outerRing.alpha = 0.8;
};

RingEffect.prototype.tick = function(){

    if(this.timeRemaining <= this.window){
        
        this.innerRing.graphics.clear();
        this.innerRing.graphics.beginStroke(this.color2).drawCircle(0, 0, this.target.size * 0.5);
        this.innerRing.alpha = 0.8 * this.timeRemaining / this.window;
        
        if(this.timeRemaining == this.window)
            this.outerRing.graphics.clear();
    }
    else{
        
        var scale = 1 + (this.timeRemaining - this.window) / (this.start - this.window);        
        
        this.outerRing.graphics.clear();
        this.outerRing.graphics.beginStroke(this.color1).drawCircle(0, 0, this.target.size * 0.5 * scale);
        
        if(this.timeRemaining == this.start){
            this.innerRing.alpha = 0.8;
            this.innerRing.graphics.clear();
            this.innerRing.graphics.beginStroke(this.color1).drawCircle(0, 0, this.target.size * 0.5);
        }
    }
    
};

RingEffect.prototype.clear = function(){

    this.outerRing.parent.removeChild(this.outerRing);
    this.innerRing.parent.removeChild(this.innerRing);
};