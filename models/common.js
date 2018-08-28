let space = require("./space");
let carrots = require("./carrot");
let rabbits = require("./rabbit");
let wolfs = require("./wolf");

//initilize the world
(function(){
    space.initSpace(process.env.TOTAL_SPACE);
    rabbits.initRabbits();
    wolfs.initWolves();
    carrots.initCarrots();

})();

let movable =['rabbits','wolves'];
setInterval(function(){
    for(let i in movable){
        global[movable[i]].forEach((element,index) => {
            if(global[movable[i]][index]){
                
            let posXY = space.getPositionXY(global[movable[i]][index].type,global[movable[i]][index].position_x,global[movable[i]][index].position_y,global[movable[i]][index]);
            if(posXY)
            {
                global[movable[i]][index].position_x=posXY.X;
                global[movable[i]][index].position_y=posXY.Y;
                console.log(`a ${movable[i]} just moved to position ${global[movable[i]][index].position_x} - ${global[movable[i]][index].position_y}`);    
            }
            }
        });
        
    }
},process.env.TIME);

setInterval(function(){
    carrots.growInPatch();
},process.env.TIME*10)

module.exports = {
    'rabbits':rabbits,
    'carrots':carrots,
    'wolfs':wolfs
}