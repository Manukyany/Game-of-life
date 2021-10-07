
var BlackHole = require("./blackhole");
var Bomb = require("./bomb");
var Filth = require("./filth");
var Gazanik = require("./gazanik");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");
module.exports =class Grass extends Normal {
    constructor(x, y) {
        super(x,y)
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }





    mul() {
        this.multiply++ // 1
        let emptyCell = this.chooseCell(0) //
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [1, 2]
        if (newCell && this.multiply >= 2  ) {
         
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 2
            matrix[newY][newX] = 1; // 1
            
            let newGrass = new Grass(newX, newY)
            grassArr.push(newGrass); 
            this.multiply = 0;
        }
    }

}


