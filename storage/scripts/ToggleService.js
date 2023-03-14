import { SolveAlgorithm, StartAlgorithm, ClearGrid } from "./SolveAlgorithm.js";

var borderSwitch = document.querySelector('div#borderSwitch');
function ToggleBorder() {
    let grid = document.querySelector('section#grid');
    let newBorderStatus = grid.getAttribute('data-border') != 'true';
    grid.setAttribute('data-border', newBorderStatus);
    borderSwitch.setAttribute('data-border', newBorderStatus);
}

borderSwitch.addEventListener('click', (e) => {
    ToggleBorder();
});

var solveButton = document.querySelector('div#solveButton');
solveButton.addEventListener('click', (e) => {
    SolveAlgorithm();
});

var resetButton = document.querySelector('div#resetButton');
resetButton.addEventListener('click', (e) => {
    StartAlgorithm();
});

var clearButton = document.querySelector('div#clearButton');
clearButton.addEventListener('click', (e) => {
    ClearGrid();
});
