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
    var towerManager = _.filter( Game.creeps, function(creep){return creep.memory.role == 'towerManager'});


    Memory.harvestPositions["Pos1"][3] = true;
    if(harvesters.length < 5) {


      var myPosX, myPosY, mySourceID;
      var found = false;
      for(var pos in Memory.harvestPositions) {
        if(found){
          break;
        }
        if(Memory.harvestPositions[pos][3] == false){
            myPosX = Memory.harvestPositions[pos][0];
            myPosY = Memory.harvestPositions[pos][1];
            mySourceID = posX = Memory.harvestPositions[pos][2];
            Memory.harvestPositions[pos][3] = true;
            found = true;
        }
      }


      //console.log(creep.room.lookAt(20,16)[0].terrain);
      //TODO: get all sources in the room and check around source for free positions. Assign each new harvester to a free position.
      //When harvester dies the position is free and a new creep gets assigned to that position. Note: A creep can only harvest from his position
      Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester', harvesting : false, posX: myPosX, posY: myPosY, sourceID: mySourceID});
    }
    else if(builders.length < 0 ) {
      Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder', building : false});
    }
    else if(upgraders.length < 1) {
      Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader', upgrading : false});
    }
    else if(repairers.length < 0) {
      Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'repairer', repairing : false});
    }
    else if(healer.length < 0) {
      Game.spawns.Spawn1.createCreep([HEAL, HEAL, MOVE, MOVE, MOVE, MOVE, MOVE, TOUGH , TOUGH, TOUGH], undefined, {role: 'healer'});
    }
    else if(warrior.length < 0) {
      Game.spawns.Spawn1.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], undefined, {role: 'warrior'});
    }
    else if(claimer.length < 0) {
      Game.spawns.Spawn1.createCreep([CLAIM, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH,], undefined, {role: 'claimer'});
    }
    else if(towerManager.length < 1) {
      Game.spawns.Spawn1.createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'towerManager', harvesting : false});
    }
  }
};

module.exports = spawnManager;
