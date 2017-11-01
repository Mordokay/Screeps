var roleTowerManager = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
      creep.memory.harvesting = false;
    }
    if(!creep.memory.harvesting && creep.carry.energy == 0) {
      creep.memory.harvesting = true;
    }

    if(creep.memory.harvesting) {
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
    }
    else{
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (structure) {
          return (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity);
        }
      });
      if (target) {
        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
    }
  }
};

module.exports = roleTowerManager;
