var BlackHole = require("./blackhole");
var Bomb = require("./bomb");
var Gazanik = require("./gazanik");
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");


module.exports =  class Filth  extends Normal {
    constructor(x,y){
        super(x,y)
        this.power = 0
  
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }

    mul(){
        this.multiply++
        let emptyCell3 = this.chooseCell(3)
        let emptyCell2 = this.chooseCell(2)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let emptyCell4 = this.chooseCell(4)
        let emptyCell = emptyCell3.concat(emptyCell2,emptyCell1,emptyCell0,emptyCell4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        
        if (newCell && this.power >= 50) {
            if(stop ){
                let setX = newCell[0];
            let setY = newCell[1];
            for(let  l =1 ; l<5;l++){
                if(matrix[setY][setX] == l){
                    var object  = obj[l]
                    for (let i = 0; i < object.length; i++) {
                        if (object[i].x == setX && object[i].y == setY) {
                            object.splice(i, 1);
                        }
                    }
                }
            }
            matrix[setY][setX] = 7;
            let newFilth = new Filth(setX, setY)
            filthArr.push(newFilth);
            
            }
            
            
        }
    }

}






