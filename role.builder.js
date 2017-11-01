var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
    }

    if(creep.memory.building) {
      var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

      if (constructionSite) {
        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite);
        }
      }
      else{
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: function (structure) {
            return ((structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity);
              //return (structure.structureType == STRUCTURE_CONTAINER  && structure.energy < structure.energyCapacity);
            }
          });
          if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          }
          else {
            var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
              //var containers = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: function (container) {
                return container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] < container.storeCapacity
              }
            });

            if (containers[0]) {
              if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0]);
              }
            }
          }
        }
      }
      else {
        /*
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
        */
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
    }
  };

module.exports = roleBuilder;
