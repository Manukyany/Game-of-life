var Normal = require("./normal");





module.exports = class BlackHole  extends Normal{
    constructor(x,y){
        super(x,y)
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




