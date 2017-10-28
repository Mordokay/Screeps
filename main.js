var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleRanged = require('role.rangedAtacker');
var roleWarrior = require('role.warrior');
var roleClaimer = require('role.claimer');
var roleTower = require('role.tower');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(var name in Game.rooms) {
        //console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    
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

    if(harvesters.length < 3) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'harvester', harvesting : false});
    }
    else if(builders.length < 3) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'builder', building : false});
    }
    else if(upgraders.length < 5) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'upgrader', upgrading : false});
    }
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