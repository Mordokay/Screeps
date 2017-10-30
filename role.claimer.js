var roleClaimer = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var roomToClaim = 'W48N57';

    if(creep.room.name != roomToClaim){
      creep.moveTo(new RoomPosition(25,25, roomToClaim));
    }
    else if(!creep.room.controller.my) {
      if(creep.room.controller.level == 0){
        if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
      else{
        if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    }
  }
};

module.exports = roleClaimer;
