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
      var healer = _.filter( Game.creeps, function(creep){return creep.memory.role == 'healer'});

     if(harvesters.length < 2) {
          //console.log(creep.room.lookAt(20,16)[0].terrain);
          //TODO: get all sources int he room and check aroundsource for free positions. Assign each new harvester to a free position.
          //When harvester dies the position is free and a new creep gets assigned to that position. Note: A creep can only harvest from his position
          Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester', harvesting : false});
      }
      else if(builders.length < 0) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder', building : false});
      }
      else if(upgraders.length < 6) {
          Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader', upgrading : false});
      }
      else if(repairers.length < 0) {
         Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'repairer', repairing : false});
      }
      else if(healer.length < 0) {
        Game.spawns.Spawn1.createCreep([HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, TOUGH , TOUGH, TOUGH], undefined, {role: 'healer'});
      }
      else if(warrior.length < 1) {
        Game.spawns.Spawn1.createCreep([ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, TOUGH], undefined, {role: 'warrior'});
      }
      else if(claimer.length < 0) {
        Game.spawns.Spawn1.createCreep([CLAIM, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH,], undefined, {role: 'claimer'});
      }
    }
};

module.exports = spawnManager;
