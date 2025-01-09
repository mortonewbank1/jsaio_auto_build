export function testObstCollision() {
  const ballRect = ball.getBoundingClientRect();
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach((obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      ballRect.left < obstacleRect.right &&
      ballRect.right > obstacleRect.left &&
      ballRect.top < obstacleRect.bottom &&
      ballRect.bottom > obstacleRect.top
    ) {
      console.log("collision");
    }
  });
}
