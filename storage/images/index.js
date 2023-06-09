var fs = require('fs');

for (let i = 275; i <= 326; i++) {
    var prevName, newName;
    if (i < 100)
        prevName = `0${i}`;
    else
        prevName = i;
    prevName = `${prevName}.png`;

    newName = i -52;
    newName = `${newName}.png`;
    fs.rename(prevName, newName, function (err) {
        if (err) throw err;
        console.log('File Renamed.');
    });
}