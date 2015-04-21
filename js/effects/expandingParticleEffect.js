// Creates an effect of particles expanding from the target
//
// vars.time: duration of effect
// vars.distance: distance from middle of target, scales with target size
// vars.reverse: effect goes inward towards target instead of outward from target
// vars.count: number of particles
function ExpandingParticleEffect(target, vars){
    
    this.target = target;
    this.type = 'ExpandingParticle';

    this.timeRemaining = vars.time ? vars.time : 15;
    this.distance = vars.distance ? vars.distance : 1;
    this.reverse = vars.reverse ? vars.reverse : false;
    this.count = vars.count ? vars.count : 6;
    
    this.particles = [];
    
    for(var i = 0; i < this.count; i++){
        
        var info = this.getParticleInfo(i);
        
        var particle = new createjs.Shape().set(info);        
        particle.graphics
            .setStrokeStyle(0.3)
            .beginStroke('#000').drawCircle(0, 0, 3);       
        
        this.particles.push(particle);        
        target.addChild(particle);
    };
};

ExpandingParticleEffect.prototype.getParticleInfo = function(index){
    
    var add = 360 / this.count;
    var facing = (this.target.facing + add * index) * (Math.PI / 180);
    var length = (this.target.size / 2) * (this.distance + 1);
    
    var xOut = Math.cos(facing) * length;   
    var yOut = Math.sin(facing) * length;    
    var xIn  = Math.cos(facing) * this.target.size / 2; 
    var yIn  = Math.sin(facing) * this.target.size / 2;
    
    if(this.reverse){
        
        return {
            x: xOut,
            y: yOut,
            vector: {
                x: (xIn - xOut) / this.timeRemaining,
                y: (yIn - yOut) / this.timeRemaining
            }
        }
    }
    else {
        
        return {
            x: xIn,
            y: yIn,
            vector: {
                x: (xOut - xIn) / this.timeRemaining,
                y: (yOut - yIn) / this.timeRemaining
            }
        }
    }
};

ExpandingParticleEffect.prototype.tick = function(){
    
    for(var i = 0; i < this.particles.length; i++){
      
        var p = this.particles[i];
        p.x += p.vector.x;
        p.y += p.vector.y;
    };
};

ExpandingParticleEffect.prototype.clear = function(){
    
    for(var i = 0; i < this.particles.length; i++){
        
        var p = this.particles[i];
        p.parent.removeChild(p);
    };
};