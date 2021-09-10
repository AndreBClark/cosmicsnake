function info() {
    console.log("INFO")
    const response = {
        apiversion: "1",
        author: "CosmicDivision",
        color: "#47ebb4", 
        head: "caffeine",
        tail: "bolt"
    }
    return response
}

function start(gameState) {
    console.log(`${gameState.game.id} START`)
}

function end(gameState) {
    console.log(`${gameState.game.id} END\n`)
}

function move(gameState) {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    }
    // Step 0: Don't let your Battlesnake move back on it's own neck
    const myHead = gameState.you.head
    const myNeck = gameState.you.body[1]
    const board = {
        width: gameState.board.width,
        height: gameState.board.height
    }
    const moveAxis = {
        x: [possibleMoves.left, possibleMoves.right],
        y: [possibleMoves.up, possibleMoves.down]
    }

    function AvoidNeck () {
        if (myNeck.x < myHead.x) {
            possibleMoves.left = false
        } else if (myNeck.x > myHead.x) {
            possibleMoves.right = false
        } else if (myNeck.y < myHead.y) {
            possibleMoves.down = false
        } else if (myNeck.y > myHead.y) {
            possibleMoves.up = false
        }
    }


    function BoundaryCheck(head, boundary, axis) {
        switch (head) {
            case 0: axis[0] = false;
                break;
            case boundary: axis[1] = false;
                break;
            default: break;
        }
        console.log(possibleMoves);
    }

    function AvoidEdges (head, boundary, axis) {
        BoundaryCheck(head.x, boundary.x, axis.x);
        BoundaryCheck(head.y, boundary.y, axis.y);
    }

    AvoidNeck();
    AvoidEdges(myHead, board, moveAxis);

    // TODO: Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.




    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    // const mybody = gameState.you.body

    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key])
    const response = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)],
    }

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`)
    return response
}

module.exports = {
    info: info,
    start: start,
    move: move,
    end: end
}
