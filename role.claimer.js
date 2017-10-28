var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var roomToClaim = 'E47S41';
        //console.log(creep.room);

        if(creep.room.name != roomToClaim){
            //console.log(creep.room.findExitTo(roomToClaim));
            creep.moveTo(creep.pos.findClosestByRange(creep.room.findExitTo(roomToClaim)));
        }
        else {
            //console.log(creep.claimController(creep.room.controller) + '   ijuhuh' );
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleClaimer;