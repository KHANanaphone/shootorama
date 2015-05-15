function Background(){
    
    this.Container_constructor();
    this.x = 0;
    this.y = 0;
    this.persistence = 'persist';
    
    this.rect = new createjs.Shape();
    this.addChild(this.rect);    
};

(function(){
        
    var prototype = createjs.extend(Background, createjs.Container);
    
    prototype.setColor = function(color){        
        
        this.rect.graphics.clear();
        this.rect.graphics.beginFill(color).drawRect(0, 0, 1000, 600);
    };
    
    prototype.addImage = function(imageName, x, y, w, h){
        
        var bitmap = new createjs.Bitmap(Resources.getResult(imageName));
        var bounds = bitmap.getBounds();        
        
        bitmap.set({
            x: x - w/2,
            y: y - h/2,
            scaleX: w / bounds.width,
            scaleY: h / bounds.height
        });
        
        this.addChild(bitmap);
        return bitmap;
    }; 
    
    prototype.addRect = function(color, x, y, w, h){
        
        var rect = new createjs.Shape();
        rect.graphics.beginFill(color).drawRect(x, y, w, h);
        this.addChild(rect);
    };
    
    prototype.addText = function(vars){
        
        var text = new createjs.Text();
        
        if(!vars.font)
            vars.font = '50px bitrod';
        
        text.set(vars);
        
        this.addChild(text);
    };
    
    Background = createjs.promote(Background, 'Container');
    Background.initialized = true;
})();