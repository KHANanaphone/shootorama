function MovementManager(player){
    
    var self = this;
    this.player = player;
    this.dashCooldown = 0;
    
    player.controlsManager.addEventListener('dash', function(e){
        
        var controlState = e.controlState;
        
        if(self.dashCooldown > 0)
            return;
        
        if(controlState.left.isDown && controlState.right.isDown)
            return;
        if(controlState.up.isDown && controlState.down.isDown)
            return;
        if(!controlState.left.isDown &&
           !controlState.right.isDown &&
           !controlState.up.isDown &&
           !controlState.down.isDown)
            return;
        
        if(controlState.left.isDown)
            self.xDash = {duration: Player.DASH_DURATION_TICKS, direction: 'left'};
        if(controlState.right.isDown)
            self.xDash = {duration: Player.DASH_DURATION_TICKS, direction: 'right'};
        if(controlState.up.isDown)
            self.yDash = {duration: Player.DASH_DURATION_TICKS, direction: 'up'};
        if(controlState.down.isDown)
            self.yDash = {duration: Player.DASH_DURATION_TICKS, direction: 'down'};
        
        self.dashCooldown = Player.DASH_COOLDOWN_TICKS;
        self.player.makeGhost();
    });
};

MovementManager.prototype.resetDash = function(){

    this.dashCooldown = 0;
    
    this.player.effectsManager.addEffect(new ExpandingParticleEffect(this.player, {
        time: 10,
        count: 4
    }));
};

MovementManager.prototype.setKnockback = function(source){
    
    //cancel dashes
    this.xDash = null;
    this.yDash = null;
    
     this.knockback = {
        ticks: source.knockback.ticks,
        vector: CollisionManager.getKnockbackVector(
            this.player, source, source.knockback.velocity)
    };    
};

MovementManager.prototype.tick = function(controlState){
    
    var self = this;
    var y = 0;
    var x = 0;
    var control = true;
    var dashSpeed = Player.DASH_SPEED_MUL;

    checkXDash();
    checkYDash();
    checkKnockback();

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
    
    if(x != 0 || y != 0)
        setSpeed(x, y);
    
    function setSpeed(x, y){
        
        var nX = 0;
        var nY = 0;

        var length = Math.sqrt(x*x + y*y);
        nX = Math.abs(x) * x / length;
        nY = Math.abs(y) * y / length;
        
        self.player.x += nX * Player.SPEED;
        self.player.y += nY * Player.SPEED;
        
        
        if(controlState.strafe.isDown == 1)
            return;
        
        self.player.rotation = Math.atan2(nY, nX) * 180 / Math.PI;
        self.player.facing = self.player.rotation;
    };
    
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
    
    function checkKnockback(){
        
        if(!self.knockback)
            return;
        
        x += self.knockback.vector.x;
        y += self.knockback.vector.y;
        
        self.knockback.ticks--;
        
        if(self.knockback.ticks <= 0)
            self.knockback = null;
        
        control = false;
    }
}   