var fs = require('fs');

for (let i = 67; i <= 99; i++) {
    var prevName, newName;
    prevName = i;
    prevName = `${prevName}.png`;

    newName = "0" + i;
    newName = `${newName}.png`;

    if (!fs.existsSync(newName)) {
        fs.rename(prevName, newName, function (err) {
            if (err) throw err;
            console.log('File Renamed.');
        });
    }
    else
        i--;
}