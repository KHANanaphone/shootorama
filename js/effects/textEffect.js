function TextEffect(target, vars){
    
    if(!vars)
        vars = {};
    
    this.target = target;
    this.type = 'TextEffect';
    
    this.duration = vars.time ? vars.time : 80;
    this.timeRemaining = this.duration;
    var text = vars.hasOwnProperty('text') ? vars.text : 'you forgot the text';
    var color = vars.color ? vars.color: 'black';
    var size = vars.size ? vars.size : '25px';
    
    this.outlineText = new createjs.Text();
    this.outlineText.alpha = 0.8;
    this.outlineText.x = target.x;
    this.outlineText.y = target.y + target.size * -0.8;
    this.outlineText.font = size + ' bitrod';
    this.outlineText.color = 'white';
    this.outlineText.textAlign = 'center';
    this.outlineText.text = text;    
    this.outlineText.outline = 1; 
    
    this.text = new createjs.Text();
    this.text.alpha = 0.8;
    this.text.x = target.x + 0;
    this.text.y = target.y + target.size * -0.8;
    this.text.font = size + ' bitrod';
    this.text.color = color;
    this.text.textAlign = 'center';
    this.text.text = text;    
};

TextEffect.prototype.tick = function(){
    
    if(!this.started){
        
        Game.currentRoom.addObject(this.outlineText);
        Game.currentRoom.addObject(this.text);
        this.started = true;
    };
    
    this.text.alpha = 0.8 * (this.timeRemaining / this.duration);
    this.outlineText.alpha = 0.8 * (this.timeRemaining / this.duration);
    
    this.text.y -= 30 / this.duration;
    this.outlineText.y -= 30 / this.duration;
};

TextEffect.prototype.clear = function(){
    
    if(this.text.parent)
        this.text.parent.removeChild(this.text);
    
    if(this.outlineText.parent)
        this.outlineText.parent.removeChild(this.outlineText);
};