function Line(vars){
    
    if(!Line.initialized){
        Line.init();
        return new Line(vars);
    }
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    function setupVars(){
        
        this.source = vars.source;
        
        this.trajectory = vars.trajectory ? vars.trajectory : this.source.rotation;
        this.damage = vars.damage ? vars.damage : 0;
        this.duration = vars.duration ? vars.duration : 2;
        
        this.x = vars.x ? vars.x : this.source.x;
        this.y = vars.y ? vars.x : this.source.y;
        this.ticks = 0;
    };
    
    function setupComponents(){
        
        this.beam = null;
    };
    
    function setupEvents(){
        
        this.on('tick', this.tick);
    };
};

Line.init = function(){
        
    var prototype = createjs.extend(Line, createjs.Container);
      
    prototype.tick = Line.tick;
    
    Line = createjs.promote(Line, 'Container');
    Line.initialized = true;
};

Line.tick = function(){
    
    if(!this.beam){

        var radTraj = this.trajectory * Math.PI / 180;
        var startPt = {
            x: Math.cos(radTraj) * this.source.size,
            y: Math.sin(radTraj) * this.source.size
        }
            
        this.target = Line.getTarget(this);
        var localPt = this.globalToLocal(this.target.x, this.target.y);
        
        this.beam = new createjs.Shape();
        this.beam.graphics.beginStroke('#AAA').moveTo(startPt.x, startPt.y).lineTo(
            localPt.x, localPt.y);
        
        this.addChild(this.beam);
    };
    
    if(this.alpha <= 0){
        this.parent.removeChild(this);
        return;
    }
    
    if(this.ticks >= this.duration) //fade out   
        this.alpha -= 0.10;
    
    if(this.target.obj)
        this.target.obj.hit(this);
    
    this.ticks++;
};

Line.getTarget = function(line){
    
    var point = {x: 0, y: 0};
    var radTraj = line.trajectory * Math.PI / 180;
    var aboutToBreak = 0;
    
    while(aboutToBreak < 500){
        
        aboutToBreak++;
        
        var l2g = line.localToGlobal(point.x, point.y);
        var targets = Game.playingArea.getTargets(l2g);
        
        for(var i = 0; i < targets.length; i++){
            
            if(targets[i] != this.source)
                return targets[i];
        }
        
        point.x += Math.cos(radTraj) * 2;
        point.y += Math.sin(radTraj) * 2;
    };
    
    return line.localToGlobal(point.x, point.y);
};