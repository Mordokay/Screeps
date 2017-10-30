var roleWarrior = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if(creep.roomName != "W49N59"){
      creep.moveTo(new RoomPosition(25,25, "W49N59"));
    }
    else if(enemy) {
      if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemy);
      }
    }
    //No enemies? .. just attack the controller
    else{
        if(creep.room.controller && !creep.room.controller.my) {
            if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
/*
        console.log("Check controller!!!");
      var controller = creep.pos.findClosestByRange(STRUCTURE_CONTROLLER);
      if(controller && controller.owner != Game.owner) {
        if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(controller);
        }
        else{
            creep.say("atacking controller!!!");
        }
      }
      */
    }
  }
};

module.exports = roleWarrior;
