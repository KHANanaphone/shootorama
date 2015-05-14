var LevelDefs = {};
var RoomDefs = {};

function Level(id){
    
    var levelDef = LevelDefs[id];
    
    this.map = levelDef.map;
    this.x = levelDef.initialX;
    this.y = levelDef.initialY;  
    
    this.roomSetups = levelDef.roomSetups;    
    this.rooms = [];
    
    for(var i = 0; i < this.map.length; i++){
        
        this.rooms[i] = [];
        
        for(var j = 0; j < this.map[i].length; j++){
            
            var roomDef = RoomDefs[this.map[i][j]];
            
            if(roomDef)
                this.rooms[i][j] = new Room(roomDef);
        }
    }
    
    this.currentRoom = this.rooms[this.y][this.x];
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
    
    if(!this.rooms[y] || !this.rooms[y][x])
        return false;
    
    this.x = x;
    this.y = y;
    
    this.currentRoom.leave();
    this.currentRoom = this.rooms[y][x];
    this.currentRoom.enter();    
    
    return true;
};