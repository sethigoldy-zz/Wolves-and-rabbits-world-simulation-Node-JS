let space = require("./space");
let carrots = require("./carrot");
let rabbits = require("./rabbit");
let wolfs = require("./wolf");

//initilize the world
(function(){

    global.notifications=[];
    if(Math.pow(process.env.TOTAL_SPACE,2) < (
        parseInt(process.env.INIT_CARROTS) 
        + parseInt(process.env.INIT_RABBITS)
        + parseInt(process.env.INIT_WOLVES)
    )){
        console.log('Not Enough Space in the world for Carrots, Wolves and Rabbits ;) .');
        process.exit();
    }
    
    setTimeout(function(){
        space.initSpace(process.env.TOTAL_SPACE);
        rabbits.initRabbits();
        wolfs.initWolves();
        carrots.initCarrots();
        move();
    },process.env.DELAY*1000);   

})();

var move = function(){

    let movable =['rabbits','wolves'];
    setInterval(function(){
        for(let i in movable){
            global[movable[i]].forEach((element,index) => {
                if(global[movable[i]][index]){                
                    let posXY = space.getPositionXY(global[movable[i]][index].type,
                        global[movable[i]][index].position_x,
                        global[movable[i]][index].position_y,
                        global[movable[i]][index]);
                    if(posXY){
                        global[movable[i]][index].position_x=posXY.X;
                        global[movable[i]][index].position_y=posXY.Y;
                    }
                    resetFoodAndDanger(movable[i],index);
                }
            });
            
        }
    
    },process.env.TIME*1000);
};

var resetFoodAndDanger = function(type,index){
    if(type == "rabbits"){
        rabbits.resetToDefaults(index);
    }else if(type == "wolves"){
        wolfs.resetToDefaults(index);
    }
};

module.exports = {
    'rabbits':rabbits,
    'carrots':carrots,
    'wolfs':wolfs
};