function Controls(player){
    
    this.player = player;
    player.controls = this;
    
    var self = this;
    
    this.moveUp = [38, 87];
    this.moveLeft = [37, 65];
    this.moveDown = [40, 83];
    this.moveRight = [39, 68];
    this.shoot = [73, 90];
    this.strafe = [79, 88];
    this.dash = [67, 80];
    
    this.controlState = {
        'up': {type: 'up', isDown: 0, time: new Date()},
        'left': {type: 'left', isDown: 0, time: new Date()},
        'down': {type: 'down', isDown: 0, time: new Date()},
        'right': {type: 'right', isDown: 0, time: new Date()},
        'shoot': {type: 'shoot', isDown: 0, time: new Date()},
        'strafe': {type: 'strafe', isDown: 0, time: new Date()},
        'dash': {type: 'dash', isDown: 0, time: new Date()}
    };
    
    this.lastInputs = [];
    
    this.events = {};
    
    document.onkeydown = function(e){
        
        var code = e.keyCode;
        
        if(self.moveUp.indexOf(code) != -1)
            self.setControl('up', 1);
        if(self.moveLeft.indexOf(code) != -1)
            self.setControl('left', 1);
        if(self.moveDown.indexOf(code) != -1)
            self.setControl('down', 1);
        if(self.moveRight.indexOf(code) != -1)
            self.setControl('right', 1);
        if(self.shoot.indexOf(code) != -1)
            self.setControl('shoot', 1);
        if(self.strafe.indexOf(code) != -1)
            self.setControl('strafe', 1);
        if(self.dash.indexOf(code) != -1)
            self.setControl('dash', 1);
    };
    
    document.onkeyup = function(e){
        
        var code = e.keyCode;
        
        if(self.moveUp.indexOf(code) != -1)
            self.setControl('up', 0);
        if(self.moveLeft.indexOf(code) != -1)
            self.setControl('left', 0);
        if(self.moveDown.indexOf(code) != -1)
            self.setControl('down', 0);
        if(self.moveRight.indexOf(code) != -1)
            self.setControl('right', 0);
        if(self.shoot.indexOf(code) != -1)
            self.setControl('shoot', 0);
        if(self.strafe.indexOf(code) != -1)
            self.setControl('strafe', 0);
        if(self.dash.indexOf(code) != -1)
            self.setControl('dash', 0);
    }  
};

Controls.prototype.setControl = function(type, isDown){
    
    //filter out auto-repeats
    if(this.controlState[type].isDown == isDown)
        return;
    
    this.controlState[type] = {type: type, isDown: isDown, time: new Date()};
      
    if(isDown){

        this.lastInputs.push(this.controlState[type]);

        if(this.lastInputs.length > 20)
            this.lastInputs.shift();

        //this.checkForDashes();
    };
}

Controls.prototype.checkForDashes = function(){
    
    var inputs = this.lastInputs;
    
    if(inputs.length < 2)
        return;
    
    var last = inputs[inputs.length - 1];
    
    if(last.type == 'shoot' || last.type == 'strafe')
        return;
        
    if(hasInputWithinRange(
        inputs.slice(0, inputs.length - 1), last, Player.DASH_THRESHOLD)){
        
        console.log('dash ' + last.type);        
        this.dispatchEvent('dash', {direction: last.type});
    };
    
    function hasInputWithinRange(inputs, last, range){
        
        for(var i = inputs.length - 1; i >= 0; i--){
            
            var input = inputs[i];
            
            if((last.time - input.time) > range)
                return false
            
            if(last.type == input.type)
                return true;
                            
            if(
                (last.type == 'up' && input.type == 'down') ||
                (last.type == 'down' && input.type == 'up') ||
                (last.type == 'left' && input.type == 'right') ||
                (last.type == 'right' && input.type == 'left') 
            )
                return false;
        }
        
        return false;
    }
}

Controls.prototype.addEventListener = function(name, callback){
    
    if(!this.events[name])
        this.events[name] = [];
    
    this.events[name].push(callback);
}

Controls.prototype.dispatchEvent = function(name, data){
    
    if(!this.events[name])
        return;
    
    for(var i = 0; i < this.events[name].length; i++)
        this.events[name][i](data);
}