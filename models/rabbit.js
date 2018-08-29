
var rabbits = 0;
global.rabbits=[];
var getRabbits = function(){
    return rabbits;
};
let initRabbits=function(){
    for(let i=1;i<=process.env.INIT_RABBITS;i++)
    {
        addRabbit();
        rabbits++;
    }
};
let addRabbit = function(){
    let counter=0;
    if(global.rabbits){
        let last_el=global.rabbits.slice(-1).pop();
        if(last_el){
            counter=last_el.id+1;
        }
    }else{
        global.rabbits = [];
        counter = 1;
    }
    var getPositionXY = require('./space').getPositionXY;
    let posXY = getPositionXY("rabbits");
    if(posXY){

        global.rabbits.push({
            id:counter,
            position_x:posXY.X,
            position_y:posXY.Y,
            type:"rabbits",
            health:0,
            nearFood:0,
            nearDanger:0
        });
    }
};
let eatCarrot = function(rabbit_id,carrotIndex){
    let index = global.rabbits.findIndex(x => x.id==rabbit_id);
    let obj = global.rabbits[index];
    
    //lets remove the existence of the carrot
    global.carrots.splice(carrotIndex,1);
    
    let initHealth = global.rabbits[index].health;
    if(initHealth == 66){
        global.rabbits[index].health=0;
        //add one more rabbit to the world
        global.notifications.push({
            text:"A rabbit is born",
            type:"info",
            time:process.env.TIME*1000
        });
        addRabbit();
    }else{
        global.rabbits[index].health=initHealth+33;
    }
    global.notifications.push({
        text:"A rabbit just ate a carrot",
        type:"success",
        time:process.env.TIME*1000
    });
};

var foodNear = function(x,y){
    //let other nearby rabbits know carrot/s is/are here upto 4 points
    
    letNearbyRabbitKnow("food",x,y);

    global.notifications.push({
        text:"A rabbit broadcast info about food",
        type:"success",
        time:process.env.TIME*1000
    });
};

var inDanger = function(x,y){
    //let other nearby rabbits know wolve/s is/are here upto 4 points
    letNearbyRabbitKnow("wolves",x,y);
    global.notifications.push({
        text:"A rabbit broadcast info about wolves",
        type:"warning",
        time:process.env.TIME*1000
    });
};

var letNearbyRabbitKnow= function(action,x,y){
    global.rabbits.forEach((element, index) => {
        if(x+4< element.position_x <x-4 
            && y+4 < element.position_y < y-4
            && (x!=element.position_x && y!=element.position_y)) {
            if(action == "food")
                global.rabbits[index].nearFood = 1;
            else if(action == "wolves")
                global.rabbits[index].nearDanger = 1;
        }
    });
};


var resetToDefaults = function(index){
    global.rabbits[index].nearFood=0;
    global.rabbits[index].nearDanger = 0;
};

module.exports= {
    "getRabbits":getRabbits,
    "initRabbits":initRabbits,
    "eatCarrot":eatCarrot,
    "inDanger":inDanger,
    "foodNear":foodNear,
    "resetToDefaults":resetToDefaults
};