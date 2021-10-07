var Bomb = require("./bomb");
var Filth = require("./filth");
var Gazanik = require("./gazanik");
var Grass = require("./grass");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");
var BlackHole = require("./blackhole.js");



module.exports = class GrassEater extends Normal {



    chooseCell(ch) {
        this.getNewCoordinates() 
        return super.chooseCell(ch)
    }

    move() {
        this.emptyCell = this.chooseCell(0) // գտնի դատարկ վանդակները
        this.newCell = this.emptyCell[Math.floor(Math.random() * this.emptyCell.length)]; // [1, 1]
        if (this.newCell && this.energy > 0) { 
            return super.move(2,0)
        }
        else if (this.energy <= 0) {
            this.die();
        }
    }
    mul() {
   
        let emptyCell4 = this.chooseCell(4)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell = emptyCell4.concat(emptyCell1)
     
            let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy >= 41) {
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 0
            matrix[newY][newX] = 2; 
            let newGrassEater = new GrassEater(newX, newY)
            grassEaterArr.push(newGrassEater);
            for (let i = 0; i < bombArr.length; i++) {
                if (bombArr[i].x == newX && bombArr[i].y == newY) {
                    bombArr.splice(i, 1);
                }
            }
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                }
            }
          
            this.energy --;
        }
        // else {
        //     this.eat()
        // }
   //     }
        
    }
    eat(){
        let emptyCell1 = this.chooseCell(1)
        let emptyCell5 = this.chooseCell(5)
        let emptyCell7 = this.chooseCell(7)
        let emptyCell8 = this.chooseCell(8)
        let emptyCell = emptyCell1.concat(emptyCell5,emptyCell7,emptyCell8)
         let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        if (newCell && this.energy > 0) {
            
            
            let newX = newCell[0];
            let newY = newCell[1];
            if(matrix[newY][newX] == 5 && waterArr){
                
                   for(var p in waterArr){
                        if(waterArr[p].x == newX && waterArr[p].y  == newY){
                            var a = p
                        }
                   }
                   waterArr[a].strength--
                    if(waterArr[a].strength <= 0 ){ 
                        matrix[this.y][this.x] = 6
                        for (let i = 0; i < waterArr.length; i++) {
                            if (waterArr[i].x == newX && waterArr[i].y == newY) {
                                waterArr.splice(i, 1);
                            }
                        }
                        matrix[newY][newX] = 0

                        let newBlack = new BlackHole(this.x,this.y)
                        blackHoleArr.push(newBlack)
                        matrix[this.y][this.x] = 6
                        this.energy = 0
                        
                       
                    }else {
                        this.energy = this.energy/2
                    }
                    if(this.energy<= 0){
                        this.die()
                    }
                    
             
                
            }else if(matrix[newY][newX] == 1){
                this.energy += 2
                matrix[newY][newX] = 2;
                matrix[this.y][this.x] = 0;
            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
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
        else{
            this.move();
        }
    }
    die() {
        return super.die(grassEaterArr)
    }
}


