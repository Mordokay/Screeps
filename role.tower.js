var roleTower = {

  run: function() {

    var woundedCreeps = _.filter(Game.creeps, (c) => c.hits < c.hitsMax);

    var hostiles = Game.spawns.Spawn1.room.find(FIND_HOSTILE_CREEPS);
    var towers = Game.spawns.Spawn1.room.find(
      FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
      var damagedStructures = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
        filter: function(structure){return (structure.hits < structure.hitsMax &&
          structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) ||
          (structure.hits < 30000  &&(structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL))}
        });

        if(hostiles.length > 0) {
          var username = hostiles[0].owner.username;
          Game.notify('User ${username} spotted in room ${roomName}');

          towers.forEach(function(tower) {tower.attack(hostiles[0])});
        }
        else if(woundedCreeps.length > 0){
          for( var i = 0; i < woundedCreeps.length; ++i ) {
            towers.forEach(tower => tower.heal(woundedCreeps[i]));
          }
        }
        else if (damagedStructures.length > 0) {
          towers.forEach(function(tower) {tower.repair(damagedStructures[0])});
        }
      }
    };

    module.exports = roleTower;
