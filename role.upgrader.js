var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    else {
      var containerWithEnergy = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                         i.store[RESOURCE_ENERGY] > 0
      });
      //console.log(creep.withdraw(containerWithEnergy, RESOURCE_ENERGY));
      if (containerWithEnergy) {
        if (creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containerWithEnergy);
        }
      }

      /*
      else{
        var source = creep.pos.findClosestByPath(FIND_SOURCES, {
          filter: function(source){return source.energy > 0;}
        });
        if(source && creep.harvest(source) == ERR_NOT_IN_RANGE){
          creep.moveTo(source);
        }
      }
      */
    }
  }
};

module.exports = roleUpgrader;
