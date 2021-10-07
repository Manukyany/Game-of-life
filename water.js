var BlackHole = require("./blackhole");
var Bomb = require("./bomb");
var Filth = require("./filth");
var Gazanik = require("./gazanik");
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");

module.exports = class Water extends Normal {
    constructor(x,y){
        super(x,y)
        this.strength = 30
    }
 
}

