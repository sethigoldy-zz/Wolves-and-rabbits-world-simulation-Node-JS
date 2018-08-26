var rn = require('random-number');
let moves=[+1,0,-1];
var move_options = {
    min:  0,
    max:  2,
    integer: true
}
var initSpace= function(space){
    global.grid = [];
    for(var x = 0; x < space; x++){
        global.grid[x] = [];
        for(var y = 0; y < space; y++){
            global.grid[x][y] = 0;
        }
    }
};
let getPositionXY=function(x,y,type){
    //responsible for checking available positions and assigning new positions within space limits
    let movable_space =  moves;
    let movable_options = move_options;
    if(typeof(x) === "undefined" || typeof(y) === "undefined"){
       // console.log('in without x and y')
        movable_space = global.grid[0];
        movable_options = {
            min:0,
            max:global.grid[0].length-1,
            integer:true
        }
    }
    let X = rn(movable_options);
    let Y = rn(movable_options);
    
    // console.log(global.grid);
    if(typeof(x) != "undefined" && typeof(y) != "undefined"){
        if(x+1 >= global.grid[0].length){
            X = global.grid[0].length-1;

        }else if(x+movable_space[X]<0){
            X = 0;
        }else{
            X = x+movable_space[X];
        }
        if(y+1 >= global.grid[0].length){
            Y = global.grid[0].length-1;
        }else if(y+movable_space[Y]<0){
            Y = 0;
        }else{
            Y = y+movable_space[Y];
        }
    }
    if(global.grid[X][Y] == 0){
        let pos = 0;
        if(type == "wolves"){
            pos = 2;
        }else if(type == "rabbits"){
            pos = 1;
        }else{
            pos = 3;
        }
        global.grid[X][Y]=pos;
        if(typeof(x) != "undefined" && typeof(y) != "undefined"){
            global.grid[x][y]=0;
        }
        //console.log(global.grid);
        if(X < 0 || Y <0){
            console.log('less than zero set',X,Y);
            process.exit();
        }
        
    console.log("from x and y ",x,y, ' to ',X,Y);
        return {
            "X":X,
            "Y":Y
        }
    }
    console.log("not moved");

    if(typeof(x) != "undefined" && typeof(y) != "undefined"){
        return {
            "X":x,
            "Y":y
        }
    }
}

module.exports = {
    "initSpace":initSpace,
    "getPositionXY":getPositionXY
}
