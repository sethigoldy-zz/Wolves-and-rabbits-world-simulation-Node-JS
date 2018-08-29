var rn = require('random-number');
var space = require('./space');
var carrots = 0;
global.carrots=[];
let minCarrot = 1; 
var getRabbits = function(){
    return carrots;
};
let x,y,addedCarrots = 0;
let moves=[+1,0,-1];
var move_options = {
    min:  0,
    max:  2,
    integer: true
};
let initCarrots=function(){
    for(carrots=1;carrots<=process.env.INIT_CARROTS;carrots++)
    {
        addCarrots();
    }
};
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
        if(!space.isSpaceAvailable()){
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
        
        //growInPatch(posXY);
    }
};
let growInPatch=function(){
    for(let i=0;i<=5;i++){

    }
    global.notifications.push({
        text:"New Carrot/s is/are added",
        type:"success",
        time:process.env.TIME*1000
    });
};

setInterval(addCarrots,process.env.TIME*10*1000);

module.exports= {
    "getRabbits":getRabbits,
    "initCarrots":initCarrots,
    // "growInPatch":growInPatch
};