var spawnManager = {
  //MOVE	50, WORK	100, CARRY	50, ATTACK	80, RANGED_ATTACK	150, HEAL	250, TOUGH	10, CLAIM	600
    checkSpawns: function() {
      var harvesters = _.filter( Game.creeps, function(creep){return creep.memory.role == 'harvester'});
      var builders = _.filter( Game.creeps, function(creep){return creep.memory.role == 'builder'});
      var upgraders = _.filter( Game.creeps, function(creep){return creep.memory.role == 'upgrader'});
      var repairers = _.filter( Game.creeps, function(creep){return creep.memory.role == 'repairer'});
      var ranged = _.filter( Game.creeps, function(creep){return creep.memory.role == 'ranged'});
      var warrior = _.filter( Game.creeps, function(creep){return creep.memory.role == 'warrior'});
      var claimer = _.filter( Game.creeps, function(creep){return creep.memory.role == 'claimer'});

      /*
          console.log('Harvesters: ' + harvesters.length + '   Builders: ' + builders.length +
          '   Upgraders: ' + upgraders.length + '   Warriors: ' + warrior.length + '   Repairers: ' + repairers.length +
          '   Ranged: ' + ranged.length + '   Claimers: ' + claimer.length +
           '   Claimers: ' + claimer.length);
      */
     if(repairers.length < 1) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'repairer', repairing : false});
      }
     else  if(harvesters.length < 2) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester', harvesting : false});
      }
      else if(builders.length < 3) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder', building : false});
      }
      else if(upgraders.length < 6) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader', upgrading : false});
      }
      else if(warrior.length < 1) {
          Game.spawns.Spawn1.createCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], undefined, {role: 'warrior'});
      }
      else if(claimer.length < 1) {
          Game.spawns.Spawn1.createCreep([CLAIM, MOVE], undefined, {role: 'claimer'});
      }
      //else if(warrior.length < 1) {
      //    Game.spawns.Spawn1.createCreep([ATTACK, ATTACK, MOVE, MOVE], undefined, {role: 'warrior'});
      //}
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
