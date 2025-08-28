import { Universe, Cell } from "wasm-game";

const CELL_SIZE = 5;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext("2d");



function renderLoop() {
  universe.tick();

  drawGrid();
  drawCells();

  requestAnimationFrame(renderLoop);
}

function drawGrid() {
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;

  for (let x = 0; x <= width; x++) {
    ctx.moveTo(x * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(x * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let y = 0; y <= height; y++) {
    ctx.moveTo(0, y * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, y * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

function drawCells() {
  const cells = universe.cells();

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = row * width + col;

      ctx.fillStyle = cells[idx] === Cell.Alive ? ALIVE_COLOR : DEAD_COLOR;
      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}


drawGrid();
drawCells();
renderLoop();
