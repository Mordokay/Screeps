var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRanged = require('role.rangedAtacker');
var roleWarrior = require('role.warrior');
var roleClaimer = require('role.claimer');
var roleTower = require('role.tower');
var spawnManager = require('spawnManager');
var roleHealer = require('role.healer');
var roleTowerManager = require('role.towerManager');

module.exports.loop = function () {

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {

      if(Memory.creeps[name]["role"] == "harvester"){
        for(var pos in Memory.harvestPositions) {
          if(Memory.harvestPositions[pos][0] == Memory.creeps[name]["posX"] && Memory.harvestPositions[pos][1] == Memory.creeps[name]["posY"]){
            Memory.harvestPositions[pos][3] = false;
            console.log("Clearing " + name + " and released slot at pos: ( " + Memory.creeps[name]["posX"] + " , " + Memory.creeps[name]["posY"] + " )");
          }
        }
      }
      else{
        console.log('Clearing non-existing creep memory:',  name);
      }
      delete Memory.creeps[name];
    }
  }

  spawnManager.checkSpawns();
  roleTower.run();

  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    switch (creep.memory.role) {
      case "harvester":
      creep.say('H');
      roleHarvester.run(creep);
      break;
      case "upgrader":
      creep.say('U');
      roleUpgrader.run(creep);
      break;
      case "builder":
      creep.say('B');
      roleBuilder.run(creep);
      break;
      case "repairer":
      creep.say('R');
      roleRepairer.run(creep);
      break;
      case "ranged":
      roleRanged.run(creep);
      break;
      case "warrior":
      creep.say('W');
      roleWarrior.run(creep);
      break;
      case "claimer":
      creep.say('C');
      roleClaimer.run(creep);
      break;
      case "healer":
      creep.say('HLr');
      roleHealer.run(creep);
      break;
      case "towerManager":
      creep.say('TM');
      roleTowerManager.run(creep);
      break;
      default:
      console.log('Weird creep role: ' + creep.memory.role);
    }
  }
}
