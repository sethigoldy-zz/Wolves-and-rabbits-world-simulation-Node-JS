var space = require('./space');
var wolfs = 0
// setInterval(function(){
//     wolfs+=1;
// },100)
var getWolfs = function(){
    return wolfs;
};
let initWolves=function(){
    for(let i=1;i<=process.env.INIT_WOLVES;i++)
    {
        addWolf();
        wolfs++;
    }
}
let addWolf=function(){
    let counter=0;
    if(global.wolves){
        let last_el=global.wolves.slice(-1).pop();
        if(last_el){
            counter=last_el.id+1;
        }
    }else{
        global.wolves = [];
        counter = 1;
    }
    let posXY = space.getPositionXY("wolves");
    if(posXY){
        global.wolves.push({
            id:counter,
            position_x:posXY.X,
            position_y:posXY.Y,
            type:"wolves",
            health:0
        });
    }
}
let eatRabbit = function(wolf_id,rabbitIndex){
    let index = global.wolves.findIndex(x => x.id==wolf_id);
    let initHealth = global.wolves[index].health;
    if(initHealth == 50){
        global.wolves[index].health=0;
        //add one more wolf to the world
        addWolf();
    }else{
        global.wolves[index].health=initHealth+50; 
    }
    //lets kill that rabbit
    global.rabbits.splice(rabbitIndex,1);
}

module.exports= {
    "getWolves":getWolfs,
    "initWolves":initWolves,
    "eatRabbit":eatRabbit
}