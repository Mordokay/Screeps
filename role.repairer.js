var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }

        // Temporary limit hit repair to 300000 so repairers dont stay forever on Walls and Rampart
        if(creep.memory.repairing) {

            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure){return (structure.hits < structure.hitsMax &&
                structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) ||
                (structure.hits < 30000  &&(structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL))}
            });

            if(closestDamagedStructure) {
                //isNearTo to forces creeps to go to the location of the action to perform instead of doing from far away and possibly
                //blocking other creeps from gathering resources
                if (creep.pos.isNearTo(closestDamagedStructure.pos.x, closestDamagedStructure.pos.y)) {
                    creep.repair(closestDamagedStructure)
                }
                else {

                    creep.moveTo(closestDamagedStructure);
                }

                //if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                //    creep.moveTo(closestDamagedStructure);
                //}
            }
            //Builds stuff if there is nothing to repair
            else{
                var constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

                if(constructionSite) {
                    if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructionSite);
                    }
                }
            }
        }
        else {
            var source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: function(source){return source.energy > 0;}
            });
            if(source){
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
            else{
                var containers = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    //var containers = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(container){return container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] > (container.storeCapacity / 4)}
                });

                if (containers[0]) {
                    if(creep.harvest(containers[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleRepairer;