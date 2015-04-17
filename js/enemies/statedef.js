function Statedef(enemy){
    
    this.id = 'initial';
    this.time = 0;
    this.enemy = enemy;
}

Statedef.prototype.changeState = function(id){
    
    if(this.onExitState){
        this.onExitState.call(this.enemy);
        this.onExitState = null;
    }
    
    this.id = id;
    this.time = 0;
}