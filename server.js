var BlackHole = require("./blackhole");
var Bomb = require("./bomb");
var Filth = require("./filth");
var Gazanik = require("./gazanik");
var Grass = require("./grass");
var GrassEater = require("./grassEater");
var Normal = require("./normal");
var Sun = require("./sun");
var Water = require("./water");



 weath = "winter";

matrix = []

function matrixGen(matY, matX, grass, grassEat, gazan) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0;
        }
    }
    












    for (let i = 0; i < grass; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grassEat; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;

        }
    }
    for (let i = 0; i < gazan; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }

}


matrixGen(40, 40, 1000, 500, 50);

var express = require('express');
const { Socket } = require("socket.io");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index (1).html');
});

server.listen(3000);



check = false
stop = true
bombArr = []
grassArr = [];
grassEaterArr = [];
gazanikArr = []
waterArr = []
blackHoleArr = []
side = 15;
filthArr = []
sunArr = []
numberOfWater = 0
checkIt = true
check2 = false
obj = {
    1: grassArr,
    2: grassEaterArr,
    3: gazanikArr,
    4: bombArr,
    5: waterArr,
    6: blackHoleArr,
    7: filthArr,
    8: sunArr
}
var distance
let cnv
let color = "#acacac"

function createOBj() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y);
                grassEaterArr.push(grEater);
            } else if (matrix[y][x] == 3) {
                var gazan = new Gazanik(x, y);
                gazanikArr.push(gazan);
            }
        }
    }
}
createOBj()

function smash(){
    for (let z  = 0;z<2;z++){
        var setY = Math.floor(Math.random() * matrix.length)
        for (let i = 0; i < matrix[setY].length;i++){
            for (let l = 1; l < 6; l++) {
                if (matrix[setY][i] == l) {
                    var object = obj[l]
                    for (let f = 0; f < object.length; f++) {
                        if (object[f].x == i && object[f].y == setY) {
                            object.splice(f, 1);
                        }
                    }
                }
            }
            matrix[setY][i] == 3
            let newGazanik = new Gazanik(i, setY)
            gazanikArr.push(newGazanik)
    
        }
        console.log(matrix[setY])
    }

}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);



function addBomb() {
    let setX = Math.floor(Math.random() * matrix[0].length - 11)
    let setY = Math.floor(Math.random() * matrix.length - 11)
    if (setX < matrix[0].length && setY < matrix.length && setX >= 0 && setY >= 0) {
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                for (let l = 1; l < 5; l++) {
                    if (matrix[setY][setX] == l) {
                        var object = obj[l]
                        for (let i = 0; i < object.length; i++) {
                            if (object[i].x == setX && object[i].y == setY) {
                                object.splice(i, 1);
                            }
                        }
                    }
                }
                matrix[setY][setX] == 4
                let newBomb = new Bomb(setX, setY)
                bombArr.push(newBomb)
                setX++
                if (x >= 9) {
                    setX = setX - 10
                }
            }
            setY++

        }

    } else {
        addBomb()
    }
    
}



io.on('connection', function (socket) {
    socket.on("stopCount", stopAndCount);
    socket.on("addBomb", addBomb);
    socket.on("smash",smash)

});


function water() {
    let setX = Math.floor(Math.random() * matrix[0].length)
    let setY = Math.floor(Math.random() * matrix.length)
    if (matrix[setY][setX] != 5) {
        for (let l = 1; l < 5; l++) {
            if (matrix[setY][setX] == l) {
                var object = obj[l]
                for (let i = 0; i < object.length; i++) {
                    if (object[i].x == setX && object[i].y == setY) {
                        object.splice(i, 1);
                    }
                }
            }
        }
        matrix[setY][setX] = 5
        let newWater = new Water(setX, setY)
        waterArr.push(newWater)

    } else {
        water()
    }
}

function world() {
    for (var o = 0; o < 2; o++) {
        let setX = Math.floor(Math.random() * matrix[0].length)
        let setY = Math.floor(Math.random() * matrix.length)
        if (o == 0) {
            matrix[setY][setX] = 7
            let newFilth = new Filth(setX, setY)
            filthArr.push(newFilth)
        } else if (o == 1) {
            matrix[setY][setX] = 8
            let newSun = new Sun(setX, setY)
            sunArr.push(newSun)
        }
        for (let l = 1; l < 5; l++) {
            if (matrix[setY][setX] == l) {
                var object = obj[l]
                for (let i = 0; i < object.length; i++) {
                    if (object[i].x == setX && object[i].y == setY) {
                        object.splice(i, 1);
                    }
                }
            }
        }
    }
}
function wait(x) {
    checkIt = false

    setTimeout(() => {
        check = true
    }, x)

}
function wait2(x) {
    checkIt = false

    setTimeout(() => {
        check2 = true
    }, x)

}





function stopAndCount() {
    console.log("asasCafdsfdsfdsf");
    if (filthArr.length > 0 && sunArr.length > 0 && stop) {
        stop = false
        var blackNumber = 0
        var orangeNumber = 0
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                if (matrix[y][x] == 7) {
                    blackNumber++
                } else if (matrix[y][x] == 8) {
                    orangeNumber++
                }
            }

        }
        if (blackNumber > orangeNumber) {
            matrix = []
            numberOfWater = 0
            stop = true
            for (var l = 1; l <= 8; l++) {
                var object = obj[l]
                if (object) {
                    object.splice(0, object.length);
                }
            }
            matrixGen(40, 40, 1000, 500, 50);
            createOBj()
            io.sockets.emit("dataBlackNumber", "Filth wins")
        } else if (orangeNumber > blackNumber) {
            matrix = []
            numberOfWater = 0
            stop = true
            for (var l = 1; l <= 8; l++) {
                var object = obj[l]
                if (object) {
                    object.splice(0, object.length);
                }
            }
            matrixGen(40, 40, 1000, 500, 50);
            createOBj()
            io.sockets.emit("dataBlackNumber", "Sun wins")
        } else {
            matrix = []
            numberOfWater = 0
            stop = true
            for (var l = 1; l <= 8; l++) {
                var object = obj[l]
                if (object) {
                    object.splice(0, object.length);
                }
            }
            matrixGen(40, 40, 1000, 500, 50);
            createOBj()
            io.sockets.emit("dataBlackNumber", "Draw")
        }
        // setTimeout(() => {
            
        // }, 2000)
    }


}

setInterval(
    addBomb
    , 8000)


setInterval(() => {
    if (numberOfWater == 2) {
        numberOfWater++
        world()
    } else if (numberOfWater < 2) {
        for (let i = 0; i < 20; i++) {
            water()
        }
        numberOfWater++
    }

}, 20000)

function game() {

    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < gazanikArr.length; i++) {

        gazanikArr[i].mul();
        //    gazanikArr[i].eat();  

    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }

    if (bombArr.length > 0) {
        for (let i = 0; i < bombArr.length; i++) {
            bombArr[i].eat()
        }
    }

    if (blackHoleArr.length > 0) {

        if (checkIt) {
            wait(1500)
        }

        if (check) {
            for (var i = 0; i < blackHoleArr.length; i++) {
                console.log("asas");
                blackHoleArr[i].teleport()
            }
            check = false
            checkIt = true

        }
        if (checkIt) {
            wait2(1500)
        }
        if (check2) {
            for (var v = 0; v < blackHoleArr.length; v++) {
                blackHoleArr[v].destroy()
            }

            check2 = false
            checkIt = true

        }
    }

    if (sunArr.length > 0) {
        for (let i = 0; i < sunArr.length; i++) {
            sunArr[i].mul()
        }
    }
    if (filthArr.length > 0) {
        for (let i = 0; i < filthArr.length; i++) {
            filthArr[i].mul()
        }
    }


    let sendData = {
        grassC: grassArr.length,
        grassEaterC: grassEaterArr.length,
        bombC: bombArr.length,
        blackholeC: blackHoleArr.length,
        sunC: sunArr.length,
        waterC: waterArr.length,
        filthC: filthArr.length,
        gazanikC: gazanikArr.length,
        matrix: matrix,

    }
    io.sockets.emit("data", sendData)



}


setInterval(
    game
    , 300)