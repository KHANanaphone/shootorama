//Applies a color effect.
function ColorEffect(target, vars){
    
    this.target = target;
    this.type = 'color';
    
    this.r = vars.r;
    this.g = vars.g;
    this.b = vars.b;    
    this.scaleStart = vars.scaleStart ? vars.scaleStart : 1;
    this.scales = vars.hasOwnProperty('vars.scales') ? vars.scales : true;
    this.duration = vars.duration ? vars.duration : -1;
    this.timeRemaining = vars.duration;
    
    if(this.timeRemaining == -1){
        
        this.apply(this.scaleStart);
    }
};

ColorEffect.prototype.apply = function(scale){
      
    var applyTo = this.target;    
    var mult = this.scales ? (1 - scale) : 0;
    var add = this.scales ? (255 * scale) : 255;
    
    this.filter = 
        new createjs.ColorFilter(
            mult,         mult,         mult,         this.a,
            add * this.r, add * this.g, add * this.b, 0
        );
    
    this.applyFilter(this.filter);
}

ColorEffect.prototype.applyFilter = function(filter){
    
    var t = this.target;
    var filterArray = [];
    
    if(filter)
       filterArray.push(filter);
    
    var bounds = t.getBounds();
    t.filters = filterArray;
    t.cache(bounds.x, bounds.y, bounds.width, bounds.height);
}

//If the target has a .sprite property, it will apply to that instead
ColorEffect.prototype.tick = function(){
    
    if(this.timeRemaining == -1)
        return;
    
    var scale = (this.timeRemaining / this.duration) * this.scaleStart;
    this.apply(scale);
};

ColorEffect.prototype.clear = function(){

    this.applyFilter();
};