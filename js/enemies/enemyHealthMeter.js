function EnemyHealthMeter(enemy){

    if(!EnemyHealthMeter.initialized){
        
        EnemyHealthMeter.init();
        return new EnemyHealthMeter(enemy);
    };
    
    this.Container_constructor();
    
    setupVars.bind(this)();
    setupComponents.bind(this)();
    setupEvents.bind(this)();
    
    this.update();
    
    function setupVars(){
        
        this.enemy = enemy
    }
    
    function setupComponents(){
        
        var meter = new createjs.Shape();        
        this.meter = meter;
        this.addChild(meter);
    };
    
    function setupEvents(){
        
        var meter = this;
        
        this.enemy.on('healthChanged', function(){
            meter.update();
        });
    }
};

EnemyHealthMeter.init = function(){
    
    var prototype = createjs.extend(EnemyHealthMeter, createjs.Container);
    
    prototype.update = EnemyHealthMeter.update;
    
    EnemyHealthMeter = createjs.promote(EnemyHealthMeter, 'Container');
    EnemyHealthMeter.initialized = true;
}

EnemyHealthMeter.update = function(){
    
    var scale = this.enemy.health / this.enemy.maxHealth;
    
    this.meter.graphics.clear();        
    this.meter.graphics.beginFill('#0F0')
        .drawRect(this.enemy.size / -2, this.enemy.size / -2 - 6, scale * this.enemy.size, 3);
}