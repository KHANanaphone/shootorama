var LevelDefs = {};

function Level(id){
    
    var levelDef = LevelDefs[id];
    
    this.map = levelDef.map;
    this.x = levelDef.initialX;
    this.y = levelDef.initialY;
    this.roomId = this.map[this.y][this.x];    
    this.roomSetups = levelDef.roomSetups;
    this.currentRoom = new Room(this.roomSetups[this.roomId]);    
};

Level.prototype.tryTransitionRoom = function(direction){
    
    var x = this.x;
    var y = this.y;
    
    if(direction == 'up')
        y--;
    else if(direction == 'left')
        x--;
    else if(direction == 'down')
        y++;
    else if(direction == 'right')
        x++;
    
    if(!this.map[y] || !this.map[y][x])
        return false;
    
    this.x = x;
    this.y = y;
    this.roomId = this.map[y][x];
    this.currentRoom = new Room(this.roomSetups[this.roomId]);
    
    return true;
};