function Line(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.source = vars.source;        
        this.direction = vars.direction; 
        
        this.startPt = {x: 0, y: 0};
        this.x = this.source.x;
        this.y = this.source.y;
        
        this.damage = vars.damage;
        this.empowered = vars.empowered;
        this.duration = 20;
        
        this.ticks = 0;
    };
    
    function setupComponents(){

        this.beam = new createjs.Shape();
        this.addChild(this.beam);  
    };
};

(function(){
        
    var prototype = createjs.extend(Line, createjs.Container);
      
    prototype.tick = function(){
        
        if(!this.endPt)
            getTargets.call(this);

        drawBeam.call(this);    
        fadeOut.call(this); 
        this.ticks++;

        function getTargets(){
            
            var data = Line.getLineData(this);            
            this.endPt = this.globalToLocal(data.endPt.x, data.endPt.y);
            
            for(var i = 0; i < data.targets.length; i++){
                var target = data.targets[i];
                
                if(target && target.hit)
                    target.hit(this, this.damage);
            }
        }
        
        function drawBeam(){

            var point = {
                x: Math.cos(this.direction) * 30 * this.ticks,
                y: Math.sin(this.direction) * 30 * this.ticks
            };

            var t = 0.2; //threshold

            //if the 'trail' that moves forward has reached the target
            if((point.x > this.endPt.x + t && point.x > this.startPt.x + t) ||
               (point.x < this.endPt.x - t && point.x < this.startPt.x - t ) ||
               (point.y > this.endPt.y + t && point.y > this.startPt.y + t) ||
               (point.y < this.endPt.y - t && point.y < this.startPt.y - t )) {

                this.parent.removeChild(this);
                return;
            }

            this.beam.graphics.clear();
            
            if(this.empowered){
                
                this.beam.graphics.setStrokeStyle(4)
                .beginStroke("Red")
                .moveTo(point.x, point.y)
                .lineTo(this.endPt.x, this.endPt.y);
            }
            else {
                this.beam.graphics.setStrokeStyle(2)
                .beginStroke("DeepSkyBlue")
                .moveTo(point.x, point.y)
                .lineTo(this.endPt.x, this.endPt.y);
            }
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
    
    Line = createjs.promote(Line, 'Container');
    Line.initialized = true;
})();

Line.getLineData = function(line){
    
    var targets = [];
    var point = {x: 0, y: 0};
    var aboutToBreak = 0;
    
    while(aboutToBreak < 500){
        
        aboutToBreak++;
        
        var l2g = line.localToGlobal(point.x, point.y);
        var ts = CollisionManager.getTargets(
            l2g, ['enemy', 'solid', 'transitionTrigger']
        );
            
        for(var i = 0; i < ts.length; i++){
            
            var t = ts[i];
            var alreadyIn = false;
            
            for(var j = 0; j < targets.length; j++){
                                
                if(t.id == targets[j].id){
                    alreadyIn = true;
                    break;
                }
            }
            
            if(!alreadyIn)
                targets.push(t);
            
            if(t.hitbox.type == 'solid' || t.hitbox.type == 'transitionTrigger')
                return {
                    endPt: line.localToGlobal(point.x, point.y),
                    targets: targets
                }
        } 
        
        point.x += Math.cos(line.direction) * 2;
        point.y += Math.sin(line.direction) * 2;
    };
    
    return {
        endPt: line.localToGlobal(point.x, point.y),
        targets: targets
    }
};