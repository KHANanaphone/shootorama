function MovementManager(player){
    
    var self = this;
    this.player = player;
    this.dashCooldown = 0;
    
    player.controlsManager.addEventListener('dash', function(e){
        
        var controlState = e.controlState;
        
        if(self.dashCooldown > 0)
            return;
        
        var direction = getDirection(controlState, player.facing);
        
        self.dash = {
            duration: Player.DASH_DURATION_TICKS,
            direction: direction
        };
        
        self.dashCooldown = Player.DASH_COOLDOWN_TICKS;
        self.player.makeIllusion();
        self.player.effectsManager.addEffect(
            new ColorEffect(self.player.sprite, {
                r: 1, g: 1, b: 0.75, duration: Player.DASH_DURATION_TICKS
            }), true
        );
    });
    
    function getDirection(controlState, facing){
        
        var L = controlState.left.isDown,
            U = controlState.up.isDown,
            R = controlState.right.isDown,
            D = controlState.down.isDown;
        
        if(L){
            if(U) return -135;
            else if(D) return 135;            
            return 180;
        }
        else if(U){
            if(R) return -45;
            return -90;
        }
        else if(R){
            if(D) return 45;
            return 0;
        }
        else if(D){
            return 90;
        }
        else{
            return facing;
        }        
    };
};

MovementManager.prototype.endMovement = function(){
    
    this.dash = null;
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
    this.dash = null;
    
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

    checkDash();
    checkKnockback();

    if(this.player.falling)
        control = false;
    
    if(control){
        if(controlState['up'].isDown == 1)
            y--;
        if(controlState['down'].isDown == 1)
            y++;
        if(controlState['left'].isDown == 1)
            x--;
        if(controlState['right'].isDown == 1)
            x++;
        
        if(x && y){
            
            x *= 0.72;
            y *= 0.72;
        };
    };
    
    if(x != 0 || y != 0)
        movePlayer(x, y);
    
    if(self.dashCooldown > 0) 
        self.dashCooldown--;
    else 
        self.dashCooldown = 0;
    
    function movePlayer(x, y){
        
        self.player.x += x * Player.SPEED;
        self.player.y += y * Player.SPEED;        
        
        if(controlState.strafe.isDown == 1)
            return;
        
        self.player.sprite.rotation = Math.atan2(y, x) * 180 / Math.PI - 90;
        self.player.facing = Math.atan2(y, x) * 180 / Math.PI;
    };

    function checkDash(){

        if(!self.dash)
            return;
        
        var angleRadians = self.dash.direction * Math.PI / 180;
        var mul = 1 + (Player.DASH_SPEED_MUL - 1) * 
            (self.dash.duration / Player.DASH_DURATION_TICKS);        
        
        x += Math.cos(angleRadians) * mul;
        y += Math.sin(angleRadians) * mul;

        self.dash.duration--;

        if(self.dash.duration <= 0)
            self.dash = null;

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