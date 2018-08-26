var space = require('./space');
var carrots = 0;

var getRabbits = function(){
    return carrots;
};
let initCarrots=function(){
    for(carrots=1;carrots<=process.env.INIT_CARROTS;carrots++)
    {
        addCarrots();
    }
}
let addCarrots=function(){
    let counter=0;
    if(global.carrots){
        let last_el=global.carrots.slice(-1).pop();
        if(last_el){
            counter=last_el.id+1;
        }
    }else{
        global.carrots = [];
        counter = 1;
    }
    let posXY = space.getCarrotPositionXY('carrots');
    console.log('rabbit addCarrots posXY',posXY)
    if(posXY){
        global.carrots.push({
            id:counter,
            position_x:posXY.X,
            position_y:posXY.Y,
            type:"carrots",
            health:0
        });
        growInPatch(posXY);
    }
}
let growInPatch=function(posXY){
    let index = global.carrots.findIndex(x => x.id==wolf_id);
    let obj = global.carrots[index];
    //global.carrots.splice(index,1);
    let initHealth = global.carrots[index].health;
    if(initHealth == 50){
        global.carrots[index].health=0;
        //add one more wolf to the world
        addWolf();
    }
}

setInterval(addCarrots(),process.env.TIME*10);

module.exports= {
    "getRabbits":getRabbits,
    "initCarrots":initCarrots
}