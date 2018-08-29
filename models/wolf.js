var wolfs = 0;
var getWolfs = function(){
    return wolfs;
};
global.wolves=[];
let initWolves=function(){
    for(let i=1;i<=process.env.INIT_WOLVES;i++)
    {
        addWolf();
        wolfs++;
    }
};
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
    var getPositionXY = require('./space').getPositionXY;
    let posXY = getPositionXY("wolves");
    if(posXY){
        global.wolves.push({
            id:counter,
            position_x:posXY.X,
            position_y:posXY.Y,
            type:"wolves",
            health:0,
            nearFood:0
        });
    }
};
let eatRabbit = function(wolf_id,rabbitIndex){
    let index = global.wolves.findIndex(x => x.id==wolf_id);
    let initHealth = global.wolves[index].health;
    if(initHealth == 75){
        global.wolves[index].health=0;
        //add one more wolf to the world
        console.log("added one more wolf to the world");
        global.notifications.push({
            text:"New Wolf is added",
            type:"warning",
            time:process.env.TIME*1000
        });
        addWolf();
    }else{
        global.wolves[index].health=initHealth+25; 
    }
    //lets kill that rabbit
    global.rabbits.splice(rabbitIndex,1);
    global.notifications.push({
        text:"A rabbit is killed",
        type:"danger",
        time:process.env.TIME*1000
    });
};

var foodNear = function(action,x,y){
    global.wolves.forEach((element, index) => {
        if(x+4< element.position_x <x-4 
            && y+4 < element.position_y < y-4
            && (x!=element.position_x && y!=element.position_y)) {
            if(action == "food")
                global.wolves[index].nearFood = 1;
            else if(action == "wolves")
                global.wolves[index].nearDanger = 1;
        }
    });
};

var resetToDefaults = function(index){
    global.wolves[index].nearFood=0;
};

module.exports= {
    "getWolves":getWolfs,
    "initWolves":initWolves,
    "eatRabbit":eatRabbit,
    "foodNear":foodNear,
    "resetToDefaults":resetToDefaults
};