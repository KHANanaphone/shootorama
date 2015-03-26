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
        this.trajectory *= Math.PI / 180; //radian conversion
        
        this.startPt = {
            x: Math.cos(this.trajectory) * this.source.size,
            y: Math.sin(this.trajectory) * this.source.size
        };
        
        this.damage = vars.damage ? vars.damage : 0;
        this.duration = vars.duration ? vars.duration : 20;
        
        this.x = vars.x ? vars.x : this.source.x;
        this.y = vars.y ? vars.x : this.source.y;
        this.ticks = 0;
    };
    
    function setupComponents(){

        this.beam = new createjs.Shape();
        this.addChild(this.beam);  
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
    
    if(!this.targetPt){
            
        var target = Line.getTarget(this);
        this.targetPt = this.globalToLocal(target.x, target.y);
        
//        if(target.obj)
//            target.obj.hit(this);      
    };   
    
    drawBeam.bind(this)();    
    fadeOut.bind(this)(); 
    this.ticks++;
    
    function drawBeam(){
        
        var point = {
            x: this.startPt.x + Math.cos(this.trajectory) * 30 * this.ticks,
            y: this.startPt.y + Math.sin(this.trajectory) * 30 * this.ticks
        };
        
        point.x = Math.round(point.x);
        point.y = Math.round(point.y);
        
        //if the 'trail' that moves forward has reached the target
        if((point.x > this.targetPt.x && point.x > this.startPt.x) ||
           (point.x < this.targetPt.x && point.x < this.startPt.x) ||
           (point.y > this.targetPt.y && point.y > this.startPt.y) ||
           (point.y < this.targetPt.y && point.y < this.startPt.y)) {
            this.parent.removeChild(this);
            return;
        }
        
        
        this.beam.graphics.clear()
            .beginStroke("DeepSkyBlue")
            .moveTo(point.x, point.y)
            .lineTo(this.targetPt.x, this.targetPt.y);
    }
    
    function fadeOut(){
    
        if(!this.parent)
            return;
        
        if(this.ticks > this.duration){
            this.parent.removeChild(this);
            return;
        }

        this.alpha -= 0.04;
    }
};

Line.getTarget = function(line){
    
    var point = {x: 0, y: 0};
    var aboutToBreak = 0;
    
    while(aboutToBreak < 500){
        
        aboutToBreak++;
        
        var l2g = line.localToGlobal(point.x, point.y);
        var targets = Game.playingArea.getTargets(
            l2g, ['enemy', 'wall']
        );
        
        if(targets.length > 0)
            return targets[0];
        
        point.x += Math.cos(line.trajectory) * 2;
        point.y += Math.sin(line.trajectory) * 2;
    };
    
    return line.localToGlobal(point.x, point.y);
};