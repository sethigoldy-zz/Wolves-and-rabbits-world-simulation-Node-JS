var rn = require('random-number');
var space = require('./space');
var carrots = 0;
global.carrots=[];
let minCarrot = 1; let maxCarrot = Math.ceil((process.env.TOTAL_SPACE)*3/10);
var getRabbits = function(){
    return carrots;
};
let x,y,addedCarrots = 0;
let moves=[+1,0,-1];
var move_options = {
    min:  0,
    max:  2,
    integer: true
}
let initCarrots=function(){
    for(carrots=1;carrots<=process.env.INIT_CARROTS;carrots++)
    {
        addCarrots();
    }
}
let addCarrots = function(){
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
    let posXY = space.getPositionXY('carrots',x,y);
    if(posXY){
        if(addedCarrots >= maxCarrot){
            x=undefined;
            y=undefined;
            addedCarrot=0;
        }
        global.carrots.push({
            id:counter,
            position_x:posXY.X,
            position_y:posXY.Y,
            type:"carrots"
        });
        global.notifications.push({
            text:"New Carrot/s is added",
            type:"success",
            time:process.env.TIME*1000
        });
        //growInPatch(posXY);
    }
}
// let growInPatch=function(posXY){
//     let index = global.carrots.findIndex(x => x.id==wolf_id);
//     let obj = global.carrots[index];
//     //global.carrots.splice(index,1);
//     let initHealth = global.carrots[index].health;
//     if(initHealth == 50){
//         global.carrots[index].health=0;
//         //add one more wolf to the world
//         addCarrots();
//     }
// }

setInterval(addCarrots,process.env.TIME*10*1000);

module.exports= {
    "getRabbits":getRabbits,
    "initCarrots":initCarrots,
    // "growInPatch":growInPatch
}