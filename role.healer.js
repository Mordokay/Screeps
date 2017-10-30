var roleHealer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var roomToHeal = "W48N57";

    var daddy = creep.pos.findClosestByRange(FIND_MY_CREEPS,{
      filter: function(screep){return screep.memory.role == "warrior"}
    });
    if(creep.room.name != roomToHeal){
      creep.moveTo(new RoomPosition(25,25, roomToHeal));
    }
    else if(creep.hits < creep.hitsMax){

    }
    else if(daddy) {
      if(daddy.hits < daddy.hitsMax && creep.heal(daddy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(daddy);
      }
      else{
        creep.moveTo(daddy);
      }
    }
  }
};

module.exports = roleHealer;
