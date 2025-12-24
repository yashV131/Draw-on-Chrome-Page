let drawingEnabled = false;
let canvas;
let ctx;

let pickerCanvas;
let pickerCtx;


chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleDrawing") {
    drawingEnabled = !drawingEnabled;
    drawingEnabled ? enableDrawing() : disableDrawing();
  }
});

function enableDrawing() {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1000000000";
    canvas.style.pointerEvents = "none";
    document.body.appendChild(canvas);
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
}

function disableDrawing() {
  if (canvas) {
    canvas.remove();
    canvas = null;
    ctx = null;
  }
}
function startDrawing(e) {
  if (drawingEnabled) {
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }
}
function draw(e) {
  if (drawingEnabled) {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
  }
}
function stopDrawing() {
  if (drawingEnabled) {
    ctx.closePath();
  }
}
function createColorPicker() {
  pickerCanvas = document.createElement("canvas");
  pickerCtx = pickerCanvas.getContext("2d");
    pickerCanvas.style.position = "absolute";
    pickerCanvas.style.top = "10px";
    pickerCanvas.style.left = "10px";
    pickerCanvas.style.width = "100px";
    pickerCanvas.style.height = "100px";
    pickerCanvas.style.zIndex = "1000000001";
    document.body.appendChild(pickerCanvas);
  // Add event listeners for color selection
}   
function removeColorPicker() {
  if (pickerCanvas) {
    pickerCanvas.remove();
    pickerCanvas = null;
    pickerCtx = null;
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleColorPicker") {
    if (pickerCanvas) {
        removeColorPicker();
    } else {
        createColorPicker();
    }
}});