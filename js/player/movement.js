function Movement(player){
    
    var self = this;
    this.player = player;
    
    player.controls.addEventListener('dash', function(e){
        
        var direction = e.direction;
        
        if(self.dashCooldown > 0 && (Player.DASH_COOLDOWN_TICKS - self.dashCooldown) > 3)
            return;
        
        if(direction == 'left' || direction == 'right')
            self.xDash = {duration: Player.DASH_DURATION_TICKS, direction: direction};
        else 
            self.yDash = {duration: Player.DASH_DURATION_TICKS, direction: direction};
        
        self.dashCooldown = Player.DASH_COOLDOWN_TICKS;
    });
}

Movement.prototype.tick = function(controlState){
    
    var self = this;
    var y = 0;
    var x = 0;
    var control = true;
    var dashSpeed = Player.DASH_SPEED_MUL;

    checkXDash();
    checkYDash();

    if(control){
        if(controlState['up'].isDown == 1)
            y--;
        if(controlState['down'].isDown == 1)
            y++;
        if(controlState['left'].isDown == 1)
            x--;
        if(controlState['right'].isDown == 1)
            x++;
    }

    self.player.x += x * Player.SPEED;
    self.player.y += y * Player.SPEED;

    if(self.dashCooldown > 0) self.dashCooldown--;
    else self.dashCooldown = 0;

    function checkXDash(){

        if(!self.xDash)
            return;

        if(self.xDash.direction == 'right')
            x += dashSpeed;
        else
            x -= dashSpeed;

        self.xDash.duration--;

        if(self.xDash.duration <= 0)
            self.xDash = null;

        control = false;
    }

    function checkYDash(){

        if(!self.yDash)
            return;

        if(self.yDash.direction == 'up')
            y -= dashSpeed;
        else
            y += dashSpeed;

        self.yDash.duration--;

        if(self.yDash.duration <= 0)
            self.yDash = null;

        control = false;
    }
}   