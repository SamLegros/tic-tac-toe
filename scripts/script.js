// what's left: add winner / tie gameStatus

var player;
var cpu;
var turn = 0;
var movePlayed = [
    ["square", "movedPlayed"],
    ["sq1", "open"],
    ["sq2", "open"],
    ["sq3", "open"],
    ["sq4", "open"],
    ["sq5", "open"],
    ["sq6", "open"],
    ["sq7", "open"],
    ["sq8", "open"],
    ["sq9", "open"]
];
var cpuMoveTime = 2500;
var endScreenTime = 2000;

var isTesting = 0;

if (isTesting == 0) {
    $(".gameDiv").hide();
    $(".startScreenDiv").show();
} else {
    $(".startScreenDiv").hide();
    $(".gameDiv").show();
}

$(document).ready(function() {
    $(".startScreenTitle").addClass("animated tada");
});

// person int: Human = 0, CPU = 1;
function playMove(num, person) {
    if (person == 0) {
        if (player == 0) {
            $(".sqp" + num)
            .html("<span style='color: #F6AE2D'>O</span>")
            .addClass("animated fadeIn");
            movePlayed[num][1] = "player";
            turn++;
            console.log("turn: " + turn + " . num: " + num);
            $(".gameTurnStatus").html(
                "C<span style='color: #F26419'>x</span>mputer's turn!"
            );
            endGame();
            if (turn < 10) {
                ai();
            }
        } else {
            $(".sqp" + num)
            .html("<span style='color: #F26419'>X</span>")
            .addClass("animated fadeIn");
            movePlayed[num][1] = "player";
            turn++;
            console.log("turn: " + turn + " . num: " + num);
            $(".gameTurnStatus").html(
                "C<span style='color: #F6AE2D'>o</span>mputer's turn!"
            );
            endGame();
            if (turn < 10) {
                ai();
            }
        }
    } else {
        if (cpu == 0) {
            $(".sqp" + num)
            .html("<span style='color: #F6AE2D'>O</span>")
            .addClass("animated fadeIn");
            movePlayed[num][1] = "cpu";
            turn++;
            console.log("turn: " + turn + " . num: " + num);
            $(".gameTurnStatus").html(
                "Y<span style='color: #F26419'>x</span>ur turn!"
            );
            endGame();
        } else {
            $(".sqp" + num)
            .html("<span style='color: #F26419'>X</span>")
            .addClass("animated fadeIn");
            movePlayed[num][1] = "cpu";
            turn++;
            console.log("turn: " + turn + " . num: " + num);
            $(".gameTurnStatus").html(
                "Y<span style='color: #F6AE2D'>o</span>ur turn!"
            );
            endGame();
        }
    }
}

function cpuTurn() {
    var cpuMove = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    var checkMove = movePlayed[cpuMove][1];
    if (checkMove == "open") {
        setTimeout(function() {
            playMove(cpuMove, 1);
        }, cpuMoveTime);
    } else if (checkMove != "open") {
        cpuTurn();
    }
}

function toggleScreen() {
    turn = 0;
    $(".gameDiv").toggle();
    $(".startScreenDiv").toggle();

    for (var i = 0; i < movePlayed.length; i++) {
        $("#sq" + i).html("<p class='sqp" + i + "'></p>");
    }

    movePlayed = [
        ["square", "movedPlayed"],
        ["sq1", "open"],
        ["sq2", "open"],
        ["sq3", "open"],
        ["sq4", "open"],
        ["sq5", "open"],
        ["sq6", "open"],
        ["sq7", "open"],
        ["sq8", "open"],
        ["sq9", "open"]
    ];
}

$(".reset").click(function() {
    toggleScreen();
});

$(".xChoice").click(function() {
    toggleScreen();
    player = 1;
    cpu = 0;
    $(".gameTurnStatus").html("Y<span style='color: #F26419'>x</span>ur turn!");
});

$(".oChoice").click(function() {
    toggleScreen();
    player = 0;
    cpu = 1;
    $(".gameTurnStatus").html(
        "C<span style='color: #F26419'>x</span>mputer's turn!"
    );
    ai();
});

function oddOrEven(num) {
    if (num % 2 == 0) {
        return "even";
    } else {
        return "odd";
    }
}

function manualMove(num) {
    if (
        (oddOrEven(player) == "odd" && oddOrEven(turn) == "even") ||
        (oddOrEven(player) == "even" && oddOrEven(turn) == "odd")
    ) {
        if (movePlayed[num][1] == "open") {
            playMove(num, 0);
            movePlayed[num][1] = "player";
        }
    }
}

$("#sq1").click(function() {
    manualMove(1);
});

$("#sq2").click(function() {
    manualMove(2);
});

$("#sq3").click(function() {
    manualMove(3);
});

$("#sq4").click(function() {
    manualMove(4);
});

$("#sq5").click(function() {
    manualMove(5);
});

$("#sq6").click(function() {
    manualMove(6);
});

$("#sq7").click(function() {
    manualMove(7);
});

$("#sq8").click(function() {
    manualMove(8);
});

$("#sq9").click(function() {
    manualMove(9);
});

// function aiTest() {
//   cpuTurn();
// }

function ai() {
    if (
        // 1 wins
        (movePlayed[2][1] == "player" &&
        movePlayed[3][1] == "player" &&
        movePlayed[1][1] == "open") ||
        (movePlayed[5][1] == "player" &&
        movePlayed[9][1] == "player" &&
        movePlayed[1][1] == "open") ||
        (movePlayed[4][1] == "player" &&
        movePlayed[7][1] == "player" &&
        movePlayed[1][1] == "open")
    ) {
        setTimeout(function() {
            playMove(1, 1);
        }, cpuMoveTime);
    } else if (
        // 2 wins
        (movePlayed[1][1] == "player" &&
        movePlayed[3][1] == "player" &&
        movePlayed[2][1] == "open") ||
        (movePlayed[5][1] == "player" &&
        movePlayed[8][1] == "player" &&
        movePlayed[2][1] == "open")
    ) {
        setTimeout(function() {
            playMove(2, 1);
        }, cpuMoveTime);
    } else if (
        // 3 wins
        (movePlayed[1][1] == "player" &&
        movePlayed[2][1] == "player" &&
        movePlayed[3][1] == "open") ||
        (movePlayed[7][1] == "player" &&
        movePlayed[5][1] == "player" &&
        movePlayed[3][1] == "open") ||
        (movePlayed[6][1] == "player" &&
        movePlayed[9][1] == "player" &&
        movePlayed[3][1] == "open")
    ) {
        setTimeout(function() {
            playMove(3, 1);
        }, cpuMoveTime);
    } else if (
        // 4 wins
        (movePlayed[1][1] == "player" &&
        movePlayed[7][1] == "player" &&
        movePlayed[4][1] == "open") ||
        (movePlayed[5][1] == "player" &&
        movePlayed[6][1] == "player" &&
        movePlayed[4][1] == "open")
    ) {
        setTimeout(function() {
            playMove(4, 1);
        }, cpuMoveTime);
    } else if (
        // 5 wins
        (movePlayed[2][1] == "player" &&
        movePlayed[8][1] == "player" &&
        movePlayed[5][1] == "open") ||
        (movePlayed[4][1] == "player" &&
        movePlayed[6][1] == "player" &&
        movePlayed[5][1] == "open") ||
        (movePlayed[1][1] == "player" &&
        movePlayed[9][1] == "player" &&
        movePlayed[5][1] == "open") ||
        (movePlayed[3][1] == "player" &&
        movePlayed[7][1] == "player" &&
        movePlayed[5][1] == "open")
    ) {
        setTimeout(function() {
            playMove(5, 1);
        }, cpuMoveTime);
    } else if (
        // 6 wins
        (movePlayed[3][1] == "player" &&
        movePlayed[9][1] == "player" &&
        movePlayed[6][1] == "open") ||
        (movePlayed[4][1] == "player" &&
        movePlayed[5][1] == "player" &&
        movePlayed[6][1] == "open")
    ) {
        setTimeout(function() {
            playMove(6, 1);
        }, cpuMoveTime);
    } else if (
        // 7 wins
        (movePlayed[1][1] == "player" &&
        movePlayed[4][1] == "player" &&
        movePlayed[7][1] == "open") ||
        (movePlayed[3][1] == "player" &&
        movePlayed[5][1] == "player" &&
        movePlayed[7][1] == "open") ||
        (movePlayed[8][1] == "player" &&
        movePlayed[9][1] == "player" &&
        movePlayed[7][1] == "open")
    ) {
        setTimeout(function() {
            playMove(7, 1);
        }, cpuMoveTime);
    } else if (
        // 8 wins
        (movePlayed[2][1] == "player" &&
        movePlayed[5][1] == "player" &&
        movePlayed[8][1] == "open") ||
        (movePlayed[7][1] == "player" &&
        movePlayed[9][1] == "player" &&
        movePlayed[8][1] == "open")
    ) {
        setTimeout(function() {
            playMove(8, 1);
        }, cpuMoveTime);
    } else if (
        // 9 wins
        (movePlayed[7][1] == "player" &&
        movePlayed[8][1] == "player" &&
        movePlayed[9][1] == "open") ||
        (movePlayed[3][1] == "player" &&
        movePlayed[6][1] == "player" &&
        movePlayed[9][1] == "open") ||
        (movePlayed[1][1] == "player" &&
        movePlayed[5][1] == "player" &&
        movePlayed[9][1] == "open")
    ) {
        setTimeout(function() {
            playMove(9, 1);
        }, cpuMoveTime);
    } else {
        cpuTurn();
    }
}

function endGame() {
    if (
        (movePlayed[1][1] == "cpu" && // across top
        movePlayed[2][1] == "cpu" &&
        movePlayed[3][1] == "cpu") ||
        (movePlayed[4][1] == "cpu" && // across middle
        movePlayed[5][1] == "cpu" &&
        movePlayed[6][1] == "cpu") ||
        (movePlayed[7][1] == "cpu" && // across bottom
        movePlayed[8][1] == "cpu" &&
        movePlayed[9][1] == "cpu") ||
        (movePlayed[1][1] == "cpu" && // down left
        movePlayed[4][1] == "cpu" &&
        movePlayed[7][1] == "cpu") ||
        (movePlayed[2][1] == "cpu" && // down middle
        movePlayed[5][1] == "cpu" &&
        movePlayed[8][1] == "cpu") ||
        (movePlayed[3][1] == "cpu" && // down right
        movePlayed[6][1] == "cpu" &&
        movePlayed[9][1] == "cpu") ||
        (movePlayed[1][1] == "cpu" && // X top-left to bottom-right
        movePlayed[5][1] == "cpu" &&
        movePlayed[9][1] == "cpu") ||
        (movePlayed[3][1] == "cpu" && // X top-right to bottom-left
        movePlayed[5][1] == "cpu" &&
        movePlayed[7][1] == "cpu")
    ) {
        if (oddOrEven(player) == "odd") {
            $(".gameTurnStatus").html("C<span style='color: #F6AE2D'>o</span>mputer wins!");
        } else {
            $(".gameTurnStatus").html("C<span style='color: #F26419'>x</span>mputer wins!");
        }
        setTimeout(function() {
            toggleScreen();
        }, endScreenTime);
    } else if (turn == 9) {
        $(".gameTurnStatus").html("It's a tie!");
        setTimeout(function() {
            toggleScreen();
        }, endScreenTime);
    } else if (
        (movePlayed[1][1] == "player" && // across top
        movePlayed[2][1] == "player" &&
        movePlayed[3][1] == "player") ||
        (movePlayed[4][1] == "player" && // across middle
        movePlayed[5][1] == "player" &&
        movePlayed[6][1] == "player") ||
        (movePlayed[7][1] == "player" && // across bottom
        movePlayed[8][1] == "player" &&
        movePlayed[9][1] == "player") ||
        (movePlayed[1][1] == "player" && // down left
        movePlayed[4][1] == "player" &&
        movePlayed[7][1] == "player") ||
        (movePlayed[2][1] == "player" && // down middle
        movePlayed[5][1] == "player" &&
        movePlayed[8][1] == "player") ||
        (movePlayed[3][1] == "player" && // down right
        movePlayed[6][1] == "player" &&
        movePlayed[9][1] == "player") ||
        (movePlayed[1][1] == "player" && // X top-left to bottom-right
        movePlayed[5][1] == "player" &&
        movePlayed[9][1] == "player") ||
        (movePlayed[3][1] == "player" && // X top-right to bottom-left
        movePlayed[5][1] == "player" &&
        movePlayed[7][1] == "player")
    ) {
        if (oddOrEven(player) == "odd") {
            $(".gameTurnStatus").html("Y<span style='color: #F26419'>x</span>u win!");
        } else {
            $(".gameTurnStatus").html("Y<span style='color: #F6AE2D'>o</span>u win!");
        }
        setTimeout(function() {
            toggleScreen();
        }, endScreenTime);
    }
}
