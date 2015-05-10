function FadingTextEffect(target, vars){
    
    if(!vars)
        vars = {};
    
    this.target = target;
    this.type = 'FadingTextEffect';
    
    this.duration = vars.time ? vars.time : 80;
    this.timeRemaining = this.duration;
    var text = vars.hasOwnProperty('text') ? vars.text : 'you forgot the text';
    var color = vars.color ? vars.color: 'black';
    var size = vars.size ? vars.size : '25px';
    
    this.outlineText = new createjs.Text();
    this.outlineText.alpha = 0.8;
    this.outlineText.x = 0;
    this.outlineText.y = target.size * -0.7;
    this.outlineText.font = size + ' bitrod';
    this.outlineText.color = 'white';
    this.outlineText.textAlign = 'center';
    this.outlineText.text = text;    
    this.outlineText.outline = 1; 
    target.addChild(this.outlineText);
    
    this.text = new createjs.Text();
    this.text.alpha = 0.8;
    this.text.x = 0;
    this.text.y = target.size * -0.8;
    this.text.font = size + ' bitrod';
    this.text.color = color;
    this.text.textAlign = 'center';
    this.text.text = text;
    target.addChild(this.text);
    
};

FadingTextEffect.prototype.tick = function(){
    
    this.text.alpha = 0.8 * (this.timeRemaining / this.duration);
    this.outlineText.alpha = 0.8 * (this.timeRemaining / this.duration);
    
    this.text.y -= 30 / this.duration;
    this.outlineText.y -= 30 / this.duration;
};

FadingTextEffect.prototype.clear = function(){
    
    this.text.parent.removeChild(this.text);
    this.outlineText.parent.removeChild(this.outlineText);
};