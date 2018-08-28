
var rabbits = 0;

var getRabbits = function(){
    return rabbits;
};
let initRabbits=function(){
    for(let i=1;i<=process.env.INIT_RABBITS;i++)
    {
        addRabbit();
        rabbits++;
    }
}
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
            health:0
        });
    }
}
let eatCarrot = function(rabbit_id,carrotIndex){
    let index = global.rabbits.findIndex(x => x.id==rabbit_id);
    let obj = global.rabbits[index];
    let initHealth = global.rabbits[index].health;
    if(initHealth == 75){
        global.rabbits[index].health=0;
        //add one more rabbit to the world
        addRabbit();
    }else{
        global.rabbits[index].health=initHealth+25;
    }
    //lets remove the existence of the carrot
    global.carrots.splice(carrotIndex,1);
}

module.exports= {
    "getRabbits":getRabbits,
    "initRabbits":initRabbits,
    "eatCarrot":eatCarrot
}