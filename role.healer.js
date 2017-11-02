var roleHealer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var roomToHeal = "W47N58";
    var friendhealer = creep.pos.findClosestByRange(FIND_MY_CREEPS,{
      filter: function(screep){return screep.memory.role == "healer" && creep.hits < creep.hitsMax}
    });
    var daddy = creep.pos.findClosestByRange(FIND_MY_CREEPS,{
      filter: function(screep){return screep.memory.role == "warrior" && creep.hits < creep.hitsMax}
    });

    if(creep.room.name != roomToHeal){
      creep.moveTo(new RoomPosition(48,27, roomToHeal));
    }
    else if(creep.hits < creep.hitsMax){
        creep.heal(creep);
    }
    else if(friendhealers & creep.heal(friendhealers) == ERR_NOT_IN_RANGE){
      creep.moveTo(friendhealers);
    }
    else if(daddy & creep.heal(daddy) == ERR_NOT_IN_RANGE){
      creep.moveTo(daddy);
    }
    else{
      creep.moveTo(daddy);
    }
  }
};

module.exports = roleHealer;
