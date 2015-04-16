function EnemyHealthMeter(enemy){
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    this.update();
    
    function setupVars(){
        
        this.enemy = enemy;
        this.redHealth = -1;
        
        this.width = this.enemy.size;
        this.height = 3;
        this.y = this.enemy.size / -2 - 6;
        this.x = this.enemy.size / -2;
    }
    
    function setupComponents(){
        
        this.greenMeter = new createjs.Shape();
        this.addChild(this.greenMeter);
        
        this.redMeter = new createjs.Shape();
        this.addChild(this.redMeter);
    };
    
    function setupEvents(){
        
        var meter = this;
        
        this.enemy.on('healthChanged', function(e){
            meter.update(e);
        });
    }
};

(function(){
    
    var prototype = createjs.extend(EnemyHealthMeter, createjs.Container);
    
    prototype.update = function(e){
    
        var scale = this.enemy.health / this.enemy.maxHealth;
    
        this.greenMeter.graphics.clear();        
        this.greenMeter.graphics
            .beginFill('#0F0')
            .drawRect(
                0, 0, scale * this.width, this.height);
        
        if(e)
            this.redHealth = e.oldHealth;
    };
    
    prototype.tick = function(){
        
        if(this.redHealth == -1)
            return;
        
        if(this.redHealth <= this.enemy.health){
            this.redHealth = -1;
            this.redMeter.graphics.clear();
            return;
        }        
        
        this.redHealth -= this.enemy.maxHealth * 0.002;
        var start = this.enemy.health / this.enemy.maxHealth;
        var end = this.redHealth / this.enemy.maxHealth - start;
    
        this.redMeter.graphics.clear();        
        this.redMeter.graphics
            .beginFill('#F00')
            .drawRect(this.width * start , 0, this.width * end, this.height);
    };
    
    EnemyHealthMeter = createjs.promote(EnemyHealthMeter, 'Container');
    EnemyHealthMeter.initialized = true;
})();