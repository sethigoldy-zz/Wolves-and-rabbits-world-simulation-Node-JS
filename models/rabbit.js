var space = require('./space');
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
let addRabbit=function(){
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
    let posXY = space.getPositionXY("rabbits");
    console.log('rabbit addRabbit posXY',posXY)
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
let eatRabbit=function(wolf_id){
    let index = global.rabbits.findIndex(x => x.id==wolf_id);
    let obj = global.rabbits[index];
    //global.rabbits.splice(index,1);
    let initHealth = global.rabbits[index].health;
    if(initHealth == 50){
        global.rabbits[index].health=0;
        //add one more wolf to the world
        addWolf();
    }
}

module.exports= {
    "getRabbits":getRabbits,
    "initRabbits":initRabbits
}