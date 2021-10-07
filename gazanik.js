var BlackHole = require("./blackhole");
var Bomb = require("./bomb");
var Filth = require("./filth");
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");
module.exports =class Gazanik  extends Normal{
    constructor(x, y) {
        super(x,y)
        this.energy = 12;
    }
    getNewCoordinates() {
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
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }

    move() {
        
        let emptyCell1 = this.chooseCell(1) 
        let emptyCell0 = this.chooseCell(0)
        let arr = emptyCell0.concat(emptyCell1)     
        this.newCell = arr[Math.floor(Math.random() * arr.length)]; 
        if (this.newCell && this.energy >= 0) {
           for(var k = 0;k<=1;k++){
            if (matrix[this.newCell[1]][this.newCell[0]] == k) { 
              return super.move(3,k)
            } 
           }
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
     //   var plus = 0
        let emptyCell = this.chooseCell(1)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        // for(var i in this.directions){
        //     let x = this.directions[i][0]
        //     let y = this.directions[i][1];
        //     if(matrix[y][x] == 1 ){
        //         plus++
        //     }
        // }
        // if(plus >= 8){
        //     this.mul()
        // }else{
            if (newCell && this.energy >= 17) {
                let newX = newCell[0];
                let newY = newCell[1];
                for (let i = 0; i < grassArr.length; i++) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY) {
                        grassArr.splice(i, 1);
                    }
                }
                matrix[newY][newX] = 3;
                let newGazanik = new Gazanik(newX, newY)
                gazanikArr.push(newGazanik);
                this.energy -=2;
                
            }
            else {
                this.eat();
            }
    //    }
        
    }
    eat(){
        let emptyCell2 = this.chooseCell(2)
        let emptyCell5 = this.chooseCell(5)
        let emptyCell7 = this.chooseCell(7)
        let emptyCell8 = this.chooseCell(8)
        let emptyCell =  emptyCell2.concat(emptyCell5,emptyCell7,emptyCell8)
         let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            
            
            var newX = newCell[0];
            var newY = newCell[1];
            if(matrix[newY][newX] == 5 && waterArr){
                
                    for(var p in waterArr){
                         if(waterArr[p].x == newX && waterArr[p].y  == newY){
                             var a = p
                         }
                    }
                    waterArr[a].strength--
                     if(waterArr[a].strength <= 0 ){ 
                         matrix[newY][newX] = 0
                         var newBlack = new BlackHole(this.x,this.y)
                         blackHoleArr.push(newBlack)
                         matrix[this.y][this.x] = 6
                        
                         this.energy = 0
                         for (let i = 0; i < waterArr.length; i++) {
                            if (waterArr[i].x == newX && waterArr[i].y == newY) {
                                waterArr.splice(i, 1);
                            }
                        }
                         
                         
                         
                        
                     }else {
                         this.energy = this.energy/2
                     }
                    if(this.energy<= 0){
                        this.die()
                    }
                     
                
                
            }else if(matrix[newY][newX] == 2 ){
                this.energy += 2
                matrix[newY][newX] = 3;
                matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = newX
            this.y = newY
            }else if(matrix[newY][newX] == 7){
                for(var p in filthArr){
                    if(filthArr[p].x == newX && filthArr[p].y  == newY){
                        var e = p
                    }
               }
               if(filthArr[e].power <100){
                    filthArr[e].power++
               }

            }else if(matrix[newY][newX] == 8){
                for(var p in sunArr){
                    if(sunArr[p].x == newX && sunArr[p].y  == newY){
                        var e = p
                    }
               }
               if(sunArr[e].power < 100){
                    sunArr[e].power++
               }
            }
            
        }
        else {
            this.move();
        }
    }
    die() {
        return super.die(gazanikArr)

    }
}
