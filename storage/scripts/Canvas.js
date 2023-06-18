import Consts from "./utils/Consts.js";

export default class CanvasObject {
    constructor(
        _imgData,
        _canvas = document.querySelector('canvas'),
        _border = false,
        _brush = document.querySelector('img#brush')) {

        this.imageData = _imgData;
        this.dataset = [];
        this.border = _border;
        this.tileSize = (this.border ? Consts.tileWithBorder : Consts.tileSize);
        this.canvas = _canvas;
        this.ctx = _canvas.getContext('2d');

        this.brush = _brush;
        this.brush.setAttribute('height', Consts.tileWithBorder);
        this.brush.setAttribute('width', Consts.tileWithBorder);
        this.UpdateCanvasSize();
        this.InstantiateEvents();

        this.hoveredX = 0;
        this.hoveredY = 0;
    }

    InstantiateEvents() {
        // Hovering effect
        this.canvas.addEventListener('mousemove', (e) => {
            const x = e.offsetX
                , y = e.offsetY;
            const tileX = Math.ceil(x / this.tileSize)
                , tileY = Math.ceil(y / this.tileSize);

            if (this.hoveredX != tileX || this.hoveredY != tileY) {
                // Draw the hover effect
                console.log(tileX, tileY);
                this.ctx.fillStyle = '#000000';
                this.ctx.globalAlpha = 0.4;

                const startX = (tileX - 1) * Consts.tileSize
                    , startY = (tileY - 1) * Consts.tileSize;
                this.ctx.fillRect(startX, startY, Consts.tileSize, Consts.tileSize);

                // Draw the previous tile back
                this.ctx.fillStyle = '#ffffff';
                this.ctx.globalAlpha = 1;
                const lastX = (this.hoveredX - 1) * Consts.tileSize
                    , lastY = (this.hoveredY - 1) * Consts.tileSize;
                if (this.dataset.length == 0)
                    this.ctx.fillRect(lastX, lastY, Consts.tileSize, Consts.tileSize);


                this.hoveredX = tileX;
                this.hoveredY = tileY;
            }
        });

        // Clear hover effect on leave
        this.canvas.addEventListener('mouseleave', (e) => {
            // Draw the previous tile back
            this.ctx.fillStyle = '#ffffff';
            this.ctx.globalAlpha = 1;
            const lastX = (this.hoveredX - 1) * Consts.tileSize
                , lastY = (this.hoveredY - 1) * Consts.tileSize;
            if (this.dataset.length == 0)
                this.ctx.fillRect(lastX, lastY, Consts.tileSize, Consts.tileSize);
        });

        this.canvas.addEventListener('click', (e) => {

        });
    }

    ToggleBorder() {
        this.border = !this.border;
        this.canvas.setAttribute('data-border', this.border);
        this.UpdateCanvasSize();
        this.RedrawCanvas();
    }

    RedrawCanvas() {
        // ?Instead of drawing the borders
        // *Draw the background and add spacing between tiles to see the background
        this.ctx.fillStyle = Consts.borderColor;
        this.ctx.fillRect(0, 0, this.cols * this.tileSize, this.rows * this.tileSize);

        // Reset the fill for cells
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.dataset.length == 0) {
                    if (this.border) {
                        this.ctx.fillRect(1 + j * (Consts.tileSize + 2), 1 + i * (Consts.tileSize + 2), Consts.tileSize, Consts.tileSize);
                        console.log(`${i}|${j} : ${1 + j * (Consts.tileSize + 2)} | ${1 + i * (Consts.tileSize + 2)}`);
                    }
                    else {
                        this.ctx.fillRect(j * Consts.tileSize, i * Consts.tileSize, Consts.tileSize, Consts.tileSize);
                    }
                }
            }
        }
    }

    UpdateCanvasSize() {
        this.tileSize = (this.border ? Consts.tileWithBorder : Consts.tileSize);
        const
            vh = window.innerHeight,
            vw = window.innerWidth;

        // Height is 100vh - (Header 10vh + Footer 5vh)
        this.rows = Math.floor(.85 * vh / this.tileSize);
        this.cols = Math.floor(vw / this.tileSize);

        this.width = Math.ceil(this.cols * this.tileSize);
        this.height = Math.ceil(this.rows * this.tileSize);

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        var leftWidth = (vw - this.width) / 2;
        this.canvas.setAttribute('style', `left: ${leftWidth}px;`);

        this.RedrawCanvas();
    }
}