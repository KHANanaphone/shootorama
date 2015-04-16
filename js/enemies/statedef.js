function Statedef(){
    
    this.id = 'initial';
    this.time = 0;
}

Statedef.prototype.changeState = function(id){
    
    this.id = id;
    this.time = 0;
}