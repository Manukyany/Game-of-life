


check = false
 var stop = true
 bombArr = []
 grassArr = []; 
 grassEaterArr = [];
 gazanikArr = []
 waterArr = []
 blackHoleArr = []
 side = 15;
 filthArr =[]
 sunArr = []
 numberOfWater = 0
 checkIt = true
 check2 = false
 obj ={
    1:grassArr,
    2:grassEaterArr,
    3:gazanikArr,
    4:bombArr,
    5:waterArr,
    6:blackHoleArr,
    7:filthArr,
    8:sunArr
}
// var distance
let cnv
let color = "#acacac"
weath  = 'summer'





function setup() {

    var matrix = []
    var socket = io()

    var grassC  = document.getElementById("grassCount");
    var grassEaterC  = document.getElementById("grassEaterCount");
    var bombC  = document.getElementById("bombCount");
    var blackholeC  = document.getElementById("blackholeCounter");
    var sunC  = document.getElementById("sunCounter");
    var waterC  = document.getElementById("waterCounter");
    var filthC  = document.getElementById("filthCounter");
    var gazanikC  = document.getElementById("gazanikCounter");


    
    function test(txt) {
        alert(txt)
        location.reload()
    }
   
    socket.on("dataBlackNumber" , test)

    socket.on("weather", function (data) {
     weath = data;
    })

    socket.on("data" , draw)

    function draw(data) {
        grassC.innerText = data.grassC
        grassEaterC.innerText = data.grassEaterC
        bombC.innerText = data.bombC
        blackholeC.innerText = data.blackholeC
        sunC.innerText = data.sunC
        waterC.innerText = data.waterC
        filthC.innerText = data.filthC
        gazanikC.innerText = data.gazanikC

        matrix = data.matrix

        cnv = createCanvas(matrix[0].length * side, matrix.length * side); // ok
        cnv.mouseOver(makeGreen)
        cnv.mouseOut(makePink)
        function makeGreen(){
            color = "#15ECB1"
        }
        function makePink(){
            color = "#acacac"
        }

        
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                
                if((x * side<mouseX)&&(x*side + side>mouseX)&&(y * side<mouseY)&&(y*side + side>mouseY)){
                  fill("black")
                  
                  
                }else{
                    if (matrix[y][x] == 1) {
                        if(weath == "summer") {
                            fill("green");
                        }else if (weath == "autumn") {
                            fill("#333300");
                        }else if (weath == "winter") {
                            fill("grey");
                        }else if (weath == "spring") {
                            fill("#4dffa6");
                        }
                       // fill("green");
                    
                    }else if (matrix[y][x] == 2) {
                        fill("#F9F22B");
                    } else if (matrix[y][x] == 3) {
                        fill("#B115EC");
                    }else if(matrix[y][x] == 0) {
                        fill(color);
                    }else if(matrix[y][x] == 4) {
                        fill("red")
                    }else if(matrix[y][x] == 5){
                        fill("blue")
                    }else if(matrix[y][x] == 6){
                        fill("brown")
                    }else if(matrix[y][x] == 7){
                        fill("#F112DA")
                    }else if(matrix[y][x] == 8){
                        fill("orange")
                    }
                    
                    
                }
                rect(x * side, y * side, side, side);
    
            }
        }    
    }
}

var socket  = io()
function stopAndCount(){
     socket.emit("stopCount")
}   
function addBomb(){
    socket.emit("addBomb")
}  

function smash(){
    socket.emit("smash")
}  

