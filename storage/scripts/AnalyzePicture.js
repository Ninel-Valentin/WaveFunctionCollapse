import Consts from "./utils/Consts.js";

export function returnPicturesData() {
    const dataArr = [];

    for (let i = 1; i <= Consts.fileCount; i++) {
        const links = [];
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const context = document.createElement('canvas').getContext('2d', { willReadFrequently: true });;
            context.drawImage(img, 0, 0);

            links.push([
                RGBToHexFromData(context.getImageData(0, 0, 1, 1).data),
                RGBToHexFromData(context.getImageData(32, 0, 1, 1).data),
                RGBToHexFromData(context.getImageData(63, 0, 1, 1).data),
                RGBToHexFromData(context.getImageData(63, 32, 1, 1).data),
                RGBToHexFromData(context.getImageData(63, 63, 1, 1).data),
                RGBToHexFromData(context.getImageData(32, 63, 1, 1).data),
                RGBToHexFromData(context.getImageData(0, 63, 1, 1).data),
                RGBToHexFromData(context.getImageData(0, 32, 1, 1).data),
            ]);
            links.flat();
        };
        links.flat();

        let number = `00${i}`.replace(/\d*(\d{3})/g, '$1');
        img.src = `./storage/images/${number}.png`;

        dataArr.push({
            id: number,
            links
        });
    }
    return dataArr;
}

function RGBToHexFromData(obj) {
    return RGBToHex(
        obj[0],
        obj[1],
        obj[2]
    );
}

function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}