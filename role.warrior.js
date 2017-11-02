var roleWarrior = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var roomToAtack = "W47N58";
    var tower = creep.pos.findClosestByRange(STRUCTURE_TOWER);
    var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);


    if(creep.room.name != roomToAtack){
      creep.moveTo(new RoomPosition(25,25, roomToAtack));
    }
    else if(tower) {
      if(creep.attack(tower) == ERR_NOT_IN_RANGE) {
        creep.moveTo(tower);
      }
    }
    else if(enemy) {
      if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemy);
      }
    }
    else{
      creep.moveTo(creep.room.Spawn1);
    }
  }
};

module.exports = roleWarrior;
