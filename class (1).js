
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0] // this.x - 1 // 0
            let y = this.directions[i][1]; // this.y - 1 // 1
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]); // [ [this.x - 1, this.y - 1],]
                }
            }
        }
        return found;
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
            grassArr.push(newGrass); // էս մասը պարտադիր ա, որովհետև սեթափի մեջ մենակ սկզբւմ ա նայում
            //որ վանդակում ինչ թիվ ա , ու սարքում օբյեկտ,,,իսկ մեզ պետքա ամեն նորի հետ սարքի
            this.multiply = 0;
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 35;
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
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let emptyCell = this.chooseCell(0) // գտնի դատարկ վանդակները
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]; // [1, 1]
        if (newCell && this.energy > 0) { 
            this.energy--;// գրենք էս երկու պայմանները
            let newX = newCell[0]; // 1
            let newY = newCell[1]; // 1
            matrix[newY][newX] = 2; // 2 // paint yellow cell
            matrix[this.y][this.x] = 0;
            this.x = newX // 2 = 1
            this.y = newY // 1 = 1
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
                        var newBlack = new BlackHole(this.x,this.y)
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
        if(matrix[this.y][this.x] != 6){
            matrix[this.y][this.x] = 0
        }
        
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
}


class Gazanik {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
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
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        
        let emptyCell1 = this.chooseCell(1) 
        let emptyCell0 = this.chooseCell(0)
        let arr = emptyCell0.concat(emptyCell1)     
        let newCell = arr[Math.floor(Math.random() * arr.length)]; 
        if (newCell && this.energy >= 0) {
           for(var k = 0;k<=1;k++){
            if (matrix[newCell[1]][newCell[0]] == k) { 
                this.energy--;
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 3
                matrix[this.y][this.x] = k;
                this.x = newX
                this.y = newY
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
        if(matrix[this.y][this.x] != 6){
            matrix[this.y][this.x] = 0
        }
        for (let i = 0; i < gazanikArr.length; i++) {
            if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
                gazanikArr.splice(i, 1);
            }
        }

    }
}


class Bomb {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 25 ;
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
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
      move() {  
        
        let emptyCell1 = this.chooseCell(1) , emptyCell0 = this.chooseCell(0) , emptyCell2 = this.chooseCell(2)
        let arr = emptyCell1.concat(emptyCell0,emptyCell2) 
        let newCell = arr[Math.floor(Math.random() * arr.length)]; 
        if (newCell && this.energy >= 0) {
           for(let k = 0; k<4 ;k++){
            if (matrix[newCell[1]][newCell[0]] == k) {
                this.energy--;
                let newX = newCell[0];
                let newY = newCell[1];
                matrix[newY][newX] = 4
                matrix[this.y][this.x] = k;
                this.x = newX
                this.y = newY
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
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < bombArr.length; i++) {
            if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                bombArr.splice(i, 1);
            }
        }

    }
}


class Water {
    constructor(x,y){
        this.x = x
        this.y = y
        this.strength = 30
    }
 
}


class BlackHole{
    constructor(x,y){
        this.x = x
        this.y = y
        this.directions = []
        this.energy = 4 
    }

    getNewCoordinates() {
        this.directions = [ 
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1],
           
        ];
    }
 
    teleport(){
           
            let setX = Math.floor(Math.random() * matrix[0].length )
            let setY = Math.floor(Math.random() * matrix.length )
            if(matrix[setY][setX] != 6 && setX < matrix[0].length-1 && setY < matrix.length-1 && setX >=1 && setY>=1){
                
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
                this.energy--
                this.disappear()
                      
                if(this.energy <= 0){
                    this.die()
                }
                matrix[setY][setX] = 6
                
                this.x  = setX
                this.y = setY
                 
           
            } 
            else{
                this.teleport()
            }
    }   


    destroy(){  
        console.log("destroy")
        this.getNewCoordinates()    
                for(let i =0 ;i < this.directions.length;i++){
                    let sideX = this.directions[i][0]
                    let sideY = this.directions[i][1]
                    if(sideX>0 && sideY>0 && sideX < matrix[0].length-1 && sideY < matrix.length-1){
                              // for(let  l = 1 ; l<5;l++){
                        //     if(matrix[sideY][sideX] == l ){
                        //         var object  = obj[l]
                        //         for (let i = 0; i < object.length; i++) {                                  Why???  Xi chi ashxatum???
                        //             if (object[i].x == sideX && object[i].y == sideY) {
                        //                 object.splice(i, 1);
                        //             }
                        //         }
                        //     }
                        // }  
                        matrix[sideY][sideX] = 6
                    }
                  
                        
                    }
            

    }
          
     
    disappear(){
        matrix[this.y][this.x] = 0
        for(let i = 0; i<this.directions.length;i++){
            let sideX = this.directions[i][0]
            let sideY = this.directions[i][1]
            if(sideX>0 && sideY>0 && sideX < matrix[0].length-1 && sideY < matrix.length-1){
                matrix[sideY][sideX] = 0
            }
         
        }
        
    }

    die() {
       
      for (let i = 0; i < blackHoleArr.length; i++) {
            let newX = blackHoleArr[i].x
            let newY = blackHoleArr[i].y
            matrix[newY][newX] = 0
            for(let f = 0; f<blackHoleArr[i].directions.length;f++){
                let sideX = blackHoleArr[i].directions[f][0]
                let sideY = blackHoleArr[i].directions[f][1]
                matrix[sideY][sideX] = 0
            }
        }

        blackHoleArr = []
        check = false
        checkIt = true
        check2 = false

}
}


class Filth {
    constructor(x,y){
        this.x = x
        this.y = y
        this.directions = []
        this.power = 0
  
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
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
        
        if (newCell && this.power >= 100) {
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


class Sun {
    constructor(x,y){
        this.x = x
        this.y = y
        this.directions = []
            
        this.power = 0
       
        
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
        var found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul(){
   
        let emptyCell3 = this.chooseCell(3)
        let emptyCell2 = this.chooseCell(2)
        let emptyCell1 = this.chooseCell(1)
        let emptyCell0 = this.chooseCell(0)
        let emptyCell4 = this.chooseCell(4)
        let emptyCell = emptyCell3.concat(emptyCell2,emptyCell1,emptyCell0,emptyCell4)
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
        
        if (newCell && this.power >= 100) {
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





