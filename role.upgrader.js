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
          filter: (i) => (i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_STORAGE) &&
                         i.store[RESOURCE_ENERGY] > 0
      });
      if (containerWithEnergy) {
        if (creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containerWithEnergy);
        }
      }
    }
  }
};

module.exports = roleUpgrader;
