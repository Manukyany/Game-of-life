var BlackHole = require("./blackhole")
var Filth = require("./filth");
var Gazanik = require("./gazanik");
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");
module.exports =class Bomb extends Normal {
    constructor(x,y){
       super(x,y)
       this.energy = 25 ;
    }
   
    chooseCell(ch) {
        this.getNewCoordinates()       
        return super.chooseCell(ch);
    }
      move() {  
        
        let emptyCell1 = this.chooseCell(1) , emptyCell0 = this.chooseCell(0) , emptyCell2 = this.chooseCell(2)
        let arr = emptyCell1.concat(emptyCell0,emptyCell2) 
        this.newCell = arr[Math.floor(Math.random() * arr.length)]; 
        if (this.newCell && this.energy >= 0) {
           for(let k = 0; k<4 ;k++){
            if (matrix[this.newCell[1]][this.newCell[0]] == k) {
                return super.move(4,k)
            } 
           }
        }
        else if (this.energy < 0) {
            this.die();
        }
    }
    mul() {
        
        let emptyCell = this.chooseCell(3)

        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        
        if (newCell && this.energy >= 20) {
            let newX = newCell[0];
            let newY = newCell[1];
            for (let i = 0; i < gazanikArr.length; i++) {
                if (gazanikArr[i].x == newX && gazanikArr[i].y == newY) {
                    gazanikArr.splice(i, 1);
                }
            }
            matrix[newY][newX] = 4;
            let newGazanik = new Gazanik(newX, newY)
            gazanikArr.push(newGazanik);
            this.energy -= 2;
            
        }
        else {
            this.eat();
        }
    }
  
    eat(){
        let emptyCell3 = this.chooseCell(3)
        let emptyCell7 = this.chooseCell(7)
        let emptyCell8 = this.chooseCell(8)
        let emptyCell =  emptyCell3.concat(emptyCell7,emptyCell8)
         let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell) {
            this.energy += 2
            let newX = newCell[0];
            let newY = newCell[1];
            if(matrix[newY][newX] == 3){
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = 0;
                for (let i = 0; i < gazanikArr.length; i++) {
                    if (gazanikArr[i].x == newX && gazanikArr[i].y == newY) {
                        gazanikArr.splice(i, 1);
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
        return super.die(bombArr)

    }
}









