var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRanged = require('role.rangedAtacker');
var roleWarrior = require('role.warrior');
var roleClaimer = require('role.claimer');
var roleTower = require('role.tower');
var spawnManager = require('spawnManager');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            //console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.rooms) {
        //console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }

    spawnManager.checkSpawns();
    roleTower.run();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
            case "harvester":
                roleHarvester.run(creep);
                break;
            case "upgrader":
                roleUpgrader.run(creep);
                break;
            case "builder":
                roleBuilder.run(creep);
                break;
            case "repairer":
                roleRepairer.run(creep);
                break;
            case "ranged":
                roleRanged.run(creep);
                break;
            case "warrior":
                roleWarrior.run(creep);
                break;
            case "claimer":
                roleClaimer.run(creep);
                break;
            default:
                console.log('Weird creep role!!!');
        }
    }
}
