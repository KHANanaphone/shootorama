function ControlsManager(player){
    
    this.player = player;
    
    var self = this;
    
    this.moveUp = [38, 87];
    this.moveLeft = [37, 65];
    this.moveDown = [40, 83];
    this.moveRight = [39, 68];
    this.shoot = [73, 90];
    this.strafe = [67, 80];
    this.dash = [79, 88];
    
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
    
    document.onkeypress = function(e){
        
        var code = e.keyCode;
        
        if(code >= 49 && code <= 57)
            player.weaponManager.selectWeaponByIndex(code - 48);
    };
    
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

ControlsManager.prototype.setControl = function(type, isDown){
    
    //filter out auto-repeats
    if(this.controlState[type].isDown == isDown)
        return;
    
    this.controlState[type] = {type: type, isDown: isDown, time: new Date()};
      
    if(isDown){

        this.lastInputs.push(this.controlState[type]);

        if(this.lastInputs.length > 20)
            this.lastInputs.shift();

        if(type == 'dash')
            this.dispatchEvent('dash', {controlState: this.controlState});
    };
}

ControlsManager.prototype.addEventListener = function(name, callback){
    
    if(!this.events[name])
        this.events[name] = [];
    
    this.events[name].push(callback);
}

ControlsManager.prototype.dispatchEvent = function(name, data){
    
    if(!this.events[name])
        return;
    
    for(var i = 0; i < this.events[name].length; i++)
        this.events[name][i](data);
}