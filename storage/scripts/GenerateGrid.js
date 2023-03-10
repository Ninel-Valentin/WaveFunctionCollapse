import Consts from "./utils/Consts.js";

function GenerateGrid() {
    const grid = document.querySelector('section#grid');
    const [gridHeight, gridWidth] = [grid.parentElement.offsetHeight, grid.parentElement.offsetWidth];

    // Calculate how many tiles can be stored in the grid:
    let tileSize = grid.getAttribute('data-border') ? Consts.tileSize : Consts.tileBorderlessSize;
    let tilesPerRow = Math.floor(gridWidth / tileSize);
    let tilesPerColumn = Math.floor(gridHeight / tileSize);

    // Clear current children
    grid.innerHTML = "";

    // Append the new children
    for (let i = 0; i < tilesPerColumn; i++)
        for (let j = 0; j < tilesPerRow; j++) {
            grid.appendChild(GenerateTileObject(i, j));
        }
}

function GenerateTileObject(i, j) {
    let obj = document.createElement('div');
    obj.className = 'tile';
    // Give the position as an attribute to use it later in the generator
    obj.setAttribute('data-position', `${i}:${j}`);
    return obj;
}

function ShowResizeError() {
    // Clear all stored data
    // Create a custom pop-up
}

addEventListener('resize', (e) => {
    /*
    Resizing whilst generating the map would affect the accuracy of it
    Therefore we show a message and reset the grid on resize of the viewport
    */
    ShowResizeError();
    GenerateGrid();
});

GenerateGrid();
export default GenerateGrid;