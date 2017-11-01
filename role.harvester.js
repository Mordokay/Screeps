var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
      creep.memory.harvesting = false;
    }
    if(!creep.memory.harvesting && creep.carry.energy == 0) {
      creep.memory.harvesting = true;
    }

    if(creep.memory.harvesting) {

      var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
      var distance;
      if(source){
        var a = creep.pos.x - source.pos.x
        var b = creep.pos.y - source.pos.y
        distance = Math.sqrt( a*a + b*b );
      }
      if(source && distance < 4){
        //Only pickup droped energy if its close (distance < 4)
        if(creep.pickup(source) == ERR_NOT_IN_RANGE){
          creep.moveTo(source);
        }
      }
      //console.log(creep.name + " is harvesting at (" + creep.memory.posX + " , " + creep.memory.posY + " ) on source: " + creep.memory.sourceID);
      //var source = creep.pos.findClosestByPath(FIND_SOURCES, {
      //  filter: function(source){return source.energy > 0;}
      //});
      else if(creep.pos.x ==  creep.memory.posX && creep.pos.y ==  creep.memory.posY){
        creep.harvest(Game.getObjectById(creep.memory.sourceID));
      }
      else{
        creep.moveTo(creep.memory.posX, creep.memory.posY)
      }
    }
    //First creep is gonna fill structures swith enery by this order: extensions/spawns -> containers
    //If there is no place to put the energy, the creep becomes usefull by helping to build structures.
    else {
      target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function (structure) {
          return ((structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity);
          }
        });

        if (target) {
          if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
        else {
          var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function (container) {
              return (container.structureType == STRUCTURE_CONTAINER && container.store[RESOURCE_ENERGY] < container.storeCapacity);
            }
          });
          if (container) {
            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
            }
          }
          else {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (constructionSite) {
              if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite);
              }
            }
          }
        }
      }
    }
  };

module.exports = roleHarvester;
