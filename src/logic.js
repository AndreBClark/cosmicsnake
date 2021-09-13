function info() {
  console.log("INFO")
  const response = {
    apiversion: "1",
    author: "CosmicDivision",
    color: "#47ebb4",
    head: "caffeine",
    tail: "round-bum"
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

  const random = max => Math.floor(Math.random() * max);
  // Step 0: Don't let your Battlesnake move back on it's own neck
  const myHead = gameState.you.head
  const myNeck = gameState.you.body[1]
  const board = {
    x: gameState.board.width - 1,
    y: gameState.board.height - 1
  }
  
  const edges = {
    up: myHead.y === board.y,
    down: myHead.y === 0,
    left: myHead.x === 0,
    right: myHead.x === board.x,
  }

  const isColliding = Object.values(edges).includes(true)
  const isHungry = gameState.you.health < 50;

  function avoidNeck() {
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


  // TODO: Step 1 - Don't hit walls.
  // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
  // If you hit a wall, set the appropriate direction to false.



  function boundaryCheck () {
    let moves = Object.values(possibleMoves);
    Object.values(edges).forEach((edge, index) => {
      if (edge) moves[index] = false;
    })
    possibleMoves = {
      up: moves[0],
      down: moves[1],
      left: moves[2],
      right: moves[3]
    }
  }
    // if (edges.up) possibleMoves.up = false

    // if (edges.down) possibleMoves.down = false

    // if (edges.left) possibleMoves.left = false

    // if (edges.right) possibleMoves.right = false



  // TODO: Step 2 - Don't hit yourself.
  // Use information in gameState to prevent your Battlesnake from colliding with itself.
  function avoidSelf() {
    const myBody = gameState.you.body
    myBody.forEach(segment => {
      if (myHead.x === segment.x - 1 && myHead.y === segment.y) {
        possibleMoves.right = false
      }
      if (myHead.x === segment.x + 1 && myHead.y === segment.y) {
        possibleMoves.left = false
      }
      if (myHead.y === segment.y - 1 && myHead.x === segment.x) {
        possibleMoves.up = false
      }
      if (myHead.y === segment.y + 1 && myHead.x === segment.x) {
        possibleMoves.down = false
      }
    }
    )
  }
  function avoidOtherSnakes() {
    const snakes = gameState.board.snakes
    snakes.forEach(snake => {
      snake.body.forEach(segment => {
        if (myHead.x === segment.x - 1 && myHead.y === segment.y) {
          possibleMoves.right = false
        }
        if (myHead.x === segment.x + 1 && myHead.y === segment.y) {
          possibleMoves.left = false
        }
        if (myHead.y === segment.y - 1 && myHead.x === segment.x) {
          possibleMoves.up = false
        }
        if (myHead.y === segment.y + 1 && myHead.x === segment.x) {
          possibleMoves.down = false
        }
      })
      // avoid head to head collisions
      if (myHead.x === snake.head.x - 1 && myHead.y === snake.head.y) {
        possibleMoves.right = false
      }
      if (myHead.x === snake.head.x + 1 && myHead.y === snake.head.y) {
        possibleMoves.left = false
      }
      if (myHead.y === snake.head.y - 1 && myHead.x === snake.head.x) {
        possibleMoves.up = false
      }
      if (myHead.y === snake.head.y + 1 && myHead.x === snake.head.x) {
        possibleMoves.down = false
      }
    })
  }


  function avoidFood() {
    const food = gameState.board.food;
    if (isHungry) {
      if (isColliding) return;
      food.forEach(morsel => {
        if (myHead.x === morsel.x - 1 && myHead.y === morsel.y) {
          possibleMoves.right = false
        }
        if (myHead.x === morsel.x + 1 && myHead.y === morsel.y) {
          possibleMoves.left = false
        }
        if (myHead.y === morsel.y - 1 && myHead.x === morsel.x) {
          possibleMoves.up = false
        }
        if (myHead.y === morsel.y + 1 && myHead.x === morsel.x) {
          possibleMoves.down = false
        }
      })
    }
  }


  avoidNeck();
  boundaryCheck();
  avoidSelf();
  avoidFood();
  avoidOtherSnakes();
  console.table(possibleMoves);
    const safeMoves = Object.keys(possibleMoves).filter(key => possibleMoves[key]);
  const response = {
    move: safeMoves[random(safeMoves.length)],
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
