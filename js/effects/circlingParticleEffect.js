function CirclingParticleEffect (target, vars) {
  
    if(!vars)
        vars = {};
    
    this.target = target;
    this.type = 'CirclingParticleEffect';
    
    this.timeRemaining = vars.time ? vars.time : -1; //-1 = indefinite, otherwise # of ticks
    this.speed = vars.speed ? vars.speed : 0.1; //radians per tick
    this.xScale = vars.xScale ? vars.xScale : 1; //x radius scale
    this.yScale = vars.yScale ? vars.yScale : 0.5; //y radius scale
    this.count = vars.count ? vars.count : 6; //# of particles
    this.spriteName = vars.spriteName ? vars.spriteName : 'star';    
    
    this.particles = [];
    
    for(var i = 0; i < this.count; i++){
        
        var angle = this.getParticleInfo(i);
        var particle = SpriteManager.makeSprite(this.spriteName).set({
            angle: angle,
            scaleX: 0.5,
            scaleY: 0.5
        });
        
        this.updatePosition(particle);
        target.addChild(particle);
        this.particles.push(particle);
    };
}

CirclingParticleEffect.prototype.getParticleInfo = function (index) {
    
    var add = 360 / this.count;
    var angle = (this.target.facing + add * index) * (Math.PI / 180);
    return angle;
};

CirclingParticleEffect.prototype.updatePosition = function (particle) {
  
    particle.x = this.xScale * this.target.size * Math.cos(particle.angle);
    particle.y = this.yScale * this.target.size * Math.sin(particle.angle);
};

CirclingParticleEffect.prototype.tick = function(){
    
    for(var i = 0; i < this.particles.length; i++){
        
        var p = this.particles[i];
        p.angle += this.speed;
        this.updatePosition(p)
    }
};

CirclingParticleEffect.prototype.clear = function(){
    
    for(var i = 0; i < this.particles.length; i++){
        
        var p = this.particles[i];
        p.parent.removeChild(p);
    };
};