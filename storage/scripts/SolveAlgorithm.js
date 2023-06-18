import utils from "./utils/utils.js";
import Consts from "./utils/Consts.js";
import { returnPicturesData } from './AnalyzePicture.js';

var rows, cols;
const picturesData = returnPicturesData();
const canvas = document.querySelector('main > canvas');
const canvCtx = canvas.getContext('2d');
canvCtx.imageSmoothingEnabled = false;

// Instantiate the matrix with possible choices
const dataMatrix = [];
for (let i = 0; i < Consts.fileCount; i++) {
    dataMatrix[i] = [];
    for (let j = 0; j < Consts.fileCount; j++)
        dataMatrix[i][j] = picturesData.map(tile => tile.id);
}

export function StartAlgorithm() {
    // DrawCanvas();
    DrawTile();
}

function DrawCanvas() {
    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            DrawTile();
}

function DrawTile() {
    let img = document.querySelector('img#brush');
    img.src = './storage/images/001.png';
    img.onload = function (e) {
        canvCtx.drawImage(img, 0, 0, img.width, img.height);
    }
}

function GenerateStartingTile() {
    let randomRow = utils.GetRandomInteger(0, rows);
    let randomCol = utils.GetRandomInteger(0, cols);
    UpdateTile(randomRow, randomCol);
}

function UpdateTile(row, col, tileId = null) {
}
