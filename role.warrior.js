var roleWarrior = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(enemy) {
            if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy);
            }
        }
        //No enemies? .. just attack the controller
        else{
            var controller = creep.room.find(STRUCTURE_CONTROLLER);
            if(controller.owner != Game.owner) {
                if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller);
                }
            }
        }
    }
};

module.exports = roleWarrior;