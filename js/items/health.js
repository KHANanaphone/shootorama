function Health(vars){
    
    this.type = vars.type ? vars.type : 'small';
    
    if(this.type == 'small'){
        this.size = 16;
        this.spriteName = 'orbhealth';
    }
    if(this.type == 'large'){
        this.size = 32;
        this.spriteName = 'orbhealth';
    }
    else if(this.type == 'heart'){
        this.size = 40;
        this.spriteName = 'heartplus';
    }
        
    this.Item_constructor(vars);
};

(function(){
        
    var prototype = createjs.extend(Health, Item);
    
    prototype.collect = function(obj){
        
        if(this.type == 'large')
            obj.addHealth(25)
        else if(this.type == 'small')
            obj.addHealth(10);
        else if(this.type == 'heart'){
            
            obj.maxHealth += 10;
            obj.addHealth(9999, false);   
            obj.textEffect('Max Health Up');
        };
    };
    
    Health = createjs.promote(Health, 'Item');
    Health.initialized = true;
})();