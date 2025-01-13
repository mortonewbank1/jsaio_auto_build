import React, { useState, useEffect } from "react";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const numberOfObstacles = 100;
  useEffect(() => {
    window.addEventListener("keydown", moveBall);
    return () => {
      window.removeEventListener("keydown", moveBall);
    };
  }, []);

  const moveBall = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        setPosition((prev) => {
          return { x: prev.x - 1, y: prev.y };
        });
        break;
      case "ArrowRight":
        setPosition((prev) => {
          return { x: prev.x + 1, y: prev.y };
        });
        break;
      case "ArrowUp":
        setPosition((prev) => {
          return { x: prev.x, y: prev.y - 1 };
        });
        break;
      case "ArrowDown":
        setPosition((prev) => {
          return { x: prev.x, y: prev.y + 1 };
        });
        break;
      default:
        break;
    }
  };

  return (
    <Map numberOfObstacles={numberOfObstacles}>
      <Ball position={position} setPosition={setPosition} />
    </Map>
  );
}

function Map({ children, numberOfObstacles }) {
  const [obstacles, setObstacles] = useState([]);

  useEffect(() => {
    const map = generateMap(numberOfObstacles);
    setObstacles(map);
  }, []);

  const obstaclePositions = Array(numberOfObstacles)
    .fill()
    .map(() => {
      const x = Math.floor(Math.random() * 100) + "vw";
      const y = Math.floor(Math.random() * 100) + "vh";
      return { left: x, top: y };
    });

  const generateMap = (numberOfObstacles) => {
    const obstacles = [];
    for (let i = 0; i < numberOfObstacles; i++) {
      obstacles[i] = (
        <Obstacle key={i} obstaclePosition={obstaclePositions[i]} />
      );
    }
    return obstacles;
  };

  return (
    <>
      {obstacles}
      {children}
    </>
  );
}

function detectCollision(setPosition) {
  const ball = document.getElementById("ball");
  const ballPosition = ball.getBoundingClientRect();
  if (ballPosition.x < 0) {
    setPosition((prev) => {
      return { x: prev.x + 1, y: prev.y };
    });
  }
  if (ballPosition.x + ballPosition.width > window.innerWidth) {
    setPosition((prev) => {
      return { x: prev.x - 1, y: prev.y };
    });
  }
  if (ballPosition.y < 0) {
    setPosition((prev) => {
      return { x: prev.x, y: prev.y + 1 };
    });
  }
  if (ballPosition.y + ballPosition.height > window.innerHeight) {
    setPosition((prev) => {
      return { x: prev.x, y: prev.y - 1 };
    });
  }
}

function Ball({ position, setPosition }) {
  useEffect(() => {
    const ball = document.getElementById("ball");
    const ballPosition = ball.getBoundingClientRect();
    const obstacles = document.getElementsByClassName("obstacle");
    detectCollision(setPosition);
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i].getBoundingClientRect();
      if (
        ballPosition.x < obstacle.x + obstacle.width &&
        ballPosition.x + ballPosition.width > obstacle.x &&
        ballPosition.y < obstacle.y + obstacle.height &&
        ballPosition.y + ballPosition.height > obstacle.y
      ) {
        alert("Game Over");
        setPosition({ x: 0, y: 0 });
      }
    }
  }, [position]);
  return (
    <div
      id="ball"
      style={{ left: position.x + "vw", top: position.y + "vh" }}
    />
  );
}

function Obstacle({ obstaclePosition }) {
  return <div className="obstacle" style={obstaclePosition} />;
}

export default App;
