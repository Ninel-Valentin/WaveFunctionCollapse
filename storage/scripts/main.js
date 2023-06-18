import { StartAlgorithm } from "./SolveAlgorithm.js";
import CanvasObject from "./Canvas.js";
import { returnPicturesData } from "./AnalyzePicture.js";

const borderSwitch = document.querySelector('div#borderSwitch');
const canvas = new CanvasObject(
    returnPicturesData(),
    document.querySelector('canvas'),
    document.querySelector('div#borderSwitch').getAttribute('data-border') == 'true',
    document.querySelector('img#brush')
);

console.log(canvas.rows);
console.log(canvas.cols);

// Add resize window event
addEventListener('resize', (e) => {
    canvas.UpdateCanvasSize();
});

borderSwitch.addEventListener('click', (e) => {
    canvas.ToggleBorder();
    borderSwitch.setAttribute('data-border', canvas.border);
});

var solveButton = document.querySelector('div#solveButton');
solveButton.addEventListener('click', (e) => {
    StartAlgorithm();
    // SolveAlgorithm();
});

var resetButton = document.querySelector('div#resetButton');
resetButton.addEventListener('click', (e) => {
});

var clearButton = document.querySelector('div#clearButton');
clearButton.addEventListener('click', (e) => {
    // ClearGrid();
});