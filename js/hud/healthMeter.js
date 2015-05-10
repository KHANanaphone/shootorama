function HealthMeter(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.lastHealth = Game.player.health;
        this.redHealth = Game.player.health;
        this.greenHealth = Game.player.health;
        
        this.lastMaxHealth = -1;
        
        this.x = vars.x;
        this.y = vars.y;
    }
    
    function setupComponents(){
        
        this.sprite = SpriteManager.makeSprite('heart');
        this.sprite.set({
            x: 20,
            y: 16,
            scaleX: 1,
            scaleY: 1
        });
        this.addChild(this.sprite);
        
        this.greenMeter = new createjs.Shape();
        this.greenMeter.x = 50;
        this.addChild(this.greenMeter);
        
        this.redMeter = new createjs.Shape();
        this.redMeter.x = 50;
        this.addChild(this.redMeter);
        
        this.bgRect = new createjs.Shape();
        this.bgRect.x = 50;
        this.addChild(this.bgRect);
        
        this.text = new createjs.Text();
        this.text.font = '30px bitrod';
        this.text.color = '#000';
        this.text.textAlign = 'center';
        this.text.y = 5;
        this.addChild(this.text);
    };
    
    this.updateGreen();
    this.updateBgRect();
    this.updateText();
};

(function(){
    
    var PPH = 3; //pixels per health
    
    var prototype = createjs.extend(HealthMeter, createjs.Container);
    
    prototype.updateBgRect = function(){
        
        this.bgRect.graphics.clear();
        this.bgRect.graphics
            .beginStroke('#000').drawRect(0, 0, Game.player.maxHealth * PPH, 30);
        
        this.text.x = (Game.player.maxHealth * PPH) / 2 + 50;
    };
    
    prototype.updateRed = function(){
        
        this.redMeter.graphics.clear();
        
        if(this.redHealth <= this.greenHealth){
            
            this.redHealth = this.greenHealth;
            return;
        };
        
        var start = this.greenHealth * PPH;
        var width = (this.redHealth - this.greenHealth) * PPH;
        
        this.redMeter.graphics
            .beginFill('#F88')
            .drawRect(start, 1, width, 28);
    };
    
    prototype.updateText = function(){
        
        this.text.text = Game.player.health;
    };
    
    prototype.updateGreen = function(){
        
        var width = this.greenHealth > 0 ? this.greenHealth * PPH : 0;
        
        this.greenMeter.graphics.clear();        
        this.greenMeter.graphics
            .beginFill('#8F8')
            .drawRect(0, 1, width, 28);
    };
    
    prototype.tick = function(){
        
        var player = Game.player;
        
        if(this.lastHealth < player.health){ //health went up
            
            this.redHealth = player.health;
            this.greenHealth = this.lastHealth;
            this.lastHealth = player.health;
            
            this.updateText();            
            this.updateRed();
        }
        else if(this.lastHealth > player.health){ //health went down
            
            this.redHealth = this.lastHealth;
            this.greenHealth = player.health;
            this.lastHealth = player.health;
            
            this.updateText(); 
            this.updateGreen();
        };
        
        if(this.redHealth > this.lastHealth){
            
            this.redHealth -= player.maxHealth / 200;
            this.updateRed();
        }
        else if(this.greenHealth < this.lastHealth){
            
            this.greenHealth += player.maxHealth / 200;
            this.updateGreen();
            this.updateRed();
        };
        
        if(this.lastMaxHealth != player.maxHealth){
            
            this.updateBgRect();
            this.lastMaxHealth = player.maxHealth;
        };
    };
    
    HealthMeter = createjs.promote(HealthMeter, 'Container');
    HealthMeter.initialized = true;
})();