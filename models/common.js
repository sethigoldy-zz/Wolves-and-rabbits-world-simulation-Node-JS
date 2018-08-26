//initilize the world
var rn = require('random-number');
let space = require("./space");
let carrots = require("./carrot");
let rabbits = require("./rabbit");
let wolfs = require("./wolf");
(function(){
    // global.area = process.env.TOTAL_SPACE;
    space.initSpace(process.env.TOTAL_SPACE);
    rabbits.initRabbits();
    wolfs.initWolves();
    carrots.initCarrots();

})();

var populate=function(model){

}
let movable =['rabbits','wolves'];
setInterval(function(){
    for(let i in movable){
        global[movable[i]].forEach((element,index) => {
            let posXY = space.getPositionXY(global[movable[i]][index].type,global[movable[i]][index].position_x,global[movable[i]][index].position_y);
            if(posXY)
            {
                global[movable[i]][index].position_x=posXY.X;
                global[movable[i]][index].position_y=posXY.Y;
                console.log(`a ${movable[i]} just moved to position ${global[movable[i]][index].position_x} - ${global[movable[i]][index].position_y}`);    
            }
        });
        
    }
},process.env.TIME)
let move = function(model){
    
    moves[rn(options)];
    let models = global[model];

    for(var i in models){
        global[model][i].position_x+=moves[rn(move_options)];
        global[model][i].position_y+=moves[rn(move_options)];
    }
}

// let actions = [];
// rand
//kill population

module.exports = {
    'rabbits':rabbits,
    'carrots':carrots,
    'wolfs':wolfs
}