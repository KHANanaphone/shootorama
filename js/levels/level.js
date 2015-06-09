var LevelDefs = {};
var RoomDefs = {};

function Level(id){
    
    Game.level = this;
    var levelDef = LevelDefs[id];
    
    this.map = levelDef.map;
    this.x = levelDef.initialX;
    this.y = levelDef.initialY;  
    
    this.roomSetups = levelDef.roomSetups;    
    this.rooms = [];
    
    for(var i = 0; i < this.map.length; i++)
        this.rooms[i] = [];
    
    this.currentRoom = this.getRoom(this.x, this.y);
    this.respawnRoom = this.currentRoom;
};

Level.prototype.isRespawnRoom = function(room){

    if(this.respawnRoom == room)
        return true;
    
    return false;
};

//get the room, and load it if it hasn't been loaded yet. returns null if there's no room there
Level.prototype.getRoom = function(x, y){
    
    if(!this.map[y] || !this.map[y][x])
        return false;
    if(!this.rooms[y][x])
        this.rooms[y][x] = new Room(RoomDefs[this.map[y][x]], x, y);
    
    return this.rooms[y][x];
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
    
    var nextRoom = this.getRoom(x, y);
    
    if(!nextRoom)
        return false;
    
    this.x = x;
    this.y = y;
    
    this.currentRoom = nextRoom;
    
    return true;
};

Level.prototype.warpToRoom = function(x, y){
    
    if(!x && x != 0){
        x = this.respawnRoom.roomX;
        y = this.respawnRoom.roomY;
    };
    
    this.x = x;
    this.y = y;
    this.currentRoom = this.getRoom(x, y);
    
    return this.currentRoom;
};