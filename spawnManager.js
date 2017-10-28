var spawnManager = {

    checkSpawns: function() {
      /*
          console.log('Harvesters: ' + harvesters.length + '   Builders: ' + builders.length +
          '   Upgraders: ' + upgraders.length + '   Warriors: ' + warrior.length + '   Repairers: ' + repairers.length +
          '   Ranged: ' + ranged.length + '   Claimers: ' + claimer.length +
           '   Claimers: ' + claimer.length);
      */

      if(harvesters.length < 3) {
          Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'harvester', harvesting : false});
      }
      else if(builders.length < 2) {
          Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'builder', building : false});
      }
      else if(upgraders.length < 2) {
          Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], undefined, {role: 'upgrader', upgrading : false});
      }
      /*
      else if(repairers.length < 2) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'repairer', repairing : false});
      }
      else if(ranged.length < 0) {
          Game.spawns.Spawn1.createCreep([RANGED_ATTACK, MOVE, MOVE], undefined, {role: 'ranged'});
      }
      else if(warrior.length < 0) {
          Game.spawns.Spawn1.createCreep([RANGED_ATTACK, MOVE, MOVE], undefined, {role: 'warrior'});
      }
      else if(claimer.length < 2) {
          Game.spawns.Spawn1.createCreep([CLAIM, MOVE], undefined, {role: 'claimer'});
      }
      */
    }
};

module.exports = spawnManager;
