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

    if(harvesters.length < 4) {
      if(!Game.spawns.Spawn1.spawning){
        var isOneOfThemFalse = false;
        var theNameOfThePositionThatIsFalse;

        for(var pos in Memory.harvestPositions) {
          if(Memory.harvestPositions[pos][3] == false){
            isOneOfThemFalse = true;
            theNameOfThePositionThatIsFalse = pos;
          }
        }
//[WORK, WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        if(isOneOfThemFalse){
          var myPosX = Memory.harvestPositions[theNameOfThePositionThatIsFalse][0];
          var myPosY = Memory.harvestPositions[theNameOfThePositionThatIsFalse][1];
          var mySourceID = Memory.harvestPositions[theNameOfThePositionThatIsFalse][2];
          //console.log("theNameOfThePositionThatIsFalse: " + theNameOfThePositionThatIsFalse);
          var myArray = [WORK, WORK, WORK,  WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
          if(typeof(Game.spawns.Spawn1.createCreep(myArray, undefined, {role: 'harvester', harvesting : false, posX: myPosX, posY: myPosY, sourceID: mySourceID})) == 'string'){
              Memory.harvestPositions[theNameOfThePositionThatIsFalse][3] = true;
          }
        }
      }
    }
    else if(builders.length < 0 ) {
      Game.spawns.Spawn1.createCreep([WORK, WORK, WORK,  WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder', building : false});
    }
    else if(upgraders.length < 3) {
      var myArray = [WORK, WORK, WORK,  WORK, WORK, WORK,
        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
      Game.spawns.Spawn1.createCreep(myArray, undefined, {role: 'upgrader', upgrading : false});
    }
    else if(repairers.length < 0) {
      Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'repairer', repairing : false});
    }
    else if(healer.length < 0) {
      Game.spawns.Spawn1.createCreep([HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE, HEAL, MOVE], undefined, {role: 'healer'});
    }
    else if(warrior.length < 0) {
      var myArray = [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK ];
      Game.spawns.Spawn1.createCreep(myArray, undefined, {role: 'warrior'});
    }
    else if(claimer.length < 0) {
      Game.spawns.Spawn1.createCreep([CLAIM, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH,], undefined, {role: 'claimer'});
    }
    else if(towerManager.length < 1) {
      var arrayAux = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
      Game.spawns.Spawn1.createCreep(arrayAux, undefined, {role: 'towerManager', harvesting : false});
    }
  }
};

module.exports = spawnManager;
