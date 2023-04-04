const canvas = document.querySelector("canvas");
const body = document.querySelector("body");
const brushWidth = document.querySelector("#brush-width");
const brushColor = document.querySelector("#color-picker");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const clearBtn = document.querySelector(".clear");
const saveBtn = document.querySelector(".save");
console.log(saveBtn);
const ctx = canvas.getContext("2d");

let isDrawing = false;
let currenWidth = 5;
let currenColor = "";
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function startDraw() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currenWidth;
}

function drawing(e) {
  if (isDrawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.strokeStyle = currenColor;
  }
}

function stopDraw() {
  isDrawing = false;
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
body.addEventListener("mouseup", stopDraw);

brushWidth.addEventListener("change", () => {
  currenWidth = brushWidth.value;
});
brushColor.addEventListener("change", () => {
  currenColor = brushColor.value;
});

eraser.addEventListener("click", () => {
  eraser.classList.add("active");
  brush.classList.remove("active");
  currenColor = "white";
});

brush.addEventListener("click", () => {
  brush.classList.add("active");
  eraser.classList.remove("active");
  currenColor = brushColor.value;
});

clearBtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
saveBtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL();
  link.click();
});
