function KeyCounter(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.keys = 0;
        this.goldkey = false;
    };
    
    function setupComponents(){
        
        this.sprite = SpriteManager.makeSprite('key', true);
        this.addChild(this.sprite);
        
        this.goldsprite = SpriteManager.makeSprite('goldkey', true);
        this.goldsprite.alpha = 0;
        this.addChild(this.goldsprite);

        var text = new createjs.Text();
        text.x = 60;
        text.y = 10;
        text.font = '30px bitrod';
        text.text = this.keys;
        text.color = '#000';   
        text.textAlign = 'right';
        this.text = text;
        this.addChild(text);        
    };
}

(function(){
    
    var prototype = createjs.extend(KeyCounter, createjs.Container);

    prototype.tick = function(){
        
        if(Game.player.goldkey != this.goldkey){
            
            this.goldkey = Game.player.goldkey;
            this.goldsprite.alpha = this.goldkey ? 1 : 0;
            this.sprite.alpha = this.goldkey ? 0 : 1;   
        }
        else if(Game.player.keys != this.keys){
            
            this.keys = Game.player.keys;
            this.text.text = this.goldkey ? 'G' : this.keys;
        };
    };
    
    KeyCounter = createjs.promote(KeyCounter, 'Container');
    
})();