var roleWarrior = {

  /** @param {Creep} creep **/
  run: function(creep) {

    var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if(enemy) {
      if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemy);
      }
    }
    //No enemies? .. just attack the controller
    else{
      var controller = creep.room.find(STRUCTURE_CONTROLLER);
      if(controller.owner != Game.owner) {
        if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(controller);
        }
      }
      else {
        var closestStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function(structure){return (structure.owner != creep.owner)}
        });

        if(closestStructure && creep.attack(closestStructure) == ERR_NOT_IN_RANGE) {
          creep.moveTo(closestStructure);
        }
      }
    }
  }
};

module.exports = roleWarrior;
