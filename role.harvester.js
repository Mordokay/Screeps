var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }

        // Temporary limit hit repair to 300000 so repairers dont stay forever on Walls and Rampart
        if(creep.memory.harvesting) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES, {
                filter: function(source){return source.energy > 0;}
            });

            if(source && creep.harvest(source) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
        else {
        /*
         var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
         filter: function (structure) {
         return ((structure.structureType == STRUCTURE_EXTENSION ||
         structure.structureType == STRUCTURE_SPAWN ||
         structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity);
         //return (structure.structureType == STRUCTURE_CONTAINER  && structure.energy < structure.energyCapacity);
         }
         });
         */
            target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function (structure) {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity);
                    //return (structure.structureType == STRUCTURE_CONTAINER  && structure.energy < structure.energyCapacity);
                }
            });

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (structure) {
                        return (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity);
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
                    else {
                        //Builds stuff if there is no place to put energy harvested

                        var constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

                        if (constructionSite) {
                            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(constructionSite);
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;