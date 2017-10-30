var roleWarrior = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var roomToAtack = "W48N57";

    var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if(creep.room.name != roomToAtack){
      creep.moveTo(new RoomPosition(25,25, roomToAtack));
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
