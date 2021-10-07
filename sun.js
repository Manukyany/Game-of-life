var BlackHole = require("./blackhole");
var Bomb = require("./bomb");
var Filth = require("./filth");
var Gazanik = require("./gazanik");
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");

module.exports =class Sun  extends Normal{
    constructor(x,y){
       super(x,y)   
        this.power = 0      
        
    }
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch);
    }

    mul(){
        let emptyCell3 = this.chooseCell(3)
        let emptyCell2 = this.chooseCell(2)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let emptyCell4 = this.chooseCell(4)
        let emptyCell = emptyCell3.concat(emptyCell2,emptyCell1,emptyCell0,emptyCell4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        
        if (newCell && this.power >= 50) {
            if(stop){
                let newX = newCell[0];
                let newY = newCell[1];
                for(let  l =1 ; l<5;l++){
                    if(matrix[newY][newX] == l){
                        var object  = obj[l]
                        for (let i = 0; i < object.length; i++) {
                            if (object[i].x == newX && object[i].y ==newY ) {
                                object.splice(i, 1);
                            }
                        }
                    }
                }
                matrix[newY][newX] = 8;
                let newSun = new Sun(newX, newY)
                sunArr.push(newSun);
                
            }
            
        }
    }


}













