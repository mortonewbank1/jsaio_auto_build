import { moveBall } from "./modules/moveBall.js";
import { generateMap } from "./modules/generateMap.js";

const ball = document.getElementById("ball"); // get the ball
const map = document.getElementById("map"); // get the map
const position = { x: 0, y: 0 }; // set the initial position of the ball

document.addEventListener("keydown", (e) => moveBall(e, ball, position)); // listen for key presses

generateMap(map, 100);
