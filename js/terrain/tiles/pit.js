function Pit(vars){
    
    this.spriteName = 'pit';
    this.Tile_constructor(vars);
};

(function(){
        
var prototype = createjs.extend(Pit, Tile);
    
prototype.enemyStep = function(enemy){

};    
    
prototype.playerStep = function(player){
    
    if(!player.isDashing() && !player.falling){

        player.falling = true;
        
        var effect = new ScaleEffect(player, {
            to: 0.01,
            time: 20
        });
        
        effect.onClear = function(){
            player.die()
        };

        player.effectsManager.addEffect(effect);
    };
};

Pit = createjs.promote(Pit, 'Tile');
Pit.initialized = true;
    
})();