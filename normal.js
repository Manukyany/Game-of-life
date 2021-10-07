module.exports =class Normal  {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 35;
        this.multiply = 0;
        this.directions = [];
        this.newCell = [ ];
        this.emptyCell = null;
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

    move(number,key) {

            this.energy--;// գրենք էս երկու պայմանները
            let newX = this.newCell[0]; // 1
            let newY = this.newCell[1]; // 1
            matrix[newY][newX] = number; // 2 // paint yellow cell
            matrix[this.y][this.x] = key;
            this.x = newX // 2 = 1
            this.y = newY // 1 = 1
        
    }

    die(destroy) {
        if(matrix[this.y][this.x] != 6){
            matrix[this.y][this.x] = 0
        }
        
        for (let i = 0; i < destroy.length; i++) {
            if (destroy[i].x == this.x && destroy[i].y == this.y) {
                destroy.splice(i, 1);
            }
        }
    }
  //  check = false
//     stop = true
//     bombArr = []
//     grassArr = []; 
//     grassEaterArr = [];
//     gazanikArr = []
//     waterArr = []
//     blackHoleArr = []
//     side = 15;
//     filthArr =[]
//     sunArr = []
//     numberOfWater = 0
//     checkIt = true
//     check2 = false
//     obj ={
//        1:grassArr,
//        2:grassEaterArr,
//        3:gazanikArr,
//        4:bombArr,
//        5:waterArr,
//        6:blackHoleArr,
//        7:filthArr,
//        8:sunArr
//    }
   
    
}

