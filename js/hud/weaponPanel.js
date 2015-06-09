function WeaponPanel(vars){
    
    this.Container_constructor();
    
    setupVars.call(this);
    setupComponents.call(this);
    
    function setupVars(){
        
        this.x = vars.x;
        this.y = vars.y;
        this.index = vars.index;
        this.type = Game.player.weaponManager.indexToType[this.index];
    };
    
    function setupComponents(){
        
        var text = new createjs.Text();
        text.set({
            x: 3, 
            y: 1, 
            text: this.index,
            font: '14px arial'
        });
        this.addChild(text);
        
        this.ammo = new createjs.Text();
        this.ammo.set({
            x: 75,
            textAlign: 'right'
        });
        this.addChild(this.ammo);
        
        this.rect = new createjs.Shape();
        this.rect.graphics.beginStroke('#F00').setStrokeStyle(2).drawRect(0, 0, 78, 60);
        this.rect.alpha = 0;
        this.addChild(this.rect);
        
        if(this.type){
            this.sprite = SpriteManager.makeSprite(this.type + '_weapon');
            this.sprite.x = 40;
            this.sprite.y = 30;
            this.addChild(this.sprite);
        };        
    };
}

(function(){
    
    var prototype = createjs.extend(WeaponPanel, createjs.Container);
    
    prototype.update = function(weapon, selected){
        
        if(!weapon){
            this.rect.alpha = 0;
            return;
        }
        
        if(!this.type){
            
            this.type = weapon.type;
            this.sprite = SpriteManager.makeSprite(this.type + '_weapon');
            this.sprite.x = 40;
            this.sprite.y = 30;
            this.addChild(this.sprite);
        };
        
        var color = selected ? '#F00' : '#CCC';
        
        this.rect.alpha = 100;
        this.rect.graphics.clear();
        this.rect.graphics.beginStroke(color).setStrokeStyle(2).drawRect(0, 0, 78, 60);        
        
        if(weapon.ammo == -1){
            this.ammo.set({
                text : '\u221E',
                font : '22px cursive',
                y: 34
            })
        }
        else{
            this.ammo.set({
                text: weapon.ammo,
                font: '18px arial',
                y: 39
            })
        }
        
        if(weapon.ammo == 0)
            this.ammo.color = 'red';
        else if (weapon.ammo == weapon.maxAmmo)
            this.ammo.color = 'blue';
        else
            this.ammo.color = 'black';
    };
    
    WeaponPanel = createjs.promote(WeaponPanel, 'Container');
    
})();