import tilesJsonData from '../data/relations.json' assert {type: 'json'};
import utils from "./utils/utils.js";

var rows, cols;
var algorithmMatrix;

export function ClearGrid() {
    InitializeAlgorithm();
    ClearDisplay();
    UpdateDisplay();
}

function InitializeAlgorithm() {
    [rows, cols] = document.querySelector('div.tile[data-position]:last-child').getAttribute('data-position').split(':');

    // Set the empty matrix
    algorithmMatrix = [];
    for (let i = 0; i <= rows; i++) {
        let row = [];
        for (let j = 0; j <= cols; j++) {
            row.push(tilesJsonData);
        }
        algorithmMatrix.push(row);
    }
}

function ClearDisplay() {
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
            let tile = document.querySelector(`div.tile[data-position="${i}:${j}"]`);
            tile.removeAttribute('style');
            tile.removeAttribute('data-tileid');
        }
    }
}

function UpdateDisplay() {
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
            document.querySelector(`div.tile[data-position="${i}:${j}"]`).innerText = algorithmMatrix[i][j].length ?? '';
        }
    }
}

export function StartAlgorithm() {
    ClearGrid();
    SolveAlgorithm();
}

export function SolveAlgorithm() {

    // Check for already initialized tiles
    let initializedTiles = document.querySelectorAll('div.tile[data-position][data-tileId');
    if (initializedTiles.length == 0)
        GenerateStartingTile();

    let iterations = algorithmMatrix.flat().filter(x => !!x.length).length;
    for (let i = 0; i < iterations; i++) {
        // Reset algorithm if it went wrong
        if (algorithmMatrix.flat().filter(x => x?.length == 0).length > 0) {
            utils.ErrorLogs.AlgorithmLogicError();
            // return StartAlgorithm();
            return;
        }

        let [rowPos, colPos] = GetTileWithLeastPossibilities();

        UpdateTile(rowPos, colPos);
    }
}

function GenerateStartingTile() {
    let randomRow = utils.GetRandomInteger(0, rows);
    let randomCol = utils.GetRandomInteger(0, cols);
    UpdateTile(randomRow, randomCol);
}

/**
 * @param {Number} row 
 * @param {Number} col 
 * @param {Number} tileId 
 */
function UpdateTile(row, col, tileId = null) {
    let randomTilePos = utils.GetRandomInteger(0, algorithmMatrix[row][col].length - 1);
    tileId = tileId || algorithmMatrix[row][col][randomTilePos].id;

    let parsedId = tileId <= 9 ? `0${tileId}` : tileId;
    let tileObj = document.querySelector(`div.tile[data-position="${row}:${col}"]`);
    tileObj.setAttribute('data-tileId', tileId);
    tileObj.setAttribute('style', `background-image:url("./storage/images/${parsedId}.png");`);

    algorithmMatrix[row][col] = tileId;
    let affectedNeighbours = GetNeighboursJSON(row, col);
    for (let neighbourJson of Object.entries(affectedNeighbours)) {
        UpdateRequirements(neighbourJson);
    }
    UpdateDisplay();
}

/**
 * @param {object} neighbourJson\
 */
function UpdateRequirements(neighbourJson) {
    let [dir, coords] = neighbourJson;
    let neighboursOfNeighbour = GetNeighboursJSON(coords[0], coords[1]);
    for (let [neighbourDir, neighbourCoords] of Object.entries(neighboursOfNeighbour)) {
        let tileId = utils.GetIdByCoords(neighbourCoords[0], neighbourCoords[1]);
        algorithmMatrix[coords[0]][coords[1]] = algorithmMatrix[coords[0]][coords[1]].filter(
            possibleTile =>
                utils.GetDirectionData(possibleTile.id, neighbourDir) == utils.GetDirectionData(tileId, utils.GetOppositeDirection(neighbourDir)));
    }
}

/**
 * @param {Array} coordinateArray\
 */
function IsPartOfGrid(coordinateArray) {
    return (coordinateArray[0] >= 0 && coordinateArray[0] <= rows &&
        coordinateArray[1] >= 0 && coordinateArray[1] <= cols);
};

/**
 * @param {Number} rowPos\
 * @param {Number} colPos\
 */
function GetNeighboursJSON(rowPos, colPos) {
    let neighbours = {
        N: [rowPos - 1, colPos],
        E: [rowPos, colPos + 1],
        S: [rowPos + 1, colPos],
        W: [rowPos, colPos - 1]
    };

    // Filter the neighbours which are not on the grid
    for (let [key, value] of Object.entries(neighbours)) {
        if (!IsPartOfGrid(value) || !algorithmMatrix[value[0]][value[1]].length == !algorithmMatrix[rowPos][colPos].length)
            delete neighbours[key];
    }
    return neighbours;
};

/**
 * @returns {Array}
 */
function GetTileWithLeastPossibilities() {
    let minLengthArray = algorithmMatrix.flat().reduce((prev, current) => {
        return (prev?.length > current?.length || !prev?.length)
            && current.hasOwnProperty('length') ? current : prev;
    });

    let index = +algorithmMatrix.flat().indexOf(minLengthArray);
    let rowPos = Math.floor(index / (+cols + 1));
    let colPos = index % (+cols + 1);

    return [rowPos, colPos];
}

// StartAlgorithm();